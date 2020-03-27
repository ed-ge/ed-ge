
export default {
    name: "MouseScene",

    objects: [

        {
            name: "Text",
            location: { x: 150, y: 50 },
            type: "Text",
            components: [
                {
                    type: "MouseText",
                }
            ]
        },
        {
            name:"Rectangle",
            location:{x:300,y:300},
            type:"Rectangle",
            components:[
                {
                    type:"ClickBehavior"
                }
            ]
        }


    ]
}