import Component from "../base/Component.js"


/**
 * Determines the anchoring of an object in screen space
 */
class RectTransform extends Component {

    /** Indicates the object will be anchored horizontally to the left */
    static LEFT = "left";

    /** Indicates the object will be anchored horizontally to the center */
    static CENTER = "center";

    /** Indicates the object will be anchored horizontally to the right */
    static RIGHT = "right";


    /** Indicates the object will be anchored vertically to the top */
    static TOP = "top";

    /**Indicates the object will be anchored vertically in the middle */
    static MIDDLE = "middle";

    /** Indicates the object will be anchored vertically to the bottom */
    static BOTTOM = "bottom"



    constructor() {
        super();
        /** Where the object will be anchored horizontally */
        this.anchorHorizontal = this.constructor.CENTER;

        /** Where the object will be anchored vertically */
        this.anchorVertical = this.constructor.MIDDLE;

    }

    update() {

    }
}

export default RectTransform;