
export default class UFOController extends Base.Behavior {
  start() {
    this.countDown = .1;
    this.speed = 10;
    this.circle = this.$go.$("CircleComponent");

    

  }
  update() {
    this.countDown -= Base.Time.deltaTime;
    if (this.countDown <= 0) {
      this.countDown = .1;
      this.fire();
    }
    this.$go.y += Time.deltaTime * this.speed;
  }
  fire() {
    let bullets = 20;
    for(let i = 0; i < bullets; i++){
      let angle = Math.PI*2/bullets * i;
      let locX = this.$go.worldLocation + Math.cos(angle)*this.circle.radius;
      let locY = this.$go.worldLocation + Math.sin(angle)*this.circle.radius;
      let bullet = Base.instantiate(Base.SceneManager.Prefabs.UFOBullet, Base.$$, new Base.Point(locX, locY) );
      
    }
    
  }


}

