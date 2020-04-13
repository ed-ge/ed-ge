import Point from "./Point.js"

class Line{
    constructor(one,two){
        this.a = one.y - two.y;
        this.b = two.x - one.x;
        this.c = one.x*two.y - two.x*one.y;        
    }
    distance(point){
        return this.a * point.x + this.b * point.y + this.c;
    }
}

export default Line;