import Base from "../../engine/Base.js";
import Components from "../../engine/Components.js"
import OrbitBehavior from "./../behaviors/OrbitBehavior.js"

export default class OscillatingCircle extends Base.GameObject{
  constructor() {
    super(0,0)
    let circleComponent = new Components.CircleComponent(10, "white", "black");
    let orbitBehavior = new OrbitBehavior();
    this.addComponent(circleComponent);
    this.addComponent(orbitBehavior);

  }

}