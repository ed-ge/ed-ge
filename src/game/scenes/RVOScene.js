
export default {
    name: "RVOScene",
  
    objects: [      
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
          def:"Agent, 100, 100, RVOAgent"
      }
    ]
  }