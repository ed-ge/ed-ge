import Component from "../base/Component.js"
import Point from "../base/Point.js"


class TriangleComponent extends Component {
   
    constructor() {
        super();
        this.points = [];
        this.pointAX = 0;
        this.pointAY = 0;
        this.pointBX = 100;
        this.pointBY = 100;
        this.pointCX = 0;
        this.pointCY = 100;
        this.fill = "gray";
        this.stroke = "black";

    }
    draw(ctx) {
        if(this.points.length == 0) return;
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.beginPath();
        ctx.moveTo(+this.points[0].x, +this.points[0].y);
        ctx.lineTo(+this.points[1].x, +this.points[1].y)
        ctx.lineTo(+this.points[2].x, +this.points[2].y)
        ctx.closePath()
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    update() {
        if(this.points.length == 0){
            this.points = [new Point(this.pointAX, this.pointAY), new Point(this.pointBX, this.pointBY), new Point(this.pointCX, this.pointCY)];
        }

    }
}

export default TriangleComponent;