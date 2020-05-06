
export default class TextBehavior extends Base.Behavior {
    
    start() {
        this.time = 10;

    }
    update() {
        this.time -= .1;
        if (Base.Input.keys[' ']) {
            this.gameObject.getComponent(Base.Components.TextComponent).text = 'Down';
        }
        else {
            this.gameObject.getComponent(Base.Components.TextComponent).text = 'Up';

        }

    }
}