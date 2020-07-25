import nearley from "nearley";
import fs  from "fs";
import grammar from "./grammar.js";

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

let files = fs.readdirSync("./test/lexer").filter(x => x.endsWith(".edge"));
console.log(files);

for (let i = 0; i < 0; i++) {
  let toParse =

    parser.feed(toParse);

  let r = parser.results;

  console.log(JSON.stringify(r, null, 2));
  console.log(parser.results.length + " total way(s) to parse the program.");
}
