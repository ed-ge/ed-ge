import Engine from "../../engine/Engine.js";
import OrbitBehavior from "./../behaviors/OrbitBehavior.js"


export default {
  name: "Moon",
  components: [
    {
      type: "CircleComponent",
      values: [
        {
          key: "radius",
          value: "10"
        },
        {
          key: "fill",
          value: "white"
        },
        {
          key: "stroke",
          value: "black"
        },
      ]
    },
    {
      type: "OrbitBehavior",
    }
  ]
}

/*export default class OscillatingCircle extends Engine.Base.GameObject {
  constructor() {
    super(0, 0)
    let circleComponent = new Engine.Components.CircleComponent;
    circleComponent.radius = 10;
    circleComponent.fill = "white";
    circleComponent.stroke = "black";
    let orbitBehavior = new OrbitBehavior();
    this.addComponent(circleComponent);
    this.addComponent(orbitBehavior);

  }

}*/