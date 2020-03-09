import Base from "../../engine/Base.js";
import Components from "../../engine/Components.js"
import TileBehavior from "../behaviors/TileBehavior.js";


export default {
  name: "Tile",
  components: [
    {
      type: "RectangleComponent",
      values: [
        {
          key: "width",
          value: "100"
        },
        {
          key: "height",
          value: "100"
        },
        {
          key: "fill",
          value: "green"
        },
        {
          key: "stroke",
          value: "black"
        },
      ]
    },
    {
      type: "TileBehavior",

    },
  ]
}


/*export default class Tile extends Base.GameObject{
  constructor() {
    super(0,0)
    let rectangleComponent = new Components.RectangleComponent;
    rectangleComponent.width = 100;
    rectangleComponent.height = 100;
    rectangleComponent.fill = "green";
    rectangleComponent.stroke = "black";
    this.addComponent(rectangleComponent);
    this.addComponent(new TileBehavior());

  }

}*/