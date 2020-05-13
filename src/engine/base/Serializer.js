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
    for(let i = 1; i < splits.length; i+= 2){
      let key = splits[i];
      let value = splits[i + 1];
      component[key] = value;
    }
    return component;
  }
}

export default Serializer;