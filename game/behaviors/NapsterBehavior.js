import Base from "../../engine/Base.js"
import TileBehavior from "./TileBehavior.js";
import Tile from "../prefabs/Tile.js"
import SceneManager from "../SceneManager.js";
import Point from "../../engine/base/Point.js";
import GameObjects from "../GameObjects.js"


export default class NapsterBehavior extends Base.Behavior {
  peons = []
  start() {

    let marginX = 100;
    let marginY = 100;

    let tilesWide = 8;
    let tilesHigh = 5;

    for (let y = 0; y < tilesHigh; y++) {
      this.peons.push([]);
      for (let x = 0; x < tilesWide; x++) {
        let tile = new Tile();
        tile.x = x * 100 + marginX;
        tile.y = y * 100 + marginY;
        this.gameObject.children.push(tile);
        this.peons[y].push(tile);

        //Randomly assign water
        let waterBehavior = tile.getComponent(TileBehavior);
        if(Math.random() < .1 && (y != 0 && x != 0)){
          waterBehavior.isWater = true;
        }
      }
    }

    this.select(0,0);

    //Add the strategy character
    let strategyCharacter = SceneManager.instantiate(GameObjects.StrategyCharacter, new Point(marginX*2+20, marginY-25), 0);

  }
  update() {

  }
  select(x, y) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let tile = this.peons[i][j];
        let behavior = tile.getComponent(TileBehavior);
        if (i != x || j != y)
          behavior.hasCharacter = false;
        else
          behavior.hasCharacter = true;
      }
    }
  }
}