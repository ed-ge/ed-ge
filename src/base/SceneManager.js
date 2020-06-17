import Scene from "./Scene.js"
import GameObject from "./GameObject.js"
import Point from "./Point.js"
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
  instantiate(gameObjectType, location, scale, rotation) {
    if (arguments.length != 4 ||
      !(typeof gameObjectType == "string") ||
      !(location instanceof Point) ||
      !(scale instanceof Point) ||
      !(typeof rotation == "number")

    ) throw new Error("SceneManager.instantiate expects four arguments of type string, Base.Point, Base.Point, and float")

    return this.Base.Serializer.instantiate({name:gameObjectType}, location, scale, rotation, this.currentScene);
    // return this.currentScene.instantiate(gameObjectType, location, scale, rotation, this.currentScene);
  }


}

export default SceneManager;