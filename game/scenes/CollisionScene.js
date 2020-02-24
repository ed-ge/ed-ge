import Engine from "../../engine/Engine.js"
import GameObjects from "../GameObjects.js"
import Behaviors from "../GameBehaviors.js"
import GameBehaviors from "../GameBehaviors.js";
import CountDownTimer from "../behaviors/CountDownTimer.js";
import GameObject from "../../engine/base/GameObject.js";
import CollisionDot from "../prefabs/CollisionDot.js";
import CollisionCircle from "../prefabs/CollisionCircle.js";

export default class CollisionScene extends Engine.Base.Scene{
  constructor(){
    super("CollisionScene");
    let circle = new CollisionCircle(50,50);
    this.children.push(circle);
    let dot = new CollisionDot(200,200);
    this.children.push(dot);

    
    
  }
}