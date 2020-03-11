function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Input = /*#__PURE__*/function () {
  function Input() {
    _classCallCheck(this, Input);
  }

  _createClass(Input, null, [{
    key: "swapUpDownArrays",
    //---------------------------------------------------
    //Key handling members
    //---------------------------------------------------
    //What is the current state of each key?
    //Did the key go down this frame?
    //Did the key do up this frame?
    //When we start an update(), we shift to these arrays so we don't have mutating arrays mid-update
    //---------------------------------------------------
    //Mouse handling members
    //---------------------------------------------------
    //What is the current State of the each button?
    //Did the mouse button go down this frame?
    //Did the mouse button go up this frame?
    //When we start an update(), we shift these arrays so we don't have mutating arrays mid-update
    value: function swapUpDownArrays() {
      this.frameDown = this.down;
      this.frameUp = this.up;
      this.down = [];
      this.up = [];
      this.frameMouseButtonsDown = this.mouseButtonsDown;
      this.frameMouseButtonsUp = this.mouseButtonsUp;
      this.mouseButtonsDown = [];
      this.mouseButtonsUp = [];
    } //---------------------------------------------------
    //Key handling functions
    //---------------------------------------------------
    //Did the key come up this frame?

  }, {
    key: "getKeyUp",
    value: function getKeyUp(key) {
      return this.frameUp[key];
    } //Did the key go down the frame? [Remember, the OS may make it look like key repeated when they did not]

  }, {
    key: "getKeyDown",
    value: function getKeyDown(key) {
      return this.frameDown[key];
    } //Is the key pressed? Down (true) Up (false)

  }, {
    key: "getKey",
    value: function getKey(key) {
      return this.keys[key];
    } //---------------------------------------------------
    //Mouse handling functions
    //---------------------------------------------------
    //Did the mouse button come up this frame?

  }, {
    key: "getMouseButtonUp",
    value: function getMouseButtonUp(button) {
      return this.frameMouseButtonsUp[button];
    } //Did the mouse button go down this frame?

  }, {
    key: "getMouseButtonDown",
    value: function getMouseButtonDown(button) {
      return this.frameMouseButtonsDown[button];
    } //Is the mouse button pressed? Down (true) Up (false)

  }, {
    key: "getMouseButton",
    value: function getMouseButton(button) {
      return this.mouseButtons[button];
    }
  }]);

  return Input;
}();

_defineProperty(Input, "keys", []);

_defineProperty(Input, "down", []);

_defineProperty(Input, "up", []);

_defineProperty(Input, "frameDown", []);

_defineProperty(Input, "frameUp", []);

_defineProperty(Input, "mouseButtons", []);

_defineProperty(Input, "mouseButtonsDown", []);

_defineProperty(Input, "mouseButtonsUp", []);

_defineProperty(Input, "frameMouseButtonsDown", []);

_defineProperty(Input, "frameMouseButtonsUp", []);

export { Input as default };