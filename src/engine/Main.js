import Engine from "./Engine.js"
import SceneManager from "./SceneManager.js"














export default function main(gameObjects, gameBehaviors, scenes) {
  Engine.Base.Scene.gameObjects = gameObjects;
  Engine.Base.Scene.components = Engine.Components;
  Engine.Base.Scene.gameBehaviors = gameBehaviors;
  let canv, ctx;

  scenes.allScenes
    .forEach(i => SceneManager.addScene(Engine.Base.Scene.parse(i)))

  SceneManager.currentScene = scenes.startScene;
  canv = document.querySelector("#canv");
  ctx = canv.getContext('2d');

  function gameLoop() {
    Engine.Base.Input.swapUpDownArrays();
    update(ctx);
    draw(ctx);
  }

  function update() {
    SceneManager.currentScene.update(ctx, Engine.Components.Collider, Engine.Components.CollisionHelper);
  }

  function draw(ctx) {
    SceneManager.currentScene.draw(ctx, canv.width, canv.height);
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
    if (Engine.Base.Input.keys[event.key] != true)
      Engine.Base.Input.down[event.key] = true;
    Engine.Base.Input.keys[event.key] = true;
  }

  function keyup(event) {
    if (Engine.Base.Input.keys[event.key] != false)
      Engine.Base.Input.up[event.key] = true;
    Engine.Base.Input.keys[event.key] = false;
  }

  function mousedown(event) {
    if (Engine.Base.Input.mouseButtons[event.button] != true)
      Engine.Base.Input.mouseButtonsDown[event.button] = true;
    Engine.Base.Input.mouseButtons[event.button] = true;
  }

  function mouseup(event) {
    if (Engine.Base.Input.mouseButtons[event.button] != false)
      Engine.Base.Input.mouseButtonsUp[event.button] = true;
    Engine.Base.Input.mouseButtons[event.button] = false;
  }

  function mousemove(event) {
    [Engine.Base.Input.mousePosition.x, Engine.Base.Input.mousePosition.y] = [event.clientX, event.clientY];

  }

  function wheelevent(event) {
    if (event.deltaY != 0)
      Engine.Base.Input.mouseScrollDelta = event.deltaY;
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

