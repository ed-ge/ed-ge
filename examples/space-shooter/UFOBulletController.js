
export default class UFOBulletController extends Base.Behavior {
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

