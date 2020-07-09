import Base from "../../../src/Base.js"
export default class CardComponent extends Base.Behavior{
  start(){
    this.value = {};
    
  }
 
 
  update(){
    this.gameObject.getComponent("TextComponent").text = JSON.stringify(this.value.name);
    
  }

}