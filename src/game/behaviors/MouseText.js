import Base from "../../engine/Base.js"


export default class MouseText extends Base.Behavior {
    
    start() {
        this.text = this.gameObject.getComponent("TextComponent")

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

        str += Base.Input.mousePosition.x + " " + Base.Input.mousePosition.y + " ";

        str += Base.Input.getMouseScrollWheel();


        this.text.text = str;

    }

}