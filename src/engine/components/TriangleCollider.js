import Collider from "./Collider.js"

/**
Axis - Aligned Bounding Box 
*/

class TriangleCollider extends Collider {
    
    
    
    constructor() {
        super();
        this.points = [];
        this.pointAX;
        this.pointAY;
        this.pointBX;
        this.pointBY;
        this.pointCX;
        this.pointCY;
    }
    update() {
        if(this.points.length == 0){
            this.points = [new Base.Point(this.pointAX, this.pointAY), new Base.Point(this.pointBX, this.pointBY), new Base.Point(this.pointCX, this.pointCY)];
        }

    }

}

export default TriangleCollider;