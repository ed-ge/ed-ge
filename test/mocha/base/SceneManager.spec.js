import chai from "chai";

import Base from "../../../../src/Base.js"
import Scenes from "../../../game/Scenes.js"
import GameObjects from "../../../game/GameObjects.js"
import GameBehaviors from "../../../game/GameBehaviors.js"

describe("Engine", function () {
  describe("Base", function () {
    describe("SceneManager", function () {
      describe("Get Current Scene", function () {
        it("Should return the current scene", function () {
          Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
          let currentScene = Base.SceneManager.currentScene;
          chai.expect(currentScene).to.equal(Base.SceneManager.scenes.find(i => i.name == 'RoomScene'));
        })
      })
    })
  })
})