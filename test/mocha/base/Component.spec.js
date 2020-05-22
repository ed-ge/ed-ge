import chai from "chai";
const should = chai.should();
const  assert  = chai.assert;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import Component from "../../../src/base/Component.js";

describe("Base", function () {
  describe("Component", function () {
    let component = new Component();
    describe("constructor", function () {
      it("Generates a uuid", () => component.uuid.should.not.be.undefined)
      it("Generates a type", () => component.type.should.not.be.undefined)
      it("Generates a null reference to gameObject", () => should.equal(component.gameObject, null))
    });
    describe("uuid generation", function () {
      it("Generates a valid uuid", function(){
        let uuid = component.uuid;
        //From https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
        let match = uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
        match.should.not.be.undefined;
      })
      it("Generates unique uuids", function(){
        let uuids = []
        let count = 1000;
        //Create a array of uuids from new components of length count
        Array.from({length: count}, (x,i) => uuids.push(new Component().uuid));
        
        //Remove any duplicates
        let distinct = [...new Set(uuids)]

        //If the length is the same, then there were no duplicates
        assert.equal(distinct.length, count);
      })
    });
  });
});
