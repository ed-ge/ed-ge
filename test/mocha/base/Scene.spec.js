
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import Scene from "../../../src/base/Scene.js";
import GameObject from "../../../src/base/GameObject.js";



beforeEach(function () {
  Base.SceneManager.Base = Base;
  Base.SceneManager.scenes = [];
  Base.SceneManager._currentSceneIndex = -1;
})

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
        //scene.boot();
        //expect(scene.children.includes(go)).to.be.false;
      })
    })
    describe("newChildEvent function", function(){
      it("Throws an error on mismatched arguments", function () {
        expect(()=>new Base.Scene().newChildEvent).to.throw();
      })
      it("Updates the crowd simulator in the presence of an RVOAgent", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        //scene.boot();
        let def = {new:"RVOAgent"};
        let go = Base.Serializer.deserializeGameObject(def);
        expect(scene.simulator.agents).to.be.an('array').that.is.empty
        scene.newChildEvent(go);
        expect(scene.simulator.agents).to.be.an('array').of.length(1)

      })
      it("Updates the crowd simulator in the presence of an RVOObstacle", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        //scene.boot();
        let def = {new:"RVOObstacle"};
        let go = Base.Serializer.deserializeGameObject(def);
        expect(scene.simulator.obstacles).to.be.an('array').that.is.empty
        scene.newChildEvent(go);
        expect(scene.simulator.obstacles).to.be.an('array').of.length(8)

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
