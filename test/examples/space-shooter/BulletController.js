import Base from "../../../src/Base.js"
import Main from "../../../src/Main.js"
import Point from "../../../src/base/Point.js";

export default class BulletController extends Base.Behavior {
  start() {
    this.speed = 1000;
    this.lifetime = 0;
    this.main = Base.$$.findByName("MainController").$("MainController");

    
  }
  update() {
    this.$go.y -= Base.Time.deltaTime * this.speed;
    this.lifetime += Base.Time.deltaTime;
    if(this.$go.y < -this.main.height)
      this.$go.parent.destroy(this.$go);
  }
  onCollisionEnter(other){
    if(other.gameObject.name == "UFO")
      this.$go.parent.destroy(this.$go)
    
  }
 


}

