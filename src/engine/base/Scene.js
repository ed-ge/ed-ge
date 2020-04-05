import NameableParent from "./NamableParent.js"
import Point from "./Point.js"
import GameObject from "./GameObject.js";
import PointCollider from "../components/PointCollider.js";
import Input from "./Input.js"
// import Globals from "./Globals.js"

/**
 * A scene represents a level in a game.
 */
class Scene extends NameableParent {

  /**
   * Scene constructor. Assigns the scene a name and starts it.
   * 
   * @param {String} name Name of this scene
   */
  constructor(definition, prefabs, behaviors, components) {
    super(definition.name);
    this.children = [];
    this.objects = definition.objects;
    //Inflate all the definitions


    this.prefabs = prefabs;
    this.behaviors = behaviors;
    this.components = components;
  }


  /**
   * Load the scene from its declarative syntax
   * 
   */
  boot() {
    this.children = [];//Clear the children in case the scene has been built before

    this.objects.forEach(obj => {
      this.buildChild(obj, this.children)
    })

  }


  /**
   * 
   * @param {String} obj The string giving the declarative syntax
   * @param {NameableParent} parent The parent of the object in the scene tree
   */
  buildChild(obj, parent) {

    if (obj.def) {
      obj.location = { x: 0, y: 0 };
      obj.scale = { x: 1, y: 1 };
      let split = obj.def.split(",").map(i => i.trim());
      switch (split.length) {
        case 1:
          obj.type = split[0];
          obj.name = obj.type;
          break;
        case 2:
          [obj.name, obj.type] = split;
          break;
        case 3:
          throw "There is no shorthand object definition with 3 values.";
        case 4:
          [obj.name, obj.location.x, obj.location.y, obj.type] = split;
          break;
        case 5:
          [obj.name, obj.location.x, obj.location.y, obj.scale.x, obj.type] = split;
          obj.scale.y = obj.scale.x;
          break;
        case 6:
          [obj.name, obj.location.x, obj.location.y, obj.scale.x, obj.scale.y, obj.type] = split;
          break;
        case 7:
          [obj.name, obj.location.x, obj.location.y, obj.scale.x, obj.scale.y, obj.rotation, obj.type] = split;
          break;
        default:
          throw "There is not a shorthand object definition with " + split.length + " arguments.";
      }
    }

    let gameObjectType = this.prefabs["" + obj.type]
    if (gameObjectType == null) throw "Could now find game object of type " + obj.type;

    obj.location = obj.location || { x: 0, y: 0 }
    obj.scale = obj.scale || { x: 1, y: 1 }
    obj.rotation = obj.rotation || 0;

    obj.location.x = +obj.location.x;
    obj.location.y = +obj.location.y;
    obj.scale.x = +obj.scale.x;
    obj.scale.y = +obj.scale.y;
    obj.rotation = +obj.rotation;

    let gameObject = this.instantiate(gameObjectType, new Point(obj.location.x, obj.location.y), new Point(obj.scale.x, obj.scale.y), obj.rotation, parent);

    gameObject.name = obj.name;
    this.buildIt(obj, gameObject);
  }

  buildIt(obj, gameObject) {
    //Recursively build children
    if (obj.children) {
      obj.children.forEach(i => this.buildChild(i, gameObject.children))
    }

    //Set the key-pair values on components already on prefabs
    if (obj.componentValues) {
      obj.componentValues.forEach(j => {
        let split = j.split(",").map(i=>i.trim());
        let component = gameObject.getComponent(split[0])
        component[split[1]] = split[2];
      })
    }

    //Add new components
    if (obj.components) {
      obj.components.forEach(i => {
        if(!i.split){
          console.log("error");
        }
        let split = i.split("|");
        let type = split.shift();
        //See if we have a component or behavior with that name
        let componentType = this.components[type] || this.behaviors[type];
        if (componentType == null) throw "Could not find component " + i.type;

        let component = new componentType();
        gameObject.addComponent(component);

        while(split.length >=2){
          let key= split.shift();
          let value = split.shift();
          component[key]=value;
        }

        // if (i.values) {
        //   //Now set the key-value pairs on the new component we just made
        //   i.values.forEach(v => {
        //     component[v.key] = v.value;
        //   })
        // }
        if (component.start)
          component.start();
      });
    }
  }

