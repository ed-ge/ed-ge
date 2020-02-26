import NameableParent from "./NamableParent.js"
import CircleCollider from "../Components/CircleCollider.js"

export default class Scene extends NameableParent {

    constructor(name) {
        super(name);

    }
    draw(ctx, width, height) {
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, width, height)

        this.children.filter(i => i.draw).forEach(i => i.draw(ctx));

    }
    update() {
        this.children.filter(i => i.update).forEach(i => i.update());

        //Add collision behavior
        let collidableChildren = [];
        this.getCollidable(this.children, collidableChildren);
        console.log(collidableChildren);
    }
    getCollidable(children, collidableChildren) {
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            try {
                let collidableComponent = child.getComponent(CircleCollider);
                if (collidableComponent) {
                    collidableChildren.push(child);
                }
            } catch (e) { }
            for (let j = 0; j < child.children.length; j++) {
                this.getCollidable(child.children[j], collidableChildren);
            }
        }
    }
}