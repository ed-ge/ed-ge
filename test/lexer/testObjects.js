import nearley from "nearley";
import fs from "fs";
import grammar from "../../lexer/objectGrammar.js";

console.log("Using " + "../../lexer/objectGrammar.js")
let files = fs.readdirSync("./test/lexer/objectTests").filter(x => x.endsWith(".edge"));
//console.log(files);

for (let i = 0; i < files.length; i++) {
  let file = files[i];
  console.log("Parsing " + file);
  let string = fs.readFileSync(`./test/lexer/objectTests/${file}`, "utf-8");
  let toParse = string;
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(toParse);

  let r = parser.results;

  console.log(JSON.stringify(r, null, 2));
  console.log(parser.results.length + " total way(s) to parse the program.");
  console.log("--- Done with " + file);
}
console.log("All the way done.")
