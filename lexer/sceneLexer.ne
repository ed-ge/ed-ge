@include "./objectLexer.ne"

Everything -> Plugins NewLine NewLine Scene {% d=>{
  return{Plugins:d[0],Scene:d[3]};
  }%}
Plugins -> _ Plugin _ (NewLine Plugin):* {% parsePlugins %}
Plugin -> Word {% id %}
Scene -> SceneName _ (NewLine NewLine Objects):? {% d=> {
  return{name:d[0], objects: d[2]? d[2][2]:[]}
  }%}

SceneName -> Word {% id %}


@{%


function parsePlugins(d){
    let first = d[1];
    let list = d[3];
    if(!list || list.length == 0){
        return [first]
    }else{
        let collect = list.map(x=>x[1]);
        return [first, ...collect];
    }
}

%}