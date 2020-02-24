import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"
import Input from "../../engine/base/Input.js";

export default class DotBehavior extends Base.Behavior {
    
    start() {

    }
    update() {

        if(/*in collision*/Math.random() < .1){
            console.log("in collision");
        }
        
        

    }
}