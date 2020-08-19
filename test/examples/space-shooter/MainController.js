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

      let baseX = 0;
      let baseY = -500

      let x = ((Math.random() - .5) * 2) * 400 + baseX;
      let y = ((Math.random() - .5) * 2) * 100 + baseY;
      let UFO = Base.Serializer.instantiate(Base.SceneManager.Prefabs.UFO, Base.$$, new Point(x,y));

    }
  }
 


}

