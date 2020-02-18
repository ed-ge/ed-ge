import NameableParent from "./NamableParent.js"

export default class Scene extends NameableParent{
    
    constructor(){
        super();
        
    }
    draw(ctx, width, height){
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,width, height)
        
        this.children.forEach(i=>i.draw(ctx));

    }
    update(){
        this.children.forEach(i=>i.update());
    }
}