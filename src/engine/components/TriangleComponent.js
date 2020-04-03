import Component from "../base/Component.js"


class TriangleComponent extends Component {
   
    constructor() {
        super();
        this.points = [];
        this.pointAX;
        this.pointAY;
        this.pointBX;
        this.pointBY;
        this.pointCX;
        this.pointCY;
        this.fill;
        this.stroke;

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
            this.points = [new Base.Point(this.pointAX, this.pointAY), new Base.Point(this.pointBX, this.pointBY), new Base.Point(this.pointCX, this.pointCY)];
        }

    }
}

export default TriangleComponent;