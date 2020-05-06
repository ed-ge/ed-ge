
export default class TextBehavior extends Base.Behavior {
    
    start() {

    }
    update() {
        if(Base.Input.getMouseButtonUp(0)){
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

    }
}