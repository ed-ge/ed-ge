import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"

class TextBehavior extends Base.Behavior{
    time = 10;
    
    start(){
        
    }
    update(){
        this.time -= .1;
        this.gameObject.getComponent(Components.TextComponent).text = this.time;
        
    }
}

export default TextBehavior;