import Base from "../../../rollup/Base.js"
import chai from "chai";
import chaiString from "chai-string";
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