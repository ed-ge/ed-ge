function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Base from "../../engine/Base.js";
import TileBehavior from "./TileBehavior.js";
import Tile from "../prefabs/Tile.js";
import SceneManager from "../SceneManager.js";
import Point from "../../engine/base/Point.js";
import GameObjects from "../GameObjects.js";

var NapsterBehavior = /*#__PURE__*/function (_Base$Behavior) {
  _inherits(NapsterBehavior, _Base$Behavior);

  function NapsterBehavior() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NapsterBehavior);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NapsterBehavior)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "peons", []);

    _defineProperty(_assertThisInitialized(_this), "characterX", 0);

    _defineProperty(_assertThisInitialized(_this), "characterY", 0);

    _defineProperty(_assertThisInitialized(_this), "strategyCharacter", {});

    _defineProperty(_assertThisInitialized(_this), "marginX", 100);

    _defineProperty(_assertThisInitialized(_this), "marginY", 100);

    _defineProperty(_assertThisInitialized(_this), "tilesWide", 8);

    _defineProperty(_assertThisInitialized(_this), "tilesHigh", 5);

    return _this;
  }

  _createClass(NapsterBehavior, [{
    key: "start",
    value: function start() {
      for (var y = 0; y < this.tilesHigh; y++) {
        this.peons.push([]);

        for (var x = 0; x < this.tilesWide; x++) {
          var _x = x * 100 + this.marginX;

          var _y = y * 100 + this.marginY;

          var tile = SceneManager.instantiate(Tile, new Base.Point(_x, _y), 0);
          this.gameObject.children.push(tile);
          this.peons[y].push(tile); //Randomly assign water

          var waterBehavior = tile.getComponent(TileBehavior);

          if (Math.random() < .1 && y != 0 && x != 0) {
            waterBehavior.isWater = true;
          }
        }
      }

      this.select(0, 0); //Add the strategy character

      this.strategyCharacter = SceneManager.instantiate(GameObjects.StrategyCharacter, new Point(this.marginX, this.marginY), 0);
    }
  }, {
    key: "update",
    value: function update() {
      var proposedX = this.characterX;
      var proposedY = this.characterY;

      if (Base.Input.getKeyUp('ArrowUp')) {
        proposedY -= 1;
      }

      if (Base.Input.getKeyUp('ArrowDown')) {
        proposedY += 1;
      }

      if (Base.Input.getKeyUp('ArrowLeft')) {
        proposedX -= 1;
      }

      if (Base.Input.getKeyUp('ArrowRight')) {
        proposedX += 1;
      }

      if (proposedX >= 0 && proposedX < this.tilesWide && proposedY >= 0 && proposedY < this.tilesHigh) {
        var tileBehavior = this.peons[proposedY][proposedX].getComponent(TileBehavior);

        if (!tileBehavior.isWater) {
          this.characterX = proposedX;
          this.characterY = proposedY;
          this.strategyCharacter.x = this.marginX + this.characterX * 100;
          this.strategyCharacter.y = this.marginY + this.characterY * 100;
          this.select(this.characterX, this.characterY);
        }
      }
    }
  }, {
    key: "select",
    value: function select(_x, _y) {
      for (var y = 0; y < this.tilesHigh; y++) {
        for (var x = 0; x < this.tilesWide; x++) {
          var tile = this.peons[y][x];
          var behavior = tile.getComponent(TileBehavior);
          if (x != _x || y != _y) behavior.hasCharacter = false;else behavior.hasCharacter = true;
        }
      }
    }
  }]);

  return NapsterBehavior;
}(Base.Behavior);

export { NapsterBehavior as default };