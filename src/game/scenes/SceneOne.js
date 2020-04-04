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
          values: ["backgroundColor,white"]
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
              values: ["anchorHorizontal, left","anchorVertical,top"]
            },
            {
              type: "TextComponent",
              values: ["text, left top"]
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
              values: ["anchorHorizontal,center","anchorVertical,top"]
            },
            {
              type: "TextComponent",
              values: ["text,center top"]
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
              values: ["anchorHorizontal, right","anchorVertical,top"]
            },
            {
              type: "TextComponent",
              values: ["text,right top"]
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
              values: ["anchorHorizontal,left","anchorVertical,middle"]
            },
            {
              type: "TextComponent",
              values: ["text, left middle"]
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
              values: ["anchorHorizontal,center","anchorVertical,middle"]
            },
            {
              type: "TextComponent",
              values: ["text,center middle" ]
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
              values: ["anchorHorizontal,right","anchorVertical,middle"]
            },
            {
              type: "TextComponent",
              values: ["text,right middle"]
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
              values: ["anchorHorizontal,left","anchorVertical,bottom"]
            },
            {
              type: "TextComponent",
              values: ["text,left bottom"]
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
              values: ["anchorHorizontal,center","anchorVertical,bottom"]
            },
            {
              type: "TextComponent",
              values: ["text,center bottom"]
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
              values: ["anchorHorizontal,right","anchorVertical,bottom"]
            },
            {
              type: "TextComponent",
              values: ["text,right bottom"]
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