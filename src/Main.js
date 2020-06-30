import Scene from "./base/Scene.js"
import Input from "./base/Input.js"
import Base from "./Base.js"


/**
 * Main function for the game.
 * This functon takes in game-specific game objects, behaviors, and scenes
 * and starts the game loop.
 * 
 * It also accepts an optional "options" parameter which can override the default behavior.
 * 
 * The options object can have the following key value pairs
 * - startScene:{String} overrive the start scene provided in the scenes object
 * - runUpdate:{bool} if true, prevents update from being called. The Engine wil only render the initial state.
 * 
 * @param {Array} gameObjects An array of game objects that can be in the game
 * @param {Array} gameBehaviors An array of behaviors that can be in the game
 * @param {Object} scenes An object specifying the start scenes and scene definitions
 * @param {Object} options An object with options that override the defaults
 */
function main(gameObjects, gameBehaviors, scenes, options = {}) {
  //From https://flaviocopes.com/how-to-merge-objects-javascript/
  this.deserializedPrefabs = []
  for(let prefab in this.Prefabs){
    this.deserializedPrefabs.push(Base.Serializer.deserializePrefab(prefab))
  }
  this.Prefabs = { ...gameObjects, ...this.Prefabs };
  Base.Serializer.prefabs = this.Prefabs;
  Base.Serializer.components = { ...Base.Serializer.components, ...gameBehaviors };
  this.Behaviors = gameBehaviors;
  let canv, ctx;

  let shouldDraw = true;
  if (typeof options.runDraw !== 'undefined' || options.runDraw === false)
    shouldDraw = false;

  this.SceneManager.clearScenes();
  scenes.allScenes
    .forEach(i => this.SceneManager.addScene(new Scene(i, this.Prefabs, gameBehaviors, this.Components)))

  this.SceneManager.currentScene = options.startScene || scenes.startScene;

  if (shouldDraw) {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');
  }
  else {
    //don't get the value of canv and ctx
  }

  let that = this;

  function gameLoop() {

    let shouldUpdate = true;


    if (typeof options.runUpdate !== 'undefined' || options.runUpdate === false)
      shouldUpdate = false;


    Input.swapUpDownArrays();
    if (shouldUpdate)
      update(ctx);
    if (shouldDraw)
      draw(ctx);
  }

  function update(ctx) {
    that.SceneManager.currentScene.update(ctx, that.Components.Collider, that.Components.CollisionHelper);
  }

  function draw(ctx) {
    that.SceneManager.currentScene.draw(ctx, canv.width, canv.height);
  }

  //Setup event handling
  if (options.runUpdate === undefined || options.runUpdate == true) {
    document.body.addEventListener('keydown', keydown);
    document.body.addEventListener('keyup', keyup);
    document.body.addEventListener('keypress', keypress);
    document.body.addEventListener('mousedown', mousedown);
    document.body.addEventListener('mouseup', mouseup);
    document.body.addEventListener('mousemove', mousemove);
    document.body.addEventListener('wheel', wheelevent);
    document.body.addEventListener('contextmenu', contextmenu);
    document.body.addEventListener("touchstart", touchstart, false);
    document.body.addEventListener("touchend", touchend, false);
    document.body.addEventListener("touchcancel", touchcancel, false);
    document.body.addEventListener("touchmove", touchmove, false);



    function keydown(event) {
      if (Input.keys[event.key] != true)
        Input.down[event.key] = true;
      Input.keys[event.key] = true;
    }

    function keyup(event) {
      if (Input.keys[event.key] != false)
        Input.up[event.key] = true;
      Input.keys[event.key] = false;
    }

    function mousedown(event) {
      if (Input.mouseButtons[event.button] != true)
        Input.mouseButtonsDown[event.button] = true;
      Input.mouseButtons[event.button] = true;
    }

    function mouseup(event) {
      if (Input.mouseButtons[event.button] != false)
        Input.mouseButtonsUp[event.button] = true;
      Input.mouseButtons[event.button] = false;
    }

    function mousemove(event) {
      [Input.mousePosition.x, Input.mousePosition.y] = [event.clientX, event.clientY];

    }

    function wheelevent(event) {
      if (event.deltaY != 0)
        Input.mouseScrollDelta = event.deltaY;
    }

    function keypress(event) {
      //console.log(`Modifier keys: Control: ${event.ctrlKey}, Alt: ${event.altKey}, Shift: ${event.shiftKey}, Meta Key: ${event.metaKey}`);
    }

    function touchstart(event) {
      //event.preventDefault();//Don't treat this as a mouse event
      Input.touches = copyTouches(event.changedTouches);
      Input.touchesStart = copyTouches(event.changedTouches); //Simple deep copy
    }

    function touchend(event) {
      //event.preventDefault();//Don't treat this as a mouse event
      Input.touches = [];//copyTouches(event.changedTouches);
      Input.touchesEnd = copyTouches(event.changedTouches); //Simple deep copy
    }

    function touchcancel(event) {
      //event.preventDefault();//Don't treat this as a mouse event
      console.log("Touch Cancel")
    }

    function touchmove(event) {
      Input.touches = copyTouches(event.changedTouches);

    }
  }

  function copyTouches(touches) {
    let toReturn = [];
    for (let i = 0; i < touches.length; i++) {
      let touch = touches[i];
      let toAdd = {}
      for (let j in touch) {
        toAdd[j] = touch[j]
      }

      toReturn.push(toAdd);
    }
    return toReturn;
  }

  // Based on https://stackoverflow.com/questions/381795/how-to-disable-right-click-context-menu-in-javascript
  // Kills the right mouse context menu
  function contextmenu(event) {
    if (event.preventDefault != undefined)
      event.preventDefault();
    if (event.stopPropagation != undefined)
      event.stopPropagation();
    return false;
  }

  //Keep our canvas full screen
  //from https://blog.codepen.io/2013/07/29/full-screen-canvas/

  // var can = document.getElementById("canv");

  function resizeCanvas() {
    let parent = canv.parentNode;
    if (parent == document.body) {
      parent = window;
      canv.style.width = parent.innerWidth + "px";

      canv.width = parent.innerWidth;
      canv.height = parent.innerHeight;
    }
    else {
      //Take the canvas out of the parent div sive calculation momentarily
      can.style.height = "0px";
      can.style.width = "0px";
      can.width = 0
      can.height = 0;
      //Then on the next tick put it back in.
      setTimeout(function () {
        let width = parent.clientWidth;
        let height = parent.clientHeight;
        can.style.width = width + "px";
        can.style.height = height + "px";
        can.width = width;
        can.height = height;
        //console.log(`${parent.clientWidth}-${parent.innerWidth}-${parent.offsetWidth}`)
        console.log(`${can.style.height} ${can.height}`)
      }, 0);

    }
  };

  //Don't look for or respond to the canvas if we're in "headless" mode
  if (shouldDraw) {
    window.onresize = resizeCanvas;

    // Webkit/Blink will fire this on load, but Gecko doesn't.
    // So we fire it manually...
    resizeCanvas();
  }
  if (options.runUpdate === undefined || options.runUpdate == true) 
    setInterval(gameLoop, 33);
};

export default main;