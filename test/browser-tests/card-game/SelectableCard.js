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
    }
    else{
      this.gameObject.$("RectangleComponent").stroke = "black"
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