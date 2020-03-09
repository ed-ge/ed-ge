import Engine from "../../engine/Engine.js";
import CollisionCircleBehavior from "../behaviors/CollisionCircleBehavior.js"


export default {
  name: "StrategyCharacter",
  components:[
    {
      type:"CircleComponent",
      values:[
        {
          key:"radius",
          value:"25"
        },
        {
          key:"fill",
          value:"yellow"
        },
        {
          key:"stroke",
          value:"black"
        },
      ]
    },
    
  ]
}

/*export default class StrategyCharacter extends Engine.Base.GameObject {
  constructor(x, y) {
    super(x, y)
    let circleComponent = new Engine.Components.CircleComponent;
    circleComponent.radius = 25;
    circleComponent.fill = "rgba(255,255,0,.5)";
    circleComponent.stroke = "black";
    this.addComponent(circleComponent)
   

  }

}*/