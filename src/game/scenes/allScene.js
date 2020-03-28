const Scenes = (function () {

  return {
    CircleCollisionScene: {
      name: "CircleCollisionScene",

      objects: [
        {
          name: "CollisionCircle",
          location: { x: 50, y: 50 },
          scale: { x: 2, y: 1 },
          type: "CollisionCircle"
        },
        {
          name: "Rectangle",
          location: { x: 150, y: 50 },
          rotation: .1,
          scale: { x: 2, y: .5 },
          type: "Rectangle"
        },
        {
          name: "TestCollisionCircle",
          location: { x: 200, y: 200 },
          type: "TestCollisionCircle"
        },
        {
          name: "CollisionCircle",
          location: { x: 250, y: 50 },
          scale: { x: 1, y: 2 },
          type: "CollisionCircle"
        },
        {
          name: "Rectangle",
          location: { x: 350, y: 50 },
          type: "Rectangle"
        },
        {
          name: "Main Controller",
          location: { x: 100, y: 100 },
          type: "EmptyGameObject",
          children: [],
          components: [
            {
              type: "BackToStartSceneBehavior",
            }
          ]
        }

      ]
    },
    CollisionScene: {
      name: "CollisionScene",

      objects: [
        {
          name: "CollisionCircle",
          location: { x: 50, y: 50 },
          type: "CollisionCircle"
        },
        {
          name: "Rectangle",
          location: { x: 150, y: 50 },
          type: "Rectangle"
        },
        {
          name: "dot",
          location: { x: 200, y: 200 },
          type: "CollisionDot"
        },
        {
          name: "CollisionCircle",
          location: { x: 250, y: 50 },
          type: "CollisionCircle"
        },
        {
          name: "Rectangle",
          location: { x: 350, y: 50 },
          type: "Rectangle"
        },
        {
          name: "Main Controller",
          location: { x: 100, y: 100 },
          type: "EmptyGameObject",
          children: [],
          components: [
            {
              type: "BackToStartSceneBehavior",
            }
          ]
        }

      ]
    },
    MouseScene: {
      name: "MouseScene",

      objects: [
        {
          name: "Main Camera",
          location: { x: 300, y: 300 },
          scale: { x: 1, y: 1 },
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
              name: "Text",
              location: { x: 150, y: 50 },
              type: "Text",
              components: [
                {
                  type: "MouseText",
                }
              ]
            },
          ]
        },
        {
          name: "Rectangle",
          location: { x: 300, y: 300 },
          type: "Rectangle",
          components: [
            {
              type: "ClickBehavior"
            }
          ]
        },
        {
          name: "Rectangle",
          location: { x: 200, y: 200 },
          type: "Rectangle",
          components: [
            {
              type: "ClickBehavior"
            }
          ]
        },
        {
          name: "Rectangle",
          location: { x: 200, y: 300 },
          type: "Rectangle",
          components: [
            {
              type: "ClickBehavior"
            }
          ]
        },
        {
          name: "Rectangle",
          location: { x: 300, y: 200 },
          type: "Rectangle",
          components: [
            {
              type: "ClickBehavior"
            }
          ]
        },
        {
          name: "Main Controller",
          location: { x: 100, y: 100 },
          type: "EmptyGameObject",
          children: [],
          components: [
            {
              type: "BackToStartSceneBehavior",
            }
          ]
        }

      ]
    },
    RoomScene: {
      name: "RoomScene",

      objects: [
        {
          name: "room",
          location: { x: 0, y: 0 },
          type: "EmptyGameObject",
          children: [
            {
              name: "Rectangle",
              location: { x: 100, y: 200 },
              type: "Rectangle"
            },
            {
              name: "Rectangle",
              location: { x: 300, y: 100 },
              type: "Rectangle",
              children: [
                {
                  name: "moon",
                  location: { x: 0, y: 0 },
                  type: "Moon"
                }
              ]
            }
          ]
        },
        {
          name: "dot",
          location: { x: 200, y: 200 },
          type: "CollisionDot"
        },
        {
          name: "Main Controller",
          location: { x: 100, y: 100 },
          type: "EmptyGameObject",
          children: [],
          components: [
            {
              type: "BackToStartSceneBehavior",
            }
          ]
        }

      ]
    },
    SceneOne: {
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


    },
    SceneTwo: {
      name: "SceneTwo",

      objects: [
        {
          name: "counter",
          type: 'Text',
          location: { x: 10, y: 80 },
          componentValues: [
            {
              type: 'TextComponent',
              values: [
                {
                  key: "text",
                  value: "A"
                }
              ]
            }
          ]
        },
        {
          name: "timer",
          type: 'Timer',
          location: { x: 10, y: 40 },
          componentValues: [
            {
              type: 'CountDownTimer',
              values: [
                {
                  key: "toSceneText",
                  value: "SceneTwoB"
                }
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
        }
      ]
    },
    SceneTwoB: {
      name: "SceneTwoB",

      objects: [
        {
          name: "counter",
          type: 'Text',
          location: { x: 10, y: 80 },
          componentValues: [
            {
              type: 'TextComponent',
              values: [
                {
                  key: "text",
                  value: "B"
                }
              ]
            }
          ]
        },
        {
          name: "timer",
          type: 'Timer',
          location: { x: 10, y: 40 },
          componentValues: [
            {
              type: 'CountDownTimer',
              values: [
                {
                  key: "toSceneText",
                  value: "SceneTwo"
                }
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
        }
      ]
    }, StartScene: {
      name: "StartScene",
      objects: [
        {
          name: "Scene listener",
          location: { x: 0, y: 0 },
          type: "StartSceneListener",
        },
        {
          name: "Click",
          location: { x: 10, y: 40 },
          type: "Text",
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
          name: "Enter",
          location: { x: 10, y: 80 },
          type: "Text",
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
          location: { x: 10, y: 120 },
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
          location: { x: 10, y: 160 },
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
          location: { x: 10, y: 200 },
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
          location: { x: 10, y: 240 },
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
          location: { x: 10, y: 280 },
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
    },
    SceneManager: {
      name: "StrategyScene",
      objects: [
        {
          name: "Napster",
          type: 'Napster',
          location: { x: 0, y: 0 }
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
        }
      ]
    }


  }
})()