import Scenes from "./game/Scenes.js"
import SceneManager from "./game/SceneManager.js"
import Engine from "./engine/Engine.js"


let sceneOne = new Scenes.SceneOne();
let sceneTwo = new Scenes.SceneTwo();
let sceneTwoB = new Scenes.SceneTwoB();
let sceneStrategyScene = new Scenes.StrategyScene();
let startScene = new Scenes.StartScene();

SceneManager.addScene(sceneOne);
SceneManager.addScene(sceneTwo);
SceneManager.addScene(sceneTwoB);
SceneManager.addScene(sceneStrategyScene);
SceneManager.addScene(startScene);
SceneManager.currentScene = "StartScene";


//Setup event handling
document.body.addEventListener('keydown', keydown);
document.body.addEventListener('keyup', keyup);
document.body.addEventListener('keypress', keypress);
document.body.addEventListener('mousedown', mousedown);
document.body.addEventListener('mouseup', mouseup);

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



let canv, ctx;

function main() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');

    setInterval(gameLoop, 33);
}

function gameLoop() {
    Input.swapUpDownArrays();
    update();
    draw(ctx);
}

function update() {
    SceneManager.currentScene.update();
}

function draw(ctx) {
    SceneManager.currentScene.draw(ctx, canv.width, canv.height);
}

main();

