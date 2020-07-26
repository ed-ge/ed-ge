function id(x) { return x[0]; }

//Allow use in node and in browser
    import moo from "moo";

const lexer = moo.compile({
  string:/"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/, //From: https://github.com/kach/nearley/blob/0ce577b98484a345c67f7f2c62d8ee700ec9d7d7/examples/json.ne#L10
  newline: {match:/\r?\n/, lineBreaks:true},
  wschar: /[ \t\v\f]/,
  float: /[+-]?\d+\.\d+/, //From https://stackoverflow.com/a/10256077/10047920
  word: /[a-zA-Z_][a-zA-_Z0-9]*/,
  ',':',',
  '|':'|',
  '-':'-',
  '=':'=',
  });



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

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "Grammar", "symbols": ["Object"], "postprocess": id},
    {"name": "Object", "symbols": ["MainLine", "TransformLines", "ComponentLines"], "postprocess": d=>{return Object.assign(Object.assign(d[0],d[1]), d[2])}},
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
    {"name": "Transforms$ebnf$1$subexpression$1", "symbols": ["NewLine", "SecondTransforms"]},
    {"name": "Transforms$ebnf$1", "symbols": ["Transforms$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Transforms$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Transforms", "symbols": ["Translation", "Transforms$ebnf$1"], "postprocess": d=> {return {translate: d[0], scale:d[1]?d[1][1].scale:{x:1,y:1}, rotation:d[1]?d[1][1].rotation:0}}},
    {"name": "Name", "symbols": ["Word"], "postprocess": id},
    {"name": "Prefab", "symbols": ["Word"], "postprocess": id},
    {"name": "Layer", "symbols": ["Word"], "postprocess": id},
    {"name": "SecondTransforms$ebnf$1$subexpression$1", "symbols": ["NewLine", "Rotation"]},
    {"name": "SecondTransforms$ebnf$1", "symbols": ["SecondTransforms$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "SecondTransforms$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SecondTransforms", "symbols": ["Scale", "SecondTransforms$ebnf$1"], "postprocess": d=> {return {scale: d[0], rotation:d[1]?d[1][1]:0}}},
    {"name": "Rotation", "symbols": ["Float"], "postprocess": id},
    {"name": "Translation", "symbols": ["Point"], "postprocess": id},
    {"name": "Scale", "symbols": ["Point"], "postprocess": id},
    {"name": "Point", "symbols": ["Float", "_", {"literal":","}, "_", "Float"], "postprocess": d => { return {x:d[0],y:d[4]}}},
    {"name": "Float", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": getValue},
    {"name": "Word", "symbols": [(lexer.has("word") ? {type: "word"} : word)], "postprocess": getValue},
    {"name": "Components$ebnf$1", "symbols": []},
    {"name": "Components$ebnf$1$subexpression$1", "symbols": ["NewLine", "_", {"literal":"-"}, "_", "ComponentKeyValue", "_"]},
    {"name": "Components$ebnf$1", "symbols": ["Components$ebnf$1", "Components$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Components$ebnf$2", "symbols": []},
    {"name": "Components$ebnf$2$subexpression$1", "symbols": ["NewLine", "Components"]},
    {"name": "Components$ebnf$2", "symbols": ["Components$ebnf$2", "Components$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Components", "symbols": ["ComponentName", "_", "Components$ebnf$1", "Components$ebnf$2"], "postprocess": d=>{return [{name:d[0]}] }},
    {"name": "ComponentName", "symbols": ["Word"], "postprocess": id},
    {"name": "ComponentKeyValue", "symbols": ["Word", "_", {"literal":"="}, "_", (lexer.has("string") ? {type: "string"} : string), "_"]},
    {"name": "NewLine", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": ignore},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": ignore},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": ignore},
    {"name": "wschar", "symbols": [(lexer.has("wschar") ? {type: "wschar"} : wschar)], "postprocess": id}
]
  , ParserStart: "Grammar"
}
export default grammar
