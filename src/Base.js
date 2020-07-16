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
import CircleComponent from "./components/CircleComponent.js"
import RectangleComponent from "./components/RectangleComponent.js"
import TextComponent from "./components/TextComponent.js"
import CircleCollider from "./components/CircleCollider.js"
import Collider from "./components/Collider.js"
import PointCollider from "./components/PointCollider.js"
import CollisionHelper from "./components/CollisionHelper.js"
import Draggable from "./components/Draggable.js"
import AABBCollider from "./components/AABBCollider.js"
import TriangleCollider from "./components/TriangleCollider.js"
import ConvexCollider from "./components/ConvexCollider.js"
import TriangleComponent from "./components/TriangleComponent.js"
import CameraComponent from "./components/CameraComponent.js"
import CanvasComponent from "./components/CanvasComponent.js"
import RectTransform from "./components/RectTransform.js"
import _RVOAgent from "./components/RVOAgent.js"
import _RVOSimulator from "./components/RVOSimulator.js"
import _ROVObstacle from "./components/RVOObstacle.js"

/** Prefabs */
import Empty from "./prefabs/Empty.js"
import Text from "./prefabs/Text.js"
import Camera from "./prefabs/Camera.js"
import Canvas from "./prefabs/Canvas.js"
import CanvasText from "./prefabs/CanvasText.js"
import Rectangle from "./prefabs/Rectangle.js"
import RectangleNoCollider from "./prefabs/RectangleNoCollider.js"
import Circle from "./prefabs/Circle.js"
import ScreenText from "./prefabs/ScreenText.js"
import RVOAgent from "./prefabs/RVOAgent.js"
import RVOSimulator from "./prefabs/RVOSimulator.js"
import RVOObstacle from "./prefabs/RVOObstacle.js"

/** The main function */
import main from "./Main.js"




let Components = {
  CircleComponent,
  Draggable,
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
  RVOSimulator: _RVOSimulator,
  RVOAgent: _RVOAgent,
  RVOObstacle: _ROVObstacle,
};

const Prefabs = {
  Empty,
  Text,
  Camera,
  Canvas,
  CanvasText,
  Rectangle,
  RectangleNoCollider,
  Circle,
  ScreenText,
  RVOSimulator,
  RVOAgent,
  RVOObstacle,
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
  Serializer: new Serializer(Components, Prefabs),
  State,
  StateMachine,
  Time,
  get _cs(){
    return this.SceneManager.currentScene;
  },
  $ : function(string){
    return this.SceneManager.currentScene.findByName(string);
  }

}

Base.SceneManager.Base = Base;





export default Base;