
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

