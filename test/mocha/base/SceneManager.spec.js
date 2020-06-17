import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import GameObject from "../../../src/base/GameObject.js";

beforeEach(function () {
  Base.SceneManager.Base = Base;
  Base.SceneManager.scenes = [];
  Base.SceneManager._currentSceneIndex = -1;
})

let sceneManager = Base.SceneManager;

describe("Base", function () {
  describe("SceneManager", function () {
    describe("SceneManager object", function () {
      it("Has a scenes array", function () {
        expect(sceneManager.scenes).to.be.an('array').that.is.empty;
      })
      it("Has a Base object", function () {
        expect(sceneManager.Base).to.equal(Base);
      })
      it("Has a current Scene Index", function () {
        expect(sceneManager._currentSceneIndex).to.equal(-1);
      })
    })
    describe("currentScene getter", function () {
      it("Throws an error if the current scene is not set", function () {
        expect(()=>sceneManager.currentScene).to.throw();
      })
      it("Throws an error if there are no scenes", function () {
        sceneManager.scenes = [];
        sceneManager._currentSceneIndex = 0;
        expect(()=>sceneManager.currentScene).to.throw();
      })
      it("Throws an error if the scene index is >= the number of scenes", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        
        sceneManager._currentSceneIndex = sceneManager.scenes.length;
        expect(()=>sceneManager.currentScene).to.throw();
      })
      it("Should return the current scene", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let currentScene = Base.SceneManager.currentScene;
        expect(currentScene).to.equal(Base.SceneManager.scenes.find(i => i.name == 'RoomScene'));
      })
    })
    describe("currentScene setter", function(){
      it("Throws an error on mismatched arguments", function () {
        expect(()=>sceneManager.currentScene = new Base.Point()).to.throw();
        expect(()=>sceneManager.currentScene = 0).to.throw();
      })
      it("Updates the current scene", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let beforeIndex = sceneManager._currentSceneIndex;
        Base.SceneManager.currentScene = "StartScene";
        let afterIndex = sceneManager._currentSceneIndex;
        expect(beforeIndex).to.equal(6);
        expect(afterIndex).to.equal(3);
      })
      it("Does not update the current scene on a bad name", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let beforeIndex = sceneManager._currentSceneIndex;
        expect(()=>Base.SceneManager.currentScene = "Chai").to.throw();
        let afterIndex = sceneManager._currentSceneIndex;
        expect(beforeIndex).to.equal(6);
        expect(afterIndex).to.equal(6);
      })
    })
    describe("clearScenes function", function(){
      it("Throws an error on mismatched arguments", function () {
        expect(()=>sceneManager.clearScenes(1)).to.throw();
      })
      it("Clears the scenes", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let beforeLength = sceneManager.scenes.length;
        let beforeIndex = sceneManager._currentSceneIndex;
        sceneManager.clearScenes();
        let afterLength = sceneManager.scenes.length;
        let afterIndex = sceneManager._currentSceneIndex;
        expect(afterLength).to.equal(0);
        expect(afterIndex).to.equal(-1);
        expect(()=>sceneManager.currentScene).to.throw();
      })
    })
    describe("addScene function", function(){
      it("Throws an error on mismatched arguments", function () {
        expect(()=>sceneManager.addScene()).to.throw();
        expect(()=>sceneManager.addScene(1)).to.throw();
        expect(()=>sceneManager.addScene(1,2)).to.throw();
      })
      it("Does not add duplicate scenes", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let beforeLength = sceneManager.scenes.length;
        sceneManager.addScene(sceneManager.scenes[0]);
        let afterLength = sceneManager.scenes.length;
        expect(beforeLength).to.equal(afterLength);
      })
      it("Adds a scene to the scenes", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let AScene = sceneManager.scenes[0];
        sceneManager.clearScenes();
        let beforeLength = sceneManager.scenes.length;
        sceneManager.addScene(AScene);
        let afterLength = sceneManager.scenes.length;
        expect(beforeLength).to.equal(0);
        expect(afterLength).to.equal(1);
      })
    })
    describe("destroy function", function(){
      it("Throws an error on mismatched arguments", function () {
        expect(()=>sceneManager.destroy()).to.throw();
        expect(()=>sceneManager.destroy(1)).to.throw();
        expect(()=>sceneManager.destroy(1,2)).to.throw();
      })
      it("Destroys a game object", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let AScene = sceneManager.currentScene;
        let beforeCountRootObjects = AScene.children.length;
        expect(beforeCountRootObjects).to.equal(3);
        let gameObject = AScene.children[0];
        sceneManager.destroy(gameObject);
        let afterCountRootObjects = AScene.children.length;
        expect(afterCountRootObjects).to.equal(2);
        gameObject = AScene.children[0];
        sceneManager.destroy(gameObject);
        afterCountRootObjects = AScene.children.length;
        expect(afterCountRootObjects).to.equal(1);
        gameObject = AScene.children[0];
        sceneManager.destroy(gameObject);
        afterCountRootObjects = AScene.children.length;
        expect(afterCountRootObjects).to.equal(0);
      })
      it("Doesn't destroy a non-existant game object", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let AScene = sceneManager.currentScene;
        let beforeCountRootObjects = AScene.children.length;
        expect(beforeCountRootObjects).to.equal(3);
        sceneManager.destroy(new GameObject());
        let afterCountRootObjects = AScene.children.length;
        expect(afterCountRootObjects).to.equal(3);
        
      })
    })
    describe("instantiate function", function(){
      it("Throws an error on mismatched arguments", function () {
        expect(()=>sceneManager.instantiate()).to.throw();
        expect(()=>sceneManager.instantiate(1)).to.throw();
        expect(()=>sceneManager.instantiate(1,2)).to.throw();
        expect(()=>sceneManager.instantiate(1,2,3)).to.throw();
        expect(()=>sceneManager.instantiate(1,2,3,4,5)).to.throw();
      })
    })
  })
})