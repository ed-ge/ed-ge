import Base from "../../../src/Base.js"

export default class TouchStart extends Base.Behavior {
  start() {
    this.scale = 200;

  }
  update() {
   

  }

  onTouchStart() {
    this.gameObject.x += (Math.random() * 2 - 1) * this.scale;
    this.gameObject.y += (Math.random() * 2 - 1) * this.scale;

    this.gameObject.x = Math.max(100, Math.min(this.gameObject.x, 600));
    this.gameObject.y = Math.max(100, Math.min(this.gameObject.y, 600));
  }

}