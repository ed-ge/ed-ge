import Base from "../../engine/Base.js"
import Napster from "../prefabs/Napster.js";
import NapsterBehavior from "../behaviors/NapsterBehavior.js";
import Tile from "../prefabs/Tile.js";

export default class StrategyScene extends Base.Scene{
  constructor(){
    super("StrategyScene");

    let napster = new Napster();
    this.children.push(napster);

    let marginX = 100;
    let marginY = 100;

    let napsterBehavior = napster.getComponent(NapsterBehavior);

    for(let i = 0; i < 3; i++){
        napsterBehavior.peons.push([]);
        for(let j =0; j < 3; j++){
            let tile = new Tile();
            tile.x = i * 100 + marginX;
            tile.y = j*100 + marginY;
            this.children.push(tile);
            napsterBehavior.peons[i].push(tile);
        }
    }

    napsterBehavior.select(0,0);
    
  }
}