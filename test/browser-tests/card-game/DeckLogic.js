import Base from "../../../src/Base.js"
export default class DeckLogic extends Base.Behavior{
  start(){
    this.cards = [];
    this.mainController = Base.SceneManager.currentScene.findByName("MainController").getComponent("MainController");

  }
  update(){
   
  }
  onMouseDown(){
    if(this.cards.length > 0){
      this.mainController.deckClick(this);
    }
  }

}