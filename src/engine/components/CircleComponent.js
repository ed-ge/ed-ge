import Component from "../base/Component.js"


class CircleComponent extends Component {
    
    constructor() {
        super();
        this.radius;
        this.fill;
        this.stroke;

    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    update() {

    }
}

export default CircleComponent;