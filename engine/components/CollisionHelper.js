import CircleCollider from "./CircleCollider.js"
import PointCollider from "./PointCollider.js"

export default class CollisionHelper{
   
        static inCollision(one, two){
            if(one.collider instanceof CircleCollider && two.collider instanceof PointCollider){
                let distance = one.gameObject.location.distance(two.gameObject.location);
                console.log(distance);
                console.log(one.collider.radius);
                if(distance < one.collider.radius)
                    return true;
                return false;
            }
            
        }
    
}