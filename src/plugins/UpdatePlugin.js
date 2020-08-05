import Base from "../Base.js"
class UpdatePlugin{
  constructor(){

  }
  update(){
    //Update all the objects
    Base.$$.children.filter(i => i.update).forEach(i => i.update());

  }
}

export default UpdatePlugin;