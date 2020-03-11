function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Engine from "../engine/Engine.js";
import GameBehaviors from "./GameBehaviors.js";
import GameObjects from "./GameObjects.js";

var SceneManager = /*#__PURE__*/function () {
  function SceneManager() {
    _classCallCheck(this, SceneManager);
  }

  _createClass(SceneManager, null, [{
    key: "addScene",
    value: function addScene(scene) {
      this.scenes.push(scene);
    }
  }, {
    key: "destroy",
    value: function destroy(gameObject) {
      this.currentScene.destroy(gameObject);
    }
  }, {
    key: "instantiate",
    value: function instantiate(gameObjectType, location, rotation) {
      return this.currentScene.instantiate(gameObjectType, location, rotation, this.currentScene.children);
    }
  }, {
    key: "currentScene",
    get: function get() {
      if (this._currentSceneIndex == -1) throw "Current scene index not set. Cannot get current scene.";
      if (this.scenes.length == 0) throw "There are no scenes in the scene manager. Cannot get current scene.";
      if (this._currentSceneIndex >= this.scenes.length) throw "Current scene index is out of bounds. Cannot get current scene.";
      return this.scenes[this._currentSceneIndex];
    },
    set: function set(argument) {
      if (argument instanceof Engine.Base.Scene) {
        var index = this.scenes.indexOf(argument);

        if (index != -1) {
          this._currentSceneIndex = index;
        } else {
          this.scenes.push(argument);
          this._currentSceneIndex == this.scenes.length - 1;
        }
      } else {
        if (typeof argument === "string") {
          var _index = this.scenes.findIndex(function (i) {
            return i.name == argument;
          });

          if (_index != -1) {
            this._currentSceneIndex = _index;
          } else throw "No scene has that name. Current scene index not set.";
        } else {
          var _index2 = +argument;

          if (_index2 < 0) throw "Index is out of bounds. Current scene index not set.";
          if (_index2 >= this.scenes.length) throw "Index is out of bounds. Current scene index not set.";
          this._currentSceneIndex = +argument;
        }
      }

      this.scenes[this._currentSceneIndex].start2(GameBehaviors, GameObjects, Engine.Components);
    }
  }]);

  return SceneManager;
}();

_defineProperty(SceneManager, "scenes", []);

_defineProperty(SceneManager, "_currentSceneIndex", -1);

export { SceneManager as default };