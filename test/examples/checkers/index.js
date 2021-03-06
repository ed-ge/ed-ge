//Import any custom behaviors
import Base from "../../../src/Base.js"
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

RedKingStack Circle
400, 200
Stack
-spawn=RedKing
CircleComponent
-fill=red
-radius=20
{
Icon Text
TextComponent
-font=20px FontAwesome
-text=\uf521
-fill=white
-centered=true
}

BlackKingStack Circle
-50, 0
Stack
-spawn=BlackKing
CircleComponent
-fill=black
-radius=20
{
  Icon Text
  TextComponent
  -font=20px FontAwesome
  -text=\uf521
  -fill=white
  -centered=true
}

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
let RedKing =
`
Piece Circle
Draggable
CircleComponent
-fill=red
-radius=20
CircleCollider
-radius=20
{
  Icon Text
  TextComponent
  -font=20px FontAwesome
  -text=\uf521
  -fill=white
  -centered=true
}
`
let BlackKing =
`
Piece Circle
Draggable
CircleComponent
-fill=black
-radius=20
CircleCollider
-radius=20
{
  Icon Text
  TextComponent
  -font=20px FontAwesome
  -text=\uf521
  -fill=white
  -centered=true
}
`

//Place the prefabs in an object we will pass to Main
let Prefabs = { Piece, RedKing, BlackKing  };

Base.Main = Base.main(Prefabs, GameBehaviors, Scenes);
