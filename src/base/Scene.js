import NameableParent from "./NamableParent.js"
import GameObject from "./GameObject.js";
import { Vector2, RVOMath } from "../../lib/crowds/common.js"
import Simulator from "../../lib/crowds/simulator.js"
import Base from "../Base.js"
import grammar from "../sceneGrammar.js"
import nearley from "../../lib/lexer/nearley.js"

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
      console.error("Scene constructor expects 4 argumens.")

      const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
      
      parser.feed(definition.trim());
      // console.log(JSON.stringify(parser.results));
      
      let r = parser.results;
      super(r[0].name)
      this.bootSimulator();
      Base.Serializer.FromEdge(r[0]).forEach(x=>this.addChild(x));
    
     this.components = components;
    this.layers = ["background", null, "foreground"];

    
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
      if(typeof destination === 'string' || destination instanceof String){//It's probably still a stringified point object
        destination = JSON.parse(destination);
        RVOAgent.destination = destination;

      }
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

    
    /**
     * Now run the simulators
     */

    let collidableChildren = [];
    this.getCollidable(this, collidableChildren, collidableType);

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
  

  

  // /**
  //  * Convert the point in screen space to world space
  //  * @param {Base.Point} position 
  //  */
  // toWorldSpace(position) {
  //   let cameras = this.children.filter(i => i.anyComponent("CameraComponent"))
  //   let point = position.clone();

  //   if (cameras.length > 0 && this.lastCtx) {

  //     let camera = cameras[0];
  //     let [tx, ty, sx, sy, r, hx, hy] = [camera.x, camera.y, camera.scaleX, camera.scaleY, camera.rotation, this.lastCtx.canvas.width / 2, this.lastCtx.canvas.height / 2];

  //     point.x = (point.x - hx) / sx + tx;
  //     point.y = (point.y - hy) / sy + ty;
  //   }
  //   return point
  // }

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