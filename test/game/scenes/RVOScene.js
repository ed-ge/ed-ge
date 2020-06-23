
export default {
    name: "RVOScene",
  
    objects: [
      {
        def:"Main Camera, 15, 0, 8,8, Camera",
        componentValues: ["CameraComponent|backgroundColor|white"],
      },      
      {
        def:"Spawner1, -40, 10, Rectangle",
        components:["SpawnBehavior|goalX|300|color|yellow"],
        componentValues:["RectangleComponent|width|5","RectangleComponent|height|25","RectangleComponent|fill|yellow","RectangleComponent|stroke|transparent",
        "AABBCollider|width|5","AABBCollider|height|25"]
      },
      {
        def:"Spawner2, 90, 10, Rectangle",
        components:["SpawnBehavior|goalX|-100|color|blue"],
        componentValues:["RectangleComponent|width|5","RectangleComponent|height|25","RectangleComponent|fill|blue","RectangleComponent|stroke|transparent","AABBCollider|width|5","AABBCollider|height|25"]
      },
      {
        def:"MainController, Empty",
        components: ['BackToStartSceneBehavior']
      },
      {
          def:"Controller, 0, 0, RVOSimulator"
      },
      {
          def:"Agent, 0, 10, RVOAgent",
          componentValues:['RVOAgent|destination|{"x":300, "y":10}']
      },
      {
          def:"Agent, 50, 11, RVOAgent",
          componentValues:['RVOAgent|destination|{"x":-100, "y":11}']
      },
      {
        def:"Obstacle, 25, 0, 30, 1, RVOObstacle",
      },
      
      {
        def:"Obstacle, 25, 25, 30, 1, RVOObstacle",
      },
      
      
    ]
  }