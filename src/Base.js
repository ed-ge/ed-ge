import Behavior from "./base/Behavior.js"
import Component from "./base/Component.js"
import GameObject from "./base/GameObject.js"
import Input from "./base/Input.js"
import Line from "./base/Line.js"
import Matrix3 from "./base/Matrix3.js"
import NameableParent from "./base/NamableParent.js"
import Point from "./base/Point.js"
import Scene from "./base/Scene.js"
import SceneManager from "./base/SceneManager.js"
import Serializer from "./base/Serializer.js"
import State from "./base/State.js"
import StateMachine from "./base/StateMachine.js"
import Time from "./base/Time.js"

/** Components */
import AABBCollider from "./components/AABBCollider.js"
import CameraComponent from "./components/CameraComponent.js"
import CanvasComponent from "./components/CanvasComponent.js"
import Collider from "./components/Collider.js"
import CircleComponent from "./components/CircleComponent.js"
import CircleCollider from "./components/CircleCollider.js"
import CollisionHelper from "./components/CollisionHelper.js"
import ConvexCollider from "./components/ConvexCollider.js"
import Draggable from "./components/Draggable.js"
import GUIOnlyCollider from "./components/GUIOnlyCollider.js"
import HexagonComponent from "./components/HexagonComponent.js"
import PeerServer from "./components/PeerServer.js"
import PeerClient from "./components/PeerClient.js"
import PointCollider from "./components/PointCollider.js"
import RectangleComponent from "./components/RectangleComponent.js"
import Stack from "./components/Stack.js"
import TextComponent from "./components/TextComponent.js"
import Trash from "./components/Trash.js"
import Trashable from "./components/Trashable.js"
import TriangleCollider from "./components/TriangleCollider.js"
import TriangleComponent from "./components/TriangleComponent.js"
import RectTransform from "./components/RectTransform.js"
import WASDA from "./components/WASDA.js"
import _RVOAgent from "./components/RVOAgent.js"
import _RVOSimulator from "./components/RVOSimulator.js"
import _ROVObstacle from "./components/RVOObstacle.js"

/** Prefabs */
import Empty from "./prefabs/Empty.js"
import Camera from "./prefabs/Camera.js"
import Canvas from "./prefabs/Canvas.js"
import CanvasText from "./prefabs/CanvasText.js"
import Circle from "./prefabs/Circle.js"
import CircleNoCollider from "./prefabs/CircleNoCollider.js"
import Rectangle from "./prefabs/Rectangle.js"
import RectangleNoCollider from "./prefabs/RectangleNoCollider.js"
import RVOAgent from "./prefabs/RVOAgent.js"
import RVOSimulator from "./prefabs/RVOSimulator.js"
import RVOObstacle from "./prefabs/RVOObstacle.js"
import ScreenText from "./prefabs/ScreenText.js"
import Text from "./prefabs/Text.js"

/** Plugins */
import UpdatePlugin from "./plugins/UpdatePlugin.js"
import DrawPlugin from "./plugins/DrawPlugin.js"
import CollisionPlugin from "./plugins/CollisionPlugin.js"
import CollisionPluginHash from "./plugins/CollisionPluginHash.js"
import MouseCollisionPlugin from "./plugins/MouseCollisionPlugin.js"
import TouchCollisionPlugin from "./plugins/TouchCollisionPlugin.js"
import CrowdSimulationPlugin from "./plugins/CrowdSimulationPlugin.js"
import Peer2PeerPlugin from "./plugins/Peer2PeerPlugin.js"

/** The main function */
import main from "./Main.js"




let Components = {
  AABBCollider,
  CameraComponent,
  CanvasComponent,
  CircleComponent,
  CircleCollider,
  Collider,
  CollisionHelper,
  ConvexCollider,
  Draggable,
  GUIOnlyCollider,
  HexagonComponent,
  PeerServer,
  PeerClient,
  PointCollider,
  RectangleComponent,
  RectTransform,
  RVOAgent: _RVOAgent,
  RVOObstacle: _ROVObstacle,
  RVOSimulator: _RVOSimulator,
  Stack,
  TextComponent,
  Trash,
  Trashable,
  TriangleCollider,
  TriangleComponent,
  WASDA,
};

const Prefabs = {
  Empty,
  Camera,
  Canvas,
  CanvasText,
  Circle,
  CircleNoCollider,
  Rectangle,
  RectangleNoCollider,
  RVOAgent,
  RVOObstacle,
  RVOSimulator,
  ScreenText,
  Text,
};

const Plugins = {
  UpdatePlugin, 
  DrawPlugin,
  CollisionPlugin,
  MouseCollisionPlugin,
  TouchCollisionPlugin,
  CrowdSimulationPlugin,
  Peer2PeerPlugin,
};

const Base = {
  Behavior,
  Behaviors: {},
  Component,
  Components,
  GameObject,
  Input,
  Line,
  main,
  Matrix3,
  NameableParent,
  Point,
  Prefabs,
  Scene,
  SceneManager,
  Serializer: new Serializer(),
  State,
  StateMachine,
  Time,
  Plugins, //Make the architecture more flexible with plugins
  get _cs(){
    return this.SceneManager.currentScene;
  },
  get $$(){
    return this._cs;
  },
  $ : function(string){
    return this.SceneManager.currentScene.findByName(string);
  }

}

Base.SceneManager.Base = Base;





export default Base;