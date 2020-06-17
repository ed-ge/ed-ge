import Base from "../../../src/Base.js"
import Scene from "../../../src/base/Scene.js"

let Board = [

]

function bootBoard() {
  //Add Corners
  Board.push({ x: 0, y: 0, name: "Go", type: "Corner" })
  Board.push({ x: 10, y: 0, name: "Jail", type: "Corner" })
  Board.push({ x: 10, y: 10, name: "Free Parking", type: "Corner" })
  Board.push({ x: 0, y: 10, name: "Go to Jail", type: "Corner" })


  //Draw Cards
  Board.push({ x: 2, y: 0, name: "Community Chest", type: "DrawCard" })
  Board.push({ x: 10, y: 7, name: "Community Chest", type: "DrawCard" })
  Board.push({ x: 0, y: 7, name: "Community Chest", type: "DrawCard" })
  Board.push({ x: 7, y: 0, name: "Chance", type: "DrawCard" })
  Board.push({ x: 8, y: 10, name: "Chance", type: "DrawCard" })
  Board.push({ x: 0, y: 4, name: "Chance", type: "DrawCard" })

  //Taxes
  Board.push({ x: 3, y: 0, name: "Income Tax", type: "Tax" })
  Board.push({ x: 0, y: 2, name: "Luxury Tax", type: "Tax" })

  //RailRoads
  Board.push({ x: 5, y: 0, name: "Reading RailRoad", type: "property", class: "RailRoad" })
  Board.push({ x: 10, y: 5, name: "Pennsylvania RailRoad", type: "property", class: "RailRoad" })
  Board.push({ x: 5, y: 10, name: "B&O RailRoad", type: "property", class: "RailRoad" })
  Board.push({ x: 0, y: 5, name: "Short Line", type: "property", class: "RailRoad" })

  //Utilities
  Board.push({ x: 10, y: 2, name: "Electric Company", type: "property", class: "Utility" })
  Board.push({ x: 2, y: 10, name: "Water Works", type: "property", class: "Utility" })

  //Normal Properties
  Board.push({ x: 1, y: 0, name: "Medditeranian Avenue", type: "property", class: 0 });
  Board.push({ x: 4, y: 0, name: "Baltic Avenue", type: "property", class: 0 });

  Board.push({ x: 6, y: 0, name: "Oriental Avenue", type: "property", class: 1 });
  Board.push({ x: 8, y: 0, name: "Vermont Avenue", type: "property", class: 1 });
  Board.push({ x: 9, y: 0, name: "Connecticut Avenue", type: "property", class: 1 });

  Board.push({ x: 10, y: 1, name: "St. Pail Avenue", type: "property", class: 2 });
  Board.push({ x: 10, y: 3, name: "States Avenue", type: "property", class: 2 });
  Board.push({ x: 10, y: 4, name: "Virginia Avenue", type: "property", class: 2 });

  Board.push({ x: 10, y: 6, name: "St. James Place", type: "property", class: 3 });
  Board.push({ x: 10, y: 8, name: "Tennessee Avenue", type: "property", class: 3 });
  Board.push({ x: 10, y: 9, name: "New York Avenue", type: "property", class: 3 });

  Board.push({ x: 9, y: 10, name: "Kentucky Avenue", type: "property", class: 4 })
  Board.push({ x: 7, y: 10, name: "Indiana Avenue", type: "property", class: 4 })
  Board.push({ x: 6, y: 10, name: "Illinois Avenue", type: "property", class: 4 })

  Board.push({ x: 4, y: 10, name: "Atlantic Avenue", type: "property", class: 5 })
  Board.push({ x: 3, y: 10, name: "Ventor Avenue", type: "property", class: 5 })
  Board.push({ x: 1, y: 10, name: "Marvin Gardens", type: "property", class: 5 })

  Board.push({ x: 0, y: 9, name: "Pacific Avenue", type: "property", class: 6 })
  Board.push({ x: 0, y: 8, name: "North Carolina Avenue", type: "property", class: 6 })
  Board.push({ x: 0, y: 6, name: "Pennsylvania Avenue", type: "property", class: 6 })

  Board.push({ x: 0, y: 3, name: "Park Place", type: "property", class: 7 })
  Board.push({ x: 0, y: 1, name: "Boardwalk", type: "property", class: 7 })
}

bootBoard();

let Scenes = {
  startScene: "StartScene",
  allScenes: [
    {
      name: "StartScene",
      objects: [
        {
          def: "Camera, 0, 0, Camera",
        },
        {
          def:"CashDisplayPlayer1, 0, 0, CashDisplay",
          componentValues:["CashDisplayBehavior|player|1"]
        },
        {
          def:"CashDisplayPlayer2, 0, 50, CashDisplay",
          componentValues:["CashDisplayBehavior|player|2"]
        },
        {
          def: "PropertyBuilderGameObject, EmptyGameObject",
          components: ["PropertyBuilder"]
        },
        {
          def: "Player1, 100, 100, .1, .1, Player",
          componentValues: ["PlayerBehavior|player|0", "CircleComponent|fill|blue"]
        },
        {
          def: "Player2, 100, 100, .1, .1, Player",
          componentValues: ["PlayerBehavior|player|1", "CircleComponent|fill|red"]
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

let GameBehaviors = {
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
  components: ["TextComponent", "CashDisplayBehavior"]
}


let Prefabs = { Player, CashDisplay };
Base.main(Prefabs, GameBehaviors, Scenes);