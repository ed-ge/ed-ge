import Base from "../../../src/Base.js"
import MainController from "./MainController.js"
import Draggable from "./Draggable.js"

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

let GameBehaviors = {
  MainController,
  Draggable
}

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




let Prefabs = { Piece, King  };
Base.Main = Base.main(Prefabs, GameBehaviors, Scenes);
