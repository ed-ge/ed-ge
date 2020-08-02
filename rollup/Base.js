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
 *      <...>
 *    ]
 * }
 * ```
 * The brief version of the syntax is as follows:
 * ```
 * "<type name of the componenent>|key|value<...>"
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
        this.uuid = this.uuidv4();
        this.type = this.constructor.name;
        this.gameObject = null;
    }

    get $go(){
      return this.gameObject;
    }

    

    /**Generate a uuid
     * From https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
     */
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }


}

/**
 * Behaviors are game-specific class that add logic to game objects
 */
class Behavior extends Component {

    /**
     * Called when the parent game object is instatiated,
     * either when the scene starts if the game object is
     * part of the scene definition or in the middle of 
     * the scene when the game object is instantiated.
     * 
     * This is a great place to setup up your scene or
     * instantiate other game objects programmatically.
     * For example, if you have a tile-based game, you 
     * could use the start() method of a controller 
     * behaviors to intantiate all the tiled with a 
     * double for loop.
     */
    start() {}

    /**
     * Called as part of the game loop.
     * Whenever the game loop fires, all game objects in
     * the scene recursively call update on all their 
     * behaviors and then on all their child game object
     * behaviors.
     * 
     */
    update() {}

}

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
        this.parent = null;
        this.uuid = this.uuidv4();
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
        if(arguments.length != 1 || !(gameObject instanceof NameableParent)) throw new Error("destroy takes exactly one argument of type NameableParent")
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

    addChild(child){
        if(arguments.length != 1 || !(child instanceof NameableParent)) throw new Error("addChild requires exactly one argument of type NameableParent")
        if(!child || child.parent === undefined) throw  new Error("addChild requires one argument that have a parent member variable");
        if(this.children.includes(child)) return console.log("Warning: This parent already has that child. Child not added");
        this.children.push(child);
        child.parent = this;
        if(this.newChildEvent)
            this.newChildEvent(child);
    }

    isADescendant(descendant){
        if(arguments.length != 1 || !(descendant instanceof NameableParent)) throw new Error("isADescendant expects exactly one argument of type NameableParent")
        if(this == descendant) return true;
        for(let child of this.children){
            let result = child.isADescendant(descendant);
            if(result) return true;
        }
        return false;
    }
    $(name){
        return this.findByName(name);
    }

    findByName(name){
        if(arguments.length != 1 || !(typeof name == 'string' || name instanceof String)) throw new Error("findByName expects exactly one string argument.")
        if(this.name == name)
            return this;
        for(let child of this.children){
            let result = child.findByName(name);
            if(result != null) return result;        
        }
        //We didn't find anything
        return null;
    }

    /** Find a NameableParent by UUID */
    findByUUID(uuid){
        if(arguments.length != 1 || !(typeof uuid == 'string' || uuid instanceof String)) throw new Error("findByUUID expects exactly one string argument.")
         
      if(this.uuid == uuid)
            return this;
        for(let child of this.children){
            let result = child.findByUUID(uuid);
            if(result != null) return result;        
        }
        //We didn't find anything
        return null;
    }

    /**Generate a uuid
     * From https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
     */
    uuidv4() {
        if(arguments.length != 0) throw new Error("uuidv4 takes no arguments.")
        
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
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

    /** Duplicate the point */
    clone(){
      return new Point(this.x, this.y);
    }
    /**
     * Returns a new point with normalized values
     */
    toNormalized(){
        let length = this.distance();
        return new Point(this.x/length, this.y/length);
    }
}

/**
 * Determines the anchoring of an object in screen space
 */
class RectTransform extends Component {

   

    constructor() {
        super();
        /** Where the object will be anchored horizontally */
        this.anchorHorizontal = "center";

        /** Where the object will be anchored vertically */
        this.anchorVertical = "middle";

    }

    update() {

    }
}

class Matrix3 {
    get m11() { return this.m[0][0] };
    get m12() { return this.m[0][1] };
    get m13() { return this.m[0][2] };

    get m21() { return this.m[1][0] };
    get m22() { return this.m[1][1] };
    get m23() { return this.m[1][2] };

    get m31() { return this.m[2][0] };
    get m32() { return this.m[2][1] };
    get m33() { return this.m[2][2] };

    get translation(){
        return new Point(this.at(2,0), this.at(2,1));
    }
    set translation(point){
        if(!(point instanceof Point)) throw new Error("You must set translation to be of type Point");
        this.set(2,0,point.x);
        this.set(2,1,point.y);

    }
    get scale(){
        let a = this.at(0,0);
        let b = this.at(1,0);
        let d = this.at(0,1);
        let e = this.at(1,1);
        let scaleX = Math.sqrt(a*a+d*d);
        let scaleY = Math.sqrt(b*b+e*e);

        return new Point(scaleX, scaleY);

    }
    set scale(point){
        if(!(point instanceof Point)) throw new Error("You must set scale to be of type Point");
        //We first have to get the scale we currently have and reinsert the new one
        let t = this.translation;
        let r = this.rotation;
        this.from(t.x, t.y, point.x, point.y, r);

    }
    get rotation(){
        let a = this.at(0,0);
        let d = this.at(0,1);
        let scaleX = Math.sqrt(a*a+d*d);
        let r = Math.acos(a/scaleX);
        return r;
    }
    set rotation(r){
        if(isNaN(r)) throw new Error("You must set rotation to be a number");
        let t = this.translation;
        let s = this.scale;
        this.from(t.x, t.y, s.x, s.y, r);
    }

    constructor() {
        this.m = [];
        for (let y = 0; y < 3; y++) {
            let row = [];
            this.m.push(row);
            for (let x = 0; x < 3; x++) {
                row.push(y == x ? 1 : 0);
            }
        }
    }
    at(r, c) {
        if (arguments.length != 2 ||
            isNaN(r) ||
            isNaN(c) ||
            r < 0 || r > 2 ||
            c < 0 || c > 2)
            throw new Error("at requires two arguments which are both [0,2].")

        return this.m[r][c];
    }
    set(r, c, value) {
        if (arguments.length != 3 ||
            isNaN(r) ||
            isNaN(c) ||
            isNaN(value) ||
            r < 0 || r > 2 ||
            c < 0 || c > 2)
            throw new Error("at requires three arguments, the first two are both [0,2] and the third is a number.")

        this.m[r][c] = value;
    }
    from(x,y,scaleX, scaleY, r){
        if(arguments.length != 5 || isNaN(x) || isNaN(y) || isNaN(scaleX) || isNaN(scaleY) || isNaN(r)) throw new Error("from requires five numeric arguments");

        this.set(2,0,x);
        this.set(2,1,y);

        this.set(0,0, Math.cos(r));
        this.set(1,1, Math.cos(r));
        this.set(1,0, -Math.sin(r));
        this.set(0,1, Math.sin(r));

        this.set(0,0, this.at(0,0) * scaleX);
        this.set(0,1, this.at(0,1) * scaleX);
        this.set(1,0, this.at(1,0) * scaleY);
        this.set(1,1, this.at(1,1) * scaleY);


    }
    mult(value) {
        if (value instanceof Point && arguments.length == 1) {
            return this.multPoint(value);
        }
        else if (value instanceof Matrix3 && arguments.length == 1) {
            return this.multMatrix3(value);
        }
        throw new Error("mult requires 1 argument that is either a Point or a Matrix3.")
    }
    multPoint(point) {
        if (!(point instanceof Point) || arguments.length != 1) {
            throw new Error("multPoint takes exactly one argument of type Point.")
        }

        let matrix = [point.x, point.y, 1];

        let done = [];
        for(let y= 0; y < 3; y++){
            let sum = 0;
            for(let i = 0; i < 3; i++){
                let a = this.at(i,y);
                let b = matrix[i];
                let product = a*b;
                sum += product;
            }
            done.push(sum);
        }

        //Handle the w value if it's not 1
        done[0]/=done[2];
        done[1]/=done[2];

        let toReturn = new Point(done[0], done[1]);
        return toReturn;

    }
    multMatrix3(matrix) {
        if (!(matrix instanceof Matrix3) || arguments.length != 1) {
            throw new Error("multMatrix takes exactly one argument of type Matrix3.")
        }

        let toReturn = new Matrix3();

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                let newValue = 0;
                for(let i = 0; i < 3; i++){
                    let a = this.at(i,y);
                    let b = matrix.at(x,i);
                    let product = a*b;
                    newValue += product;
                }
                toReturn.set(x,y,newValue);
            }
        }

        return toReturn;
    }
    equals(matrix) {
        if (!matrix instanceof Matrix3 || arguments.length != 1) {
            throw new Error("equals takes exactly one argument of type Matrix3.")
        }

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (matrix.at(x, y) != this.at(x, y))
                    return false;
            }
        }
        return true;
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
   * 
   */
  get location() {
    return new Point(this.x, this.y);
  }

  get scale() {
    return new Point(this.scaleX, this.scaleY);
  }

  get localTransform() {
    let matrix = new Matrix3();
    matrix.from(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
    return matrix;

  }

  get worldTransform() {
    if (!this.parent || this.parent instanceof Base.Scene)
      return this.localTransform;
    let parentTransform = this.parent.worldTransform;
    let toReturn = parentTransform.mult(this.localTransform);
    return toReturn;
  }

  /**
   * Returns the world space location of the game object.
   * This takes into account the transforms of the chain of parents
   */
  get worldLocation() {
    let world = this.worldTransform;
    return world.translation;

  }

  get worldScale() {
    let world = this.worldTransform;
    return world.scale;
  }

  get worldRotation() {
    let world = this.worldTransform;
    return world.rotation;
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
  constructor(x = 0, y = 0, scaleX = 1, scaleY = 1, rotation = 0, prefabName = "Empty") {
    super(prefabName);
    this.components = [];
    this.layer = null;
    [this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.prefabName] = [x, y, scaleX, scaleY, rotation, prefabName];
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
    if(arguments.length != 1) throw new Error("addComponent takes exactly one argument.")
    if(!(component instanceof Component)) throw new Error("addComponent takes exactly one argument of type Component.")
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
    if(arguments.length != 1) throw new Error("draw expects exactly one argument of type context2d.")
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

      if (rectTransform.anchorHorizontal.trim().toLowerCase() == "center")
        tx = width / 2;
      else if (rectTransform.anchorHorizontal.trim().toLowerCase() == "right")
        tx = width;
      if (rectTransform.anchorVertical.trim().toLowerCase() == "middle")
        ty = height / 2;
      else if (rectTransform.anchorVertical.trim().toLowerCase() == "bottom")
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
    if(arguments.length != 0) throw new Error("draw function expects no arguments.")
    
    this.components.filter(i => i.update).forEach(i => i.update());

    //Now update all the children
    this.children.forEach(i => i.update());
  }
  /**
   * Shorthand for getComponent(type)
   * @param {*} type 
   */
  $(type){
    return this.getComponent(type);
  }
  $any(type){
    return this.anyComponent(type);
  }
  getComponent(type) {
    if(arguments.length != 1) throw new Error("getComponent function expects exactly one argument that is a string or a type.")
    
    if (typeof (type) === 'string' || type instanceof String) {
      //The user passed us a string, not a type
      //https://stackoverflow.com/a/7772724/10047920
      let component = this.components.find(i => i.constructor.name === type);
      if (component) return component;
      throw new Error("Error, couldn't find type " + type);
    } else {
      let component;
      try {
        component = this.components.find(i => i instanceof type);
      } catch (e) {
        console.log(e);
      }
      if (component) return component;
      throw new Error("Error, couldn't find type " + type);
    }
  }
  /**
   * Returns true if there is at least one component of the given
   * type attached to this GameObject.
   * 
   * @param {type} The type of the component to search for. May be a string or object type type 
   */
  anyComponent(type) {
    if(arguments.length != 1) throw new Error("anyComponent function expects exactly one argument that is a string or a type.")
    
    
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
    if(arguments.length != 1) throw new Error("recursiveCall function expects exactly one argument that is the name of a function.")
    
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

  // serialize() {
  //   if(arguments.length != 0) throw new Error("seralize expects no arguments")
    
  // }

  onDestroy(){
    if(arguments.length != 0) throw new Error("onDestroy expects no arguments");
    for(let component of this.components){
      if(component.onDestroy)
        component.onDestroy();
    }
    //We don't have to call onDestroy on the children because the caller 
    //does that already. 

  }
}

/**
 * Static holder for the state of the input
 */

const Input = {

  //---------------------------------------------------
  //Key handling members
  //---------------------------------------------------
  keys: [], //What is the current state of each key?

  down: [], //Did the key go down this frame?
  up: [], //Did the key do up this frame?

  //When we start an update(), we shift to these arrays so we don't have mutating arrays mid-update
  frameDown: [],
  frameUp: [],


  //---------------------------------------------------
  //Mouse handling members
  //---------------------------------------------------


  mouseButtons: [], //What is the current State of the each button?

  mouseButtonsDown: [], //Did the mouse button go down this frame?
  mouseButtonsUp: [], //Did the mouse button go up this frame?

  //When we start an update(), we shift these arrays so we don't have mutating arrays mid-update
  frameMouseButtonsDown: [],
  frameMouseButtonsUp: [],

  //The location of the mouse in screen coordinates
  mousePosition: new Point(),
  frameMousePosition: new Point(),
  lastFrameMousePosition: new Point(),

  //Handle the wheel state
  mouseScrollDelta: 0,
  frameScrollDelta: 0,


  //-------------------------------------------------
  // Touch handling members
  //-------------------------------------------------

  touches: [],

  touchesStart: [],
  touchesEnd: [],
  // touchPositions: [],
  frameTouchesStart: [],
  frameTouchesEnd: [],
  frameTouchPositions: [],
  lastFrameTouchPositions:[],


  swapUpDownArrays() {
    if(arguments.length != 0) throw new Error("swapUpDownArrays takes no arguments.")
    this.frameDown = this.down;
    this.frameUp = this.up;
    this.down = [];
    this.up = [];

    this.lastFrameMousePosition = this.frameMousePosition.clone();
    this.frameMousePosition = this.mousePosition.clone();

    this.frameMouseButtonsDown = this.mouseButtonsDown;
    this.frameMouseButtonsUp = this.mouseButtonsUp;
    this.frameScrollDelta = this.mouseScrollDelta;
    this.mouseScrollDelta = 0;
    this.mouseButtonsDown = [];
    this.mouseButtonsUp = [];


    this.frameTouchesStart = this.touchesStart;
    this.frameTouchesEnd = this.touchesEnd;
    this.touchesStart = [];
    this.touchesEnd = [];
    
    this.lastFrameTouchPositions = this.frameTouchPositions;
    this.frameTouchPositions = this.touches;
    //this.touchPositions = [];

    // if(this.frameTouchesEnd.length != 0){
    //   console.log("Restart")
    //   this.touches = [];
    //   this.lastFrameTouchPositions = [];
    //   this.frameTouchPositions = [];
    // }


  },

  //---------------------------------------------------
  //Key handling functions
  //---------------------------------------------------

  //Did the key come up this frame?
  getKeyUp(key) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.frameUp[key];
  },

  //Did the key go down the frame? [Remember, the OS may make it look like key repeated when they did not]
  getKeyDown(key) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.frameDown[key];
  },

  //Is the key pressed? Down (true) Up (false)
  getKey(key) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.keys[key];
  },

  //---------------------------------------------------
  //Mouse handling functions
  //---------------------------------------------------


  //Did the mouse button come up this frame?
  getMouseButtonUp(button) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.frameMouseButtonsUp[button];
  },

  //Did the mouse button go down this frame?
  getMouseButtonDown(button) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.frameMouseButtonsDown[button];
  },

  //Is the mouse button pressed? Down (true) Up (false)
  getMouseButton(button) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.mouseButtons[button];
  },

  //What is the current state of the scroll wheel?
  getMouseScrollWheel() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.frameScrollDelta;
  },

  //What is the mouse position?
  //We return the previous frame's position for consistency
  getMousePosition() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.frameMousePosition;
  },
  getMousePositionDelta() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return new Point(this.frameMousePosition.x - this.lastFrameMousePosition.x, this.frameMousePosition.y - this.lastFrameMousePosition.y);
  },

  //Touch API----------------------------------
  //
  getTouchesStartFull() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.frameTouchesStart;
  },
  getTouchesStart() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.frameTouchesStart.map(i => { return { x: i.clientX, y: i.clientY } });
  },
  getTouchesEndFull() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.frameTouchesEnd;
  },
  getTouchesEnd() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    if(this.frameTouchesEnd.length == 0) return [];
    return this.frameTouchesEnd.map(i => { return { x: i.clientX, y: i.clientY } });
  },
  anyTouchesEnd(){
    return this.getTouchesEnd().length > 0;
  },
  getTouchesFull() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.touches;
  },
  getTouches() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    //If we have ending touches, merge those in here
    let toReturn = this.touches.map(i => { return { x: i.clientX, y: i.clientY } });
    toReturn.push(...this.frameTouchesEnd.map(i=>{return {x:i.clientX,y:i.clientY}}));
    return toReturn;
  },  
  // getTouchPositions() {
  //   return this.frameTouchPositions.map(i => { return { x: i.clientX, y: i.clientY } });
  // },
  getTouchMove(){    
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    if(this.frameTouchPositions.length == 0 || this.lastFrameTouchPositions.length == 0) return [{x:0,y:0}];
    let frames = this.frameTouchPositions.map(i => { return { x: i.clientX, y: i.clientY } });
    let currents = this.lastFrameTouchPositions.map(i => { return { x: i.clientX, y: i.clientY } });
    let toReturn = [];
    for(let i=0; i < Math.min(frames.length, currents.length); i++){
      let frame = frames[i];
      let current = currents[i];
      toReturn.push(new Point(frame.x - current.x, frame.y - current.y));
    }
    return toReturn;
  }




};

/**
 * Create a line from two points and store the line in 
 * ax+bc+c=0 form
 */
class Line {
    /**
     * 
     * @param {Point} one The first point on the line
     * @param {Point} two The second point on the line
     * The two points must be at different locations or an exception is thrown
     * 
     */
    constructor(one, two) {
        this.a = two.y - one.y;
        this.b = one.x - two.x;
        //Now normalize the values
        let tempPoint = new Point(this.a,this.b);
        tempPoint = tempPoint.toNormalized();
        this.a = tempPoint.x;
        this.b = tempPoint.y;
        this.c = two.x * one.y - one.x * two.y;
        
    }
    /**
     * Return a. 
     * Created as a getter so that a cannot be set
     */
    
