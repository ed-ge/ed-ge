import Base from "../../../src/Base.js"
import MainController from "./MainController.js";
export default class SelectableCard extends Base.Behavior{
  start(){
    this.MainController = Base.$("MainController").$("MainController");
    this.gameObject.$("RectangleComponent").lineWidth=5;
    this.mouseDown = false;
  }
  update(){
    if(this.MainController.selectedCard == this){
      this.gameObject.$("RectangleComponent").stroke = "green"
      this.gameObject.$("RectangleComponent").fill = "rgba(255,0,0,.5)"
    }
    else{
      this.gameObject.$("RectangleComponent").stroke = "black"
      this.gameObject.$("RectangleComponent").fill = "pink"
    }

    if(this.MainController.selectedCard == this){
      let mouseDelta = Base.Input.lastFrameMousePosition.diff(Base.Input.frameMousePosition);
      this.gameObject.x -= mouseDelta.x;
      this.gameObject.y -= mouseDelta.y;
    }
   
  }
  onMouseDown(){
    this.mouseDown = true;
  }
  onMouseUp(){
    this.mouseDown = false;
    this.MainController.cardClickEvent(this);
  }

}