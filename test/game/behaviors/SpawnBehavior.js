import Base from "../../../src/Base.js"

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
            let y = this.gameObject.y + (Math.random() - .5) * 1
            let x = this.gameObject.x;
            let collider = new Base.Components.CircleCollider();
            collider.radius = 5;
            if (Base.SceneManager.currentScene.canEnterSafely(new Base.Point(x, y), collider, "RVOAgent")) {
                let RVOCopy = _.cloneDeep(Base.Prefabs.RVOAgent).trim();
                let splits = RVOCopy.split(/\r?\n/);
                if(isNaN(x) || isNaN(y)){
                    console.log("Bad Number");
                }
                splits.splice(1,0,"" + (+x)+"," +(+y));
                RVOCopy = splits.join("\n");
                let agent = Base.Serializer.instantiate(RVOCopy, Base._cs, new Base.Point(x, y));
                let rvo = agent.getComponent("RVOAgent");
                rvo.color = this.color;
                rvo.destination = new Base.Point(+this.goalX, y);
                Base.SceneManager.currentScene.updateRVOAgent(agent)
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
                Base.SceneManager.currentScene.destroy(gameObject);
                Base.SceneManager.currentScene.removeRVOAgent(gameObject);
            }
        }
    }
}