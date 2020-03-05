import NameableParent from "./NamableParent.js"


export default class Scene extends NameableParent {

  constructor(name) {
    super(name);
    this.start();

  }
  start() {
    this.children = [];

    //Load a scene from a declarative syntax

    if (this.objects) {
      this.children = [];
      for (let i = 0; i < this.objects.length; i++) {
        let obj = this.objects[i];
        this.buildChild(obj, this.children)

      }
    }
  }
  buildChild(obj, parent) {
    let gameObject = this.instantiate(obj.type, obj.location, 0, parent);
    gameObject.name = obj.name;

    if (obj.children) {
      for (let i = 0; i < obj.children.length; i++) {
        let child = obj.children[i];
        this.buildChild(child, gameObject.children);
      }

    }

    if (obj.componentValues) {
      for (let j = 0; j < obj.componentValues.length; j++) {
        let componentValue = obj.componentValues[j]
        let type = componentValue.type;
        let component = gameObject.getComponent(type);
        let values = componentValue.values;
        for (let k = 0; k < values.length; k++) {
          let value = values[k];
          component[value.key] = value.value;
        }
      }
    }
    if(obj.components){
      for(let i = 0; i < obj.components.length; i++){
        let componentInfo = obj.components[i];
        let component = new componentInfo.type();
        gameObject.addComponent(component);

      }
    }
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

    for (let i = 0; i < collidableChildren.length; i++) {
      for (let j = i + 1; j < collidableChildren.length; j++) {
        if (collisionHelper.inCollision(collidableChildren[i], collidableChildren[j])) {
          let gameObjectOne = collidableChildren[i].gameObject;
          let gameObjectTwo = collidableChildren[j].gameObject;

          //Now loop over all the behaviors too see if any are listening for collision events
          for (let i = 0; i < gameObjectOne.components.length; i++) {
            let component = gameObjectOne.components[i];
            if (component.onCollisionStay)
              component.onCollisionStay(collidableChildren[j]);
          }
          for (let j = 0; j < gameObjectTwo.components.length; j++) {
            let component = gameObjectTwo.components[j];
            if (component.onCollisionStay)
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
          collidableChildren.push({ collider: collidableComponent, gameObject: child });
        }
      } catch (e) {
        let x = 1;//no-op
      }
      for (let j = 0; j < child.children.length; j++) {
        this.getCollidable(child.children[j], collidableChildren);
      }
    }
  }
  destroy(gameObject) {
    this.children = this.children.filter(i => i != gameObject);
  }
  instantiate(gameObjectType, location, rotation, parent) {
    let gameObject = new gameObjectType(location.x, location.y);
    gameObject.rotation = rotation;

    parent.push(gameObject);
    gameObject.recursiveCall("start");
    return gameObject

  }
}