import Base from "../../engine/Base.js"
import TileBehavior from "./TileBehavior.js";
import Tile from "../prefabs/Tile.js"


export default class NapsterBehavior extends Base.Behavior {
  peons = []
  start() {

    let marginX = 100;
    let marginY = 100;

    for (let i = 0; i < 3; i++) {
      this.peons.push([]);
      for (let j = 0; j < 3; j++) {
        let tile = new Tile();
        tile.x = i * 100 + marginX;
        tile.y = j * 100 + marginY;
        this.gameObject.children.push(tile);
        this.peons[i].push(tile);
      }
    }

    this.select(0,0);

  }
  update() {

  }
  select(x, y) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let tile = this.peons[i][j];
        let behavior = tile.getComponent(TileBehavior);
        if (i != x || j != y)
          behavior.selected = false;
        else
          behavior.selected = true;
      }
    }
  }
}