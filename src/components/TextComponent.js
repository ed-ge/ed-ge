import Component from "../base/Component.js"

class TextComponent extends Component {
    constructor() {
        super();
        this.text = "[Blank]";
        this.font = "10pt Sans";
        this.fill = "black";
        this.centered = false;
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.font = this.font;
        if (!this.centered)
            ctx.fillText(this.text, 0, 0);
        else{
            let metrics = ctx.measureText(this.text);
            let fontHeight = metrics.actualBoundingBoxAscent;
            
            ctx.fillText(this.text, -metrics.width/2, fontHeight/2)
        }
        ctx.restore();
    }
    update() {

    }
}

export default TextComponent;