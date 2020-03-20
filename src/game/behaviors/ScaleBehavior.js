import Base from "../../engine/Base.js"

export default class ScaleBehavior extends Base.Behavior{
    tick = 0;
    start(){
        
    }
    update(){
        this.tick += .1
        this.gameObject.scaleX = Math.abs(Math.sin(this.tick)) + 1
        this.gameObject.scaleY = Math.abs(Math.cos(this.tick)) + 1
    }
}