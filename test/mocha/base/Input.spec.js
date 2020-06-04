
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"

describe("Base", function () {
  describe("Input.js", function () {
    describe("The object", function () {
      it("Has member variables", function () {
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

        expect(input.mousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 0, y: 0 });
        expect(input.frameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 0, y: 0 });
        expect(input.lastFrameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 0, y: 0 });

        expect(input.mouseScrollDelta).to.equal(0);
        expect(input.frameScrollDelta).to.be.equal(0);

        expect(input.touches).to.be.an('array').and.to.be.empty;

        expect(input.touchesStart).to.be.an('array').and.to.be.empty;
        expect(input.touchesEnd).to.be.an('array').and.to.be.empty;
        // expect(input.touchPositions).to.be.an('array').and.to.be.empty;
        expect(input.frameTouchesStart).to.be.an('array').and.to.be.empty;
        expect(input.frameTouchesEnd).to.be.an('array').and.to.be.empty;
        expect(input.frameTouchPositions).to.be.an('array').and.to.be.empty;
        expect(input.lastFrameTouchPositions).to.be.an('array').and.to.be.empty;
      })
    })
    describe("swapUpDownArays", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.swapUpDownArrays(1)).to.throw();
      })
      it("Swaps keys", function () {
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
      it("Swaps mouse positions", function () {
        let input = Base.Input;
        input.mousePosition = new Base.Point(1, 2);
        expect(input.lastFrameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 0, y: 0 });
        expect(input.frameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 0, y: 0 });
        input.swapUpDownArrays();
        expect(input.lastFrameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 0, y: 0 });
        expect(input.frameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 1, y: 2 });
        input.mousePosition = new Base.Point(0, 0);
        input.swapUpDownArrays();
        expect(input.lastFrameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 1, y: 2 });
        expect(input.frameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 0, y: 0 });
        input.swapUpDownArrays();
        expect(input.lastFrameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 0, y: 0 });
        expect(input.frameMousePosition).to.be.an.instanceOf(Base.Point).and.to.include({ x: 0, y: 0 });
      })
      it("Swaps mouse keys", function () {
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
      it("Swaps touch information", function () {
        //We don't really have access to TouchEvent in node :(
        let touchStartEvent = { name: "Touch Start" };
        let touchEndEvent = { name: "Touch End" };
        let touchPositionsEvent = { name: "Touch Positions" };

        input.touchesStart = touchStartEvent;
        input.touchesEnd = touchEndEvent;
        input.touches = touchPositionsEvent;

        expect(input.touchesStart).to.equal(touchStartEvent);
        expect(input.touchesEnd).to.equal(touchEndEvent);

        input.swapUpDownArrays();
        expect(input.touchesStart).to.be.an('array').that.is.empty;
        expect(input.touchesEnd).to.be.an('array').that.is.empty;
        expect(input.frameTouchesStart).to.equal(touchStartEvent);
        expect(input.frameTouchesEnd).to.equal(touchEndEvent);
        expect(input.frameTouchPositions).to.equal(touchPositionsEvent);
        expect(input.lastFrameTouchPositions).to.be.an('array').that.is.empty;

        input.touches = [];

        input.swapUpDownArrays();
        expect(input.touchesStart).to.be.an('array').that.is.empty;
        expect(input.touchesEnd).to.be.an('array').that.is.empty;
        expect(input.frameTouchesStart).to.be.an('array').that.is.empty;
        expect(input.frameTouchesEnd).to.be.an('array').that.is.empty;
        expect(input.frameTouchPositions).to.be.an('array').that.is.empty;
        expect(input.lastFrameTouchPositions).to.equal(touchPositionsEvent);

        input.swapUpDownArrays();
        expect(input.touchesStart).to.be.an('array').that.is.empty;
        expect(input.touchesEnd).to.be.an('array').that.is.empty;
        expect(input.frameTouchesStart).to.be.an('array').that.is.empty;
        expect(input.frameTouchesEnd).to.be.an('array').that.is.empty;
        expect(input.frameTouchPositions).to.be.an('array').that.is.empty;
        expect(input.lastFrameTouchPositions).to.be.an('array').that.is.empty;
      })
    })
    describe("getKeyUp function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getKeyUp()).to.throw();
      })
      it("Returns the correct value", function () {
        input.frameUp['a'] = true;
        let result = input.getKeyUp('a')
        expect(result).to.be.true;
        input.frameUp['a'] = false;
        result = input.getKeyUp('a')
        expect(result).to.be.false;
      })
    })
    describe("getKeyDown function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getKeyDown()).to.throw();
      })
      it("Returns the correct value", function () {
        input.frameDown['a'] = true;
        let result = input.getKeyDown('a')
        expect(result).to.be.true;
        input.frameDown['a'] = false;
        result = input.getKeyDown('a')
        expect(result).to.be.false;
      })
    })
    describe("getKey function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getKey()).to.throw();
      })
      it("Returns the correct value", function () {
        input.keys['a'] = true;
        let result = input.getKey('a')
        expect(result).to.be.true;
        input.keys['a'] = false;
        result = input.getKey('a')
        expect(result).to.be.false;
      })
    })
    describe("getMouseButtonUp function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getMouseButtonUp()).to.throw();
      })
      it("Returns the correct value", function () {
        input.frameMouseButtonsUp[0] = true;
        let result = input.getMouseButtonUp(0)
        expect(result).to.be.true;
        input.frameMouseButtonsUp[0] = false;
        result = input.getMouseButtonUp(0)
        expect(result).to.be.false;
      })
    })
    describe("getMouseButtonDown function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getMouseButtonDown()).to.throw();
      })
      it("Returns the correct value", function () {
        input.frameMouseButtonsDown[0] = true;
        let result = input.getMouseButtonDown(0)
        expect(result).to.be.true;
        input.frameMouseButtonsDown[0] = false;
        result = input.getMouseButtonDown(0)
        expect(result).to.be.false;
      })
    })
    describe("getMouseButton function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getMouseButton()).to.throw();
      })
      it("Returns the correct value", function () {
        input.mouseButtons[0] = true;
        let result = input.getMouseButton(0)
        expect(result).to.be.true;
        input.mouseButtons[0] = false;
        result = input.getMouseButton(0)
        expect(result).to.be.false;
      })
    })
    describe("getMouseScrollWheel function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getMouseScrollWheel(1)).to.throw();
      })
      it("Returns the correct value", function () {
        input.frameScrollDelta = 1;
        let result = input.getMouseScrollWheel()
        expect(result).to.equal(1);
      })
    })
    describe("getMousePosition function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getMousePosition(1)).to.throw();
      })
      it("Returns the correct value", function () {
        input.frameMousePosition = new Base.Point(1, 2);
        let result = input.getMousePosition()
        expect(result).to.be.an.instanceOf(Base.Point).that.includes({ x: 1, y: 2 })
      })
    })
    describe("getMousePositionDelta function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getMousePositionDelta(1)).to.throw();
      })
      it("Returns the correct value", function () {
        input.frameMousePosition = new Base.Point(1, 2);
        input.swapUpDownArrays();
        input.frameMousePosition = new Base.Point(0, 0);
        let result = input.getMousePositionDelta()
        expect(result).to.be.an.instanceOf(Base.Point).that.includes({ x: -1, y: -2 })
      })
    })
    describe("getTouchesStartFull function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getTouchesStartFull(1)).to.throw();
      })
      it("Returns the full touch object", function () {
        input.touchesStart = [{ identifier: '', screenX: '', screenY: '', clientX: '', clientY: '', pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        let result = input.getTouchesStartFull();
        expect(result).to.be.an('array').with.lengthOf(1);
        expect(result[0]).to.be.an('object').with.property('identifier');
      })
    })
    describe("getTouchesStart function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getTouchesStart(1)).to.throw();
      })
      it("Returns the full touch object", function () {
        input.touchesStart = [{ identifier: '', screenX: '', screenY: '', clientX: 1, clientY: 2, pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        let result = input.getTouchesStart();
        expect(result).to.be.an('array').with.lengthOf(1)
        expect(result[0]).to.be.an('object').that.includes({ x: 1, y: 2 })
      })
    })
    describe("getTouchesEndFull function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getTouchesEndFull(1)).to.throw();
      })
      it("Returns the full touch object", function () {
        input.touchesEnd = [{ identifier: '', screenX: '', screenY: '', clientX: '', clientY: '', pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        let result = input.getTouchesEndFull();
        expect(result).to.be.an('array').with.lengthOf(1);
        expect(result[0]).to.be.an('object').with.property('identifier');
      })
    })
    describe("getTouchesEnd function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getTouchesEnd(1)).to.throw();
      })
      it("Returns the full touch object", function () {
        input.touchesEnd = [{ identifier: '', screenX: '', screenY: '', clientX: 1, clientY: 2, pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        let result = input.getTouchesEnd();
        expect(result).to.be.an('array').with.lengthOf(1)
        expect(result[0]).to.be.an('object').that.includes({ x: 1, y: 2 })
      })
    })
    describe("getTouchesFull function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getTouchesFull(1)).to.throw();
      })
      it("Returns the full touch object", function () {
        input.touches = [{ identifier: '', screenX: '', screenY: '', clientX: '', clientY: '', pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        let result = input.getTouchesFull();
        expect(result).to.be.an('array').with.lengthOf(1);
        expect(result[0]).to.be.an('object').with.property('identifier');
      })
    })
    describe("getTouches function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getTouches(1)).to.throw();
      })
      it("Returns the full touch object", function () {
        input.touches = [{ identifier: '', screenX: '', screenY: '', clientX: 1, clientY: 2, pageX: '', pageY: '', target: '' }];
        input.touchesEnd = [{ identifier: '', screenX: '', screenY: '', clientX: 3, clientY: 4, pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        let result = input.getTouches();
        expect(result).to.be.an('array').with.lengthOf(2)
        expect(result[0]).to.be.an('object').that.includes({ x: 1, y: 2 })
        expect(result[1]).to.be.an('object').that.includes({ x: 3, y: 4 })
      })
    })
    describe("getTouchesMove function", function () {
      let input = Base.Input;
      it("Throws an error on mismatched arguments", function () {
        expect(() => input.getTouches(1)).to.throw();
      })
      it("Returns zero movement if there is not enough data", function () {
        input.swapUpDownArrays();
        input.swapUpDownArrays();
        let result = input.getTouchMove();
        expect(result).to.be.an('array').with.lengthOf(1);
        expect(result[0]).to.be.an('object').that.includes({ x: 0, y: 0 });
        input.touches = [{ identifier: '', screenX: '', screenY: '', clientX: 1, clientY: 2, pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        result = input.getTouchMove();
        expect(result).to.be.an('array').with.lengthOf(1);
        expect(result[0]).to.be.an('object').that.includes({ x: 0, y: 0 });
        
        //Hack to clear input.
        input.swapUpDownArrays();
        input.swapUpDownArrays();

      })
      it("Returns an array of deltas", function () {
        input.touches = [{ identifier: '', screenX: '', screenY: '', clientX: 1, clientY: 2, pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        input.touches = [{ identifier: '', screenX: '', screenY: '', clientX: 3, clientY: 4, pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        let result = input.getTouchMove();
        expect(result).to.be.an('array').with.lengthOf(1)
        expect(result[0]).to.be.an('object').that.includes({ x: 2, y: 2 })
        input.swapUpDownArrays();
        input.swapUpDownArrays();
      })
      it("Returns an array of deltas, even if they are of different size", function () {
        input.touches = [{ identifier: '', screenX: '', screenY: '', clientX: 1, clientY: 2, pageX: '', pageY: '', target: '' },{ identifier: '', screenX: '', screenY: '', clientX: 1, clientY: 2, pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        input.touches = [{ identifier: '', screenX: '', screenY: '', clientX: 3, clientY: 4, pageX: '', pageY: '', target: '' }];
        input.swapUpDownArrays();
        let result = input.getTouchMove();
        expect(result).to.be.an('array').with.lengthOf(1)
        expect(result[0]).to.be.an('object').that.includes({ x: 2, y: 2 })
        input.swapUpDownArrays();
        input.swapUpDownArrays();
      })
        
    })
  });
});
