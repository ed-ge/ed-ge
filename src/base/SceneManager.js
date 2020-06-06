import Scene from "./Scene.js"
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
    this.scenes = [];
    this.currentSceneIndex = -1;
  },

  addScene(scene) {
    this.scenes.push(scene);
  },

  destroy(gameObject) {
    this.currentScene.destroy(gameObject);
  },
  instantiate(gameObjectType, location, scale, rotation) {
    return this.Base.Serializer.instantiate(gameObjectType, location, scale, rotation, this.currentScene);
    // return this.currentScene.instantiate(gameObjectType, location, scale, rotation, this.currentScene);
  }


}

export default SceneManager;