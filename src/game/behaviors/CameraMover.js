import Base from "../../engine/Base.js"
import Components from "../../engine/Components.js"

export default class CameraMover extends Base.Behavior {


    start() {
        //this.gameObject.x = 0;
        this.time = 0;
        this.position = 0;
        this.speed = 1;
        this.goingUp = true;
        this.x = this.gameObject.x;
        this.y = this.gameObject.y;
    }
    update() {
        //let CameraComponent = this.gameObject.getComponent(Components.CameraComponent);
        this.time += .1;
        if (this.goingUp) {
            this.position -= this.speed;
        }
        else {
            this.position += this.speed;
        }

        if (this.position < -100) {
            this.goingUp = false;
        }
        if (this.position > 100) {
            this.goingUp = true;
        }

        this.gameObject.x = this.x + this.position;
        this.gameObject.y = this.y + Math.sin(this.time / 25) * 50;
        this.gameObject.scaleX = Math.abs(this.position) / 100 + 1;
        this.gameObject.scaleY = Math.abs(this.position) / 100 + 1;
    }
}