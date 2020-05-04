import Base from '../rollup/Base.js'
import GameObject from '../src/engine/base/GameObject.js';




describe('Base', function(){
  describe('Component', function(){
    describe('serialize', function(){
      it('should return a string in the correct DSL', function(){
        let component = new Base.Component();
        let string = component.serialize();
        chai.expect(string).to.equal("Component|type|Component");
      });
      it('should return a string in the correct DSL for AABB', function(){
        let component = new Base.Components.AABBCollider();
        let string = component.serialize();
        chai.expect(string).to.equal("AABBCollider|type|AABBCollider|width|100|height|100");
      });
      it('should return a string in the correct DSL for TextComponent', function(){
        let component = new Base.Components.TextComponent();
        let string = component.serialize();
        chai.expect(string).to.equal("TextComponent|type|TextComponent|text|[Blank]|font|10pt Sans|fill|black");
      });

    })
    describe('deserialize', function(){
      it('should deseralize a componnt', function(){
        let component = new Base.Component().fromString("AABBCollider|type|AABBCollider|width|100|height|100");
        
      })
    })
  })
})

describe('GameObject', function(){
  describe('serialize', function(){
    it('should return a string in the correct DSL', function(){
      let gameObject = new Base.Prefabs.EmptyGameObject();
      let string = gameObject.serialize();
      console.log(string);
      chai.expect(string).to.equal("");
    });

  })
})
