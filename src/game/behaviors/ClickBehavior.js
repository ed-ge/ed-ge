import Base from "../../engine/Base.js"

export default class ClickBehavior extends Base.Behavior{
    
    start(){
        
    }
    update(){
       
    }

    onMouseOver(){
        console.log("Mouse Over");
    }

    onMouseDown(){
        console.log("Mouse down");
        this.gameObject.x += (Math.random() - .5) * 300;
        this.gameObject.y += (Math.random() - .5) * 300;
    }
}