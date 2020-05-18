

import chai from "chai";


import Base from "../../../../src/Base.js"




describe('Base', function () {
  describe('Serializer', function () {
    it('should return a string in the correct DSL', function () {
      let component = new Base.Component();
      let string = Base.Serializer.serializeComponent(component);
      chai.expect(string).to.equal("Component|type|Component");
    });
    it('should return a string in the correct DSL for AABB', function () {
      let component = new Base.Components.AABBCollider();
      let string = Base.Serializer.serializeComponent(component);
      chai.expect(string).to.equal("AABBCollider|type|AABBCollider|width|100|height|100");
    });
    it('should return a string in the correct DSL for TextComponent', function () {
      let component = new Base.Components.TextComponent();
      let string = Base.Serializer.serializeComponent(component);
      chai.expect(string).to.equal("TextComponent|type|TextComponent|text|[Blank]|font|10pt Sans|fill|black");
    });

    it('should deserialize a component', function () {
      let component = Base.Serializer.deserializeComponent("AABBCollider|type|AABBCollider|width|111|height|20");
      chai.expect(component.width).to.equal("111");
      chai.expect(component.height).to.equal("20");
      chai.expect(component.type).to.equal("AABBCollider");
    })

    it("Should return the correct object and strings", function () {
      let description = {
        def: "Circle"
      };
      let gameObject = Base.Serializer.deserializeGameObject(description);
      chai.expect(gameObject.name).to.equal("Circle");
      chai.expect(gameObject.children.length).to.equal(0);
      chai.expect(gameObject.components.length).to.equal(2);
      chai.expect(gameObject.x).to.equal(0);
      chai.expect(gameObject.y).to.equal(0);
      chai.expect(gameObject.scaleX).to.equal(1);
      chai.expect(gameObject.scaleY).to.equal(1);
      chai.expect(gameObject.rotation).to.equal(0);

      let component = gameObject.components[0];
      chai.expect(component.constructor.name).to.equal("CircleComponent");

      component = gameObject.components[1];
      chai.expect(component.constructor.name).to.equal("CircleCollider");

    })
  })
})





// let _scenes = {
//   startScene: "RoomScene",
//   allScenes: [
//     {
//       name: "RoomScene",

//       objects: [
//         {
//           def: "room, 0, 0, EmptyGameObject",
//           children: [
//             {
//               def: "Rectangle1, 100, 200, Rectangle",
//             },
//             {
//               def: "Rectangle2, 300, 100, Rectangle",
//               children: [
//                 {
//                   def: "moon, 0, 0, Moon"
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           def: "dot, 200, 200, CollisionDot",
//         },
//         {
//           def: "Main Controller, 100, 100, EmptyGameObject",
//           components: ["BackToStartSceneBehavior"]
//         }

//       ]
//     }
//   ]
// }

// describe('GameObject', function () {

//   Base.main(GameObjects, GameBehaviors, _scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
//   let currentScene = Base.SceneManager.currentScene;
//   let room = currentScene.findByName("room");
//   let rectangle1 = currentScene.findByName("Rectangle1");
//   let rectangle2 = currentScene.findByName("Rectangle2");
//   let moon = currentScene.findByName("moon");
//   let dot = currentScene.findByName("dot");
//   let mainController = currentScene.findByName("Main Controller");

//   describe('Prefab Name', function () {
//     it('Should store the prefab used to create the game object', function () {
//       chai.expect(room.prefabName).to.equal("EmptyGameObject");
//       chai.expect(rectangle1.prefabName).to.equal("Rectangle");
//       chai.expect(rectangle2.prefabName).to.equal("Rectangle");
//       chai.expect(moon.prefabName).to.equal("Moon");
//       chai.expect(dot.prefabName).to.equal("CollisionDot");
//       chai.expect(mainController.prefabName).to.equal("EmptyGameObject");
//     })
//   });

//   describe('Local Transformations', function () {
//     it('Should let child game objects maintain their local transformations', function () {
//       chai.expect(room.x).to.equal(0);
//       chai.expect(room.y).to.equal(0);
//       chai.expect(rectangle1.x).to.equal(100);
//       chai.expect(rectangle1.y).to.equal(200);
//       chai.expect(rectangle2.x).to.equal(300);
//       chai.expect(rectangle2.y).to.equal(100);
//       chai.expect(moon.x).to.equal(0);
//       chai.expect(moon.y).to.equal(0);
//       chai.expect(dot.x).to.equal(200);
//       chai.expect(dot.y).to.equal(200);
//       chai.expect(mainController.x).to.equal(100);
//       chai.expect(mainController.y).to.equal(100);
//     })
//   })

//   describe('World Space Transformations', function () {
//     it('Should let child game objects know their world space transformations', function () {
//       chai.expect(room.worldLocation.x).to.equal(0);
//       chai.expect(room.worldLocation.y).to.equal(0);
//       chai.expect(rectangle1.worldLocation.x).to.equal(100);
//       chai.expect(rectangle1.worldLocation.y).to.equal(200);
//       chai.expect(rectangle2.worldLocation.x).to.equal(300);
//       chai.expect(rectangle2.worldLocation.y).to.equal(100);
//       chai.expect(moon.worldLocation.x).to.equal(300);
//       chai.expect(moon.worldLocation.y).to.equal(100);
//       chai.expect(dot.worldLocation.x).to.equal(200);
//       chai.expect(dot.worldLocation.y).to.equal(200);
//       chai.expect(mainController.worldLocation.x).to.equal(100);
//       chai.expect(mainController.worldLocation.y).to.equal(100);
//     })
//   })
// })

// describe('Scene', function () {
//   describe('Find By Name', function () {
//     it('Should find another game object in the scene by name', function () {
//       Base.main(GameObjects, GameBehaviors, _scenes, { runUpdate: false, runDraw: false, startScene: 'RoomScene' });
//       let currentScene = Base.SceneManager.currentScene;
//       let room = currentScene.findByName("room");
//       let rectangle1 = currentScene.findByName("Rectangle1");
//       let rectangle2 = currentScene.findByName("Rectangle2");
//       let moon = currentScene.findByName("moon");
//       let dot = currentScene.findByName("dot");
//       let mainController = currentScene.findByName("Main Controller");

//       chai.expect(room.constructor.name).to.equal("GameObject");
//       chai.expect(rectangle1.constructor.name).to.equal("GameObject");
//       chai.expect(rectangle2.constructor.name).to.equal("GameObject");
//       chai.expect(moon.constructor.name).to.equal("GameObject");
//       chai.expect(dot.constructor.name).to.equal("GameObject");
//       chai.expect(mainController.constructor.name).to.equal("GameObject");
//     })
//   })
// })


