
export default class DiceController extends Base.Behavior {
  start() {
    this.countDown = .1;
    this.blasters = [];
    this.blasters.push(this.$go.findByName("BlasterLeft"))
    this.blasters.push(this.$go.findByName("BlasterRight"))

  }
  update() {
    this.countDown -= Base.Time.deltaTime;
    if (this.countDown <= 0) {
      this.countDown = .1;
      // this.fire();
    }
  }
  fire() {
    for(let i = 0; i < this.blasters.length; i++){
      let blaster = this.blasters[i];
      let bullet = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Bullet, Base.$$, blaster.worldLocation);
    }
  }


}

