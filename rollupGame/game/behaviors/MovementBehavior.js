import Base from "../../../rollup/Base.js"
import Components from "../../../rollup/Components.js"

export default class MovementBehavior extends Base.Behavior {
    start() {
        this.speed = 5;

    }
    update() {
        
        if (Base.Input.keys['ArrowUp']) {
            this.gameObject.y -= this.speed
        }
        if( Base.Input.keys['ArrowDown']) {
            this.gameObject.y += this.speed
        }
        if (Base.Input.keys['ArrowLeft']) {
            this.gameObject.x -= this.speed
        }
        if( Base.Input.keys['ArrowRight']) {
            this.gameObject.x += this.speed
        }

    }
}