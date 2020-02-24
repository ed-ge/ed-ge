import Engine from "../../engine/Engine.js"
import GameObjects from "../GameObjects.js"
import GameBehaviors from "../GameBehaviors.js";


export default class StartScene extends Engine.Base.Scene {
  constructor() {
    super("StartScene");

    let startTextOne = new GameObjects.Text(10, 40);
    startTextOne.getComponent(Engine.Components.TextComponent).text = "Click the mouse to start the collision game.";
    this.children.push(startTextOne); 

    let startTextTwo = new GameObjects.Text(10, 80);
    startTextTwo.getComponent(Engine.Components.TextComponent).text = "Push 'enter' ('return' on Mac) to start the strategy game.";
    this.children.push(startTextTwo); 

    let startTextThree = new GameObjects.Text(10, 120);
    startTextThree.getComponent(Engine.Components.TextComponent).text = "Push space to start the drawing test game.";
    this.children.push(startTextThree); 

    let startTextFour = new GameObjects.Text(10, 160);
    startTextFour.getComponent(Engine.Components.TextComponent).text = "Push 'a' to start the scene test game.";
    this.children.push(startTextFour); 

    let startSceneInputListener = new GameBehaviors.StartSceneInputListener();
    this.children.push(startSceneInputListener);


  }
}