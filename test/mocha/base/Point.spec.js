
import chai from "chai";
import chaiAlmost from "chai-almost";
const expect = chai.expect;
chai.use(chaiAlmost());

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"

describe("Base", function () {
  describe("Point.js", function () {
    describe("Constructor", function () {
      it("Has a constructor that takes two numbers", function () {
        let point = new Base.Point(1, 2);
        expect(point).to.not.be.undefined;
      });
      it("Has a constructor with default parameter values", function () {
        let point = new Base.Point();
        expect(point).to.not.be.undefined;
        expect(point.x).to.equal(0);
        expect(point.y).to.equal(0);

        point = new Base.Point(100.9);
        expect(point.x).to.equal(100.9);
        expect(point.y).to.equal(0);
      });
      it("Has stores an x and y value", function () {
        let point = new Base.Point(-1, 2.5);
        expect(point.x).to.equal(-1);
        expect(point.y).to.equal(2.5);
      });
    });
    describe("Distance method", function(){
      it("Defaults to calculating the distance to the origin", function(){
        let point = new Base.Point(1,0);
        let distance = point.distance();
        expect(distance).to.equal(1);

        point = new Base.Point(100, -100);
        distance = point.distance();
        expect(distance).to.equal(Math.sqrt(100*100+100*100));

        point = new Base.Point(0, 0);
        distance = point.distance();
        expect(distance).to.equal(0);
      })
      it("Calculates the distance between two points", function(){
        let point = new Base.Point(1,0);
        let distance = point.distance(new Base.Point(0,0));
        expect(distance).to.equal(1);

        point = new Base.Point(100, -100);
        distance = point.distance(new Base.Point(101, -100));
        expect(distance).to.equal(1);

        let a = 1.234;
        let b = 5.678;
        let c = 9.012;
        let d = 3.456;
        point = new Base.Point(a,b);
        distance = point.distance(new Base.Point(c,d));
        expect(distance).to.equal(Math.sqrt((a-c)*(a-c)+(b-d)*(b-d)));
      })
    })

    describe("distanceSquare Method", function(){
      it("Defaults to calculating the distance to the origin", function(){
        let point = new Base.Point(0, 4);
        let distanceSquared = point.distanceSquared();
        expect(distanceSquared).to.equal(16);
      })
      it("Calculates the distance squared between two points", function(){
        let point = new Base.Point(0, 4);
        let distanceSquared = point.distanceSquared(new Base.Point(3,0));
        expect(distanceSquared).to.equal(25);
      })
    })

    describe("diff Method", function(){
      it("Calculates the pairwise difference of two points", function(){
        let point = new Base.Point(5.4, -9.9);
        let diff = point.diff(point);
        expect(diff).to.not.be.undefined;
        expect(diff).to.not.be.null;
        expect(diff.x).to.equal(0);
        expect(diff.y).to.equal(0);

        diff = point.diff(new Base.Point(-8.765, 1.234));
        expect(diff.x).to.equal(5.4+8.765);
        expect(diff.y).to.equal(-9.9-1.234)

      })
    })

    describe("toNormalized method", function(){
      it("Returns a new Point with a normalized length.", function(){
        let pointZero = new Base.Point(1,0);
        let toNormalizedZero = pointZero.toNormalized();
        expect(toNormalizedZero).to.not.be.undefined;
        expect(toNormalizedZero).to.not.be.null;
        expect(toNormalizedZero.x).to.equal(1);
        expect(toNormalizedZero.y).to.equal(0);
        
        let point = new Base.Point(-1, 1);
        let toNormalized = point.toNormalized();
        expect(toNormalized.x).to.almost.equal(-1/Math.sqrt(2))
        expect(toNormalized.y).to.almost.equal(1/Math.sqrt(2))
      })
    })

  });
});
