
export default {
  name: "RoomScene",

  objects: [
    {
      def: "room, 0, 0, EmptyGameObject",
      children: [
        {
          def: "Rectangle, 100, 200, Rectangle",
        },
        {
          def: "Rectangle, 300, 100, Rectangle",
          children: [
            {
              def: "moon, 0, 0, Moon"
            }
          ]
        }
      ]
    },
    {
      def: "dot, 200, 200, CollisionDot",
    },
    {
      def: "Main Controller, 100, 100, EmptyGameObject",
      components: ["BackToStartSceneBehavior"]
    }

  ]
}