import Component from "../base/Component.js"
import Point from "../base/Point.js"


class HexagonComponent extends Component {

  constructor() {
    super();
    this.points = [];
    this.centerX = 0;
    this.centerY = 0;
    this.radius = 100;
    this.fill = "gray";
    this.stroke = "black";

  }
  draw(ctx) {
    if (this.points.length == 0) return;
    ctx.save();
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.beginPath();
    ctx.moveTo(+this.points[0].x, +this.points[0].y);
    for (let i = 0; i < this.points.length; i++) {
      ctx.lineTo(+this.points[i].x, +this.points[i].y)
    }
    ctx.closePath()
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  update() {
    if (this.points.length == 0) {
      let angle = Math.PI/2;
      for (let i = 0; i < 6; i++) {
        let x = Math.cos(angle) * this.radius;
        let y = Math.sin(angle) * this.radius;
        this.points.push(new Point(x,y));
        angle -= Math.PI/3;
      }
    }

  }
}

export default HexagonComponent;