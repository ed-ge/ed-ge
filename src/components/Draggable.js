import Behavior from "../base/Behavior.js"
import Input from "../base/Input.js"



export default class Draggable extends Behavior {
  start() {
    this.mouseDown = false;
    this.touchDown = false;
  }

  update() {
    if (this.mouseDown) {
      let point = Input.getMousePositionDelta();
      this.gameObject.x += point.x;
      this.gameObject.y += point.y;
    }
    if (this.touchDown) {
      let point = Input.getTouchMove()[0]
      this.gameObject.x += point.x;
      this.gameObject.y += point.y;
    }
    
    if(Input.anyTouchesEnd()){
      this.touchDown = false;
    }
  }
  onMouseDown() {
    this.mouseDown = true;
  }
  onMouseUp() {
    this.mouseDown = false;
  }
  onTouchStart(){
    this.touchDown = true;
  }
  onTouchEnd(){
    this.touchDown = false;
  }
}