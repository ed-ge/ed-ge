
export default {
  name: "SceneTwo",

  objects: [
    {
      def:"conter, 10, 80, Text",
      componentValues: ['TextComponent|text|A']
    },
    {
      def:"timer, 10, 40, Timer",
      componentValues: ['CountDownTimer|toSceneText|SceneTwoB']
    },
    {
      def:"Main Controller, 100, 100, EmptyGameObject",
      components: ['BackToStartSceneBehavior']
    }
  ]
}