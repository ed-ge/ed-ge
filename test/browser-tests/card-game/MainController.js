import Base from "../../../src/Base.js"
import CardComponent from "./CardComponent.js";
export default class MainController extends Base.Behavior {
  start() {
    this.P1Life = Base._cs.$("P1Life").$("DeckLogic");
    this.P1Draw = Base._cs.$("P1Draw").$("DeckLogic");
    this.P1Discard = Base._cs.$("P1Discard").$("DeckLogic");
    this.P2Life = Base._cs.$("P2Life").$("DeckLogic");
    this.P2Draw = Base._cs.$("P2Draw").$("DeckLogic");
    this.P2Discard = Base._cs.$("P2Discard").$("DeckLogic");

    this.P1Hand = Base._cs.$("P1Hand");
    this.P2Hand = Base._cs.$("P2Hand");

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

    for (let i = 0; i < 6; i++) {
      this.P1Life.cards.push(this.P1Draw.cards.shift());
      this.P2Life.cards.push(this.P2Draw.cards.shift());
    }

    this.selectedCard = null;


  }
  update() {
    if (Base.Input.getKeyUp('Escape')) {
      this.selectedCard = null;

    }

  }
  setSelectedCard(card) {
    this.selectedCard = card;
  }
  addCardEvent(deck) {
    if (this.selectedCard == null)
      throw new Error("There has to be a selected card in order to add it to a deck")
    deck.cards.push({ value: this.selectedCard.$go.$("CardComponent").value });
    let sc = this.selectedCard;
    //Break any parent/child connections
    if (sc.directChild != null)
      sc.directChild.directParent = null;
    if (sc.directParent != null)
      sc.directParent.directChild = null;

    Base._cs.destroy(this.selectedCard.$go);
    this.selectedCard = null;
  }
  deckClick(deck, position) {
    let worldSpacePosition = Base._cs.toWorldSpace(position);
    let cardValue = deck.cards.pop();

    let card = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Card, Base._cs, worldSpacePosition);
    this.setSelectedCard(card.$("SelectableCard"));

    card.$("CardComponent").value = cardValue.value;
    card.$("SelectableCard").mouseDown = true;

    //this.selectedCard = card.getComponent("SelectableCard");
  }
  cardCollision(card, collision) {
    let sc1 = card;
    let sc2 = collision.gameObject.$("SelectableCard");
    if (!sc1.collisionCards.includes(sc2))
      sc1.collisionCards.push(sc2);
    if (!sc2.collisionCards.includes(sc1))
      sc2.collisionCards.push(sc1);

  }
  cardCollisionExit(card, collision) {
    let sc1 = card;
    let sc2 = collision.gameObject.$("SelectableCard");
    _.pull(sc1.collisionCards, sc2)
    _.pull(sc2.collisionCards, sc1);

  }

}