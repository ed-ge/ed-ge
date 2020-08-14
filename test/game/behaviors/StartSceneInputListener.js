import Base from "../../../src/Base.js"

export default class TextBehavior extends Base.Behavior {
    
    start() {

    }
    update() {
        if(Base.Input.getKeyUp('z')){
            Base.SceneManager.currentScene = "CollisionScene" ;
        }
        if(Base.Input.getKeyUp(' '))
        {
            Base.SceneManager.currentScene = "SceneOne";
        }
        if(Base.Input.getKeyUp('a'))
        {
            Base.SceneManager.currentScene = "SceneTwo";
        }
        if(Base.Input.getKeyUp('Enter'))
        {
            Base.SceneManager.currentScene = "StrategyScene";
        }
        if(Base.Input.getKeyUp('r'))
        {
            Base.SceneManager.currentScene = "RoomScene";
        }
        if(Base.Input.getKeyUp('c'))
        {
            Base.SceneManager.currentScene = "CircleCollisionScene";
        }
        if(Base.Input.getKeyUp('m'))
        {
            Base.SceneManager.currentScene = "MouseScene";
        }
        if(Base.Input.getKeyUp('s'))
        {
            Base.SceneManager.currentScene = "RVOScene";
        }
        if(Base.Input.getKeyUp('t'))
        {
            Base.SceneManager.currentScene = "TouchScene";
        }
        if(Base.Input.getKeyUp('p'))
        {
            Base.SceneManager.currentScene = "P2PServer";
        }
        if(Base.Input.getKeyUp(';'))
        {
            Base.SceneManager.currentScene = "P2PClient";
        }

        

    }
}