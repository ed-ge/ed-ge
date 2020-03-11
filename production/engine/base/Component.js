function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Components are attached to game objects.
 * Examples of components are behaviors, renderers, and colliders
 */
var Component = function Component() {
  _classCallCheck(this, Component);

  _defineProperty(this, "gameObject", void 0);
};

export { Component as default };