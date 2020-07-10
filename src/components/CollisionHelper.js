import CircleCollider from "./CircleCollider.js"
import PointCollider from "./PointCollider.js"
import AABBCollider from "./AABBCollider.js";
import Point from "../base/Point.js"
import Line from "../base/Line.js"
import TriangleCollider from "./TriangleCollider.js"

const CollisionHelper = {

    inCollision(one, two) {
        if (one.collider instanceof CircleCollider && two.collider instanceof PointCollider) {
            return this.inCollisionCirclePoint(one, two);
        } else if (one.collider instanceof PointCollider && two.collider instanceof CircleCollider) {
            /** Flip */
            return this.inCollision(two, one);
        } else if (one.collider instanceof AABBCollider && two.collider instanceof PointCollider) {
            return this.inCollisionAABBPoint(one, two);
        } else if (one.collider instanceof PointCollider && two.collider instanceof AABBCollider) {
            /** Flip */
            return this.inCollision(two, one);
        } else if (one.collider instanceof AABBCollider && two.collider instanceof AABBCollider) {
            return this.inCollisionAABBAABB(one, two);
        } else if (one.collider instanceof CircleCollider && two.collider instanceof CircleCollider) {
            return this.inCollisionCircleCircle(one, two);
        } else if (one.collider instanceof AABBCollider && two.collider instanceof CircleCollider) {
            return this.inCollisionAABBCircle(one, two);
        }
        else if (one.collider instanceof CircleCollider && two.collider instanceof AABBCollider) {
            /** Flip */
            return this.inCollision(two, one);
        }
        else if (one.collider instanceof TriangleCollider && two.collider instanceof PointCollider) {
            return this.inCollisionTrianglePoint(one, two);
        }
        else if (one.collider instanceof PointCollider && two.collider instanceof TriangleCollider) {
            /**Flip */
            return this.inCollision(two, one);
        }

    },
    inCollisionAABBAABB(one, two) {
        //From https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        let ws1 = one.gameObject.worldScale;
        let ws2 = two.gameObject.worldScale;
        if (one.gameObject.worldLocation.x < two.gameObject.worldLocation.x + (+two.collider.width)*ws2.x &&
            one.gameObject.worldLocation.x + (+one.collider.width)*ws1.x > two.gameObject.worldLocation.x &&
            one.gameObject.worldLocation.y < two.gameObject.worldLocation.y + (+two.collider.height)*ws2.y &&
            one.gameObject.worldLocation.y + (+one.collider.height)*ws1.y > two.gameObject.worldLocation.y)
            return true;
        return false;
    },
    inCollisionCirclePoint(circle, point) {
        let distance = circle.gameObject.worldLocation.distance(point.gameObject.location);

        if (distance < circle.collider.radius * circle.gameObject.scaleX)
            return true;
        return false;
    },
    inCollisionAABBPoint(AABB, point) {
        let diff = AABB.gameObject.worldLocation.diff(point.gameObject.worldLocation);
        return Math.abs(diff.x) < AABB.collider.width / 2 && Math.abs(diff.y) < AABB.collider.height / 2;

    },
    inCollisionCircleCircle(circle1, circle2) {
        let distance = circle1.gameObject.location.distance(circle2.gameObject.location);

        if (distance < +circle1.collider.radius + +circle2.collider.radius)
            return true;
        return false;
    },
    inCollisionAABBCircle(AABB, Circle) {
        let cx = Circle.gameObject.x;
        let cy = Circle.gameObject.y;
        let rx = AABB.gameObject.x - AABB.collider.width / 2;
        let ry = AABB.gameObject.y - AABB.collider.height / 2;
        let rw = +AABB.collider.width;
        let rh = +AABB.collider.height;

        let tx = cx;
        let ty = cy;

        if (cx < rx) tx = rx;
        else if (cx > rx + rw) tx = rx + rw;
        if (cy < ry) ty = ry;
        else if (cy > ry + rh) ty = ry + rh;

        let diffX = (tx - cx)
        let diffY = (ty - cy)
        let distance = Math.sqrt(diffX * diffX + diffY * diffY);
        if (distance < +Circle.collider.radius)
            return true;
        return false;
    },
    inCollisionTrianglePoint(triangle, point) {
        let pointA = new Point(+triangle.collider.pointAX + triangle.gameObject.x, +triangle.collider.pointAY + triangle.gameObject.y);
        let pointB = new Point(+triangle.collider.pointBX + triangle.gameObject.x, +triangle.collider.pointBY + triangle.gameObject.y);
        let pointC = new Point(+triangle.collider.pointCX + triangle.gameObject.x, +triangle.collider.pointCY + triangle.gameObject.y);

        let lineOne = new Line(pointA, pointB);
        let lineTwo = new Line(pointB, pointC);
        let lineThree = new Line(pointC, pointA);

        let distanceOne = lineOne.distance(point.gameObject.location)
        let distanceTwo = lineTwo.distance(point.gameObject.location)
        let distanceThree = lineThree.distance(point.gameObject.location)

        return (distanceOne > 0 && distanceTwo > 0 && distanceThree > 0)
    }




}

export default CollisionHelper;
