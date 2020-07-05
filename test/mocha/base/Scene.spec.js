
import chai from "chai";
const expect = chai.expect;
import sinon from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai);

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import Scene from "../../../src/base/Scene.js";
import GameObject from "../../../src/base/GameObject.js";
import Point from "../../../src/base/Point.js";
import Sinon from "sinon";
import Input from "../../../src/base/Input.js";



beforeEach(function () {
  Base.SceneManager.Base = Base;
  Base.SceneManager.scenes = [];
  Base.SceneManager._currentSceneIndex = -1;
})

describe("Base", function () {
  describe("Scene.js", function () {
    describe("constructor", function () {
      it("Throws an error on mismatched arguments", function () {
        expect(() => new Scene()).to.throw();
        expect(() => new Scene(Scenes.allScenes[0])).to.throw();
        expect(() => new Scene(Scenes.allScenes[0], Base.Prefabs)).to.throw();
        expect(() => new Scene(Scenes.allScenes[0], Base.Prefabs, GameBehaviors)).to.throw();
        expect(() => new Scene(Scenes.allScenes[0], Base.Prefabs, GameBehaviors, Base.Components, 1)).to.throw();
      })
      it("Creates a new scene", function () {
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
    describe("boot function", function () {
      it("Throws an error on mismatched arguments", function () {
        let scene = new Scene(Scenes.allScenes[0], Base.Prefabs, GameBehaviors, Base.Components);
        expect(() => scene.boot(1)).to.throw();
      })
      it("Removes the previous scene's children children", function () {
        let allComponents = Object.assign(Base.Component, GameBehaviors);
        let scene = new Scene(Scenes.allScenes[0], Base.Prefabs, GameBehaviors, Base.Components);
        // let go = new GameObject();
        // go.name = "Remove me";
        // scene.addChild(go);
        //scene.boot();
        //expect(scene.children.includes(go)).to.be.false;
      })
    })
    describe("newChildEvent function", function () {
      it("Throws an error on mismatched arguments", function () {
        expect(() => new Base.Scene().newChildEvent).to.throw();
      })
      it("Updates the crowd simulator in the presence of an RVOAgent", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        //scene.boot();
        let def = { new: "RVOAgent" };
        let go = Base.Serializer.deserializeGameObject(def);
        expect(scene.simulator.agents).to.be.an('array').that.is.empty
        scene.newChildEvent(go);
        expect(scene.simulator.agents).to.be.an('array').of.length(1)

      })
      it("Updates the crowd simulator in the presence of an RVOObstacle", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        //scene.boot();
        let def = { new: "RVOObstacle" };
        let go = Base.Serializer.deserializeGameObject(def);
        expect(scene.simulator.obstacles).to.be.an('array').that.is.empty
        scene.newChildEvent(go);
        expect(scene.simulator.obstacles).to.be.an('array').of.length(8)

      })
    })
    describe("draw function", function () {
      it("Throws an error on mismatched arguments", function () {
      })
    })

    describe("update function", function () {
      let ctx = {
        canvas: {
          width: 100,
          height: 200
        }
      };
      let go;
      let go2;
      let go3;
      let screen1;
      let screen2;
      let screen3;
      let canvas;
      let camera;

      beforeEach(function(){
        go = Base.Serializer.deserializeGameObject(
          {
            new:"Circle"
          }
        )
        
        go.update = new Sinon.fake();
        go.getComponent("CircleCollider").onCollisionStay = new Sinon.fake();
        go.getComponent("CircleCollider").onMouseOver = new Sinon.fake();
        go.getComponent("CircleCollider").onMouseDown = new Sinon.fake();
        go.getComponent("CircleCollider").onTouchOver = new Sinon.fake();
        go.getComponent("CircleCollider").onTouchStart = new Sinon.fake();
        go.getComponent("CircleCollider").onTouchEnd = new Sinon.fake();

        go2 = Base.Serializer.deserializeGameObject(
          {
            new:"Circle"
          }
        )
        go2.getComponent("CircleCollider").onCollisionStay = new Sinon.fake();

        go3 = Base.Serializer.deserializeGameObject(
          {
            new:"Circle, 100, 100, Circle"
          }
        )
        go3.getComponent("CircleCollider").onCollisionStay = new Sinon.fake();
        go3.getComponent("CircleCollider").onMouseOver = new Sinon.fake();
        go3.getComponent("CircleCollider").onMouseDown = new Sinon.fake();
        go3.getComponent("CircleCollider").onTouchOver = new Sinon.fake();
        go3.getComponent("CircleCollider").onTouchStart = new Sinon.fake();
        go3.getComponent("CircleCollider").onTouchEnd = new Sinon.fake();

        screen1 = Base.Serializer.deserializeGameObject(
          {
            new:"Circle"
          }
        )
        
        screen1.update = new Sinon.fake();
        screen1.getComponent("CircleCollider").onCollisionStay = new Sinon.fake();
        screen1.getComponent("CircleCollider").onMouseOver = new Sinon.fake();
        screen1.getComponent("CircleCollider").onMouseDown = new Sinon.fake();
        screen1.getComponent("CircleCollider").onTouchOver = new Sinon.fake();
        screen1.getComponent("CircleCollider").onTouchStart = new Sinon.fake();
        screen1.getComponent("CircleCollider").onTouchEnd = new Sinon.fake();

        screen2 = Base.Serializer.deserializeGameObject(
          {
            new:"Circle"
          }
        )
        screen2.getComponent("CircleCollider").onCollisionStay = new Sinon.fake();

        screen3 = Base.Serializer.deserializeGameObject(
          {
            new:"Circle, 100, 100, Circle"
          }
        )
        screen3.getComponent("CircleCollider").onCollisionStay = new Sinon.fake();
        screen3.getComponent("CircleCollider").onMouseOver = new Sinon.fake();
        screen3.getComponent("CircleCollider").onMouseDown = new Sinon.fake();
        screen3.getComponent("CircleCollider").onTouchOver = new Sinon.fake();
        screen3.getComponent("CircleCollider").onTouchStart = new Sinon.fake();
        screen3.getComponent("CircleCollider").onTouchEnd = new Sinon.fake();

        canvas = Base.Serializer.deserializeGameObject({
          new:"Canvas",
          children:[
            
          ]
        })
        canvas.addChild(screen1);
        canvas.addChild(screen2);
        canvas.addChild(screen3);

        camera = Base.Serializer.deserializeGameObject({
          new:"Camera"
        })
        

        Base.Input.frameMouseButtonsDown[0] = true;
        Base.Input.frameTouchesStart = [{x:0,y:0}]
        Base.Input.frameTouchesEnd = [{x:0,y:0}]
        Base.Input.touches =  [{clientX:0,clientY:0}];
      })

      afterEach(function(){
        Base.Input.frameMouseButtonsDown[0] = false;
        Base.Input.frameTouchesStart = [];
        Base.Input.frameTouchesEnd = [];
      })

      it("Throws an error on mismatched arguments", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        expect(() => scene.update(ctx)).to.throw();
        expect(() => scene.update(ctx, Base.Components.Collider)).to.throw();
        expect(() => scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper, 1)).to.throw();

      })
      it("Calls update on the scene's game objects", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go);
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go.update).to.have.been.calledOnce;
      })
      it("Handles collisions without a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go);
        scene.addChild(go2)
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go.getComponent("CircleCollider").onCollisionStay).to.have.been.calledOnce;
        expect(go2.getComponent("CircleCollider").onCollisionStay).to.have.been.calledOnce;
        
      })
      it("Misses missing collisions without a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go);
        scene.addChild(go3)
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go.getComponent("CircleCollider").onCollisionStay).to.not.have.been.calledOnce;
        expect(go3.getComponent("CircleCollider").onCollisionStay).to.not.have.been.calledOnce;
        
      })
      it("Handles mouse collisions without a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go);
        
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go.getComponent("CircleCollider").onMouseOver).to.have.been.calledOnce;
        expect(go.getComponent("CircleCollider").onMouseDown).to.have.been.calledOnce;
        
      })
      it("Misses missing mouse collisions without a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go3);
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go3.getComponent("CircleCollider").onMouseOver).to.not.have.been.calledOnce;
        expect(go.getComponent("CircleCollider").onMouseDown).to.not.have.been.calledOnce;
        
      })
      it("Handles touch collisions without a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go);
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go.getComponent("CircleCollider").onTouchOver).to.have.been.calledOnce;
        expect(go.getComponent("CircleCollider").onTouchStart).to.have.been.calledOnce;
        expect(go.getComponent("CircleCollider").onTouchEnd).to.have.been.calledOnce;
        
      })
      it("Misses missing touch collisions without a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go3);
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go3.getComponent("CircleCollider").onTouchOver).to.not.have.been.calledOnce;
        expect(go3.getComponent("CircleCollider").onTouchStart).to.not.have.been.calledOnce;
        expect(go3.getComponent("CircleCollider").onTouchEnd).to.not.have.been.calledOnce;
        
      })
      it("Handles collisions with a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go);
        scene.addChild(go2)
        scene.addChild(camera);
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go.getComponent("CircleCollider").onCollisionStay).to.have.been.calledOnce;
        expect(go2.getComponent("CircleCollider").onCollisionStay).to.have.been.calledOnce;
        
      })
      it("Misses missing collisions with a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go);
        scene.addChild(go3)
        scene.addChild(camera);
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go.getComponent("CircleCollider").onCollisionStay).to.not.have.been.calledOnce;
        expect(go3.getComponent("CircleCollider").onCollisionStay).to.not.have.been.calledOnce;
        
      })
      it("Handles mouse collisions with a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go);
        scene.addChild(camera);
        Input.mousePosition.x = ctx.canvas.width/2;
        Input.mousePosition.y = ctx.canvas.height/2;
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go.getComponent("CircleCollider").onMouseOver).to.have.been.calledOnce;
        expect(go.getComponent("CircleCollider").onMouseDown).to.have.been.calledOnce;
        
      })
      it("Misses missing mouse collisions with a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go3);
        scene.addChild(camera);
        Input.mousePosition.x = ctx.canvas.width/2;
        Input.mousePosition.y = ctx.canvas.height/2;
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go3.getComponent("CircleCollider").onMouseOver).to.not.have.been.calledOnce;
        expect(go.getComponent("CircleCollider").onMouseDown).to.not.have.been.calledOnce;
        
      })
      it("Handles touch collisions with a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go);
        scene.addChild(camera);
        Input.touches[0].clientX = ctx.canvas.width/2;
        Input.touches[0].clientY = ctx.canvas.height/2;
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go.getComponent("CircleCollider").onTouchOver).to.have.been.calledOnce;
        expect(go.getComponent("CircleCollider").onTouchStart).to.have.been.calledOnce;
        expect(go.getComponent("CircleCollider").onTouchEnd).to.have.been.calledOnce;
        
      })
      it("Misses missing touch collisions with a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go3);
        scene.addChild(camera);
        Input.touches[0].clientX = ctx.canvas.width/2;
        Input.touches[0].clientY = ctx.canvas.height/2;
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(go3.getComponent("CircleCollider").onTouchOver).to.not.have.been.calledOnce;
        expect(go3.getComponent("CircleCollider").onTouchStart).to.not.have.been.calledOnce;
        expect(go3.getComponent("CircleCollider").onTouchEnd).to.not.have.been.calledOnce;
        
      })
      it("Handles collisions in screen space with a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(canvas);
        scene.addChild(camera);
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(screen1.getComponent("CircleCollider").onCollisionStay).to.have.been.calledOnce;
        expect(screen2.getComponent("CircleCollider").onCollisionStay).to.have.been.calledOnce;
        
      })
      it("Handles collisions in screen space without a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(screen1);
        scene.addChild(screen2)
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(screen1.getComponent("CircleCollider").onCollisionStay).to.have.been.calledOnce;
        expect(screen2.getComponent("CircleCollider").onCollisionStay).to.have.been.calledOnce;
        
      })
      it("Misses missing collisions  in screen space with a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(canvas);
        canvas.destroy(screen2);
        scene.addChild(camera);
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(screen1.getComponent("CircleCollider").onCollisionStay).to.not.have.been.calledOnce;
        expect(screen3.getComponent("CircleCollider").onCollisionStay).to.not.have.been.calledOnce;
        
      })
      it("Misses missing collisions  in screen space without a camera", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(canvas);
        canvas.destroy(screen2);
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(screen1.getComponent("CircleCollider").onCollisionStay).to.not.have.been.calledOnce;
        expect(screen3.getComponent("CircleCollider").onCollisionStay).to.not.have.been.calledOnce;
        
      })
      it("Handles mouse collisions in screen space", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(canvas);
        scene.addChild(camera);
        Input.mousePosition.x = 0;
        Input.mousePosition.y = 0;
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(screen1.getComponent("CircleCollider").onMouseOver).to.have.been.calledOnce;
      })
      it("Misses missing mouse collisions in screen space", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(canvas);
        scene.addChild(camera);
        Input.mousePosition.x = 0;
        Input.mousePosition.y = 0;
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(screen3.getComponent("CircleCollider").onMouseOver).to.not.have.been.calledOnce;
      })
      it("Handles touch collisions in screen space", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(canvas);
        scene.addChild(camera);
        Input.touches[0].clientX = 0;
        Input.touches[0].clientY = 0;
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(screen1.getComponent("CircleCollider").onTouchOver).to.have.been.calledOnce;
        expect(screen1.getComponent("CircleCollider").onTouchStart).to.have.been.calledOnce;
        expect(screen1.getComponent("CircleCollider").onTouchEnd).to.have.been.calledOnce;
        
      })
      it("Misses missing touch collisions in screen space", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(canvas);
        scene.addChild(camera);
        Input.touches[0].clientX = 0;
        Input.touches[0].clientY = 0;
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        expect(screen3.getComponent("CircleCollider").onTouchOver).to.not.have.been.calledOnce;
        expect(screen3.getComponent("CircleCollider").onTouchStart).to.not.have.been.calledOnce;
        expect(screen3.getComponent("CircleCollider").onTouchEnd).to.not.have.been.calledOnce;
        
      })
      it("Handles crowd simulation", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'EmptyScene' });
        let scene = Base.SceneManager.currentScene;
        scene.addChild(go);
        scene.update(ctx, Base.Components.Collider, Base.Components.CollisionHelper);
        
      })
    })

    describe("getCollidable function", function () {
      it("Throws an error on mismatched arguments", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let collidableChildren = [];
        expect(() => scene.getCollidable(scene)).to.throw();
        expect(() => scene.getCollidable(scene, collidableChildren)).to.throw();
        expect(() => scene.getCollidable(scene, collidableChildren, Base.components.Collider, 1)).to.throw();


      })
      it("Gets all the collidable objects in the scene", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let collidableChildren = [];
        scene.getCollidable(scene, collidableChildren, Base.Components.Collider)
        expect(collidableChildren).to.be.an('array').of.length(3);
      })
    })
    describe("canEnterSafely function", function () {
      it("Throws an error on mismatched arguments", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let collider = new Base.Components.CircleCollider();
        collider.radius = 5;
        expect(() => scene.canEnterSafely()).to.throw();
        expect(() => scene.canEnterSafely(new Point(0, 0))).to.throw();
        expect(() => scene.canEnterSafely(new Point(0, 0), collider)).to.throw();
        expect(() => scene.canEnterSafely(new Point(0, 0), collider, "RVOAgent", 1)).to.throw();

      })
      it("Returns true when the scene is empty", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let collider = new Base.Components.CircleCollider();
        collider.radius = 5;
        expect(scene.canEnterSafely(new Point(0, 0), collider, "RVOAgent")).to.be.true;
      })
      it("Returns true when there is nothing to hit", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let collider = new Base.Components.CircleCollider();
        collider.radius = 5;
        let agent0 = Base.Serializer.instantiate(Base.Prefabs.RVOAgent, Base.cs, new Base.Point(10, 10));

        expect(scene.canEnterSafely(new Point(0, 0), collider, "RVOAgent")).to.be.true;
      })
      it("Returns false if you cannot enter safely", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let collider = new Base.Components.CircleCollider();
        collider.radius = 5;
        let agent0 = Base.Serializer.instantiate(Base.Prefabs.RVOAgent,  Base.cs,new Base.Point(0, 0));

        expect(scene.canEnterSafely(new Point(0, 0), collider, "RVOAgent")).to.be.false;

      })
    })
    describe("updateRVOAgent function", function () {
      it("Throws an error on mismatched arguments", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let agent = Base.Serializer.deserializeGameObject(
          {
            new: "RVOAgent"
          }
        )
        let go = new GameObject();
        expect(() => scene.updateRVOAgent()).to.throw();
        expect(() => scene.updateRVOAgent(go)).to.throw();
        expect(() => scene.updateRVOAgent(agent, 1)).to.throw();
      })
      it("Updates an RVOAgent", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let agent0 = Base.Serializer.instantiate(Base.Prefabs.RVOAgent, Base.cs, new Base.Point(0, 0), new Base.Point(1, 1), 0);
        let agent1 = Base.Serializer.instantiate(Base.Prefabs.RVOAgent, Base.cs, new Base.Point(0, 0), new Base.Point(1, 1), 0);
        let agent0Component = agent0.getComponent("RVOAgent");
        let agent1Component = agent1.getComponent("RVOAgent");
        expect(scene.simulator.getNumAgents()).to.equal(2);
        expect(agent0Component._id).to.equal(0);
        expect(agent1Component._id).to.equal(1);


        expect(scene.simulator.getGoal(0).x).to.equal(0);
        agent0Component.destination = new Point(3, 4);
        scene.updateRVOAgent(agent0);
        expect(scene.simulator.getGoal(0).x).to.equal(3);
      })
    })
    describe("removeRVOAgent function", function () {
      it("Throws an error on mismatched arguments", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let agent = Base.Serializer.deserializeGameObject(
          {
            new: "RVOAgent"
          }
        )
        let go = new GameObject();
        expect(() => scene.removeRVOAgent()).to.throw();
        expect(() => scene.removeRVOAgent(go)).to.throw();
        expect(() => scene.removeRVOAgent(agent, 1)).to.throw();
      })
      it("Removes an agent from the simulation", function () {
        Base.main(GameObjects, GameBehaviors, Scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
        let scene = Base.SceneManager.currentScene;
        let agent0 = Base.Serializer.instantiate(Base.Prefabs.RVOAgent, Base.cs, new Base.Point(0, 0), new Base.Point(1, 1), 0);
        let agent1 = Base.Serializer.instantiate(Base.Prefabs.RVOAgent, Base.cs, new Base.Point(0, 0), new Base.Point(1, 1), 0);
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
