
export default {
  name: "SceneTwoB",

  objects: [
    {
      name: "counter",
      type: 'Text',
      location: { x: 10, y:80},
      componentValues: [
        {
          type: 'TextComponent',
          values: ["text,B"]
        }
      ]
    },
    {
      name: "timer",
      type: 'Timer',
      location: { x: 10, y:40},
      componentValues: [
        {
          type: 'CountDownTimer',
          values: ["toSceneText,SceneTwo"]
        }
      ]
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