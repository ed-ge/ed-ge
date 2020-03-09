import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"
import TextBehavior from "../behaviors/TextBehavior.js"
import GameBehaviors from "../GameBehaviors.js";

export default class Timer extends Base.GameObject {
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
}