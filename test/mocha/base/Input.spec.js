
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"

describe("Base", function () {
  describe("Input.js", function () {
    describe("The object", function(){
      it("Has member variables", function(){
        let input = Base.Input;
        expect(input.keys).to.be.an('array').and.to.be.empty;

        expect(input.down).to.be.an('array').and.to.be.empty;
        expect(input.up).to.be.an('array').and.to.be.empty;

        expect(input.frameDown).to.be.an('array').and.to.be.empty;
        expect(input.frameUp).to.be.an('array').and.to.be.empty;

        expect(input.mouseButtons).to.be.an('array').and.to.be.empty;

        expect(input.mouseButtonsDown).to.be.an('array').and.to.be.empty;
        expect(input.mouseButtonsUp).to.be.an('array').and.to.be.empty;

        expect(input.frameMouseButtonsDown).to.be.an('array').and.to.be.empty;
        expect(input.frameMouseButtonsUp).to.be.an('array').and.to.be.empty;

        expect(input.mousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:0,y:0});
        expect(input.frameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:0,y:0});
        expect(input.lastFrameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:0,y:0});

        expect(input.mouseScrollDelta).to.equal(0);
        expect(input.frameScrollDelta).to.be.equal(0);

        expect(input.touches).to.be.an('array').and.to.be.empty;

        expect(input.touchesStart).to.be.an('array').and.to.be.empty;
        expect(input.touchesEnd).to.be.an('array').and.to.be.empty;
        expect(input.touchPositions).to.be.an('array').and.to.be.empty;
        expect(input.frameTouchesStart).to.be.an('array').and.to.be.empty;
        expect(input.frameTouchesEnd).to.be.an('array').and.to.be.empty;
        expect(input.frameTouchPositions).to.be.an('array').and.to.be.empty;
        expect(input.lastFrameTouchPositions).to.be.an('array').and.to.be.empty;
      })
    })
  });
});
