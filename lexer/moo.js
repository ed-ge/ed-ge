import moo from "../lib/moo.js";
import fs from "fs";

const lexer = moo.compile({
  componentLine :/=[ \t]*.+[ \t]*$/,
  //string:/"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/, //From: https://github.com/kach/nearley/blob/0ce577b98484a345c67f7f2c62d8ee700ec9d7d7/examples/json.ne#L10
  newline: {match:/\r?\n/, lineBreaks:true},
  wschar: /[ \t\v\f]/,
  float: /[+-]?\d*\.\d+/, 
  int: /\d+/,
  word: /[a-zA-Z_][a-zA-_Z0-9]*/,
  ',':',',
  '|':'|',
  '-':'-',
  '=':'=',
  '{':'{',
  '}':'}',
  });

let s = fs.readFileSync("./test/lexer/objectTests/m.edge", "utf-8");

lexer.reset(s)

let result;
while(result = lexer.next()){
  console.log(result);
}