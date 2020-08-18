import Base from "../../../src/Base.js"
import Main from "../../../src/Main.js"
import Point from "../../../src/base/Point.js";

export default class UFOBulletController extends Base.Behavior {
  start() {
    this.speed = 1;
    this.elapsedTime = 0;
  }
  update() {
    this.elapsedTime +=  Base.Time.deltaTime;
    if(this.elapsedTime > this.speed){
      this.elapsedTime = 0;
    }
  }
 


}

