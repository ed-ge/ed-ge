
export default {
  name: "CollisionScene",

  objects: [
    {
      name: "target",
      location: { x: 50, y: 50 },
      type: "CollisionCircle"
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
}