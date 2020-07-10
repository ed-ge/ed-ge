import Base from "../../../src/Base.js"
export default class DeckLogic extends Base.Behavior {
  start() {
    this.cards = [];
    this.mainController = Base.SceneManager.currentScene.findByName("MainController").getComponent("MainController");
    this.hover = false;
  }
  update() {
    if (this.hover)
      this.gameObject.$("RectangleComponent").fill = "black";
    else
      this.gameObject.$("RectangleComponent").fill = "white";

  }
  onMouseUp(){
    if(this.hover){
      this.mainController.addCardEvent(this);
      this.hover = false;
    }
  }
  onMouseDown() {
    if (!this.hover) {
      if (this.cards.length > 0) {
        this.mainController.deckClick(this, Base.Input.frameMousePosition);
      }
    }
    
  }
  onMouseOver() {
  }
  onMouseEnter() {
    if (this.mainController.selectedCard != null)
      this.hover = true;
    console.log("Mouse Enter")
  }
  onMouseExit() {
    console.log("Mouse Exit")
    this.hover = false;
  }

}