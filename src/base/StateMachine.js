import State from "./State.js"

class StateMachine extends State {
  constructor(name) {
    super(name);
    this.states = [];
    this.stack = [];
    this._currentState = null;
  }
  currentState() {
    return this.stack[this.stack.length - 1];
  }
  push(value) {
    this.stack.push(value);
  }
  pop() {
    let toReturn = this.stack.pop();
    let cs = this.currentState();
    if (cs)
      cs.boot();
    return toReturn;
  }
  handleEvent(event) {
    let cs = this.currentState();
    if (!cs) return;
    cs.handleEvent(event);
  }

  do(lambda) {
    lambda();
  }
}

export default StateMachine;