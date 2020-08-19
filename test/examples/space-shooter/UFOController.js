import Base from "../../../src/Base.js"
import Main from "../../../src/Main.js"
import Point from "../../../src/base/Point.js";

export default class UFOController extends Base.Behavior {
  start() {
    this.nextBullets = 2;
    this.elapsedTime = 0;
    this.circle = this.$go.$("CircleComponent");
    this.speed = 100;

    

  }
  update() {
    this.elapsedTime += Base.Time.deltaTime;
    if (this.elapsedTime >= this.nextBullets) {
      this.elapsedTime = 0;
      this.fire();
    }
    this.$go.y += Base.Time.deltaTime * this.speed;
  }
  fire() {
    let bullets = 20;
    for(let i = 0; i < bullets; i++){
      let angle = Math.PI*2/bullets * i;
      let locX = this.$go.worldLocation.x + Math.cos(angle)*this.circle.radius;
      let locY = this.$go.worldLocation.y + Math.sin(angle)*this.circle.radius;
      let bullet = Base.Serializer.instantiate(Base.SceneManager.Prefabs.UFOBullet, Base.$$, new Base.Point(locX, locY) );
      bullet.$("UFOBulletController").angle = angle;
    }
    
  }


}

