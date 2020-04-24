import Base from "../../engine/Base.js"

export default class ClickBehavior extends Base.Behavior {
  start() {
    this.scale = 200;

  }
  update() {
    let delta = Base.Input.getTouchMove();
    if (delta && delta.length > 0) {
      this.gameObject.x += delta[0].x;
      this.gameObject.y += delta[0].y;
    }

  }

  onTouchStart() {
    console.error("Touch start");
    this.gameObject.x += (Math.random() * 2 - 1) * this.scale;
    this.gameObject.y += (Math.random() * 2 - 1) * this.scale;

    this.gameObject.x = Math.max(0, Math.min(this.gameObject.x, 1000));
    this.gameObject.y = Math.max(0, Math.min(this.gameObject.y, 1000));
  }

}