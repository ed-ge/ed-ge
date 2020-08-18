//Import any custom behaviors
import MainController from "./MainController.js"
import SpaceShipController from "./SpaceShipController.js"
import BulletController from "./BulletController.js"
import UFOBulletController from "./UFOBulletController.js"
import UFOController from "./UFOController.js"

//Add custom behaviors to an object we pass to Main
let GameBehaviors = {
  MainController,
  SpaceShipController,
  UFOController,
  BulletController,
  UFOBulletController,
  
}

//Add objects to our scene that we pass to main
let Scenes = {
  startScene: "StartScene",
  allScenes: [
`
StartScene

MainController Empty
MainController

MainCamera Camera
0,0

Ship Spaceship
0, 100
SpaceShipController

`
  ]
}



//Declare the prefabs we will pass to Main`
var Bullet =
`
Bullet Circle
BulletController
CircleComponent
-radius=10
`

let UFOBullet=
`
UFOBullet Circle
UFOBulletController
CircleController
-radius=5
`

let UFO=
`
UFO Circle
UFOController
`

var Spaceship = 
`
Spaceship Empty
WASDA
{
    Body Rectangle
    RectangleComponent
    -width=50
    -height=75
    -fill=black
    -stroke=black
    AABBCollider
    -width=50
    -height=75
    {
      Cockpit RectangleNoCollider
      0,15
      RectangleComponent
      -width=25
      -height=30
      -fill=red
      -stroke=red

      BoosterLeft RectangleNoCollider
      -16,47
      RectangleComponent
      -width=15
      -height=20
      -fill=lightgray
      -stroke=black
      
      BoosterRight RectangleNoCollider
      16,47
      RectangleComponent
      -width=15
      -height=20
      -fill=lightgray
      -stroke=black

      BlasterLeft RectangleNoCollider
      -40,25
      RectangleComponent
      -width=27
      -height=20
      -fill=gray
      -stroke=black

      BlasterRight RectangleNoCollider
      40,25
      RectangleComponent
      -width=27
      -height=20
      -fill=gray
      -stroke=black
    }
}
`

//Place the prefabs in an object we will pass to Main
let Prefabs = { Spaceship, Bullet, UFO  };

Base.Main = Base.main(Prefabs, GameBehaviors, Scenes);
