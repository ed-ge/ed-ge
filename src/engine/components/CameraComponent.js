import Component from "../base/Component.js"


/**
 * A game object with a camera component will be treated as the camera in the scene.
 * Currently, this game object needs to be in the root of the scene graph and there
 * should only be one.
 */
class CameraComponent extends Component {
    constructor() {
        super();
        this.backgroundColor="white";

    }
    
    update() {

    }
}

export default CameraComponent;