    /**
     * 
     * @param {Point} point The point whose distance from the line is to be calculated
     * 
     * Returns the distance to this line.
     */
    distance(point) {
        return this.a * point.x + this.b * point.y + this.c;
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

/* c8 ignore next 1000 */
function Vector2(x, y) {
    this.x = x;
    this.y = y;

    this.plus = function(vector) {
    	return new Vector2(x + vector.x, y + vector.y);
    };
    
    this.minus = function(vector) {
    	return new Vector2(x - vector.x, y - vector.y);
    };
    
    this.multiply = function(vector) {
    	return x * vector.x + y * vector.y;
    };
    
    this.scale = function(k) {
        return new Vector2(x*k, y*k);
    };
}

function Line$1() {
	/*
	this.point; // Vector2
	this.direction; // Vector2
	*/
}

function Obstacle() {
	/*
	this.point; // Vector2
	this.unitDir; // Vector2;
	this.isConvex; // boolean
	this.id; // int
	this.prevObstacle; // Obstacle
	this.nextObstacle; // Obstacle
	*/
}

function KeyValuePair(key, value) {
	this.key = key;
	this.value = value;
}

let RVOMath = {};

RVOMath.RVO_EPSILON = 0.01;

RVOMath.absSq = function(v) {
    return v.multiply(v);
};

RVOMath.normalize = function(v) {
	return v.scale(1 / RVOMath.abs(v)); // v / abs(v)
};

RVOMath.distSqPointLineSegment = function(a, b, c) {
	var aux1 = c.minus(a);
	var aux2 = b.minus(a);
	
	// r = ((c - a) * (b - a)) / absSq(b - a);
	var r = aux1.multiply(aux2) / RVOMath.absSq(aux2);
	
	if (r < 0) {
		return RVOMath.absSq(aux1); // absSq(c - a)
	} else if (r > 1) {
		return RVOMath.absSq(aux2); // absSq(c - b)
	} else {
		return RVOMath.absSq( c.minus(a.plus(aux2.scale(r))) ); // absSq(c - (a + r * (b - a)));
	}
};

RVOMath.sqr = function(p) {
	return p * p;
};

RVOMath.det = function(v1, v2) {
	return v1.x * v2.y - v1.y* v2.x;
};

RVOMath.abs = function(v) {
	return Math.sqrt(RVOMath.absSq(v));
};

RVOMath.leftOf = function(a, b, c) {
	return RVOMath.det(a.minus(c), b.minus(a));
};

/* c8 ignore next 1000 */


function KdTree() {
	var MAXLEAF_SIZE = 100;
	
	function FloatPair(a, b) {
		this.a = a;
		this.b = b;
		
		this.mt = function(rhs) {
			return this.a < rhs.a || !(rhs.a < this.a) && this.b < rhs.b;
		};
		
		this.met = function(rhs) {
			return (this.a == rhs.a && this.b == rhs.b) || this.mt(rhs); 
		};
		
		this.gt = function(rhs) {
			return !this.met(rhs);
		};
		
		this.get = function(rhs) {
			return !this.mt(rhs);
		};
	}
	
	function AgentTreeNode() {
		/**
        int begin;
        int end;
        int left;
        float maxX;
        float maxY;
        float minX;
        float minY;
        int right;
        */
	}
	
	function ObstacleTreeNode() {
		/**
		ObstacleTreeNode left;
        Obstacle obstacle;
        ObstacleTreeNode right;
		*/
	}
	
	var agents = []; // Agent[]
	var agentTree = []; // AgentTreeNode[]
	var obstacleTree = {}; // ObstacleTreeNode
	
	this.buildAgentTree = function(simulator) {
		if (agents.length != simulator.getNumAgents()) {
			agents = simulator.agents;
			
			for (var i=0; i<2*agents.length; i++) {
				agentTree.push(new AgentTreeNode());
			}
		}
		
		if (agents.length > 0) {
			buildAgentTreeRecursive(0, agents.length, 0);
		}
	};
	
	var buildAgentTreeRecursive = function(begin, end, node) {
		agentTree[node].begin = begin;
		agentTree[node].end = end;
		agentTree[node].minX = agentTree[node].maxX = agents[begin].position.x;
		agentTree[node].minY = agentTree[node].maxY = agents[begin].position.y;
		
		for (var i = begin+1; i<end; ++i) {
			agentTree[node].maxX = Math.max(agentTree[node].maxX, agents[i].position.x);
			agentTree[node].minX = Math.max(agentTree[node].minX, agents[i].position.x);
			agentTree[node].maxY = Math.max(agentTree[node].maxX, agents[i].position.y);
			agentTree[node].minY = Math.max(agentTree[node].minY, agents[i].position.y);
		}
		
		if (end - begin > MAXLEAF_SIZE) {
			// no leaf node
			var isVertical = agentTree[node].maxX - agentTree[node].minX > agentTree[node].maxY - agentTree[node].minY;
			var splitValue = isVertical ? 0.5 * (agentTree[node].maxX + agentTree[node].minX) : 0.5 * (agentTree[node].maxY + agentTree[node].minY);
			
			var left = begin;
			var right = end;
			
			while (left < right) {
				while (left < right && (isVertical ? agents[left].position.x : agents[left].position.y) < splitValue)
                {
                    ++left;
                }

                while (right > left && (isVertical ? agents[right - 1].position.x : agents[right - 1].position.y) >= splitValue)
                {
                    --right;
                }

                if (left < right)
                {
                    var tmp = agents[left];
                    agents[left] = agents[right - 1];
                    agents[right - 1] = tmp;
                    ++left;
                    --right;
                }
			}
			
			var leftSize = left - begin;
			if (leftSize == 0) {
				++leftSize;
				++left;
				++right;
			}
			
			agentTree[node].left = node + 1;
            agentTree[node].right = node + 1 + (2 * leftSize - 1);

            buildAgentTreeRecursive(begin, left, agentTree[node].left);
            buildAgentTreeRecursive(left, end, agentTree[node].right);
		}
	};
	
	this.buildObstacleTree = function(simulator) {
		var obstacles = simulator.obstacles;
		obstacleTree = buildObstacleTreeRecursive(obstacles);
	};
	
	var buildObstacleTreeRecursive = function(obstacles, simulator) {
		if (obstacles.length == 0) {
			return null;
		} else {
			var node = new ObstacleTreeNode();
			var optimalSplit = 0;
            let minLeft = obstacles.length;
            let minRight = obstacles.length;
			
			for (var i=0; i<obstacles.length; ++i) {
				let leftSize = 0;
				let rightSize = 0;
				
				let obstacleI1 = obstacles[i];
				let obstacleI2 = obstacleI1.nextObstacle;
				
				for (var j=0; j<obstacles.length; j++) {
					if (i == j) {
						continue;
					}
					
					let obstacleJ1 = obstacles[j];
					let obstacleJ2 = obstacleJ1.nextObstacle;
					
					let j1LeftOfI = RVOMath.leftOf(obstacleI1.point, obstacleI2.point, obstacleJ1.point);
                    let j2LeftOfI = RVOMath.leftOf(obstacleI1.point, obstacleI2.point, obstacleJ2.point);
					
                    if (j1LeftOfI >= -RVOMath.RVO_EPSILON && j2LeftOfI >= -RVOMath.RVO_EPSILON)
                    {
                        ++leftSize;
                    }
                    else if (j1LeftOfI <= RVOMath.RVO_EPSILON && j2LeftOfI <= RVOMath.RVO_EPSILON)
                    {
                        ++rightSize;
                    }
                    else
                    {
                        ++leftSize;
                        ++rightSize;
                    }
                    
                    var fp1 = new FloatPair(Math.max(leftSize, rightSize), Math.min(leftSize, rightSize));
                    var fp2 = new FloatPair(Math.max(minLeft, minRight), Math.min(minLeft, minRight));
                    
                    if (fp1.get(fp2)) {
                    	break;
                    }
				}
				
				var fp1 = new FloatPair(Math.max(leftSize, rightSize), Math.min(leftSize, rightSize));
				var fp2 = new FloatPair(Math.max(minLeft, minRight), Math.min(minLeft, minRight));
				
				if (fp1.mt(fp2)) {
					minLeft = leftSize;
					minRight = rightSize;
					optimalSplit = i;
				}
			}
			
			{
                /* Build split node. */
				let leftObstacles = [];
                for (var n = 0; n < minLeft; ++n) leftObstacles.push(null);
                
                let rightObstacles = [];
                for (var n = 0; n < minRight; ++n) rightObstacles.push(null);

                let leftCounter = 0;
                let rightCounter = 0;
                let i = optimalSplit;

                let obstacleI1 = obstacles[i];
                let obstacleI2 = obstacleI1.nextObstacle;

                for (var j = 0; j < obstacles.length; ++j)
                {
                    if (i == j)
                    {
                        continue;
                    }

                    let obstacleJ1 = obstacles[j];
                    let obstacleJ2 = obstacleJ1.nextObstacle;

                    let j1LeftOfI = RVOMath.leftOf(obstacleI1.point, obstacleI2.point, obstacleJ1.point);
                    let j2LeftOfI = RVOMath.leftOf(obstacleI1.point, obstacleI2.point, obstacleJ2.point);

                    if (j1LeftOfI >= -RVOMath.RVO_EPSILON && j2LeftOfI >= -RVOMath.RVO_EPSILON)
                    {
                        leftObstacles[leftCounter++] = obstacles[j];
                    }
                    else if (j1LeftOfI <= RVOMath.RVO_EPSILON && j2LeftOfI <= RVOMath.RVO_EPSILON)
                    {
                        rightObstacles[rightCounter++] = obstacles[j];
                    }
                    else
                    {
                        /* Split obstacle j. */
                        t = RVOMath.det(obstacleI2.point.minus(obstacleI1.point), obstacleJ1.point.minus(obstacleI1.point)) / 
                        	RVOMath.det(obstacleI2.point.minus(obstacleI1.point), obstacleJ1.point.minus(obstacleJ2.point));

                        var splitpoint = obstacleJ1.point.plus( (obstacleJ2.point.minus(obstacleJ1.point)).scale(t) );

                        var newObstacle = new Obstacle();
                        newObstacle.point = splitpoint;
                        newObstacle.prevObstacle = obstacleJ1;
                        newObstacle.nextObstacle = obstacleJ2;
                        newObstacle.isConvex = true;
                        newObstacle.unitDir = obstacleJ1.unitDir;

                        newObstacle.id = simulator.obstacles.length;

                        simulator.obstacles.push(newObstacle);

                        obstacleJ1.nextObstacle = newObstacle;
                        obstacleJ2.prevObstacle = newObstacle;

                        if (j1LeftOfI > 0.0)
                        {
                            leftObstacles[leftCounter++] = obstacleJ1;
                            rightObstacles[rightCounter++] = newObstacle;
                        }
                        else
                        {
                            rightObstacles[rightCounter++] = obstacleJ1;
                            leftObstacles[leftCounter++] = newObstacle;
                        }
                    }
                }

                node.obstacle = obstacleI1;
                node.left = buildObstacleTreeRecursive(leftObstacles);
                node.right = buildObstacleTreeRecursive(rightObstacles);
                return node;
            }
		}
	};
	
	this.computeAgentNeighbors = function(agent, rangeSq) {
		queryAgentTreeRecursive(agent, rangeSq, 0);
	};
	
	this.computeObstacleNeighbors = function(agent, rangeSq) {
		queryObstacleTreeRecursive(agent, rangeSq, obstacleTree);
	};
	
	var queryAgentTreeRecursive = function(agent, rangeSq, node) {
		if (agentTree[node].end - agentTree[node].begin <= MAXLEAF_SIZE)
        {
            for (var i = agentTree[node].begin; i < agentTree[node].end; ++i)
            {
                agent.insertAgentNeighbor(agents[i], rangeSq);
            }
        }
        else
        {
            distSqLeft = RVOMath.sqr(Math.max(0, agentTree[agentTree[node].left].minX - agent.position.x)) + 
	            RVOMath.sqr(Math.max(0, agent.position.x - agentTree[agentTree[node].left].maxX)) + 
	            RVOMath.sqr(Math.max(0, agentTree[agentTree[node].left].minY - agent.position.y)) + 
	            RVOMath.sqr(Math.max(0, agent.position.y - agentTree[agentTree[node].left].maxY));

            distSqRight = RVOMath.sqr(Math.max(0, agentTree[agentTree[node].right].minX - agent.position.x)) +
	            RVOMath.sqr(Math.max(0, agent.position.x - agentTree[agentTree[node].right].maxX)) +
	            RVOMath.sqr(Math.max(0, agentTree[agentTree[node].right].minY - agent.position.y)) +
	            RVOMath.sqr(Math.max(0, agent.position.y - agentTree[agentTree[node].right].maxY));

            if (distSqLeft < distSqRight)
            {
                if (distSqLeft < rangeSq)
                {
                    queryAgentTreeRecursive(agent, rangeSq, agentTree[node].left);

                    if (distSqRight < rangeSq)
                    {
                        queryAgentTreeRecursive(agent, rangeSq, agentTree[node].right);
                    }
                }
            }
            else
            {
                if (distSqRight < rangeSq)
                {
                    queryAgentTreeRecursive(agent, rangeSq, agentTree[node].right);

                    if (distSqLeft < rangeSq)
                    {
                        queryAgentTreeRecursive(agent, rangeSq, agentTree[node].left);
                    }
                }
            }

        }
	};
	
	// pass ref range
	var queryObstacleTreeRecursive = function(/** Agent */ agent, rangeSq, /** ObstacleTreeNode */ node) {
        if (node == null)
        {
            return;
        }
        else
        {
            let obstacle1 = node.obstacle;
            let obstacle2 = obstacle1.nextObstacle;

            let agentLeftOfLine = RVOMath.leftOf(obstacle1.point, obstacle2.point, agent.position);

            queryObstacleTreeRecursive(agent, rangeSq, (agentLeftOfLine >= 0 ? node.left : node.right));

            let distSqLine = RVOMath.sqr(agentLeftOfLine) / RVOMath.absSq(obstacle2.point.minus(obstacle1.point));

            if (distSqLine < rangeSq)
            {
                if (agentLeftOfLine < 0)
                {
                    /*
                     * Try obstacle at this node only if is on right side of
                     * obstacle (and can see obstacle).
                     */
                    agent.insertObstacleNeighbor(node.obstacle, rangeSq);
                }

                /* Try other side of line. */
                queryObstacleTreeRecursive(agent, rangeSq, (agentLeftOfLine >= 0 ? node.right : node.left));
            }
        }
    };

    this.queryVisibility = function (/** Vector2 */ q1, /** Vector2 */ q2, radius)
    {
        return queryVisibilityRecursive(q1, q2, radius, obstacleTree);
    };

    var queryVisibilityRecursive = function(/** Vector2 */ q1, /** Vector2 */ q2, radius, /** ObstacleTreeNode */ node)
    {
        if (node == null)
        {
            return true;
        }
        else
        {
            var obstacle1 = node.obstacle;
            var obstacle2 = obstacle1.nextObstacle;

            var q1LeftOfI = RVOMath.leftOf(obstacle1.point, obstacle2.point, q1);
            var q2LeftOfI = RVOMath.leftOf(obstacle1.point, obstacle2.point, q2);
            var invLengthI = 1.0 / RVOMath.absSq(obstacle2.point.minus(obstacle1.point));

            if (q1LeftOfI >= 0 && q2LeftOfI >= 0)
            {
                return queryVisibilityRecursive(q1, q2, radius, node.left) && ((RVOMath.sqr(q1LeftOfI) * invLengthI >= RVOMath.sqr(radius) && RVOMath.sqr(q2LeftOfI) * invLengthI >= RVOMath.sqr(radius)) || queryVisibilityRecursive(q1, q2, radius, node.right));
            }
            else if (q1LeftOfI <= 0 && q2LeftOfI <= 0)
            {
                return queryVisibilityRecursive(q1, q2, radius, node.right) && ((RVOMath.sqr(q1LeftOfI) * invLengthI >= RVOMath.sqr(radius) && RVOMath.sqr(q2LeftOfI) * invLengthI >= RVOMath.sqr(radius)) || queryVisibilityRecursive(q1, q2, radius, node.left));
            }
            else if (q1LeftOfI >= 0 && q2LeftOfI <= 0)
            {
                /* One can see through obstacle from left to right. */
                return queryVisibilityRecursive(q1, q2, radius, node.left) && queryVisibilityRecursive(q1, q2, radius, node.right);
            }
            else
            {
                var point1LeftOfQ = RVOMath.leftOf(q1, q2, obstacle1.point);
                var point2LeftOfQ = RVOMath.leftOf(q1, q2, obstacle2.point);
                var invLengthQ = 1.0 / RVOMath.absSq(q2.minus(q1));

                return (point1LeftOfQ * point2LeftOfQ >= 0 && RVOMath.sqr(point1LeftOfQ) * invLengthQ > RVOMath.sqr(radius) && RVOMath.sqr(point2LeftOfQ) * invLengthQ > RVOMath.sqr(radius) && queryVisibilityRecursive(q1, q2, radius, node.left) && queryVisibilityRecursive(q1, q2, radius, node.right));
            }
        }
    };
}

/* c8 ignore next 1000 */

function Agent() {
    this.agentNeighbors = []; //  new List<KeyValuePair<float, Agent>>();
    this.maxNeighbors = 0;
    this.maxSpeed = 0.0;
    this.neighborDist = 0.0;
    this.newVelocity; // Vector 2
    this.obstaclNeighbors = []; // new List<KeyValuePair<float, Obstacle>>();
    this.orcaLines = []; // new List<Line>();
    this.position; // Vector2

    this.prefVelocity; // Vector2

    this.radius = 0.0;
    this.timeHorizon = 0.0;
    this.timeHorizonObst = 0.0;
    this.velocity; // Vector2
    this.id = 0;

    /** My addition */
    this.gameObject = null; //Which gameObject are we simulating?

    this.computeNeighbors = function (simulator) {
        this.obstaclNeighbors = [];
        var rangeSq = RVOMath.sqr(this.timeHorizonObst * this.maxSpeed + this.radius);
        simulator.kdTree.computeObstacleNeighbors(this, rangeSq);

        this.agentNeighbors = [];
        if (this.maxNeighbors > 0) {
            rangeSq = RVOMath.sqr(this.neighborDist);
            simulator.kdTree.computeAgentNeighbors(this, rangeSq);
        }
    };

    /* Search for the best new velocity. */
    this.computeNewVelocity = function (simulator) {
        let orcaLines = [];

        let invTimeHorizonObst = 1.0 / this.timeHorizonObst;

        /* Create obstacle ORCA lines. */
        for (var i = 0; i < this.obstaclNeighbors.length; ++i) {
            let obstacle1 = this.obstaclNeighbors[i].value;
            let obstacle2 = obstacle1.nextObstacle;

            let relativePosition1 = obstacle1.point.minus(this.position);
            let relativePosition2 = obstacle2.point.minus(this.position);

            /* 
             * Check if velocity obstacle of obstacle is already taken care of by
             * previously constructed obstacle ORCA lines.
             */
            let alreadyCovered = false;

            for (var j = 0; j < orcaLines.length; ++j) {
                if (RVOMath.det(relativePosition1.scale(invTimeHorizonObst).minus(orcaLines[j].point), orcaLines[j].direction) - invTimeHorizonObst * this.radius >= -RVOMath.RVOEPSILON && RVOMath.det(relativePosition2.scale(invTimeHorizonObst).minus(orcaLines[j].point), orcaLines[j].direction) - invTimeHorizonObst * this.radius >= -RVOMath.RVOEPSILON) {
                    alreadyCovered = true;
                    break;
                }
            }

            if (alreadyCovered) {
                continue;
            }

            /* Not yet covered. Check for collisions. */

            let distSq1 = RVOMath.absSq(relativePosition1);
            let distSq2 = RVOMath.absSq(relativePosition2);

            let radiusSq = RVOMath.sqr(this.radius);

            let obstacleVector = obstacle2.point.minus(obstacle1.point);
            let s = relativePosition1.scale(-1).multiply(obstacleVector) / RVOMath.absSq(obstacleVector); //  (-relativePosition1 * obstacleVector) / RVOMath.absSq(obstacleVector);
            let distSqLine = RVOMath.absSq(relativePosition1.scale(-1).minus(obstacleVector.scale(s))); // RVOMath.absSq(-relativePosition1 - s * obstacleVector);

            var line = new Line$1();

            if (s < 0 && distSq1 <= radiusSq) {
                /* Collision with left vertex. Ignore if non-convex. */
                if (obstacle1.isConvex) {
                    line.point = new Vector2(0, 0);
                    line.direction = RVOMath.normalize(new Vector2(-relativePosition1.y, relativePosition1.x));
                    orcaLines.push(line);
                }
                continue;
            }
            else if (s > 1 && distSq2 <= radiusSq) {
                /* Collision with right vertex. Ignore if non-convex 
                 * or if it will be taken care of by neighoring obstace */
                if (obstacle2.isConvex && RVOMath.det(relativePosition2, obstacle2.unitDir) >= 0) {
                    line.point = new Vector2(0, 0);
                    line.direction = RVOMath.normalize(new Vector2(-relativePosition2.y, relativePosition2.x));
                    orcaLines.push(line);
                }
                continue;
            }
            else if (s >= 0 && s < 1 && distSqLine <= radiusSq) {
                /* Collision with obstacle segment. */
                line.point = new Vector2(0, 0);
                line.direction = obstacle1.unitDir.scale(-1);
                orcaLines.push(line);
                continue;
            }

            /* 
             * No collision.  
             * Compute legs. When obliquely viewed, both legs can come from a single
             * vertex. Legs extend cut-off line when nonconvex vertex.
             */

            var leftLegDirection, rightLegDirection, leg1, leg2;

            if (s < 0 && distSqLine <= radiusSq) {
                /*
                 * Obstacle viewed obliquely so that left vertex
                 * defines velocity obstacle.
                 */
                if (!obstacle1.isConvex) {
                    /* Ignore obstacle. */
                    continue;
                }

                obstacle2 = obstacle1;

                leg1 = Math.sqrt(distSq1 - radiusSq);
                leftLegDirection = (new Vector2(relativePosition1.x * leg1 - relativePosition1.y * this.radius, relativePosition1.x * this.radius + relativePosition1.y * leg1)).scale(1 / distSq1);
                rightLegDirection = (new Vector2(relativePosition1.x * leg1 + relativePosition1.y * this.radius, -relativePosition1.x * this.radius + relativePosition1.y * leg1)).scale(1 / distSq1);
            }
            else if (s > 1 && distSqLine <= radiusSq) {
                /*
                 * Obstacle viewed obliquely so that
                 * right vertex defines velocity obstacle.
                 */
                if (!obstacle2.isConvex) {
                    /* Ignore obstacle. */
                    continue;
                }

                obstacle1 = obstacle2;

                leg2 = Math.sqrt(distSq2 - radiusSq);
                leftLegDirection = (new Vector2(relativePosition2.x * leg2 - relativePosition2.y * this.radius, relativePosition2.x * this.radius + relativePosition2.y * leg2)).scale(1 / distSq2);
                rightLegDirection = (new Vector2(relativePosition2.x * leg2 + relativePosition2.y * this.radius, -relativePosition2.x * this.radius + relativePosition2.y * leg2)).scale(1 / distSq2);
            }
            else {
                /* Usual situation. */
                if (obstacle1.isConvex) {
                    leg1 = Math.sqrt(distSq1 - radiusSq);
                    leftLegDirection = (new Vector2(relativePosition1.x * leg1 - relativePosition1.y * this.radius, relativePosition1.x * this.radius + relativePosition1.y * leg1)).scale(1 / distSq1);
                }
                else {
                    /* Left vertex non-convex; left leg extends cut-off line. */
                    leftLegDirection = obstacle1.unitDir.scale(-1);
                }

                if (obstacle2.isConvex) {
                    leg2 = Math.sqrt(distSq2 - radiusSq);
                    rightLegDirection = (new Vector2(relativePosition2.x * leg2 + relativePosition2.y * this.radius, -relativePosition2.x * this.radius + relativePosition2.y * leg2)).scale(1 / distSq2);
                }
                else {
                    /* Right vertex non-convex; right leg extends cut-off line. */
                    rightLegDirection = obstacle1.unitDir;
                }
            }

            /* 
             * Legs can never point into neighboring edge when convex vertex,
             * take cutoff-line of neighboring edge instead. If velocity projected on
             * "foreign" leg, no constraint is added. 
             */

            let leftNeighbor = obstacle1.prevObstacle;

            let isLeftLegForeign = false;
            let isRightLegForeign = false;

            if (obstacle1.isConvex && RVOMath.det(leftLegDirection, leftNeighbor.unitDir.scale(-1)) >= 0.0) {
                /* Left leg points into obstacle. */
                leftLegDirection = leftNeighbor.unitDir.scale(-1);
                isLeftLegForeign = true;
            }

            if (obstacle2.isConvex && RVOMath.det(rightLegDirection, obstacle2.unitDir) <= 0.0) {
                /* Right leg points into obstacle. */
                rightLegDirection = obstacle2.unitDir;
                isRightLegForeign = true;
            }

            /* Compute cut-off centers. */
            let leftCutoff = obstacle1.point.minus(this.position).scale(invTimeHorizonObst);
            let rightCutoff = obstacle2.point.minus(this.position).scale(invTimeHorizonObst);
            let cutoffVec = rightCutoff.minus(leftCutoff);

            /* Project current velocity on velocity obstacle. */

            /* Check if current velocity is projected on cutoff circles. */
            let t = obstacle1 == obstacle2 ? 0.5 : this.velocity.minus(leftCutoff).multiply(cutoffVec) / RVOMath.absSq(cutoffVec);
            let tLeft = this.velocity.minus(leftCutoff).multiply(leftLegDirection);
            let tRight = this.velocity.minus(rightCutoff).multiply(rightLegDirection);

            if ((t < 0.0 && tLeft < 0.0) || (obstacle1 == obstacle2 && tLeft < 0.0 && tRight < 0.0)) {
                /* Project on left cut-off circle. */
                var unitW = RVOMath.normalize(this.velocity.minus(leftCutoff));

                line.direction = new Vector2(unitW.y, -unitW.x);
                line.point = leftCutoff.plus(unitW.scale(this.radius * invTimeHorizonObst));
                orcaLines.push(line);
                continue;
            }
            else if (t > 1.0 && tRight < 0.0) {
                /* Project on right cut-off circle. */
                var unitW = RVOMath.normalize(this.velocity.minus(rightCutoff));

                line.direction = new Vector2(unitW.y, -unitW.x);
                line.point = rightCutoff.plus(unitW.scale(this.radius * invTimeHorizonObst));
                orcaLines.push(line);
                continue;
            }

            /* 
             * Project on left leg, right leg, or cut-off line, whichever is closest
             * to velocity.
             */
            let distSqCutoff = ((t < 0.0 || t > 1.0 || obstacle1 == obstacle2) ? Infinity : RVOMath.absSq(this.velocity.minus(cutoffVec.scale(t).plus(leftCutoff))));
            let distSqLeft = ((tLeft < 0.0) ? Infinity : RVOMath.absSq(this.velocity.minus(leftLegDirection.scale(tLeft).plus(leftCutoff))));
            let distSqRight = ((tRight < 0.0) ? Infinity : RVOMath.absSq(this.velocity.minus(rightLegDirection.scale(tRight).plus(rightCutoff))));

            if (distSqCutoff <= distSqLeft && distSqCutoff <= distSqRight) {
                /* Project on cut-off line. */
                line.direction = obstacle1.unitDir.scale(-1);
                var aux = new Vector2(-line.direction.y, line.direction.x);
                line.point = aux.scale(this.radius * invTimeHorizonObst).plus(leftCutoff);
                orcaLines.push(line);
                continue;
            }
            else if (distSqLeft <= distSqRight) {
                /* Project on left leg. */
                if (isLeftLegForeign) {
                    continue;
                }

                line.direction = leftLegDirection;
                var aux = new Vector2(-line.direction.y, line.direction.x);
                line.point = aux.scale(this.radius * invTimeHorizonObst).plus(leftCutoff);
                orcaLines.push(line);
                continue;
            }
            else {
                /* Project on right leg. */
                if (isRightLegForeign) {
                    continue;
                }

                line.direction = rightLegDirection.scale(-1);
                var aux = new Vector2(-line.direction.y, line.direction.x);
                line.point = aux.scale(this.radius * invTimeHorizonObst).plus(leftCutoff);
                orcaLines.push(line);
                continue;
            }
        }

        var numObstLines = orcaLines.length;

        var invTimeHorizon = 1.0 / this.timeHorizon;

        /* Create agent ORCA lines. */
        for (var i = 0; i < this.agentNeighbors.length; ++i) {
            var other = this.agentNeighbors[i].value;

            let relativePosition = other.position.minus(this.position);
            let relativeVelocity = this.velocity.minus(other.velocity);
            let distSq = RVOMath.absSq(relativePosition);
            let combinedRadius = this.radius + other.radius;
            let combinedRadiusSq = RVOMath.sqr(combinedRadius);

            var line = new Line$1(); // Line
            var u; // Vector2

            if (distSq > combinedRadiusSq) {
                /* No collision. */
                let w = relativeVelocity.minus(relativePosition.scale(invTimeHorizon));                /* Vector from cutoff center to relative velocity. */
                let wLengthSq = RVOMath.absSq(w);

                let dotProduct1 = w.multiply(relativePosition);

                if (dotProduct1 < 0.0 && RVOMath.sqr(dotProduct1) > combinedRadiusSq * wLengthSq) {
                    /* Project on cut-off circle. */
                    var wLength = Math.sqrt(wLengthSq);
                    var unitW = w.scale(1 / wLength);

                    line.direction = new Vector2(unitW.y, -unitW.x);
                    u = unitW.scale(combinedRadius * invTimeHorizon - wLength);
                }
                else {
                    /* Project on legs. */
                    let leg = Math.sqrt(distSq - combinedRadiusSq);

                    if (RVOMath.det(relativePosition, w) > 0.0) {
                        /* Project on left leg. */
                        var aux = new Vector2(relativePosition.x * leg - relativePosition.y * combinedRadius, relativePosition.x * combinedRadius + relativePosition.y * leg);
                        line.direction = aux.scale(1 / distSq);
                    }
                    else {
                        /* Project on right leg. */
                        var aux = new Vector2(relativePosition.x * leg + relativePosition.y * combinedRadius, -relativePosition.x * combinedRadius + relativePosition.y * leg);
                        line.direction = aux.scale(-1 / distSq);
                    }

                    let dotProduct2 = relativeVelocity.multiply(line.direction);

                    u = line.direction.scale(dotProduct2).minus(relativeVelocity);
                }
            }
            else {
                /* Collision. Project on cut-off circle of time timeStep. */
                let invTimeStep = 1.0 / simulator.timeStep;

                /* Vector from cutoff center to relative velocity. */
                let w = relativeVelocity.minus(relativePosition.scale(invTimeStep));

                let wLength = Math.abs(w);
                let unitW = w.scale(1 / wLength);

                line.direction = new Vector2(unitW.y, -unitW.x);
                u = unitW.scale(combinedRadius * invTimeStep - wLength);
            }

            line.point = u.scale(0.5).plus(this.velocity);
            orcaLines.push(line);
        }

        let lineFail = this.linearProgram2(orcaLines, this.maxSpeed, this.prefVelocity, false);

        if (lineFail < orcaLines.length) {
            this.linearProgram3(orcaLines, numObstLines, lineFail, this.maxSpeed);
        }
    };

    this.insertAgentNeighbor = function (agent, rangeSq) {
        if (this != agent) {
            var distSq = RVOMath.absSq(this.position.minus(agent.position));

            if (distSq < rangeSq) {
                if (this.agentNeighbors.length < this.maxNeighbors) {
                    this.agentNeighbors.push(new KeyValuePair(distSq, agent));
                }
                var i = this.agentNeighbors.length - 1;
                while (i != 0 && distSq < this.agentNeighbors[i - 1].key) {
                    this.agentNeighbors[i] = this.agentNeighbors[i - 1];
                    --i;
                }
                this.agentNeighbors[i] = new KeyValuePair(distSq, agent);

                if (this.agentNeighbors.length == this.maxNeighbors) {
                    rangeSq = this.agentNeighbors[this.agentNeighbors.length - 1].key;
                }
            }
        }
    };

    this.insertObstacleNeighbor = function (/** Obstacle */ obstacle, rangeSq) {
        let nextObstacle = obstacle.nextObstacle;

        let distSq = RVOMath.distSqPointLineSegment(obstacle.point, nextObstacle.point, this.position);

        if (distSq < rangeSq) {
            this.obstaclNeighbors.push(new KeyValuePair(distSq, obstacle));

            let i = this.obstaclNeighbors.length - 1;
            while (i != 0 && distSq < this.obstaclNeighbors[i - 1].key) {
                this.obstaclNeighbors[i] = this.obstaclNeighbors[i - 1];
                --i;
            }
            this.obstaclNeighbors[i] = new KeyValuePair(distSq, obstacle);
        }
    };

    this.update = function (simulator) {
        var rnd = new Vector2(0, 0); //Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05);
        this.velocity = this.newVelocity.plus(rnd);
        this.position = this.position.plus(this.newVelocity.scale(simulator.timeStep));
    };

    this.linearProgram1 = function (/** Array */ lines, /** int */ lineNo, /** float */ radius, /** Vector2 */ optVelocity, /** bool */ directionOpt) {
        var dotProduct = lines[lineNo].point.multiply(lines[lineNo].direction);
        var discriminant = RVOMath.sqr(dotProduct) + RVOMath.sqr(radius) - RVOMath.absSq(lines[lineNo].point);

        if (discriminant < 0.0) {
            /* Max speed circle fully invalidates line lineNo. */
            return false;
        }

        var sqrtDiscriminant = Math.sqrt(discriminant);
        var tLeft = -dotProduct - sqrtDiscriminant;
        var tRight = -dotProduct + sqrtDiscriminant;

        for (var i = 0; i < lineNo; ++i) {
            var denominator = RVOMath.det(lines[lineNo].direction, lines[i].direction);
            var numerator = RVOMath.det(lines[i].direction, lines[lineNo].point.minus(lines[i].point));

            if (Math.abs(denominator) <= RVOMath.RVOEPSILON) {
                /* Lines lineNo and i are (almost) parallel. */
                if (numerator < 0.0) {
                    return false;
                }
                else {
                    continue;
                }
            }

            var t = numerator / denominator;

            if (denominator >= 0.0) {
                /* Line i bounds line lineNo on the right. */
                tRight = Math.min(tRight, t);
            }
            else {
                /* Line i bounds line lineNo on the left. */
                tLeft = Math.max(tLeft, t);
            }

            if (tLeft > tRight) {
                return false;
            }
        }

        if (directionOpt) {
            if (optVelocity.multiply(lines[lineNo].direction) > 0.0) {
                // Take right extreme
                this.newVelocity = lines[lineNo].direction.scale(tRight).plus(lines[lineNo].point);
            }
            else {
                // Take left extreme.
                this.newVelocity = lines[lineNo].direction.scale(tLeft).plus(lines[lineNo].point);
            }
        }
        else {
            // Optimize closest point
            t = lines[lineNo].direction.multiply(optVelocity.minus(lines[lineNo].point));

            if (t < tLeft) {
                this.newVelocity = lines[lineNo].direction.scale(tLeft).plus(lines[lineNo].point);
            }
            else if (t > tRight) {
                this.newVelocity = lines[lineNo].direction.scale(tRight).plus(lines[lineNo].point);
            }
            else {
                this.newVelocity = lines[lineNo].direction.scale(t).plus(lines[lineNo].point);
            }
        }

        // TODO ugly hack by palmerabollo
        if (isNaN(this.newVelocity.x) || isNaN(this.newVelocity.y)) {
            return false;
        }

        return true;
    };

    this.linearProgram2 = function (/** Array */ lines, /** float */ radius, /** Vector2 */ optVelocity, /** bool */ directionOpt) {
        if (directionOpt) {
            /* 
             * Optimize direction. Note that the optimization velocity is of unit
             * length in this case.
             */
            this.newVelocity = optVelocity.scale(radius);
        }
        else if (RVOMath.absSq(optVelocity) > RVOMath.sqr(radius)) {
            /* Optimize closest point and outside circle. */
            this.newVelocity = RVOMath.normalize(optVelocity).scale(radius);
        }
        else {
            /* Optimize closest point and inside circle. */
            this.newVelocity = optVelocity;
        }

        for (var i = 0; i < lines.length; ++i) {
            if (RVOMath.det(lines[i].direction, lines[i].point.minus(this.newVelocity)) > 0.0) {
                /* Result does not satisfy constraint i. Compute new optimal result. */
                var tempResult = this.newVelocity;
                if (!this.linearProgram1(lines, i, this.radius, optVelocity, directionOpt)) {
                    this.newVelocity = tempResult;
                    return i;
                }
            }
        }

        return lines.length;
    };

    this.linearProgram3 = function (/** Array */ lines, /** int */ numObstLines, /** int */ beginLine, /** float */ radius) {
        var distance = 0.0;

        for (var i = beginLine; i < lines.length; ++i) {
            if (RVOMath.det(lines[i].direction, lines[i].point.minus(this.newVelocity)) > distance) {
                /* Result does not satisfy constraint of line i. */
                //std::vector<Line> projLines(lines.begin(), lines.begin() + numObstLines);
                let projLines = []; // new List<Line>();
                for (var ii = 0; ii < numObstLines; ++ii) {
                    projLines.push(lines[ii]);
                }

                for (var j = numObstLines; j < i; ++j) {
                    var line = new Line$1();

                    let determinant = RVOMath.det(lines[i].direction, lines[j].direction);

                    if (Math.abs(determinant) <= RVOMath.RVOEPSILON) {
                        /* Line i and line j are parallel. */
                        if (lines[i].direction.multiply(lines[j].direction) > 0.0) {
                            /* Line i and line j point in the same direction. */
                            continue;
                        }
                        else {
                            /* Line i and line j point in opposite direction. */
                            line.point = lines[i].point.plus(lines[j].point).scale(0.5);
                        }
                    }
                    else {
                        var aux = lines[i].direction.scale(RVOMath.det(lines[j].direction, lines[i].point.minus(lines[j].point)) / determinant);
                        line.point = lines[i].point.plus(aux);
                    }

                    line.direction = RVOMath.normalize(lines[j].direction.minus(lines[i].direction));
                    projLines.push(line);
                }

                var tempResult = this.newVelocity;
                if (this.linearProgram2(projLines, radius, new Vector2(-lines[i].direction.y, lines[i].direction.x), true) < projLines.length) {
                    /* This should in principle not happen.  The result is by definition
                     * already in the feasible region of this linear program. If it fails,
                     * it is due to small floating point error, and the current result is
                     * kept.
                     */
                    this.newVelocity = tempResult;
                }

                distance = RVOMath.det(lines[i].direction, lines[i].point.minus(this.newVelocity));
            }
        }
    };
}

/* c8 ignore next 1000 */

function Simulator() {
  this.agents = []; // Agent[]
  this.obstacles = []; // Obstacle[]
  this.goals = []; // Vector2
  this.kdTree = new KdTree();

  this.timeStep = 0.25;

  this.defaultAgent; // Agent
  this.time = 0.0;

  this.getGlobalTime = function () {
    return this.time;
  };

  this.getNumAgents = function () {
    return this.agents.length;
  };

  this.getTimeStep = function () {
    return this.timeStep;
  };

  this.setAgentPrefVelocity = function (i, velocity) {
    this.agents[i].prefVelocity = velocity;
  };

  this.setTimeStep = function (timeStep) {
    this.timeStep = timeStep;
  };

  this.getAgentPosition = function (i) {
    return this.agents[i].position;
  };

  /**
   * My additon to allow coupling to game objects
   */
  this.getAgentGameObject = function(i){
    return this.agents[i].gameObject;
  };

  /** My addition */
  this.removeRVOAgent = function(i){
    this.agents.splice(i,1);
    this.goals.splice(i,1);
    console.log(this.agents.length);
  };

  this.getAgentPrefVelocity = function (i) {
    return this.agents[i].prefVelocity;
  };

  this.getAgentVelocity = function (i) {
    return this.agents[i].velocity;
  };

  this.getAgentRadius = function (i) {
    return this.agents[i].radius;
  };

  this.getAgentOrcaLines = function (i) {
    return this.agents[i].orcaLines;
  };

  this.addAgent = function (position, gameObject) {
    if (!this.defaultAgent) {
      throw new Error("no default agent");
    }

    var agent = new Agent();

    agent.position = position;
    agent.maxNeighbors = this.defaultAgent.maxNeighbors;
    agent.maxSpeed = this.defaultAgent.maxSpeed;
    agent.neighborDist = this.defaultAgent.neighborDist;
    agent.radius = this.defaultAgent.radius;
    agent.timeHorizon = this.defaultAgent.timeHorizon;
    agent.timeHorizonObst = this.defaultAgent.timeHorizonObst;
    agent.velocity = this.defaultAgent.velocity;
    agent.gameObject = gameObject;

    agent.id = this.agents.length;
    this.agents.push(agent);

    return this.agents.length - 1;
  };

  //  /** float */ neighborDist, /** int */ maxNeighbors, /** float */ timeHorizon, /** float */ timeHorizonObst, /** float */ radius, /** float*/ maxSpeed, /** Vector2 */ velocity)
  this.setAgentDefaults = function (neighborDist, maxNeighbors, timeHorizon, timeHorizonObst, radius, maxSpeed, velocity) {
    if (!this.defaultAgent) {
      this.defaultAgent = new Agent();
    }

    this.defaultAgent.maxNeighbors = maxNeighbors;
    this.defaultAgent.maxSpeed = maxSpeed;
    this.defaultAgent.neighborDist = neighborDist;
    this.defaultAgent.radius = radius;
    this.defaultAgent.timeHorizon = timeHorizon;
    this.defaultAgent.timeHorizonObst = timeHorizonObst;
    this.defaultAgent.velocity = velocity;
  };

  this.run = function () {
    this.kdTree.buildAgentTree(this);

    for (var i = 0; i < this.getNumAgents(); i++) {
      this.agents[i].computeNeighbors(this);
      this.agents[i].computeNewVelocity(this);
      this.agents[i].update(this);
    }

    this.time += this.timeStep;
  };

  this.reachedGoal = function () {
    for (var i = 0; i < this.getNumAgents(); ++i) {
      if (RVOMath.absSq(this.goals[i].minus(this.getAgentPosition(i))) > RVOMath.RVO_EPSILON) {
        return false;
      }    }
    return true;
  };

  this.addGoals = function (goals) {
    this.goals = goals;
  };

  /**My addition */
  this.addGoal = function(goal){
    this.goals.push(goal);
  };

  /** My addition */
  this.setGoal = function(goal, i){
    this.goals[i] = goal;
  };

  this.getGoal = function (goalNo) {
    return this.goals[goalNo];
  };

  this.addObstacle = function ( /** IList<Vector2> */ vertices) {
    if (vertices.length < 2) {
      return -1;
    }

    var obstacleNo = this.obstacles.length;

    for (var i = 0; i < vertices.length; ++i) {
      let obstacle = new Obstacle();
      obstacle.point = vertices[i];
      if (i != 0) {
        obstacle.prevObstacle = this.obstacles[this.obstacles.length - 1];
        obstacle.prevObstacle.nextObstacle = obstacle;
      }
      if (i == vertices.length - 1) {
        obstacle.nextObstacle = this.obstacles[obstacleNo];
        obstacle.nextObstacle.prevObstacle = obstacle;
      }
      obstacle.unitDir = RVOMath.normalize(vertices[(i == vertices.length - 1 ? 0 : i + 1)].minus(vertices[i]));

      if (vertices.length == 2) {
        obstacle.isConvex = true;
      } else {
        obstacle.isConvex = (RVOMath.leftOf(vertices[(i == 0 ? vertices.length - 1 : i - 1)], vertices[i], vertices[(i == vertices.length - 1 ? 0 : i + 1)]) >= 0);
      }

      obstacle.id = this.obstacles.length;

      this.obstacles.push(obstacle);
    }

    return obstacleNo;
  };

  this.processObstacles = function () {
    this.kdTree.buildObstacleTree(this);
  };

  this.getObstacles = function () {
    return this.obstacles;
  };
}

class CircleCollider extends Collider {
   
    constructor() {
        super();
        this.radius=50;
    }

}

/**
Axis - Aligned Bounding Box 
*/

class AABBCollider extends Collider {
    constructor() {
        super();
        this.width=100;
        this.height=100;
    }

}

/**
Axis - Aligned Bounding Box 
*/

class TriangleCollider extends Collider {



    constructor() {
        super();
        this.pointAX = 0;
        this.pointAY = 0;
        this.pointBX = 100;
        this.pointBY = 100;
        this.pointCX = 0;
        this.pointCY = 100;
    }
    update() {
        

    }

}

const CollisionHelper = {

    inCollision(one, two) {
        if (one.collider instanceof CircleCollider && two.collider instanceof PointCollider) {
            return this.inCollisionCirclePoint(one, two);
        } else if (one.collider instanceof PointCollider && two.collider instanceof CircleCollider) {
            /** Flip */
            return this.inCollision(two, one);
        } else if (one.collider instanceof AABBCollider && two.collider instanceof PointCollider) {
            return this.inCollisionAABBPoint(one, two);
        } else if (one.collider instanceof PointCollider && two.collider instanceof AABBCollider) {
            /** Flip */
            return this.inCollision(two, one);
        } else if (one.collider instanceof AABBCollider && two.collider instanceof AABBCollider) {
            return this.inCollisionAABBAABB(one, two);
        } else if (one.collider instanceof CircleCollider && two.collider instanceof CircleCollider) {
            return this.inCollisionCircleCircle(one, two);
        } else if (one.collider instanceof AABBCollider && two.collider instanceof CircleCollider) {
            return this.inCollisionAABBCircle(one, two);
        }
        else if (one.collider instanceof CircleCollider && two.collider instanceof AABBCollider) {
            /** Flip */
            return this.inCollision(two, one);
        }
        else if (one.collider instanceof TriangleCollider && two.collider instanceof PointCollider) {
            return this.inCollisionTrianglePoint(one, two);
        }
        else if (one.collider instanceof PointCollider && two.collider instanceof TriangleCollider) {
            /**Flip */
            return this.inCollision(two, one);
        }

    },
    inCollisionAABBAABB(one, two) {
        //From https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        let ws1 = one.gameObject.worldScale;
        let ws2 = two.gameObject.worldScale;
        if (one.gameObject.worldLocation.x < two.gameObject.worldLocation.x + (+two.collider.width)*ws2.x &&
            one.gameObject.worldLocation.x + (+one.collider.width)*ws1.x > two.gameObject.worldLocation.x &&
            one.gameObject.worldLocation.y < two.gameObject.worldLocation.y + (+two.collider.height)*ws2.y &&
            one.gameObject.worldLocation.y + (+one.collider.height)*ws1.y > two.gameObject.worldLocation.y)
            return true;
        return false;
    },
    inCollisionCirclePoint(circle, point) {
        let distance = circle.gameObject.worldLocation.distance(point.gameObject.location);

        if (distance < circle.collider.radius * circle.gameObject.scaleX)
            return true;
        return false;
    },
    inCollisionAABBPoint(AABB, point) {
        let diff = AABB.gameObject.worldLocation.diff(point.gameObject.worldLocation);
        return Math.abs(diff.x) < AABB.collider.width / 2 && Math.abs(diff.y) < AABB.collider.height / 2;

    },
    inCollisionCircleCircle(circle1, circle2) {
        let distance = circle1.gameObject.location.distance(circle2.gameObject.location);

        if (distance < +circle1.collider.radius + +circle2.collider.radius)
            return true;
        return false;
    },
    inCollisionAABBCircle(AABB, Circle) {
        let cx = Circle.gameObject.x;
        let cy = Circle.gameObject.y;
        let rx = AABB.gameObject.x - AABB.collider.width / 2;
        let ry = AABB.gameObject.y - AABB.collider.height / 2;
        let rw = +AABB.collider.width;
        let rh = +AABB.collider.height;

        let tx = cx;
        let ty = cy;

        if (cx < rx) tx = rx;
        else if (cx > rx + rw) tx = rx + rw;
        if (cy < ry) ty = ry;
        else if (cy > ry + rh) ty = ry + rh;

        let diffX = (tx - cx);
        let diffY = (ty - cy);
        let distance = Math.sqrt(diffX * diffX + diffY * diffY);
        if (distance < +Circle.collider.radius)
            return true;
        return false;
    },
    inCollisionTrianglePoint(triangle, point) {
        let pointA = new Point(+triangle.collider.pointAX + triangle.gameObject.x, +triangle.collider.pointAY + triangle.gameObject.y);
        let pointB = new Point(+triangle.collider.pointBX + triangle.gameObject.x, +triangle.collider.pointBY + triangle.gameObject.y);
        let pointC = new Point(+triangle.collider.pointCX + triangle.gameObject.x, +triangle.collider.pointCY + triangle.gameObject.y);

        let lineOne = new Line(pointA, pointB);
        let lineTwo = new Line(pointB, pointC);
        let lineThree = new Line(pointC, pointA);

        let distanceOne = lineOne.distance(point.gameObject.location);
        let distanceTwo = lineTwo.distance(point.gameObject.location);
        let distanceThree = lineThree.distance(point.gameObject.location);

        return (distanceOne > 0 && distanceTwo > 0 && distanceThree > 0)
    }




};

var hasOwnProperty = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
var hasSticky = typeof new RegExp().sticky === 'boolean';

/***************************************************************************/

function isRegExp(o) { return o && toString.call(o) === '[object RegExp]' }
function isObject(o) { return o && typeof o === 'object' && !isRegExp(o) && !Array.isArray(o) }

function reEscape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
function reGroups(s) {
  var re = new RegExp('|' + s);
  return re.exec('').length - 1
}
function reCapture(s) {
  return '(' + s + ')'
}
function reUnion(regexps) {
  if (!regexps.length) return '(?!)'
  var source = regexps.map(function (s) {
    return "(?:" + s + ")"
  }).join('|');
  return "(?:" + source + ")"
}

function regexpOrLiteral(obj) {
  if (typeof obj === 'string') {
    return '(?:' + reEscape(obj) + ')'

  } else if (isRegExp(obj)) {
    // TODO: consider /u support
    if (obj.ignoreCase) throw new Error('RegExp /i flag not allowed')
    if (obj.global) throw new Error('RegExp /g flag is implied')
    if (obj.sticky) throw new Error('RegExp /y flag is implied')
    if (obj.multiline) throw new Error('RegExp /m flag is implied')
    return obj.source

  } else {
    throw new Error('Not a pattern: ' + obj)
  }
}

function objectToRules(object) {
  var keys = Object.getOwnPropertyNames(object);
  var result = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var thing = object[key];
    var rules = [].concat(thing);
    if (key === 'include') {
      for (var j = 0; j < rules.length; j++) {
        result.push({ include: rules[j] });
      }
      continue
    }
    var match = [];
    rules.forEach(function (rule) {
      if (isObject(rule)) {
        if (match.length) result.push(ruleOptions(key, match));
        result.push(ruleOptions(key, rule));
        match = [];
      } else {
        match.push(rule);
      }
    });
    if (match.length) result.push(ruleOptions(key, match));
  }
  return result
}

function arrayToRules(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    if (obj.include) {
      var include = [].concat(obj.include);
      for (var j = 0; j < include.length; j++) {
        result.push({ include: include[j] });
      }
      continue
    }
    if (!obj.type) {
      throw new Error('Rule has no type: ' + JSON.stringify(obj))
    }
    result.push(ruleOptions(obj.type, obj));
  }
  return result
}

