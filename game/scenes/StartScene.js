import Engine from "../../engine/Engine.js"
import GameObjects from "../GameObjects.js"
import GameBehaviors from "../GameBehaviors.js";
import GameObject from "../../engine/base/GameObject.js";


export default class StartScene extends Engine.Base.Scene {

  
  objects = [
    {
      name: "Scene listener",
      location: new Engine.Base.Point(0, 0),
      type: GameObjects.StartSceneListener,
    },
    {
      name: "Click",
      location: new Engine.Base.Point(10, 40),
      type: GameObjects.Text,
      componentValues: [
        {
          type: Engine.Components.TextComponent,
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
      location: new Engine.Base.Point(10, 80),
      type: GameObjects.Text,
      componentValues: [
        {
          type: Engine.Components.TextComponent,
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
      location: new Engine.Base.Point(10, 120),
      type: GameObjects.Text,
      componentValues: [
        {
          type: Engine.Components.TextComponent,
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
      location: new Engine.Base.Point(10, 160),
      type: GameObjects.Text,
      componentValues: [
        {
          type: Engine.Components.TextComponent,
          values: [
            {
              key: "text",
              value: "Push 'a' to start the scene test game.",
            }
          ]
        }
      ]
    },
  ]


  constructor() {
    super("StartScene");

  }
}