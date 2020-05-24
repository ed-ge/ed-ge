import Point from "./Point.js"

/**
 * Create a line from two points and store the line in 
 * ax+bc+c=0 form
 */
class Line {
    /**
     * 
     * @param {Point} one The first point on the line
     * @param {Point} two The second point on the line
     * The two points must be at different locations or an exception is thrown
     * 
     */
    constructor(one, two) {
        this.a = two.y - one.y;
        this.b = one.x - two.x;
        //Now normalize the values
        let tempPoint = new Point(this.a,this.b);
        tempPoint = tempPoint.toNormalized();
        this.a = tempPoint.x;
        this.b = tempPoint.y;
        this.c = two.x * one.y - one.x * two.y;
        
    }
    /**
     * Return a. 
     * Created as a getter so that a cannot be set
     */
    
    /**
     * 
     * @param {Point} point The point whose distance from the line is to be calculated
     * 
     * Returns the distance to this line.
     */
    distance(point) {
        return this.a * point.x + this.b * point.y + this.c;
    }
}

export default Line;
