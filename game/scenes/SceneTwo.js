import Engine from "../../engine/Engine.js"
import GameObjects from "../GameObjects.js"
import Behaviors from "../GameBehaviors.js"
import GameBehaviors from "../GameBehaviors.js";
import Point from "../../engine/base/Point.js";
import CountDownTimer from "../behaviors/CountDownTimer.js";
import BackToStartSceneBehavior from "../behaviors/BackToStartSceneBehavior.js"

export default class SceneTwo extends Engine.Base.Scene{

  objects = [
    {
      name: "counter",
      type: GameObjects.Text,
      location: new Engine.Base.Point(10, 80),
      componentValues:[
        {
          type:Engine.Components.TextComponent,
          values:[
            {
              key:"text",
              value:"A"
            }
          ]
        }
      ]
    }, 
    {
      name: "timer",
      type: GameObjects.Timer,
      location: new Engine.Base.Point(10, 40),
      componentValues: [
        {
          type: CountDownTimer,
          values: [
            { 
              key: "toSceneText",
             value : "SceneTwoB" 
            }
          ]
        }
      ]
    },
    {
      name:"Main Controller",
      location: new Engine.Base.Point(100, 100),
      type: GameObjects.EmptyGameObject,
      children:[],
      components:[
        {
          type:BackToStartSceneBehavior,
        }
      ]
    }
  ]



  constructor(){
    super("SceneTwo");

   /* let text = new GameObjects.Text(10, 80);
    text.getComponent(Engine.Components.TextComponent).text = "A";
    this.children.push(text);
    let textTime = new GameObjects.Timer(10, 40);
    this.children.push(textTime);*/
    
  }
}