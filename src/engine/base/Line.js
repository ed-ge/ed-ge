import Point from "./Point.js"

class Line{
    constructor(one,two){
        this.a = two.y - one.y;
        this.b = one.x - two.x;
        this.c = two.x*one.y - one.x*two.y ;        
    }
    distance(point){
        return this.a * point.x + this.b * point.y + this.c;
    }
}

export default Line;