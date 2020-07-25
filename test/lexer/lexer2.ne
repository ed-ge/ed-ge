@{%
//Allow use in node and in browser
    import moo from "moo";

const lexer = moo.compile({
  wschar: {match:/[ \t\n\v\f]/, lineBreaks:true},
  word: /[a-zA-Z_][a-zA-_Z0-9]*/,
  });
%}

@lexer lexer

Grammar -> Object
Object -> Name __ Prefab
Name -> %word
Prefab -> %word

_  -> wschar:* {% ignore %}
__ -> wschar:+ {% ignore %}
wschar -> %wschar {% id %}

@{%

//Ignore the input by returning null
function ignore(d){
    return null;
}

%}