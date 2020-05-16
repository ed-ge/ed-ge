import Base from "../../../src/engine/Base.js"

export default class ScaleBehavior extends Base.Behavior{
    start(){
        this.tick = 0;
        
    }
    update(){
        this.tick += .1
        this.gameObject.scaleX = Math.abs(Math.sin(this.tick)) + 1
        this.gameObject.scaleY = Math.abs(Math.cos(this.tick)) + 1
    }
}