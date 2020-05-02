import sum from './sum.js';
import Base from '../rollup/Base.js'



describe('sum', function () {
  it('should return sum of arguments', function () {
    chai.expect(sum(1, 2)).to.equal(3);
  });
});

describe('Base', function(){
  describe('Component', function(){
    describe('serialize', function(){
      it('should return a string in the correct DSL', function(){
        let component = new Base.Component();
        let string = component.serialize();
        chai.expect(string).to.startsWith("Component");
      })
    })
  })
})