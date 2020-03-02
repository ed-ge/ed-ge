import Engine from "../../engine/Engine.js";
import CircleBehavior from "../behaviors/CircleBehavior.js"

export default class OscillatingCircle extends Engine.Base.GameObject{
  constructor(x, y) {
    super(x, y)
    let circleComponent = new Engine.Components.CircleComponent(50, "green", "blue");
    let circleBehavior = new CircleBehavior();
    this.addComponent(circleComponent);
    this.addComponent(circleBehavior);

  }

}