function id(x) { return x[0]; }

//Allow use in node and in browser
    import moo from "../lib/moo.js";

const lexer = moo.compile({
  componentLine :/=[ \t]*.+[ \t]*$/,
  //string:/"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/, //From: https://github.com/kach/nearley/blob/0ce577b98484a345c67f7f2c62d8ee700ec9d7d7/examples/json.ne#L10
  newline: {match:/\r?\n/, lineBreaks:true},
  wschar: /[ \t\v\f]/,
  float: /[+-]?\d*\.\d+/, 
  int: /[+-]?\d+/,
  word: /[a-zA-Z_][a-zA-_Z0-9]*/,
  ',':',',
  '|':'|',
  '-':'-',
  '=':'=',
  '{':'{',
  '}':'}',
  });



function parseObjects(d){
    let first = d[0];
    let second = d[1];
    if(!d[1] || d[1].length == 0){
        return [d[0]]
    }else{
        let collect = d[1].map(x=>x[2]);
        return [d[0], ...collect];
    }
}

function handleComponentLine(d){
    return d[0].value.substr(1).trim();
}

//Ignore the input by returning null
function ignore(d){
    return null;
}

function value(d, type){
    let value = d[0];
    if(d[0].value)
    value = d[0].value;
    
    return {type, value}
}

function getValue(d){
    return d[0].value;
}

function getComponents(d){
    let toReturnComponents = [];
    let toReturn = {components:toReturnComponents};
    if(d.length == 0 || d[0].length == 0) return toReturn;
    let componentArgs = d[0];
    for(let i = 0; i < componentArgs.length; i++){
        let componentLine = componentArgs[i];
        let component = componentLine[1];
        toReturnComponents.push(...component);
    }
    return toReturn;
}

function getComponentList(d){
    let toReturn = [];
    let component = {
        name:d[1],
        keyValues:[],
    };
    toReturn.push(component)

    for(let i = 0; i < d[3].length; i++){
        let keyValueLine = d[3][i];
        let keyValue = keyValueLine[4];
        component.keyValues.push(keyValue);
    }

    return toReturn;
}

