import Base from "../Base.js"

class TextComponent extends Base.Component {
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