import GameObject from "./GameObject.js"

/**
 * A virtual view of the game
 */
class Camera extends GameObject {

    backgroundColor = "black";

    constructor(name) {
        super(name);

    }
}

export default Camera;