import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"
import TextBehavior from "../behaviors/TextBehavior.js"

export default {
  name: "ResponsiveText",
  components:[
    {
      type:"TextComponent",
      values:[
        {
          key:"text",
          value:"10"
        },
        {
          key:"fill",
          value:"red"
        },
        {
          key:"font",
          value:"30pt Times"
        },
      ]
    },
    {
      type:"TextBehavior",
      
    },
    
  ]
}


/*export default class ResponsiveText extends Base.GameObject {
  constructor(x, y) {
    super(x, y);
    let textComponent = new Components.TextComponent;
    textComponent.text = "10";
    textComponent.font = "30pt Times";
    textComponent.fill = "red";
    
    let textBehavior = new TextBehavior;
    this.addComponent(textComponent);
    this.addComponent(textBehavior);

  }
}*/