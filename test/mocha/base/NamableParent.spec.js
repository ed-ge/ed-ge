
import chai from "chai";
const expect = chai.expect;
import sinon from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai);

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import NameableParent from "../../../src/base/NamableParent.js";
import GameObject from "../../../src/base/GameObject.js";
import Component from "../../../src/base/Component.js";

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
      it("Throws an error on mismatched arguments", function () {
        let np = new NameableParent();
        let go = new GameObject();
        delete go.parent;
        expect(()=>np.addChild()).to.throw();
        expect(()=>np.addChild(1)).to.throw();
        expect(()=>np.addChild(go)).to.throw();
        expect(()=>np.addChild(go,1)).to.throw();
      })
      it("Has an addChild method", function(){
        expect(new NameableParent()).to.respondTo("addChild");
      })
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
        expect(nameableParent.children).to.be.an('array').with.a.lengthOf(1);
        nameableParent.addChild(child);
        expect(nameableParent.children).to.be.an('array').with.a.lengthOf(1);
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
      it("Throws an error on mismatched arguments", function () {
        let np = new NameableParent();
        let go = new GameObject();
        expect(()=>np.destroy()).to.throw();
        expect(()=>np.destroy(1)).to.throw();
        expect(()=>np.destroy(go,1)).to.throw();
      })
      it("Destroys an object at the root", function(){
        let np = new NameableParent();
        let go = new GameObject();
        np.addChild(go);
        expect(np.children).to.be.of.length(1).and.include(go);
        np.destroy(go);
        expect(np.children).to.be.empty;
      })
      it("Destroys and calls onDestroy", function(){
        let np = new NameableParent();
        let go = new GameObject();
        let co = new Component();
        co.onDestroy = sinon.fake();
        go.addComponent(co);
        np.addChild(go);
        np.destroy(go);
        expect(co.onDestroy).to.have.been.calledOnce;
      })
      it("Destroys an object deeper than the root", function(){
        let np = new NameableParent();
        let go = new GameObject();
        let go2 = new GameObject();
        np.addChild(go);
        go.addChild(go2);
        expect(np.children).to.be.of.length(1).and.include(go);
        expect(go.children).to.be.of.length(1).and.include(go2);
        np.destroy(go2);
        expect(np.children).to.be.of.length(1).and.include(go);
        expect(go.children).to.be.empty;
      })
      it("Doesn't change when a non-included object is passed", function(){
        let np = new NameableParent();
        let go = new GameObject();
        let go2 = new GameObject();
        let go3 = new GameObject();
        np.addChild(go);
        go.addChild(go2);
        expect(np.children).to.be.of.length(1).and.include(go);
        expect(go.children).to.be.of.length(1).and.include(go2);
        np.destroy(go3);
        expect(np.children).to.be.of.length(1).and.include(go);
        expect(go.children).to.be.of.length(1).and.include(go2);
      })
    })
    describe("isADescendant function", function(){
      it("Throws an error on mismatched arguments", function(){
        let np = new NameableParent();
        expect(()=>np.isADescendant()).to.throw();
        expect(()=>np.isADescendant(np,1)).to.throw();
      })
      it("Returns true for descendants", function(){
        let np = new NameableParent();
        let child = new NameableParent();
        let grandchild = new NameableParent();
        np.addChild(child);
        child.addChild(grandchild);
        expect(np.isADescendant(child)).to.be.true;
        expect(np.isADescendant(grandchild)).to.be.true;
        expect(child.isADescendant(grandchild)).to.be.true;
      })
      it("Returns false for non-descendants", function(){
        let np = new NameableParent();
        let child = new NameableParent();
        let grandchild = new NameableParent();
        np.addChild(child);
        child.addChild(grandchild);
        expect(grandchild.isADescendant(child)).to.be.false;
        expect(grandchild.isADescendant(np)).to.be.false;
        expect(child.isADescendant(np)).to.be.false;
      })
    })
    describe("findByName method", function(){
      it("Throws an error on mismatched arguments", function () {
        let np = new NameableParent();
        expect(()=>np.findByName()).to.throw();
        expect(()=>np.findByName(1)).to.throw();
        expect(()=>np.findByName("hello",1)).to.throw();
      })
      it("Finds an immediate ancestor by name", function(){
        let np = new NameableParent();
        let go = new GameObject();
        np.addChild(go);
        go.name = "Bob";
        let found = np.findByName("Bob");
        expect(found).to.equal(go);
      })
      it("Finds a deep ancestor by name", function(){
        let np = new NameableParent();
        let go = new GameObject();
        let go2 = new GameObject();
        np.addChild(go);
        go.addChild(go2)
        go.name = "Bob";
        go2.name = "Alice";
        let found = np.findByName("Alice");
        expect(found).to.equal(go2);
      })
      it("Fails to find a non-ancestor", function(){
        let np = new NameableParent();
        let go = new GameObject();
        go.name = "Bob";
        let go2 = new GameObject();
        go2.name = "Alice";
        let found = np.findByName("Eve");
        expect(found).to.be.null;
      })
      
    })
    describe("findByUUID", function(){
      it("Throws an error on mismatched arguments", function () {
        let np = new NameableParent();
        expect(()=>np.findByUUID()).to.throw();
        expect(()=>np.findByUUID(1)).to.throw();
        expect(()=>np.findByUUID("hello",1)).to.throw();
      })
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
    describe("uuidv4", function(){
      it("Throws an error on mismatched arguments", function () {
        let np = new NameableParent();
        expect(()=>np.uuidv4(1)).to.throw();
      })
      it("Has an uuidv4 method", function(){
        expect(new NameableParent()).to.respondTo("uuidv4");
      })
      describe("uuid generation", function () {
        //Copied from Component.spec.js
        let np = new NameableParent("");
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
