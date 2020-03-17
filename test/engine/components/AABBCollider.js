import Engine from "../../../src/Engine/Engine.js"
import Point from "../../../src/engine/base/Point.js";
import AABBCollider from "../../../src/Engine/components/AABBCollider.js";

let assert = chai.assert;
let expect = chai.expect;

describe("AABBCollider class", function() {
    describe("Member Variables", function() {
        let box = new AABBCollider();
        box.width = 100;
        box.height = 200;
        it("Can set width", function() {
            expect(box.width).to.equal(100);
        })
        it("Can set height", function() {
            expect(box.height).to.equal(200);
        })
    })

});