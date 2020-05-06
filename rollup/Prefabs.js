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

var Prefabs = {
    EmptyGameObject,
    Text,
};

export default Prefabs;
