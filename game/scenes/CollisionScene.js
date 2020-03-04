import Engine from "../../engine/Engine.js"
import GameObjects from "../GameObjects.js"
import Behaviors from "../GameBehaviors.js"
import GameBehaviors from "../GameBehaviors.js";
import CountDownTimer from "../behaviors/CountDownTimer.js";
import GameObject from "../../engine/base/GameObject.js";
import CollisionDot from "../prefabs/CollisionDot.js";
import CollisionCircle from "../prefabs/CollisionCircle.js";
import Point from "../../engine/base/Point.js";
import SceneManager from "../SceneManager.js";
import StartScene from "./StartScene.js";

export default class CollisionScene extends Engine.Base.Scene{

    prefabs = [
      {
        name:"target",
        location: new Point(50,50),
        type: CollisionCircle
      },      
      {
        name:"dot",
        location: new Point(200,200),
        type: CollisionDot
      },

    ]


  constructor(){
    super("CollisionScene");
    //this.start();
    /*let circle = new CollisionCircle(50,50);
    this.children.push(circle);
    let dot = new CollisionDot(200,200);
    this.children.push(dot);*/
    
  }
 
}