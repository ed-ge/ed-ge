
import chai from "chai";
const expect = chai.expect;
import sinon from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai);

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import GameObject from "../../../src/base/GameObject.js";
import Point from "../../../src/base/Point.js";
import Component from "../../../src/base/Component.js";

function once(fn) {
  var returnValue, called = false;
  return function () {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }
    return returnValue;
  };
}

let gameObject;
let ctx;
let width = 100;
let height = 100;
class QuickComponent extends Component { constructor() { super() } }
beforeEach(() => {
  gameObject = new GameObject(100, 200, 2, 2, Math.PI / 4)
  let child1 = new GameObject();
  let child2 = new GameObject(10, 10, 1, 1, Math.PI / 2);
  let grandChild = new GameObject(100, 300, 4, 5, Math.PI / 6);
  gameObject.addChild(child1);
  gameObject.addChild(child2);
  child1.addChild(grandChild);

  let gameObjectComponent = new QuickComponent();
  gameObject.addComponent(gameObjectComponent);

  let child1Component = new Component();
  child1.addComponent(child1Component);


  let child2Component = new Component();
  child2.addComponent(child2Component);
  let child2Component2 = new Component();
  child2.addComponent(child2Component2);

  let grandchildComponent = new QuickComponent();
  grandChild.addComponent(grandchildComponent);

  ctx = {
    save: sinon.fake(),
    translate: sinon.fake(),
    scale: sinon.fake(),
    rotate: sinon.fake(),
    restore: sinon.fake(),
    width: width,
    height: height,
    canvas: {
      width: width,
      height: height
    }
  }


})

