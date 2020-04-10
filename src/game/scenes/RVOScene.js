
export default {
    name: "RVOScene",
  
    objects: [
      {
        def:"Main Camera, 100, 100, 2,2, Camera",
        componentValues: ["CameraComponent|backgroundColor|white"],
      },      
      {
        name: "Main Controller",
        location: { x: 100, y:100},
        type: 'EmptyGameObject',
        children: [],
        components: ['BackToStartSceneBehavior']
      },
      {
          def:"Controller, 0, 0, RVOSimulator"
      },
      {
          def:"Agent, 100, 100, RVOAgent",
          componentValues:['RVOAgent|destination|{"x":300, "y":100}']
      },
      {
          def:"Agent, 150, 101, RVOAgent",
          componentValues:['RVOAgent|destination|{"x":0, "y":98}']
      },
      {
        def:"Obstacle, 125, 75, 20, 1, RVOObstacle",
      },
      
      {
        def:"Obstacle, 125, 125, 20, 1, RVOObstacle",
      },
      {
        def:"Spawner1, 60, 100, Rectangle",
        components:["SpawnBehavior|goalX|300|color|yellow"],
        componentValues:["RectangleComponent|width|5","RectangleComponent|height|50","RectangleComponent|fill|yellow","RectangleComponent|stroke|transparent"]
      },
      {
        def:"Spawner2, 190, 100, Rectangle",
        components:["SpawnBehavior|goalX|0|color|blue"],
        componentValues:["RectangleComponent|width|5","RectangleComponent|height|50","RectangleComponent|fill|blue","RectangleComponent|stroke|transparent"]
      }
      
    ]
  }