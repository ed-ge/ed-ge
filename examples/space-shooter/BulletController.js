
export default class BulletController extends Base.Behavior {
  start() {
    this.speed = 1000;
    this.lifetime = 0;
    
  }
  update() {
    this.$go.y -= Base.Time.deltaTime * this.speed;
    this.lifetime += Base.Time.deltaTime;
    if(this.$go.y < -1000)
      this.$go.parent.destroy(this.$go);
  }
  onCollisionEnter(other){
    if(other.gameObject.name == "UFO")
      this.$go.parent.destroy(this.$go)
    
  }
 


}

