@include "./objectLexer.ne"

Scene -> _ SceneName _ NewLine NewLine Objects {% d=> {return{name:d[0], objects: d[3]}}%}
Objects -> Object (  NewLine NewLine  Object ):* {% getObjects %}

SceneName -> Word {% id %}

@{%

function getObjects(d){
    let toReturn = []
    toReturn.push(d[0])
    for(let i = 0; i < d[1].length; i++)
    {
        console.log(JSON.stringify(d[1], null, 2));
        let object = d[1][i];
        toReturn.push(object[2]);
    }
    return toReturn;
}

%}