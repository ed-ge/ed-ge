import Base from "../../../src/Base.js"
import Main from "../../../src/Main.js"
import Point from "../../../src/base/Point.js";

export default class BulletController extends Base.Behavior {
  start() {
    this.speed = 1000;
    this.lifetime = 0;
    
  }
  update() {
    this.$go.y -= Base.Time.deltaTime * this.speed;
    this.lifetime += Base.Time.deltaTime;
    if(this.lifetime > 1)
      this.$go.parent.destroy(this.$go);
  }
 


}

