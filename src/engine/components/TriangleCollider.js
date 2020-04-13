import Collider from "./Collider.js"

/**
Axis - Aligned Bounding Box 
*/

class TriangleCollider extends Collider {



    constructor() {
        super();
        this.pointAX;
        this.pointAY;
        this.pointBX;
        this.pointBY;
        this.pointCX;
        this.pointCY;
    }
    update() {
        

    }

}

export default TriangleCollider;