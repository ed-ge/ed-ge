import Base from "../../../src/Base.js"

/*
States:
P = has parent
C = has child
S = is selected (mouse down)
D = hovering over deck

P C S D
N N N N Pink, black border
Y N N N Pink, black border
N Y N N Pink, red border
Y Y N N Pink, red border
N N Y N Pink, green border
Y N Y N Pink
N N Y N
Y Y Y N
N Y N Y
Y N N Y
N N N Y
Y Y N Y
N Y Y Y
Y N Y Y
N N Y Y
Y Y Y Y



*/

export default class SelectableCard extends Base.Behavior {
  start() {
    this.MainController = Base.$("MainController").$("MainController");
    this.gameObject.$("RectangleComponent").lineWidth = 5;
    this.mouseDown = false;
    this.hover = false;
    this.directChild = null;
    this.directParent = null;
    this.collisionDeck = null;
    this.collisionCards = [];
  }
  get inCollision(){
    let freeCards = this.collisionCards.filter(x=>x != this.directChild && x != this.directParent);
    return freeCards.length !=0;
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
      if (this.inCollision && this.directChild == null && this.directParent == null)
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
    this.MainController.setSelectedCard(this);
  }
  
  onMouseUp() {
    //First see if we needto add ourselves to a deck
    if (this.MainController.selectedCard == this) {
      if (this.collisionDeck != null) {
        this.MainController.addCardEvent(this.collisionDeck.gameObject.$("DeckLogic"));
        this.collisionDeck.gameObject.$("DeckLogic").inCollision = false;
        return;
      }
    }
    if(this.MainController.selectedCard == this){
      if(this.directParent){
        //See if we are still in collisios with our direct parent
        if(!this.collisionCards.includes(this.directParent)){
          this.directParent.directChild = null;
          this.directParent = null;
        }
      }
      else{
        //See if we get a new parent
        let potentialParents = this.collisionCards.filter(x=>x.directChild == null && x != this.directChild);
        if(potentialParents.length > 0)
        {
          this.directParent = potentialParents[0];
          this.directParent.directChild = this;
        }
      }
    }
    // if (this.inCollision) {
    //   if (this.MainController.selectedCard == this.gameObject.$("SelectableCard")) {
    //     for (let i = 0; i < this.collisionCards.length; i++) {
    //       let collision = this.collisionCards[i];
    //       let go = collision.gameObject;
    //       let sc = go.$("SelectableCard");
    //       if (sc.directChild == null) {
    //         sc.directChild = this;
    //         this.directParent = sc;
    //       }
    //     }

    //   }
    // }

    this.mouseDown = false;
    this.MainController.setSelectedCard(null);

  }
  onMouseEnter() {
    //   console.log("Mouse entering");
    //   if (this.MainController.selectedCard != this.gameObject.$("SelectableCard")) {
    //     if (this.MainController.selectedCard != null)
    //       if (this.directChild == null)
    //         this.hover = true;
    //   }
    //   else {
    //     this.hover = false;
    //   }
  }

  onMouseExit() {
    console.log("Mouse leaving");
    // this.hover = false;
  }
  onCollisionEnter(collision) {
    if (collision.gameObject.$any("DeckLogic"))
      this.collisionDeck = collision;
    else
      this.MainController.cardCollision(this, collision);
    // if (collision.gameObject.$any("SelectableCard")) { 
    //   if (!this.collisionCards.includes(collision)) {
    //     this.collisionCards.push(collision);
    //   }
    // }

  }
  onCollisionExit(collision) {
    if (collision.gameObject.anyComponent("DeckLogic"))
      this.collisionDeck = null;
    else{
      this.MainController.cardCollisionExit(this,collision)
    }
    _.pull(this.collisionCards, collision);
  }
  onCollisionStay(collisionStay) {

  }

}