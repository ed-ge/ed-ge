import GameObject from "./GameObject.js"
import Point from "./Point.js"

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
      def: `${gameObject.name},${gameObject.x},${gameObject.y},${gameObject.scaleX},${gameObject.scaleY},${gameObject.rotation},${gameObject.prefabName}`,
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
  

  instantiate(gameObjectType, location, scale = new Point(1, 1), rotation = 0, parent = this, obj = null) {
    let gameObject = new GameObject(location.x, location.y, scale.x, scale.y, rotation, gameObjectType.name);
    

    let prefab = this.prefabs[gameObjectType.name];
    this.buildIt(prefab, gameObject)
    if (obj)
      gameObject.name = obj.name;
    else
      gameObject.name = prefab.name;
    gameObject.prefabName = gameObjectType.name;
    if (obj) {
      this.buildIt(obj, gameObject)
    }

    if (parent){
      parent.children.push(gameObject);
      if(parent.newChildEvent){
        parent.newChildEvent(gameObject);
      }
    }
    gameObject.recursiveCall("start");
    
    return gameObject;

  }

  buildIt(obj, gameObject) {
    //Recursively build children
    if (obj.children) {
      obj.children.forEach(i => this.deserializeGameObject(i, gameObject))
    }

    if(obj.add) obj.components = obj.add; //let add be shorthand for components
    if (obj.components) {
      obj.components.forEach(i => {
        let component =  this.deserializeComponent(i);
        gameObject.addComponent(component);
      });
    }

    //Set the key-pair values on components already on prefabs
    if(obj.edit) obj.componentValues = obj.edit; //let edit be shorthand for componentValues
    if (obj.componentValues) {
      obj.componentValues.forEach(j => {
        let split = j.split("|").map(i => i.trim());
        let component = gameObject.getComponent(split[0])
        let value = split[2];
        try {
          value = JSON.parse(split[2])
        } catch (e) {
          //Looks like it wasn't JSON after all..
        }
        component[split[1]] = value;
      })
    }

    //Add new components
    
  }

  /**
   * 
   * @param {String} obj The string giving the declarative syntax
   * @param {NameableParent} parent The parent of the object in the scene tree
   */
  deserializeGameObject(obj, parent = null) {

    if(obj.new) obj.def = obj.new; //Add new as a shorthand for def
    if (obj.def) {
      obj.location = { x: 0, y: 0 };
      obj.scale = { x: 1, y: 1 };
      let split = obj.def.split(",").map(i => i.trim());
      switch (split.length) {
        case 1:
          obj.type = split[0];
          obj.name = obj.type;
          break;
        case 2:
          [obj.name, obj.type] = split;
          break;
        case 3:
          throw "There is no shorthand object definition with 3 values.";
        case 4:
          [obj.name, obj.location.x, obj.location.y, obj.type] = split;
          break;
        case 5:
          [obj.name, obj.location.x, obj.location.y, obj.scale.x, obj.type] = split;
          obj.scale.y = obj.scale.x;
          break;
        case 6:
          [obj.name, obj.location.x, obj.location.y, obj.scale.x, obj.scale.y, obj.type] = split;
          break;
        case 7:
          [obj.name, obj.location.x, obj.location.y, obj.scale.x, obj.scale.y, obj.rotation, obj.type] = split;
          break;
        default:
          throw "There is not a shorthand object definition with " + split.length + " arguments.";
      }
    }

    let gameObjectType = this.prefabs["" + obj.type]
    if (gameObjectType == null) 
    throw "Could now find game object of type " + obj.type;

    obj.location = obj.location || { x: 0, y: 0 }
    obj.scale = obj.scale || { x: 1, y: 1 }
    obj.rotation = obj.rotation || 0;

    obj.location.x = +obj.location.x;
    obj.location.y = +obj.location.y;
    obj.scale.x = +obj.scale.x;
    obj.scale.y = +obj.scale.y;
    obj.rotation = +obj.rotation;

    return this.instantiate(gameObjectType, new Point(obj.location.x, obj.location.y), new Point(obj.scale.x, obj.scale.y), obj.rotation, parent, obj);

    //gameObject.name = obj.name;
    //this.buildIt(obj, gameObject);
  }

}

export default Serializer;