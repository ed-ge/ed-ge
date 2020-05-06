

export default class ClickBehavior extends Base.Behavior {
    start() {
        this.scale = 200;
    
    }
    update() {
      

    }
    onMouseOver(){
        console.log("Mouse Over");
    }
    onMouseDown(){
        console.error("Mouse click");
        this.gameObject.x += (Math.random() * 2 - 1) * this.scale;
        this.gameObject.y += (Math.random() * 2 - 1) * this.scale;

        this.gameObject.x = Math.max(0, Math.min(this.gameObject.x, 1000));
        this.gameObject.y = Math.max(0, Math.min(this.gameObject.y, 1000));
    }

}