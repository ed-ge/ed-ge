import Base from "../../../src/Base.js"
import chai from "chai";

describe("Engine", function () {
    describe("Components", function () {
        describe("AABBCollider class", function () {
            describe("Member Variables", function () {
                let box = new Base.Components.AABBCollider();
                box.width = 100;
                box.height = 200;
                it("Can set width", function () {
                    chai.expect(box.width).to.equal(100);
                })
                it("Can set height", function () {
                    chai.expect(box.height).to.equal(200);
                })
            })
        })
    })
});