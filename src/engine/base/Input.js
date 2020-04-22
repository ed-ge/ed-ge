/**
 * Static holder for the state of the input
 */

import Point from "./Point";

const Input = {

    //---------------------------------------------------
    //Key handling members
    //---------------------------------------------------
    keys : [], //What is the current state of each key?

    down : [], //Did the key go down this frame?
    up : [], //Did the key do up this frame?

    //When we start an update(), we shift to these arrays so we don't have mutating arrays mid-update
    frameDown : [],
    frameUp : [],


    //---------------------------------------------------
    //Mouse handling members
    //---------------------------------------------------


    mouseButtons :[], //What is the current State of the each button?

     mouseButtonsDown : [], //Did the mouse button go down this frame?
     mouseButtonsUp : [], //Did the mouse button go up this frame?

    //When we start an update(), we shift these arrays so we don't have mutating arrays mid-update
     frameMouseButtonsDown : [],
     frameMouseButtonsUp : [],

    //The location of the mouse in screen coordinates
     mousePosition : {x:0,y:0},
     lastFrameMousePosition : {x:0,y:0},

    //Handle the wheel state
     mouseScrollDelta : 0,
     frameScrollDelta: 0,



     swapUpDownArrays() {
        this.frameDown = this.down;
        this.frameUp = this.up;
        this.down = [];
        this.up = [];

        this.lastFrameMousePosition = this.mousePosition;

        this.frameMouseButtonsDown = this.mouseButtonsDown;
        this.frameMouseButtonsUp = this.mouseButtonsUp;
        this.frameScrollDelta = this.mouseScrollDelta;
        this.mouseScrollDelta = 0;
        this.mouseButtonsDown = [];
        this.mouseButtonsUp = [];
        
        
    },

    //---------------------------------------------------
    //Key handling functions
    //---------------------------------------------------

    //Did the key come up this frame?
    getKeyUp(key) {
        return this.frameUp[key];
    },

    //Did the key go down the frame? [Remember, the OS may make it look like key repeated when they did not]
     getKeyDown(key) {
        return this.frameDown[key];
    },

    //Is the key pressed? Down (true) Up (false)
     getKey(key) {
        return this.keys[key];
    },

    //---------------------------------------------------
    //Mouse handling functions
    //---------------------------------------------------


    //Did the mouse button come up this frame?
     getMouseButtonUp(button) {
        return this.frameMouseButtonsUp[button];
    },

    //Did the mouse button go down this frame?
     getMouseButtonDown(button) {
        return this.frameMouseButtonsDown[button];
    },

    //Is the mouse button pressed? Down (true) Up (false)
     getMouseButton(button) {
        return this.mouseButtons[button];
    },

    //What is the current state of the scroll wheel?
     getMouseScrollWheel(){
        return this.frameScrollDelta;
    },

    //What is the mouse position?
    //We return the previous frame's position for consistency
    getMousePosition(){
      return this.lastFrameMousePosition;
    },
    getMousePositionDelta(){
      return new Point(this.mousePosition.x - this.lastFrameMousePosition.x, this.mousePosition.y - this.lastFrameMousePosition.y); 
    }




}

export default Input;