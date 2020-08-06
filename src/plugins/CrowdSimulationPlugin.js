import Base from "../Base.js"
import { Vector2, RVOMath } from "../../lib/crowds/common.js"

class CrowdSimulationPlugin {
  constructor() {

  }
  update() {
    let collidableType = Base.Serializer.components.Collider;
    let collisionHelper = Base.Serializer.components.CollisionHelper;

    let collidableChildren = [];
    this.getCollidable(Base.$$, collidableChildren, collidableType);

    let simulator = Base.$$.simulator;
    //
    // Now we simulate the crowds
    //
    simulator.run();

    // Go back and update the gameObjects represented by the agents
    let numAgents =simulator.getNumAgents();
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