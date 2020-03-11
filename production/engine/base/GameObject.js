function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import NameableParent from "./NamableParent.js";
import Point from "./Point.js";
/**
 * A game object represents a "thing" in a game.
 * a gameOject instance can be a character, part of the background
 * or an invisible container for logic
 */

var GameObject = /*#__PURE__*/function (_NameableParent) {
  _inherits(GameObject, _NameableParent);

  _createClass(GameObject, [{
    key: "location",

    /**
     * The x position of the game object
     */
    get: function get() {
      return new Point(this.x, this.y);
    }
  }]);

  function GameObject() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var scaleX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var scaleY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var rotation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, GameObject);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameObject).call(this));

    _defineProperty(_assertThisInitialized(_this), "x", void 0);

    _defineProperty(_assertThisInitialized(_this), "y", void 0);

    _defineProperty(_assertThisInitialized(_this), "scaleX", void 0);

    _defineProperty(_assertThisInitialized(_this), "scaleY", void 0);

    _defineProperty(_assertThisInitialized(_this), "rotation", void 0);

    _defineProperty(_assertThisInitialized(_this), "components", []);

    var _ref = [x, y, scaleX, scaleY, rotation];
    _this.x = _ref[0];
    _this.y = _ref[1];
    _this.scaleX = _ref[2];
    _this.scaleY = _ref[3];
    _this.rotation = _ref[4];
    return _this;
  }

  _createClass(GameObject, [{
    key: "addComponent",
    value: function addComponent(component) {
      this.components.push(component);
      component.gameObject = this;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scaleX, this.scaleY);
      ctx.rotate(this.rotation);
      this.components.filter(function (i) {
        return i.draw;
      }).forEach(function (i) {
        return i.draw(ctx);
      }); //Now draw all the children

      this.children.filter(function (i) {
        return i.draw;
      }).forEach(function (i) {
        return i.draw(ctx);
      });
      ctx.restore();
    }
  }, {
    key: "update",
    value: function update() {
      this.components.filter(function (i) {
        return i.update;
      }).forEach(function (i) {
        return i.update();
      }); //Now update all the children

      this.children.forEach(function (i) {
        return i.update();
      });
    }
  }, {
    key: "getComponent",
    value: function getComponent(type) {
      if (typeof type === 'string' || type instanceof String) {
        //The user passed us a string, not a type
        //https://stackoverflow.com/a/7772724/10047920
        var component = this.components.find(function (i) {
          return i.constructor.name === type;
        });
        if (component) return component;
        throw "Error, couldn't find type " + type;
      } else {
        var _component = this.components.find(function (i) {
          return i instanceof type;
        });

        if (_component) return _component;
        throw "Error, couldn't find type " + type;
      }
    }
  }, {
    key: "recursiveCall",
    value: function recursiveCall(functionName) {
      for (var i = 0; i < this.components.length; i++) {
        var component = this.components[i];

        if (component[functionName]) {
          component[functionName]();
        }
      } //Now call the function on the children


      for (var _i = 0; _i < this.children.length; _i++) {
        var child = this.children[_i];
        child.recursiveCall(functionName);
      }
    }
  }]);

  return GameObject;
}(NameableParent);

export { GameObject as default };