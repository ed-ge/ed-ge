import fs from "fs";
import path from "path";
import recursive from "recursive-readdir";


let srcPath = "src";
let testRoot = "./test/mocha";

recursive(srcPath, function (err, files) {
  // `files` is an array of file paths
  files.forEach(f=>console.log(path.join(testRoot, f.substr(srcPath.length))));
  
});

