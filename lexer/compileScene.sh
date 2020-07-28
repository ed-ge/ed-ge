nearleyc ./sceneLexer.ne -o ./sceneGrammar.js
# By default, nearleyc creates a commonjs script. We need to convert it to es6
./convertES6.sh ./sceneGrammar.js