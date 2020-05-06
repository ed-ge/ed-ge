import Base from "../../../rollup/Base.js"

export default class OrbitBehavior extends Base.Behavior{
    
    start(){
        this.time = 0;
        this.distance = 75;    
    }
    update(){
        this.time+=.01;
        
        this.gameObject.x = Math.cos(this.time)*this.distance;
        this.gameObject.y = Math.sin(this.time)*this.distance;
    }
}
