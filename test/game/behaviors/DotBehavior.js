import Base from "../../../src/Base.js"
import CollisionCircle from "../prefabs/CollisionCircle.js"

export default class DotBehavior extends Base.Behavior {

    start() {
        console.log("Dot started");

    }
    update() {

    }
    onCollisionEnter(otherGameObject) {
        //console.log("in collision");
    }

    onCollisionStay(collisionObject) {

        if (collisionObject.gameObject.name == "CollisionCircle") {

            Base.SceneManager.destroy(collisionObject.gameObject);
            Base.Serializer.instantiate(CollisionCircle,  Base._cs, new Base.Point(Math.random() * 400, Math.random() * 400), new Base.Point(1,1),0);
            
        }
        else if (collisionObject.gameObject.name == "Rectangle") {

            Base.SceneManager.destroy(collisionObject.gameObject);
            let circle = Base.Serializer.instantiate(Base.Prefabs.Rectangle, Base._cs, new Base.Point(Math.random() * 400, Math.random() * 400), new Base.Point(1,1), 0);
            circle.scaleX = Math.random() + 1;
            circle.scaleY = Math.random() + 1;
            
        }
        else if (collisionObject.gameObject.name == "Triangle") {

            Base.SceneManager.destroy(collisionObject.gameObject);
            Base.Serializer.instantiate(Base.SceneManager.currentScene.prefabs.Triangle, Base._cs, new Base.Point(Math.random() * 400, Math.random() * 400), 0);
            
        }
        
    }
}