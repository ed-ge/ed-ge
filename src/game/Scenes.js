import SceneOne from "./scenes/SceneOne.js"
import SceneTwo from "./scenes/SceneTwo.js"
import StartScene from "./scenes/StartScene.js"
import StrategyScene from "./scenes/StrategyScene.js"
import SceneTwoB from "./scenes/SceneTwoB.js"
import CollisionScene from "./scenes/CollisionScene.js"
import RoomScene from "./scenes/RoomScene.js"
import CircleCollisionScene from "./scenes/CircleCollisionScene.js"
import MouseScene from "./scenes/MouseScene.js"

export default {
  startScene: "MouseScene",
  allScenes: [
    SceneOne,
    SceneTwo,
    StrategyScene,
    StartScene,
    SceneTwoB,
    CollisionScene,
    RoomScene,
    CircleCollisionScene,
    MouseScene,
  ]
}