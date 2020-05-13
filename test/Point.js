import Base from "../src/engine/Base.js"
import chai from "chai";

let assert = chai.assert;
let expect = chai.expect;

describe("Point class", function() {
    describe("Constructor", function() {
        it("Defaults to zeros", function() {
            let point = new Base.Point()
            expect(point.x).to.equal(0)
            expect(point.y).to.equal(0)
            expect(true).to.equal(true);
        })

        it("The y value defaults to 0", function() {
            let point = new Base.Point(1)
            expect(point.x).to.equal(1)
            expect(point.y).to.equal(0)
        })

        it("Retains both arguments when present", function() {
            let point = new Base.Point(1, 2)
            expect(point.x).to.equal(1)
            expect(point.y).to.equal(2)
        })
    })

    describe("distance method", function() {
        it("Defaults to Point(0,0) when no arguments is given", function() {
            let point = new Base.Point(3, 4);
            expect(point.distance()).to.equal(5);
        })
        it("Calculates the distance between two points", function() {
            let pointA = new Base.Point(1, 1);
            let pointB = new Base.Point(1, 2);
            expect(pointA.distance(pointB)).to.equal(1);
        })
    });

    describe("distance squared method", function() {
        it("Defaults to Point(0,0) when no arguments is given", function() {
            let point = new Base.Point(3, 4);
            expect(point.distanceSquared()).to.equal(25);
        })
        it("Calculates the distance between two points", function() {
            let pointA = new Base.Point(1, 1);
            let pointB = new Base.Point(1, 2);
            expect(pointA.distanceSquared(pointB)).to.equal(1);
        })
        it("Calculates the distance between two points", function() {
            let pointA = new Base.Point(1, 1);
            let pointB = new Base.Point(1, 11);
            expect(pointA.distanceSquared(pointB)).to.equal(100);
        })
    });

    describe("difference between two points", function() {
        it("Calculates the distance between two points", function() {
            let pointA = new Base.Point(1, 1);
            let pointB = new Base.Point(1, 11);
            expect(pointA.diff(pointB).x).to.equal(0);
            expect(pointA.diff(pointB).y).to.equal(-10);
        })
    })

});