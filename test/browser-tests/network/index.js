import Base from "../../../src/Base.js"

let Scenes = {
    startScene: "StartScene",
    allScenes: [
        {
            name: "StartScene",
            objects: [
                {
                    new: "Computer"
                }
            ]
        }
    ]
}

let GameBehaviors = {}

let Computer = {
    new: "Computer, Rectangle",
    
}

let Prefabs = { Computer };
Base.main(Prefabs, GameBehaviors, Scenes);
