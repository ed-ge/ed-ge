import Base from "../../../rollup/Base.js"
import Components from "../../../rollup/Components.js"



export default class TileBehavior extends Base.Behavior{
    
    start(){
        this.selected = false;
        this.isWater = false;
        this.hasCharacter = false;    
    }
    update(){
        let component = this.gameObject.getComponent(Components.RectangleComponent);
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