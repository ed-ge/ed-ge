import Engine from "./Engine.js"
import Base from "./Base.js"
import GameBehaviors from "../game/GameBehaviors.js";
import GameObjects from "../game/GameObjects.js";

const SceneManager = {
  /** Orginally from scene */
  
  scenes: [],
  
  _currentSceneIndex: -1,
  get currentScene() {
    if (this._currentSceneIndex == -1) throw "Current scene index not set. Cannot get current scene."
    if (this.scenes.length == 0) throw "There are no scenes in the scene manager. Cannot get current scene."
    if (this._currentSceneIndex >= this.scenes.length) throw "Current scene index is out of bounds. Cannot get current scene."
    return this.scenes[this._currentSceneIndex];
  },

  set currentScene(argument) {
    if (argument instanceof Engine.Base.Scene) {
      let index = this.scenes.indexOf(argument);
      if (index != -1) {
        this._currentSceneIndex = index;
      }
      else {
        this.scenes.push(argument);
        this._currentSceneIndex == this.scenes.length - 1;
      }
    }
    else {
      if (typeof argument === "string") {
        let index = this.scenes.findIndex(i => i.name == argument);
        if (index != -1) {
          this._currentSceneIndex = index;
        }
        else throw "No scene has that name. Current scene index not set."
      }
      else {
        let index = +argument;
        if (index < 0) throw "Index is out of bounds. Current scene index not set."
        if (index >= this.scenes.length) throw "Index is out of bounds. Current scene index not set."
        this._currentSceneIndex = +argument;
      }
    }
    this.scenes[this._currentSceneIndex].start2(Base.Globals.GameBehaviors, Base.Globals.GameObjects, Engine.Components);
  },

  addScene(scene) {
    this.scenes.push(scene);
  },

  destroy(gameObject) {
    this.currentScene.destroy(gameObject);
  },
  instantiate(gameObjectType, location, scale, rotation) {
    return this.currentScene.instantiate(gameObjectType, location, scale, rotation, this.currentScene.children);
  }


}

export default SceneManager;