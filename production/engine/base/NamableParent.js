function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NameableParent = function NameableParent(name) {
  _classCallCheck(this, NameableParent);

  _defineProperty(this, "children", []);

  _defineProperty(this, "name", "");

  this.name = name;
};

export { NameableParent as default };