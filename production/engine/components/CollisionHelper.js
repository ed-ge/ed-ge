function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import CircleCollider from "./CircleCollider.js";
import PointCollider from "./PointCollider.js";

var CollisionHelper = /*#__PURE__*/function () {
  function CollisionHelper() {
    _classCallCheck(this, CollisionHelper);
  }

  _createClass(CollisionHelper, null, [{
    key: "inCollision",
    value: function inCollision(one, two) {
      if (one.collider instanceof CircleCollider && two.collider instanceof PointCollider) {
        var distance = one.gameObject.location.distance(two.gameObject.location);
        if (distance < one.collider.radius) return true;
        return false;
      } else if (one.collider instanceof PointCollider && two.collider instanceof CircleCollider) {
        return this.inCollision(two, one);
      }
    }
  }]);

  return CollisionHelper;
}();

export { CollisionHelper as default };