@{%
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
%}

@lexer lexer

Grammar -> Object {% id %}
Object -> Name __ Prefab  (__ "|" _ Layer ):? _ ( NewLine Transforms ):? {%(args)=>{return{name:args[0], prefab:args[2], layer:args[3]?args[3][3]:"default", transforms:args[4]?args[4][1]:{translate:{x:0,y:0},scale:{x:1,y:1},rotation:0}}}%}

Name -> Word    {% id %}
Prefab -> Word  {% id %}
Layer -> Word   {% id %}

Transforms -> Translation ( NewLine SecondTransforms ):?   {% d=> {return {translate: d[0], scale:d[1]?d[1][1].scale:{x:1,y:1}, rotation:d[1]?d[1][1].rotation:0}}%}
SecondTransforms -> Scale ( NewLine Rotation ):?          {% d=> {return {scale: d[0], rotation:d[1]?d[1][1]:0}}%}
Rotation -> Float                                     {% id %}

Translation -> Point  {% id %}
Scale -> Point        {% id %}

Point -> Float _ "," _ Float {% d => { return {x:d[0],y:d[4]}}%}

Float -> %float {% getValue %}
Word -> %word {% getValue %}

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