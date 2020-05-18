import Base from "../../../src/Base.js"

export default class TextBehavior extends Base.Behavior {
    
    start() {
        this.time = 10;

    }
    update() {
        this.time -= .1;
        if (Input.keys[' ']) {
            this.gameObject.getComponent(Base.Components.TextComponent).text = 'Down';
        }
        else {
            this.gameObject.getComponent(Base.Components.TextComponent).text = 'Up';

        }

    }
}