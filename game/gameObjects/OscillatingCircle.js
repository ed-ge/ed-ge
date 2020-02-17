import Base from "../../engine/Base.js";
import Components from "../../engine/Components.js"
import CircleBehavior from "../behaviors/CircleBehavior.js"

export default class OscillatingCircle extends Base.GameObject{
  constructor(x, y) {
    super(x, y)
    let circleComponent = new Components.CircleComponent(50, "green", "blue");
    let circleBehavior = new CircleBehavior();
    this.addComponent(circleComponent);
    this.addComponent(circleBehavior);

  }

}