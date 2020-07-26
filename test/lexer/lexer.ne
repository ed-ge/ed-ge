@{%
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
%}

@lexer lexer

Grammar -> Object {% id %}
Object -> MainLine TransformLines ComponentLines {% d=>Object.assign(Object.assign(d[0],d[1]), d[2]) %}  

MainLine -> Name __ Prefab  (__ "|" _ Layer ):? _ {%d=>{return{name:d[0], prefab:d[2], layer:d[3]?d[3][3]:"default"}}%}
TransformLines ->  ( NewLine Transforms ):? {%d=>{return{transforms:d[0]?d[0][1]:{translate:{x:0,y:0},scale:{x:1,y:1},rotation:0}}}%}
ComponentLines -> ( NewLine Components ):* {%d=>{return{components:d[0]?d[0][1]:[]}}%}

Transforms -> Translation ( NewLine SecondTransforms ):?   {% d=> {return {translate: d[0], scale:d[1]?d[1][1].scale:{x:1,y:1}, rotation:d[1]?d[1][1].rotation:0}}%}
Name -> Word    {% id %}
Prefab -> Word  {% id %}
Layer -> Word   {% id %}

SecondTransforms -> Scale ( NewLine Rotation ):?          {% d=> {return {scale: d[0], rotation:d[1]?d[1][1]:0}}%}
Rotation -> Float                                     {% id %}

Translation -> Point  {% id %}
Scale -> Point        {% id %}


Point -> Float _ "," _ Float {% d => { return {x:d[0],y:d[4]}}%}

Float -> %float {% getValue %}
Word -> %word {% getValue %}


Components -> ComponentName _ ( NewLine _ "-" _ ComponentKeyValue _ ):*  (NewLine Components):* {%d=>{return [{name:d[0]}] }%}
ComponentName->Word {% id %}
ComponentKeyValue -> Word _ "=" _ %string _




NewLine -> %newline {% ignore %}
_  -> wschar:* {% ignore %}
__ -> wschar:+ {% ignore %}
wschar -> %wschar {% id %}

@{%

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

%}