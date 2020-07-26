function id(x) { return x[0]; }

//Allow use in node and in browser
    import moo from "moo";

const lexer = moo.compile({
  wschar: {match:/[ \t\n\v\f]/, lineBreaks:true},
  float: /^[+-]?\d+(?: \.\d+)?$/, //From https://stackoverflow.com/a/10256077/10047920
  word: /[a-zA-Z_][a-zA-_Z0-9]*/,
  ',':',',
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
    {"name": "Object$ebnf$1$subexpression$1", "symbols": ["__", "Transforms"]},
    {"name": "Object$ebnf$1", "symbols": ["Object$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Object$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Object", "symbols": ["Name", "__", "Prefab", "Object$ebnf$1"], "postprocess": (args)=>{return{name:args[0], prefab:args[2], transforms:args[3]}}},
    {"name": "Name", "symbols": ["Word"], "postprocess": id},
    {"name": "Prefab", "symbols": ["Word"], "postprocess": id},
    {"name": "Transforms$ebnf$1$subexpression$1", "symbols": ["__", "SecondTransforms"]},
    {"name": "Transforms$ebnf$1", "symbols": ["Transforms$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Transforms$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Transforms", "symbols": ["Translation", "Transforms$ebnf$1"], "postprocess": d=> {return {tronslate: d[0], scale:d[0].scale, rotation:d[0].rotation}}},
    {"name": "SectondTransforms$ebnf$1$subexpression$1", "symbols": ["__", "Rotation"]},
    {"name": "SectondTransforms$ebnf$1", "symbols": ["SectondTransforms$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "SectondTransforms$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SectondTransforms", "symbols": ["Scale", "SectondTransforms$ebnf$1"], "postprocess": d=> {return {scale: d[0], rotation:d[1]}}},
    {"name": "Rotation", "symbols": ["Float"], "postprocess": id},
    {"name": "Translation", "symbols": ["Point"], "postprocess": id},
    {"name": "Scale", "symbols": ["Point"], "postprocess": id},
    {"name": "Point", "symbols": ["Float", {"literal":","}, "Float"], "postprocess": d => { return {x:d[0],y:d[2]}}},
    {"name": "Float", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": getValue},
    {"name": "Word", "symbols": [(lexer.has("word") ? {type: "word"} : word)], "postprocess": getValue},
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
