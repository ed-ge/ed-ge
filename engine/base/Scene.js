import NameableParent from "./NamableParent.js"

export default class Scene extends NameableParent{
    gameObjects = [];
    

    constructor(){
        super();
        
    }
    draw(ctx, width, height){
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,width, height)
        for(let i = 0; i < this.gameObjects.length; i++){
            let gameObject = this.gameObjects[i];
            gameObject.draw(ctx);
        }

    }
    update(){
        for(let i = 0; i < this.gameObjects.length; i++){
            let gameObject = this.gameObjects[i];
            gameObject.update();
        }
    }
}