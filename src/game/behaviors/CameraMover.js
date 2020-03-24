import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"

export default class CameraMover extends Base.Behavior{
    time = 0;
    position = 1;
    speed = .01;
    goingUp = true;
    start(){
        this.gameObject.x = 0;
    }
    update(){
        //let CameraComponent = this.gameObject.getComponent(Components.CameraComponent);
        this.time += .1;
        if(this.goingUp){
            this.position -= this.speed;
        }
        else{
            this.position += this.speed;
        }

        if(this.position < 1){
            this.goingUp = false;
        }
        if(this.position > 2){
            this.goingUp = true;
        }

        //this.gameObject.x = this.position;
       // this.gameObject.y = Math.sin(this.time/25)*50+50;
        //this.gameObject.scaleX = this.position;
        //this.gameObject.scaleY = this.position
    }
}