import Base from "../../../src/Base.js"


export default class MouseText extends Base.Behavior {
    
    start() {
        this.text = this.gameObject.getComponent("TextComponent")
        this.text.font = "20px sans"

    }
    update() {
        this.text.text = "Hello, World";

        let str = "";

        for (let i = 0; i < 3; i++) {


            if (Base.Input.getMouseButtonUp(i)) {
                str += i+" up just now "
            }
            else if (Base.Input.getMouseButtonDown(i)) {
                str += i+" down just now ";
            }
            else{
                str += i + " not changing ";
            }

            let state = Base.Input.getMouseButton(i)
                str += i + " reports state " + state + " ";
            
        }

        str += Base.Input.getMousePosition().x + " " + Base.Input.getMousePosition().y + " ";
        str += Base.Input.getMousePositionDelta().x + " " + Base.Input.getMousePositionDelta().y + " ";

        str += Base.Input.getMouseScrollWheel();


        this.text.text = str;

    }

}