const Base = require("../../../rollup/Base.js")
const chai =require("chai");
const chaiString = require("chai-string");
chai.use(chaiString);
let assert = chai.assert;
let expect = chai.expect;

describe("Component class", function() {
    describe("serialize", function() {
        it("Creates the correct DSL string", function() {
            let component = new Base.Component();
            let string = component.serialize();
            console.log(string)
            expect(string).to.startWith("Component|")
        })

        
    })

    
    
});