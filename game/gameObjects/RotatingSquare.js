import  Components from "../../engine/Components.js"
import Base from "../../engine/Base.js"
import RectangleBehavior from "../../game/behaviors/RectangleBehavior.js";


class RotatingSquare extends Base.GameObject {
  constructor(x, y) {
    super(x, y);
    let rectangleComponent = new Components.RectangleComponent(100, 100, "red", "blue");
    let rectangleBehavior = new RectangleBehavior();
    this.addComponent(rectangleComponent);
    this.addComponent(rectangleBehavior);
  }

}

export default RotatingSquare;