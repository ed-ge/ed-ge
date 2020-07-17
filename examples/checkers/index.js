//Import any custom behaviors
import MainController from "./MainController.js"

//Add custom behaviors to an object we pass to Main
let GameBehaviors = {
  MainController,
}

//Add objects to our scene that we pass to main
let Scenes = {
  startScene: "StartScene",
  allScenes: [
`
StartScene

BoardBase Empty
0,0

RedKingStack Empty

BlackKingStack Empty

MainCamera Camera
200,200


MainController Empty
MainController
`
  ]
}


//Declare the prefabs we will pass to Main
let Piece =
`
Piece Circle
Draggable
`
let King =
`
Piece Circle
Draggable
TextComponent
 text=K
 fill=white
`

//Place the prefabs in an object we will pass to Main
let Prefabs = { Piece, King  };

Base.Main = Base.main(Prefabs, GameBehaviors, Scenes);
