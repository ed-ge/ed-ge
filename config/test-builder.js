import fs from "fs";
import path from "path";
import recursive from "recursive-readdir";


let srcPath = "src";
let testRoot = "./test/mocha";

recursive(srcPath, function (err, files) {
  // `files` is an array of file paths
  files.forEach(f=>
    {
      let index = f.lastIndexOf("\\");
      let className = f.substring(index + 1);
      let filePath =path.join(testRoot, f.substr(srcPath.length));
      filePath = filePath.replace(".js", ".spec.js")
      if(!fs.existsSync("./" + filePath)){
        console.log(filePath);
        let fileContents =
`
import chai from "chai";

import Base from "../../../../src/Base.js"
import Scenes from "../../../game/Scenes.js"
import GameObjects from "../../../game/GameObjects.js"
import GameBehaviors from "../../../game/GameBehaviors.js"

describe("Base", function () {
  describe("${className}", function () {

  });
});
`
fs.writeFileSync(filePath, fileContents);
      }
    });
  
});

