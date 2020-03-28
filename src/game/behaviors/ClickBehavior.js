import Base from "../../engine/Base.js"
import Input from "../../engine/base/Input.js";


export default class ClickBehavior extends Base.Behavior {
    scale = 200;
   start() {
    
    }
    update() {
      

    }
    onMouseOver(){
        console.log("Mouse Over");
    }
    onMouseDown(){
        console.error("Mouse click");
        this.gameObject.x += (Math.random() * 2 - 1) * this.scale;
        this.gameObject.y += (Math.random() * 2 - 1) * this.scale;

        this.gameObject.x = Math.max(0, Math.min(this.gameObject.x, 1000));
        this.gameObject.y = Math.max(0, Math.min(this.gameObject.y, 1000));
    }

}