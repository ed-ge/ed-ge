import Base from "../../../src/Base.js"
import CardComponent from "./CardComponent.js";
export default class MainController extends Base.Behavior {
  start() {
    this.P1Life = Base.SceneManager.currentScene.findByName("P1Life").getComponent("DeckLogic");
    this.P1Draw = Base.SceneManager.currentScene.findByName("P1Draw").getComponent("DeckLogic");
    this.P1Discard = Base.SceneManager.currentScene.findByName("P1Discard").getComponent("DeckLogic");
    this.P2Life = Base.SceneManager.currentScene.findByName("P2Life").getComponent("DeckLogic");
    this.P2Draw = Base.SceneManager.currentScene.findByName("P2Draw").getComponent("DeckLogic");
    this.P2Discard = Base.SceneManager.currentScene.findByName("P2Discard").getComponent("DeckLogic");

    this.P1Hand = Base.SceneManager.currentScene.findByName("P1Hand");
    this.P2Hand = Base.SceneManager.currentScene.findByName("P2Hand");

    let P1Cards = [];
    let P2Cards = [];
    for (let i = 0; i < 60; i++) {
      let P1Card = { value: {} };
      let P2Card = { value: {} };
      P1Card.value.name = i;
      P2Card.value.name = i;
      P1Cards.push(P1Card);
      P2Cards.push(P2Card);
    }

    while (P1Cards.length > 0) {
      this.P1Draw.cards.push(P1Cards.shift());
    }
    while (P2Cards.length > 0) {
      this.P2Draw.cards.push(P2Cards.shift());
    }

    for (let i = 0; i < 8; i++) {
      this.P1Life.cards.push(this.P1Draw.cards.shift());
      this.P2Life.cards.push(this.P2Draw.cards.shift());
    }

    this.selectedCard = null;


  }
  update() {
    if(Base.Input.getKeyUp('Escape'))
    {
      this.selectedCard = null;

    }

  }
  cardClickEvent(card) {
    if (this.selectedCard == card)
      this.selectedCard = null;
    else
      this.selectedCard = card;
  }
  addCardEvent(deck){
    if(this.selectedCard == null)
      throw new Error("There has to be a selected card in order to add it to a deck")
    deck.cards.push({value:this.selectedCard.gameObject.$("CardComponent").value});
    Base.SceneManager.currentScene.destroy(this.selectedCard.gameObject);
    this.selectedCard = null;
  }
  deckClick(deck, position) {
    let cardValue = deck.cards.pop();
    
    let card = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Card, Base.SceneManager.currentScene, position);

    card.getComponent("CardComponent").value = cardValue.value;
    //this.cardClickEvent(card);
    this.selectedCard = card.getComponent("SelectableCard");
  }

}