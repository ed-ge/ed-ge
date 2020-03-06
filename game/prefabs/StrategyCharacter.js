import Engine from "../../engine/Engine.js";
import CollisionCircleBehavior from "../behaviors/CollisionCircleBehavior.js"

export default class StrategyCharacter extends Engine.Base.GameObject {
  constructor(x, y) {
    super(x, y)
    let circleComponent = new Engine.Components.CircleComponent(25, "rgba(255,255,0,.5)", "black");
    this.addComponent(circleComponent)
   

  }

}