import Engine from "../../engine/Engine.js"
import Napster from "../prefabs/Napster.js";
import GameObjects from "../GameObjects.js"
import BackToStartSceneBehavior from "../behaviors/BackToStartSceneBehavior.js";
import Tile from "../prefabs/Tile.js";

export default class StrategyScene extends Engine.Base.Scene{
  objects = [
    {
      name:"Napster",
      type:Napster,
      location:new Engine.Base.Point(0,0)
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
    super("StrategyScene");
    
  }
}