export default  {
  name: "StartScene",  
  objects : [
    {
      def : "StartSceneListener",
    },
    {
      def : "Click, 10, 40, Text",
      componentValues: [
        {
          type: "TextComponent",
          values: ["text,Click the mouse to start the collision game."]
        }
      ]
    },
    {
      def: "Enter, 10, 80, 1, Text",
      componentValues: [
        {
          type: "TextComponent",
          values: ["text,Push 'enter' ('return' on Mac) to start the strategy game."]
        }
      ]
    },
    {
      def:"Space, 10, 120, Text",
      componentValues: [
        {
          type: "TextComponent",
          values: ["text,Push space to start the drawing test game."]
        }
      ]
    },
    {
      def:"a, 10, 160, Text",
      componentValues: [
        {
          type: "TextComponent",
          values: ["text,Push 'a' to start the scene test game."]
        }
      ]
    },
    {
      def:"r, 10, 200, Text",
      componentValues: [
        {
          type: "TextComponent",
          values: ["text,Push 'r' to start the room test game."]
        }
      ]
    },
    {
      def:"c, 10, 240, Text",
      componentValues: [
        {
          type: "TextComponent",
          values: ["text,Push 'c' to start the circle collision test game."]
        }
      ]
    },
    {
      def:"m, 10, 280, Text",
      componentValues: [
        {
          type: "TextComponent",
          values: ["text,Push 'm' to start the mouse test game."]
        }
      ]
    },
  ]
}