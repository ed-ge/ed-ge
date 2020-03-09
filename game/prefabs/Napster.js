import Base from "../../engine/Base.js";
import NapsterBehavior from "../behaviors/NapsterBehavior.js";
import Tile from "../prefabs/Tile.js"

export default class Napster extends Base.GameObject{
  constructor() {
    super(120,-30)
    let napster = new NapsterBehavior;
    this.addComponent(napster);
    

  }

}