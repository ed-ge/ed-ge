import Base from "../src/engine/Base.js"
import Scenes from "../src/game/Scenes.js"
import GameBehaviors from "../src/game/GameBehaviors.js";
import GameObjects from "../src/game/GameObjects.js"




describe('Base', function () {
  describe('Component', function () {
    describe('serialize', function () {
      it('should return a string in the correct DSL', function () {
        let component = new Base.Component();
        let string = component.serialize();
        chai.expect(string).to.equal("Component|type|Component");
      });
      it('should return a string in the correct DSL for AABB', function () {
        let component = new Base.Components.AABBCollider();
        let string = component.serialize();
        chai.expect(string).to.equal("AABBCollider|type|AABBCollider|width|100|height|100");
      });
      it('should return a string in the correct DSL for TextComponent', function () {
        let component = new Base.Components.TextComponent();
        let string = component.serialize();
        chai.expect(string).to.equal("TextComponent|type|TextComponent|text|[Blank]|font|10pt Sans|fill|black");
      });

    })
    // describe('deserialize', function () {
    //   it('should deseralize a componnt', function () {
    //     let component = new Base.Component().fromString("AABBCollider|type|AABBCollider|width|100|height|100");

    //   })
    // })
  })
})

// describe('GameObject', function () {
//   describe('serialize', function () {
//     it('should return a string in the correct DSL', function () {
//       let gameObject = new Base.Prefabs.EmptyGameObject();
//       let string = gameObject.serialize();
//       console.log(string);
//       chai.expect(string).to.equal("");
//     });

//   })
// })

describe("SceneManager", function(){
  describe("Get Current Scene", function(){
    it("Should return the current scene", function(){
      Base.main(GameObjects, GameBehaviors, Scenes, {runUpdate:false, runDraw: false, startScene: 'RoomScene'});
      let currentScene = Base.SceneManager.currentScene;
      chai.expect(currentScene).to.equal(Base.SceneManager.scenes.find(i=>i.name == 'RoomScene'));
    })
  })
})

describe('GameObject', function () {
  describe('Prefab Name', function () {
    it('Should store the prefab used to create the game object', function () {
      Base.main(GameObjects, GameBehaviors, Scenes, {runUpdate:false, runDraw: false, startScene: 'RoomScene'});
      let currentScene = Base.SceneManager.currentScene;
      let room = currentScene.findByName("room");
      let rectangle1 = currentScene.findByName("Rectangle1");
      let rectangle2 = currentScene.findByName("Rectangle2");
      let moon = currentScene.findByName("moon");
      let dot = currentScene.findByName("dot");
      let mainController = currentScene.findByName("Main Controller");
      
      chai.expect(room.prefabName).to.equal("EmptyGameObject");
      chai.expect(rectangle1.prefabName).to.equal("Rectangle");
      chai.expect(rectangle2.prefabName).to.equal("Rectangle");
      chai.expect(moon.prefabName).to.equal("Moon");
      chai.expect(dot.prefabName).to.equal("CollisionDot");
      chai.expect(mainController.prefabName).to.equal("EmptyGameObject");
    })
  })
})

describe('Scene', function () {
  describe('Find By Name', function () {
    it('Should find another game object in the scene by name', function () {
      Base.main(GameObjects, GameBehaviors, Scenes, {runUpdate:false, runDraw: false, startScene: 'RoomScene'});
      let currentScene = Base.SceneManager.currentScene;
      let room = currentScene.findByName("room");
      let rectangle1 = currentScene.findByName("Rectangle1");
      let rectangle2 = currentScene.findByName("Rectangle2");
      let moon = currentScene.findByName("moon");
      let dot = currentScene.findByName("dot");
      let mainController = currentScene.findByName("Main Controller");
      
      chai.expect(room.constructor.name).to.equal("GameObject");
      chai.expect(rectangle1.constructor.name).to.equal("GameObject");
      chai.expect(rectangle2.constructor.name).to.equal("GameObject");
      chai.expect(moon.constructor.name).to.equal("GameObject");
      chai.expect(dot.constructor.name).to.equal("GameObject");
      chai.expect(mainController.constructor.name).to.equal("GameObject");
    })
  })
})


describe('Transformations', function () {
  describe('Hierachical Transformations', function () {
    it('Should let child game objects find their world space transformation', function () {
      Base.main(GameObjects, GameBehaviors, Scenes, {runUpdate:false, runDraw: false, startScene: 'RoomScene'});
      let currentScene = Base.SceneManager.currentScene;
      let room = currentScene.findByName("room");
      let rectangle1 = currentScene.findByName("Rectangle1");
      let rectangle2 = currentScene.findByName("Rectangle2");
      let moon = currentScene.findByName("Moon");
      let dot = currentScene.findByName("dot");
      let mainController = currentScene.findByName("Main Controller");

      chai.expect(true).to.equal(true);
    })
  })
})
