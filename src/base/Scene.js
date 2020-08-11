import NameableParent from "./NamableParent.js"
import GameObject from "./GameObject.js";
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

    let r = parser.results;
    super(r[0].name)
    //this.bootSimulator();
    Base.Serializer.FromEdge(r[0]).forEach(x => this.addChild(x));

    this.components = components;
    this.layers = ["background", null, "foreground"];
    this.lastCtx = null;
    
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
    Base.Plugins.filter(x=>x.sceneBoot).forEach(x=>x.sceneBoot(this));
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
  }

}

export default Scene;