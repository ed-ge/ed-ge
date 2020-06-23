
export default {
  name: "SceneTwoB",

  objects: [
    {
      def:"conter, 10, 80, Text",
      componentValues: ['TextComponent|text|B']
    },
    {
      def:"timer, 10, 40, Timer",
      componentValues: ['CountDownTimer|toSceneText|SceneTwo']
    },
    {
      def:"Main Controller, 100, 100, Empty",
      components: ['BackToStartSceneBehavior']
    }
  ]
}