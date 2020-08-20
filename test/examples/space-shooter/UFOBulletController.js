import Base from "../../../src/Base.js"
import Main from "../../../src/Main.js"
import Point from "../../../src/base/Point.js";

export default class UFOBulletController extends Base.Behavior {
  start() {
    this.speed = 500;
    this.angle = 0;
    
  }
  update() {
    this.$go.x += Base.Time.deltaTime * this.speed * Math.cos(this.angle);
    this.$go.y += Base.Time.deltaTime * this.speed * Math.sin(this.angle);
    if(this.$go.worldLocation.x > 1000 || this.$go.worldLocation.x < -1000 || this.$go.worldLocation.y > 1000 | this.$go.worldLocation.y < -1000)
      this.$go.parent.destroy(this.$go);
  }
  onCollisionEnter(other){
    if(other.gameObject.name == "SpaceshipBody")
      this.$go.parent.destroy(this.$go)
  }
}