function ruleOptions(type, obj) {
  if (!isObject(obj)) {
    obj = { match: obj };
  }
  if (obj.include) {
    throw new Error('Matching rules cannot also include states')
  }

  // nb. error and fallback imply lineBreaks
  var options = {
    defaultType: type,
    lineBreaks: !!obj.error || !!obj.fallback,
    pop: false,
    next: null,
    push: null,
    error: false,
    fallback: false,
    value: null,
    type: null,
    shouldThrow: false,
  };

  // Avoid Object.assign(), so we support IE9+
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      options[key] = obj[key];
    }
  }

  // type transform cannot be a string
  if (typeof options.type === 'string' && type !== options.type) {
    throw new Error("Type transform cannot be a string (type '" + options.type + "' for token '" + type + "')")
  }

  // convert to array
  var match = options.match;
  options.match = Array.isArray(match) ? match : match ? [match] : [];
  options.match.sort(function (a, b) {
    return isRegExp(a) && isRegExp(b) ? 0
      : isRegExp(b) ? -1 : isRegExp(a) ? +1 : b.length - a.length
  });
  return options
}

function toRules(spec) {
  return Array.isArray(spec) ? arrayToRules(spec) : objectToRules(spec)
}

var defaultErrorRule = ruleOptions('error', { lineBreaks: true, shouldThrow: true });
function compileRules(rules, hasStates) {
  var errorRule = null;
  var fast = Object.create(null);
  var fastAllowed = true;
  var unicodeFlag = null;
  var groups = [];
  var parts = [];

  // If there is a fallback rule, then disable fast matching
  for (var i = 0; i < rules.length; i++) {
    if (rules[i].fallback) {
      fastAllowed = false;
    }
  }

  for (var i = 0; i < rules.length; i++) {
    var options = rules[i];

    if (options.include) {
      // all valid inclusions are removed by states() preprocessor
      throw new Error('Inheritance is not allowed in stateless lexers')
    }

    if (options.error || options.fallback) {
      // errorRule can only be set once
      if (errorRule) {
        if (!options.fallback === !errorRule.fallback) {
          throw new Error("Multiple " + (options.fallback ? "fallback" : "error") + " rules not allowed (for token '" + options.defaultType + "')")
        } else {
          throw new Error("fallback and error are mutually exclusive (for token '" + options.defaultType + "')")
        }
      }
      errorRule = options;
    }

    var match = options.match.slice();
    if (fastAllowed) {
      while (match.length && typeof match[0] === 'string' && match[0].length === 1) {
        var word = match.shift();
        fast[word.charCodeAt(0)] = options;
      }
    }

    // Warn about inappropriate state-switching options
    if (options.pop || options.push || options.next) {
      if (!hasStates) {
        throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.defaultType + "')")
      }
      if (options.fallback) {
        throw new Error("State-switching options are not allowed on fallback tokens (for token '" + options.defaultType + "')")
      }
    }

    // Only rules with a .match are included in the RegExp
    if (match.length === 0) {
      continue
    }
    fastAllowed = false;

    groups.push(options);

    // Check unicode flag is used everywhere or nowhere
    for (var j = 0; j < match.length; j++) {
      var obj = match[j];
      if (!isRegExp(obj)) {
        continue
      }

      if (unicodeFlag === null) {
        unicodeFlag = obj.unicode;
      } else if (unicodeFlag !== obj.unicode && options.fallback === false) {
        throw new Error('If one rule is /u then all must be')
      }
    }

    // convert to RegExp
    var pat = reUnion(match.map(regexpOrLiteral));

    // validate
    var regexp = new RegExp(pat);
    if (regexp.test("")) {
      throw new Error("RegExp matches empty string: " + regexp)
    }
    var groupCount = reGroups(pat);
    if (groupCount > 0) {
      throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: … ) instead")
    }

    // try and detect rules matching newlines
    if (!options.lineBreaks && regexp.test('\n')) {
      throw new Error('Rule should declare lineBreaks: ' + regexp)
    }

    // store regex
    parts.push(reCapture(pat));
  }


  // If there's no fallback rule, use the sticky flag so we only look for
  // matches at the current index.
  //
  // If we don't support the sticky flag, then fake it using an irrefutable
  // match (i.e. an empty pattern).
  var fallbackRule = errorRule && errorRule.fallback;
  var flags = hasSticky && !fallbackRule ? 'ym' : 'gm';
  var suffix = hasSticky || fallbackRule ? '' : '|';

  if (unicodeFlag === true) flags += "u";
  var combined = new RegExp(reUnion(parts) + suffix, flags);
  return { regexp: combined, groups: groups, fast: fast, error: errorRule || defaultErrorRule }
}

