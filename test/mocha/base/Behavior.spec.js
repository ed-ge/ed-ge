
import chai from "chai";
const should = chai.should();

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"

describe("Base", function () {
  describe("Behavior.js", function () {
    it("Has a function start that returns undefined", function () {
      let behavior = new Base.Behavior();
      (behavior.start).should.be.a('function');
      should.equal(behavior.start(), undefined);
    });
    it("Has a function update that returns undefined ", function () {
      let behavior = new Base.Behavior();
      (behavior.update).should.be.a('function');
      should.equal(behavior.update(), undefined);

    })
  });
});
