import Engine from "../../engine/Engine.js";
import MovementBehavior from "../behaviors/MovementBehavior.js";
import DotBehavior from "../behaviors/DotBehavior.js";

export default class CollisionDot extends Engine.Base.GameObject{
  constructor(x,y) {
    super(x,y)
    let circleComponent = new Engine.Components.CircleComponent(2, "black", "black");
    this.addComponent(circleComponent);
    let movement = new MovementBehavior()
    this.addComponent(movement);
    let dotBehavior = new DotBehavior();
    this.addComponent(dotBehavior);
    let Point = new Engine.Components.Point();
    this.addComponent(Point);

  }

}