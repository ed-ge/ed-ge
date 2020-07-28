@include "./objectLexer.ne"

Scene -> ( ( NewLine NewLine ):? Object ):+ {% getObjects %}

@{%

function getObjects(d){
    let toReturn = []
    for(let i = 0; i < d[0].length; i++)
    {
        let object = d[0][i];
        toReturn.push(object[1]);
    }
    return toReturn;
}

%}