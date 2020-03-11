function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import NameableParent from "./NamableParent.js";
import Point from "./Point.js";
import GameObject from "./GameObject.js";

var Scene = /*#__PURE__*/function (_NameableParent) {
  _inherits(Scene, _NameableParent);

  function Scene(name) {
    var _this;

    _classCallCheck(this, Scene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scene).call(this, name));

    _this.start();

    return _this;
  }

  _createClass(Scene, [{
    key: "start2",
    value: function start2() {
      this.children = []; //Load a scene from a declarative syntax

      if (this.objects) {
        this.children = [];

        for (var i = 0; i < this.objects.length; i++) {
          var obj = this.objects[i];
          this.buildChild2(obj, this.children);
        }
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.children = []; //Load a scene from a declarative syntax

      if (this.objects) {
        this.children = [];

        for (var i = 0; i < this.objects.length; i++) {
          var obj = this.objects[i];
          this.buildChild(obj, this.children);
        }
      }
    }
  }, {
    key: "buildChild2",
    value: function buildChild2(obj, parent) {
      var gameObjectType = null;
      var keys = Object.keys(Scene.gameObjects);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key == obj.type) {
          gameObjectType = Scene.gameObjects[key];
          break;
        }
      }

      if (gameObjectType == null) throw "Could now find game object of type " + obj.type;
      var gameObject = this.instantiate(gameObjectType, new Point(obj.location.x, obj.location.y), 0, parent);
      /*let gameObject = new GameObject(obj.location.x, obj.location.y, 1, 1, 0);
      parent.push(gameObject);
      let prefab = gameObjects[gameObjectType.name];
      this.buildIt(prefab, gameObject, gameBehaviors, gameObjects, components);*/

      gameObject.name = obj.name;
      this.buildIt(obj, gameObject);
    }
  }, {
    key: "buildIt",
    value: function buildIt(obj, gameObject) {
      if (obj.children) {
        for (var i = 0; i < obj.children.length; i++) {
          var child = obj.children[i];
          this.buildChild2(child, gameObject.children);
        }
      } //Set the key-pair values on components already on prefabs


      if (obj.componentValues) {
        for (var j = 0; j < obj.componentValues.length; j++) {
          var componentValue = obj.componentValues[j];
          var type = componentValue.type;
          var component = gameObject.getComponent(type);
          var values = componentValue.values;

          for (var k = 0; k < values.length; k++) {
            var value = values[k];
            component[value.key] = value.value;
          }
        }
      } //Add new components


      if (obj.components) {
        for (var _i = 0; _i < obj.components.length; _i++) {
          var componentInfo = obj.components[_i];
          var componentString = componentInfo.type;
          var componentType = null;
          var componentKeys = Object.keys(Scene.components);
          var behaviorKeys = Object.keys(Scene.gameBehaviors);

          for (var _i2 = 0; _i2 < componentKeys.length; _i2++) {
            var key = componentKeys[_i2];

            if (key == componentString) {
              componentType = Scene.components[key];
              break;
            }
          }

          if (componentType == null) {
            for (var _i3 = 0; _i3 < behaviorKeys.length; _i3++) {
              var _key = behaviorKeys[_i3];

              if (_key == componentString) {
                componentType = Scene.gameBehaviors[_key];
                break;
              }
            }
          }

          if (componentType == null) throw "Could not find component " + componentString;

          var _component = new componentType();

          gameObject.addComponent(_component);

          if (componentInfo.values) {
            //Now set the key-value pairs on the new component we just made
            var componentValues = componentInfo.values;

            for (var v = 0; v < componentValues.length; v++) {
              var _value = componentValues[v];
              var _key2 = _value.key;
              var val = _value.value;
              _component[_key2] = val;
            }
          }
        }
      }
    }
  }, {
    key: "buildChild",
    value: function buildChild(obj, parent) {
      var gameObject = this.instantiate(obj.type, obj.location, 0, parent);
      gameObject.name = obj.name;

      if (obj.children) {
        for (var i = 0; i < obj.children.length; i++) {
          var child = obj.children[i];
          this.buildChild(child, gameObject.children);
        }
      }

      if (obj.componentValues) {
        for (var j = 0; j < obj.componentValues.length; j++) {
          var componentValue = obj.componentValues[j];
          var type = componentValue.type;
          var component = gameObject.getComponent(type);
          var values = componentValue.values;

          for (var k = 0; k < values.length; k++) {
            var value = values[k];
            component[value.key] = value.value;
          }
        }
      }

      if (obj.components) {
        for (var _i4 = 0; _i4 < obj.components.length; _i4++) {
          var componentInfo = obj.components[_i4];

          var _component2 = new componentInfo.type();

          gameObject.addComponent(_component2);
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx, width, height) {
      ctx.fillStyle = "cyan";
      ctx.fillRect(0, 0, width, height);
      this.children.filter(function (i) {
        return i.draw;
      }).forEach(function (i) {
        return i.draw(ctx);
      });
    }
  }, {
    key: "update",
    value: function update(collidableType, collisionHelper) {
      this.children.filter(function (i) {
        return i.update;
      }).forEach(function (i) {
        return i.update();
      }); //Add collision behavior

      var collidableChildren = [];
      this.getCollidable(this.children, collidableChildren, collidableType);

      for (var i = 0; i < collidableChildren.length; i++) {
        for (var j = i + 1; j < collidableChildren.length; j++) {
          if (collisionHelper.inCollision(collidableChildren[i], collidableChildren[j])) {
            var gameObjectOne = collidableChildren[i].gameObject;
            var gameObjectTwo = collidableChildren[j].gameObject; //Now loop over all the behaviors too see if any are listening for collision events

            for (var _i5 = 0; _i5 < gameObjectOne.components.length; _i5++) {
              var component = gameObjectOne.components[_i5];
              if (component.onCollisionStay) component.onCollisionStay(collidableChildren[j]);
            }

            for (var _j = 0; _j < gameObjectTwo.components.length; _j++) {
              var _component3 = gameObjectTwo.components[_j];
              if (_component3.onCollisionStay) _component3.onCollisionStay(collidableChildren[i]);
            }
          }
        }
      }
    }
  }, {
    key: "getCollidable",
    value: function getCollidable(children, collidableChildren, type) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];

        try {
          var collidableComponent = child.getComponent(type);

          if (collidableComponent) {
            collidableChildren.push({
              collider: collidableComponent,
              gameObject: child
            });
          }
        } catch (e) {
          var x = 1; //no-op
        }

        for (var j = 0; j < child.children.length; j++) {
          this.getCollidable(child.children[j], collidableChildren);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy(gameObject) {
      this.children = this.children.filter(function (i) {
        return i != gameObject;
      });
    }
  }, {
    key: "instantiate",
    value: function instantiate(gameObjectType, location, rotation, parent) {
      /*let gameObject = new gameObjectType(location.x, location.y);
      gameObject.rotation = rotation;
        parent.push(gameObject);
      gameObject.recursiveCall("start");
      return gameObject*/
      var gameObject = new GameObject(location.x, location.y, 1, 1, rotation);
      parent.push(gameObject);
      var prefab = Scene.gameObjects[gameObjectType.name];
      this.buildIt(prefab, gameObject);
      gameObject.recursiveCall("start");
      return gameObject;
    }
  }], [{
    key: "parse",
    value: function parse(obj) {
      var toReturn = new Scene(obj.name);
      toReturn.objects = obj.objects;
      return toReturn;
    }
  }]);

  return Scene;
}(NameableParent);

_defineProperty(Scene, "gameObjects", []);

_defineProperty(Scene, "components", []);

_defineProperty(Scene, "gameBehaviors", []);

export { Scene as default };