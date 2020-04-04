var Main = (function () {
    'use strict';

    /**
     * Parent interface for scenes and game objects.
     * 
     * The Scene class and the GameObject class both descend from this class.
     */

    class NameableParent {

        /**
         * An array of children this instance has
         */
        //children = [];

        /**
         * The name of this instance
         */
        //name = "";

        /**
         * 
         * @param {String} Name of this instance
         */
        constructor(name) {
            this.children = [];
            this.name = name;
        }

        /**
         * Remove a game object from the scene tree.
         * 
         * This is done recursively since the game object would be the descendant of
         * any depth in the scene tree.
         * 
         * @param {GameObject} gameObject Remove this game object from the Scene tree
         */

        destroy(gameObject) {
            let found = false;
            for (let i = 0; i < this.children.length && !found; i++) {
                let child = this.children[i];
                if (child == gameObject) {
                    found = true;
                    if (child.onDestroy) {
                        child.onDestroy();
                    }
                }
            }
            if (found) {
                this.children = this.children.filter(i => i != gameObject);
                return true;
            } else {
                //Loop again and destroy recursively
                for (let i = 0; i < this.children.length && !found; i++) {
                    let child = this.children[i];
                    let result = child.destroy(gameObject);
                    if (result) return true;
                }
                //If we get here we didn't find anything
                return false;
            }


        }

        findByName(name){
            if(this.name == name)
                return this;
            for(let child of this.children){
                let result = child.findByName(name);
                if(result != null) return result;        
            }
            //We didn't find anything
            return null;
        }
    }

    /**
     * 2D Point class
     */

    class Point {
        /**
         * 
         * @param {Number} x The x location of the point
         * @param {Number} y The y location of the point
         */
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }

        /**
         * Calculate the Euclidian distance between this point and another point.
         * 
         * @param {Point} otherPoint The point to which we are calculating a distance
         */
        distance(otherPoint = new Point(0, 0)) {

            return Math.sqrt(this.distanceSquared(otherPoint));
        }

        /**
         * Since finding the Euclidean distance requires an expensive square root
         * calculation, we have the option of calculating the squared distance to go
         * quicker.
         * 
         * @param {Point} otherPoint The point to which we are calculating the
         * squared distance
         */
        distanceSquared(otherPoint = new Point(0, 0)) {
            let xDiff = (this.x - otherPoint.x);
            let yDiff = (this.y - otherPoint.y);
            return xDiff * xDiff + yDiff * yDiff;
        }

        /**
         * Find the pairwise difference to another point.
         * 
         * @param {Point} otherPoint The point from which we are doing a pairwise
         * difference. 
         */
        diff(otherPoint) {
            return new Point(this.x - otherPoint.x, this.y - otherPoint.y);
        }
    }

    /**
     * Components are attached to game objects.
     * 
     * Examples of components are behaviors, renderers, and colliders.
     * Components cannot have children.
     * 
     * In the declarative syntax of scenes and game objects, components are defined
     * as follows:
     * ```
     * {
     *  type:"<type name of component>",
     *    values:[
     *       {
     *          key:"<name of component member variable>",
     *          value:"<the desired value>"
     *        }
     *    ]
     * }
     * ```
     */

    class Component {

        /**
         * Reference to the parent game object.
         * 
         * In order to connect this game object member variable to the parent game
         * object, compoments must be added to game objects using the addComponent()
         * method. If instead you simple say gameObect.components.push(component),
         * you will invariably run into bugs.
         */
        constructor() {
            this.gameObject;
        }


    }

    /**
     * A game object represents a "thing" in a game.
     * a gameOject instance can be a character, part of the background
     * or an invisible container for logic
     */
    class GameObject extends NameableParent {
        /**
         * The x position of the game object relative to its parent
         */
        //x;

        /**
         * The y position of the game object relative to its parent
         */
        //y;

        /**
         * The scale of the game object in x relative to its parent
         */
        //scaleX;

        /**
         * The scale of the game object in y relative to its parent
         */
        //scaleY;

        /**
         * The rotation of the game object relative to its parent
         */
        //rotation;

        /**
         * Array of components this game object has. Note, components should only be
         * added to this array used GameObject.addComponent() to components.push().
         * Otherwise the components won't have their parent game object member
         * variable method populated.
         */
        //components = [];


        /**
         * Returns the location of the game object as a Point object rather than two
         * variables x and y.
         */
        get location() {
            return new Point(this.x, this.y);
        }

        /**
         * 
         * @param {Number} x The x position of the game object relative to its parent. Defaults to 0
         * @param {Number} y The y positon of the game object relative to its
         * parent. Defaults to 0
         * @param {Number} scaleX The scale of the objet in x relative to its
         * parent. Defaults to 1.
         * @param {Number} scaleY The scale of the object in y relative to its
         * parent. Scales to 1.
         * @param {Number} rotation The scale of the object relative to its parent.
         */
        constructor(x = 0, y = 0, scaleX = 1, scaleY = 1, rotation = 0) {
            super();
            this.components = [];
            [this.x, this.y, this.scaleX, this.scaleY, this.rotation] = [x, y, scaleX, scaleY, rotation];
        }
        /**
         * 
         * @param {Component} component The component to be added to this game
         * object's list of components
         * 
         * Call this method instead of GameObject.components.push() to add
         * components so that components will have their gameObject parent member
         * variable populated.
         */
        addComponent(component) {
            this.components.push(component);
            component.gameObject = this;
        }

        /**
         * 
         * Render this game object to a canvas by calling the draw method on all its
         * components and then recursively calling draw on its child components.
         * 
         * @param {Canvas_2D_Context} ctx The canvas context  to draw to. This may a
         * literal reference to a canvas on the DOM or a background image for
         * deferred rendering.
         */
        draw(ctx) {
            ctx.save();

            /** We first need to figure out if we are rendering in screen space or world space
             * We know by checking for the presence of a RectTransform.        
            */

            if (this.anyComponent("RectTransform")) {
                //We first need to move relative to the screen bounding box
                let rectTransform = this.getComponent("RectTransform");
                let width = ctx.canvas.width;
                let height = ctx.canvas.height;
                let tx = 0; //Default to anchor left
                let ty = 0; //Default to anchor top

                if(rectTransform.anchorHorizontal == "center")
                    tx = width/2;
                else if(rectTransform.anchorHorizontal == "right")
                    tx = width;
                if(rectTransform.anchorVertical == "middle")
                    ty = height/2;
                else if(rectTransform.anchorVertical == "bottom")
                    ty = height;

                ctx.translate(tx, ty);
                
            }

            //Otherwise we are in world space
            ctx.translate(this.x, this.y);
            ctx.scale(this.scaleX, this.scaleY);
            ctx.rotate(this.rotation);


            this.components.filter(i => i.draw).forEach(i => i.draw(ctx));

            //Now draw all the children
            this.children.filter(i => i.draw).forEach(i => i.draw(ctx));

            ctx.restore();
        }
        update() {
            this.components.filter(i => i.update).forEach(i => i.update());

            //Now update all the children
            this.children.forEach(i => i.update());
        }
        getComponent(type) {
            if (typeof (type) === 'string' || type instanceof String) {
                //The user passed us a string, not a type
                //https://stackoverflow.com/a/7772724/10047920
                let component = this.components.find(i => i.constructor.name === type);
                if (component) return component;
                throw "Error, couldn't find type " + type;
            } else {
              let component;
              try{
                 component = this.components.find(i => i instanceof type);
              }catch (e){
                console.log(e);
              }
                if (component) return component;
                throw "Error, couldn't find type " + type;
            }
        }
        /**
         * Returns true if there is at least one component of the given
         * type attached to this GameObject.
         * 
         * @param {The type of the componet to search for. May be a string or object type} type 
         */
        anyComponent(type) {
            if (typeof (type) === 'string' || type instanceof String) {
                //The user passed us a string, not a type
                //https://stackoverflow.com/a/7772724/10047920
                let component = this.components.find(i => i.constructor.name === type);
                if (component) return true;
                return false;
            } else {
                let component = this.components.find(i => i instanceof type);
                if (component) return true;
                return false;
            }
        }
        recursiveCall(functionName) {
            for (let i = 0; i < this.components.length; i++) {
                let component = this.components[i];
                if (component[functionName]) {
                    component[functionName]();
                }
            }
            //Now call the function on the children
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i];
                child.recursiveCall(functionName);
            }
        }
    }

    class Collider extends Component {
        constructor() {
            super();
        }



    }

    class PointCollider extends Collider {
        constructor() {
            super();
        }

    }

    /**
     * Static holder for the state of the input
     */

    const Input = {

        //---------------------------------------------------
        //Key handling members
        //---------------------------------------------------
        keys : [], //What is the current state of each key?

        down : [], //Did the key go down this frame?
        up : [], //Did the key do up this frame?

        //When we start an update(), we shift to these arrays so we don't have mutating arrays mid-update
        frameDown : [],
        frameUp : [],


        //---------------------------------------------------
        //Mouse handling members
        //---------------------------------------------------


        mouseButtons :[], //What is the current State of the each button?

         mouseButtonsDown : [], //Did the mouse button go down this frame?
         mouseButtonsUp : [], //Did the mouse button go up this frame?

        //When we start an update(), we shift these arrays so we don't have mutating arrays mid-update
         frameMouseButtonsDown : [],
         frameMouseButtonsUp : [],

        //The location of the mouse in screen coordinates
         mousePosition : {x:0,y:0},

        //Handle the wheel state
         mouseScrollDelta : 0,
         frameScrollDelta: 0,



         swapUpDownArrays() {
            this.frameDown = this.down;
            this.frameUp = this.up;
            this.down = [];
            this.up = [];

            this.frameMouseButtonsDown = this.mouseButtonsDown;
            this.frameMouseButtonsUp = this.mouseButtonsUp;
            this.frameScrollDelta = this.mouseScrollDelta;
            this.mouseScrollDelta = 0;
            this.mouseButtonsDown = [];
            this.mouseButtonsUp = [];
            
            
        },

        //---------------------------------------------------
        //Key handling functions
        //---------------------------------------------------

        //Did the key come up this frame?
        getKeyUp(key) {
            return this.frameUp[key];
        },

        //Did the key go down the frame? [Remember, the OS may make it look like key repeated when they did not]
         getKeyDown(key) {
            return this.frameDown[key];
        },

        //Is the key pressed? Down (true) Up (false)
         getKey(key) {
            return this.keys[key];
        },

        //---------------------------------------------------
        //Mouse handling functions
        //---------------------------------------------------


        //Did the mouse button come up this frame?
         getMouseButtonUp(button) {
            return this.frameMouseButtonsUp[button];
        },

        //Did the mouse button go down this frame?
         getMouseButtonDown(button) {
            return this.frameMouseButtonsDown[button];
        },

        //Is the mouse button pressed? Down (true) Up (false)
         getMouseButton(button) {
            return this.mouseButtons[button];
        },

        //What is the current state of the scroll wheel?
         getMouseScrollWheel(){
            return this.frameScrollDelta;
        }


    };

    // import Globals from "./Globals.js"

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
            this.prefabs;
            this.behaviors;
            this.components;

        }

        /**
         * Assign the scene its scene tree using our declarative syntax.
         * 
         * @param {String} obj The string specifying the contents of the scene in
         * our declarative syntax.
         */
         
        start2(behaviors, prefabs, components) {
            this.behaviors = behaviors;
            this.prefabs = prefabs;
            this.components = components;

            this.children = [];

            //Load a scene from a declarative syntax

            if (this.objects) {
                this.children = [];
                for (let i = 0; i < this.objects.length; i++) {
                    let obj = this.objects[i];
                    this.buildChild2(obj, this.children);

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
                    this.buildChild(obj, this.children);

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
            let keys = Object.keys(this.prefabs);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                if (key == obj.type) {
                    gameObjectType = this.prefabs[key];
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
                    let componentValue = obj.componentValues[j];
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
                    let componentKeys = Object.keys(this.components);
                    let behaviorKeys = Object.keys(this.behaviors);
                    for (let i = 0; i < componentKeys.length; i++) {
                        let key = componentKeys[i];
                        if (key == componentString) {
                            componentType = this.components[key];
                            break
                        }
                    }
                    if (componentType == null) {
                        for (let i = 0; i < behaviorKeys.length; i++) {
                            let key = behaviorKeys[i];
                            if (key == componentString) {
                                componentType = this.behaviors[key];
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
                    let componentValue = obj.componentValues[j];
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
            let cameras = this.children.filter(i => i.anyComponent("CameraComponent"));
            if (cameras.length == 0) {
                //You really should add a camera
                //console.log("You should add a camera to the scene. C'mon.")
                ctx.fillStyle = "cyan";
                ctx.fillRect(0, 0, width, height);
                tx = 0;
                ty = 0;
                sx = 1;
                sy = 1;
                r = 0;
                hx = 0;
                hy = 0;
            }
            else {
                if (cameras.length > 1)
                    console.log("More than 1 camera detected in the scene. You should only have exactly one root game object with a camera component attached.");
                let camera = cameras[0];
                let cameraComponent = camera.getComponent("CameraComponent");
                ctx.fillStyle = cameraComponent.backgroundColor;
                ctx.fillRect(0, 0, width, height);
                tx = camera.x;
                ty = camera.y;
                sx = camera.scaleX;
                sy = camera.scaleY;
                r = camera.rotation;
                hx = width / 2;
                hy = height / 2;
            }

            ctx.translate(hx, hy);
            ctx.rotate(r);
            ctx.scale(sx, sy);
            ctx.translate(-tx, -ty);

            //Draw children that are not in screen space
            this.children.filter(i => i.draw && !i.anyComponent("CanvasComponent")).forEach(i => i.draw(ctx));

            ctx.restore();

            //We're now back in screen space. It's time to draw any GUI components
            //if we have a gameObject with an attached CanvasComponent
            ctx.save();
            let canvases = this.children.filter(i => i.anyComponent("CanvasComponent"));
            if (canvases.length == 0) ;
            else {
                if (canvases.length > 1) {
                    console.log("More than 1 canvas object found in the root of your scene graph. You should only have exactly one game object with a canvas component. The other object(s) and its children will not be rendered.");
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
            let cameras = this.children.filter(i => i.anyComponent("CameraComponent"));
            let point = {x:0,y:0};
            point.x=parseInt(Input.mousePosition.x);
            point.y=parseInt(Input.mousePosition.y);
            if (cameras.length == 0) ;
            else {
               /* point = Input.mousePosition;*/
                //Put in transform code here
                let camera = cameras[0];
                let cameraComponent = camera.getComponent("CameraComponent");
                
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
                                component.onMouseDown();
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
            this.buildIt(prefab, gameObject);
            gameObject.name = prefab.name;
            gameObject.recursiveCall("start");
            return gameObject

        }

        
    }

    function main(gameObjects, gameBehaviors, scenes) {
      //From https://flaviocopes.com/how-to-merge-objects-javascript/
      this.Prefabs = { ...gameObjects, ...this.Prefabs };
      this.Behaviors = gameBehaviors;
      let canv, ctx;

      scenes.allScenes
        .forEach(i => this.SceneManager.addScene(makeScene(i)));

      this.SceneManager.currentScene = scenes.startScene;
      canv = document.querySelector("#canv");
      ctx = canv.getContext('2d');

      let that = this;

      function gameLoop() {
        Input.swapUpDownArrays();
        update();
        draw(ctx);
      }

      function update() {
        that.SceneManager.currentScene.update(ctx, that.Components.Collider, that.Components.CollisionHelper);
      }

      function draw(ctx) {
        that.SceneManager.currentScene.draw(ctx, canv.width, canv.height);
      }

      //Setup event handling
      document.body.addEventListener('keydown', keydown);
      document.body.addEventListener('keyup', keyup);
      document.body.addEventListener('keypress', keypress);
      document.body.addEventListener('mousedown', mousedown);
      document.body.addEventListener('mouseup', mouseup);
      document.body.addEventListener('mousemove', mousemove);
      document.body.addEventListener('wheel', wheelevent);
      document.body.addEventListener('contextmenu', contextmenu);

      function makeScene(obj) {
        let toReturn = new Scene(obj.name);
        toReturn.objects = obj.objects;
        return toReturn;
      }

      function keydown(event) {
        if (Input.keys[event.key] != true)
          Input.down[event.key] = true;
        Input.keys[event.key] = true;
      }

      function keyup(event) {
        if (Input.keys[event.key] != false)
          Input.up[event.key] = true;
        Input.keys[event.key] = false;
      }

      function mousedown(event) {
        if (Input.mouseButtons[event.button] != true)
          Input.mouseButtonsDown[event.button] = true;
        Input.mouseButtons[event.button] = true;
      }

      function mouseup(event) {
        if (Input.mouseButtons[event.button] != false)
          Input.mouseButtonsUp[event.button] = true;
        Input.mouseButtons[event.button] = false;
      }

      function mousemove(event) {
        [Input.mousePosition.x, Input.mousePosition.y] = [event.clientX, event.clientY];

      }

      function wheelevent(event) {
        if (event.deltaY != 0)
          Input.mouseScrollDelta = event.deltaY;
      }

      function keypress(event) {
        //console.log(`Modifier keys: Control: ${event.ctrlKey}, Alt: ${event.altKey}, Shift: ${event.shiftKey}, Meta Key: ${event.metaKey}`);
      }

      // Based on https://stackoverflow.com/questions/381795/how-to-disable-right-click-context-menu-in-javascript
      // Kills the right mouse context menu
      function contextmenu(event) {
        if (event.preventDefault != undefined)
          event.preventDefault();
        if (event.stopPropagation != undefined)
          event.stopPropagation();
        return false;
      }

      //Keep our canvas full screen
      //from https://blog.codepen.io/2013/07/29/full-screen-canvas/

      var can = document.getElementById("canv");

      function resizeCanvas() {
        can.style.width = window.innerWidth + "px";
        setTimeout(function () {
          can.style.height = window.innerHeight + "px";
        }, 0);
        can.width = window.innerWidth;
        can.height = window.innerHeight;
      }
      // Webkit/Blink will fire this on load, but Gecko doesn't.
      window.onresize = resizeCanvas;

      // So we fire it manually...
      resizeCanvas();
      setInterval(gameLoop, 33);
    }

    return main;

}());
