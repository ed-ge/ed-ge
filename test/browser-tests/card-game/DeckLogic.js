import Base from "../../../src/Base.js"
export default class DeckLogic extends Base.Behavior{
  start(){
    this.cards = [];

  }
  update(){
   
  }
  onMouseDown(){
    console.log("Click")
  }

}