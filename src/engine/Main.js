import Scene from "./base/Scene.js"
import Input from "./base/Input.js"



function main(gameObjects, gameBehaviors, scenes, runUpdate = true) {
  //From https://flaviocopes.com/how-to-merge-objects-javascript/
  this.Prefabs = { ...gameObjects, ...this.Prefabs };
  this.Behaviors = gameBehaviors;
  let canv, ctx;

  scenes.allScenes
    .forEach(i => this.SceneManager.addScene(new Scene(i, this.Prefabs, gameBehaviors, this.Components)))

  this.SceneManager.currentScene = scenes.startScene;
  canv = document.querySelector("#canv");
  ctx = canv.getContext('2d');

  let that = this;

  function gameLoop() {
    Input.swapUpDownArrays();
    if (runUpdate)
      update(ctx);
    draw(ctx);
  }

  function update() {
    that.SceneManager.currentScene.update(ctx, that.Components.Collider, that.Components.CollisionHelper);
  }

  function draw(ctx) {
    that.SceneManager.currentScene.draw(ctx, canv.width, canv.height);
  }

  //Setup event handling
  document.body.addEventListener('keydown', keydown);
  document.body.addEventListener('keyup', keyup);
  document.body.addEventListener('keypress', keypress);
  document.body.addEventListener('mousedown', mousedown);
  document.body.addEventListener('mouseup', mouseup);
  document.body.addEventListener('mousemove', mousemove);
  document.body.addEventListener('wheel', wheelevent);
  document.body.addEventListener('contextmenu', contextmenu);



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

  var can = document.getElementById("canv");

  function resizeCanvas() {
    let parent = can.parentNode;
    if (parent == document.body) {
      parent = window;
      can.style.width = parent.innerWidth + "px";

      can.width = parent.innerWidth;
      can.height = parent.innerHeight;
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

  // Webkit/Blink will fire this on load, but Gecko doesn't.
  window.onresize = resizeCanvas;

  // So we fire it manually...
  resizeCanvas();
  setInterval(gameLoop, 33);
};

export default main;