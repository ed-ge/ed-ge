import Engine from "../../../src/Engine/Engine.js"
import Point from "../../../src/engine/base/Point.js";
import AABBCollider from "../../../src/Engine/components/AABBCollider.js";
import CollisionHelper from "../../../src/Engine/components/CollisionHelper.js";
import CircleCollider from "../../../src/Engine/components/CircleCollider.js";
import PointCollider from "../../../src/Engine/components/PointCollider.js";

let assert = chai.assert;
let expect = chai.expect;

function quickBuild(x, y, collider) {
    let gameObject = new Engine.Base.GameObject();
    gameObject.x = x;
    gameObject.y = y;
    return { gameObject, collider };
}

function doubleCheck(one, two, bool) {
    expect(CollisionHelper.inCollision(one, two)).to.equal(bool)
    expect(CollisionHelper.inCollision(two, one)).to.equal(bool)
}

function all(x1, y1, collider1, x2, y2, collider2, bool) {
    let one = quickBuild(x1, y1, collider1);
    let two = quickBuild(x2, y2, collider2);
    doubleCheck(one, two, bool)
}

describe("CollisionHelper class", function () {
    describe("Point Collisions", function () {
        let point = new PointCollider();
        describe("Point/Circle Collisions", function () {
            let circle = new CircleCollider();
            it("Points collide with circles they are in.", function () {
                circle.radius = 1;
                all(0, 0, point, 0, 0, circle, true)
            });
            it("Points don't collide with circles they are not in.", function () {
                circle.radius = 1;
                all(2, 0, point, 0, 0, circle, false)
                all(0, 0, point, 2, 0, circle, false)
            });
        })
        describe("Point/AABB Collisions", function () {
            let aabb = new AABBCollider();
            it("Points collide with AABB they are in.", function () {
                aabb.width = 1;
                aabb.height = 1
                all(0, 0, point, 0, 0, aabb, true)
                all(.25, .25, point, 0, 0, aabb, true)
                all(-.25, -.25, point, 0, 0, aabb, true)
                all(-1.25, -1.25, point, -1, -1, aabb, true)

            })
            it("Points don't collide with AABB they are not in.", function () {
                aabb.width = 1;
                aabb.height = 2
                all(2, 0, point, 0, 0, aabb, false)
                all(-1.25, -1.25, point, 1, 1, aabb, false)

            })
        })
    })
    describe("Circle Collisions", function () {
        let circle = new CircleCollider()
        describe("Circle/AABB Collisions", function () {
            let aabb = new AABBCollider()
            it("Circles collide with AABBs they touch", function () {
                circle.radius = 1;
                aabb.width = 1;
                aabb.height = 1
                all(0,0,circle, 0,0, aabb, true)
                
            })
            it("Circles don't collide with AABBs they don't touch", function () {
                all(2,0,circle, 0,0, aabb, false)

            })
        })
    })

});