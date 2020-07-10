import Base from "../../../src/Base.js"

export default class GhostCard extends Base.Behavior {
  start() {
    this.MainController = Base.$("MainController").$("MainController");
    this.gameObject.x = 10000;
    this.gameObject.y = 10000;
    
  }
  update() {
   
  }
 

}