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
          values: [
            {
              key: "text",
              value: "Click the mouse to start the collision game.",
            }
          ]
        }
      ]
    },
    {
      def: "Enter, 10, 80, 1, Text",
      componentValues: [
        {
          type: "TextComponent",
          values: [
            {
              key: "text",
              value: "Push 'enter' ('return' on Mac) to start the strategy game.",
            }
          ]
        }
      ]
    },
    {
      name: "Space",
      location: {x:10, y:120},
      type: "Text",
      componentValues: [
        {
          type: "TextComponent",
          values: [
            {
              key: "text",
              value: "Push space to start the drawing test game.",
            }
          ]
        }
      ]
    },
    {
      name: "a",
      location: {x:10,y:160},
      type: "Text",
      componentValues: [
        {
          type: "TextComponent",
          values: [
            {
              key: "text",
              value: "Push 'a' to start the scene test game.",
            }
          ]
        }
      ]
    },
    {
      name: "r",
      location: {x:10,y:200},
      type: "Text",
      componentValues: [
        {
          type: "TextComponent",
          values: [
            {
              key: "text",
              value: "Push 'r' to start the room test game.",
            }
          ]
        }
      ]
    },
    {
      name: "c",
      location: {x:10,y:240},
      type: "Text",
      componentValues: [
        {
          type: "TextComponent",
          values: [
            {
              key: "text",
              value: "Push 'c' to start the circle collision test game.",
            }
          ]
        }
      ]
    },
    {
      name: "m",
      location: {x:10,y:280},
      type: "Text",
      componentValues: [
        {
          type: "TextComponent",
          values: [
            {
              key: "text",
              value: "Push 'm' to start the mouse test game.",
            }
          ]
        }
      ]
    },
  ]
}