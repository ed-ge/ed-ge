import Base from "../Base.js"
import { Vector2, RVOMath } from "../../lib/crowds/common.js"
import Simulator from "../../lib/crowds/simulator.js"
import GameObject from "../base/GameObject.js"


class CrowdSimulationPlugin {
  constructor() {
    this.simulators = [];
  }
  OnNewScene(scene) {
    let simulator = this.bootSimulator();
    let toAdd = { scene: scene.uuid, simulator };
    this.simulators.push(toAdd);
    for(let i = 0; i < scene.children.length; i++){
      this.OnNewChild(scene.children[i], scene);
    }
  }
  OnNewChild(gameObject, highestParent) {
    //if (arguments.length != 1 || !(gameObject instanceof GameObject)) throw new Error("newChildEvent expects exactly one argument of type GameObject")
    let simulatorObject = this.simulators.find(s => s.scene == highestParent.uuid);
    if (!simulatorObject)
      return //The scene hasn't been initialized yet
    let simulator = simulatorObject.simulator;
    if (gameObject.anyComponent("RVOAgent")) {

      simulator.addAgent(new Vector2(gameObject.x, gameObject.y), gameObject);

      let RVOAgent = gameObject.getComponent("RVOAgent");
      let destination = RVOAgent.destination;
      if (typeof destination === 'string' || destination instanceof String) {//It's probably still a stringified point object
        destination = JSON.parse(destination);
        RVOAgent.destination = destination;

      }
      let goal = new Vector2(destination.x, destination.y)
      simulator.addGoal(goal)
      let i = simulator.getNumAgents() - 1
      RVOAgent._id = i;
      //this.updateRVOAgent(gameObject, simulator);
      //Check to see if our destination has changed
      
      simulator.setAgentPrefVelocity(i, RVOMath.normalize(goal.minus(simulator.getAgentPosition(i))));
 
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

      simulator.addObstacle([a, b]);
      simulator.addObstacle([b, c]);
      simulator.addObstacle([c, d]);
      simulator.addObstacle([d, a]);

      simulator.processObstacles();
    }
    for(let i = 0; i < gameObject.children.length; i++){
      let child = gameObject.children[i];
      this.OnNewChild(child, highestParent);
    }
  }
  bootSimulator() {
    let simulator = new Simulator();

    simulator.setAgentDefaults(
      30, // neighbor distance (min = radius * radius)
      30, // max neighbors
      100, // time horizon
      10, // time horizon obstacles
      1.5, // agent radius
      1.0, // max speed
      new Vector2(1, 1) // default velocity
    );

    simulator.setTimeStep(.25);
    simulator.addObstacle([]);
    simulator.processObstacles();
    return simulator;
  }
  updateRVOAgent(gameObject, simulator) {
    //if (arguments.length != 1 || !(gameObject instanceof GameObject)) throw new Error("updateRVOAgent expects exactly one argument of type GameObject")

    let RVOAgent = gameObject.getComponent("RVOAgent");
    let i = RVOAgent._id;
    let destination = RVOAgent.destination;
    let goal = new Vector2(destination.x, destination.y)
    //simulator.setGoal(goal, i)
 }
  update() {

    let simulator = this.simulators.find(x=>x.scene == Base.$$.uuid).simulator;
    
    let collidableType = Base.Serializer.components.Collider;
    let collisionHelper = Base.Serializer.components.CollisionHelper;

    let toUpdate = Base.$$.recurseFindAllWithComponent(Base.Components.RVOAgent);

    //Check to see if anyone's destinantion has changed
    for(let i = 0; i < toUpdate.length; i++){
      let agent = toUpdate[i].gameObject;
      let RVOComponent = agent.getComponent("RVOAgent");
      let goal = new Vector2(RVOComponent.destination.x, RVOComponent.destination.y);
      let id = RVOComponent._id;
      let storedGoal = simulator.getGoal(id);
      if(storedGoal.x != goal.x || storedGoal.y != goal.y ){
        simulator.setGoal(new Vector2(goal.x, goal.y));
        simulator.setAgentPrefVelocity(id, RVOMath.normalize(goal.minus(simulator.getAgentPosition(id))));
      }
    }

    
    let collidableChildren = [];
    this.getCollidable(Base.$$, collidableChildren, collidableType);
    simulator.run();
    //
    // Now we simulate the crowds
    //

    // Go back and update the gameObjects represented by the agents
    let numAgents = simulator.getNumAgents();
    for (let i = 0; i < numAgents; i++) {
      let gameObject = simulator.getAgentGameObject(i);
      let position = simulator.getAgentPosition(i);
      gameObject.x = position.x;
      gameObject.y = position.y;
      if (RVOMath.absSq(simulator.getGoal(i).minus(simulator.getAgentPosition(i))) < 10) {
        // Agent is within one radius of its goal, set preferred velocity to zero
        simulator.setAgentPrefVelocity(i, new Vector2(0.0, 0.0));
      } else {
        // Agent is far away from its goal, set preferred velocity as unit vector towards agent's goal.
        simulator.setAgentPrefVelocity(i, RVOMath.normalize(simulator.getGoal(i).minus(simulator.getAgentPosition(i))));
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
}

export default CrowdSimulationPlugin;