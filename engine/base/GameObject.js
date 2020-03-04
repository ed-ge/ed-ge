import NameableParent from "./NamableParent.js"
import Point from "./Point.js";


export default class GameObject extends NameableParent {
    x; y;
    scaleX;
    scaleY;
    rotation;
    components = [];

    get location(){
            return new Point(this.x,this.y);
        }
    

    constructor(x = 0, y = 0, scaleX = 1, scaleY = 1, rotation = 0) {
        super();
        [this.x, this.y, this.scaleX, this.scaleY, this.rotation] = [x, y, scaleX, scaleY, rotation];
    }
    addComponent(component) {
        this.components.push(component);
        component.gameObject = this;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);

        this.components.filter(i => i.draw).forEach(i => i.draw(ctx));

        //Now draw all the children
        this.children.filter(i=>i.draw).forEach(i => i.draw(ctx))

        ctx.restore();
    }
    update() {
        this.components.filter(i => i.update).forEach(i => i.update());

        //Now update all the children
        this.children.forEach(i => i.update());
    }
    getComponent(type) {
        let component = this.components.find(i => i instanceof type);
        if (component) return component;
        throw "Error, couldn't find type " + type;
    }
    recursiveCall(functionName){
        for(let i = 0; i < this.components.length; i++){
            let component = this.components[i];
            if(component[functionName]){
                component[functionName]();
            }
        }
        //Now call the function on the children
        for(let i = 0; i < this.children.length; i++){
            let child = this.children[i];
            child.recursiveCall(functionName);
        }
    }
}