import Base from "../../../src/Base.js"

export default class SelectableCard extends Base.Behavior {
  start() {
    this.MainController = Base.$("MainController").$("MainController");
    this.gameObject.$("RectangleComponent").lineWidth = 5;
    this.mouseDown = false;
    this.hover = false;
    this.directChild = null;
  }
  update() {
    if (this.MainController.selectedCard == this) {
      this.gameObject.$("RectangleComponent").stroke = "green"
      this.gameObject.$("RectangleComponent").fill = "rgba(255,0,0,.5)"
    }
    else {
      if (this.directChild == null)
        this.gameObject.$("RectangleComponent").stroke = "black"
      else
        this.gameObject.$("RectangleComponent").stroke = "red"
      if (this.hover)
        this.gameObject.$("RectangleComponent").fill = "black"
      else
        this.gameObject.$("RectangleComponent").fill = "pink"
    }

    if (this.MainController.selectedCard == this) {
      let mouseDelta = Base.Input.lastFrameMousePosition.diff(Base.Input.frameMousePosition);
      this.gameObject.x -= mouseDelta.x;
      this.gameObject.y -= mouseDelta.y;
    }

  }
  onMouseDown() {
    if (!this.hover)
      this.mouseDown = true;
    else {
      //let hoveringCard = this.MainController.selectedCard.gameObject;
      //this.gameObject.addChild(hoveringCard);
    }
    this.MainController.cardClickEvent(this);
  }
  onMouseUp() {
    if (this.hover) {
      if (this.MainController.selectedCard != this.gameObject.$("SelectableCard")) {
        if (this.MainController.selectedCard != null) {
          this.directChild = this.MainController.selectedCard;
          this.hover = false;
        }
      }

    }
    else {
      this.mouseDown = false;
      this.MainController.cardClickEvent(null);
    }
  }
  onMouseEnter() {
    console.log("Mouse entering");
    if (this.MainController.selectedCard != this.gameObject.$("SelectableCard")) {
      if (this.MainController.selectedCard != null)
        this.hover = true;
    }
    else{
      this.hover = false;
    }
  }
  
  onMouseExit() {
    console.log("Mouse leaving");
    this.hover = false;
  }

}