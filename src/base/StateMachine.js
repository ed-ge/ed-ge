import State from "./State.js"

class StateMachine extends State {
  constructor(name){
    super(name);
    this.states = [];
    this._currentState = null;
  }
  get currentState(){
    return this._currentState;
  }
  set currentState(value){
    this._currentState = value;
    if(!this.states.includes(value))
      this.states.push(value);
  }
  handleEvent(event){
    this.currentState.handleEvent(event);
  }
  addState(state){
    this.states.push(state);
    state.parent = this;
  }
  do(lambda){
    lambda();
  }
}

export default StateMachine;