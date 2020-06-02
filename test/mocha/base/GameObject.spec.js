
import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import GameObject from "../../../src/base/GameObject.js";
import Point from "../../../src/base/Point.js";

describe("Base", function () {
  this.timeout(0);
  describe("GameObject.js", function () {
    describe("constructor", function(){
      it("Has defaults if there are no arguments", function(){
        let gameObject = new GameObject();
        expect(gameObject.x).to.equal(0);
        expect(gameObject.y).to.equal(0);
        expect(gameObject.scaleX).to.equal(1);
        expect(gameObject.scaleY).to.equal(1);
        expect(gameObject.rotation).to.equal(0);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array');
        expect(gameObject.components.length).to.equal(0);
      })
      it("Has defaults if there is one arguments", function(){
        let gameObject = new GameObject(27);
        expect(gameObject.x).to.equal(27);
        expect(gameObject.y).to.equal(0);
        expect(gameObject.scaleX).to.equal(1);
        expect(gameObject.scaleY).to.equal(1);
        expect(gameObject.rotation).to.equal(0);
        expect(gameObject.prefabName).to.equal("");        
        expect(gameObject.components).to.be.an('array');
        expect(gameObject.components.length).to.equal(0);
      })
      it("Has defaults if there are two arguments", function(){
        let gameObject = new GameObject(12, 33.4);
        expect(gameObject.x).to.equal(12);
        expect(gameObject.y).to.equal(33.4);
        expect(gameObject.scaleX).to.equal(1);
        expect(gameObject.scaleY).to.equal(1);
        expect(gameObject.rotation).to.equal(0);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array');
        expect(gameObject.components.length).to.equal(0);
      })
      it("Has defaults if there are three arguments", function(){
        let gameObject = new GameObject(-10, 44, 2);
        expect(gameObject.x).to.equal(-10);
        expect(gameObject.y).to.equal(44);
        expect(gameObject.scaleX).to.equal(2);
        expect(gameObject.scaleY).to.equal(1);
        expect(gameObject.rotation).to.equal(0);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array');
        expect(gameObject.components.length).to.equal(0);
      })
      it("Has defaults if there are four arguments", function(){
        let gameObject = new GameObject(.1, -.2, 4, 6);
        expect(gameObject.x).to.equal(.1);
        expect(gameObject.y).to.equal(-.2);
        expect(gameObject.scaleX).to.equal(4);
        expect(gameObject.scaleY).to.equal(6);
        expect(gameObject.rotation).to.equal(0);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array');
        expect(gameObject.components.length).to.equal(0);
      })
      it("Has defaults if there are five arguments", function(){
        let gameObject = new GameObject(.1, -.2, 4, 6, 1);
        expect(gameObject.x).to.equal(.1);
        expect(gameObject.y).to.equal(-.2);
        expect(gameObject.scaleX).to.equal(4);
        expect(gameObject.scaleY).to.equal(6);
        expect(gameObject.rotation).to.equal(1);
        expect(gameObject.prefabName).to.equal("");
        expect(gameObject.components).to.be.an('array');
        expect(gameObject.components.length).to.equal(0);
      })
      it("Correctly handles six arguments", function(){
        let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
        expect(gameObject.x).to.equal(-34.6);
        expect(gameObject.y).to.equal(99.8);
        expect(gameObject.scaleX).to.equal(-2);
        expect(gameObject.scaleY).to.equal(-3);
        expect(gameObject.rotation).to.equal(10);
        expect(gameObject.prefabName).to.equal("name");
        expect(gameObject.components).to.be.an('array');
        expect(gameObject.components.length).to.equal(0);
      })
    })
    describe("location", function(){
      it("Gets the local x and y location", function(){
        let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
        let location = gameObject.location;
        expect(location.x).to.equal(-34.6);
        expect(location.y).to.equal(99.8);
      })
      it("Does not allow you to set the location", function(){
        let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
        expect(()=>gameObject.location = new  Point(0,0)).to.throw();       
      })
    })
    describe("worldLocation", function(){
      it("Gets the world location", function(){
        let gameObjectParent = new GameObject(10, 10);
        let gameObjectChild = new GameObject(10, 10);
        gameObjectParent.children.push(gameObjectChild);
        gameObjectChild.parent = gameObjectParent;

        let worldLocationParent = gameObjectParent.worldLocation;
        let worldLocationChild = gameObjectChild.worldLocation;
        expect(worldLocationParent.x).to.equal(10);
        expect(worldLocationParent.y).to.equal(10);
        expect(worldLocationChild.x).to.equal(20);
        expect(worldLocationChild.y).to.equal(20);


      })
      it("Does not let you set the worldLocation", function(){
        let gameObject = new GameObject(-34.6, 99.8, -2, -3, 10, "name");
        expect(()=>gameObject.worldLocation = new  Point(0,0)).to.throw();   
      })

    })

  });
});
