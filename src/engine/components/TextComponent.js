import Component from "../base/Component.js"

class TextComponent extends Component {
    constructor() {
        super();
        this.text;
        this.font;
        this.fill;
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.font = this.font;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
    update() {

    }
}

export default TextComponent;