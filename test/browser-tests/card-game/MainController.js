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
  deckClick(deck) {
    let cardValue = deck.cards.pop();
    let hand;
    if (deck == this.P1Discard || deck == this.P1Draw || deck == this.P1Life) {
      hand = this.P1Hand;
    }
    if (deck == this.P2Discard || deck == this.P2Draw || deck == this.P2Life) {
      hand = this.P2Hand
    }
    let x = hand.children.length * 75;
    let card = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Card, hand, new Base.Point(x, 75));
    card.getComponent("CardComponent").value = cardValue.value;
  }

}