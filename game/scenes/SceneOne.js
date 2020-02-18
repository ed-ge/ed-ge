import Base from "../../engine/Base.js"
import RotatingSquare from './../prefabs/RotatingSquare.js'
import OscillatingCircle from "./../prefabs/OscillatingCircle.js";
import TextTimer from "./../prefabs/TextTimer.js";
import Moon from "./../prefabs/Moon.js"


export default class SceneOne extends Base.Scene {
  constructor() {
    super();
    let rotatingSquare = new RotatingSquare(200, 200);
    this.children.push(rotatingSquare);

    let textTimer = new TextTimer(300, 300);
    this.children.push(textTimer);

    let greenCircle = new OscillatingCircle(100, 100);
    this.children.push(greenCircle);

    let moon = new Moon();
    greenCircle.children.push(moon);




  }
}