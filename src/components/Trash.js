import Behavior from "../base/Behavior.js"
import SceneManager from "../base/SceneManager.js"
import Input from "../base/Input.js"


export default class Trash extends Behavior {
  start() {
   this.colliders = [];
  }

  update() {
    
    if(Input.getMouseButtonUp(0) || Input.getTouchesEnd().length > 0){
      for(let i = 0; i < this.colliders.length; i++){
        let collider = this.colliders[i];
        if(collider.gameObject.$("Trashable")){
          SceneManager.currentScene.destroy(collider.gameObject);
        }
      }
    }
    this.colliders = [];
   
  }
  onCollisionStay(collider){
    this.colliders.push(collider);
  }
 
}