export default {
  name: "RoomScene",
  objects: [{
    name: "room",
    location: {
      x: 0,
      y: 0
    },
    type: "EmptyGameObject",
    children: [{
      name: "box1",
      location: {
        x: 100,
        y: 200
      },
      type: "SolidBox"
    }, {
      name: "box2",
      location: {
        x: 300,
        y: 100
      },
      type: "SolidBox",
      children: [{
        name: "moon",
        location: {
          x: 0,
          y: 0
        },
        type: "Moon"
      }]
    }]
  }, {
    name: "dot",
    location: {
      x: 200,
      y: 200
    },
    type: "CollisionDot"
  }, {
    name: "Main Controller",
    location: {
      x: 100,
      y: 100
    },
    type: "EmptyGameObject",
    children: [],
    components: [{
      type: "BackToStartSceneBehavior"
    }]
  }]
};