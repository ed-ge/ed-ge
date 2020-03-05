import Engine from "../../engine/Engine.js"
import GameObjects from "../GameObjects.js"
import BackToStartSceneBehavior from "../behaviors/BackToStartSceneBehavior.js";



export default class SceneOne extends Engine.Base.Scene {

  objects = [
    {
      name:"Rotating Square",
      location: new Engine.Base.Point(200, 200),
      type:GameObjects.RotatingSquare,
    },
    {
      name:"Text Timer",
      location: new Engine.Base.Point(200, 200),
      type:GameObjects.Text,
    },
    {
      name:"Oscillating Circle",
      location: new Engine.Base.Point(100, 100),
      type:GameObjects.OscillatingCircle,
      children:[
        {
          name:"Moon",
          location: new Engine.Base.Point(0, 0),
          type:GameObjects.Moon,
        },
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

  constructor() {
    super("SceneOne");
    /*let rotatingSquare = new GameObjects.RotatingSquare(200, 200);
    this.children.push(rotatingSquare);

    let textTimer = new GameObjects.Text(300, 300);
    this.children.push(textTimer);

    let greenCircle = new GameObjects.OscillatingCircle(100, 100);
    this.children.push(greenCircle);

    let moon = new GameObjects.Moon();
    greenCircle.children.push(moon);*/




  }
}