function compile(rules) {
  var result = compileRules(toRules(rules));
  return new Lexer({ start: result }, 'start')
}

function checkStateGroup(g, name, map) {
  var state = g && (g.push || g.next);
  if (state && !map[state]) {
    throw new Error("Missing state '" + state + "' (in token '" + g.defaultType + "' of state '" + name + "')")
  }
  if (g && g.pop && +g.pop !== 1) {
    throw new Error("pop must be 1 (in token '" + g.defaultType + "' of state '" + name + "')")
  }
}
function compileStates(states, start) {
  var all = states.$all ? toRules(states.$all) : [];
  delete states.$all;

  var keys = Object.getOwnPropertyNames(states);
  if (!start) start = keys[0];

  var ruleMap = Object.create(null);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    ruleMap[key] = toRules(states[key]).concat(all);
  }
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var rules = ruleMap[key];
    var included = Object.create(null);
    for (var j = 0; j < rules.length; j++) {
      var rule = rules[j];
      if (!rule.include) continue
      var splice = [j, 1];
      if (rule.include !== key && !included[rule.include]) {
        included[rule.include] = true;
        var newRules = ruleMap[rule.include];
        if (!newRules) {
          throw new Error("Cannot include nonexistent state '" + rule.include + "' (in state '" + key + "')")
        }
        for (var k = 0; k < newRules.length; k++) {
          var newRule = newRules[k];
          if (rules.indexOf(newRule) !== -1) continue
          splice.push(newRule);
        }
      }
      rules.splice.apply(rules, splice);
      j--;
    }
  }

  var map = Object.create(null);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    map[key] = compileRules(ruleMap[key], true);
  }

  for (var i = 0; i < keys.length; i++) {
    var name = keys[i];
    var state = map[name];
    var groups = state.groups;
    for (var j = 0; j < groups.length; j++) {
      checkStateGroup(groups[j], name, map);
    }
    var fastKeys = Object.getOwnPropertyNames(state.fast);
    for (var j = 0; j < fastKeys.length; j++) {
      checkStateGroup(state.fast[fastKeys[j]], name, map);
    }
  }

  return new Lexer(map, start)
}

