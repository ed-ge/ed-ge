class State{
  constructor(name){
    this.name = name;
    this.parent = null;
  }
  handleEvent(event){
    throw new Error("Handle event needs to be override in each State subclass.");
  }
}

export default State;