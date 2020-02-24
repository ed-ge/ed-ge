import Base from "../../engine/Base.js";
import Components from "../../engine/Components.js"
import OrbitBehavior from "./../behaviors/OrbitBehavior.js"
import MovementBehavior from "../behaviors/MovementBehavior.js";
import DotBehavior from "../behaviors/DotBehavior.js";

export default class CollisionDot extends Base.GameObject{
  constructor(x,y) {
    super(x,y)
    let circleComponent = new Components.CircleComponent(2, "black", "black");
    this.components.push(circleComponent);
    let movement = new MovementBehavior()
    this.addComponent(movement);
    let dotBehavior = new DotBehavior();
    this.addComponent(dotBehavior);

  }

}