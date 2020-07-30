#convenience script. Meant to be run from the root directory
#i.e., ./lexer/compileAndCopy.sh
#copies the compiled parsers into the src directory
cd lexer
./compile.sh
cd ..
cp ./lexer/objectGrammar.js ./src/
cp ./lexer/sceneGrammar.js ./src/