class Collider extends Component {
  constructor() {
      super();
  }
}

class CameraComponent extends Base.Component {
  backgroundColor;

  constructor() {
      super();

  }
  
  update() {

  }
}

class CanvasComponent extends Base.Component {

  constructor() {
      super();

  }
  
  update() {

  }
}

class CircleCollider extends Collider {
  radius = 0;
  constructor() {
      super();
  }

}
class CircleComponent extends Base.Component {
  radius;
  fill;
  stroke;
  constructor() {
      super();

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

class CollisionHelper {

  static inCollision(one, two) {
      if (one.collider instanceof CircleCollider && two.collider instanceof PointCollider) {
          let distance = one.gameObject.location.distance(two.gameObject.location);

          if (distance < one.collider.radius)
              return true;
          return false;
      } else if (one.collider instanceof PointCollider && two.collider instanceof CircleCollider) {
          return this.inCollision(two, one);
      } else if (one.collider instanceof AABBCollider && two.collider instanceof PointCollider) {
          //console.log("Testing AABB")
          let diff = one.gameObject.location.diff(two.gameObject.location);
          return Math.abs(diff.x) < one.collider.width / 2 && Math.abs(diff.y) < one.collider.height / 2;

      } else if (one.collider instanceof PointCollider && two.collider instanceof AABBCollider) {
          return this.inCollision(two, one);
      } else if (one.collider instanceof CircleCollider && two.collider instanceof CircleCollider) {
          let distance = one.gameObject.location.distance(two.gameObject.location);

          if (distance < +one.collider.radius + +two.collider.radius)
              return true;
          return false;
      }

  }

}

class ConvexCollider extends Collider {
  constructor() {
      super();
  }

}

class PointCollider extends Collider {
  constructor() {
      super();
  }

}

class RectangleComponent extends Base.Component {
  width;
  height;
  fill;
  stroke;
  constructor() {
      super();
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

class RectTransform extends Component {

  /** Indicates the object will be anchored horizontally to the left */
  static LEFT = "left";

  /** Indicates the object will be anchored horizontally to the center */
  static CENTER = "center";

  /** Indicates the object will be anchored horizontally to the right */
  static RIGHT = "right";


  /** Indicates the object will be anchored vertically to the top */
  static TOP = "top";

  /**Indicates the object will be anchored vertically in the middle */
  static MIDDLE = "middle";

  /** Indicates the object will be anchored vertically to the bottom */
  static BOTTOM = "bottom"



  constructor() {
      super();
      /** Where the object will be anchored horizontally */
      this.anchorHorizontal = this.constructor.CENTER;

      /** Where the object will be anchored vertically */
      this.anchorVertical = this.constructor.MIDDLE;

  }

  update() {

  }
}

class TextComponent extends Base.Component {
  text;
  font;
  fill;

  constructor() {
      super();
  }
  draw(ctx) {
      ctx.save();
      ctx.fillStyle = this.fill;
      ctx.font = this.font;
      ctx.fillText(this.text, 0, 0);
      ctx.restore();
  }
  update() {

  }
}

class TriangleCollider extends Collider {
    
  points = [];
  pointAX;
  pointAY;
  pointBX;
  pointBY;
  pointCX;
  pointCY;
  
  constructor() {
      super();
  }
  update() {
      if(this.points.length == 0){
          this.points = [new Base.Point(this.pointAX, this.pointAY), new Base.Point(this.pointBX, this.pointBY), new Base.Point(this.pointCX, this.pointCY)];
      }

  }

}

class TriangleComponent extends Base.Component {
  points = [];
  pointAX;
  pointAY;
  pointBX;
  pointBY;
  pointCX;
  pointCY;
  fill;
  stroke;
  constructor() {
      super();

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

class AABBCollider extends Collider {
  width;
  height;
  constructor() {
      super();
  }

}

const Components = (function () {

  return {
    CircleComponent,
    RectangleComponent,
    TextComponent,
    CircleCollider,
    Point,
    Collider,
    CollisionHelper,
    AABBCollider,
    TriangleCollider,
    ConvexCollider,
    TriangleComponent,
    CameraComponent,
    CanvasComponent,
    RectTransform,
  }

})()