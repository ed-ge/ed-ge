import Base from "../../../src/Base.js"

import Board from "./board.js"

let Scenes = {
  startScene: "StartScene",
  allScenes: [
    {
      name: "StartScene",
      objects: [
        {
          new: "Camera, 0, 0, Camera",
        },
        {
          new: "GameController"
        },
        {
          new: "CashDisplayPlayer1, -150, -150, CashDisplay",
          edit: ["CashDisplayBehavior|player|1"],
        },
        {
          new: "CashDisplayPlayer2, 150, -150, CashDisplay",
          edit: ["CashDisplayBehavior|player|2"]
        },
        {
          new: "StatusText, -100, -100, 1, 1, StatusText"
        },
        {
          new: "RollButton, 0, 100, Button",
          add: ["RollButtonBehavior"]
        },
        {
          new: "Dice, 0, 150, Text",
          add: ["DiceBehavior"],
        },
        {
          new: "EndTurnButton, 0, 200, Button",
          add: ["EndTurnButtonBehavior"],
        },
        {
          new: "BuyPropertyButton, 0, 225, Button",
          add: ["BuyPropertyButtonBehavior"],
        },
        {
          new: "PropertyBuilderGameObject, Empty",
          add: ["PropertyBuilder"]
        },
        {
          new: "Player1, 100, 100, .1, .1, Player",
          edit: ["PlayerBehavior|player|0", "CircleComponent|fill|\"blue\""]
        },
        {
          new: "Player2, 100, 100, .1, .1, Player",
          edit: ["PlayerBehavior|player|1", "CircleComponent|fill|\"red\""]
        },


      ]
    }
  ]
}

function positionToX(position) {
  if (position <= 10) {
    return position;
  }
  else if (position <= 20) {
    return 10;
  }
  else if (position <= 30) {
    return 10 - (position - 20);
  }
  else {
    return 0;
  }

}

function positionToY(position) {
  if (position <= 10) {
    return 0;
  }
  else if (position <= 20) {
    return position - 10;
  }
  else if (position <= 30) {
    return 10;
  }
  else {
    return 10 - (position - 30);
  }
}

function getProperty(position) {
  let x = positionToX(position);
  let y = positionToY(position);

  let property = Board.find(d => d.x == x && d.y == y);
  if (!property) throw new Error("Could not find property at " + position);
  return property;
}

