import chai from "chai";
const expect = chai.expect;

import Base from "../../../src/Base.js"
import Scenes from "../../game/Scenes.js"
import GameObjects from "../../game/GameObjects.js"
import GameBehaviors from "../../game/GameBehaviors.js"
import NameableParent from "../../../src/base/NamableParent.js";
import GameObject from "../../../src/base/GameObject.js";
import Matrix3 from "../../../src/base/Matrix3.js";

describe("Base", function () {
    describe("Matrix3", function () {
        describe("constructor", function () {
            it("Creates an identity matrix", function () {
                let m = new Matrix3();
                expect(m.m11).to.equal(1);
                expect(m.m22).to.equal(1);
                expect(m.m33).to.equal(1);

                expect(m.m12).to.equal(0);
                expect(m.m13).to.equal(0);

                expect(m.m21).to.equal(0);
                expect(m.m23).to.equal(0);

                expect(m.m31).to.equal(0);
                expect(m.m32).to.equal(0);
            })
        })
        describe("at", function () {
            it("Returns the correct values", function () {
                let m = new Matrix3();
                for (let y = 0; y < 3; y++) {

                    for (let x = 0; x < 3; x++) {
                        let value = m.at(x, y);
                        expect(value).to.equal(x == y ? 1 : 0);
                    }
                }
            })
            it("Throws an error on mismatched arguments", function () {
                let m = new Matrix3();
                expect(() => m.at(0)).to.throw();

                expect(() => m.at(0, -1)).to.throw();
                expect(() => m.at(-1, 0)).to.throw();

                expect(() => m.at(0, 3)).to.throw();
                expect(() => m.at(3, 0)).to.throw();

                expect(() => m.at({}, 0)).to.throw();
                expect(() => m.at(0, "hi")).to.throw();

                expect(() => m.at(1, 1, 1)).to.throw();
            })
        })
        describe("sets", function () {
            it("Sets values", function () {
                let m = new Matrix3();
                m.set(0, 0, 3.14);
                expect(m.at(0, 0)).to.equal(3.14);
            })
            it("Throws an error on mismatched arguments", function () {
                let m = new Matrix3();
                expect(() => m.set(0)).to.throw();
                expect(() => m.set(0, 0)).to.throw();
                expect(() => m.set(0, 0, {})).to.throw();

                expect(() => m.set(0, -1)).to.throw();
                expect(() => m.set(-1, 0)).to.throw();

                expect(() => m.set(0, 3)).to.throw();
                expect(() => m.set(3, 0)).to.throw();

                expect(() => m.set({}, 0)).to.throw();
                expect(() => m.set(0, "hi")).to.throw();

                expect(() => m.set(0, 0, 3.14, 0)).to.throw();
            })
        })
        describe("mult", function () {


        })
        describe("multPoint", function () {
            it("Doesn't change the point with an identity matrix", function(){
                let m = new Matrix3();
                let point = new Base.Point(1,2);
                let p2 = m.multPoint(point);
                expect(p2).to.be.an.instanceOf(Base.Point).and.to.include({x:1,y:2})
            })
            it("Multiplies appropriately", function(){
                let m = new Matrix3();
                m.set(0,0,1);
                m.set(1,0,2);
                m.set(2,0,3);

                m.set(0,1,4);
                m.set(1,1,5);
                m.set(2,1,6);

                m.set(0,2,7);
                m.set(1,2,8);
                m.set(2,2,9);

                let p = new Base.Point(10, 11);
                let p2 = m.multPoint(p);
                expect(p2).to.be.an.instanceOf(Base.Point).and.to.include({x:(35/167),y:(101/167)});

            })

        })
        describe("multiMatrix3", function () {
            it("Multiplies identity matrices", function () {
                let m = new Matrix3();
                let m2 = new Matrix3();
                let m3 = m.multMatrix3(m2);
                let e = new Matrix3();
                expect(m3.equals(e)).to.be.true;
            })
            it("Multiplies other matrices", function () {
                let m = new Matrix3();
                m.set(0,0,1);
                m.set(1,0,2);
                m.set(2,0,3);

                m.set(0,1,4);
                m.set(1,1,5);
                m.set(2,1,6);

                m.set(0,2,7);
                m.set(1,2,8);
                m.set(2,2,9);

                let m2 = new Matrix3();

                m2.set(0,0,10);
                m2.set(1,0,11);
                m2.set(2,0,12);

                m2.set(0,1,13);
                m2.set(1,1,14);
                m2.set(2,1,15);

                m2.set(0,2,16);
                m2.set(1,2,17);
                m2.set(2,2,18);


                let m3 = m.multMatrix3(m2);
                let e = new Matrix3();

                e.set(0,0,84);
                e.set(1,0,90);
                e.set(2,0,96);

                e.set(0,1,201);
                e.set(1,1,216);
                e.set(2,1,231);

                e.set(0,2,318);
                e.set(1,2,342);
                e.set(2,2,366);

                expect(m3.equals(e)).to.be.true;
            })

        })
        describe("equals", function () {
            it("Returns true for equal matrices", function () {
                let m = new Matrix3();
                let m2 = new Matrix3();
                expect(m.equals(m2)).to.be.true;
            })
            it("Returns false for unequal matrices", function () {
                let m = new Matrix3();
                let m2 = new Matrix3();
                m2.set(0, 0, 3.14)
                expect(m.equals(m2)).to.be.false;
            })
            it("Throws an error on mismatched arguments", function () {
                let m = new Matrix3();
                let m2 = new Matrix3();
                expect(() => m.equals()).to.throw();
                expect(() => m.equals({})).to.throw();
                expect(() => m.equals(m2, m2)).to.throw();
            })
        })
        describe("from", function () {
            it("Throws an error on mismatched arguments", function () {
                let m = new Matrix3();
                expect(() => m.from()).to.throw();
                expect(() => m.from(0)).to.throw();
                expect(() => m.from(0, 0)).to.throw();
                expect(() => m.from(0, 0, 1)).to.throw();
                expect(() => m.from(0, 0, 1, 1)).to.throw();
                expect(() => m.from(0, 0, 1, 1, 0, 1)).to.throw();
                expect(() => m.from("hi", 0, 1, 1, 0, 1)).to.throw();
            })
            it("Doesn't change an identity matrix with basic arguments", function () {
                let m = new Matrix3();
                m.from(0, 0, 1, 1, 0);
                expect(m.equals(new Matrix3())).to.be.true;
            })
            it("Sets translation values", function () {
                let m = new Matrix3();
                m.from(-3, 19, 1, 1, 0);
                let e = new Matrix3();
                e.set(2, 0, -3);
                e.set(2, 1, 19);
                expect(m.equals(e)).to.be.true;
            })
            it("Sets rotation values", function () {
                let m = new Matrix3();
                m.from(0, 0, 1, 1, Math.PI / 4);
                let e = new Matrix3();
                e.set(0, 0, Math.cos(Math.PI / 4));
                e.set(1, 1, Math.cos(Math.PI / 4));
                e.set(1, 0, -Math.sin(Math.PI / 4));
                e.set(0, 1, Math.sin(Math.PI / 4));

                expect(m.equals(e)).to.be.true;
            })
            it("Sets scale values", function () {
                let m = new Matrix3();
                m.from(0, 0, 2, 3, 0);
                let e = new Matrix3();
                e.set(0, 0, 2);
                e.set(1, 1, 3);

                expect(m.equals(e)).to.be.true;
            })
            it("Sets all values", function () {
                let m = new Matrix3();
                m.from(1, 2, 3, 4, Math.PI / 5);
                let e = new Matrix3();
                e.set(2, 0, 1);
                e.set(2, 1, 2);

                e.set(0, 0, Math.cos(Math.PI / 5));
                e.set(1, 1, Math.cos(Math.PI / 5));
                e.set(1, 0, -Math.sin(Math.PI / 5));
                e.set(0, 1, Math.sin(Math.PI / 5));

                e.set(0, 0, e.at(0, 0) * 3);
                e.set(0, 1, e.at(0, 1) * 3);
                e.set(1, 0, e.at(1, 0) * 4);
                e.set(1, 1, e.at(1, 1) * 4);

                expect(m.equals(e)).to.be.true;
            })

        })
        describe("Getter and setter transformations", function () {
            describe("translation", function () {
                it("Throws an error on mismatched arguments", function () {
                    let m = new Matrix3();
                    expect(() => m.translation = 1).to.throw();
                })
                it("Gets the translation", function () {
                    let m = new Matrix3();
                    //From https://github.com/chaijs/chai/issues/193#issuecomment-179264057
                    expect(m.translation).to.be.an.instanceOf(Base.Point).and.to.include({ x: 0, y: 0 })
                })
                it("Sets the translation", function () {
                    let m = new Matrix3();
                    m.translation = new Base.Point(10, -10);
                    expect(m.translation).to.be.an.instanceOf(Base.Point).and.to.include({ x: 10, y: -10 });
                })
            })
            describe("scale", function () {
                it("Throws an error on mismatched arguments", function () {
                    let m = new Matrix3();
                    expect(() => m.scale = 1).to.throw();
                })
                it("Gets the scale", function () {
                    let m = new Matrix3();
                    expect(m.scale).to.be.instanceOf(Base.Point).and.to.include({ x: 1, y: 1 })
                })
                it("Sets the scale", function () {
                    let m = new Matrix3();
                    m.scale = new Base.Point(2, 3);
                    expect(m.scale).to.be.instanceOf(Base.Point).and.to.include({ x: 2, y: 3 });
                })
            })
            describe("rotation", function () {
                it("Throws an error on mismatched arguments", function () {
                    let m = new Matrix3();
                    expect(() => m.rotation = {}).to.throw();
                })
                it("Gets the rotation", function () {
                    let m = new Matrix3();
                    expect(m.rotation).to.equal(0);
                })
                it("Sets the rotation", function () {
                    let m = new Matrix3();
                    m.rotation = Math.PI / 4;
                    expect(m.rotation).to.equal(Math.PI / 4);
                })
            })
        })
        describe("Setter combinations", function(){
            it("Handles multiple changes", function(){
                let m = new Matrix3();
                m.translation = new Base.Point(1, 2);
                m.scale = new Base.Point(3,4);
                m.rotation = Math.PI/5;

                expect(m.translation).to.be.an.instanceOf(Base.Point).and.to.include({x:1, y:2});
                expect(m.scale).to.be.an.instanceOf(Base.Point).and.to.include({x:3, y:4});
                expect(m.rotation).to.equal(Math.PI/5)
            })
            it("Handles multiple changes in a different order", function(){
                let m = new Matrix3();
                m.rotation = Math.PI/5;
                m.translation = new Base.Point(1, 2);
                m.scale = new Base.Point(3,4);

                expect(m.translation).to.be.an.instanceOf(Base.Point).and.to.include({x:1, y:2});
                expect(m.scale).to.be.an.instanceOf(Base.Point).and.to.include({x:3, y:4});
                expect(m.rotation).to.equal(Math.PI/5)
            })
            it("Handles changes on changes", function(){
                let m = new Matrix3();
                m.rotation = Math.PI/5;
                m.translation = new Base.Point(1, 2);
                m.scale = new Base.Point(3,4);
                m.rotation = Math.PI
                m.scale = new Base.Point(6,7)
                m.translation = new Base.Point(8,9)

                expect(m.translation).to.be.an.instanceOf(Base.Point).and.to.include({x:8, y:9});
                expect(m.scale).to.be.an.instanceOf(Base.Point).and.to.include({x:6, y:7});
                expect(m.rotation).to.equal(Math.PI)
            })
        })

    })
})