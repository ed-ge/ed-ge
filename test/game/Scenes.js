import SceneOne from "./scenes/SceneOne.js"
import SceneTwo from "./scenes/SceneTwo.js"
import StartScene from "./scenes/StartScene.js"
import StrategyScene from "./scenes/StrategyScene.js"
import SceneTwoB from "./scenes/SceneTwoB.js"
import CollisionScene from "./scenes/CollisionScene.js"
import RoomScene from "./scenes/RoomScene.js"
import CircleCollisionScene from "./scenes/CircleCollisionScene.js"
import MouseScene from "./scenes/MouseScene.js"
import RVOScene from "./scenes/RVOScene.js"
import TouchScene from "./scenes/TouchScene.js"
import EmptyScene from "./scenes/EmptyScene.js"
import P2PServer from "./scenes/P2PServer.js"
import P2PClient from "./scenes/P2PClient.js"

export default {
  startScene: "StartScene",
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
    RVOScene,
    TouchScene,
    EmptyScene,
    P2PServer,
    P2PClient,
  ]
}