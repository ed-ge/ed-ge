import Base from "../../engine/Base.js"
import RotatingSquare from './../gameObjects/RotatingSquare.js'
import OscillatingCircle from "./../gameObjects/OscillatingCircle.js";
import TextTimer from "./../gameObjects/TextTimer.js";


export default class SceneOne extends Base.Scene {
  constructor() {
    super();
    let rotatingSquare = new RotatingSquare(200, 200);
    this.gameObjects.push(rotatingSquare);

    let textTimer = new TextTimer(300, 300);
    this.gameObjects.push(textTimer);

    let greenCircle = new OscillatingCircle(100, 100);
    this.gameObjects.push(greenCircle);

  }
}