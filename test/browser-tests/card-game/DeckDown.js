import Base from "../../../src/Base.js"
export default class DeckDown extends Base.Behavior {
  start(){
    this.deckLogic = this.$go.$("DeckLogic");
    this.rectangleComponent = this.$go.$("RectangleComponent");
  }
  update(){
    if(this.deckLogic.cards.length > 0){
      this.rectangleComponent.fill = "red";
    }
    else{
      this.rectangleComponent.fill = "white";
    }

  }
}