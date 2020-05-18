import Base from "../../../src/Base.js"
import StartSceneInputListener from "../behaviors/StartSceneInputListener.js"

export default{
  name:"StartSceneListener",
  components:["StartSceneInputListener"]
}


/*export default class StartSceneListener extends Base.GameObject {
  constructor(x, y) {
    super(x, y);
    let startSceneInputListener = new StartSceneInputListener();
    this.addComponent(startSceneInputListener);


  }
}*/