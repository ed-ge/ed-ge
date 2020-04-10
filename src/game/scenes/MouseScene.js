
export default {
  name: "MouseScene",

  objects: [
    {
      def: "Main Camera, 300, 300, Camera",
      componentValues: ["CameraComponent|backgroundColor|white"],
      components: ["CameraMover"]
    },
    {
      def: "Canvas",
      children: [
        {
          def: "Text, 150, 150, Text",
          components: ["MouseText"]
        },
      ]
    },
    {
      def:"Rectangle, 300, 300, Rectangle",
      components: ["ClickBehavior"]
    },
    {
      def:"Rectangle, 200, 200, Rectangle",
      components: ["ClickBehavior"]
    },
    {
      def:"Rectangle, 200, 300, Rectangle",
      components: ["ClickBehavior"]
    },
    {
      def:"Rectangle, 300, 200, Rectangle",
      components: ["ClickBehavior"]
    },
    {
      def:"Main Controller, 100, 100, EmptyGameObject",
      components: ["BackToStartSceneBehavior"]
    }

  ]
}