let GameBehaviors = {
  GameControllerBehavior: class GameControllerBehavior extends Base.Behavior {
    start() {
      this.numPlayers = 2;
      this.currentPlayer = 1;
      this.die1 = 0;
      this.die2 = 0;
      this.roll = 0;
      this.turnShouldEnd = false;

    }
    getCurrentPlayerBehavior() {
      let currentPlayer = Base.SceneManager.currentScene.findByName("Player" + this.currentPlayer);
      let currentPlayerBehavior = currentPlayer.getComponent("PlayerBehavior");
      return currentPlayerBehavior;
    }
    rollDiceEvent() {
      if (this.turnShouldEnd) return;

      this.die1 = Math.ceil(Math.random() * 6);
      this.die2 = Math.ceil(Math.random() * 6);
      this.roll = this.die1 + this.die2;

      let currentPlayer = Base.SceneManager.currentScene.findByName("Player" + this.currentPlayer);
      let currentPlayerBehavior = currentPlayer.getComponent("PlayerBehavior");
      currentPlayerBehavior.position += this.roll;
      currentPlayerBehavior.position %= 40;
      currentPlayerBehavior.rolledTimes++;

      //Calculate if turn should end
      if (this.die1 != this.die2) {
        this.turnShouldEnd = true
      }
      if (currentPlayerBehavior.roledTimes == 3) {
        this.turnShouldEnd = true;
      }

    }
    endTurnEvent() {
      if (!this.turnShouldEnd) return;
      let currentPlayer = Base.SceneManager.currentScene.findByName("Player" + this.currentPlayer);
      let currentPlayerBehavior = currentPlayer.getComponent("PlayerBehavior");

      this.currentPlayer += 1;
      if (this.currentPlayer > this.numPlayers)
        this.currentPlayer = 1;


      this.turnShouldEnd = false;
      currentPlayerBehavior.rolledTimes = 0;

    }
    buyPropertyEvent() {
      let currentPlayerBehavior = this.getCurrentPlayerBehavior();
      let currentPlayerPosition = currentPlayerBehavior.position;
      let currentPlayerX = positionToX(currentPlayerPosition);
      let currentPlayerY = positionToY(currentPlayerPosition);


      let property = getProperty(currentPlayerPosition);
      property.isPurchased = this.currentPlayer;

      Base.SceneManager.currentScene.findByName(property.name).getComponent("PropoertyStatusTextBehavior").getComponent("TextComponent").text = "Purchased";
    }

  },
  PropertyStatusTextBehavior: class PropertyStatusTextBehavior extends Base.Behavior {
    start() {

      this.textComponent = this.gameObject.getComponent("TextComponent")
    }
    update() {
      this.textComponent.text = this.property.name;
    }
  },
  DiceBehavior: class DiceBehavior extends Base.Behavior {
    start() {
      this.gameController = Base.SceneManager.currentScene.findByName("GameController").getComponent("GameControllerBehavior");
    }
    update() {
      let die1 = this.gameController.die1;
      let die2 = this.gameController.die2;
      this.gameObject.getComponent("TextComponent").text = `${die1} ${die2}`;
    }

  },

  BuyPropertyButtonBehavior: class BuyPropertyButtonBehavior extends Base.Behavior {
    start() {
      this.gameController = Base.SceneManager.currentScene.findByName("GameController").getComponent("GameControllerBehavior");

      this.textChild = this.gameObject.findByName("Text");
      this.textComponent = this.textChild.getComponent("TextComponent");
      this.textComponent.text = "Buy";

      this.originalScaleX = this.scaleX;
      this.originalScaleY = this.scaleY;
    }
    onMouseDown() {
      this.gameController.buyPropertyEvent();
    }
    update() {

      if (this.gameController.getCurrentPlayerBehavior().rolledTimes == 0) {
        this.gameObject.scaleX = 0;
        this.gameObject.scaleY = 0;
      }
      else {
        let currentPlayerBehavior = this.gameController.getCurrentPlayerBehavior();
        let currentPlayerPosition = currentPlayerBehavior.position;
        let currentPlayerX = positionToX(currentPlayerPosition);
        let currentPlayerY = positionToY(currentPlayerPosition);


        let property = getProperty(currentPlayerPosition);
        if (property.isPurchased || !property.cost) {
          this.gameObject.scaleX = 0;
          this.gameObject.scaleY = 0;
        }
        else {
          this.gameObject.scaleX = this.originalScaleX;
          this.gameObject.scaleY = this.originalScaleY;
        }
      }
    }
  },
  EndTurnButtonBehavior: class EndTurnButtonBehavior extends Base.Behavior {
    start() {
      this.gameController = Base.SceneManager.currentScene.findByName("GameController").getComponent("GameControllerBehavior");

      this.textChild = this.gameObject.findByName("Text");
      this.textComponent = this.textChild.getComponent("TextComponent");
      this.textComponent.text = "End Turn";

      this.originalScaleX = this.scaleX;
      this.originalScaleY = this.scaleY;

    }
    onMouseDown() {
      this.gameController.endTurnEvent();
    }
    update() {
      if (!this.gameController.turnShouldEnd) {
        this.gameObject.scaleX = 0;
        this.gameObject.scaleY = 0;
      }
      else {
        this.gameObject.scaleX = this.originalScaleX;
        this.gameObject.scaleY = this.originalScaleY;
      }
    }
  },
  RollButtonBehavior: class RollButtonBehavior extends Base.Behavior {
    start() {
      this.gameController = Base.SceneManager.currentScene.findByName("GameController").getComponent("GameControllerBehavior");

      this.textChild = this.gameObject.findByName("Text");
      this.textComponent = this.textChild.getComponent("TextComponent");
      this.textComponent.text = "Roll";

      this.originalScaleX = this.scaleX;
      this.originalScaleY = this.scaleY;

    }
    onMouseDown() {
      this.gameController.rollDiceEvent();
    }
    update() {
      if (this.gameController.turnShouldEnd) {
        this.gameObject.scaleX = 0;
        this.gameObject.scaleY = 0;
      }
      else {
        this.gameObject.scaleX = this.originalScaleX;
        this.gameObject.scaleY = this.originalScaleY;
      }
    }
  },
  StatusTextBehavior: class StatusTextBehavior extends Base.Behavior {
    start() {
      this.gameController = Base.SceneManager.currentScene.findByName("GameController").getComponent("GameControllerBehavior");
      this.textComponent = this.gameObject.getComponent("TextComponent");

      // this.players = {};
      // for (let i = 1; i <= this.gameController.numPlayers; i++) {
      //   this.players[i] = Base.SceneManager.currentScene.findByName("Player" + i).getComponent("PlayerBehavior");
      // }
    }
    update() {
      let currentPlayer = this.gameController.currentPlayer;
      this.textComponent.text = "Player " + currentPlayer + "'s Turn, " + this.gameController.getCurrentPlayerBehavior().rolledTimes + " rolls";


    }
  },
  CashDisplayBehavior: class CashDisplayBehavior extends Base.Behavior {
    update() {
      let foundPlayer = Base.SceneManager.currentScene.findByName("Player" + this.player);
      let cash = foundPlayer.getComponent("PlayerBehavior").cash;
      this.gameObject.getComponent("TextComponent").text = this.player + " " + cash;
    }
  },
  PlayerBehavior: class PlayerBehavior extends Base.Behavior {
    start() {
      this.position = 0;
      this.cash = 1500;
      this.rolledTimes = 0;
      this.turnsInJail = 0;
      this.gameObject.layer = "Foreground";
    }
    update() {
      let newX = positionToX(this.position);
      let newY = positionToY(this.position);
      this.gameObject.x = (5 - newX) * 50 + 25 - this.player * 10;
      this.gameObject.y = (5 - newY) * 50 + 40;
    }
  },

  PropertyBuilder: class PropertyBuilder extends Base.Behavior {
    start() {
      let size = 50;
      for (let i = 0; i < Board.length; i++) {
        let property = Board[i];
        let x = (5 - property.x) * size;
        let y = (5 - property.y) * size;
        let propertyGameObject = Base.SceneManager.instantiate(Base.Prefabs.Rectangle, new Base.Point(x + 25, y + 25), new Base.Point(.5, .5), 0);
        let fill = "magenta";
        switch (property.type) {
          case "Corner":
            fill = "white";
            break;
          case "property":
            switch (property.class) {
              case "RailRoad":
                fill = "black";
                break;
              case "Utility":
                fill = "gray"
                break;
              case 0:
                fill = "brown";
                break;
              case 1:
                fill = "lightblue";
                break;
              case 2:
                fill = "magenta";
                break;
              case 3:
                fill = "orange";
                break;
              case 4:
                fill = "red";
                break;
              case 5:
                fill = "yellow";
                break;
              case 6:
                fill = "green";
                break;
              case 7:
                fill = "blue";
                break;
            }
            break;

          case "DrawCard":
            fill = "pink";
            break;
          case "Tax":
            fill = "gold";
            break;
        }

        propertyGameObject.getComponent("RectangleComponent").fill = fill;
        let titles = property.name.split(" ");
        for (let j = 0; j < titles.length; j++) {
          let titleObject = Base.Serializer.instantiate(Base.Prefabs.Text, new Base.Point(-size + 5, -size / 2 + j * 25), new Base.Point(1, 1), 0, propertyGameObject)
          //propertyGameObject.addChild(titleObject);
          titleObject.getComponent("TextComponent").text = titles[j].substr(0, 6);
          if (property.class == "RailRoad") {
            titleObject.getComponent("TextComponent").fill = "white";
          }
        }
        if (property.cost) {
          let position = new Base.Point(0, 0);
          position.x = -size + 5;
          position.y = -size / 2 + 25;
          if (property.y == 0)
            position.y -= 65;
          if (property.y == 10)
            position.y += 65;
          if (property.x == 0)
            position.x -= 60;
          if (property.x == 10)
            position.x += 120;
          let propertyStatusGameObject = Base.Serializer.instantiate(Base.Prefabs.PropertyStatusText, position, new Base.Point(1, 1), 0, propertyGameObject);
          propertyStatusGameObject.name = property.name;
          propertyStatusGameObject.getComponent("PropertyStatusTextBehavior").property = property;
        }
      }
    }

  }
}

let Player = {
  name: "Player",
  components: ["CircleComponent|fill|black", "PlayerBehavior"]
}

let CashDisplay = {
  name: "CashDisplay",
  components: ["TextComponent", "CashDisplayBehavior"],
  componentValues: ["TextComponent|font|\"20pt Times\""]
}

let PropertyStatusText = {
  name: "PropertyStatusText",
  components: ["TextComponent", "PropertyStatusTextBehavior"],
  componentValues: ["TextComponent|font|10pt Times"]
}

let StatusText = {
  name: "StatusText",
  components: ["StatusTextBehavior", "TextComponent"],
  componentValues: ["TextComponent|font|\"20pt Times\""]
}

let GameController = {
  name: "GameController",
  components: ["GameControllerBehavior"]
}

let Button = {
  name: "Button",
  components: ["RectangleComponent|width|50|height|20", "AABBCollider|width|50|height|20"],
  children: [
    {
      def: "Text, -25, 0, Text",
      componentValues: ["TextComponent|text|\"Button\"", "TextComponent|font|\"10pt Times\""]
    }
  ]
}


let Prefabs = { Player, CashDisplay, GameController, Button, StatusText, PropertyStatusText };
Base.main(Prefabs, GameBehaviors, Scenes);