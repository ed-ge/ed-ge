// Generated automatically by nearley, version 2.19.5
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "line", "symbols": ["object", "child"]},
    {"name": "child$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "child$string$2", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "child$string$3", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "child", "symbols": [{"literal":"<"}, "child$string$1", "object", "child$string$2", {"literal":">"}, "child$string$3"]},
    {"name": "object$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "object$string$2", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "object$string$3", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "object", "symbols": ["nameline", "object$string$1", "transforms", "object$string$2", "components", "object$string$3"]},
    {"name": "nameline", "symbols": ["name", "type"]},
    {"name": "transforms", "symbols": ["translate", "scale", "rotate"]},
    {"name": "translate$ebnf$1$subexpression$1$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "translate$ebnf$1$subexpression$1", "symbols": ["x", {"literal":","}, "y", "translate$ebnf$1$subexpression$1$string$1"]},
    {"name": "translate$ebnf$1", "symbols": ["translate$ebnf$1$subexpression$1"]},
    {"name": "translate$ebnf$1$subexpression$2$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "translate$ebnf$1$subexpression$2", "symbols": ["x", {"literal":","}, "y", "translate$ebnf$1$subexpression$2$string$1"]},
    {"name": "translate$ebnf$1", "symbols": ["translate$ebnf$1", "translate$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "translate", "symbols": ["translate$ebnf$1"]},
    {"name": "scale$ebnf$1$subexpression$1$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "scale$ebnf$1$subexpression$1", "symbols": ["x", {"literal":","}, "y", "scale$ebnf$1$subexpression$1$string$1"]},
    {"name": "scale$ebnf$1", "symbols": ["scale$ebnf$1$subexpression$1"]},
    {"name": "scale$ebnf$1$subexpression$2$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "scale$ebnf$1$subexpression$2", "symbols": ["x", {"literal":","}, "y", "scale$ebnf$1$subexpression$2$string$1"]},
    {"name": "scale$ebnf$1", "symbols": ["scale$ebnf$1", "scale$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "scale", "symbols": ["scale$ebnf$1"]},
    {"name": "rotate$ebnf$1$subexpression$1$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "rotate$ebnf$1$subexpression$1", "symbols": ["x", "rotate$ebnf$1$subexpression$1$string$1"]},
    {"name": "rotate$ebnf$1", "symbols": ["rotate$ebnf$1$subexpression$1"]},
    {"name": "rotate$ebnf$1$subexpression$2$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "rotate$ebnf$1$subexpression$2", "symbols": ["x", "rotate$ebnf$1$subexpression$2$string$1"]},
    {"name": "rotate$ebnf$1", "symbols": ["rotate$ebnf$1", "rotate$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "rotate", "symbols": ["rotate$ebnf$1"]},
    {"name": "components$ebnf$1$subexpression$1$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "components$ebnf$1$subexpression$1", "symbols": ["component", "components$ebnf$1$subexpression$1$string$1"]},
    {"name": "components$ebnf$1", "symbols": ["components$ebnf$1$subexpression$1"]},
    {"name": "components$ebnf$1$subexpression$2$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "components$ebnf$1$subexpression$2", "symbols": ["component", "components$ebnf$1$subexpression$2$string$1"]},
    {"name": "components$ebnf$1", "symbols": ["components$ebnf$1", "components$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "components", "symbols": ["components$ebnf$1"]},
    {"name": "component", "symbols": ["component_name", "component_pairs"]},
    {"name": "component_name$string$1", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "component_name", "symbols": ["name", "component_name$string$1"]},
    {"name": "component_pairs$ebnf$1$subexpression$1", "symbols": ["key", {"literal":"="}, "value"]},
    {"name": "component_pairs$ebnf$1", "symbols": ["component_pairs$ebnf$1$subexpression$1"]},
    {"name": "component_pairs$ebnf$1$subexpression$2", "symbols": ["key", {"literal":"="}, "value"]},
    {"name": "component_pairs$ebnf$1", "symbols": ["component_pairs$ebnf$1", "component_pairs$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "component_pairs", "symbols": ["component_pairs$ebnf$1"]}
]
  , ParserStart: "line"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
