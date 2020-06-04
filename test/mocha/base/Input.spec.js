
import chai from "chai";
import window from "window";
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
    describe("swapUpDownArays", function(){
      let input = Base.Input;
      it("Swaps keys", function(){
        input.down.push('a');
        input.up.push('b');
        expect(input.down).to.be.an('array').with.a.lengthOf(1);
        expect(input.up).to.be.an('array').with.a.lengthOf(1);
        expect(input.frameDown).to.be.an('array').that.is.empty;
        expect(input.frameUp).to.be.an('array').that.is.empty;
        input.swapUpDownArrays();
        expect(input.down).to.be.an('array').that.is.empty;
        expect(input.up).to.be.an('array').that.is.empty;
        expect(input.frameDown).to.be.an('array').with.a.lengthOf(1).and.includes('a');
        expect(input.frameUp).to.be.an('array').with.a.lengthOf(1).and.includes('b');
        input.swapUpDownArrays();
        expect(input.down).to.be.an('array').that.is.empty;
        expect(input.up).to.be.an('array').that.is.empty;
        expect(input.frameDown).to.be.an('array').that.is.empty;
        expect(input.frameUp).to.be.an('array').that.is.empty;
      })
      it("Swaps mouse positions", function(){
        let input = Base.Input;
        input.mousePosition = new Base.Point(1,2);
        expect(input.lastFrameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:0,y:0});
        expect(input.frameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:0,y:0});
        input.swapUpDownArrays();
        expect(input.lastFrameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:0,y:0});
        expect(input.frameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:1,y:2});
        input.mousePosition = new Base.Point(0,0);
        input.swapUpDownArrays();
        expect(input.lastFrameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:1,y:2});
        expect(input.frameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:0,y:0});
        input.swapUpDownArrays();
        expect(input.lastFrameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:0,y:0});
        expect(input.frameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({x:0,y:0});
      })
      it("Swaps mouse keys", function(){
        let input = Base.Input;
        input.mouseScrollDelta = 1;
        input.mouseButtonsDown = [2];
        input.mouseButtonsUp = [3];

        input.swapUpDownArrays();
        expect(input.mouseScrollDelta).to.equal(0);
        expect(input.mouseButtonsDown).to.be.an('array').that.is.empty;
        expect(input.mouseButtonsUp).to.be.an('array').that.is.empty;
        expect(input.frameScrollDelta).to.equal(1);
        expect(input.frameMouseButtonsDown).to.be.an('array').that.includes(2);
        expect(input.frameMouseButtonsUp).to.be.an('array').that.includes(3);

        input.swapUpDownArrays();
        expect(input.mouseScrollDelta).to.equal(0);
        expect(input.mouseButtonsDown).to.be.an('array').that.is.empty;
        expect(input.mouseButtonsUp).to.be.an('array').that.is.empty;
        expect(input.frameScrollDelta).to.equal(0);
        expect(input.frameMouseButtonsDown).to.be.an('array').that.is.empty;
        expect(input.frameMouseButtonsUp).to.be.an('array').that.is.empty;

      })
      it("Swaps touch information", function(){
        //We don't really have access to TouchEvent in node :(
        let touchStartEvent = {name:"Touch Start"};
        let touchEndEvent = {name:"Touch End"};
        let touchPositionsEvent = {name:"Touch Positions"};
        
        input.touchesStart = touchStartEvent;
        input.touchesEnd = touchEndEvent;
        input.touches = touchPositionsEvent;

        expect(input.touchesStart).to.equal(touchStartEvent);
        expect(input.touchesEnd).to.equal(touchEndEvent);
        // expect(input.touchPositions).to.equal(touchPositionsEvent);

        input.swapUpDownArrays();
        expect(input.touchesStart).to.be.an('array').that.is.empty;
        expect(input.touchesEnd).to.be.an('array').that.is.empty;
        // expect(input.touchPositions).to.be.an('array').that.is.empty;
        expect(input.frameTouchesStart).to.equal(touchStartEvent);
        expect(input.frameTouchesEnd).to.equal(touchEndEvent);
        expect(input.frameTouchPositions).to.equal(touchPositionsEvent);
        expect(input.lastFrametouchPositions).to.be.an('array').that.is.empty;
      })
    })
  });
});
