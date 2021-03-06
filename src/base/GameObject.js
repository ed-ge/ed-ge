import NameableParent from "./NamableParent.js"
import Point from "./Point.js";
import RectTransform from "../components/RectTransform.js";
import Matrix3 from "./Matrix3.js";
import Component from "./Component.js"
import Base from "../Base.js";

/**
 * A game object represents a "thing" in a game.
 * a gameOject instance can be a character, part of the background
 * or an invisible container for logic
 */
class GameObject extends NameableParent {
  


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
    this.children.filter(i => i.draw).forEach(i => i.draw(ctx))

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
      for(let i = 0; i < this.children.length; i++){
        let found = this.children[i].getComponent(type);
        if(found) return found;
      }
      return null;
    } else {
      let component;
        component = this.components.find(i => i instanceof type);
        return component;
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

export default GameObject;