  draw(ctx, width, height) {
    //Before we draw, see if we have a camera game object and use that
    ctx.save();
    let tx, ty, sx, sy, r, hx, hy;
    let cameras = this.children.filter(i => i.anyComponent("CameraComponent"))
    if (cameras.length == 0) {
      //You really should add a camera
      //console.log("You should add a camera to the scene. C'mon.")
      ctx.fillStyle = "cyan";
      ctx.fillRect(0, 0, width, height)
      tx = 0;
      ty = 0;
      sx = 1
      sy = 1
      r = 0;
      hx = 0;
      hy = 0;
    }
    else {
      if (cameras.length > 1)
        console.log("More than 1 camera detected in the scene. You should only have exactly one root game object with a camera component attached.")
      let camera = cameras[0];
      let cameraComponent = camera.getComponent("CameraComponent")
      ctx.fillStyle = cameraComponent.backgroundColor;
      ctx.fillRect(0, 0, width, height)
      tx = camera.x;
      ty = camera.y;
      sx = camera.scaleX;
      sy = camera.scaleY;
      r = camera.rotation;
      hx = width / 2;
      hy = height / 2;
    }

    ctx.translate(hx, hy)
    ctx.rotate(r)
    ctx.scale(sx, sy)
    ctx.translate(-tx, -ty)

    //Draw children that are not in screen space
    this.children.filter(i => i.draw && !i.anyComponent("CanvasComponent")).forEach(i => i.draw(ctx));

    ctx.restore();

    //We're now back in screen space. It's time to draw any GUI components
    //if we have a gameObject with an attached CanvasComponent
    ctx.save();
    let canvases = this.children.filter(i => i.anyComponent("CanvasComponent"))
    if (canvases.length == 0) {
      //You really should have *something* in screen space
      //console.log("You don't have a canvas object. That means you can't draw anything in screen space.");
    }
    else {
      if (canvases.length > 1) {
        console.log("More than 1 canvas object found in the root of your scene graph. You should only have exactly one game object with a canvas component. The other object(s) and its children will not be rendered.")
      }
      let canvas = canvases[0];
      canvas.draw(ctx);
    }
    ctx.restore();


  }
  update(ctx, collidableType, collisionHelper) {
    this.children.filter(i => i.update).forEach(i => i.update());

    //Add collision behavior
    let collidableChildren = [];
    this.getCollidable(this, collidableChildren, collidableType);

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
    //Now go through and see if the point represented by the mouse collides with any of the colliders
    //
    //First get the world space position of the mouse
    let cameras = this.children.filter(i => i.anyComponent("CameraComponent"))
    let point = { x: 0, y: 0 };
    point.x = parseInt(Input.mousePosition.x);
    point.y = parseInt(Input.mousePosition.y);
    if (cameras.length == 0) {
    }
    else {
      /* point = Input.mousePosition;*/
      //Put in transform code here
      let camera = cameras[0];
      let cameraComponent = camera.getComponent("CameraComponent")

      let tx = camera.x;
      let ty = camera.y;
      let sx = camera.scaleX;
      let sy = camera.scaleY;
      let r = camera.rotation;
      let hx = ctx.canvas.width / 2;
      let hy = ctx.canvas.height / 2;

      let x = point.x;
      let y = point.y;
      x -= hx;
      y -= hy;
      x /= sx;
      y /= sy;
      x += tx;
      y += ty;

      point.x = x;
      point.y = y;

      //We have to reverse the transforms from when we draw
      /*
      ctx.translate(hx, hy)
      ctx.rotate(r)
      ctx.scale(sx, sy)
      ctx.translate(-tx, -ty)*/


    }

    let colliderObject = {};
    colliderObject.gameObject = new GameObject();
    colliderObject.gameObject.x = point.x;
    colliderObject.gameObject.y = point.y;
    colliderObject.collider = new PointCollider();

    for (let i = 0; i < collidableChildren.length; i++) {
      if (collisionHelper.inCollision(collidableChildren[i], colliderObject)) {
        let gameObjectOne = collidableChildren[i].gameObject;

        //Now loop over all the behaviors too see if any are listening for collision events
        for (let i = 0; i < gameObjectOne.components.length; i++) {
          let component = gameObjectOne.components[i];
          if (component.onMouseOver)
            component.onMouseOver();
          if (component.onMouseDown) {
            if (Input.getMouseButtonDown(0))
              component.onMouseDown()
          }
        }
      }
    }
  }
  getCollidable(gameObject, collidableChildren, type) {

    if (gameObject.getComponent) {
      try {
        let collidableComponent = gameObject.getComponent(type);
        if (collidableComponent) {
          collidableChildren.push({ collider: collidableComponent, gameObject });
        }
      } catch (e) {
        //no-op
      }
    }

    for (let i = 0; i < gameObject.children.length; i++) {
      let child = gameObject.children[i];

      this.getCollidable(child, collidableChildren, type);
    }
  }



  instantiate(gameObjectType, location, scale, rotation, parent) {
    /*let gameObject = new gameObjectType(location.x, location.y);
  gameObject.rotation = rotation;
   
  parent.push(gameObject);
  gameObject.recursiveCall("start");
  return gameObject*/

    let gameObject = new GameObject(location.x, location.y, scale.x, scale.y, rotation);
    parent.push(gameObject);
    let prefab = this.prefabs[gameObjectType.name];
    this.buildIt(prefab, gameObject)
    gameObject.name = prefab.name;
    gameObject.recursiveCall("start");
    return gameObject

  }


}

export default Scene;