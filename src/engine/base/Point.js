/**
 * 2D Point class
 */

class Point {
    /**
     * 
     * @param {Number} x The x location of the point
     * @param {Number} y The y location of the point
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distance(otherPoint) {

        return Math.sqrt(this.distanceSquared(otherPoint));
    }
    distanceSquared(otherPoint) {
        let xDiff = (this.x - otherPoint.x);
        let yDiff = (this.y - otherPoint.y);
        return xDiff * xDiff + yDiff * yDiff;
    }
    diff(otherPoint) {
        return new Point(this.x - otherPoint.x, this.y - otherPoint.y);
    }
}

export default Point;