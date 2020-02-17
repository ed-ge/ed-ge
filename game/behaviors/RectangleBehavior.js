import Base from "../../engine/Base.js"

class RectangleBehavior extends Base.Behavior{
    start(){
        this.gameObject.rotation = 0;
    }
    update(){
        this.gameObject.rotation += .1;
    }
}

export default RectangleBehavior;