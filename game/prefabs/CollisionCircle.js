import Base from "../../engine/Base.js";
import Components from "../../engine/Components.js"
import CircleCollider from "./../engine/components/CircleCollider.js"

export default class CollisionCircle extends Base.GameObject {
  constructor(x, y) {
    super(x, y)
    let circleComponent = new Components.CircleComponent(50, "rgba(255,255,0,.5)", "black");
    this.components.push(circleComponent)
    let circlCollider = new CircleCollider();
    this.components.push(circlCollider);

  }

}