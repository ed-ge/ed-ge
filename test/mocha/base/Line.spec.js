
import chai from "chai";
import chaiAlmost from "chai-almost";
const expect = chai.expect;
chai.use(chaiAlmost());

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"

describe("Base", function () {
  describe("Line.js", function () {
    it("Has a constructor that takes two point-like arguments", function(){
      let a = new Base.Point(0,0,);
      let b = new Base.Point(1,1);
      let line = new Base.Line(a,b);
      expect(line).is.not.undefined;
    });
    it("Calculates ax+by+c", function(){
      let a = new Base.Point(0,0,);
      let b = new Base.Point(1,1);
      let line = new Base.Line(a,b);
      
      expect(line.a).to.almost.equal(1/Math.sqrt(2)); 
      expect(line.b).to.almost.equal(-1/Math.sqrt(2)); 
      expect(line.c).to.equal(0); 
    })
    it("Calculates the distance to another point", function(){
      let a = new Base.Point(0,0,);
      let b = new Base.Point(1,1);
      let line = new Base.Line(a,b);
      let other = new Base.Point(-1/Math.sqrt(2), 1/Math.sqrt(2))
      let distance = line.distance(other);
      expect(distance).to.almost.equal(-1); 
    })

  });
});
