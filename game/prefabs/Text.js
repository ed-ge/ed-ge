import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"


export default class Text extends Base.GameObject {
  constructor(x, y) {
    super(x, y);
    let textComponent = new Components.TextComponent("10", "20pt Times", "black");
    this.addComponent(textComponent);
  }
}