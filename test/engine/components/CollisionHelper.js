import Engine from "../../../src/Engine/Engine.js"
import Point from "../../../src/engine/base/Point.js";
import AABBCollider from "../../../src/Engine/components/AABBCollider.js";
import CollisionHelper from "../../../src/Engine/components/CollisionHelper.js";
import CircleCollider from "../../../src/Engine/components/CircleCollider.js";
import PointCollider from "../../../src/Engine/components/PointCollider.js";
import TriangleCollider from "../../../src/Engine/components/TriangleCollider.js";
import ConvexCollider from "../../../src/Engine/components/ConvexCollider.js";

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
        describe("Point/Triangle Collisions", function () {
            let triangle = new TriangleCollider();
            it("Points collide with Triangles they are in.", function () {
                expect(true).to.be(false)

            })
            it("Points don't collide with Triangles they are not in.", function () {
                expect(true).to.be(false)

            })
        })
        describe("Point/Convex Collisions", function () {
            let convex = new ConvexCollider();
            it("Points collide with Convex Colliders they are in.", function () {
                

            })
            it("Points don't collide with Convex Colliders they are not in.", function () {
                expect(true).to.be(false)


            })
        })
    })
    describe("Circle Collisions", function () {
        let circle = new CircleCollider()
        describe("Circle/Circle Collisions", function () {
            let circle2 = new CircleCollider()
            it("Circles collide with Circles they touch", function () {
                circle.radius = 1;
                circle2.radius = 2
                
                all(0,0,circle, 0,0, circle2, true)
                
            })
            it("Circles don't collide with Circles they don't touch", function () {
                all(2,0,circle, -1,0, circle2, false)

            })
        })
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
        describe("Circle/Triangle Collisions", function () {
            let triangle = new TriangleCollider();
            it("Circles collide with Triangles they are in.", function () {
                expect(true).to.be(false)

            })
            it("Circles don't collide with Triangles they are not in.", function () {
                expect(true).to.be(false)

            })
        })
        describe("Circle/Convex Collisions", function () {
            let convex = new ConvexCollider();
            it("Circles collide with Convex Colliders they are in.", function () {
                

            })
            it("Circles don't collide with Convex Colliders they are not in.", function () {
                expect(true).to.be(false)


            })
        })
    })
    describe("AABB Collisions", function(){
        describe("Circle/AABB Collisions", function () {
            let aabb = new AABBCollider()
            it("AABBs collide with AABBs they touch", function () {
               expect(true).to.be(false)
                
            })
            it("AABBs don't collide with AABBs they don't touch", function () {
               expect(true).to.be(false)

            })
        })
        describe("AABB/Triangle Collisions", function () {
            let triangle = new TriangleCollider();
            it("AABBs collide with Triangles they are in.", function () {
                expect(true).to.be(false)

            })
            it("AABBs don't collide with Triangles they are not in.", function () {
                expect(true).to.be(false)

            })
        })
        describe("AABB/Convex Collisions", function () {
            let convex = new ConvexCollider();
            it("AABBs collide with Convex Colliders they are in.", function () {
                

            })
            it("AABBs don't collide with Convex Colliders they are not in.", function () {
                expect(true).to.be(false)


            })
        })

    })
    describe("TRiangle Collisions", function(){
        let tri = new TriangleCollider()
        describe("Triangle/Triangle Collisions", function () {
            let triangle = new TriangleCollider();
            it("Triangles collide with Triangles they are in.", function () {
                expect(true).to.be(false)

            })
            it("Triangles don't collide with Triangles they are not in.", function () {
                expect(true).to.be(false)

            })
        })
        describe("Triangles/Convex Collisions", function () {
            let convex = new ConvexCollider();
            it("Triangles collide with Convex Colliders they are in.", function () {
                

            })
            it("Triangles don't collide with Convex Colliders they are not in.", function () {
                expect(true).to.be(false)


            })
        })

    })


});