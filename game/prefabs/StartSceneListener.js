import Base from "../../engine/Base.js"
import StartSceneInputListener from "../behaviors/StartSceneInputListener.js"

export default class StartSceneListener extends Base.GameObject {
  constructor(x, y) {
    super(x, y);
    let startSceneInputListener = new StartSceneInputListener();
    this.addComponent(startSceneInputListener);


  }
}