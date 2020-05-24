
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"

describe("Base", function () {
  describe("Time.js", function () {
    describe("Time constructor", function(){
     it("Creates a member variable set to 0", function(){
       let time = new Base.Time();
       expect(time).to.not.be.undefined;
       expect(time).to.not.be.null;
       expect(time.deltaTime).to.equal(0);
     })
    })
  });
});
