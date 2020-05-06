
export default class CountDownTimer extends Base.Behavior {

    start() {
        this.time = 10;
        this.toSceneText = "SceneTwoB";

    }
    update() {
        this.time -= .1;

        this.gameObject.getComponent(Components.TextComponent).text = this.time;
        if (this.time <= 0) {
            Base.SceneManager.currentScene = this.toSceneText;
        }


    }
}