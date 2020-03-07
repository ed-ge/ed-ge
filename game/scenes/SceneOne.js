export default {
  name :"SceneOne",

  objects : [
    {
      name:"Rotating Square",
      location: {x:200, y:200},
      type:'RotatingSquare',
    },
    {
      name:"Text Timer",
      location: {x:200, y:200},
      type:'Text',
    },
    {
      name:"Oscillating Circle",
      location: {x:100, y:100},
      type:'OscillatingCircle',
      children:[
        {
          name:"Moon",
          location: {x:0, y:0},
          type:'Moon',
        },
      ]
    },
    {
      name:"Main Controller",
      location: {x:100, y:100},
      type: 'EmptyGameObject',
      children:[],
      components:[
        {
          type:'BackToStartSceneBehavior',
        }
      ]
    }
    
  ]

  
}