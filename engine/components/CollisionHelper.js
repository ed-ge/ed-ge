import CircleCollider from "./CircleCollider.js"
import PointCollider from "./PointCollider.js"

export default class CollisionHelper{
   
        static inCollision(one, two){
            if(one.collider instanceof CircleCollider && two.collider instanceof PointCollider){
               
            }
            
        }
    
}