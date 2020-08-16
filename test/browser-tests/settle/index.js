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
RectangleComponent
-width=100
-height=50
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
Draggable
RectangleComponent
-width=30
-height=30
-fill=black
AABBCollider
-width=30
-height=30

WheatStack WheatStack
0,0

SheepStack SheepStack
0,50

BrickStack BrickStack
0,100

WoddStack WoodStack
0,150

StoneStack StoneStack
0,200

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
-12, 10
TextComponent
-font=30px FontAwesome
-text=\uF1F8
-fill=white
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
`
let Sheep =
`
Sheep Circle
Draggable
Trashable
CircleComponent
-fill=green
-radius=20
CircleCollider
-radius=20
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
`
let Wood =
`
Wood Circle
Draggable
Trashable
CircleComponent
-fill=chocolate
-radius=20
CircleCollider
-radius=20
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
-fill=green
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
-fill=chocolate
-radius=20
CircleCollider
-radius=20
 `

 let Hexagon = 
 `
 Hexagon Empty
 HexagonComponent
 -radius=75
 {
  Circle Circle
  CircleComponent
  -fill=white
  -radius=30
  {
    Cost Text
    -7,5
  }
 }
 `

 let City =
 `
City Circle
Draggable
CircleComponent
-fill=chocolate
-radius=20
CircleCollider
-radius=20
 `
 let Road =
 `
Road Circle
Draggable
CircleComponent
-fill=chocolate
-radius=10
CircleCollider
-radius=10
 `
 let Town =
 `
City Rectangle
Draggable
RectangleComponent
-fill=chocolate
-width=20
-height=20
AABBCollider
-width=20
-height=20
 `


//Place the prefabs in an object we will pass to Main
let Prefabs = { Wheat, Sheep, Brick, Wood, Stone, WheatStack, SheepStack, BrickStack, WoodStack, StoneStack, Hexagon, City, Town, Road  };

Base.Main = Base.main(Prefabs, GameBehaviors, Scenes);
