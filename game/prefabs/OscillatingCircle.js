import Engine from "../../engine/Engine.js";
import CircleBehavior from "../behaviors/CircleBehavior.js"
import CircleCollider from "../../engine/components/CircleCollider.js";

export default class OscillatingCircle extends Engine.Base.GameObject{
  constructor(x, y) {
    super(x, y)
    let circleComponent = new Engine.Components.CircleComponent;
    circleComponent.radius = 50;
    circleComponent.fill = "green";
    circleComponent.stroke = "blue";
    let circleBehavior = new CircleBehavior();
    this.addComponent(circleComponent);
    this.addComponent(circleBehavior);

  }

}