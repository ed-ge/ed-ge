import NameableParent from "./NamableParent.js"
import Point from "./Point.js"
import GameObject from "./GameObject.js";
import PointCollider from "../components/PointCollider.js";
import Input from "./Input.js"
import Globals from "./Globals.js"

/**
 * A scene represents a level in a game.
 */
class Scene extends NameableParent {

    /**
     * A static reference to all gameObjects available in this game.
     * This prevents a circular module dependency. By "linking" these to the
     * scene as static list after the program starts, we can remove any circular
     * dependencies.
     */
    

    /**
     * Scene constructor. Assigns the scene a name and starts it.
     * 
     * @param {String} name Name of this scene
     */
    constructor(name) {
        super(name);
        this.start();

    }

    /**
     * Assign the scene its scene tree using our declarative syntax.
     * 
     * @param {String} obj The string specifying the contents of the scene in
     * our declarative syntax.
     */
     
    start2() {

        this.children = [];

        //Load a scene from a declarative syntax

        if (this.objects) {
            this.children = [];
            for (let i = 0; i < this.objects.length; i++) {
                let obj = this.objects[i];
                this.buildChild2(obj, this.children)

            }
        }
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

    /**
     * 
     * @param {String} obj The string giving the declarative syntax
     * @param {NameableParent} parent The parent of the object in the scene tree
     */
    buildChild2(obj, parent) {

        let gameObjectType = null;
        let keys = Object.keys(Globals.gameObjects)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            if (key == obj.type) {
                gameObjectType = Globals.gameObjects[key];
                break;
            }
        }
        if (gameObjectType == null) throw "Could now find game object of type " + obj.type;
        if (!obj.scale) {
            obj.scale = {};
            obj.scale.x = 1;
            obj.scale.y = 1;
        }
        if (!obj.rotation) {
            obj.rotation = 0;
        }

        let gameObject = this.instantiate(gameObjectType, new Point(obj.location.x, obj.location.y), new Point(obj.scale.x, obj.scale.y), obj.rotation, parent);
        /*let gameObject = new GameObject(obj.location.x, obj.location.y, 1, 1, 0);
        parent.push(gameObject);
        let prefab = gameObjects[gameObjectType.name];
        this.buildIt(prefab, gameObject, gameBehaviors, gameObjects, components);*/

        gameObject.name = obj.name;
        this.buildIt(obj, gameObject);


    }
    buildIt(obj, gameObject) {
        if (obj.children) {
            for (let i = 0; i < obj.children.length; i++) {
                let child = obj.children[i];
                this.buildChild2(child, gameObject.children);
            }

        }

        //Set the key-pair values on components already on prefabs
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

        //Add new components
        if (obj.components) {
            for (let i = 0; i < obj.components.length; i++) {
                let componentInfo = obj.components[i];

                let componentString = componentInfo.type;
                let componentType = null;
                let componentKeys = Object.keys(Globals.components);
                let behaviorKeys = Object.keys(Globals.gameBehaviors);
                for (let i = 0; i < componentKeys.length; i++) {
                    let key = componentKeys[i];
                    if (key == componentString) {
                        componentType = Globals.components[key];
                        break
                    }
                }
                if (componentType == null) {
                    for (let i = 0; i < behaviorKeys.length; i++) {
                        let key = behaviorKeys[i]
                        if (key == componentString) {
                            componentType = Globals.gameBehaviors[key]
                            break;
                        }
                    }
                }
                if (componentType == null) throw "Could not find component " + componentString;
                let component = new componentType();
                gameObject.addComponent(component);
                if (componentInfo.values) {

                    //Now set the key-value pairs on the new component we just made
                    let componentValues = componentInfo.values;
                    for (let v = 0; v < componentValues.length; v++) {
                        let value = componentValues[v];
                        let key = value.key;
                        let val = value.value;
                        component[key] = val;
                    }
                }
                if (component.start)
                    component.start();

            }
        }
    }







    buildChild(obj, parent) {
        let gameObject = this.instantiate(obj.type, obj.location, new Point(1, 1), 0, parent);
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
        if (obj.components) {
            for (let i = 0; i < obj.components.length; i++) {
                let componentInfo = obj.components[i];
                let component = new componentInfo.type();
                gameObject.addComponent(component);

            }
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
        let point = {x:0,y:0};
        point.x=parseInt(Input.mousePosition.x);
        point.y=parseInt(Input.mousePosition.y);
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
        let prefab = Globals.gameObjects[gameObjectType.name];
        this.buildIt(prefab, gameObject)
        gameObject.name = prefab.name;
        gameObject.recursiveCall("start");
        return gameObject

    }
}

export default Scene;