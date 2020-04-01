import Base from "./Base.js"
import Components from "./Components.js"






export default function main(gameObjects, gameBehaviors, scenes) {
  Base.Globals.gameObjects = gameObjects;
  Base.Globals.components = Components;
  Base.Globals.gameBehaviors = gameBehaviors;
  let canv, ctx;

  scenes.allScenes
    .forEach(i => Base.SceneManager.addScene(Base.Globals.parse(i)))

  Base.SceneManager.currentScene = scenes.startScene;
  canv = document.querySelector("#canv");
  ctx = canv.getContext('2d');

  function gameLoop() {
    Base.Input.swapUpDownArrays();
    update(ctx);
    draw(ctx);
  }

  function update() {
    Base.SceneManager.currentScene.update(ctx, Components.Collider, Components.CollisionHelper);
  }

  function draw(ctx) {
    Base.SceneManager.currentScene.draw(ctx, canv.width, canv.height);
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
    if (Base.Input.keys[event.key] != true)
      Base.Input.down[event.key] = true;
    Base.Input.keys[event.key] = true;
  }

  function keyup(event) {
    if (Base.Input.keys[event.key] != false)
      Base.Input.up[event.key] = true;
    Base.Input.keys[event.key] = false;
  }

  function mousedown(event) {
    if (Base.Input.mouseButtons[event.button] != true)
      Base.Input.mouseButtonsDown[event.button] = true;
    Base.Input.mouseButtons[event.button] = true;
  }

  function mouseup(event) {
    if (Base.Input.mouseButtons[event.button] != false)
      Base.Input.mouseButtonsUp[event.button] = true;
    Base.Input.mouseButtons[event.button] = false;
  }

  function mousemove(event) {
    [Base.Input.mousePosition.x, Base.Input.mousePosition.y] = [event.clientX, event.clientY];

  }

  function wheelevent(event) {
    if (event.deltaY != 0)
      Base.Input.mouseScrollDelta = event.deltaY;
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
    can.style.width = window.innerWidth + "px";
    setTimeout(function () {
      can.style.height = window.innerHeight + "px";
    }, 0);
    can.width = window.innerWidth;
    can.height = window.innerHeight;
  };

  // Webkit/Blink will fire this on load, but Gecko doesn't.
  window.onresize = resizeCanvas;

  // So we fire it manually...
  resizeCanvas();





  setInterval(gameLoop, 33);


};

