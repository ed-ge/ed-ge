//Import any custom behaviors
import Base from "../../../src/Base.js"
import MainController from "./MainController.js"
import SpaceShipController from "./SpaceShipController.js"
import BulletController from "./BulletController.js"
import UFOBulletController from "./UFOBulletController.js"
import UFOController from "./UFOController.js"
import StarController from "./StarController.js"

//Add custom behaviors to an object we pass to Main
let GameBehaviors = {
  MainController,
  SpaceShipController,
  UFOController,
  BulletController,
  UFOBulletController,
  StarController,
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
CameraComponent
-backgroundColor=black

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
CircleComponent
-radius=5
`

let UFO=
`
UFO Circle
UFOController
CircleComponent
-fill=red
{
  UFOHub CircleNoCollider
  0,-20
  CircleComponent
  -fill=black
  -radius=25

  UFOOther CircleNoCollider
  0,20
  CircleComponent
  -fill=gray
  -radius=10
}
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
    -fill=darkgray
    -stroke=darkgray
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

let Star1 =
`
Star1 RectangleNoCollider
StarController
-speed=500
RectangleComponent
-width=2
-height=2
-fill=white
-stroke=white
`

let Star2 =
`
Star2 RectangleNoCollider
StarController
-speed=250
RectangleComponent
-width=1
-height=1
-fill=lightgray
-stroke=lightgray
`

//Place the prefabs in an object we will pass to Main
let Prefabs = { Spaceship, Bullet, UFO, UFOBullet, Star1, Star2  };

Base.Main = Base.main(Prefabs, GameBehaviors, Scenes);
