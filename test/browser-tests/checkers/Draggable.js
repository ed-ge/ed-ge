import Base from "../../../src/Base.js"



export default class Draggable extends Base.Behavior {
  start() {
    this.mouseDown = false;
  }

  update() {
    if (this.mouseDown) {
      let point = Base.Input.lastFrameMousePosition.diff(Base.Input.frameMousePosition);
      
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