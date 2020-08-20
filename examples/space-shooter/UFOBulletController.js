
export default class UFOBulletController extends Base.Behavior {
  start() {
    this.speed = 500;
    this.angle = 0;
    this.main = Base.$$.findByName("MainController").$("MainController");

    
  }
  update() {
    this.$go.x += Base.Time.deltaTime * this.speed * Math.cos(this.angle);
    this.$go.y += Base.Time.deltaTime * this.speed * Math.sin(this.angle);
    if(this.$go.worldLocation.x > this.main.width || 
      this.$go.worldLocation.x < -this.main.width || 
      this.$go.worldLocation.y > this.main.height ||
       this.$go.worldLocation.y < -this.main.height)
      this.$go.parent.destroy(this.$go);
  }
  onCollisionEnter(other){
    if(other.gameObject.name == "SpaceshipBody")
      this.$go.parent.destroy(this.$go)
  }
}

