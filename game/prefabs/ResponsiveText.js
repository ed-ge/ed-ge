import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"
import TextBehavior from "../behaviors/TextBehavior.js"

export default class ResponsiveText extends Base.GameObject {
  constructor(x, y) {
    super(x, y);
    let textComponent = new Components.TextComponent("10", "30pt Times", "red", "blue");
    let textBehavior = new TextBehavior();
    this.addComponent(textComponent);
    this.addComponent(textBehavior);

  }
}