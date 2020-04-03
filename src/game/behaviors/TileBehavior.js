import Base from "../../engine/Base.js"
import RectangleBehavior from "./RectangleBehavior.js";


export default class TileBehavior extends Base.Behavior{
    
    start(){
        this.selected = false;
        this.isWater = false;
        this.hasCharacter = false;    
    }
    update(){
        let component = this.gameObject.getComponent(Base.RectangleComponent);
        if(this.isWater){
            component.fill = "blue";
        }
        else if(this.hasCharacter){
            component.fill = "green";
        }
        else{
            component.fill = "gray";
        }
        
    }
}