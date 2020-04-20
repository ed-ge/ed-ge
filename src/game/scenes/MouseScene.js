
export default {
  name: "MouseScene",

  objects: [
    {
      name: "Main Camera",
      location: { x: 300, y: 300 },
      type: "Camera",
      componentValues: [
        {
          type: "CameraComponent",
          values: [
            {
              key: "backgroundColor",
              value: "white"
            }
          ],
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
          location: { x: 150, y: 150 },
          type: "Text",
          components: [
            {
              type: "MouseText"
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
          type:"ClickBehavior"
        }
      ]
    },
    {
      name: "Rectangle",
      location: { x: 300, y: 200 },
      type: "Rectangle",
      components: [
        {
          type:"ClickBehavior"
        }
      ]
    },
    {
      name: "Rectangle",
      location: { x: 200, y: 300 },
      type: "Rectangle",
      components: [
        {
          type:"ClickBehavior"
        }
      ]
    },
    {
      name: "Rectangle",
      location: { x: 200, y: 200 },
      type: "Rectangle",
      components: [
        {
          type:"ClickBehavior"
        }
      ]
    },
    

  ]
}