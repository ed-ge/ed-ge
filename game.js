import Scenes from "./game/Scenes.js"
import SceneManager from "./game/SceneManager.js"
import Engine from "./engine/Engine.js"


let sceneOne = new Scenes.SceneOne();
let sceneTwo = new Scenes.SceneTwo();

SceneManager.addScene(sceneOne);
SceneManager.addScene(sceneTwo);
SceneManager.currentScene = 0;


//Setup event handling
document.body.addEventListener('keydown', keydown);
document.body.addEventListener('keyup', keyup);
document.body.addEventListener('keypress', keypress);

let Input = Engine.Input;

function keydown(event){
    console.log("keydown");
    console.log(event.key);
}

function keyup(event){
    console.log("keyup");
    console.log(event.keyCode);
}

function keypress(event){
    console.log("keypress");
    console.log(`Modifier keys: Control: ${event.ctrlKey}, Alt: ${event.altKey}, Shift: ${event.shiftKey}, Meta Key: ${event.metaKey}`);
}



let canv, ctx;

function main() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext('2d');

    setInterval(gameLoop, 33);
}

function gameLoop() {
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

