cd lexer
nearleyc ./lexer.ne -o ./grammar.js
# By default, nearleyc creates a commonjs script. We need to convert it to es6
./convertES6.sh ./grammar.js
cd ..
node ./test/lexer/parse.js