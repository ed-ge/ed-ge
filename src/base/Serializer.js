import GameObject from "./GameObject.js"
import Point from "./Point.js"


class Serializer {
  constructor(components) {
    this.components = components;
    this.prefabs = {};
  }
  FromEdge(arr) {
    let toReturn = [];
    for (let i = 0; i < arr.objects.length; i++) {
      let edgeChild = arr.objects[i];
      let toAdd = this.FromEdgeChild(edgeChild);
      toReturn.push(toAdd);
    }
    return toReturn;
  }

  FromEdgeChild(edge, store=false) {
    let toReturn = new GameObject();
    if (edge.prefab != "Empty") {
      let toClone = this.prefabs[edge.prefab];
      toReturn = _.cloneDeep(toClone);
    }
    //Handle main line
    toReturn.name = edge.name;
    toReturn.prefabName = edge.prefab;
    toReturn.layer = edge.layer;

    //Handle transforms
    toReturn.x = edge.transforms.translate.x
    toReturn.y = edge.transforms.translate.y
    toReturn.scaleX = edge.transforms.scale.x
    toReturn.scaleY = edge.transforms.scale.y
    toReturn.rotation = edge.transforms.rotation

    //Handle components
    for (let i = 0; i < edge.components.length; i++) {
      let edgeComponent = edge.components[i];
      let component;
      if (toReturn.anyComponent(edgeComponent.name))
        component = toReturn.getComponent(edgeComponent.name);
      else {
        component = new this.components[edgeComponent.name]();
        toReturn.components.push(component);
      }
      for (let j = 0; j < edgeComponent.keyValues.length; j++) {
        let edgeComponentKeyValue = edgeComponent.keyValues[j];
        component[edgeComponentKeyValue.key] = edgeComponentKeyValue[edgeComponentKeyValue.value]
      }

    }
    toReturn.components.forEach(x => x.gameObject = toReturn);

    //Now do the children
    for (let i = 0; i < edge.children; i++) {
      let edgeChild = edge.children[i];
      let gameObjectChild = this.FromEdgeChild(edgeChild);
      toReturn.children.push(gameObjectChild)
    }

    if (store)
      this.prefabs[toReturn.name] = toReturn;

    return toReturn;
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
    if (translate != null) { //Override if we have a valid argument
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
    if (scale != null) {
      toReturn.scaleX = scale.x;
      toReturn.scaleY = scale.y;
    }

    let possibleRotateLine = lines[lineIndex + 1];
    if (possibleRotateLine && possibleRotateLine.match(floatRegex)) {
      // console.log("Found rotate " + possibleRotateLine)
      lineIndex++;
      toReturn.rotation = +possibleRotateLine.trim();
    }
    if (rotation != null) {
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

    let toReturn = this.FromEdgeChild(gameObjectType);

    if (translate != null) { //Override if we have a valid argument
      toReturn.x = translate.x;
      toReturn.y = translate.y
    }
    if (scale != null) {
      toReturn.scaleX = scale.x;
      toReturn.scaleY = scale.y;
    }
    if (rotation != null) {
      toReturn.rotation = rotation;
    }
    if (parent != null) {
      parent.addChild(toReturn);
    }

    //let gameObject = this.deserializePrefab(gameObjectType, false, parent, location, scale, rotation);
    toReturn.recursiveCall("start")
    return toReturn;
  }
  // instantiate(gameObjectType, parent, location = null, scale = null, rotation = null) {
  //   //check to see if the transforms are set.
  //   //If they are either add them or override them

  //   let gameObject = this.deserializePrefab(gameObjectType, false, parent, location, scale, rotation);
  //   gameObject.recursiveCall("start")
  //   return gameObject;
  // }
}

export default Serializer;