import Base from "../../engine/Base.js"
import SceneManager from "../../engine/base/SceneManager.js";
import Point from "../../engine/base/Point.js";
import CircleCollider from "../../engine/components/CircleCollider.js"

export default class SpawnBehavior extends Base.Behavior {
    constructor() {
        super();
        this.goalX;
        this.color;
    }

    start() {

    }
    update() {
        if (Math.random() < .01) {
            let y = this.gameObject.y + (Math.random() - .5) * 10
            let x = this.gameObject.x;
            let collider = new CircleCollider();
            collider.radius = 5;
            if (SceneManager.currentScene.canEnterSafely(new Point(x, y), collider, "RVOAgent")) {
                let agent = SceneManager.instantiate(Base.Prefabs.RVOAgent, new Point(x, y));
                let rvo = agent.getComponent("RVOAgent");
                rvo.color = this.color;
                rvo.destination = new Point(+this.goalX, y);
                SceneManager.currentScene.updateRVOAgent(agent)
                let circle = agent.getComponent("CircleComponent");
                circle.fill = this.color;
                circle.stroke = "black";
            }
        }

    }
    onCollisionStay(colliderObject) {
        let gameObject = colliderObject.gameObject;
        if (gameObject.anyComponent("RVOAgent")) {
            let RVOAgent = gameObject.getComponent("RVOAgent");
            let color = RVOAgent.color;
            if (color != this.color) {
                SceneManager.currentScene.destroy(gameObject);
                SceneManager.currentScene.removeRVOAgent(gameObject);
            }
        }
    }
}