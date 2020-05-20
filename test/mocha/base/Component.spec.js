
import chai from "chai";
const should = chai.should();

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import Component from "../../../src/base/Component.js";

describe("Base", function () {
  describe("Component", function () {
    describe("constructor", function () {
      let component = new Component();
      it("Generates a uuid", function () {
        component.uuid.should.not.be.undefined;

        
      })
    });
  });
});
