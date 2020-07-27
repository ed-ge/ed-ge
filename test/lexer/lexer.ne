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
  '{':'{',
  '}':'}',
  });
%}

@lexer lexer

Grammar -> Object {% id %}
Object -> MainLine TransformLines ComponentLines ChildrenList:? {% topLevel %}  
ChildrenList -> NewLine _ "{" _ NewLine _ Object:+ NewLine _ "}" _ {% d=> {return{children:d[6]}} %}

MainLine -> Name __ Prefab  (__ "|" _ Layer ):? _ {%d=>{return{name:d[0], prefab:d[2], layer:d[3]?d[3][3]:"default"}}%}
TransformLines ->  ( NewLine Transforms ):? {%d=>{return{transforms:d[0]?d[0][1]:{translate:{x:0,y:0},scale:{x:1,y:1},rotation:0}}}%}
ComponentLines -> ( NewLine Components ):* {% getComponents %}

Transforms -> _ Translation ( NewLine SecondTransforms ):?   {% d=> {return {translate: d[1], scale:d[2]?d[2][1].scale:{x:1,y:1}, rotation:d[2]?d[2][1].rotation:0}}%}
Name -> Word    {% id %}
Prefab -> Word  {% id %}
Layer -> Word   {% id %}

SecondTransforms -> _ Scale ( NewLine Rotation ):?          {% d=> {return {scale: d[1], rotation:d[2]?d[2][1]:0}}%}
Rotation -> _ Float                                     {% d=>d[1] %}

Translation ->  Point  {% id %}
Scale -> Point        {% id %}

Components -> _ ComponentName _ ( NewLine _ "-" _ ComponentKeyValue _ ):*   {% getComponentList %}
ComponentName->Word {% id %}
ComponentKeyValue -> Word _ "=" _ String _ {% d => {return {key:d[0], value:d[4]}}%}

Point -> Float _ "," _ Float {% d => { return {x:d[0],y:d[4]}}%}
Float -> %float {% getValue %}
Word -> %word {% getValue %}
String -> %string {% getValue %}

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

%}