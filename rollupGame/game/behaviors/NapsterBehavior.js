import Base from "../../../rollup/Base.js"
import TileBehavior from "./TileBehavior.js";
import Tile from "../prefabs/Tile.js"
import GameObjects from "../GameObjects.js"


export default class NapsterBehavior extends Base.Behavior {


  start() {
    this.peons = []
    this.characterX = 0;
    this.characterY = 0;
    this.strategyCharacter = {};
    this.marginX = 100;
    this.marginY = 100;
    this.tilesWide = 8;
    this.tilesHigh = 5;



    for (let y = 0; y < this.tilesHigh; y++) {
      this.peons.push([]);
      for (let x = 0; x < this.tilesWide; x++) {
        let _x = x * 100 + this.marginX;
        let _y = y * 100 + this.marginY;
        let tile = Base.SceneManager.instantiate(Tile, new Base.Point(_x, _y), new Base.Point(1, 1), 0);
        this.gameObject.children.push(tile);
        this.peons[y].push(tile);

        //Randomly assign water
        let waterBehavior = tile.getComponent(TileBehavior);
        if (Math.random() < .1 && (y != 0 && x != 0)) {
          waterBehavior.isWater = true;
        }
      }
    }

    this.select(0, 0);

    //Add the strategy character
    this.strategyCharacter = Base.SceneManager.instantiate(GameObjects.StrategyCharacter, new Base.Point(this.marginX, this.marginY), new Base.Point(1, 1), 0);

  }
  update() {
    let proposedX = this.characterX;
    let proposedY = this.characterY;
    if (Base.Input.getKeyUp('ArrowUp')) {
      proposedY -= 1;
    }
    if (Base.Input.getKeyUp('ArrowDown')) {
      proposedY += 1
    }
    if (Base.Input.getKeyUp('ArrowLeft')) {
      proposedX -= 1
    }
    if (Base.Input.getKeyUp('ArrowRight')) {
      proposedX += 1
    }

    if (proposedX >= 0 && proposedX < this.tilesWide && proposedY >= 0 && proposedY < this.tilesHigh) {
      let tileBehavior = this.peons[proposedY][proposedX].getComponent(TileBehavior);
      if (!tileBehavior.isWater) {
        this.characterX = proposedX;
        this.characterY = proposedY;
        this.strategyCharacter.x = this.marginX + this.characterX * 100;
        this.strategyCharacter.y = this.marginY + this.characterY * 100;

        this.select(this.characterX, this.characterY);
      }
    }


  }
  select(_x, _y) {
    for (let y = 0; y < this.tilesHigh; y++) {
      for (let x = 0; x < this.tilesWide; x++) {
        let tile = this.peons[y][x];
        let behavior = tile.getComponent(TileBehavior);
        if (x != _x || y != _y)
          behavior.hasCharacter = false;
        else
          behavior.hasCharacter = true;
      }
    }
  }

}