function keywordTransform(map) {
  var reverseMap = Object.create(null);
  var byLength = Object.create(null);
  var types = Object.getOwnPropertyNames(map);
  for (var i = 0; i < types.length; i++) {
    var tokenType = types[i];
    var item = map[tokenType];
    var keywordList = Array.isArray(item) ? item : [item];
    keywordList.forEach(function (keyword) {
      (byLength[keyword.length] = byLength[keyword.length] || []).push(keyword);
      if (typeof keyword !== 'string') {
        throw new Error("keyword must be string (in keyword '" + tokenType + "')")
      }
      reverseMap[keyword] = tokenType;
    });
  }

  // fast string lookup
  // https://jsperf.com/string-lookups
  function str(x) { return JSON.stringify(x) }
  var source = '';
  source += 'switch (value.length) {\n';
  for (var length in byLength) {
    var keywords = byLength[length];
    source += 'case ' + length + ':\n';
    source += 'switch (value) {\n';
    keywords.forEach(function (keyword) {
      var tokenType = reverseMap[keyword];
      source += 'case ' + str(keyword) + ': return ' + str(tokenType) + '\n';
    });
    source += '}\n';
  }
  source += '}\n';
  return Function('value', source) // type
}

/***************************************************************************/

var Lexer = function (states, state) {
  this.startState = state;
  this.states = states;
  this.buffer = '';
  this.stack = [];
  this.reset();
};

Lexer.prototype.reset = function (data, info) {
  this.buffer = data || '';
  this.index = 0;
  this.line = info ? info.line : 1;
  this.col = info ? info.col : 1;
  this.queuedToken = info ? info.queuedToken : null;
  this.queuedThrow = info ? info.queuedThrow : null;
  this.setState(info ? info.state : this.startState);
  this.stack = info && info.stack ? info.stack.slice() : [];
  return this
};

Lexer.prototype.save = function () {
  return {
    line: this.line,
    col: this.col,
    state: this.state,
    stack: this.stack.slice(),
    queuedToken: this.queuedToken,
    queuedThrow: this.queuedThrow,
  }
};

Lexer.prototype.setState = function (state) {
  if (!state || this.state === state) return
  this.state = state;
  var info = this.states[state];
  this.groups = info.groups;
  this.error = info.error;
  this.re = info.regexp;
  this.fast = info.fast;
};

Lexer.prototype.popState = function () {
  this.setState(this.stack.pop());
};

Lexer.prototype.pushState = function (state) {
  this.stack.push(this.state);
  this.setState(state);
};

var eat = hasSticky ? function (re, buffer) { // assume re is /y
  return re.exec(buffer)
} : function (re, buffer) { // assume re is /g
  var match = re.exec(buffer);
  // will always match, since we used the |(?:) trick
  if (match[0].length === 0) {
    return null
  }
  return match
};

Lexer.prototype._getGroup = function (match) {
  var groupCount = this.groups.length;
  for (var i = 0; i < groupCount; i++) {
    if (match[i + 1] !== undefined) {
      return this.groups[i]
    }
  }
  throw new Error('Cannot find token type for matched text')
};

function tokenToString() {
  return this.value
}

Lexer.prototype.next = function () {
  var index = this.index;

  // If a fallback token matched, we don't need to re-run the RegExp
  if (this.queuedGroup) {
    var token = this._token(this.queuedGroup, this.queuedText, index);
    this.queuedGroup = null;
    this.queuedText = "";
    return token
  }

  var buffer = this.buffer;
  if (index === buffer.length) {
    return // EOF
  }

  // Fast matching for single characters
  var group = this.fast[buffer.charCodeAt(index)];
  if (group) {
    return this._token(group, buffer.charAt(index), index)
  }

  // Execute RegExp
  var re = this.re;
  re.lastIndex = index;
  var match = eat(re, buffer);

  // Error tokens match the remaining buffer
  var error = this.error;
  if (match == null) {
    return this._token(error, buffer.slice(index, buffer.length), index)
  }

  var group = this._getGroup(match);
  var text = match[0];

  if (error.fallback && match.index !== index) {
    this.queuedGroup = group;
    this.queuedText = text;

    // Fallback tokens contain the unmatched portion of the buffer
    return this._token(error, buffer.slice(index, match.index), index)
  }

  return this._token(group, text, index)
};

Lexer.prototype._token = function (group, text, offset) {
  // count line breaks
  var lineBreaks = 0;
  if (group.lineBreaks) {
    var matchNL = /\n/g;
    var nl = 1;
    if (text === '\n') {
      lineBreaks = 1;
    } else {
      while (matchNL.exec(text)) { lineBreaks++; nl = matchNL.lastIndex; }
    }
  }

  var token = {
    type: (typeof group.type === 'function' && group.type(text)) || group.defaultType,
    value: typeof group.value === 'function' ? group.value(text) : text,
    text: text,
    toString: tokenToString,
    offset: offset,
    lineBreaks: lineBreaks,
    line: this.line,
    col: this.col,
  };
  // nb. adding more props to token object will make V8 sad!

  var size = text.length;
  this.index += size;
  this.line += lineBreaks;
  if (lineBreaks !== 0) {
    this.col = size - nl + 1;
  } else {
    this.col += size;
  }

  // throw, if no rule with {error: true}
  if (group.shouldThrow) {
    throw new Error(this.formatError(token, "invalid syntax"))
  }

  if (group.pop) this.popState();
  else if (group.push) this.pushState(group.push);
  else if (group.next) this.setState(group.next);

  return token
};

if (typeof Symbol !== 'undefined' && Symbol.iterator) {
  var LexerIterator = function (lexer) {
    this.lexer = lexer;
  };

  LexerIterator.prototype.next = function () {
    var token = this.lexer.next();
    return { value: token, done: !token }
  };

  LexerIterator.prototype[Symbol.iterator] = function () {
    return this
  };

  Lexer.prototype[Symbol.iterator] = function () {
    return new LexerIterator(this)
  };
}

Lexer.prototype.formatError = function (token, message) {
  if (token == null) {
    // An undefined token indicates EOF
    var text = this.buffer.slice(this.index);
    var token = {
      text: text,
      offset: this.index,
      lineBreaks: text.indexOf('\n') === -1 ? 0 : 1,
      line: this.line,
      col: this.col,
    };
  }
  var start = Math.max(0, token.offset - token.col + 1);
  var eol = token.lineBreaks ? token.text.indexOf('\n') : token.text.length;
  var firstLine = this.buffer.substring(start, token.offset + eol);
  message += " at line " + token.line + " col " + token.col + ":\n\n";
  message += "  " + firstLine + "\n";
  message += "  " + Array(token.col).join(" ") + "^";
  return message
};

Lexer.prototype.clone = function () {
  return new Lexer(this.states, this.state)
};

Lexer.prototype.has = function (tokenType) {
  return true
};


var moo = {
  compile: compile,
  states: compileStates,
  error: Object.freeze({ error: true }),
  fallback: Object.freeze({ fallback: true }),
  keywords: keywordTransform,
};

function id(x) { return x[0]; }

const lexer = moo.compile({
  componentLine :/=[ \t]*.+[ \t]*$/,
  //string:/"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/, //From: https://github.com/kach/nearley/blob/0ce577b98484a345c67f7f2c62d8ee700ec9d7d7/examples/json.ne#L10
  newline: {match:/\r?\n/, lineBreaks:true},
  wschar: /[ \t\v\f]/,
  float: /[+-]?\d*\.\d+/, 
  int: /[+-]?\d+/,
  word: /[a-zA-Z_][a-zA-_Z0-9]*/,
  ',':',',
  '|':'|',
  '-':'-',
  '=':'=',
  '{':'{',
  '}':'}',
  });



function parseObjects(d){
    let first = d[0];
    let second = d[1];
    if(!d[1] || d[1].length == 0){
        return [d[0]]
    }else {
        let collect = d[1].map(x=>x[2]);
        return [d[0], ...collect];
    }
}

function handleComponentLine(d){
    return d[0].value.substr(1).trim();
}

//Ignore the input by returning null
function ignore(d){
    return null;
}

function getValue(d){
    return d[0].value;
}

function getComponents(d){
    let toReturnComponents = [];
    let toReturn = {components:toReturnComponents};
    if(d.length == 0 || d[0].length == 0) return toReturn;
    let componentArgs = d[0];
    for(let i = 0; i < componentArgs.length; i++){
        let componentLine = componentArgs[i];
        let component = componentLine[1];
        toReturnComponents.push(...component);
    }
    return toReturn;
}

function getComponentList(d){
    let toReturn = [];
    let component = {
        name:d[1],
        keyValues:[],
    };
    toReturn.push(component);

    for(let i = 0; i < d[3].length; i++){
        let keyValueLine = d[3][i];
        let keyValue = keyValueLine[4];
        component.keyValues.push(keyValue);
    }

    return toReturn;
}

