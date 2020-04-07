import Behavior from "./base/Behavior.js"
import Component from "./base/Component.js"
import GameObject from "./base/GameObject.js"
import Scene from "./base/Scene.js"
import Time from "./base/Time.js"
import Input from "./base/Input.js"
import NameableParent from "./base/NamableParent.js"
import Point from "./base/Point.js"
import SceneManager from "./base/SceneManager.js"

/** Components */
import CircleComponent from "./components/CircleComponent.js"
import RectangleComponent from "./components/RectangleComponent.js"
import TextComponent from "./components/TextComponent.js"
import CircleCollider from "./components/CircleCollider.js"
import Collider from "./components/Collider.js"
import PointCollider from "./components/PointCollider.js"
import CollisionHelper from "./components/CollisionHelper.js"
import AABBCollider from "./components/AABBCollider.js"
import TriangleCollider from "./components/TriangleCollider.js"
import ConvexCollider from "./components/ConvexCollider.js"
import TriangleComponent from "./components/TriangleComponent.js"
import CameraComponent from "./components/CameraComponent.js"
import CanvasComponent from "./components/CanvasComponent.js"
import RectTransform from "./components/RectTransform.js"
import _RVOAgent from "./components/RVOAgent.js"
import _RVOSimulator from "./components/RVOSimulator.js"

/** Prefabs */
import EmptyGameObject from "./prefabs/EmptyGameObject.js"
import Text from "./prefabs/Text.js"
import Camera from "./prefabs/Camera.js"
import Canvas from "./prefabs/Canvas.js"
import CanvasText from "./prefabs/CanvasText.js"
import Rectangle from "./prefabs/Rectangle.js"
import Circle from "./prefabs/Circle.js"
import ScreenText from "./prefabs/ScreenText.js"
import RVOAgent from "./prefabs/RVOAgent.js"
import RVOSimulator from "./prefabs/RVOSimulator.js"

/** The main function */
import main from "./Main.js"




let Components = {
  CircleComponent,
  RectangleComponent,
  TextComponent,
  CircleCollider,
  PointCollider,
  Collider,
  CollisionHelper,
  AABBCollider,
  TriangleCollider,
  ConvexCollider,
  TriangleComponent,
  CameraComponent,
  CanvasComponent,
  RectTransform,
  RVOSimulator:_RVOSimulator,
  RVOAgent:_RVOAgent,
};

const Prefabs = {
  EmptyGameObject,
  Text,
  Camera,
  Canvas,
  CanvasText,
  Rectangle,
  Circle,
  ScreenText,
  RVOSimulator,
  RVOAgent,
};

const Base = {
  Behavior,
  Component,
  GameObject,
  Scene,
  Time ,
  Input ,
  NameableParent,
  Point ,
  SceneManager,
  Components ,
  Prefabs ,
  Behaviors:{},
  main,

}

Base.SceneManager.Base = Base;



export default Base;