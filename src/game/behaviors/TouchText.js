import Base from "../../engine/Base.js"


export default class TouchText extends Base.Behavior {

  start() {
    this.text = this.gameObject.getComponent("TextComponent")
    this.text.font = "20px sans"

  }
  update() {
    this.text.text = "Hello, World";

    let str = "";
    if (Base.Input.getTouchesStart().length > 0)
      str += JSON.stringify(Base.Input.getTouchesStartSimple()) + " "
    if (Base.Input.getTouchesEndSimple().length > 0)
      str += JSON.stringify(Base.Input.getTouchesEndSimple()) + " "
    if (Base.Input.getTouchPositionsSimple().length > 0)
      str += JSON.stringify(Base.Input.getTouchPositionsSimple()) + " "
    if (Base.Input.getTouchPositionDeltasSimple().length > 0)
      str += JSON.stringify(Base.Input.getTouchPositionDeltasSimple()) + " "
    str += JSON.stringify(Base.Input.getTouchesSimple()) + " "


    this.text.text = str;

  }

}