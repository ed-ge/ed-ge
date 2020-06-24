
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import Scene from "../../../src/base/Scene.js";
import GameObject from "../../../src/base/GameObject.js";
import Point from "../../../src/base/Point.js";



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
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let agent = Base.Serializer.deserializeGameObject(
          {
            new:"RVOAgent"
          }
        )
        let go = new GameObject();
        expect(()=>scene.updateRVOAgent()).to.throw();
        expect(()=>scene.updateRVOAgent(go)).to.throw();
        expect(()=>scene.updateRVOAgent(agent, 1)).to.throw();
      })
      it("Updates an RVOAgent", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let agent0 = Base.SceneManager.instantiate(Base.Prefabs.RVOAgent, new Base.Point(0,0), new Base.Point(1,1), 0);
        let agent1 = Base.SceneManager.instantiate(Base.Prefabs.RVOAgent, new Base.Point(0,0), new Base.Point(1,1), 0);
        let agent0Component = agent0.getComponent("RVOAgent");
        let agent1Component = agent1.getComponent("RVOAgent");
        expect(scene.simulator.getNumAgents()).to.equal(2);
        expect(agent0Component._id).to.equal(0);
        expect(agent1Component._id).to.equal(1);        
        

        expect(scene.simulator.getGoal(0).x).to.equal(0);
        agent0Component.destination = new Point(3,4);
        scene.updateRVOAgent(agent0);
        expect(scene.simulator.getGoal(0).x).to.equal(3);
      })
    })
    describe("removeRVOAgent function", function(){
      it("Throws an error on mismatched arguments", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let agent = Base.Serializer.deserializeGameObject(
          {
            new:"RVOAgent"
          }
        )
        let go = new GameObject();
        expect(()=>scene.removeRVOAgent()).to.throw();
        expect(()=>scene.removeRVOAgent(go)).to.throw();
        expect(()=>scene.removeRVOAgent(agent, 1)).to.throw();
      })
      it("Removes an agent from the simulation", function(){
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let agent0 = Base.SceneManager.instantiate(Base.Prefabs.RVOAgent, new Base.Point(0,0), new Base.Point(1,1), 0);
        let agent1 = Base.SceneManager.instantiate(Base.Prefabs.RVOAgent, new Base.Point(0,0), new Base.Point(1,1), 0);
        let agent0Component = agent0.getComponent("RVOAgent");
        let agent1Component = agent1.getComponent("RVOAgent");
        expect(scene.simulator.getNumAgents()).to.equal(2);
        expect(agent0Component._id).to.equal(0);
        expect(agent1Component._id).to.equal(1);        
        scene.removeRVOAgent(agent0);
        expect(scene.simulator.getNumAgents()).to.equal(1);
        expect(agent1Component._id).to.equal(0);        
      })
    })
  });
});