function topLevel(d){
    let currentObject = {};
    for(let i= 0; i < d.length; i++){
        let currentArg = d[i];
        currentObject = Object.assign(currentObject, currentArg);
    }
    return currentObject;
    //return Object.assign(Object.assign(d[0],d[1]), d[2])
}

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "Objects$ebnf$1", "symbols": []},
    {"name": "Objects$ebnf$1$subexpression$1", "symbols": ["NewLine", "NewLine", "Object"]},
    {"name": "Objects$ebnf$1", "symbols": ["Objects$ebnf$1", "Objects$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Objects", "symbols": ["Object", "Objects$ebnf$1"], "postprocess": parseObjects},
    {"name": "Object$ebnf$1", "symbols": ["ChildrenList"], "postprocess": id},
    {"name": "Object$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Object", "symbols": ["MainLine", "TransformLines", "ComponentLines", "Object$ebnf$1"], "postprocess": topLevel},
    {"name": "MainLine$ebnf$1$subexpression$1", "symbols": ["__", {"literal":"|"}, "_", "Layer"]},
    {"name": "MainLine$ebnf$1", "symbols": ["MainLine$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "MainLine$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "MainLine", "symbols": ["Name", "__", "Prefab", "MainLine$ebnf$1", "_"], "postprocess": d=>{return {name:d[0], prefab:d[2], layer:d[3]?d[3][3]:"default"}}},
    {"name": "TransformLines$ebnf$1$subexpression$1", "symbols": ["NewLine", "Transforms"]},
    {"name": "TransformLines$ebnf$1", "symbols": ["TransformLines$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "TransformLines$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "TransformLines", "symbols": ["TransformLines$ebnf$1"], "postprocess": d=>{return {transforms:d[0]?d[0][1]:{translate:{x:0,y:0},scale:{x:1,y:1},rotation:0}}}},
    {"name": "ComponentLines$ebnf$1", "symbols": []},
    {"name": "ComponentLines$ebnf$1$subexpression$1", "symbols": ["NewLine", "Components"]},
    {"name": "ComponentLines$ebnf$1", "symbols": ["ComponentLines$ebnf$1", "ComponentLines$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ComponentLines", "symbols": ["ComponentLines$ebnf$1"], "postprocess": getComponents},
    {"name": "ChildrenList", "symbols": ["NewLine", "_", {"literal":"{"}, "_", "NewLine", "_", "Objects", "NewLine", "_", {"literal":"}"}, "_"], "postprocess": d=> {return {children:d[6]}}},
    {"name": "Name", "symbols": ["Word"], "postprocess": id},
    {"name": "Prefab", "symbols": ["Word"], "postprocess": id},
    {"name": "Layer", "symbols": ["Word"], "postprocess": id},
    {"name": "Transforms$ebnf$1$subexpression$1", "symbols": ["NewLine", "SecondTransforms"]},
    {"name": "Transforms$ebnf$1", "symbols": ["Transforms$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Transforms$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Transforms", "symbols": ["_", "Translation", "Transforms$ebnf$1"], "postprocess": d=> {return {translate: d[1], scale:d[2]?d[2][1].scale:{x:1,y:1}, rotation:d[2]?d[2][1].rotation:0}}},
    {"name": "SecondTransforms$ebnf$1$subexpression$1", "symbols": ["NewLine", "Rotation"]},
    {"name": "SecondTransforms$ebnf$1", "symbols": ["SecondTransforms$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "SecondTransforms$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SecondTransforms", "symbols": ["_", "Scale", "SecondTransforms$ebnf$1"], "postprocess": d=> {return {scale: d[1], rotation:d[2]?d[2][1]:0}}},
    {"name": "Translation", "symbols": ["Point"], "postprocess": id},
    {"name": "Scale", "symbols": ["Point"], "postprocess": id},
    {"name": "Components$ebnf$1", "symbols": []},
    {"name": "Components$ebnf$1$subexpression$1", "symbols": ["NewLine", "_", {"literal":"-"}, "_", "ComponentKeyValue"]},
    {"name": "Components$ebnf$1", "symbols": ["Components$ebnf$1", "Components$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Components", "symbols": ["_", "ComponentName", "_", "Components$ebnf$1"], "postprocess": getComponentList},
    {"name": "ComponentName", "symbols": ["Word"], "postprocess": id},
    {"name": "ComponentKeyValue", "symbols": ["Word", "_", "ComponentValue"], "postprocess": d => {return {key:d[0], value:d[2]}}},
    {"name": "ComponentValue", "symbols": [(lexer.has("componentLine") ? {type: "componentLine"} : componentLine)], "postprocess": handleComponentLine},
    {"name": "Point", "symbols": ["Number", "_", {"literal":","}, "_", "Number"], "postprocess": d => { return {x:d[0],y:d[4]}}},
    {"name": "Rotation", "symbols": ["_", "Number"], "postprocess": d=>d[1]},
    {"name": "Number", "symbols": ["Float"], "postprocess": id},
    {"name": "Number", "symbols": ["Int"], "postprocess": id},
    {"name": "Float", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": getValue},
    {"name": "Int", "symbols": [(lexer.has("int") ? {type: "int"} : int)], "postprocess": getValue},
    {"name": "Word", "symbols": [(lexer.has("word") ? {type: "word"} : word)], "postprocess": getValue},
    {"name": "String", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": getValue},
    {"name": "NewLine", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ignore},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": ignore},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": ignore},
    {"name": "wschar", "symbols": [(lexer.has("wschar") ? {type: "wschar"} : wschar)], "postprocess": id},
    {"name": "Scene$ebnf$1$subexpression$1", "symbols": ["NewLine", "NewLine", "Objects"]},
    {"name": "Scene$ebnf$1", "symbols": ["Scene$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Scene$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Scene", "symbols": ["_", "SceneName", "_", "Scene$ebnf$1"], "postprocess": d=> {return {name:d[1], objects: d[3]? d[3][2]:[]}}},
    {"name": "SceneName", "symbols": ["Word"], "postprocess": id}
]
  , ParserStart: "Scene"
};

function Rule(name, symbols, postprocess) {
  this.id = ++Rule.highestId;
  this.name = name;
  this.symbols = symbols;        // a list of literal | regex class | nonterminal
  this.postprocess = postprocess;
  return this;
}
Rule.highestId = 0;

Rule.prototype.toString = function (withCursorAt) {
  var symbolSequence = (typeof withCursorAt === "undefined")
    ? this.symbols.map(getSymbolShortDisplay).join(' ')
    : (this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(' ')
      + " ● "
      + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(' '));
  return this.name + " → " + symbolSequence;
};


// a State is a rule at a position from a given starting point in the input stream (reference)
function State(rule, dot, reference, wantedBy) {
  this.rule = rule;
  this.dot = dot;
  this.reference = reference;
  this.data = [];
  this.wantedBy = wantedBy;
  this.isComplete = this.dot === rule.symbols.length;
}

State.prototype.toString = function () {
  return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
};

State.prototype.nextState = function (child) {
  var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
  state.left = this;
  state.right = child;
  if (state.isComplete) {
    state.data = state.build();
    // Having right set here will prevent the right state and its children
    // form being garbage collected
    state.right = undefined;
  }
  return state;
};

State.prototype.build = function () {
  var children = [];
  var node = this;
  do {
    children.push(node.right.data);
    node = node.left;
  } while (node.left);
  children.reverse();
  return children;
};

State.prototype.finish = function () {
  if (this.rule.postprocess) {
    this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
  }
};


function Column(grammar, index) {
  this.grammar = grammar;
  this.index = index;
  this.states = [];
  this.wants = {}; // states indexed by the non-terminal they expect
  this.scannable = []; // list of states that expect a token
  this.completed = {}; // states that are nullable
}


Column.prototype.process = function (nextColumn) {
  var states = this.states;
  var wants = this.wants;
  var completed = this.completed;

  for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
    var state = states[w];

    if (state.isComplete) {
      state.finish();
      if (state.data !== Parser.fail) {
        // complete
        var wantedBy = state.wantedBy;
        for (var i = wantedBy.length; i--;) { // this line is hot
          var left = wantedBy[i];
          this.complete(left, state);
        }

        // special-case nullables
        if (state.reference === this.index) {
          // make sure future predictors of this rule get completed.
          var exp = state.rule.name;
          (this.completed[exp] = this.completed[exp] || []).push(state);
        }
      }

    } else {
      // queue scannable states
      var exp = state.rule.symbols[state.dot];
      if (typeof exp !== 'string') {
        this.scannable.push(state);
        continue;
      }

      // predict
      if (wants[exp]) {
        wants[exp].push(state);

        if (completed.hasOwnProperty(exp)) {
          var nulls = completed[exp];
          for (var i = 0; i < nulls.length; i++) {
            var right = nulls[i];
            this.complete(state, right);
          }
        }
      } else {
        wants[exp] = [state];
        this.predict(exp);
      }
    }
  }
};

Column.prototype.predict = function (exp) {
  var rules = this.grammar.byName[exp] || [];

  for (var i = 0; i < rules.length; i++) {
    var r = rules[i];
    var wantedBy = this.wants[exp];
    var s = new State(r, 0, this.index, wantedBy);
    this.states.push(s);
  }
};

Column.prototype.complete = function (left, right) {
  var copy = left.nextState(right);
  this.states.push(copy);
};


function Grammar(rules, start) {
  this.rules = rules;
  this.start = start || this.rules[0].name;
  var byName = this.byName = {};
  this.rules.forEach(function (rule) {
    if (!byName.hasOwnProperty(rule.name)) {
      byName[rule.name] = [];
    }
    byName[rule.name].push(rule);
  });
}

// So we can allow passing (rules, start) directly to Parser for backwards compatibility
Grammar.fromCompiled = function (rules, start) {
  var lexer = rules.Lexer;
  if (rules.ParserStart) {
    start = rules.ParserStart;
    rules = rules.ParserRules;
  }
  var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
  var g = new Grammar(rules, start);
  g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
  return g;
};


function StreamLexer() {
  this.reset("");
}

StreamLexer.prototype.reset = function (data, state) {
  this.buffer = data;
  this.index = 0;
  this.line = state ? state.line : 1;
  this.lastLineBreak = state ? -state.col : 0;
};

StreamLexer.prototype.next = function () {
  if (this.index < this.buffer.length) {
    var ch = this.buffer[this.index++];
    if (ch === '\n') {
      this.line += 1;
      this.lastLineBreak = this.index;
    }
    return { value: ch };
  }
};

StreamLexer.prototype.save = function () {
  return {
    line: this.line,
    col: this.index - this.lastLineBreak,
  }
};

StreamLexer.prototype.formatError = function (token, message) {
  // nb. this gets called after consuming the offending token,
  // so the culprit is index-1
  var buffer = this.buffer;
  if (typeof buffer === 'string') {
    var lines = buffer
      .split("\n")
      .slice(
        Math.max(0, this.line - 5),
        this.line
      );

    var nextLineBreak = buffer.indexOf('\n', this.index);
    if (nextLineBreak === -1) nextLineBreak = buffer.length;
    var col = this.index - this.lastLineBreak;
    var lastLineDigits = String(this.line).length;
    message += " at line " + this.line + " col " + col + ":\n\n";
    message += lines
      .map(function (line, i) {
        return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
      }, this)
      .join("\n");
    message += "\n" + pad("", lastLineDigits + col) + "^\n";
    return message;
  } else {
    return message + " at index " + (this.index - 1);
  }

  function pad(n, length) {
    var s = String(n);
    return Array(length - s.length + 1).join(" ") + s;
  }
};

function Parser(rules, start, options) {
  if (rules instanceof Grammar) {
    var grammar = rules;
    var options = start;
  } else {
    var grammar = Grammar.fromCompiled(rules, start);
  }
  this.grammar = grammar;

  // Read options
  this.options = {
    keepHistory: false,
    lexer: grammar.lexer || new StreamLexer,
  };
  for (var key in (options || {})) {
    this.options[key] = options[key];
  }

  // Setup lexer
  this.lexer = this.options.lexer;
  this.lexerState = undefined;

  // Setup a table
  var column = new Column(grammar, 0);
  var table = this.table = [column];

  // I could be expecting anything.
  column.wants[grammar.start] = [];
  column.predict(grammar.start);
  // TODO what if start rule is nullable?
  column.process();
  this.current = 0; // token index
}

// create a reserved token for indicating a parse fail
Parser.fail = {};

Parser.prototype.feed = function (chunk) {
  var lexer = this.lexer;
  lexer.reset(chunk, this.lexerState);

  var token;
  while (true) {
    try {
      token = lexer.next();
      if (!token) {
        break;
      }
    } catch (e) {
      // Create the next column so that the error reporter
      // can display the correctly predicted states.
      var nextColumn = new Column(this.grammar, this.current + 1);
      this.table.push(nextColumn);
      var err = new Error(this.reportLexerError(e));
      err.offset = this.current;
      err.token = e.token;
      throw err;
    }
    // We add new states to table[current+1]
    var column = this.table[this.current];

    // GC unused states
    if (!this.options.keepHistory) {
      delete this.table[this.current - 1];
    }

    var n = this.current + 1;
    var nextColumn = new Column(this.grammar, n);
    this.table.push(nextColumn);

    // Advance all tokens that expect the symbol
    var literal = token.text !== undefined ? token.text : token.value;
    var value = lexer.constructor === StreamLexer ? token.value : token;
    var scannable = column.scannable;
    for (var w = scannable.length; w--;) {
      var state = scannable[w];
      var expect = state.rule.symbols[state.dot];
      // Try to consume the token
      // either regex or literal
      if (expect.test ? expect.test(value) :
        expect.type ? expect.type === token.type
          : expect.literal === literal) {
        // Add it
        var next = state.nextState({ data: value, token: token, isToken: true, reference: n - 1 });
        nextColumn.states.push(next);
      }
    }

    // Next, for each of the rules, we either
    // (a) complete it, and try to see if the reference row expected that
    //     rule
    // (b) predict the next nonterminal it expects by adding that
    //     nonterminal's start state
    // To prevent duplication, we also keep track of rules we have already
    // added

    nextColumn.process();

    // If needed, throw an error:
    if (nextColumn.states.length === 0) {
      // No states at all! This is not good.
      var err = new Error(this.reportError(token));
      err.offset = this.current;
      err.token = token;
      throw err;
    }

    // maybe save lexer state
    if (this.options.keepHistory) {
      column.lexerState = lexer.save();
    }

    this.current++;
  }
  if (column) {
    this.lexerState = lexer.save();
  }

  // Incrementally keep track of results
  this.results = this.finish();

  // Allow chaining, for whatever it's worth
  return this;
};

Parser.prototype.reportLexerError = function (lexerError) {
  var tokenDisplay, lexerMessage;
  // Planning to add a token property to moo's thrown error
  // even on erroring tokens to be used in error display below
  var token = lexerError.token;
  if (token) {
    tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
    lexerMessage = this.lexer.formatError(token, "Syntax error");
  } else {
    tokenDisplay = "input (lexer error)";
    lexerMessage = lexerError.message;
  }
  return this.reportErrorCommon(lexerMessage, tokenDisplay);
};

Parser.prototype.reportError = function (token) {
  var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== undefined ? token.value : token);
  var lexerMessage = this.lexer.formatError(token, "Syntax error");
  return this.reportErrorCommon(lexerMessage, tokenDisplay);
};

Parser.prototype.reportErrorCommon = function (lexerMessage, tokenDisplay) {
  var lines = [];
  lines.push(lexerMessage);
  var lastColumnIndex = this.table.length - 2;
  var lastColumn = this.table[lastColumnIndex];
  var expectantStates = lastColumn.states
    .filter(function (state) {
      var nextSymbol = state.rule.symbols[state.dot];
      return nextSymbol && typeof nextSymbol !== "string";
    });

  if (expectantStates.length === 0) {
    lines.push('Unexpected ' + tokenDisplay + '. I did not expect any more input. Here is the state of my parse table:\n');
    this.displayStateStack(lastColumn.states, lines);
  } else {
    lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
    // Display a "state stack" for each expectant state
    // - which shows you how this state came to be, step by step.
    // If there is more than one derivation, we only display the first one.
    var stateStacks = expectantStates
      .map(function (state) {
        return this.buildFirstStateStack(state, []) || [state];
      }, this);
    // Display each state that is expecting a terminal symbol next.
    stateStacks.forEach(function (stateStack) {
      var state = stateStack[0];
      var nextSymbol = state.rule.symbols[state.dot];
      var symbolDisplay = this.getSymbolDisplay(nextSymbol);
      lines.push('A ' + symbolDisplay + ' based on:');
      this.displayStateStack(stateStack, lines);
    }, this);
  }
  lines.push("");
  return lines.join("\n");
};

Parser.prototype.displayStateStack = function (stateStack, lines) {
  var lastDisplay;
  var sameDisplayCount = 0;
  for (var j = 0; j < stateStack.length; j++) {
    var state = stateStack[j];
    var display = state.rule.toString(state.dot);
    if (display === lastDisplay) {
      sameDisplayCount++;
    } else {
      if (sameDisplayCount > 0) {
        lines.push('    ^ ' + sameDisplayCount + ' more lines identical to this');
      }
      sameDisplayCount = 0;
      lines.push('    ' + display);
    }
    lastDisplay = display;
  }
};

Parser.prototype.getSymbolDisplay = function (symbol) {
  return getSymbolLongDisplay(symbol);
};

/*
Builds a the first state stack. You can think of a state stack as the call stack
of the recursive-descent parser which the Nearley parse algorithm simulates.
A state stack is represented as an array of state objects. Within a
state stack, the first item of the array will be the starting
state, with each successive item in the array going further back into history.

This function needs to be given a starting state and an empty array representing
the visited states, and it returns an single state stack.

*/
Parser.prototype.buildFirstStateStack = function (state, visited) {
  if (visited.indexOf(state) !== -1) {
    // Found cycle, return null
    // to eliminate this path from the results, because
    // we don't know how to display it meaningfully
    return null;
  }
  if (state.wantedBy.length === 0) {
    return [state];
  }
  var prevState = state.wantedBy[0];
  var childVisited = [state].concat(visited);
  var childResult = this.buildFirstStateStack(prevState, childVisited);
  if (childResult === null) {
    return null;
  }
  return [state].concat(childResult);
};

Parser.prototype.save = function () {
  var column = this.table[this.current];
  column.lexerState = this.lexerState;
  return column;
};

Parser.prototype.restore = function (column) {
  var index = column.index;
  this.current = index;
  this.table[index] = column;
  this.table.splice(index + 1);
  this.lexerState = column.lexerState;

  // Incrementally keep track of results
  this.results = this.finish();
};

// nb. deprecated: use save/restore instead!
Parser.prototype.rewind = function (index) {
  if (!this.options.keepHistory) {
    throw new Error('set option `keepHistory` to enable rewinding')
  }
  // nb. recall column (table) indicies fall between token indicies.
  //        col 0   --   token 0   --   col 1
  this.restore(this.table[index]);
};

Parser.prototype.finish = function () {
  // Return the possible parsings
  var considerations = [];
  var start = this.grammar.start;
  var column = this.table[this.table.length - 1];
  column.states.forEach(function (t) {
    if (t.rule.name === start
      && t.dot === t.rule.symbols.length
      && t.reference === 0
      && t.data !== Parser.fail) {
      considerations.push(t);
    }
  });
  return considerations.map(function (c) { return c.data; });
};

function getSymbolLongDisplay(symbol) {
  var type = typeof symbol;
  if (type === "string") {
    return symbol;
  } else if (type === "object") {
    if (symbol.literal) {
      return JSON.stringify(symbol.literal);
    } else if (symbol instanceof RegExp) {
      return 'character matching ' + symbol;
    } else if (symbol.type) {
      return symbol.type + ' token';
    } else if (symbol.test) {
      return 'token matching ' + String(symbol.test);
    } else {
      throw new Error('Unknown symbol type: ' + symbol);
    }
  }
}

function getSymbolShortDisplay(symbol) {
  var type = typeof symbol;
  if (type === "string") {
    return symbol;
  } else if (type === "object") {
    if (symbol.literal) {
      return JSON.stringify(symbol.literal);
    } else if (symbol instanceof RegExp) {
      return symbol.toString();
    } else if (symbol.type) {
      return '%' + symbol.type;
    } else if (symbol.test) {
      return '<' + String(symbol.test) + '>';
    } else {
      throw new Error('Unknown symbol type: ' + symbol);
    }
  }
}

var nearley = {
  Parser: Parser,
  Grammar: Grammar,
  Rule: Rule,
};

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
    if (!(arguments.length == 4) ||
      !(typeof (definition) === 'string' || definition instanceof String) ||
      !(typeof prefabs == 'object') ||
      !(typeof behaviors == 'object') ||
      !(typeof components == 'object')
    )
      console.error("Scene constructor expects 4 argumens.");

      const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

      
      parser.feed(definition.trim());
      console.log(JSON.stringify(parser.results));
      
      let r = parser.results;
      super(r[0].name);
      this.children = r[0].objects;
      this.bootSimulator();

      

    // let chunks = definition.split(/(\r?\n){2,}/);
    // chunks = chunks.filter(c=>c.trim().length > 0);
    // if(chunks.length == 0)
    //   throw new Error("Scene definition was empty.")
    // let nameString = chunks.shift();

    /*
    let splits = definition.trim().split(/\r?\n/);
    if (splits.length == 0)
      throw new Error("Scene definition was empty");
    let firstLine = splits[0].trim();




    // console.error("Scene constructor expects exactly four argumens of type object")
    super(firstLine);

    this.bootSimulator();


    let remainder = splits.slice(1).join("\n").trim();

    this.children = [];


    let lines = remainder.split("\n");
    let parentStack = [];
    parentStack.push(this);
    let next = [];
    for (var i = 0; i < lines.length; i++) {
      let parse = false;
      let line = lines[i];
      if (line.trim() == '<') {
        parse = true;
      }
      else if (line.trim() == '>') {

        parse = true;
      }
      else if (line.trim() == '') {
        parse = true;
      }
      if (parse) {
        let potentialJoin = next.join("\n");
        if (potentialJoin.trim().length != 0)
          Base.Serializer.deserializePrefab(potentialJoin, false, _.last(parentStack));
        if (line.trim() == '<')
          parentStack.push(_.last(_.last(parentStack).children));
        if (line.trim() == '>') {
          parentStack.pop();
          if (parentStack.length <= 0)
            throw new Error("Unbalanced <>'s");
        }
        next = [];
      }
      else
        next.push(line)
    }
    if (next.join("\n").trim().length != 0)
      Base.Serializer.deserializePrefab(next.join('\n'), false, _.last(parentStack));

    this.components = components;
    */
    this.layers = ["background", null, "foreground"];

    this.frameMouseOver = [];
    this.frameCollisionOver = [];

    this.lastCtx = null;
  }

  bootSimulator() {
    this.simulator = new Simulator();

    this.simulator.setAgentDefaults(
      30, // neighbor distance (min = radius * radius)
      30, // max neighbors
      100, // time horizon
      10, // time horizon obstacles
      1.5, // agent radius
      1.0, // max speed
      new Vector2(1, 1) // default velocity
    );

    this.simulator.setTimeStep(.25);
    this.simulator.addObstacle([]);
    this.simulator.processObstacles();
  }


  /**
   * Load the scene from its declarative syntax
   * 
   */
  boot() {
    if (arguments.length != 0) throw new Error("boot expects no arguments");
    // Setup up the simulations within the scene

    // this.children = [];//Clear the children in case the scene has been built before

    // // if (this.objects)
    // //   this.objects.forEach(obj => {
    // //     this.buildChild(obj, this)
    // //   })
    // let that = this;
    // if (this.objects) {
    //   this.objects.forEach(obj => {
    //     Base.Serializer.deserializeGameObject(obj, that);
    //   })
    // }
    if (this.children) {
      this.children.forEach(child => {
        child.recursiveCall("start");
      });
    }
  }

  newChildEvent(gameObject) {
    if (arguments.length != 1 || !(gameObject instanceof GameObject)) throw new Error("newChildEvent expects exactly one argument of type GameObject")
    if (gameObject.anyComponent("RVOAgent")) {
      this.simulator.addAgent(new Vector2(gameObject.x, gameObject.y), gameObject);

      let RVOAgent = gameObject.getComponent("RVOAgent");
      let destination = RVOAgent.destination;
      let goal = new Vector2(destination.x, destination.y);
      this.simulator.addGoal(goal);
      let i = this.simulator.getNumAgents() - 1;
      RVOAgent._id = i;
      this.updateRVOAgent(gameObject);

    }
    if (gameObject.anyComponent("RVOObstacle")) {
      let rectangleComponent = gameObject.getComponent("RectangleComponent");
      let width = +(rectangleComponent.width * gameObject.scaleX);
      let height = +(rectangleComponent.height * gameObject.scaleY);
      let rx = gameObject.x - width / 2;
      let ry = gameObject.y - height / 2;

      let a = new Vector2(rx, ry);
      let b = new Vector2(rx, ry + height);
      let c = new Vector2(rx + width, ry + height);
      let d = new Vector2(rx + width, ry);

      this.simulator.addObstacle([a, b]);
      this.simulator.addObstacle([b, c]);
      this.simulator.addObstacle([c, d]);
      this.simulator.addObstacle([d, a]);

      this.simulator.processObstacles();
    }
  }

  draw(ctx, width, height) {
    if (arguments.length != 3 ||
      !(typeof ctx == 'object') ||
      !(typeof width == 'number') ||
      !(typeof height == 'number')) throw new Error("draw expects exactly three arguments of type object, number, and number")

    //Before we draw, see if we have a camera game object and use that
    ctx.save();
    let tx = 0, ty = 0, sx = 1, sy = 1, r = 0, hx = 0, hy = 0;
    let cameras = this.children.filter(i => i.anyComponent("CameraComponent"));
    if (cameras.length == 0) {
      //You really should add a camera
      //console.log("You should add a camera to the scene. C'mon.")
      ctx.fillStyle = "cyan";
      ctx.fillRect(0, 0, width, height);
    }
    else {
      if (cameras.length > 1)
        console.log("More than 1 camera detected in the scene. You should only have exactly one root game object with a camera component attached.");
      let camera = cameras[0];
      let cameraComponent = camera.getComponent("CameraComponent");
      ctx.fillStyle = cameraComponent.backgroundColor;
      ctx.fillRect(0, 0, width, height);
      [tx, ty, sx, sy, r, hx, hy] = [camera.x, camera.y, camera.scaleX, camera.scaleY, camera.rotation, width / 2, height / 2];

    }

    ctx.translate(hx, hy);
    ctx.rotate(r);
    ctx.scale(sx, sy);
    ctx.translate(-tx, -ty);

    //Draw children that are not in screen space
    //Sort them by layer
    this.children.filter(i => i.draw && !i.anyComponent("CanvasComponent") && i.layer == "Background").forEach(i => i.draw(ctx));
    this.children.filter(i => i.draw && !i.anyComponent("CanvasComponent") && !i.layer).forEach(i => i.draw(ctx));
    this.children.filter(i => i.draw && !i.anyComponent("CanvasComponent") && i.layer == "Foreground").forEach(i => i.draw(ctx));

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

    this.lastCtx = ctx;
  }

  isInScreenSpace(gameObject) {
    if (arguments.length != 1 || !(gameObject instanceof Base.GameObject)) throw new Error("isInScreenSpace expects exactly one argument of type GameObject")

    let canvases = this.children.filter(i => i.anyComponent("CanvasComponent"));
    if (canvases.length == 0) return false; // We don't have screen space
    for (let canvas of canvases) {
      if (canvas.isADescendant(gameObject)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Update the scene
   * @param {*} ctx 
   * @param {*} collidableType 
   * @param {*} collisionHelper 
   */
  update(ctx, collidableType, collisionHelper) {
    if (arguments.length != 3 ||
      !(typeof ctx == 'object') ||
      !(typeof collidableType == 'function') ||
      !(typeof collisionHelper == 'object')) throw new Error("update expects exactly three arguments of type object, object, and CollisionHelper")

    //Update all the objects
    this.children.filter(i => i.update).forEach(i => i.update());

    /**
     * Now run the simulators
     */

    //
    //First we do collisions
    //

    //Add collision behavior
    let collidableChildren = [];
    this.getCollidable(this, collidableChildren, collidableType);

    for (let i = 0; i < collidableChildren.length; i++) {
      let gameObjectOne = collidableChildren[i].gameObject;
      let isInScreenSpaceOne = this.isInScreenSpace(gameObjectOne);
      for (let j = i + 1; j < collidableChildren.length; j++) {
        let gameObjectTwo = collidableChildren[j].gameObject;
        let isInScreenSpaceTwo = this.isInScreenSpace(gameObjectTwo);
        if (isInScreenSpaceOne != isInScreenSpaceTwo) break;
        let collisionPair = { one: collidableChildren[i], two: collidableChildren[j] };
        if (collisionHelper.inCollision(collidableChildren[i], collidableChildren[j])) {
          gameObjectOne.components.forEach(x => {
            if (x.onCollisionStay)
              x.onCollisionStay(collidableChildren[j]);
          });
          gameObjectTwo.components.forEach(x => {
            if (x.onCollisionStay)
              x.onCollisionStay(collidableChildren[i]);

          });
          if (this.frameCollisionOver.findIndex(x=>this.collisionPairMatch(x,collisionPair))==-1) {
            this.frameCollisionOver.push(collisionPair);
            gameObjectOne.components.filter(x=>x.onCollisionEnter).forEach(x => {
              x.onCollisionEnter(collidableChildren[j]);
            });
            gameObjectTwo.components.filter(x=>x.onCollisionEnter).forEach(x => {
              x.onCollisionEnter(collidableChildren[i]);
            });
          }
        }
        else {
          if(this.frameCollisionOver.findIndex(x=>this.collisionPairMatch(x,collisionPair))!=-1)
          {
            this.frameCollisionOver = this.frameCollisionOver.filter(x=>!this.collisionPairMatch(x, collisionPair));
            gameObjectOne.components.filter(x=>x.onCollisionExit).forEach(x => {
              x.onCollisionExit(collidableChildren[j]);
            });
            gameObjectTwo.components.filter(x=>x.onCollisionExit).forEach(x => {
              x.onCollisionExit(collidableChildren[i]);
            });
          }
        }
      }
    }

    //
    //Now go through and see if the point represented by the mouse collides with any of the colliders
    //
    //First get the world space position of the mouse
    let cameras = this.children.filter(i => i.anyComponent("CameraComponent"));
    let point = { x: 0, y: 0 };
    point.x = parseInt(Input.mousePosition.x);
    point.y = parseInt(Input.mousePosition.y);
    let screenPoint = { x: point.x, y: point.y };
    if (cameras.length > 0) {

      let camera = cameras[0];
      //let cameraComponent = camera.getComponent("CameraComponent")
      let [tx, ty, sx, sy, r, hx, hy] = [camera.x, camera.y, camera.scaleX, camera.scaleY, camera.rotation, ctx.canvas.width / 2, ctx.canvas.height / 2];



      point.x = (point.x - hx) / sx + tx;
      point.y = (point.y - hy) / sy + ty;
    }

    //Put the mouse in world space
    let colliderObjectWorld = {};
    colliderObjectWorld.gameObject = new GameObject();
    colliderObjectWorld.gameObject.x = point.x;
    colliderObjectWorld.gameObject.y = point.y;
    colliderObjectWorld.collider = new PointCollider();

    let colliderObjectScreen = {};
    colliderObjectScreen.gameObject = new GameObject();
    colliderObjectScreen.gameObject.x = screenPoint.x;
    colliderObjectScreen.gameObject.y = screenPoint.y;
    colliderObjectScreen.collider = new PointCollider();

    let colliderObject;

    for (let i = 0; i < collidableChildren.length; i++) {
      let collidableChild = collidableChildren[i];

      if (!this.isInScreenSpace(collidableChild.gameObject))
        colliderObject = colliderObjectWorld;
      else
        colliderObject = colliderObjectScreen;

      if (collisionHelper.inCollision(collidableChild, colliderObject)) {
        let gameObjectOne = collidableChild.gameObject;

        //Now loop over all the behaviors too see if any are listening for collision events\
        if (Input.getMouseButtonDown(0))
          gameObjectOne.components.filter(x => x.onMouseDown).forEach(x => x.onMouseDown());
        if (Input.getMouseButtonUp(0))
          gameObjectOne.components.filter(x => x.onMouseUp).forEach(x => x.onMouseUp());
        for (let i = 0; i < gameObjectOne.components.length; i++) {
          let component = gameObjectOne.components[i];
          if (component.onMouseOver) {
            component.onMouseOver();
          }
          if (!this.frameMouseOver.includes(component)) {
            if (component.onMouseEnter) {
              component.onMouseEnter();
            }
            this.frameMouseOver.push(component);
          }



        }
      } else {
        let gameObjectOne = collidableChild.gameObject;
        for (let i = 0; i < gameObjectOne.components.length; i++) {
          let component = gameObjectOne.components[i];

          if (this.frameMouseOver.includes(component)) {
            _.pull(this.frameMouseOver, component);
            if (component.onMouseExit) {
              component.onMouseExit();
            }
          }
        }
      }
    }


    //
    //Now go through and see if the point represented by the touch point collides with any of the colliders
    //
    //First get the world space position of the touch
    let touches = Input.getTouches();
    if (touches && touches.length > 0) {
      //let cameras = this.children.filter(i => i.anyComponent("CameraComponent"))
      let point = { x: 0, y: 0 };
      point.x = parseInt(touches[0].x);
      point.y = parseInt(touches[0].y);
      let screenPoint = { x: point.x, y: point.y };
      if (cameras.length > 0) {

        let camera = cameras[0];

        let [tx, ty, sx, sy, r, hx, hy] = [camera.x, camera.y, camera.scaleX, camera.scaleY, camera.rotation, ctx.canvas.width / 2, ctx.canvas.height / 2];

        point.x = (point.x - hx) / sx + tx;
        point.y = (point.y - hy) / sy + ty;

      }

      let colliderObject;
      [colliderObjectWorld.gameObject.x, colliderObjectWorld.gameObject.y] = [point.x, point.y];
      [colliderObjectScreen.gameObject.x, colliderObjectScreen.gameObject.y] = [screenPoint.x, screenPoint.y];
      for (let i = 0; i < collidableChildren.length; i++) {
        let collidableChild = collidableChildren[i];
        if (!this.isInScreenSpace(collidableChild.gameObject))
          colliderObject = colliderObjectWorld;
        else
          colliderObject = colliderObjectScreen;

        if (collisionHelper.inCollision(collidableChild, colliderObject)) {
          let gameObjectOne = collidableChild.gameObject;

          //Now loop over all the behaviors too see if any are listening for collision events
          gameObjectOne.components.filter(x => x.onTouchOver).forEach(x => x.onTouchOver());
          if (Input.getTouchesStart() && Input.getTouchesStart().length > 0)
            gameObjectOne.components.filter(x => x.onTouchStart).forEach(x => x.onTouchStart());
          if (Input.getTouchesEnd() && Input.getTouchesEnd().length > 0)
            gameObjectOne.components.filter(x => x.onTouchEnd).forEach(x => x.onTouchEnd());
        }
      }
    }

    //
    // Now we simulate the crowds
    //
    this.simulator.run();

    // Go back and update the gameObjects represented by the agents
    let numAgents = this.simulator.getNumAgents();
    for (let i = 0; i < numAgents; i++) {
      let gameObject = this.simulator.getAgentGameObject(i);
      let position = this.simulator.getAgentPosition(i);
      gameObject.x = position.x;
      gameObject.y = position.y;
      if (RVOMath.absSq(this.simulator.getGoal(i).minus(this.simulator.getAgentPosition(i))) < 10) {
        // Agent is within one radius of its goal, set preferred velocity to zero
        this.simulator.setAgentPrefVelocity(i, new Vector2(0.0, 0.0));
      } else {
        // Agent is far away from its goal, set preferred velocity as unit vector towards agent's goal.
        this.simulator.setAgentPrefVelocity(i, RVOMath.normalize(this.simulator.getGoal(i).minus(this.simulator.getAgentPosition(i))));
      }
    }
  }
  collisionPairMatch(one, two){
    return one.one.gameObject == two.one.gameObject &&
      one.two.gameObject == two.two.gameObject &&
      one.one.collider == two.one.collider &&
      one.two.collider == two.two.collider;
  }

  /**
   * Get a flat list of all the collidable components in the scene
   * @param {*} gameObject The root game object in the tree we are searching
   * @param {*} collidableChildren The list we are modifying
   * @param {*} type The type a game object needs in order to be considered collidable
   */
  getCollidable(gameObject, collidableChildren, type) {
    if (arguments.length != 3 ||
      !(typeof gameObject == 'object') ||
      !(Array.isArray(collidableChildren)) ||
      !(typeof type == 'function')) throw new Error("getCollidable expects exactly three arguments of type GameObject, array, and type")


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

  /**
   * Convert the point in screen space to world space
   * @param {Base.Point} position 
   */
  toWorldSpace(position) {
    let cameras = this.children.filter(i => i.anyComponent("CameraComponent"));
    let point = position.clone();

    if (cameras.length > 0 && this.lastCtx) {

      let camera = cameras[0];
      let [tx, ty, sx, sy, r, hx, hy] = [camera.x, camera.y, camera.scaleX, camera.scaleY, camera.rotation, this.lastCtx.canvas.width / 2, this.lastCtx.canvas.height / 2];

      point.x = (point.x - hx) / sx + tx;
      point.y = (point.y - hy) / sy + ty;
    }
    return point
  }

  /**
   * 
   * @param {*} location Proposed entry point for the game object
   * @param {*} collider Collider for the proposed game object
   * @param {*} component The component the game object needs to be included in the search. Usually "RVOAgent"
   */
  canEnterSafely(location, collider, component) {
    if (arguments.length != 3 ||
      !(location instanceof Base.Point) ||
      !(typeof collider == 'object') ||
      !(typeof (component) === 'string' || component instanceof String)) throw new Error("canEnterSafely expects exactly three arguments of type Point, Collider, and String")

    let collidableChildren = [];
    this.getCollidable(this, collidableChildren, this.components.Collider);
    let proposed = new GameObject();
    proposed.x = location.x;
    proposed.y = location.y;

    for (let i = 0; i < collidableChildren.length; i++) {
      if (collidableChildren[i].gameObject.anyComponent(component))
        if (this.components.CollisionHelper.inCollision(collidableChildren[i], { collider, gameObject: proposed })) {
          return false;
        }
    }
    return true;
  }




  updateRVOAgent(gameObject) {
    if (arguments.length != 1 || !(gameObject instanceof GameObject)) throw new Error("updateRVOAgent expects exactly one argument of type GameObject")

    let RVOAgent = gameObject.getComponent("RVOAgent");
    let i = RVOAgent._id;
    let destination = RVOAgent.destination;
    let goal = new Vector2(destination.x, destination.y);
    this.simulator.setGoal(goal, i);
    this.simulator.setAgentPrefVelocity(i, RVOMath.normalize(goal.minus(this.simulator.getAgentPosition(i))));
  }
  removeRVOAgent(gameObject) {
    if (arguments.length != 1 || !(gameObject instanceof GameObject)) throw new Error("updateRVOAgent expects exactly one argument of type GameObject")

    let RVOAgent = gameObject.getComponent("RVOAgent");
    let i = RVOAgent._id;
    this.simulator.removeRVOAgent(i);
    for (let i = 0; i < this.simulator.getNumAgents(); i++) {
      let gameObject = this.simulator.getAgentGameObject(i);
      let component = gameObject.getComponent("RVOAgent");
      component._id = i;
    }

  }




}

// import Globals from "./Globals.js"

const SceneManager = {
  /** Orginally from scene */

  scenes: [],
  Base: {},


  _currentSceneIndex: -1,



  get currentScene() {
    if (this._currentSceneIndex == -1) throw "Current scene index not set. Cannot get current scene."
    if (this.scenes.length == 0) throw "There are no scenes in the scene manager. Cannot get current scene."
    if (this._currentSceneIndex >= this.scenes.length) throw "Current scene index is out of bounds. Cannot get current scene."
    return this.scenes[this._currentSceneIndex];
  },

  set currentScene(argument) {
    if (typeof argument !== "string") throw new Error("The currentScene setter expects an instance  a string");

    let index = this.scenes.findIndex(i => i.name == argument);
    if (index != -1) {
      this._currentSceneIndex = index;
    }
    else throw "No scene has that name. Current scene index not set."
    this.scenes[this._currentSceneIndex].boot();
  },
  clearScenes() {
    if (arguments.length != 0) throw new Error("clearScenes does not take any arguments.")
    this.scenes = [];
    this._currentSceneIndex = -1;
  },

  addScene(scene) {
    if (arguments.length != 1 || !(scene instanceof Scene)) throw new Error("addScene expects one argument of type scene")

    if (!this.scenes.includes(scene))
      this.scenes.push(scene);
  },

  destroy(gameObject) {
    if (arguments.length != 1 || !(gameObject instanceof GameObject)) throw new Error("destroy expects one argument of type GameObject")

    this.currentScene.destroy(gameObject);
  },
  // instantiate(gameObjectType, location, scale, rotation) {
  //   if(!scale) scale = null;
  //   if(!rotation) rotation = null;
  //   if (arguments.length < 2 ||
  //     arguments.length > 4 ||
  //     // !(typeof gameObjectType == "object") ||
  //     !(location instanceof Point) ||
  //     !(scale instanceof Point) ||
  //     !(typeof rotation == "number")

  //   ) throw new Error("SceneManager.instantiate expects two, three, or four arguments of type object, Base.Point, Base.Point, and float")

  //   return this.Base.Serializer.instantiate(gameObjectType, location, scale, rotation, this.currentScene);
  //   // return this.currentScene.instantiate(gameObjectType, location, scale, rotation, this.currentScene);
  // }


};

class Serializer {
  constructor(components) {
    this.components = components;
    this.prefabs = {};
  }
  
  deserializePrefab(string, store = false, parent = null, translate = null, scale = null, rotation = null) {
    
    
    
    
    const newline = /\r?\n/;
    const commaSeparatedFloats = /^\s*[-+]?[0-9]*\.?[0-9]+,\s*[-+]?[0-9]*\.?[0-9]+\s*$/;
    const floatRegex = /^\s*[-+]?[0-9]*\.?[0-9]+\s*$/;
    const startsWithSpace = /^\s/;

    let lines = string.split(newline);
    lines = lines.filter(l => l.trim().length > 0);

    let lineIndex = 0;
    //Read name and prefab line
    let nameLine = lines[lineIndex];
    let nameLineSplit = nameLine.split(/\s/);
    let name = nameLineSplit[0];
    let prefabName = nameLineSplit[1];

    let toReturn = new GameObject();
    if (prefabName != "Empty") {
      let toClone = this.prefabs[prefabName];
      toReturn = _.cloneDeep(toClone);
    }

    toReturn.name = name;
    toReturn.prefabName = prefabName;

    //Check to see if we have any tranformation information
    let possibleTranslateLine = lines[lineIndex + 1];
    //For floating point regex, see https://www.regular-expressions.info/floatingpoint.html
    if (possibleTranslateLine && possibleTranslateLine.match(commaSeparatedFloats)) {
      // console.log("Found transform " + possibleTranslateLine)
      let split = lines[++lineIndex].trim().split(",");
      toReturn.x = +split[0].trim();
      toReturn.y = +split[1].trim();
    }
    if(translate != null){ //Override if we have a valid argument
      toReturn.x = translate.x;
      toReturn.y = translate.y;
    }


    let possibleScaleLine = lines[lineIndex + 1];
    if (possibleScaleLine && possibleScaleLine.match(commaSeparatedFloats)) {
      // console.log("Found scale " + possibleScaleLine)
      let split = lines[++lineIndex].trim().split(",");
      toReturn.scaleX = +split[0].trim();
      toReturn.scaleY = +split[1].trim();
    }
    if(scale != null){
      toReturn.scaleX = scale.x;
      toReturn.scaleY = scale.y;
    }

    let possibleRotateLine = lines[lineIndex + 1];
    if (possibleRotateLine && possibleRotateLine.match(floatRegex)) {
      // console.log("Found rotate " + possibleRotateLine)
      lineIndex++;
      toReturn.rotation = +possibleRotateLine.trim();
    }
    if(rotation != null){
      toReturn.rotation = rotation;
    }



    let currentComponent;
    while (++lineIndex < lines.length) {
      let currentLine = lines[lineIndex].trimEnd();

      if (currentLine.length == 0) continue;
      if (currentLine.match(startsWithSpace)) {
        //It's a component value
        let componentValueSplit = currentLine.trim().split("=");
        let key = componentValueSplit[0];
        let value = componentValueSplit[1];
        //Look for JSON-like values
        if (value.startsWith("{") || value.startsWith("["))
          value = JSON.parse(componentValueSplit[1]);
        currentComponent[key] = value;
      }
      else {
        //It's a new component
        let componentName = currentLine.trim();
        if (toReturn.anyComponent(componentName)) {
          //Edit the existing componentent
          currentComponent = toReturn.getComponent(componentName);
        }
        else {
          //Add a new component
          currentComponent = new this.components[componentName]();
          toReturn.addComponent(currentComponent);
        }
      }
    }

    if (store)
      this.prefabs[name] = toReturn;
    if (parent != null) {
      parent.addChild(toReturn);
    }
    return toReturn;

  }
  instantiate(gameObjectType, parent, location = null, scale = null, rotation = null) {
    //check to see if the transforms are set.
    //If they are either add them or override them

    let gameObject = this.deserializePrefab(gameObjectType, false, parent, location, scale, rotation);
    gameObject.recursiveCall("start");
    return gameObject;
  }
}

class State$1{
  constructor(name, type=null){
    this.name = name;
    this.parent = null;
    this.type = type;
  }
  handleEvent(event){
    //throw new Error("Handle event needs to be n in each State subclass.");
  }
  boot(){
    //throw new Error("Boot needs to be overridden in each State subclass")
  }
}

class StateMachine extends State$1 {
  constructor(name) {
    super(name);
    this.states = [];
    this.stack = [];
    this._currentState = null;
  }
  currentState() {
    return this.stack[this.stack.length - 1];
  }
  push(value) {
    this.stack.push(value);
  }
  pop() {
    let toReturn = this.stack.pop();
    let cs = this.currentState();
    if (cs)
      cs.boot();
    return toReturn;
  }
  handleEvent(event) {
    let cs = this.currentState();
    if (!cs) return;
    cs.handleEvent(event);
  }

  do(lambda) {
    lambda();
  }
}

/**
 * Static class that holds all the time variables related to the game.
 */

class Time {
    constructor() {
        this.deltaTime = 0;
    }
}

/**
 * A game object with a camera component will be treated as the camera in the scene.
 * Currently, this game object needs to be in the root of the scene graph and there
 * should only be one.
 */
class CameraComponent extends Component {
    constructor() {
        super();
        this.backgroundColor="white";

    }
    
    update() {

    }
}

/**
 * A gameObject with a CanvasComponent represents screen space.
 * Currently, there should be no more than one game object with a canvas component 
 * in the root of the scene graph.
 */
class CanvasComponent extends Component {

    constructor() {
        super();

    }
    
    update() {

    }
}

class CircleComponent extends Component {
    
    constructor() {
        super();
        this.radius=50;
        this.fill="gray";
        this.stroke="black";
        this.lineWidth = 1;

    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    update() {

    }
}

/**
Axis - Aligned Bounding Box 
*/

class ConvexCollider extends Collider {
    constructor() {
        super();
    }

}

class Draggable extends Behavior {
  start() {
    this.mouseDown = false;
    this.touchDown = false;
  }

  update() {
    if (this.mouseDown) {
      let point = Input.getMousePositionDelta();
      this.gameObject.x += point.x;
      this.gameObject.y += point.y;
    }
    if (this.touchDown) {
      let point = Input.getTouchMove()[0];
      this.gameObject.x += point.x;
      this.gameObject.y += point.y;
    }
    
    if(Input.anyTouchesEnd()){
      this.touchDown = false;
    }
    if(Input.getMouseButtonDown(0)){
      this.mouseDown  = false;
    }
  }
  onMouseDown() {
    this.mouseDown = true;
  }
  onMouseUp() {
    this.mouseDown = false;
  }
  onTouchStart(){
    this.touchDown = true;
  }
  onTouchEnd(){
    this.touchDown = false;
  }
}

class RectangleComponent extends Component {
    constructor() {
        super();
        this.width = 100;
        this.height = 100;
        this.fill = "gray";
        this.stroke = "black";
        this.lineWidth = 1;

    }
    draw(ctx) {
        ctx.save();
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.lineWidth;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.strokeRect(0, 0, this.width, this.height);
        ctx.restore();
    }
    update() {

    }
}

class Stack extends Behavior {
  start() {
    // this.mouseDown = false;
    // this.touchDown = false;
    this.spawn;
  }

  update() {
    // if (this.mouseDown) {
    //   let point = Input.getMousePositionDelta();
    //   this.gameObject.x += point.x;
    //   this.gameObject.y += point.y;
    // }
    // if (this.touchDown) {
    //   let point = Input.getTouchMove()[0]
    //   this.gameObject.x += point.x;
    //   this.gameObject.y += point.y;
    // }
    
    // if(Input.anyTouchesEnd()){
    //   this.touchDown = false;
    // }
  }
  onMouseDown() {
    this.mouseDown = true;
    let spawned = SceneManager.Base.Serializer.instantiate(SceneManager.Prefabs[this.spawn], this.$go.parent, this.$go.worldLocation);
    spawned.$("Draggable").mouseDown = true;
  }
  // onMouseUp() {
  //   this.mouseDown = false;
  // }
  onTouchStart(){
    let spawned = SceneManager.Base.Serializer.instantiate(SceneManager.Prefabs[this.spawn], this.$go.parent, this.$go.worldLocation);
    spawned.$("Draggable").touchDown = true;
  }
  
  // onTouchEnd(){
  //   this.touchDown = false;
  // }
}

class TextComponent extends Component {
    constructor() {
        super();
        this.text = "[Blank]";
        this.font = "10pt Sans";
        this.fill = "black";
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.font = this.font;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
    update() {

    }
}

class Trash extends Behavior {
  start() {
   this.colliders = [];
  }

  update() {
    
    if(Input.getMouseButtonUp(0) || Input.getTouchesEnd().length > 0){
      for(let i = 0; i < this.colliders.length; i++){
        let collider = this.colliders[i];
        if(collider.gameObject.$("Trashable")){
          SceneManager.currentScene.destroy(collider.gameObject);
        }
      }
    }
    this.colliders = [];
   
  }
  onCollisionStay(collider){
    this.colliders.push(collider);
  }
 
}

class Trashable extends Behavior {
  start() {
   
  }

  update() {
   
  }
}

class TriangleComponent extends Component {
   
    constructor() {
        super();
        this.points = [];
        this.pointAX = 0;
        this.pointAY = 0;
        this.pointBX = 100;
        this.pointBY = 100;
        this.pointCX = 0;
        this.pointCY = 100;
        this.fill = "gray";
        this.stroke = "black";

    }
    draw(ctx) {
        if(this.points.length == 0) return;
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.beginPath();
        ctx.moveTo(+this.points[0].x, +this.points[0].y);
        ctx.lineTo(+this.points[1].x, +this.points[1].y);
        ctx.lineTo(+this.points[2].x, +this.points[2].y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    update() {
        if(this.points.length == 0){
            this.points = [new Point(this.pointAX, this.pointAY), new Point(this.pointBX, this.pointBY), new Point(this.pointCX, this.pointCY)];
        }

    }
}

class RVOAgent extends Component {

    constructor() {
        super();
        this.destination = new Point(0,0);
        this._id;

    }
    
    update() {

    }
    
}

class RVOSimulator extends Component {

    constructor() {
        super();
        this.simulator = Simulator.instance = new Simulator();
        this.simulator.setTimeStep(10);
        this.setup = false;

    }

    update() {
        if (this.setup) ;
        else {
            this.setup = true;
            var velocity = new Vector2(1, 1);
            var radius = 10;
            this.simulator.setAgentDefaults(
                400, // neighbor distance (min = radius * radius)
                30, // max neighbors
                600, // time horizon
                600, // time horizon obstacles
                radius, // agent radius
                10.0, // max speed
                velocity // default velocity
            );
            var NUM_AGENTS = 10;
            for (var i = 0; i < NUM_AGENTS; i++) {
                var angle = i * (2 * Math.PI) / NUM_AGENTS;
                var x = Math.cos(angle) * 200;
                var y = Math.sin(angle) * 200;
                this.simulator.addAgent(new Vector2(x, y));
                
            }

            // Create goals
			var goals = [];
			for (var i = 0; i < this.simulator.getNumAgents (); ++i) {
				goals.push(this.simulator.getAgentPosition(i).scale(-1));
			}
			this.simulator.addGoals(goals);
			
			// Add (polygonal) obstacle(s), specifying vertices in counterclockwise order.
			var vertices = [];

			this.simulator.addObstacle (vertices);
			
			// Process obstacles so that they are accounted for in the simulation.
            this.simulator.processObstacles();
            
            for (var i = 0; i < NUM_AGENTS; i++) {
                this.simulator.setAgentPrefVelocity(i, RVOMath.normalize (this.simulator.getGoal(i).minus(this.simulator.getAgentPosition(i))));
                
            }
        }

    }
}

class RVOObstacle extends Component {
}

var Empty = `
Empty Empty
`;

var Text = `
Text Empty
TextComponent
 text=10
 font=20pt Times
 fill=black  
`;

var Camera = `
Camera Empty
CameraComponent
 backgroundColor=white
`;

var Canvas = `
Canvas Empty
CanvasComponent
`;

var CanvasText = `
CanvasText Empty
RectTransform
TextComponent
 text=10
 font=20pt Times
 fill=black
`;

var Rectangle = `
Rectangle Empty
RectangleComponent
 width=100
 height=100
 fill=red
 stroke=blue
AABBCollider
 width=100
 height=100
`;

var RectangleNoCollider = `
Rectangle Empty
RectangleComponent
 width=100
 height=100
 fill=red
 stroke=blue
`;

var Circle = `
Circle Empty
CircleComponent
 radius=50
 fill=rgba(255,255,0,.5)
 stroke=black
CircleCollider
 radius=50
`;

var ScreenText = `
ScreenText Empty
RectTransform
TextComponent
 text=10
 font=20pt Times
 fill=black
`;

var RVOAgent$1 = `
RVOAgent Empty
RVOAgent
CircleComponent
 radius=1
 fill=black
CircleCollider
 radius=1
`;

var RVOSimulator$1 = `
RVOSimulator Empty
RVOSimulator
`;

var RVOObstacle$1 = `
RVOObstacle Empty
RVOObstacle
RectangleComponent
 width=5
 height=5
 fill=black
`;

/**
 * Main function for the game.
 * This functon takes in game-specific game objects, behaviors, and scenes
 * and starts the game loop.
 * 
 * It also accepts an optional "options" parameter which can override the default behavior.
 * 
 * The options object can have the following key value pairs
 * - startScene:{String} overrive the start scene provided in the scenes object
 * - runUpdate:{bool} if true, prevents update from being called. The Engine wil only render the initial state.
 * 
 * @param {Array} gameObjects An array of game objects that can be in the game
 * @param {Array} gameBehaviors An array of behaviors that can be in the game
 * @param {Object} scenes An object specifying the start scenes and scene definitions
 * @param {Object} options An object with options that override the defaults
 */
function main(gameObjects, gameBehaviors, scenes, options = {}) {
  //From https://flaviocopes.com/how-to-merge-objects-javascript/
  Base.Serializer.components = { ...Base.Serializer.components, ...gameBehaviors };
  this.deserializedPrefabs = [];
  for(let key in this.Prefabs){
    Base.Serializer.deserializePrefab(this.Prefabs[key], true);
  }
  for(let key in  gameObjects){
    Base.Serializer.deserializePrefab(gameObjects[key], true);
  }
  this.SceneManager.Prefabs = { ...gameObjects, ...this.Prefabs };
  //Base.Serializer.prefabs = this.Prefabs;
  this.Behaviors = gameBehaviors;
  let canv, ctx;

  let shouldDraw = true;
  if (typeof options.runDraw !== 'undefined' || options.runDraw === false)
    shouldDraw = false;

  this.SceneManager.clearScenes();
  scenes.allScenes
    .forEach(i => this.SceneManager.addScene(new Scene(i, this.Prefabs, gameBehaviors, this.Components)));

  this.SceneManager.currentScene = options.startScene || scenes.startScene;

  if (shouldDraw) {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');
  }

  let that = this;

  function gameLoop() {

    let shouldUpdate = true;


    if (typeof options.runUpdate !== 'undefined' || options.runUpdate === false)
      shouldUpdate = false;


    Input.swapUpDownArrays();
    if (shouldUpdate)
      update(ctx);
    if (shouldDraw)
      draw(ctx);
  }

  function update(ctx) {
    that.SceneManager.currentScene.update(ctx, that.Components.Collider, that.Components.CollisionHelper);
  }

  function draw(ctx) {
    that.SceneManager.currentScene.draw(ctx, canv.width, canv.height);
  }

  //Setup event handling
  if (options.runUpdate === undefined || options.runUpdate == true) {
    document.body.addEventListener('keydown', keydown);
    document.body.addEventListener('keyup', keyup);
    document.body.addEventListener('keypress', keypress);
    document.body.addEventListener('mousedown', mousedown);
    document.body.addEventListener('mouseup', mouseup);
    document.body.addEventListener('mousemove', mousemove);
    document.body.addEventListener('wheel', wheelevent);
    document.body.addEventListener('contextmenu', contextmenu);
    document.body.addEventListener("touchstart", touchstart, {passive:false});
    document.body.addEventListener("touchend", touchend, {passive:false});
    document.body.addEventListener("touchcancel", touchcancel, {passive:false});
    document.body.addEventListener("touchmove", touchmove, {passive:false});



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

    function touchstart(event) {
      event.preventDefault();
      //event.preventDefault();//Don't treat this as a mouse event
      Input.touches = copyTouches(event.changedTouches);
      Input.touchesStart = copyTouches(event.changedTouches); //Simple deep copy
      event.stopPropagation();
      return false;
    }

    function touchend(event) {
      event.preventDefault();
      //event.preventDefault();//Don't treat this as a mouse event
      Input.touches = [];//copyTouches(event.changedTouches);
      Input.touchesEnd = copyTouches(event.changedTouches); //Simple deep copy
      event.stopPropagation();
      return false;
    }

    function touchcancel(event) {
      event.preventDefault();
      //event.preventDefault();//Don't treat this as a mouse event
      console.log("Touch Cancel");
      event.stopPropagation();
      return false;
    }

    function touchmove(event) {
      event.preventDefault();
      Input.touches = copyTouches(event.changedTouches);
      event.stopPropagation();
      return false;

    }
  }

  function copyTouches(touches) {
    let toReturn = [];
    for (let i = 0; i < touches.length; i++) {
      let touch = touches[i];
      let toAdd = {};
      for (let j in touch) {
        toAdd[j] = touch[j];
      }

      toReturn.push(toAdd);
    }
    return toReturn;
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

  // var can = document.getElementById("canv");

  function resizeCanvas() {
    let parent = canv.parentNode;
    if (parent == document.body) {
      parent = window;
      canv.style.width = parent.innerWidth + "px";

      canv.width = parent.innerWidth;
      canv.height = parent.innerHeight;
    }
    else {
      //Take the canvas out of the parent div sive calculation momentarily
      can.style.height = "0px";
      can.style.width = "0px";
      can.width = 0;
      can.height = 0;
      //Then on the next tick put it back in.
      setTimeout(function () {
        let width = parent.clientWidth;
        let height = parent.clientHeight;
        can.style.width = width + "px";
        can.style.height = height + "px";
        can.width = width;
        can.height = height;
        //console.log(`${parent.clientWidth}-${parent.innerWidth}-${parent.offsetWidth}`)
        console.log(`${can.style.height} ${can.height}`);
      }, 0);

    }
  }
  //Don't look for or respond to the canvas if we're in "headless" mode
  if (shouldDraw) {
    window.onresize = resizeCanvas;

    // Webkit/Blink will fire this on load, but Gecko doesn't.
    // So we fire it manually...
    resizeCanvas();
  }
  if (options.runUpdate === undefined || options.runUpdate == true) 
    setInterval(gameLoop, 33);
}

let Components = {
  AABBCollider,
  CameraComponent,
  CanvasComponent,
  CircleComponent,
  CircleCollider,
  Collider,
  CollisionHelper,
  ConvexCollider,
  Draggable,
  PointCollider,
  RectangleComponent,
  RectTransform,
  RVOAgent: RVOAgent,
  RVOObstacle: RVOObstacle,
  RVOSimulator: RVOSimulator,
  Stack,
  TextComponent,
  Trash,
  Trashable,
  TriangleCollider,
  TriangleComponent,
};

const Prefabs = {
  Empty,
  Text,
  Camera,
  Canvas,
  CanvasText,
  Rectangle,
  RectangleNoCollider,
  Circle,
  ScreenText,
  RVOSimulator: RVOSimulator$1,
  RVOAgent: RVOAgent$1,
  RVOObstacle: RVOObstacle$1,
};

const Base = {
  Behavior,
  Behaviors: {},
  Component,
  Components,
  GameObject,
  Input,
  Line,
  main,
  Matrix3,
  NameableParent,
  Point,
  Prefabs,
  Scene,
  SceneManager,
  Serializer: new Serializer(Components, Prefabs),
  State: State$1,
  StateMachine,
  Time,
  get _cs(){
    return this.SceneManager.currentScene;
  },
  $ : function(string){
    return this.SceneManager.currentScene.findByName(string);
  }

};

Base.SceneManager.Base = Base;

export default Base;
