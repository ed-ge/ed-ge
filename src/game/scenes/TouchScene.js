
export default {
  name: "TouchScene",

  objects: [
    {
      def: "Main Camera, 300, 300, Camera",
      componentValues: ["CameraComponent|backgroundColor|lightgray"],
      
    },
    {
      def: "Canvas",
      children: [
        {
          def: "Text, 150, 150, Text",
          components: ["TouchText"]
        },
      ]
    },
    {
      def:"Rectangle, 300, 300, Rectangle",
      components: ["TouchDelta"]
    },
    {
      def:"Rectangle, 400, 400, Rectangle",
      components: ["TouchStart"]
    },
    {
      def:"Rectangle, 500, 500, Rectangle",
      components: ["TouchEnd"]
    },
    
    {
      def:"Main Controller, 100, 100, EmptyGameObject",
      components: ["BackToStartSceneBehavior"]
    }

  ]
}