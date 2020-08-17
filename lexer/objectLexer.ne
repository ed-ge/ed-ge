@{%
//Allow use in node and in browser
    import moo from "../lib/lexer/moo.js";

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
%}

@lexer lexer

Objects -> Object ( NewLine NewLine:+ Object):* {% parseObjects %}

Object -> MainLine TransformLines ComponentLines ChildrenList:? {% topLevel %}  

MainLine -> Name __ Prefab  (__ "|" _ Layer ):? _ {%d=>{return{name:d[0], prefab:d[2], layer:d[3]?d[3][3]:"default"}}%}
TransformLines ->  ( NewLine Transforms ):? {%d=>{return{transforms:d[0]?d[0][1]:{translate:{x:0,y:0},scale:{x:1,y:1},rotation:0}}}%}
ComponentLines -> ( NewLine Components ):* {% getComponents %}
ChildrenList -> NewLine  "{" _ NewLine Objects NewLine "}" _ {% d=> {return{children:d[4]}} %}

Name -> Word    {% id %}
Prefab -> Word  {% id %}
Layer -> Word   {% id %}

Transforms -> Translation ( NewLine SecondTransforms ):?   {% d=> {return {translate: d[0], scale:d[1]?d[1][1].scale:{x:1,y:1}, rotation:d[2]?d[2][1].rotation:0}}%}
SecondTransforms ->  Scale ( NewLine Rotation ):?          {% d=> {return {scale: d[0], rotation:d[1]?d[1][1]:0}}%}
Translation ->  Point _ {% id %}

Scale -> Point _       {% id %}

Components ->  ComponentName _ ( NewLine "-" _ ComponentKeyValue):*   {% getComponentList %}
ComponentName->Word {% id %}
ComponentKeyValue -> Word _ ComponentValue {% d => {return {key:d[0], value:d[2]}}%}
ComponentValue -> %componentLine {% handleComponentLine %}

Point -> Number _ "," _ Number {% d => { return {x:d[0],y:d[4]}}%}
Rotation -> Number _                                    {% d=>d[1] %}
Number -> Float {% id %}
Number -> Int {% id %}
Float -> %float {% getValue %}
Int -> %int {% getValue %}
Word -> %word {% getValue %}
String -> %string {% getValue %}

NewLine -> %newline _ {% ignore %}
_  -> wschar:* {% ignore %}
__ -> wschar:+ {% ignore %}
wschar -> %wschar {% id %}

@{%

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
        name:d[0],
        keyValues:[],
    };
    toReturn.push(component)

    for(let i = 0; i < d[2].length; i++){
        let keyValueLine = d[2][i];
        let keyValue = keyValueLine[3];
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