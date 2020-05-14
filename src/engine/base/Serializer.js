import GameObject from "./GameObject.js"

class Serializer {
  constructor(components, prefabs) {
    this.components = components;
    this.prefabs = prefabs;
  }
  serializeComponent(component) {
    let toReturn = component.constructor.name;

    Object.keys(component).filter(i => i != 'gameObject' && i != 'uuid').forEach(i => toReturn += ("|" + i + "|" + component[i]));
    return toReturn;
  }
  deserializeComponent(string) {
    let splits = string.split("|");
    let type = splits[0];
    let componentType = this.components[type]
    let component = new componentType();
    for (let i = 1; i < splits.length; i += 2) {
      let key = splits[i];
      let value = splits[i + 1];
      component[key] = value;
    }
    return component;
  }
  serializeGameObject(gameObject) {
    let toReturn = {
      def: `${gameObject.name},${gameObject.x},${gameObject.y},${gameObject.scaleX},${gameObject.scaleY},${gameObject.rotation},${gameObject.type}`,
      components: [],
      componentValues: [],
      children: []
    }

    for (let i = 0; i < gameObject.components.length; i++) {
      let component = gameObject.components[i];
      let toAdd = this.serializeComponent(component);
      toReturn.components.push(toAdd);
    }
    //Now call the function on the children
    for (let i = 0; i < gameObject.children.length; i++) {
      let child = gameObject.children[i];
      let toAdd = this.serializeGameObject(child);
      toReturn.children.push(toAdd);
    }
    return toReturn;
  }
  deserializeGameObject(obj){
    
    let gameObject = new GameObject();
    
    return gameObject;

  }

}

export default Serializer;