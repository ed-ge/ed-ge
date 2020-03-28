

const GameObjects = (function () {

  return {
    Camera: {
      name: "Camera",
      components: [
        {
          type: "CameraComponent",
          values: [
            {
              key: "backgroundColor",
              value: "white"
            }
          ]
        }
      ]
    },
    Canvas: {
      name: "Canvas",
      components: [
        {
          type: "CanvasComponent",
        }
      ]
    },
    CollisionCircle: {
      name: "CollisionCircle",
      components: [
        {
          type: "CircleComponent",
          values: [
            {
              key: "radius",
              value: "50"
            },
            {
              key: "fill",
              value: "rgba(255,255,0,.5)"
            },
            {
              key: "stroke",
              value: "black"
            },
          ]
        },
        {
          type: "CircleCollider",
          values: [
            {
              key: "radius",
              value: "50"
            }
          ]
        },
        {
          type: "CollisionCircleBehavior",
        },
      ]
    },
    CollisionDot: {
      name: "CollisionDot",
      components: [
        {
          type: "CircleComponent",
          values: [
            {
              key: "radius",
              value: "2"
            },
            {
              key: "fill",
              value: "black"
            },
            {
              key: "stroke",
              value: "black"
            },
          ]
        },
        {
          type: "MovementBehavior",
        },
        {
          type: "DotBehavior",
        },
        {
          type: "PointCollider",
        },
      ]
    },
    EmptyGameObject: {
      name: "EmptyGameObject",
      components: []
    },
    Moon: {
      name: "Moon",
      components: [
        {
          type: "CircleComponent",
          values: [
            {
              key: "radius",
              value: "10"
            },
            {
              key: "fill",
              value: "white"
            },
            {
              key: "stroke",
              value: "black"
            },
          ]
        },
        {
          type: "OrbitBehavior",
        }
      ]
    },
    Napster: {
      name: "Napster",
      components: [
        {
          type: "NapsterBehavior",
        },
      ]
    },
    OscillatingCircle: {
      name: "OscillatingCircle",
      components: [
        {
          type: "CircleComponent",
          values: [
            {
              key: "radius",
              value: "50"
            },
            {
              key: "fill",
              value: "green"
            },
            {
              key: "stroke",
              value: "blue"
            },
          ]
        },
        {
          type: "CircleBehavior",

        },

      ]
    },
    Rectangle: {
      name: "Rectangle",
      components: [
        {
          type: "RectangleComponent",
          values: [
            {
              key: "width",
              value: "100"
            },
            {
              key: "height",
              value: "100"
            },
            {
              key: "fill",
              value: "red"
            },
            {
              key: "stroke",
              value: "blue"
            },
          ]
        },
        {
          type: "AABBCollider",
          values: [
            {
              key: "width",
              value: "100",
            },
            {
              key: "height",
              value: "100"
            }
          ]
        }
      ]
    },
    ResponsiveText: {
      name: "ResponsiveText",
      components: [
        {
          type: "TextComponent",
          values: [
            {
              key: "text",
              value: "10"
            },
            {
              key: "fill",
              value: "red"
            },
            {
              key: "font",
              value: "30pt Times"
            },
          ]
        },
        {
          type: "TextBehavior",

        },

      ]
    },
    RotatingSquare: {
      name: "RotatingSquare",
      components: [
        {
          type: "RectangleComponent",
          values: [
            {
              key: "width",
              value: "100"
            },
            {
              key: "height",
              value: "100"
            },
            {
              key: "fill",
              value: "red"
            },
            {
              key: "stroke",
              value: "blue"
            },
          ]
        },
        {
          type: "RectangleBehavior",

        },
      ]
    },
    ScreenText: {
      name: "ScreenText",
      components: [
        {
          type: "RectTransform",
        },
        {
          type: "TextComponent",
          values: [
            {
              key: "text",
              value: "10"
            },
            {
              key: "font",
              value: "20pt Times"
            },
            {
              key: "fill",
              value: "black"
            },

          ]
        }
      ]
    },
    StartSceneListener:
    {
      name: "StartSceneListener",
      components: [
        {
          type: "StartSceneInputListener",
        }
      ]
    },
    StrategyCharacter: {
      name: "StrategyCharacter",
      components: [
        {
          type: "CircleComponent",
          values: [
            {
              key: "radius",
              value: "25"
            },
            {
              key: "fill",
              value: "yellow"
            },
            {
              key: "stroke",
              value: "black"
            },
          ]
        },

      ]
    },
    TestCollisionCircle: {
      name: "TestCollisionCircle",
      components: [
        {
          type: "CircleComponent",
          values: [
            {
              key: "radius",
              value: "50"
            },
            {
              key: "fill",
              value: "black"
            },
            {
              key: "stroke",
              value: "black"
            },
          ]
        },
        {
          type: "MovementBehavior",
        },
        {
          type: "DotBehavior",
        },
        {
          type: "CircleCollider",
          values: [
            {
              key: "radius",
              value: "50",
            }
          ]
        },
      ]
    },
    Text: {
      name: "Text",
      components: [
        {
          type: "TextComponent",
          values: [
            {
              key: "text",
              value: "10"
            },
            {
              key: "font",
              value: "20pt Times"
            },
            {
              key: "fill",
              value: "black"
            },

          ]
        }
      ]

    },
    Tile: {
      name: "Tile",
      components: [
        {
          type: "RectangleComponent",
          values: [
            {
              key: "width",
              value: "100"
            },
            {
              key: "height",
              value: "100"
            },
            {
              key: "fill",
              value: "green"
            },
            {
              key: "stroke",
              value: "black"
            },
          ]
        },
        {
          type: "TileBehavior",

        },
      ]
    },
    Timer: {
      name: "Timer",
      components: [
        {
          type: "TextComponent",
          values: [
            {
              key: "text",
              value: "10"
            },
            {
              key: "font",
              value: "30pt Times"
            },
            {
              key: "fill",
              value: "red"
            },

          ]
        },
        {
          type: "CountDownTimer",
        }
      ]

    }


  }
})()