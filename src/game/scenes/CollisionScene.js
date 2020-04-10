
export default {
  name: "CollisionScene",

  objects: [
    {
      def:"Collision Circle, 50, 50, CollisionCircle"
    },
    {
      def:"Rectangle, 150, 50, Rectangle"
    },
    {
      def:"dot, 200, 200, CollisionDot"
    },
    {
      def:"CollisionCircle, 250, 50, CollisionCircle",
    },
    {
      def:"Rectangle, 350, 50, Rectangle"
    },
    {
      def:"Main Controller, 100, 100, EmptyGameObject",
      components: ["BackToStartSceneBehavior"]
    }

  ]
}