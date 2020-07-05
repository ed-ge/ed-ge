import Base from "../../../src/Base.js"

import Board from "./board.js"
import GameControllerBehavior from "./GameControllerBehavior.js"
import {getProperty, positionToX, positionToY} from "./helper.js"

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
          new: "RollButton, -100, 100, 0, Button",
          add: ["RollButtonBehavior"]
        },
        {
          new: "Dice, 0, 150, Text",
          add: ["DiceBehavior"],
        },
        {
          new: "EndTurnButton, 0, 100, Button",
          add: ["EndTurnButtonBehavior"],
        },
        {
          new: "BuyPropertyButton, 125, 100, Button",
          add: ["BuyPropertyButtonBehavior"],
        },
        {
          new: "PayRentButton, 100, 225, Button",
          add: ["PayRentButtonBehavior"],
        },
        {
          new: "PropertyBuilderGameObject, Empty",
          add: ["PropertyBuilder"]
        },
        {
          new: "Player1, 100, 100, .1, .1, Player",
          edit: ["PlayerBehavior|player|0", "CircleComponent|fill|\"blue\"", "CircleComponent|lineWidth|5"]
        },
        {
          new: "Player2, 100, 100, .1, .1, Player",
          edit: ["PlayerBehavior|player|1", "CircleComponent|fill|\"red\"", "CircleComponent|lineWidth|5"]
        },
      ]
    }
  ]
}



var END_TURN_EVENT = "endTurnEvent";
var TICK = "tick";




