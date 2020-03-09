import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"
import TextBehavior from "../behaviors/TextBehavior.js"
import GameBehaviors from "../GameBehaviors.js";


export default {
  name: "Timer",
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
          value:"30pt Times"
        },
        {
          key:"fill",
          value:"red"
        },
       
      ]
    },
    {
      type:"CountDownTimer",
    }
  ]

}



/*export default class Timer extends Base.GameObject {
  constructor(x, y) {
    super(x, y);
    let textComponent = new Components.TextComponent;
    textComponent.text = "10";
    textComponent.font = "30pt Times";
    textComponent.fill = "red";
    let countDownTimer = new GameBehaviors.CountDownTimer();
    this.addComponent(textComponent);
    this.addComponent(countDownTimer);

  }
}*/