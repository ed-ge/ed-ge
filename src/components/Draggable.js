import Behavior from "../base/Behavior.js"
import Input from "../base/Input.js"



export default class Draggable extends Behavior {
  start() {
    this.mouseDown = false;
  }

  update() {
    if (this.mouseDown) {
      let point = Input.lastFrameMousePosition.diff(Input.frameMousePosition);
      
      this.gameObject.x -= point.x;
      this.gameObject.y -= point.y;
    }
  }
  onMouseDown() {
    this.mouseDown = true;
  }
  onMouseUp() {
    this.mouseDown = false;
  }
}