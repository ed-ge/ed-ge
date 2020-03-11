function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Point = /*#__PURE__*/function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: "distance",
    value: function distance(otherPoint) {
      return Math.sqrt(this.distanceSquared(otherPoint));
    }
  }, {
    key: "distanceSquared",
    value: function distanceSquared(otherPoint) {
      var xDiff = this.x - otherPoint.x;
      var yDiff = this.y - otherPoint.y;
      return xDiff * xDiff + yDiff * yDiff;
    }
  }]);

  return Point;
}();

export { Point as default };