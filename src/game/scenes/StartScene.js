export default {
  name: "StartScene",
  objects: [
    {
      def: "StartSceneListener",
    },
    {
      def: "Circle",
      componentValues: ["CircleComponent|radius| 1"]
    },
    {
      def: "Click, 10, 40, Text",
      componentValues: ["TextComponent|text|Click the mouse to start the collision game."]
    },
    {
      def: "Enter, 10, 80, 1, Text",
      componentValues: ["TextComponent|text|Push 'enter' ('return' on Mac) to start the strategy game."]
    },
    {
      def: "Space, 10, 120, Text",
      componentValues: ["TextComponent|text|Push space to start the drawing test game."]
    },
    {
      def: "a, 10, 160, Text",
      componentValues: ["TextComponent|text|Push 'a' to start the scene test game."]
    },
    {
      def: "r, 10, 200, Text",
      componentValues: ["TextComponent|text|Push 'r' to start the room test game."]
    },
    {
      def: "c, 10, 240, Text",
      componentValues: ["TextComponent|text|Push 'c' to start the circle collision test game."]
    },
    {
      def: "m, 10, 280, Text",
      componentValues: ["TextComponent|text|Push 'm' to start the mouse test game."]
    },
    {
      def:"s, 10, 320, Text",
      componentValues:["TextComponent| text| Push 's' to start the crowd simulation."]
    },
    {
      def:"t, 10, 360, Text",
      componentValues:["TextComponent| text| Push 't' to start the touch test game."]
    }
  ]
}