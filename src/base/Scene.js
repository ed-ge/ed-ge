import NameableParent from "./NamableParent.js"
import GameObject from "./GameObject.js";
import PointCollider from "../components/PointCollider.js";
import Input from "./Input.js"
import { Vector2, Line, Obstacle, KeyValuePair, RVOMath } from "../../lib/common.js"
import Simulator from "../../lib/simulator.js"
import Base from "../Base.js"
import CollisionHelper from "../components/CollisionHelper.js";

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
      throw new Error("Scene constructor expects 4 argumens.")



    // let chunks = definition.split(/(\r?\n){2,}/);
    // chunks = chunks.filter(c=>c.trim().length > 0);
    // if(chunks.length == 0)
    //   throw new Error("Scene definition was empty.")
    // let nameString = chunks.shift();
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




    // for (let i = 0; i < chunks.length; i++) {

    // }

    //this.objects = definition.objects;

    this.prefabs = prefabs;
    this.behaviors = behaviors;
    this.components = components;

    this.layers = ["background", null, "foreground"];

    this.frameMouseOver = [];
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
      })
    }
  }

  newChildEvent(gameObject) {
    if (arguments.length != 1 || !(gameObject instanceof GameObject)) throw new Error("newChildEvent expects exactly one argument of type GameObject")
    if (gameObject.anyComponent("RVOAgent")) {
      this.simulator.addAgent(new Vector2(gameObject.x, gameObject.y), gameObject);

      let RVOAgent = gameObject.getComponent("RVOAgent");
      let destination = RVOAgent.destination;
      let goal = new Vector2(destination.x, destination.y)
      this.simulator.addGoal(goal)
      let i = this.simulator.getNumAgents() - 1
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
      let c = new Vector2(rx + width, ry + height)
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
    //Sort them by layer
    this.children.filter(i => i.draw && !i.anyComponent("CanvasComponent") && i.layer == "Background").forEach(i => i.draw(ctx));
    this.children.filter(i => i.draw && !i.anyComponent("CanvasComponent") && !i.layer).forEach(i => i.draw(ctx));
    this.children.filter(i => i.draw && !i.anyComponent("CanvasComponent") && i.layer == "Foreground").forEach(i => i.draw(ctx));

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
        if (collisionHelper.inCollision(collidableChildren[i], collidableChildren[j])) {

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

    //
    //Now go through and see if the point represented by the mouse collides with any of the colliders
    //
    //First get the world space position of the mouse
    let cameras = this.children.filter(i => i.anyComponent("CameraComponent"))
    let point = { x: 0, y: 0 };
    point.x = parseInt(Input.mousePosition.x);
    point.y = parseInt(Input.mousePosition.y);
    let screenPoint = { x: point.x, y: point.y };
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

        //Now loop over all the behaviors too see if any are listening for collision events
        for (let i = 0; i < gameObjectOne.components.length; i++) {
          let component = gameObjectOne.components[i];
          if (component.onMouseOver) {
            component.onMouseOver();
            if (!this.frameMouseOver.includes(component)) {
              if (component.onMouseEnter) {
                component.onMouseEnter()
              }
              this.frameMouseOver.push(component);
            } 
          }
          if (component.onMouseDown) {
            if (Input.getMouseButtonDown(0))
              component.onMouseDown()
          }
          if (component.onMouseUp) {
            if (Input.getMouseButtonUp(0))
              component.onMouseUp()
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
      let cameras = this.children.filter(i => i.anyComponent("CameraComponent"))
      let point = { x: 0, y: 0 };
      point.x = parseInt(touches[0].x);
      point.y = parseInt(touches[0].y);
      let screenPoint = { x: point.x, y: point.y };
      if (cameras.length == 0) {
      }
      else {
        /* point = Input.mousePosition;*/
        //Put in transform code here
        let camera = cameras[0];

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
      }

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

          //Now loop over all the behaviors too see if any are listening for collision events
          for (let i = 0; i < gameObjectOne.components.length; i++) {
            let component = gameObjectOne.components[i];
            if (component.onTouchOver)
              component.onTouchOver();
            if (component.onTouchStart) {
              if (Input.getTouchesStart() && Input.getTouchesStart().length > 0)
                component.onTouchStart()
            }
            if (component.onTouchEnd) {
              if (Input.getTouchesEnd() && Input.getTouchesEnd().length > 0)
                component.onTouchEnd()
            }
          }
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
    let goal = new Vector2(destination.x, destination.y)
    this.simulator.setGoal(goal, i)
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

export default Scene;