import Engine from "../../engine/Engine.js"

export default class TextBehavior extends Engine.Base.Behavior {
    
    start() {

    }
    update() {
        if(Engine.Base.Input.getMouseButtonUp(0)){
            Engine.Base.SceneManager.currentScene = "CollisionScene" ;
        }
        if(Engine.Base.Input.getKeyUp(' '))
        {
            Engine.Base.SceneManager.currentScene = "SceneOne";
        }
        if(Engine.Base.Input.getKeyUp('a'))
        {
            Engine.Base.SceneManager.currentScene = "SceneTwo";
        }
        if(Engine.Base.Input.getKeyUp('Enter'))
        {
            Engine.Base.SceneManager.currentScene = "StrategyScene";
        }
        if(Engine.Base.Input.getKeyUp('r'))
        {
            Engine.Base.SceneManager.currentScene = "RoomScene";
        }
        if(Engine.Base.Input.getKeyUp('c'))
        {
            Engine.Base.SceneManager.currentScene = "CircleCollisionScene";
        }
        if(Engine.Base.Input.getKeyUp('m'))
        {
            Engine.Base.SceneManager.currentScene = "MouseScene";
        }

        let clickGameObject = Engine.Base.SceneManager.currentScene.findByName("Click");
        if(clickGameObject != null){
            console.log("I found the click game object");
        }

    }
}