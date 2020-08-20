
export default class StarController extends Base.Behavior {
  constructor() {
    super();
  }
  start(){

    this.speed = 500;
    this.lifetime = 0;
    this.main = Base.$$.findByName("MainController").$("MainController");

    
  }
  update() {
    this.$go.y += Base.Time.deltaTime * this.speed;
    if(this.$go.y > this.main.height)
      this.$go.parent.destroy(this.$go);
  }
  
 


}

