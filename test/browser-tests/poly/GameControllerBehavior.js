import Base from "../../../src/Base.js"
import { getProperty, positionToX, positionToY } from "./helper.js"


class GameControllerBehavior extends Base.Behavior {
  get currentPlayer(){
    return this.playerStateMachine.player;
  }
  start() {
    this.numPlayers = 2;
    //this.currentPlayer = 1;
    this.die1 = 0;
    this.die2 = 0;
    this.roll = 0;

    this.roll1State = new Base.State("Roll1");
    this.roll1State.handleEvent = (event) => {
      if (event.text != "roll") return;
      this.playerStateMachine.pop();
      if (event.roll[0] != event.roll[1]) {
        this.playerStateMachine.pop();
        this.playerStateMachine.pop();
      }
    }
    this.roll2State = new Base.State("Roll2");
    this.roll2State.handleEvent = event => {
      if (event.text != "roll") return;
      this.playerStateMachine.pop();
      if (event.roll[0] != event.roll[1]) {
        this.playerStateMachine.pop();
      }
    }
    this.roll3State = new Base.State("Roll3");
    this.roll3State.handleEvent = event => {
      if (event.text != "roll") return;
      this.playerStateMachine.pop();

    }
    this.goToJailOnRolls = new Base.State("GoToJailOnRolls");
    this.buyProperty = new Base.State("BuyProperty");
    this.buyProperty.handleEvent = event => {
      if (event.text != "buy") return;
      this.playerStateMachine.pop();

    }
    this.buyProperty.boot = event => {
      let currentPlayerBehavior = this.getCurrentPlayerBehavior();
      let currentPlayerPosition = currentPlayerBehavior.position;

      let property = getProperty(currentPlayerPosition);
      if (property.isPurchased || !property.cost)
        this.playerStateMachine.handleEvent({ text: "buy" })
    }

    this.payRent = new Base.State("PayRent");
    this.payRent.handleEvent = event => {
      if (event.text != "rent") return;
      this.playerStateMachine.pop();

    }
    this.payRent.boot = event => {
      let currentPlayerBehavior = this.getCurrentPlayerBehavior();
      let currentPlayerPosition = currentPlayerBehavior.position;



      let property = getProperty(currentPlayerPosition);
      if (!property.isPurchased || property.isPurchased == this.currentPlayer) {
        this.playerStateMachine.handleEvent({ text: "rent" });
      }
    }

    this.payTax = new Base.State("PayTax");
    this.pullCard = new Base.State("PullCard");
    this.trade = new Base.State("Trade");
    this.endTurn = new Base.State("EndTurn");
    this.endTurn.handleEvent = event => {
      if (event.text != "end") return;
      this.playerStateMachine.pop();
      this.playerStateMachine.player++;
      if (this.playerStateMachine.player > this.numPlayers)
        this.playerStateMachine.player = 1;
      this.startTurn();


    }

    this.playerStateMachine = new Base.StateMachine("Player State Machine");
    this.playerStateMachine.player = 1;
    this.startTurn();





  }
  startTurn() {
    this.playerStateMachine.push(this.endTurn);
    this.playerStateMachine.push(this.payRent);
    this.playerStateMachine.push(this.buyProperty);
    this.playerStateMachine.push(this.roll3State);
    this.playerStateMachine.push(this.roll2State);
    this.playerStateMachine.push(this.roll1State);
  }
  update() {
    this.playerStateMachine.handleEvent("tick");
    console.log(this.playerStateMachine.currentState())
  }
  getCurrentPlayerBehavior() {
    return this.getAPlayerBehavior(this.currentPlayer);
  }
  getAPlayerBehavior(player) {
    let currentPlayer = Base.SceneManager.currentScene.findByName("Player" + player);
    let currentPlayerBehavior = currentPlayer.getComponent("PlayerBehavior");
    return currentPlayerBehavior;
  }
  rollDiceEvent() {
    if (this.turnShouldEnd) return;

    this.die1 = Math.ceil(Math.random() * 6);
    this.die2 = Math.ceil(Math.random() * 6);
    this.roll = this.die1 + this.die2;

    let currentPlayer = Base.SceneManager.currentScene.findByName("Player" + this.currentPlayer);
    let currentPlayerBehavior = currentPlayer.getComponent("PlayerBehavior");
    currentPlayerBehavior.position += this.roll;
    let oldPosition = currentPlayerBehavior.position;
    currentPlayerBehavior.position %= 40;
    let newPosition = currentPlayerBehavior.position;
    if (oldPosition > newPosition) //Player Passed Go
      currentPlayerBehavior.cash += 200;

    this.playerStateMachine.handleEvent({ text: "roll", roll: [this.die1, this.die2] })
    // currentPlayerBehavior.rolledTimes++;

    // //Calculate if turn should end
    // if (this.die1 != this.die2) {
    //   this.turnShouldEnd = true
    // }
    // if (currentPlayerBehavior.roledTimes == 3) {
    //   this.turnShouldEnd = true;
    // }

  }
  endTurnEvent() {



    //if (!this.turnShouldEnd) return;

    //this.turnStateMachine.handleEvent(END_TURN_EVENT);
    //let currentPlayer = Base.SceneManager.currentScene.findByName("Player" + this.currentPlayer);
    //let currentPlayerBehavior = currentPlayer.getComponent("PlayerBehavior");

    /*this.currentPlayer += 1;
    if (this.currentPlayer > this.numPlayers)
      this.currentPlayer = 1;
 
 
    this.turnShouldEnd = false;
    currentPlayerBehavior.rolledTimes = 0;*/
    this.playerStateMachine.handleEvent({ text: "end" })

  }
  buyPropertyEvent() {
    let currentPlayerBehavior = this.getCurrentPlayerBehavior();
    let currentPlayerPosition = currentPlayerBehavior.position;
    let currentPlayerX = positionToX(currentPlayerPosition);
    let currentPlayerY = positionToY(currentPlayerPosition);


    let property = getProperty(currentPlayerPosition);
    property.isPurchased = this.currentPlayer;

    currentPlayerBehavior.cash -= property.cost;
    this.playerStateMachine.handleEvent({ text: "buy" })

    //Base.SceneManager.currentScene.findByName(property.name).getComponent("PropertyStatusTextBehavior").gameObject.getComponent("TextComponent").text = "Purchased";
  }
  payRentEvent() {
    let currentPlayerBehavior = this.getCurrentPlayerBehavior();
    let currentPlayerPosition = currentPlayerBehavior.position;

    let property = getProperty(currentPlayerPosition);
    let rentAmount = property.rent ? property.rent[0] : 0;
    currentPlayerBehavior.cash -= rentAmount;
    let ownerPlayerBehavior = this.getAPlayerBehavior(property.isPurchased);
    ownerPlayerBehavior.cash += rentAmount;
    this.playerStateMachine.handleEvent({ text: "rent" })
  }

}


export default GameControllerBehavior;