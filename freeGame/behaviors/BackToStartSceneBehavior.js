
export default class BackToStartSceneBehavior extends Base.Behavior {
    
    start() {
        

    }
    update() {
        if(Base.Input.getKeyUp("Escape")){
            Base.SceneManager.currentScene = "StartScene";
        }
        
    }
   
}