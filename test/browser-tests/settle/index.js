//Import any custom behaviors
import Base from "../../../src/Base.js"
import MainController from "./MainController.js"
import DiceController from "./DiceController.js"

//Add custom behaviors to an object we pass to Main
let GameBehaviors = {
  MainController,
  DiceController,
}

//Add objects to our scene that we pass to main
let Scenes = {
  startScene: "StartScene",
  allScenes: [
`
StartScene

BoardBase Empty
0,0

Stacks Empty
-500,-100
{
Dice Rectangle
0,-200
DiceController
GUIOnlyCollider
RectangleComponent
-width=100
-height=50
-fill=lightgray
AABBCollider
-width=100
-height=50
{
Die1 Text
-40,10
TextComponent
-text=Di

Die2 Text
10,10
TextComponent
-text=ce
}

Robber Rectangle
0,-50
GUIOnlyCollider
Draggable
RectangleComponent
-width=40
-height=40
-fill=black
AABBCollider
-width=40
-height=40
{
Icon Text
TextComponent
-font=25px FontAwesome
-text=\uf21b
-fill=white
-centered=true
}

WheatStack WheatStack
0,0
{
WheatIcon Text
TextComponent
-font=25px FontAwesome
-text=\uf7ec
-fill=black
-centered=true
}

SheepStack SheepStack
0,50
{
Icon Text
TextComponent
-font=25px FontAwesome
-text=\uf553
-fill=black
-centered=true
}

BrickStack BrickStack
0,100
{
Icon Text
TextComponent
-font=25px FontAwesome
-text=\uf84c
-fill=black
-centered=true
}

WoodStack WoodStack
0,150
{
Icon Text
TextComponent
-font=25px FontAwesome
-text=\uf1bb
-fill=black
-centered=true
}

Stone StoneStack
0,200
{
Icon Text
TextComponent
-font=25px FontAwesome
-text=\uf19c
-fill=black
-centered=true
}

Trash Circle
0, 275
Trash
CircleComponent
-fill=black
-radius=20
CircleCollider
-radius=20
{
TrashIcon Text
0, 0
TextComponent
-font=20px FontAwesome
-text=\uf1f8
-fill=white
-centered=true
}
}

MainCamera Camera
0,0

MainController Empty
MainController
`
  ]
}



//Declare the prefabs we will pass to Main
let Wheat =
`
Wheat Circle
Draggable
Trashable
CircleComponent
-fill=yellow
-radius=20
CircleCollider
-radius=20
{
  WheatIcon Text
  TextComponent
  -font=25px FontAwesome
  -text=\uf7ec
  -fill=black
  -centered=true
  }
`
let Sheep =
`
Sheep Circle
Draggable
Trashable
CircleComponent
-fill=lime
-radius=20
CircleCollider
-radius=20
{
  Icon Text
  TextComponent
  -font=25px FontAwesome
  -text=\uf553
  -fill=black
  -centered=true
  }
`
let Brick =
`
Brick Circle
Draggable
Trashable
CircleComponent
-fill=red
-radius=20
CircleCollider
-radius=20
{
  Icon Text
  TextComponent
  -font=25px FontAwesome
  -text=\uf84c
  -fill=black
  -centered=true
  }
`
let Wood =
`
Wood Circle
Draggable
Trashable
CircleComponent
-fill=green
-radius=20
CircleCollider
-radius=20
{
  Icon Text
  TextComponent
  -font=25px FontAwesome
  -text=\uf1bb
  -fill=black
  -centered=true
  }
`
let Stone =
`
Stone Circle
Draggable
Trashable
CircleComponent
-fill=gray
-radius=20
CircleCollider
-radius=20
{
  Icon Text
  TextComponent
  -font=25px FontAwesome
  -text=\uf19c
  -fill=black
  -centered=true
  }
`
let WheatStack = 
`
WheatStack Circle
Stack
-spawn=Wheat
CircleComponent
-fill=yellow
-radius=20
CircleCollider
-radius=20
 `
let SheepStack = 
`
SheepStack Circle
Stack
-spawn=Sheep
CircleComponent
-fill=lime
-radius=20
CircleCollider
-radius=20
 `
let BrickStack = 
`
BrickStack Circle
Stack
-spawn=Brick
CircleComponent
-fill=red
-radius=20
CircleCollider
-radius=20
 `
let StoneStack = 
`
StoneStack Circle
Stack
-spawn=Stone
CircleComponent
-fill=gray
-radius=20
CircleCollider
-radius=20
 `
let WoodStack = 
`
WoodStack Circle
Stack
-spawn=Wood
CircleComponent
-fill=green
-radius=20
CircleCollider
-radius=20
 `

 let Hexagon = 
 `
 Hexagon Empty | Background
 HexagonComponent
 -radius=75
 {
  Circle Circle
  CircleComponent
  -fill=rgba(255,255,255,.8)
  -radius=30
  {
    Cost Text
    TextComponent
    -centered=true
  }
 }
 `

 let City =
 `
City Circle
GUIOnlyCollider
Draggable
CircleComponent
-radius=20
-stroke=black
CircleCollider
-radius=20
{
  Icon Text
  0, 0
  TextComponent
  -font=20px FontAwesome
  -text=\uf1ad
  -fill=white
  -centered=true
  }
 `
 let Road =
 `
Road Circle
GUIOnlyCollider
Draggable
CircleComponent
-radius=15
-stroke=black
CircleCollider
-radius=15
{
  Icon Text
  0, 0
  TextComponent
  -font=20px FontAwesome
  -text=\uf018
  -fill=white
  -centered=true
  }
  `
  let Town =
  `
  City Rectangle
  GUIOnlyCollider
  Draggable
  RectangleComponent
  -width=30
  -height=30
  -stroke=black
  AABBCollider
  -width=30
  -height=30
  {
    Icon Text
    0, 0
    TextComponent
    -font=20px FontAwesome
    -text=\uf015
    -fill=white
    -centered=true
    }
  `

 let Trade = 
 `
 Trade RectangleNoCollider
 RectangleComponent
 -width=40
 -height=40
 -fill=white
 {
  Icon Text
  0, 0
  TextComponent
  -font=20px FontAwesome
  -text=\uf1f8
  -fill=black
  -centered=true
  }
 `


//Place the prefabs in an object we will pass to Main
let Prefabs = { Wheat, Sheep, Brick, Wood, Stone, WheatStack, SheepStack, BrickStack, WoodStack, StoneStack, Hexagon, City, Town, Road, Trade  };

Base.Main = Base.main(Prefabs, GameBehaviors, Scenes);
