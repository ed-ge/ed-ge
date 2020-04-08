import Component from "../base/Component.js"


/**
 * Determines the anchoring of an object in screen space
 */
class RectTransform extends Component {

   

    constructor() {
        super();
        /** Where the object will be anchored horizontally */
        this.anchorHorizontal = "center";
        
        /** Where the object will be anchored vertically */
        this.anchorVertical = "middle";
       
    }

    update() {

    }
}

export default RectTransform;