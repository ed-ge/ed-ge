import Engine from "../../../src/Engine/Engine.js"
import Point from "../../../src/engine/base/Point.js";
import AABBCollider from "../../../src/Engine/components/AABBCollider.js";
import CollisionHelper from "../../../src/Engine/components/CollisionHelper.js";
import CircleCollider from "../../../src/Engine/components/CircleCollider.js";
import PointCollider from "../../../src/Engine/components/PointCollider.js";

let assert = chai.assert;
let expect = chai.expect;

describe("CollisionHelper class", function() {
    describe("Point Collisions", function() {
        describe("Point/Circle Collisions", function() {


            it("Points collide with circles they are in.", function() {
                let point = new PointCollider();
                let circle = new CircleCollider();
                circle.radius = 1;
                let one = {
                    gameObject: new Engine.Base.GameObject(),
                    collider: point
                }
                let two = {
                    gameObject: new Engine.Base.GameObject(),
                    collider: circle
                }
                expect(CollisionHelper.inCollision(one, two)).to.equal(true);
                expect(CollisionHelper.inCollision(two, one)).to.equal(true);
            })

        })
    })

});