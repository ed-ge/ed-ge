import NameableParent from "./NamableParent.js"


export default class Scene extends NameableParent {

    constructor(name) {
        super(name);

    }
    draw(ctx, width, height) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(0, 0, width, height)

        this.children.filter(i => i.draw).forEach(i => i.draw(ctx));

    }
    update(collidableType, collisionHelper) {
        this.children.filter(i => i.update).forEach(i => i.update());

        //Add collision behavior
        let collidableChildren = [];
        this.getCollidable(this.children, collidableChildren, collidableType);
        
        for(let i = 0; i < collidableChildren.length; i++){
            for(let j = i + 1; j < collidableChildren.length; j++){
                if(collisionHelper.inCollision(collidableChildren[i], collidableChildren[j]))
                {
                    let gameObjectOne = collidableChildren[i].gameObject;
                    let gameObjectTwo = collidableChildren[j].gameObject;

                    //Now loop over all the behaviors too see if any are listening for collision events
                    for(let i = 0; i < gameObjectOne.components.length; i++){
                        let component = gameObjectOne.components[i];
                        if(component.onCollisionStay)
                            component.onCollisionStay(collidableChildren[j]);
                    }
                    for(let j = 0; j < gameObjectTwo.components.length; j++){
                        let component = gameObjectTwo.components[j];
                        if(component.onCollisionStay)
                            component.onCollisionStay(collidableChildren[i]);
                    }
                   
                }
            }
        }
    }
    getCollidable(children, collidableChildren, type) {

        
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            try {
                let collidableComponent = child.getComponent(type);
                if (collidableComponent) {
                    collidableChildren.push({collider:collidableComponent, gameObject:child});
                }
            } catch (e) { 
                let x = 1;//no-op
            }
            for (let j = 0; j < child.children.length; j++) {
                this.getCollidable(child.children[j], collidableChildren);
            }
        }
    }
}