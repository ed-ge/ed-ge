import Base from "../../../src/Base.js"
export default class DeckSizeText extends Base.Behavior{
  start(){
    this.TextComponent = this.gameObject.getComponent("TextComponent");
    this.originalText = this.TextComponent.text;
    this.DeckLogic = this.gameObject.parent.getComponent("DeckLogic");

  }
  update(){
    this.TextComponent.text = this.originalText + " " + this.DeckLogic.cards.length;
   
  }

}