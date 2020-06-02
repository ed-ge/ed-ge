
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import NameableParent from "../../../src/base/NamableParent.js";
import GameObject from "../../../src/base/GameObject.js";

describe("Base", function () {
  describe("NamableParent.js", function () {
    describe("constructor", function(){
      it("Creates a new object with default values", function(){
        let argument = "name";
        let np = new NameableParent(argument);
        expect(np).to.be.not.undefined;
        expect(np).to.be.not.null;
        expect(np).to.be.an('object');
        expect(np.children).to.be.an('array').that.is.empty;
        expect(np.name).to.equal(argument);
        expect(np.parent).to.be.null;
        expect(np.uuid).to.be.a('string');
      })
    })
    describe("addChild method", function(){
      it("Throws an error if there is no argument", function(){
        expect(()=>new NameableParent().addChild()).to.throw();
      })
      it("Throws an error if the argument doesn't have a parent member variable", function(){
        expect(()=>new NameableParent().addChild({a:"b"})).to.throw();
      })
      it("Doesn't change the list of children if the argument already is in the list of children", function(){
        let nameableParent = new NameableParent();
        let child  = new GameObject();
        expect(nameableParent.children).to.be.an('array').that.is.empty;
        nameableParent.addChild(child);
        expect(nameableParent.children).to.be.an('array').of.length(1);
        nameableParent.addChild(child);
        expect(nameableParent.children).to.be.an('array').of.length(1);
      })
      it("Correctly adds a child", function(){
        let nameableParent = new NameableParent();
        let child  = new GameObject();
        expect(nameableParent.children).to.be.an('array').that.is.empty;
        nameableParent.addChild(child);
        expect(nameableParent.children).to.be.an('array').of.length(1).that.includes(child);
        expect(child.parent).to.equal(nameableParent);
      })
    })
    describe("destroy method", function(){

    })
    describe("findByName method", function(){
      it("Finds the root object by uuid", function(){
        let np = new NameableParent();
        let uuid = np.uuid;
        let found = np.findByUUID(uuid);
        expect(found).to.be.not.undefined;
        expect(found).to.be.not.null;
        expect(found).to.equal(np);
      });
      it("Finds a child object by uuid", function(){
        let np = new NameableParent();
        let npOther = new NameableParent();
        let npChild = new NameableParent();
        let uuid = npChild.uuid;
        np.children.push(npOther);
        np.children.push(npChild);
        let found = np.findByUUID(uuid);
        expect(found).to.be.not.undefined;
        expect(found).to.be.not.null;
        expect(found).to.equal(npChild);
      });
      it("Returns null if there is no match", function(){
        let np = new NameableParent();
        let npOther = new NameableParent();
        let npChild = new NameableParent();
        let uuid = npChild.uuid;
        np.children.push(npOther);
        np.children.push(npChild);
        let found = np.findByUUID("0");
        expect(found).to.be.not.undefined;
        expect(found).to.be.null;
      });
    })
    describe("findByUUID", function(){

    })
    describe("uuidv4", function(){
      describe("uuid generation", function () {
        //Copied from Component.spec.js
        let np = new NameableParent();
        it("Generates a valid uuid", function(){
          let uuid = np.uuid;
          //From https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
          let match = uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
          expect(match).to.not.be.undefined;
        })
        it("Generates unique uuids", function(){
          let uuids = []
          let count = 1000;
          //Create a array of uuids from new components of length count
          Array.from({length: count}, (x,i) => uuids.push(new NameableParent().uuid));
          
          //Remove any duplicates
          let distinct = [...new Set(uuids)]
  
          //If the length is the same, then there were no duplicates
          expect(distinct.length).to.equal(count);
        })
      });

    })
  });
});
