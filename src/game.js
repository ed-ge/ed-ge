import Engine from "./engine/Engine.js"
import Scenes from "./game/Scenes.js"
import SceneManager from "./game/SceneManager.js"
import GameBehaviors from "./game/GameBehaviors.js";
import GameObjects from "./game/GameObjects.js"




Engine.Base.Scene.gameObjects = GameObjects;
Engine.Base.Scene.components = Engine.Components;
Engine.Base.Scene.gameBehaviors = GameBehaviors;


Scenes.allScenes
  .forEach(i => SceneManager.addScene(Engine.Base.Scene.parse(i)))

SceneManager.currentScene = Scenes.startScene;


//Setup event handling
document.body.addEventListener('keydown', keydown);
document.body.addEventListener('keyup', keyup);
document.body.addEventListener('keypress', keypress);
document.body.addEventListener('mousedown', mousedown);
document.body.addEventListener('mouseup', mouseup);
document.body.addEventListener('contextmenu', contextmenu); //Kill the right mouse context menu
document.body.addEventListener('mousemove', mousemove);
document.body.addEventListener('wheel', wheel);

let Input = Engine.Base.Input;

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

function keypress(event) {
  //console.log(`Modifier keys: Control: ${event.ctrlKey}, Alt: ${event.altKey}, Shift: ${event.shiftKey}, Meta Key: ${event.metaKey}`);
}

function mousemove(event){
  Input.mousePosition.x = event.offsetX;
  Input.mousePosition.y = event.offsetY;
}

function wheel(event){
  Input.mouseScrollDelta = event.delta;
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



let canv, ctx;

function main() {
  canv = document.querySelector("#canv");
  ctx = canv.getContext('2d');

  setInterval(gameLoop, 33);
}

function gameLoop() {
  Input.swapUpDownArrays();
  update(ctx);
  draw(ctx);
}

function update(ctx) {
  SceneManager.currentScene.update(Engine.Components.Collider, Engine.Components.CollisionHelper, ctx);
}

function draw(ctx) {
  SceneManager.currentScene.draw(ctx, canv.width, canv.height);
}

main();

