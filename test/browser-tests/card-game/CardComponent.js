import Base from "../../../src/Base.js"
export default class CardComponent extends Base.Behavior{
  start(){
    this.value = {};
    this.setup = false;
    
  }
 
  update(){
    if(this.value != {} && !this.setup)
    {
      let topText = Base.Serializer.instantiate(Base.Prefabs.Text, this.$go);
      topText.$("TextComponent").text = JSON.stringify(this.value.name);
      topText.$("TextComponent").font = "15pt Times"
      topText.x = -40;
      topText.y = -30;

      let bottomText = Base.Serializer.instantiate(Base.Prefabs.Text, this.$go);
      bottomText.$("TextComponent").text = JSON.stringify(this.value.name);
      bottomText.$("TextComponent").font = "15pt Times"
      bottomText.x = 20;
      bottomText.y = 40;


      this.gameObject.getComponent("TextComponent").text = JSON.stringify(this.value.name);

      
      this.setup = true;
    }
    
  }

}