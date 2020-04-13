export default {
    name: "Triangle",
    location: { x: 300, y: 300 },
    type: "EmptyGameObject",
    components: [
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
      },
      {
        type: "TriangleCollider",
        values: [
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
}