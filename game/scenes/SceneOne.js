import Engine from "../../engine/Engine.js"
import GameObjects from "../GameObjects.js"



export default class SceneOne extends Engine.Base.Scene {
  constructor() {
    super("SceneOne");
    let rotatingSquare = new GameObjects.RotatingSquare(200, 200);
    this.children.push(rotatingSquare);

    let textTimer = new GameObjects.Text(300, 300);
    this.children.push(textTimer);

    let greenCircle = new GameObjects.OscillatingCircle(100, 100);
    this.children.push(greenCircle);

    let moon = new GameObjects.Moon();
    greenCircle.children.push(moon);




  }
}