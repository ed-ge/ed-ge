import Base from "../Base.js"


/**
 * Determines the anchoring of an object in screen space
 */
class RectTransform extends Base.Component {

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
    static bottom = "bottom"

    /** Where the object will be anchored horizontally */
    anchorHorizontal = CENTER;

    /** Where the object will be anchored vertically */
    archorVertical = MIDDLE;

    constructor() {
        super();

    }
    
    update() {

    }
}

export default RectTransform;