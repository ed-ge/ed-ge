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
      str += "Touch Start:" + JSON.stringify(Base.Input.getTouchesStart()) + " "
    if (Base.Input.getTouchesEnd().length > 0)
      str += "Touch End:" + JSON.stringify(Base.Input.getTouchesEnd()) + " "
    if (Base.Input.getTouchPositions().length > 0)
      str += JSON.stringify(Base.Input.getTouchPositions()) + " "
    if (Base.Input.getTouchMove().length > 0)
      str += JSON.stringify(Base.Input.getTouchMove()) + " "
    str += JSON.stringify(Base.Input.getTouchesFull()) + " "


    this.text.text = str;

  }

}