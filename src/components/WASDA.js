import Component from "../base/Component.js"
import Input from "../base/Input.js"
import Time from "../base/Time.js"

class WASDA extends Component {
  constructor() {
    super();
    this.speed = 200;
  }

  update() {
    let gameObject = this.$go;
    if (Input.getKey("a") || Input.getKey("ArrowLeft"))
      gameObject.x -= this.speed * Time.deltaTime;
    if (Input.getKey("d") || Input.getKey("ArrowRight"))
      gameObject.x += this.speed * Time.deltaTime;
    if (Input.getKey("s") || Input.getKey("ArrowDown"))
      gameObject.y += this.speed * Time.deltaTime;
    if (Input.getKey("w") || Input.getKey("ArrowUp"))
      gameObject.y -= this.speed * Time.deltaTime;

  }
}

export default WASDA;