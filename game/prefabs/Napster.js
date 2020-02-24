import Base from "../../engine/Base.js";
import NapsterBehavior from "../behaviors/NapsterBehavior.js";

export default class Napster extends Base.GameObject{
  constructor() {
    super(120,-30)
    this.addComponent(new NapsterBehavior());
    

  }

}