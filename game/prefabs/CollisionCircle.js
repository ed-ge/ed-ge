import Engine from "../../engine/Engine.js";
import CollisionCircleBehavior from "../behaviors/CollisionCircleBehavior.js"

export default {
  name: "CollisionCircle",
  components:[
    {
      type:"CircleComponent",
      values:[
        {
          key:"radius",
          value:"50"
        },
        {
          key:"fill",
          value:"rgba(255,255,0,.5)"
        },
        {
          key:"stroke",
          value:"black"
        },
      ]
    },
    {
      type:"CircleCollider",
      values:[
        {
          key:"radius",
          value:"50"
        }
      ]
    },
    {
      type:"CollisionCircleBehavior",
    },
  ]
}

/*export default class CollisionCircle extends Engine.Base.GameObject {
  constructor(x, y) {
    super(x, y)
    let circleComponent = new Engine.Components.CircleComponent;
    circleComponent.radius = 50;
    circleComponent.fill = "rgba(255,255,0,.5)";
    circleComponent.stroke = "black";
    this.addComponent(circleComponent)
    let circlCollider = new Engine.Components.CircleCollider;
    circlCollider.radius = 50;
    this.addComponent(circlCollider);
    let collisionCircleBehavior = new CollisionCircleBehavior();
    this.addComponent(collisionCircleBehavior);

  }

}*/