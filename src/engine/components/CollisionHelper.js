import CircleCollider from "./CircleCollider.js"
import PointCollider from "./PointCollider.js"
import AABBCollider from "./AABBCollider.js";
import TriangleCollider from "./TriangleCollider.js"
import Point from "../base/Point.js";
import Line from "../base/Line.js";


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
        else if (one.collider instanceof AABBCollider && two.collider instanceof CircleCollider) {
            let cx = +two.gameObject.x;
            let cy = +two.gameObject.y;

            let rx = +one.gameObject.x - one.collider.width/2;
            let ry = +one.gameObject.y - one.collider.height/2;
            let rw = +one.collider.width;
            let rh = +one.collider.height;
            
            if(cx > rx + rw) rx = rx+ rw;
            else if(cx > rx) rx = cx;
            if(cy > ry + rh) ry = ry + rh;
            else if(cy > ry) ry = cy;

            let diffX = cx - rx;
            let diffY = cy - ry;
            let distance = Math.sqrt(diffX*diffX + diffY * diffY);
            return distance < two.collider.radius;
        }
        else if (one.collider instanceof CircleCollider && two.collider instanceof AABBCollider) {
            return this.inCollision(two, one);
        }
        else if (one.collider instanceof TriangleCollider && two.collider instanceof PointCollider) {
            let pointA = new Point(+one.collider.pointAX + one.gameObject.x, +one.collider.pointAY + one.gameObject.y);
            let pointB = new Point(+one.collider.pointBX + one.gameObject.x, +one.collider.pointBY + one.gameObject.y);
            let pointC = new Point(+one.collider.pointCX + one.gameObject.x, +one.collider.pointCY + one.gameObject.y);

            let lineOne = new Line(pointA, pointB);
            let lineTwo = new Line(pointB, pointC);
            let lineThree = new Line(pointC, pointA);

            let distanceOne = lineOne.distance(two.gameObject.location)
            let distanceTwo = lineTwo.distance(two.gameObject.location)
            let distanceThree = lineThree.distance(two.gameObject.location)

            return (distanceOne > 0 && distanceTwo > 0 && distanceThree > 0)
            
        }
        else if (one.collider instanceof PointCollider && two.collider instanceof TriangleCollider) {
            return this.inCollision(two, one);
        }

    }

}

export default CollisionHelper;