/**
 * Static holder for the state of the input
 */

import Point from "./Point.js";

const Input = {

  //---------------------------------------------------
  //Key handling members
  //---------------------------------------------------
  keys: [], //What is the current state of each key?

  down: [], //Did the key go down this frame?
  up: [], //Did the key do up this frame?

  //When we start an update(), we shift to these arrays so we don't have mutating arrays mid-update
  frameDown: [],
  frameUp: [],


  //---------------------------------------------------
  //Mouse handling members
  //---------------------------------------------------


  mouseButtons: [], //What is the current State of the each button?

  mouseButtonsDown: [], //Did the mouse button go down this frame?
  mouseButtonsUp: [], //Did the mouse button go up this frame?

  //When we start an update(), we shift these arrays so we don't have mutating arrays mid-update
  frameMouseButtonsDown: [],
  frameMouseButtonsUp: [],

  //The location of the mouse in screen coordinates
  mousePosition: new Point(),
  frameMousePosition: new Point(),
  lastFrameMousePosition: new Point(),

  //Handle the wheel state
  mouseScrollDelta: 0,
  frameScrollDelta: 0,


  //-------------------------------------------------
  // Touch handling members
  //-------------------------------------------------

  touches: [],

  touchesStart: [],
  touchesEnd: [],
  // touchPositions: [],
  frameTouchesStart: [],
  frameTouchesEnd: [],
  frameTouchPositions: [],
  lastFrameTouchPositions:[],


  swapUpDownArrays() {
    if(arguments.length != 0) throw new Error("swapUpDownArrays takes no arguments.")
    this.frameDown = this.down;
    this.frameUp = this.up;
    this.down = [];
    this.up = [];

    this.lastFrameMousePosition = this.frameMousePosition.clone();
    this.frameMousePosition = this.mousePosition.clone();

    this.frameMouseButtonsDown = this.mouseButtonsDown;
    this.frameMouseButtonsUp = this.mouseButtonsUp;
    this.frameScrollDelta = this.mouseScrollDelta;
    this.mouseScrollDelta = 0;
    this.mouseButtonsDown = [];
    this.mouseButtonsUp = [];


    this.frameTouchesStart = this.touchesStart;
    this.frameTouchesEnd = this.touchesEnd;
    this.touchesStart = [];
    this.touchesEnd = [];
    
    this.lastFrameTouchPositions = this.frameTouchPositions;
    this.frameTouchPositions = this.touches;
    //this.touchPositions = [];

    // if(this.frameTouchesEnd.length != 0){
    //   console.log("Restart")
    //   this.touches = [];
    //   this.lastFrameTouchPositions = [];
    //   this.frameTouchPositions = [];
    // }


  },

  //---------------------------------------------------
  //Key handling functions
  //---------------------------------------------------

  //Did the key come up this frame?
  getKeyUp(key) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.frameUp[key];
  },

  //Did the key go down the frame? [Remember, the OS may make it look like key repeated when they did not]
  getKeyDown(key) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.frameDown[key];
  },

  //Is the key pressed? Down (true) Up (false)
  getKey(key) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.keys[key];
  },

  //---------------------------------------------------
  //Mouse handling functions
  //---------------------------------------------------


  //Did the mouse button come up this frame?
  getMouseButtonUp(button) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.frameMouseButtonsUp[button];
  },

  //Did the mouse button go down this frame?
  getMouseButtonDown(button) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.frameMouseButtonsDown[button];
  },

  //Is the mouse button pressed? Down (true) Up (false)
  getMouseButton(button) {
    if(arguments.length != 1) throw new Error("Function requires exactly one argument.")
    return this.mouseButtons[button];
  },

  //What is the current state of the scroll wheel?
  getMouseScrollWheel() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.frameScrollDelta;
  },

  //What is the mouse position?
  //We return the previous frame's position for consistency
  getMousePosition() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.frameMousePosition;
  },
  getMousePositionDelta() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return new Point(this.frameMousePosition.x - this.lastFrameMousePosition.x, this.frameMousePosition.y - this.lastFrameMousePosition.y);
  },

  //Touch API----------------------------------
  //
  getTouchesStartFull() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.frameTouchesStart;
  },
  getTouchesStart() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.frameTouchesStart.map(i => { return { x: i.clientX, y: i.clientY } });
  },
  getTouchesEndFull() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.frameTouchesEnd;
  },
  getTouchesEnd() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    if(this.frameTouchesEnd.length == 0) return [];
    return this.frameTouchesEnd.map(i => { return { x: i.clientX, y: i.clientY } });
  },
  anyTouchesEnd(){
    return this.getTouchesEnd().length > 0;
  },
  getTouchesFull() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    return this.touches;
  },
  getTouches() {
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    //If we have ending touches, merge those in here
    let toReturn = this.touches.map(i => { return { x: i.clientX, y: i.clientY } });
    toReturn.push(...this.frameTouchesEnd.map(i=>{return{x:i.clientX,y:i.clientY}}));
    return toReturn;
  },  
  // getTouchPositions() {
  //   return this.frameTouchPositions.map(i => { return { x: i.clientX, y: i.clientY } });
  // },
  getTouchMove(){    
    if(arguments.length != 0) throw new Error("Function does not accept arguments.")
    if(this.frameTouchPositions.length == 0 || this.lastFrameTouchPositions.length == 0) return[{x:0,y:0}];
    let frames = this.frameTouchPositions.map(i => { return { x: i.clientX, y: i.clientY } });
    let currents = this.lastFrameTouchPositions.map(i => { return { x: i.clientX, y: i.clientY } });
    let toReturn = []
    for(let i=0; i < Math.min(frames.length, currents.length); i++){
      let frame = frames[i];
      let current = currents[i]
      toReturn.push(new Point(frame.x - current.x, frame.y - current.y))
    }
    return toReturn;
  }




}

export default Input;