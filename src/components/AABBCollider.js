import Collider from "./Collider.js"

/**
Axis - Aligned Bounding Box 
*/

class AABBCollider extends Collider {
    constructor() {
        super();
        this.width=100;
        this.height=100;
    }

}

export default AABBCollider;