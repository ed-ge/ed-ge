#convenience script. Meant to be run from the root directory
#i.e., ./lexer/compileAndTest.sh
cd lexer
./compile.sh
cd ..
node ./test/lexer/testObjects.js
node ./test/lexer/testScenes.js