let GameBehaviors = {
  GameControllerBehavior: GameControllerBehavior,
  PropertyStatusTextBehavior: class PropertyStatusTextBehavior extends Base.Behavior {
    start() {
  
      this.textComponent = this.gameObject.getComponent("TextComponent")
      this.textComponent.font = "25pt Times";
    }
    update() {
      if (!this.property) return;
      if (!this.property.isPurchased)
        this.textComponent.text = "?";
      else {
        this.textComponent.text = "P " + this.property.isPurchased;
        this.textComponent.fill = this.property.isPurchased == 1 ? "blue" : "red";
      }
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
  PayRentButtonBehavior: class PayRentButtonBehavior extends Base.Behavior {
    start() {
      this.gameController = Base.SceneManager.currentScene.findByName("GameController").getComponent("GameControllerBehavior");

      this.textChild = this.gameObject.findByName("Text");
      this.textComponent = this.textChild.getComponent("TextComponent");
      this.textComponent.text = "Pay Rent";
      this.textComponent.font = "25pt Times";
      this.gameObject.getComponent("RectangleComponent").fill = "red";

      this.originalScaleX = this.scaleX;
      this.originalScaleY = this.scaleY;
    }
    onMouseDown() {
      this.gameController.payRentEvent();
    }
    update() {
      if (this.gameController.playerStateMachine.currentState() == this.gameController.payRent) {
        this.gameObject.scaleX = this.originalScaleX;
        this.gameObject.scaleY = this.originalScaleY;
      }
      else {
        this.gameObject.scaleX = 0;
        this.gameObject.scaleY = 0;
      }
      // let currentPlayerBehavior = this.gameController.getCurrentPlayerBehavior();
      // let currentPlayerPosition = currentPlayerBehavior.position;



      // let property = getProperty(currentPlayerPosition);
      // if (property.isPurchased && property.isPurchased != this.gameController.currentPlayer) {
      //   this.gameObject.scaleX = this.originalScaleX;
      //   this.gameObject.scaleY = this.originalScaleY;
      // }
      // else{
      //   this.gameObject.scaleX = 0;
      //     this.gameObject.scaleY = 0;
      // }
    }
  },
  BuyPropertyButtonBehavior: class BuyPropertyButtonBehavior extends Base.Behavior {
    start() {
      this.gameController = Base.SceneManager.currentScene.findByName("GameController").getComponent("GameControllerBehavior");

      this.textChild = this.gameObject.findByName("Text");
      this.textComponent = this.textChild.getComponent("TextComponent");
      this.textComponent.text = "Buy";
      this.textComponent.font = "25pt Times";
      this.gameObject.getComponent("RectangleComponent").fill = "blue";


      this.originalScaleX = this.scaleX;
      this.originalScaleY = this.scaleY;
    }
    onMouseDown() {
      this.gameController.buyPropertyEvent();
    }
    update() {

      if (this.gameController.playerStateMachine.currentState() == this.gameController.buyProperty) {
        this.gameObject.scaleX = this.originalScaleX;
        this.gameObject.scaleY = this.originalScaleY;
      }
      else {
        this.gameObject.scaleX = 0;
        this.gameObject.scaleY = 0;
      }

      // if (this.gameController.getCurrentPlayerBehavior().rolledTimes == 0) {
      //   this.gameObject.scaleX = 0;
      //   this.gameObject.scaleY = 0;
      // }
      // else {
      //   let currentPlayerBehavior = this.gameController.getCurrentPlayerBehavior();
      //   let currentPlayerPosition = currentPlayerBehavior.position;
      //   let currentPlayerX = positionToX(currentPlayerPosition);
      //   let currentPlayerY = positionToY(currentPlayerPosition);


      //   let property = getProperty(currentPlayerPosition);
      //   if (property.isPurchased || !property.cost) {
      //     this.gameObject.scaleX = 0;
      //     this.gameObject.scaleY = 0;
      //   }
      //   else {
      //     this.gameObject.scaleX = this.originalScaleX;
      //     this.gameObject.scaleY = this.originalScaleY;
      //   }
      // }
    }
  },
  EndTurnButtonBehavior: class EndTurnButtonBehavior extends Base.Behavior {
    start() {
      this.gameController = Base.SceneManager.currentScene.findByName("GameController").getComponent("GameControllerBehavior");

      this.textChild = this.gameObject.findByName("Text");
      this.textComponent = this.textChild.getComponent("TextComponent");
      this.textComponent.text = "End";
      this.textComponent.font = "25pt Times";
      this.gameObject.getComponent("RectangleComponent").fill = "yellow";


      this.originalScaleX = this.scaleX;
      this.originalScaleY = this.scaleY;

    }
    onMouseDown() {
      this.gameController.endTurnEvent();
    }
    update() {
      if (this.gameController.playerStateMachine.currentState() == this.gameController.endTurn) {
        this.gameObject.scaleX = this.originalScaleX;
        this.gameObject.scaleY = this.originalScaleY;
      }
      else {
        this.gameObject.scaleX = 0;
        this.gameObject.scaleY = 0;
      }
      // if (!this.gameController.turnShouldEnd) {
      //   this.gameObject.scaleX = 0;
      //   this.gameObject.scaleY = 0;
      // }
      // else {
      //   this.gameObject.scaleX = this.originalScaleX;
      //   this.gameObject.scaleY = this.originalScaleY;
      // }
    }
  },
  RollButtonBehavior: class RollButtonBehavior extends Base.Behavior {
    start() {
      this.gameController = Base.SceneManager.currentScene.findByName("GameController").getComponent("GameControllerBehavior");

      this.textChild = this.gameObject.findByName("Text");
      this.textComponent = this.textChild.getComponent("TextComponent");
      this.textComponent.text = "Roll";
      this.textComponent.font = "25pt Times";
      this.gameObject.getComponent("RectangleComponent").fill = "green";


      this.originalScaleX = this.scaleX;
      this.originalScaleY = this.scaleY;

    }
    onMouseDown() {
      this.gameController.rollDiceEvent();
    }
    update() {
      let cs = this.gameController.playerStateMachine.currentState()
      if (cs == this.gameController.roll1State ||
        cs == this.gameController.roll2State ||
        cs == this.gameController.roll3State) {
        this.gameObject.scaleX = this.originalScaleX;
        this.gameObject.scaleY = this.originalScaleY;
      }
      else {
        this.gameObject.scaleX = 0;
        this.gameObject.scaleY = 0;
      }
      // if (this.gameController.turnShouldEnd) {
      //   this.gameObject.scaleX = 0;
      //   this.gameObject.scaleY = 0;
      // }
      // else {
      //   this.gameObject.scaleX = this.originalScaleX;
      //   this.gameObject.scaleY = this.originalScaleY;
      // }
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
      let currentPlayer = this.gameController.playerStateMachine.player;
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
        let propertyGameObject = Base.Serializer.instantiate(Base.Prefabs.Rectangle, Base._cs, new Base.Point(x + 25, y + 25), new Base.Point(.5, .5), 0);
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
          let titleObject = Base.Serializer.instantiate(Base.Prefabs.Text, Base._cs, new Base.Point(-size + 5, -size / 2 + j * 25), new Base.Point(1, 1), 0, propertyGameObject)
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
          let propertyStatusGameObject = Base.Serializer.instantiate(Base.Prefabs.PropertyStatusText, propertyGameObject, position, new Base.Point(1, 1), 0);
          propertyStatusGameObject.name = property.name;
          propertyStatusGameObject.getComponent("PropertyStatusTextBehavior").property = property;
        }
      }
    }

  }
}

let Player = `
Player Empty
CircleComponent
 fill=black
PlayerBehavior
`

let CashDisplay = `
CashDisplay Empty
TextComponent
CashDisplayBehavior
TextComponent
 font-20pt Times
`

let PropertyStatusText = `
PropertyStatusText Empty 
PropertyStatusTextBehavior
TextComponent
 font=10pt Times
`

let StatusText = `
StatusText Empty
StatusTextBehavior
TextComponent
 font=20pt Times
`

let GameController = `
GameController Empty
GameControllerBehavior
`

let Button = `
Button
RectangleComponent
 width=100
 height=40
AABBCollider
 width=100
 height=40
+Text Text
-25, 10
TextComponent
 text=Button
 font=10pt Times
`


let Prefabs = { Player, CashDisplay, GameController, Button, StatusText, PropertyStatusText };
Base.main(Prefabs, GameBehaviors, Scenes);