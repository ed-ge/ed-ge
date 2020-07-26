function id(x) { return x[0]; }

//Allow use in node and in browser
    import moo from "moo";

const lexer = moo.compile({
  newline: {match:/\r?\n/, lineBreaks:true},
  wschar: /[ \t\v\f]/,
  float: /[+-]?\d+\.\d+/, //From https://stackoverflow.com/a/10256077/10047920
  word: /[a-zA-Z_][a-zA-_Z0-9]*/,
  ',':',',
  '|':'|',
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

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "Grammar", "symbols": ["Object"], "postprocess": id},
    {"name": "Object$ebnf$1$subexpression$1", "symbols": ["__", {"literal":"|"}, "_", "Layer"]},
    {"name": "Object$ebnf$1", "symbols": ["Object$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Object$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Object$ebnf$2$subexpression$1", "symbols": ["NewLine", "Transforms"]},
    {"name": "Object$ebnf$2", "symbols": ["Object$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "Object$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Object", "symbols": ["Name", "__", "Prefab", "Object$ebnf$1", "_", "Object$ebnf$2"], "postprocess": (args)=>{return{name:args[0], prefab:args[2], layer:args[3]?args[3][3]:"default", transforms:args[4]?args[4][1]:{translate:{x:0,y:0},scale:{x:1,y:1},rotation:0}}}},
    {"name": "Name", "symbols": ["Word"], "postprocess": id},
    {"name": "Prefab", "symbols": ["Word"], "postprocess": id},
    {"name": "Layer", "symbols": ["Word"], "postprocess": id},
    {"name": "Transforms$ebnf$1$subexpression$1", "symbols": ["NewLine", "SecondTransforms"]},
    {"name": "Transforms$ebnf$1", "symbols": ["Transforms$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Transforms$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Transforms", "symbols": ["Translation", "Transforms$ebnf$1"], "postprocess": d=> {return {translate: d[0], scale:d[1]?d[1][1].scale:{x:1,y:1}, rotation:d[1]?d[1][1].rotation:0}}},
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
