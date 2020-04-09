
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
          componentValues:['RVOAgent|destination|{"x":150, "y":100}']
      },
      {
          def:"Agent, 150, 101, RVOAgent",
          componentValues:['RVOAgent|destination|{"x":101, "y":98}']
      }
    ]
  }