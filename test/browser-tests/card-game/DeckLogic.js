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
  onMouseDown() {
    if (!this.hover) {
      if (this.cards.length > 0) {
        this.mainController.deckClick(this, Base.Input.frameMousePosition);
      }
    }
    else{
      this.mainController.addCardEvent(this);
    }
  }
  onMouseOver() {
    if (this.mainController.selectedCard != null)
      this.hover = true;
  }
  onMouseEnter() {
    console.log("Mouse Enter")
  }
  onMouseExit() {
    console.log("Mouse Exit")
    this.hover = false;
  }

}