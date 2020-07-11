import Base from "../../../src/Base.js"

export default class SelectableCard extends Base.Behavior {
  start() {
    this.MainController = Base.$("MainController").$("MainController");
    this.gameObject.$("RectangleComponent").lineWidth = 5;
    this.mouseDown = false;
    this.hover = false;
    this.directChild = null;
    this.directParent = null;
    this.collisionDeck = null;
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
      this.parentMove(mouseDelta);

    }

  }
  parentMove(point) {
    this.gameObject.x -= point.x;
    this.gameObject.y -= point.y;
    if (this.directChild != null) {
      this.directChild.parentMove(point);
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
    //First see if we needto add ourselves to a deck
    if(this.MainController.selectedCard == this){
      if(this.collisionDeck != null){
        this.MainController.addCardEvent(this.collisionDeck.gameObject.$("DeckLogic"));
        this.collisionDeck.gameObject.$("DeckLogic").inCollision = false;
        return;
      }
    }
    if (this.hover) {
      if (this.MainController.selectedCard != this.gameObject.$("SelectableCard")) {
        if (this.MainController.selectedCard != null) {
          this.directChild = this.MainController.selectedCard;
          this.directChild.directParent = this;
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
        if (this.directChild == null)
          this.hover = true;
    }
    else {
      this.hover = false;
    }
  }

  onMouseExit() {
    console.log("Mouse leaving");
    this.hover = false;
  }
  onCollisionEnter(collision){
    if(collision.gameObject.anyComponent("DeckLogic"))
      this.collisionDeck = collision;

  }
  onCollisionExit(collision){
    if(collision.gameObject.anyComponent("DeckLogic"))
      this.collisionDeck = null;
  }
  onCollisionStay(collisionStay){

  }

}