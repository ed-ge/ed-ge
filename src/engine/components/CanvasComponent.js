import Base from "../Base.js"


/**
 * A gameObject with a CanvasComponent represents screen space.
 * Currently, there should be no more than one game object with a canvas component 
 * in the root of the scene graph.
 */
class CanvasComponent extends Base.Component {

    constructor() {
        super();

    }
    
    update() {

    }
}

export default CanvasComponent;