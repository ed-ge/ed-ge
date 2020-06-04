
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import GameObject from "../../../src/base/GameObject.js";
import Point from "../../../src/base/Point.js";

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
          let gameObjectParent = new GameObject(0, 0, 1, 1, Math.PI/6);
          let gameObjectChild = new GameObject(0, 0, 1, 1, Math.PI/3);
          gameObjectParent.addChild(gameObjectChild)

          let worldRotationParent = gameObjectParent.worldRotation;
          let worldRotationChild = gameObjectChild.worldRotation;
          expect(worldRotationParent).to.be.closeTo(Math.PI/6, .0000001);
          expect(worldRotationChild).to.be.closeTo(Math.PI/6+Math.PI/3, .000001);
          
        })
        it("Does not let you set the worldScale", function () {
          let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
          expect(() => gameObject.worldScale = new Base.Point(0, 0)).to.throw();
        })

      })
      describe("Combined world getters", function(){
        it("Handles scale and translation", function(){
          let parent = new GameObject(10, 10, 2, 3);
          let child = new GameObject(10, 10, 1, 1);
          parent.addChild(child);
          expect(child.worldLocation.x).to.equal(30);
          expect(child.worldLocation.y).to.equal(40);
        })
        it("Handles deep scale and translation", function(){
          let parent = new GameObject(10, 10, 1, 1);
          let middle = new GameObject(0, 0, 2,3);
          let child = new GameObject(10, 10, 1, 1);
          parent.addChild(middle);
          middle.addChild(child);
          expect(child.worldLocation.x).to.equal(30);
          expect(child.worldLocation.y).to.equal(40);
        })
        it("Handles rotation and translation", function(){
          let parent = new GameObject(0, 0, 1, 1, Math.PI/2);
          let child = new GameObject(10, 0,);
          parent.addChild(child);
          expect(child.worldLocation.x).to.be.closeTo(0, .00001);
          expect(child.worldLocation.y).to.be.closeTo(10, .00001);
        })
        it("Handles everything", function(){
          let parent = new GameObject(0, 0, 2, 1, Math.PI/2);
          let child = new GameObject(10, 0,);
          parent.addChild(child);
          expect(child.worldLocation.x).to.be.closeTo(0, .00001);
          expect(child.worldLocation.y).to.be.closeTo(20, .00001);
        })
      })
    })
    describe("addComponent function", function(){

    })
    describe("draw function", function(){

    })
    describe("update function", function(){

    })
    describe("getComponent function", function(){

    })
    describe("anyComponent function", function(){

    })
    describe("recursiveCall function", function(){

    })
    describe("serialize function", function(){
      
    })

  });
});