describe("Base", function () {
  this.timeout(0);
  describe("GameObject.js", function () {
    describe("constructor", function () {
      it("Has defaults if there are no arguments", function () {
        let gameObject = new GameObject();
        expect(gameObject.x).to.equal(0);
        expect(gameObject.y).to.equal(0);
        expect(gameObject.scaleX).to.equal(1);
        expect(gameObject.scaleY).to.equal(1);
        expect(gameObject.rotation).to.equal(0);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array').that.is.empty;
      })
      it("Has defaults if there is one arguments", function () {
        let gameObject = new GameObject(27);
        expect(gameObject.x).to.equal(27);
        expect(gameObject.y).to.equal(0);
        expect(gameObject.scaleX).to.equal(1);
        expect(gameObject.scaleY).to.equal(1);
        expect(gameObject.rotation).to.equal(0);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array').that.is.empty;
      })
      it("Has defaults if there are two arguments", function () {
        let gameObject = new GameObject(12, 33.4);
        expect(gameObject.x).to.equal(12);
        expect(gameObject.y).to.equal(33.4);
        expect(gameObject.scaleX).to.equal(1);
        expect(gameObject.scaleY).to.equal(1);
        expect(gameObject.rotation).to.equal(0);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array').that.is.empty;
      })
      it("Has defaults if there are three arguments", function () {
        let gameObject = new GameObject(-10, 44, 2);
        expect(gameObject.x).to.equal(-10);
        expect(gameObject.y).to.equal(44);
        expect(gameObject.scaleX).to.equal(2);
        expect(gameObject.scaleY).to.equal(1);
        expect(gameObject.rotation).to.equal(0);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array').that.is.empty;
      })
      it("Has defaults if there are four arguments", function () {
        let gameObject = new GameObject(.1, -.2, 4, 6);
        expect(gameObject.x).to.equal(.1);
        expect(gameObject.y).to.equal(-.2);
        expect(gameObject.scaleX).to.equal(4);
        expect(gameObject.scaleY).to.equal(6);
        expect(gameObject.rotation).to.equal(0);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array').that.is.empty;
      })
      it("Has defaults if there are five arguments", function () {
        let gameObject = new GameObject(.1, -.2, 4, 6, 1);
        expect(gameObject.x).to.equal(.1);
        expect(gameObject.y).to.equal(-.2);
        expect(gameObject.scaleX).to.equal(4);
        expect(gameObject.scaleY).to.equal(6);
        expect(gameObject.rotation).to.equal(1);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array').that.is.empty;
      })
      it("Correctly handles six arguments", function () {
        let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
        expect(gameObject.x).to.equal(-34.6);
        expect(gameObject.y).to.equal(99.8);
        expect(gameObject.scaleX).to.equal(-2);
        expect(gameObject.scaleY).to.equal(-3);
        expect(gameObject.rotation).to.equal(10);
        expect(gameObject.prefabName).to.equal("name");
        expect(gameObject.components).to.be.an('array').that.is.empty;
      })
    })
    describe("location", function () {
      it("Gets the local x and y location", function () {
        let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
        let location = gameObject.location;
        expect(location).to.be.an.instanceof(Point);
        expect(location.x).to.equal(-34.6);
        expect(location.y).to.equal(99.8);
      })
      it("Does not allow you to set the location", function () {
        let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
        expect(() => gameObject.location = new Point(0, 0)).to.throw();
      })
    })
    describe("scale", function () {
      it("Gets the local x and y scale", function () {
        let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
        let scale = gameObject.scale;
        expect(scale).to.be.an.instanceof(Point);
        expect(scale.x).to.equal(-2);
        expect(scale.y).to.equal(-3);
      })
      it("Does not allow you to set the scale", function () {
        let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
        expect(() => gameObject.scale = new Point(0, 0)).to.throw();
      })
    })
    describe("world transforms", function () {
      describe("worldLocation getter", function () {
        it("Gets the world location", function () {
          let gameObjectParent = new GameObject(10, 10);
          let gameObjectChild = new GameObject(10, 10);
          gameObjectParent.addChild(gameObjectChild)

          let worldLocationParent = gameObjectParent.worldLocation;
          let worldLocationChild = gameObjectChild.worldLocation;
          expect(worldLocationParent).to.be.an.instanceOf(Base.Point)
          expect(worldLocationChild).to.be.an.instanceOf(Base.Point)
          expect(worldLocationParent.x).to.equal(10);
          expect(worldLocationParent.y).to.equal(10);
          expect(worldLocationChild.x).to.equal(20);
          expect(worldLocationChild.y).to.equal(20);
        })
        it("Does not let you set the worldLocation", function () {
          let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
          expect(() => gameObject.worldLocation = new Base.Point(0, 0)).to.throw();
        })

      })
      describe("worldScale getter", function () {
        it("Gets the world scale", function () {
          let gameObjectParent = new GameObject(0, 0, 1, 2);
          let gameObjectChild = new GameObject(0, 0, 3, 4);
          gameObjectParent.addChild(gameObjectChild)

          let worldScaleParent = gameObjectParent.worldScale;
          let worldScaleChild = gameObjectChild.worldScale;
          expect(worldScaleParent).to.be.an.instanceOf(Base.Point)
          expect(worldScaleChild).to.be.an.instanceOf(Base.Point)
          expect(worldScaleParent.x).to.equal(1);
          expect(worldScaleParent.y).to.equal(2);
          expect(worldScaleChild.x).to.equal(3);
          expect(worldScaleChild.y).to.equal(8);
        })
        it("Does not let you set the worldScale", function () {
          let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
          expect(() => gameObject.worldScale = new Base.Point(0, 0)).to.throw();
        })

      })
      describe("worldRotation getter", function () {
        it("Gets the world rotation", function () {
          let gameObjectParent = new GameObject(0, 0, 1, 1, Math.PI / 6);
          let gameObjectChild = new GameObject(0, 0, 1, 1, Math.PI / 3);
          gameObjectParent.addChild(gameObjectChild)

          let worldRotationParent = gameObjectParent.worldRotation;
          let worldRotationChild = gameObjectChild.worldRotation;
          expect(worldRotationParent).to.be.closeTo(Math.PI / 6, .0000001);
          expect(worldRotationChild).to.be.closeTo(Math.PI / 6 + Math.PI / 3, .000001);

        })
        it("Does not let you set the worldScale", function () {
          let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
          expect(() => gameObject.worldScale = new Base.Point(0, 0)).to.throw();
        })

      })
      describe("Combined world getters", function () {
        it("Handles scale and translation", function () {
          let parent = new GameObject(10, 10, 2, 3);
          let child = new GameObject(10, 10, 1, 1);
          parent.addChild(child);
          expect(child.worldLocation.x).to.equal(30);
          expect(child.worldLocation.y).to.equal(40);
        })
        it("Handles deep scale and translation", function () {
          let parent = new GameObject(10, 10, 1, 1);
          let middle = new GameObject(0, 0, 2, 3);
          let child = new GameObject(10, 10, 1, 1);
          parent.addChild(middle);
          middle.addChild(child);
          expect(child.worldLocation.x).to.equal(30);
          expect(child.worldLocation.y).to.equal(40);
        })
        it("Handles rotation and translation", function () {
          let parent = new GameObject(0, 0, 1, 1, Math.PI / 2);
          let child = new GameObject(10, 0);
          parent.addChild(child);
          expect(child.worldLocation.x).to.be.closeTo(0, .00001);
          expect(child.worldLocation.y).to.be.closeTo(10, .00001);
        })
        it("Handles everything", function () {
          let parent = new GameObject(0, 0, 2, 1, Math.PI / 2);
          let child = new GameObject(10, 0);
          parent.addChild(child);
          expect(child.worldLocation.x).to.be.closeTo(0, .00001);
          expect(child.worldLocation.y).to.be.closeTo(20, .00001);
        })
      })
    })
    describe("addComponent function", function () {
      let go = new GameObject();
      it("Throws an error on mismatched arguments", function () {
        expect(() => go.addComponent()).to.throw();
        expect(() => go.addComponent(1)).to.throw();
        expect(() => go.addComponent(1, 2)).to.throw();
      })
      it("Adds a component", function () {
        let co = new Component();
        go.addComponent(co);
        expect(co.gameObject).to.equal(go);
        expect(go.components).to.be.an('array').with.lengthOf(1)
        expect(go.components[0]).to.equal(co);
      })

    })
    describe("draw function with RectTransform", function () {
      let go = new GameObject();
      let component = new Base.Components.RectTransform();
      go.addComponent(component);
      it("Mock draws with default anchors", function () {
        go.draw(ctx);
        expect(ctx.save).to.have.been.calledBefore(ctx.translate);
        expect(ctx.translate).to.have.been.calledBefore(ctx.scale);
        expect(ctx.scale).to.have.been.calledBefore(ctx.rotate);
        expect(ctx.rotate).to.have.been.calledBefore(ctx.restore);

        expect(ctx.save).to.have.been.calledOnce;
        expect(ctx.translate.getCall(0)).to.have.been.calledWith(width / 2, height / 2);
        expect(ctx.translate.getCall(1)).to.have.been.calledWith(0, 0);
        expect(ctx.scale).to.have.been.calledOnceWith(1, 1);
        expect(ctx.rotate).to.have.been.calledOnceWith(0);
        expect(ctx.restore).to.have.been.calledOnce;
      })
      it("Mock draws on a top left anchors", function () {
        go.getComponent("RectTransform").anchorHorizontal = "left";
        go.getComponent("RectTransform").anchorVertical = "top";
        go.draw(ctx);
        expect(ctx.save).to.have.been.calledBefore(ctx.translate);
        expect(ctx.translate).to.have.been.calledBefore(ctx.scale);
        expect(ctx.scale).to.have.been.calledBefore(ctx.rotate);
        expect(ctx.rotate).to.have.been.calledBefore(ctx.restore);

        expect(ctx.save).to.have.been.calledOnce;
        expect(ctx.translate.getCall(0)).to.have.been.calledWith(0, 0);
        expect(ctx.translate.getCall(1)).to.have.been.calledWith(0, 0);
        expect(ctx.scale).to.have.been.calledOnceWith(1, 1);
        expect(ctx.rotate).to.have.been.calledOnceWith(0);
        expect(ctx.restore).to.have.been.calledOnce;
      })
      it("Mock draws on a bottom right anchors", function () {
        go.getComponent("RectTransform").anchorHorizontal = "right";
        go.getComponent("RectTransform").anchorVertical = "bottom";
        go.draw(ctx);
        expect(ctx.save).to.have.been.calledBefore(ctx.translate);
        expect(ctx.translate).to.have.been.calledBefore(ctx.scale);
        expect(ctx.scale).to.have.been.calledBefore(ctx.rotate);
        expect(ctx.rotate).to.have.been.calledBefore(ctx.restore);

        expect(ctx.save).to.have.been.calledOnce;
        expect(ctx.translate.getCall(0)).to.have.been.calledWith(width, height);
        expect(ctx.translate.getCall(1)).to.have.been.calledWith(0, 0);
        expect(ctx.scale).to.have.been.calledOnceWith(1, 1);
        expect(ctx.rotate).to.have.been.calledOnceWith(0);
        expect(ctx.restore).to.have.been.calledOnce;
      })

    })
    describe("draw function", function () {
      let go = new GameObject();
      it("Throws an error on mismatched arguments", function () {
        expect(() => go.draw()).to.throw();
        expect(() => go.draw(1, 2)).to.throw();
      })
      it("Mocks draw calls", function () {
        let ctx = {
          save: sinon.fake(),
          translate: sinon.fake(),
          scale: sinon.fake(),
          rotate: sinon.fake(),
          restore: sinon.fake()
        }

        go.draw(ctx);
        expect(ctx.save).to.have.been.calledOnce;
        expect(ctx.translate).to.have.been.calledOnceWith(0, 0);
        expect(ctx.scale).to.have.been.calledOnceWith(1, 1);
        expect(ctx.rotate).to.have.been.calledOnceWith(0);
        expect(ctx.restore).to.have.been.calledOnce;
      })
      it("Mocks draw calls with child", function () {
        let parent = new GameObject(1, 2, 3, 4, 5)
        let child = new GameObject();
        parent.addChild(child);
        let ctx = {
          save: sinon.fake(),
          translate: sinon.fake(),
          scale: sinon.fake(),
          rotate: sinon.fake(),
          restore: sinon.fake()
        }

        parent.draw(ctx);
        expect(ctx.save).to.have.been.calledTwice;
        expect(ctx.translate).to.have.been.calledWith(1, 2);
        expect(ctx.scale).to.have.been.calledTwice.calledWith(3, 4);
        expect(ctx.rotate).to.have.been.calledTwice.calledWith(5);
        expect(ctx.restore).to.have.been.calledTwice;
      })
    })
    describe("update function", function () {
      let go = new GameObject();
      it("Throws an error on mismatched arguments", function () {
        expect(() => go.update(1)).to.throw();
      })
      it("Mocks update calls to children", function () {
        let parent = new GameObject();
        let child = new GameObject();
        child.update = sinon.fake();
        parent.addChild(child);
        parent.update();
        expect(child.update).to.have.been.calledOnce;
      })
    })
    describe("getComponent function", function () {
      let go = new GameObject();
      it("Throws an error on mismatched arguments", function () {
        expect(() => go.getComponent()).to.throw();
        expect(() => go.getComponent(1, 2)).to.throw();
      })
      it("Throws an error on not-found string search", function () {
        expect(() => gameObject.getComponent("Missing")).to.throw();
      })
      it("Throws an error on not-found type search", function () {
        expect(() => gameObject.getComponent(Base.Point)).to.throw();
        expect(() => gameObject.getComponent(new Component)).to.throw();
      })
      it("Finds a component using a string", function () {
        let co = gameObject.getComponent("QuickComponent")
        expect(co).to.not.be.null;
      })
      it("Finds a component using a type", function () {
        let co = gameObject.getComponent(QuickComponent)
        expect(co).to.not.be.null;
      })
    })
    describe("anyComponent function", function () {
      let go = new GameObject();
      it("Throws an error on mismatched arguments", function () {
        expect(() => go.anyComponent()).to.throw();
        expect(() => go.anyComponent(1, 2)).to.throw();
      })
      it("Returns false on not-found string search", function () {
        expect(gameObject.anyComponent("Missing")).to.be.false;
      })
      it("Returns false on not-found type search", function () {
        expect(gameObject.anyComponent(Base.Point)).to.be.false;
      })
      it("Finds a component using a string", function () {
        let co = gameObject.anyComponent("QuickComponent")
        expect(co).to.be.true;
      })
      it("Finds a component using a type", function () {
        let co = gameObject.anyComponent(QuickComponent)
        expect(co).to.be.true;
      })
    })
    describe("recursiveCall function", function () {
      let go = new GameObject();
      it("Throws an error on mismatched arguments", function () {
        expect(() => go.recursiveCall()).to.throw();
        expect(() => go.recursiveCall(1, 2)).to.throw();
      })
      it("Mocks recursive calls to children", function () {
        let parent = new GameObject();
        let child = new GameObject();
        child.recursiveCall = sinon.fake();
        parent.addChild(child);
        parent.recursiveCall("sinon");
        expect(child.recursiveCall).to.have.been.calledOnceWith("sinon");
      })
    })
    describe("serialize function", function () {
      let go = new GameObject();
      it("Throws an error on mismatched arguments", function () {
        expect(() => go.serialize(1)).to.throw();
      })
    })
    describe("onDestroy function", function () {
      let go = new GameObject();
      it("Throws an error on mismatched arguments", function () {
        expect(() => go.onDestroy(1)).to.throw();
      })
      it("Calls on destroy on its components", function () {
        let go = new GameObject();
        let co = new Component();
        co.onDestroy = sinon.fake();
        go.addComponent(co);
        go.onDestroy();
        expect(co.onDestroy).to.have.been.calledOnce;
      })
    })

  });
});
