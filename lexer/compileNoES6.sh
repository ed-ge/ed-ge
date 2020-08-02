nearleyc ./lexer/objectLexer.ne -o ./lexer/objectCommonGrammar.js
sed -i -e 's@import moo from "../lib/moo.js";@const moo=require("../lib/moo.js");@' ./lexer/objectCommonGrammar.js
nearleyc ./lexer/sceneLexer.ne -o ./lexer/sceneCommonGrammar.js
sed -i -e 's@import moo from "../lib/moo.js";@const moo=require("../lib/moo.js");@' ./lexer/sceneCommonGrammar.js
