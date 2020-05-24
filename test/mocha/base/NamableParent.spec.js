
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"

describe("Base", function () {
  describe("NamableParent.js", function () {
    describe("constructor", function(){
      it("Creates a new object with default values", function(){
        let argument = "name";
        let np = new Base.NameableParent(argument);
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
      it("Returns false if the gameObject can't be found", function(){
        let np = new Base.NameableParent("root");
        let result = np.destroy(null);
        expect(result).to.equal(false);
      });
    })
    describe("findByName method", function(){
      it("Finds the root object by name", function(){
        let np = new Base.NameableParent("root");
        let name = "root";
        let found = np.findByName(name);
        expect(found).to.be.not.undefined;
        expect(found).to.be.not.null;
        expect(found).to.equal(np);
      });
      it("Finds a child object by name", function(){
        let np = new Base.NameableParent("root");
        let npOther = new Base.NameableParent("other");
        let npChild = new Base.NameableParent("child");
        let name = "child";
        np.children.push(npOther);
        np.children.push(npChild);
        let found = np.findByName(name);
        expect(found).to.be.not.undefined;
        expect(found).to.be.not.null;
        expect(found).to.equal(npChild);
      });
      it("Returns null if there is no match", function(){
        let np = new Base.NameableParent("root");
        let npOther = new Base.NameableParent("other");
        let npChild = new Base.NameableParent("child");
        np.children.push(npOther);
        np.children.push(npChild);
        let found = np.findByUUID("");
        expect(found).to.be.not.undefined;
        expect(found).to.be.null;
      });
    });
    describe("findByUUID method", function(){
      it("Finds the root object by uuid", function(){
        let np = new Base.NameableParent("root");
        let uuid = np.uuid;
        let found = np.findByUUID(uuid);
        expect(found).to.be.not.undefined;
        expect(found).to.be.not.null;
        expect(found).to.equal(np);
      });
      it("Finds a child object by uuid", function(){
        let np = new Base.NameableParent("root");
        let npOther = new Base.NameableParent("other");
        let npChild = new Base.NameableParent("child");
        let uuid = npChild.uuid;
        np.children.push(npOther);
        np.children.push(npChild);
        let found = np.findByUUID(uuid);
        expect(found).to.be.not.undefined;
        expect(found).to.be.not.null;
        expect(found).to.equal(npChild);
      });
      it("Returns null if there is no match", function(){
        let np = new Base.NameableParent("root");
        let npOther = new Base.NameableParent("other");
        let npChild = new Base.NameableParent("child");
        let uuid = npChild.uuid;
        np.children.push(npOther);
        np.children.push(npChild);
        let found = np.findByUUID("0");
        expect(found).to.be.not.undefined;
        expect(found).to.be.null;
      });
    });
    describe("uuidv4 method", function(){
      describe("uuid generation", function () {
        //Copied from Component.spec.js
        let np = new Base.NameableParent();
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
          Array.from({length: count}, (x,i) => uuids.push(new Base.NameableParent().uuid));
          
          //Remove any duplicates
          let distinct = [...new Set(uuids)]
  
          //If the length is the same, then there were no duplicates
          expect(distinct.length).to.equal(count);
        })
      });
    })
  });
});
