import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"

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
      })
      
    })
  })
})