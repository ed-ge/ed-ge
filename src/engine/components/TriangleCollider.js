import Collider from "./Collider.js"

/**
Axis - Aligned Bounding Box 
*/

class TriangleCollider extends Collider {



    constructor() {
        super();
        this.pointAX = 0;
        this.pointAY = 0;
        this.pointBX = 100;
        this.pointBY = 100;
        this.pointCX = 0;
        this.pointCY = 100;
    }
    update() {
        

    }

}

export default TriangleCollider;
