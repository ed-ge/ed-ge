import Component from "../base/Component.js"
import Point from "../base/Point.js"



class RVOAgent extends Component {

    constructor() {
        super();
        this.destination = new Point(0,0)
        this._id;

    }
    
    update() {

    }
    
}

export default RVOAgent;