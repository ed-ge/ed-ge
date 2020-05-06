export default {
  name: "SceneOne",

  objects: [
    {
      def:"Main Camera, 100, 100, 2,2, Camera",
      componentValues: ["CameraComponent|backgroundColor|white"],
      components: ["CameraMover"]
    },
    {
      def:"Canvas",
      children: [
        {
          def:"ScreenText, 50, 50, ScreenText",
          componentValues: ["RectTransform|anchorHorizontal| left", "RectTransform|anchorVertical|top", "TextComponent|text| left top"]
        },
        {
          def:"ScreenText, 0, 50, ScreenText",
          componentValues: ["RectTransform|anchorHorizontal|center", "RectTransform|anchorVertical|top", "TextComponent|text|center top"]
        },
        {
          def:"ScreenText, -150, 50, ScreenText",
          componentValues: ["RectTransform|anchorHorizontal| right", "RectTransform|anchorVertical|top", "TextComponent|text|right top"]
        },
        {
          def:"ScreenText, 50, 0, ScreenText",
          componentValues: ["RectTransform|anchorHorizontal|left", "RectTransform|anchorVertical|middle", "TextComponent|text| left middle"]
        },
        {
          def:"ScreenText, 0, 0, ScreenText",
          componentValues: ["RectTransform|anchorHorizontal|center", "RectTransform|anchorVertical|middle", "TextComponent|text|center middle"]
        },
        {
          def:"ScreenText, -150, 0, ScreenText",
          componentValues: ["RectTransform|anchorHorizontal|right", "RectTransform|anchorVertical|middle", "TextComponent|text|right middle"]
        },
        {
          def:"ScreenText, 50, -50, ScreenText",
          componentValues: ["RectTransform|anchorHorizontal|left", "RectTransform|anchorVertical|bottom", "TextComponent|text|left bottom"]
        },
        {
          def:"ScreenText, 0, -50, ScreenText",
         componentValues: ["RectTransform|anchorHorizontal|center", "RectTransform|anchorVertical|bottom", "TextComponent|text|center bottom"]
        },
        {
          def:"ScreenText, -150, -50, ScreenText",
          componentValues: ["RectTransform|anchorHorizontal|right", "RectTransform|anchorVertical|bottom", "TextComponent|text|right bottom"]
        },

      ]
    },
    {
      def:"Rotating Square, 200, 200, RotatingSquare"
    },
    {
      def: "Text Timer, 200, 200, Text",
    },
    {
      def:"Oscillating Circle, 100, 100, OscillatingCircle",
      children: [
        {
          def:"Moon"
        },
      ]
    },
    {
      def:"Triangle, 300, 300, EmptyGameObject",
      components: ["ScaleBehavior","TriangleComponent|fill|white|stroke|red|pointAX|0|pointAY|0|pointBX|100|pointBY|100|pointCX|200|pointCY|0 "]
    },
    {
      def:"Main Controller, 100, 100, EmptyGameObject",
      components: ['BackToStartSceneBehavior']
    },
    {
      def:"Empty, 100, 100, EmptyGameObject",
      components: ["RectangleComponent|fill|gray|width|10|height|10"]

    },

  ]


}