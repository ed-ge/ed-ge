import Engine from "../../engine/Engine.js"
import GameObjects from "../GameObjects.js"
import Behaviors from "../GameBehaviors.js"
import GameBehaviors from "../GameBehaviors.js";

export default class SceneTwo extends Engine.Base.Scene{
  constructor(){
    super("SceneTwo");

    let text = new GameObjects.Text(10, 80);
    text.getComponent(Engine.Components.TextComponent).text = "A";
    this.children.push(text);
    let textTime = new GameObjects.Timer(10, 40);
    this.children.push(textTime);
    
  }
}