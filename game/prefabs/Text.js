import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"


export default {
  name: "Text",
  components:[
    {
      type:"TextComponent",
      values:[
        {
          key:"text",
          value:"10"
        },
        {
          key:"font",
          value:"20pt Times"
        },
        {
          key:"fill",
          value:"black"
        },
       
      ]
    }
  ]

}


/*export default class Text extends Base.GameObject {
  constructor(x, y) {
    super(x, y);
    let textComponent = new Components.TextComponent;
    textComponent.text = "10";
    textComponent.font = "20pt Times";
    textComponent.fill = "black";
    this.addComponent(textComponent);
  }
}*/