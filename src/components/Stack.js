import Behavior from "../base/Behavior.js"
import SceneManager from "../base/SceneManager.js"
import Serializer from "../base/Serializer.js"


export default class Stack extends Behavior {
  start() {
    // this.mouseDown = false;
    // this.touchDown = false;
    this.spawn;
  }

  update() {
    // if (this.mouseDown) {
    //   let point = Input.getMousePositionDelta();
    //   this.gameObject.x += point.x;
    //   this.gameObject.y += point.y;
    // }
    // if (this.touchDown) {
    //   let point = Input.getTouchMove()[0]
    //   this.gameObject.x += point.x;
    //   this.gameObject.y += point.y;
    // }
    
    // if(Input.anyTouchesEnd()){
    //   this.touchDown = false;
    // }
  }
  onMouseDown() {
    this.mouseDown = true;
    let spawned = SceneManager.Base.Serializer.instantiate(SceneManager.Prefabs[this.spawn], this.$go.parent, this.$go.worldLocation);
    spawned.$("Draggable").mouseDown = true;
  }
  // onMouseUp() {
  //   this.mouseDown = false;
  // }
  onTouchStart(){
    let spawned = SceneManager.Base.Serializer.instantiate(SceneManager.Prefabs[this.spawn], this.$go.parent, this.$go.worldLocation);
    spawned.$("Draggable").touchDown = true;
  }
  
  // onTouchEnd(){
  //   this.touchDown = false;
  // }
}