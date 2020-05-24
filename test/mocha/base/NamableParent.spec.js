
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import NameableParent from "../../../src/base/NamableParent.js";

describe("Base", function () {
  describe("NamableParent.js", function () {
    describe("constructor", function(){
      it("Creates a new object with default values", function(){
        let argument = "name";
        let np = new NameableParent(argument);
        expect(np).to.be.not.undefined;
        expect(np).to.be.not.null;
        expect(np).to.be.an('object');
        expect(np.children).to.be.an('array');
        expect(np.children.length).to.equal(0);
        expect(np.name).to.equal(argument);
        expect(np.parent).to.be.null;
        expect(np.uuid).to.be.a('string');
      })
    })
    describe("destroy method", function(){

    })
    describe("findByName method", function(){

    })
    describe("findByUUID", function(){

    })
    describe("uuidv4", function(){

    })
  });
});
