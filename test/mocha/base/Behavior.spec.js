
import chai from "chai";
const should = chai.should();

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"

describe("Base", function () {
  describe("Behavior.js", function () {
    it("Creates an instance with two functions", function(){
      let behavior = new Base.Behavior();
      (behavior.start).should.be.a('function');
      (behavior.update).should.be.a('function');
    })
  });
});
