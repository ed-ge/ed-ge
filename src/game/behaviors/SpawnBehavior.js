import Base from "../../engine/Base.js"
import SceneManager from "../../engine/base/SceneManager.js";
import Point from "../../engine/base/Point.js";

export default class SpawnBehavior extends Base.Behavior {
    constructor(){
        super();
        this.goalX;
        this.color;
    }

    start() {
        
    }
    update() {
        if(Math.random() < .009){
            let y = this.gameObject.y + (Math.random() - .5)*10
            let agent = SceneManager.instantiate(Base.Prefabs.RVOAgent, new Point(this.gameObject.x, y));
            let rvo = agent.getComponent("RVOAgent");
            rvo.color = this.color;
            rvo.destination = new Point(+this.goalX, y);
            SceneManager.currentScene.updateRVOAgent(agent)
        }
        
    }
    // onCollisionStay(colliderObject){
    //     let gameObject = colliderObject;
    //     if(gameObject.hasComponent("RVOAgent")){
    //         let RVOAgent = gameObject.getComponent("RVOAgent");
    //         let color = RVOAgent.color;
    //         if(color != this.color){
    //             SceneManager.currentScene.
    //         }
    //     }
    // }
}