
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import Scene from "../../../src/base/Scene.js";
import GameObject from "../../../src/base/GameObject.js";

describe("Base", function () {
  describe("Scene.js", function () {
    describe("constructor", function(){
      it("Throws an error on mismatched arguments", function () {
        expect(()=>new Scene()).to.throw();
        expect(()=>new Scene(Scenes.allScenes[0])).to.throw();
        expect(()=>new Scene(Scenes.allScenes[0], Base.Prefabs)).to.throw();
        expect(()=>new Scene(Scenes.allScenes[0], Base.Prefabs, GameBehaviors)).to.throw();
        expect(()=>new Scene(Scenes.allScenes[0], Base.Prefabs, GameBehaviors, Base.Components, 1)).to.throw();
      })
      it("Creates a new scene", function(){
        // Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = new Scene(Scenes.allScenes[0], Base.Prefabs, GameBehaviors, Base.Components);
        expect(scene.name).to.equal("SceneOne");
        expect(scene.children).to.be.an('array').that.is.empty;
        expect(scene.objects).to.equal(Scenes.allScenes[0].objects);
        expect(scene.prefabs).to.equal(Base.Prefabs);
        expect(scene.behaviors).to.equal(GameBehaviors);
        expect(scene.components).to.equal(Base.Components);
        expect(scene.layers).to.be.an('array').of.length(3);
        expect(scene.layers).to.be.an('array').of.length(3).that.includes('background');
        expect(scene.layers).to.be.an('array').of.length(3).that.includes(null);
        expect(scene.layers).to.be.an('array').of.length(3).that.includes('foreground');
      })
    })
    describe("boot function", function(){
      it("Throws an error on mismatched arguments", function () {
        let scene = new Scene(Scenes.allScenes[0], Base.Prefabs, GameBehaviors, Base.Components);
        expect(()=>scene.boot(1)).to.throw();
      })
      it("Removes the previous scene's children children", function () {
        let allComponents = Object.assign(Base.Component,GameBehaviors);
        let scene = new Scene(Scenes.allScenes[0], Base.Prefabs, GameBehaviors, Base.Components);
        // let go = new GameObject();
        // go.name = "Remove me";
        // scene.addChild(go);
        scene.boot();
        expect(scene.children.includes(go)).to.be.false;
      })
    })
    describe("newChildEvent function", function(){
      it("Throws an error on mismatched arguments", function () {
      })
    })
    describe("draw function", function(){
      it("Throws an error on mismatched arguments", function () {
      })
    })
    describe("update function", function(){
      it("Throws an error on mismatched arguments", function () {
      })
    })
    describe("getCollidable function", function(){
      it("Throws an error on mismatched arguments", function () {
      })
    })
    describe("canEnterSafely function", function(){
      it("Throws an error on mismatched arguments", function () {
      })
    })
    describe("updateRVOAgent function", function(){
      it("Throws an error on mismatched arguments", function () {
      })
    })
    describe("removeRVOAgent function", function(){
      it("Throws an error on mismatched arguments", function () {
      })
    })
  });
});
