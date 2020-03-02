import Engine from "../../engine/Engine.js";
import OrbitBehavior from "./../behaviors/OrbitBehavior.js"

export default class OscillatingCircle extends Engine.Base.GameObject{
  constructor() {
    super(0,0)
    let circleComponent = new Engine.Components.CircleComponent(10, "white", "black");
    let orbitBehavior = new OrbitBehavior();
    this.addComponent(circleComponent);
    this.addComponent(orbitBehavior);

  }

}