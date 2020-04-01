var Prefabs = (function () {
    'use strict';

    var EmptyGameObject = {
        name: "EmptyGameObject",
        components: []
    };

    var Text = {
        name: "Text",
        components:[
          {
            type:"TextComponent",
            values:[
              {
                key:"text",
                value:"10"
              },
              {
                key:"font",
                value:"20pt Times"
              },
              {
                key:"fill",
                value:"black"
              },
             
            ]
          }
        ]
      
      };

    var Camera = {
        name: "Camera",
        components: [
            {
                type: "CameraComponent",
                values: [
                    {
                        key: "backgroundColor",
                        value: "white"
                    }
                ]
            }
        ]
    };

    var Canvas = {
        name: "Canvas",
        components: [
            {
                type: "CanvasComponent",
            }
        ]
    };

    var CanvasText = {
        name: "CanvasText",
        components: [
            {
                type: "RectTransform",
            },
            {
                type:"TextComponent",
                values:[
                  {
                    key:"text",
                    value:"10"
                  },
                  {
                    key:"font",
                    value:"20pt Times"
                  },
                  {
                    key:"fill",
                    value:"black"
                  },
                 
                ]
              }
        ]
    };

    var Rectangle = {
        name: "Rectangle",
        components: [
          {
            type: "RectangleComponent",
            values: [
              {
                key: "width",
                value: "100"
              },
              {
                key: "height",
                value: "100"
              },
              {
                key: "fill",
                value: "red"
              },
              {
                key: "stroke",
                value: "blue"
              },
            ]
          },
          {
            type: "AABBCollider",
            values: [
              {
                key: "width",
                value: "100",
              },
              {
                key: "height",
                value: "100"
              }
            ]
          }
        ]
      };

    var Circle = {
        name: "Circle",
        components:[
          {
            type:"CircleComponent",
            values:[
              {
                key:"radius",
                value:"50"
              },
              {
                key:"fill",
                value:"rgba(255,255,0,.5)"
              },
              {
                key:"stroke",
                value:"black"
              },
            ]
          },
          {
            type:"CircleCollider",
            values:[
              {
                key:"radius",
                value:"50"
              }
            ]
          },
        ]
      };

    var Prefabs = {
        EmptyGameObject,
        Text,
        Camera,
        Canvas,
        CanvasText,
        Rectangle,
        Circle,
    };

    return Prefabs;

}());
