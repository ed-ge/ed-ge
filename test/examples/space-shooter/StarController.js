import Base from "../../../src/Base.js"

export default class StarController extends Base.Behavior {
  constructor() {
    super();
    this.speed = 500;
    this.lifetime = 0;
    
  }
  update() {
    this.$go.y += Base.Time.deltaTime * this.speed;
    if(this.$go.y > 1000)
      this.$go.parent.destroy(this.$go);
  }
  
 


}

