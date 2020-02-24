import Base from "../../engine/Base.js";
import Components from "../../engine/Components.js"
import OrbitBehavior from "./../behaviors/OrbitBehavior.js"

export default class CollisionCircle extends Base.GameObject{
  constructor(x,y) {
    super(x,y)
    let circleComponent = new Components.CircleComponent(50, "Yellow", "black");
   this.children.push(circleComponent)

  }

}