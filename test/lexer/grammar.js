function id(x) { return x[0]; }

//Allow use in node and in browser
    import moo from "moo";

const lexer = moo.compile({
  wschar: {match:/[ \t\n\v\f]/, lineBreaks:true},
  word: /[a-zA-Z_][a-zA-_Z0-9]*/,
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
    {"name": "Object", "symbols": ["Name", "__", "Prefab"], "postprocess": (args)=>{return{name:args[0], prefab:args[2]}}},
    {"name": "Name", "symbols": ["Word"], "postprocess": id},
    {"name": "Prefab", "symbols": ["Word"], "postprocess": id},
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
