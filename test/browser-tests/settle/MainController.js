import Base from "../../../src/Base.js"
import Main from "../../../src/Main.js"
import Point from "../../../src/base/Point.js";

export default class MainController extends Base.Behavior {
  start() {
    //Build the board
    let startX = -100;
    let startY = -200;
    let radius = 75;
    let apothem = .866 * radius; // Approximation, see https://www.omnicalculator.com/math/hexagon#diagonals-of-a-hexagon

    let tiles = [];

    let indeces = [0, 1, -1, 2, -2]
    let hexagonsAcross = [3, 4, 5, 4, 3];

    for (let i = 0; i < hexagonsAcross.length; i++) {
      let across = hexagonsAcross[i];
      let lineStartX = startX;
      if (i % 2 == 1)
        lineStartX -= apothem

      for (let j = 0; j < across; j++) {
        let index = indeces[j]
        let tile = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Hexagon, Base._cs, new Base.Point(lineStartX + index * apothem * 2, startY + i * radius * 1.5), new Base.Point(1, 1), 0);
        tiles.push(tile);
      }
    }

    let totalHexagons = tiles.length;
    let assignmentArray = [];
    for (let i = 0; i < totalHexagons; i++) {
      assignmentArray.push(i);
    }
    assignmentArray = this.shuffleArray(assignmentArray);
    //Assign titles
    let tileTypes = [
      {name: "Empty", color:"lightgray", count:1},
      {name: "Brick", color:"red", count:3},
      {name: "Stone", color:"gray", count:3},
      {name: "Wheat", color:"yellow", count:4},
      {name: "Sheep", color:"lime", count:4},
      {name: "Wood", color:"green", count:4},
    ]

    let inc = 0;
    for(let i = 0; i < tileTypes.length; i++){
      let type = tileTypes[i];
      for(let j = 0; j < type.count; j++,inc++){
        tiles[assignmentArray[inc]].$("HexagonComponent").fill = type.color; 
      }
    }

    //Now setup the players
    let px = 300;
    let py = -200;
    let yMargin = 80
    let playerColors = ["red", "greed", "blue", "cyan"];
    for(let i = 0; i < 4; i++){
      let x = px;
      //Cities
      for(let c = 0; c < 4; c++){
        let city = Base.Serializer.instantiate(Base.SceneManager.Prefabs.City, Base._cs, new Point(px + c *30, py + i * yMargin ));
        city.$("CircleComponent").fill = playerColors[i];
      }
      x += 4*30;
      for(let t = 0; t < 4; t++){
        let town = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Town, Base._cs, new Point(x + t *30, py + i * yMargin ));
        town.$("RectangleComponent").fill = playerColors[i];
      }
      x += 4*30
      for(let t = 0; t < 4; t++){
        let road = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Road, Base._cs, new Point(x + t *30, py + i * yMargin ));
        road.$("CircleComponent").fill = playerColors[i];
      }
    }


  }
  // from https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
  shuffleArray(arr) {
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
    
  }


}

