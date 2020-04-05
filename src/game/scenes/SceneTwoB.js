
export default {
  name: "SceneTwoB",

  objects: [
    {
      name: "counter",
      type: 'Text',
      location: { x: 10, y:80},
      componentValues: ['TextComponent,text,B']
    },
    {
      name: "timer",
      type: 'Timer',
      location: { x: 10, y:40},
      componentValues: ['CountDownTimer,toSceneText,SceneTwo']
    },
    {
      name: "Main Controller",
      location: { x: 100, y:100},
      type: 'EmptyGameObject',
      children: [],
      components: [
        {
          type: 'BackToStartSceneBehavior',
        }
      ]
    }
  ]
}