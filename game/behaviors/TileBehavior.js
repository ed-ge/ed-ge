import Engine from "../../engine/Engine.js"
import Base from "../../engine/Base.js"
import RectangleBehavior from "./RectangleBehavior.js";


export default class TileBehavior extends Base.Behavior{
    selected = false;
    start(){
        
    }
    update(){
        let component = this.gameObject.getComponent(Engine.Components.RectangleComponent);
        if(this.selected){
            component.fill = "red";
        }
        else{
            component.fill = "green";
        }
        
    }
}