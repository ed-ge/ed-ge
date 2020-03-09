import  Components from "../../engine/Components.js"
import Base from "../../engine/Base.js"
import RectangleBehavior from "../../game/behaviors/RectangleBehavior.js";


export default class RotatingSquare extends Base.GameObject {
  constructor(x, y) {
    super(x, y);
    let rectangleComponent = new Components.RectangleComponent;
    rectangleComponent.width = 100;
    rectangleComponent.height = 100;
    rectangleComponent.fill = "red";
    rectangleComponent.stroke = "blue";
    let rectangleBehavior = new RectangleBehavior();
    this.addComponent(rectangleComponent);
    this.addComponent(rectangleBehavior);
  }

}