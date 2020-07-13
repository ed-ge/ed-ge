import Base from "../../../src/Base.js"
export default class DeckLogic extends Base.Behavior {
  start() {
    this.cards = [];
    this.mainController = Base._cs.findByName("MainController").$("MainController");
    this.hover = false;
  }
  update() {
    if ( this.inCollision)
      this.gameObject.$("RectangleComponent").fill = "gray";
    // else
    //   this.gameObject.$("RectangleComponent").fill = "white";
  }
  
  onMouseDown() {
    if (!this.inCollision) {
      if (this.cards.length > 0) {
        this.mainController.deckClick(this, Base.Input.frameMousePosition);
      }
    }    
  }
  
  
  onCollisionEnter(collider){
    console.log("Collision Enter");
    this.inCollision = true;
  }
  onCollisionExit(collider){
    console.log("Collision Exit");
    this.inCollision = false;
  }

}