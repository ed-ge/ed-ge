import Base from "../../engine/Base.js";
import Components from "../../engine/Components.js"
import TileBehavior from "../behaviors/TileBehavior.js";

export default class Tile extends Base.GameObject{
  constructor() {
    super(0,0)
    let rectangleComponent = new Components.RectangleComponent(100, 100, "green", "black");
    this.addComponent(rectangleComponent);
    this.addComponent(new TileBehavior());

  }

}