import GameObject from "./GameObject.js"
import Point from "./Point.js"


class Serializer {
  constructor(components) {
    this.components = components;
    this.prefabs = {};
  }
  
  deserializePrefab(string, store = false, parent = null, translate = null, scale = null, rotation = null) {
    
    
    
    
    const newline = /\r?\n/;
    const commaSeparatedFloats = /^\s*[-+]?[0-9]*\.?[0-9]+,\s*[-+]?[0-9]*\.?[0-9]+\s*$/;
    const floatRegex = /^\s*[-+]?[0-9]*\.?[0-9]+\s*$/;
    const startsWithSpace = /^\s/;

    let lines = string.split(newline);
    lines = lines.filter(l => l.trim().length > 0);

    let lineIndex = 0;
    //Read name and prefab line
    let nameLine = lines[lineIndex]
    let nameLineSplit = nameLine.split(/\s/);
    let name = nameLineSplit[0];
    let prefabName = nameLineSplit[1];

    let toReturn = new GameObject();
    if (prefabName != "Empty") {
      let toClone = this.prefabs[prefabName];
      toReturn = _.cloneDeep(toClone);
    }

    toReturn.name = name;
    toReturn.prefabName = prefabName;

    //Check to see if we have any tranformation information
    let possibleTranslateLine = lines[lineIndex + 1];
    //For floating point regex, see https://www.regular-expressions.info/floatingpoint.html
    if (possibleTranslateLine && possibleTranslateLine.match(commaSeparatedFloats)) {
      // console.log("Found transform " + possibleTranslateLine)
      let split = lines[++lineIndex].trim().split(",");
      toReturn.x = +split[0].trim();
      toReturn.y = +split[1].trim();
    }
    if(translate != null){ //Override if we have a valid argument
      toReturn.x = translate.x;
      toReturn.y = translate.y
    }


    let possibleScaleLine = lines[lineIndex + 1];
    if (possibleScaleLine && possibleScaleLine.match(commaSeparatedFloats)) {
      // console.log("Found scale " + possibleScaleLine)
      let split = lines[++lineIndex].trim().split(",");
      toReturn.scaleX = +split[0].trim();
      toReturn.scaleY = +split[1].trim();
    }
    if(scale != null){
      toReturn.scaleX = scale.x;
      toReturn.scaleY = scale.y;
    }

    let possibleRotateLine = lines[lineIndex + 1];
    if (possibleRotateLine && possibleRotateLine.match(floatRegex)) {
      // console.log("Found rotate " + possibleRotateLine)
      lineIndex++;
      toReturn.rotation = +possibleRotateLine.trim();
    }
    if(rotation != null){
      toReturn.rotation = rotation;
    }



    let currentComponent;
    while (++lineIndex < lines.length) {
      let currentLine = lines[lineIndex].trimEnd();

      if (currentLine.length == 0) continue;
      if (currentLine.match(startsWithSpace)) {
        //It's a component value
        let componentValueSplit = currentLine.trim().split("=");
        let key = componentValueSplit[0]
        let value = componentValueSplit[1];
        //Look for JSON-like values
        if (value.startsWith("{") || value.startsWith("["))
          value = JSON.parse(componentValueSplit[1]);
        currentComponent[key] = value;
      }
      else {
        //It's a new component
        let componentName = currentLine.trim();
        if (toReturn.anyComponent(componentName)) {
          //Edit the existing componentent
          currentComponent = toReturn.getComponent(componentName);
        }
        else {
          //Add a new component
          currentComponent = new this.components[componentName]();
          toReturn.addComponent(currentComponent);
        }
      }
    }

    if (store)
      this.prefabs[name] = toReturn;
    if (parent != null) {
      parent.addChild(toReturn);
    }
    return toReturn;

  }
  instantiate(gameObjectType, parent, location = null, scale = null, rotation = null) {
    //check to see if the transforms are set.
    //If they are either add them or override them

    let gameObject = this.deserializePrefab(gameObjectType, false, parent, location, scale, rotation);
    gameObject.recursiveCall("start")
    return gameObject;
  }
}

export default Serializer;