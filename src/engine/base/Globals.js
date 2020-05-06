import Scene from "./Scene.js"

const Globals={
  gameObjects: [],
  components: [],
  gameBehaviors: [],
  parse(obj) {
    let toReturn = new Scene(obj.name);
    toReturn.objects = obj.objects;
    return toReturn;

  },
}

export default Globals;