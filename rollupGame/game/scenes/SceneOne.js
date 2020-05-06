export default {
  name: "SceneOne",

  objects: [
    {
      name: "Main Camera",
      location: { x: 100, y: 100 },
      scale: { x: 2, y: 2 },
      rotation: 0,
      type: "Camera",
      componentValues: [
        {
          type: "CameraComponent",
          values: [
            {
              key: "backgroundColor",
              value: "white"
            }
          ]
        }
      ],
      components: [
        {
          type: "CameraMover"
        }
      ]
    },
    {
      name: "Canvas",
      location: { x: 0, y: 0 },
      type: "Canvas",
      children: [
        {
          name: "ScreenText",
          location: { x: 50, y: 50 },
          type: "ScreenText",
          componentValues: [
            {
              type: "RectTransform",
              values: [
                {
                  key: "anchorHorizontal",
                  value: "left"
                },
                {
                  key: "anchorVertical",
                  value: "top"
                },
              ]
            },
            {
              type: "TextComponent",
              values: [
                {
                  key: "text",
                  value: "left top"
                },

              ]
            },
          ]
        },
        {
          name: "ScreenText",
          location: { x: 0, y: 50 },
          type: "ScreenText",
          componentValues: [
            {
              type: "RectTransform",
              values: [
                {
                  key: "anchorHorizontal",
                  value: "center"
                },
                {
                  key: "anchorVertical",
                  value: "top"
                },
              ]
            },
            {
              type: "TextComponent",
              values: [
                {
                  key: "text",
                  value: "center top"
                },

              ]
            },
          ]
        },
        {
          name: "ScreenText",
          location: { x: -150, y: 50 },
          type: "ScreenText",
          componentValues: [
            {
              type: "RectTransform",
              values: [
                {
                  key: "anchorHorizontal",
                  value: "right"
                },
                {
                  key: "anchorVertical",
                  value: "top"
                },
              ]
            },
            {
              type: "TextComponent",
              values: [
                {
                  key: "text",
                  value: "right top"
                },

              ]
            },
          ]
        },
        {
          name: "ScreenText",
          location: { x: 50, y: 0 },
          type: "ScreenText",
          componentValues: [
            {
              type: "RectTransform",
              values: [
                {
                  key: "anchorHorizontal",
                  value: "left"
                },
                {
                  key: "anchorVertical",
                  value: "middle"
                },
              ]
            },
            {
              type: "TextComponent",
              values: [
                {
                  key: "text",
                  value: "left middle"
                },

              ]
            },
          ]
        },
        {
          name: "ScreenText",
          location: { x: 0, y: 0 },
          type: "ScreenText",
          componentValues: [
            {
              type: "RectTransform",
              values: [
                {
                  key: "anchorHorizontal",
                  value: "center"
                },
                {
                  key: "anchorVertical",
                  value: "middle"
                },
              ]
            },
            {
              type: "TextComponent",
              values: [
                {
                  key: "text",
                  value: "center middle"
                },

              ]
            },
          ]
        },
        {
          name: "ScreenText",
          location: { x: -150, y: 0 },
          type: "ScreenText",
          componentValues: [
            {
              type: "RectTransform",
              values: [
                {
                  key: "anchorHorizontal",
                  value: "right"
                },
                {
                  key: "anchorVertical",
                  value: "middle"
                },
              ]
            },
            {
              type: "TextComponent",
              values: [
                {
                  key: "text",
                  value: "right middle"
                },

              ]
            },
          ]
        },
        {
          name: "ScreenText",
          location: { x: 50, y: -50 },
          type: "ScreenText",
          componentValues: [
            {
              type: "RectTransform",
              values: [
                {
                  key: "anchorHorizontal",
                  value: "left"
                },
                {
                  key: "anchorVertical",
                  value: "bottom"
                },
              ]
            },
            {
              type: "TextComponent",
              values: [
                {
                  key: "text",
                  value: "left bottom"
                },

              ]
            },
          ]
        },
        {
          name: "ScreenText",
          location: { x: 0, y: -50 },
          type: "ScreenText",
          componentValues: [
            {
              type: "RectTransform",
              values: [
                {
                  key: "anchorHorizontal",
                  value: "center"
                },
                {
                  key: "anchorVertical",
                  value: "bottom"
                },
              ]
            },
            {
              type: "TextComponent",
              values: [
                {
                  key: "text",
                  value: "center bottom"
                },

              ]
            },
          ]
        },
        {
          name: "ScreenText",
          location: { x: -150, y: -50 },
          type: "ScreenText",
          componentValues: [
            {
              type: "RectTransform",
              values: [
                {
                  key: "anchorHorizontal",
                  value: "right"
                },
                {
                  key: "anchorVertical",
                  value: "bottom"
                },
              ]
            },
            {
              type: "TextComponent",
              values: [
                {
                  key: "text",
                  value: "right bottom"
                },

              ]
            },
          ]
        },

      ]
    },

    {
      name: "Rotating Square",
      location: { x: 200, y: 200 },
      type: 'RotatingSquare',
    },
    {
      name: "Text Timer",
      location: { x: 200, y: 200 },
      type: 'Text',
    },
    {
      name: "Oscillating Circle",
      location: { x: 100, y: 100 },
      type: 'OscillatingCircle',
      children: [
        {
          name: "Moon",
          location: { x: 0, y: 0 },
          type: 'Moon',
        },
      ]
    },
    {
      name: "Triangle",
      location: { x: 300, y: 300 },
      type: "EmptyGameObject",
      components: [
        {
          type: "ScaleBehavior",
        },
        {
          type: "TriangleComponent",
          values: [
            {
              key: "fill",
              value: "white"
            },
            {
              key: "stroke",
              value: "red"
            },
            {
              key: "pointAX",
              value: "0",
            },
            {
              key: "pointAY",
              value: "0",
            },
            {
              key: "pointBX",
              value: "100",
            },
            {
              key: "pointBY",
              value: "100",
            },
            {
              key: "pointCX",
              value: "200",
            },
            {
              key: "pointCY",
              value: "0 ",
            },
          ]
        }
      ]
    },
    {
      name: "Main Controller",
      location: { x: 100, y: 100 },
      type: 'EmptyGameObject',
      children: [],
      components: [
        {
          type: 'BackToStartSceneBehavior',
        }
      ]
    },
    {
      name: "",
      location: { x: 100, y: 100 },
      type: "EmptyGameObject",
      components: [
        {
          type: "RectangleComponent",
          values: [
            {
              key: "fill",
              value: "gray",

            },
            {
              key: "width",
              value: "10",
            },
            {
              key: "height",
              value: "10"
            }
          ]
        }
      ]

    },

  ]


}