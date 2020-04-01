
export default class CircleBehavior extends Base.Behavior {

    start() {
        this.time = 0;
        this.position = 0;
        this.speed = 5;
        this.goingLeft = true;
        this.gameObject.x = 0;
    }
    update() {
        this.time += 1;
        if (this.goingLeft) {
            this.position -= this.speed;
        }
        else {
            this.position += this.speed;
        }

        if (this.position < 0) {
            this.goingLeft = false;
        }
        if (this.position > 100) {
            this.goingLeft = true;
        }

        //this.gameObject.x = this.position;
        this.gameObject.x = Math.sin(this.time / 25) * 50 + 50;
    }
}