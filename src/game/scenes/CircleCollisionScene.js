
export default {
  name: "CircleCollisionScene",

  objects: [
    {
      def:"CollisionCircle, 50, 50, 2, 1, CollisionCircle",
    },
    {
      name: "Rectangle",
      location: { x: 150, y: 50 },
      rotation:.1,
      scale:{x:2,y:.5},
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
      scale:{x:1, y:2},
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
      components: ["BackToStartSceneBehavior"]
    }

  ]
}