function topLevel(d){
    let currentObject = {};
    for(let i= 0; i < d.length; i++){
        let currentArg = d[i];
        currentObject = Object.assign(currentObject, currentArg);
    }
    return currentObject;
    //return Object.assign(Object.assign(d[0],d[1]), d[2])
}

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "Objects$ebnf$1", "symbols": []},
    {"name": "Objects$ebnf$1$subexpression$1", "symbols": ["NewLine", "NewLine", "Object"]},
    {"name": "Objects$ebnf$1", "symbols": ["Objects$ebnf$1", "Objects$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Objects", "symbols": ["Object", "Objects$ebnf$1"], "postprocess": parseObjects},
    {"name": "Object$ebnf$1", "symbols": ["ChildrenList"], "postprocess": id},
    {"name": "Object$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Object", "symbols": ["MainLine", "TransformLines", "ComponentLines", "Object$ebnf$1"], "postprocess": topLevel},
    {"name": "MainLine$ebnf$1$subexpression$1", "symbols": ["__", {"literal":"|"}, "_", "Layer"]},
    {"name": "MainLine$ebnf$1", "symbols": ["MainLine$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "MainLine$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "MainLine", "symbols": ["Name", "__", "Prefab", "MainLine$ebnf$1", "_"], "postprocess": d=>{return{name:d[0], prefab:d[2], layer:d[3]?d[3][3]:"default"}}},
    {"name": "TransformLines$ebnf$1$subexpression$1", "symbols": ["NewLine", "Transforms"]},
    {"name": "TransformLines$ebnf$1", "symbols": ["TransformLines$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "TransformLines$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "TransformLines", "symbols": ["TransformLines$ebnf$1"], "postprocess": d=>{return{transforms:d[0]?d[0][1]:{translate:{x:0,y:0},scale:{x:1,y:1},rotation:0}}}},
    {"name": "ComponentLines$ebnf$1", "symbols": []},
    {"name": "ComponentLines$ebnf$1$subexpression$1", "symbols": ["NewLine", "Components"]},
    {"name": "ComponentLines$ebnf$1", "symbols": ["ComponentLines$ebnf$1", "ComponentLines$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ComponentLines", "symbols": ["ComponentLines$ebnf$1"], "postprocess": getComponents},
    {"name": "ChildrenList", "symbols": ["NewLine", "_", {"literal":"{"}, "_", "NewLine", "_", "Objects", "NewLine", "_", {"literal":"}"}, "_"], "postprocess": d=> {return{children:d[6]}}},
    {"name": "Name", "symbols": ["Word"], "postprocess": id},
    {"name": "Prefab", "symbols": ["Word"], "postprocess": id},
    {"name": "Layer", "symbols": ["Word"], "postprocess": id},
    {"name": "Transforms$ebnf$1$subexpression$1", "symbols": ["NewLine", "SecondTransforms"]},
    {"name": "Transforms$ebnf$1", "symbols": ["Transforms$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Transforms$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Transforms", "symbols": ["_", "Translation", "Transforms$ebnf$1"], "postprocess": d=> {return {translate: d[1], scale:d[2]?d[2][1].scale:{x:1,y:1}, rotation:d[2]?d[2][1].rotation:0}}},
    {"name": "SecondTransforms$ebnf$1$subexpression$1", "symbols": ["NewLine", "Rotation"]},
    {"name": "SecondTransforms$ebnf$1", "symbols": ["SecondTransforms$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "SecondTransforms$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SecondTransforms", "symbols": ["_", "Scale", "SecondTransforms$ebnf$1"], "postprocess": d=> {return {scale: d[1], rotation:d[2]?d[2][1]:0}}},
    {"name": "Translation", "symbols": ["Point"], "postprocess": id},
    {"name": "Scale", "symbols": ["Point"], "postprocess": id},
    {"name": "Components$ebnf$1", "symbols": []},
    {"name": "Components$ebnf$1$subexpression$1", "symbols": ["NewLine", "_", {"literal":"-"}, "_", "ComponentKeyValue"]},
    {"name": "Components$ebnf$1", "symbols": ["Components$ebnf$1", "Components$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Components", "symbols": ["_", "ComponentName", "_", "Components$ebnf$1"], "postprocess": getComponentList},
    {"name": "ComponentName", "symbols": ["Word"], "postprocess": id},
    {"name": "ComponentKeyValue", "symbols": ["Word", "_", "ComponentValue"], "postprocess": d => {return {key:d[0], value:d[2]}}},
    {"name": "ComponentValue", "symbols": [(lexer.has("componentLine") ? {type: "componentLine"} : componentLine)], "postprocess": handleComponentLine},
    {"name": "Point", "symbols": ["Number", "_", {"literal":","}, "_", "Number"], "postprocess": d => { return {x:d[0],y:d[4]}}},
    {"name": "Rotation", "symbols": ["_", "Number"], "postprocess": d=>d[1]},
    {"name": "Number", "symbols": ["Float"], "postprocess": id},
    {"name": "Number", "symbols": ["Int"], "postprocess": id},
    {"name": "Float", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": getValue},
    {"name": "Int", "symbols": [(lexer.has("int") ? {type: "int"} : int)], "postprocess": getValue},
    {"name": "Word", "symbols": [(lexer.has("word") ? {type: "word"} : word)], "postprocess": getValue},
    {"name": "String", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": getValue},
    {"name": "NewLine", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ignore},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": ignore},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": ignore},
    {"name": "wschar", "symbols": [(lexer.has("wschar") ? {type: "wschar"} : wschar)], "postprocess": id},
    {"name": "Scene$ebnf$1$subexpression$1", "symbols": ["NewLine", "NewLine", "Objects"]},
    {"name": "Scene$ebnf$1", "symbols": ["Scene$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Scene$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Scene", "symbols": ["_", "SceneName", "_", "Scene$ebnf$1"], "postprocess": d=> {return{name:d[1], objects: d[3]? d[3][2]:[]}}},
    {"name": "SceneName", "symbols": ["Word"], "postprocess": id}
]
  , ParserStart: "Scene"
}
export default grammar
