@include "./objectLexer.ne"

Scene -> _ SceneName _ (NewLine NewLine Objects):? {% d=> {return{name:d[1], objects: d[3]? d[3][2]:[]}}%}

SceneName -> Word {% id %}
