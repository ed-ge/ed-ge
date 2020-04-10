
export default {
  name: "CircleCollisionScene",

  objects: [
    {
      def:"CollisionCircle, 50, 50, 2, 1, CollisionCircle",
    },
    {
      def:"Rectangle, 150, 50, 2, .5, Rectangle"
    },
    {
      def:"TestCollisionCircle, 200, 200, TestCollisionCircle"
    },
    {
      def:"CollisionCircle, 150, 50, 1, 2, CollisionCircle"
    },
    {
      def:"Rectangle, 350, 50, Rectangle"
    },
    {
      def:"Main Controller, 100, 100, EmptyGameObject",
      components:["BackToStartSceneBehavior"]
    }
  ]
}