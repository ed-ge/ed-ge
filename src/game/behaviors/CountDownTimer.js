import Base from "../../engine/Base.js"

export default class CountDownTimer extends Base.Behavior {

    constructor(){
      super();
      this.toSceneText = "SceneTwoB";

    }

    start() {
        this.time = 10;

    }
    update() {
        this.time -= .1;

        this.gameObject.getComponent(Base.Components.TextComponent).text = this.time;
        if (this.time <= 0) {
            Base.SceneManager.currentScene = this.toSceneText;
        }


    }
}