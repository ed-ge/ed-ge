export default {
    name: "ScreenText",
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
}
