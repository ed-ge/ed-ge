import Base from "../../../src/Base.js"
export default class DeckLogic extends Base.Behavior {
  start() {
    this.cards = [];
    this.mainController = Base.SceneManager.currentScene.findByName("MainController").getComponent("MainController");
    this.hover = false;
    this.inCollision = false;
  }
  update() {
    if ( this.inCollision)
      this.gameObject.$("RectangleComponent").fill = "black";
    else
      this.gameObject.$("RectangleComponent").fill = "white";
    //this.inCollision = false;

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
  
  onMouseEnter() {
    if (this.mainController.selectedCard != null)
      this.hover = true;
    console.log("Mouse Enter")
  }
  onMouseExit() {
    console.log("Mouse Exit")
    this.hover = false;
  }
  onCollisionStay(collider){
    //console.log("Collision Stay " + collider)
    //this.inCollision = true;
    //this.inCollision = true;
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