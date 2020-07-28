nearleyc ./lexer/lexer.ne -o ./lexer/grammar.js
# By default, nearleyc creates a commonjs script. We need to convert it to es6
sed -i -e 1,3d ./lexer/grammar.js # Remove the first 3 lines
truncate -s -$(tail -6 ./lexer/grammar.js | wc -c) ./lexer/grammar.js # remove the last 6 lines
echo 'export default grammar' >> ./lexer/grammar.js # Append export default 
node ./test/lexer/parse.js