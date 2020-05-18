import Component from "../base/Component.js"

class RectangleComponent extends Component {
    constructor() {
        super();
        this.width = 100;
        this.height = 100;
        this.fill = "gray";
        this.stroke = "black";
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.strokeRect(0, 0, this.width, this.height);
        ctx.restore();
    }
    update() {

    }
}

export default RectangleComponent;