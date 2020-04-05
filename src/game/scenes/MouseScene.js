
export default {
    name: "MouseScene",

    objects: [
        {
            name: "Main Camera",
            location: { x: 300, y: 300 },
            scale: { x: 1, y: 1 },
            rotation: 0,
            type: "Camera",
            componentValues: ["CameraComponent,backgroundColor, white"],
            components: ["CameraMover"]
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
                    components: [ "MouseText"]
                },
            ]
        },
        {
            name: "Rectangle",
            location: { x: 300, y: 300 },
            type: "Rectangle",
            components: ["ClickBehavior"]
        },
        {
            name: "Rectangle",
            location: { x: 200, y: 200 },
            type: "Rectangle",
            components: [ "ClickBehavior"]
        },
        {
            name: "Rectangle",
            location: { x: 200, y: 300 },
            type: "Rectangle",
            components: [ "ClickBehavior"]
        },
        {
            name: "Rectangle",
            location: { x: 300, y: 200 },
            type: "Rectangle",
            components: [ "ClickBehavior"]
        },
        {
          name: "Main Controller",
          location: { x: 100, y: 100 },
          type: "EmptyGameObject",
          children: [],
          components: [ "BackToStartSceneBehavior"]
        }

    ]
}