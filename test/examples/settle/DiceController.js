import Base from "../../../src/Base.js"
import Main from "../../../src/Main.js"
import Point from "../../../src/base/Point.js";

export default class DiceController extends Base.Behavior {
  start() {
   

  }
  update(){

  }
  onMouseDown(){
    this.gameObject.findByName("Die1").$("TextComponent").text = Math.floor(Math.random()*6+1);
    this.gameObject.findByName("Die2").$("TextComponent").text = Math.floor(Math.random()*6+1);
  }


}

