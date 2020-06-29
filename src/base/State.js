class State{
  constructor(name, type=null){
    this.name = name;
    this.parent = null;
    this.type = type;
  }
  handleEvent(event){
    //throw new Error("Handle event needs to be override in each State subclass.");
  }
}

export default State;