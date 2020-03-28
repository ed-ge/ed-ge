class BackToStartSceneBehavior extends Base.Behavior {
    
  start() {
      

  }
  update() {
      if(Input.getKeyUp("Escape")){
          SceneManager.currentScene = "StartScene";
      }
      
  }
 
}

class CameraMover extends Base.Behavior {
  time = 0;
  position = 0;
  speed = 1;
  goingUp = true;
  x
  y
  start() {
      //this.gameObject.x = 0;
      this.x = this.gameObject.x;
      this.y = this.gameObject.y;
  }
  update() {
      //let CameraComponent = this.gameObject.getComponent(Components.CameraComponent);
      this.time += .1;
      if (this.goingUp) {
          this.position -= this.speed;
      }
      else {
          this.position += this.speed;
      }

      if (this.position < -100) {
          this.goingUp = false;
      }
      if (this.position > 100) {
          this.goingUp = true;
      }
      
      this.gameObject.x = this.x + this.position; 
      this.gameObject.y = this.y + Math.sin(this.time / 25) * 50;
      this.gameObject.scaleX = Math.abs(this.position)/100+1;
      this.gameObject.scaleY = Math.abs(this.position)/100+1;
  }
}

class CircleBehavior extends Base.Behavior{
  time = 0;
  position = 0;
  speed = 5;
  goingLeft = true;
  start(){
      this.gameObject.x = 0;
  }
  update(){
      this.time += 1;
      if(this.goingLeft){
          this.position -= this.speed;
      }
      else{
          this.position += this.speed;
      }

      if(this.position < 0){
          this.goingLeft = false;
      }
      if(this.position > 100){
          this.goingLeft = true;
      }

      //this.gameObject.x = this.position;
      this.gameObject.x = Math.sin(this.time/25)*50+50;
  }
}

class ClickBehavior extends Base.Behavior {
  scale = 200;
 start() {
  
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

class CollisionCircleBehavior extends Base.Behavior {
    
  start() {
      console.log("Collision circle started");

  }
  update() {

      
  }
  
}


class CountDownTimer extends Base.Behavior {
  time = 10;
  toSceneText = "SceneTwoB";

  start() {

  }
  update() {
      this.time -= .1;

      this.gameObject.getComponent(Components.TextComponent).text = this.time;
      if(this.time <= 0){
          SceneManager.currentScene = this.toSceneText;
      }


  }
}

class DotBehavior extends Base.Behavior {

  start() {
      console.log("Dot started");

  }
  update() {

  }
  onCollisionEnter(otherGameObject) {
      //console.log("in collision");
  }

  onCollisionStay(collisionObject) {

      if (collisionObject.gameObject.name == "CollisionCircle") {

          SceneManager.destroy(collisionObject.gameObject);
          SceneManager.instantiate(CollisionCircle, new Point(Math.random() * 400, Math.random() * 400), new Point(1,1),0);
          
      }
      else if (collisionObject.gameObject.name == "Rectangle") {

          SceneManager.destroy(collisionObject.gameObject);
          let circle = SceneManager.instantiate(Rectangle, new Point(Math.random() * 400, Math.random() * 400), new Point(1,1), 0);
          circle.scaleX = Math.random() + 1;
          circle.scaleY = Math.random() + 1;
          
      }
      
  }
}

class MouseText extends Base.Behavior {
  text;
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

      str += Input.mousePosition.x + " " + Input.mousePosition.y + " ";

      str += Input.getMouseScrollWheel();


      this.text.text = str;

  }

}

class MovementBehavior extends Base.Behavior {
  speed = 5;
  start() {

  }
  update() {
      
      if (Input.keys['ArrowUp']) {
          this.gameObject.y -= this.speed
      }
      if( Input.keys['ArrowDown']) {
          this.gameObject.y += this.speed
      }
      if (Input.keys['ArrowLeft']) {
          this.gameObject.x -= this.speed
      }
      if( Input.keys['ArrowRight']) {
          this.gameObject.x += this.speed
      }

  }
}

class NapsterBehavior extends Base.Behavior {
  peons = []
  characterX = 0;
  characterY = 0;
  strategyCharacter = {};
  marginX = 100;
  marginY = 100;
  tilesWide = 8;
  tilesHigh = 5;
  
  start() {



    for (let y = 0; y < this.tilesHigh; y++) {
      this.peons.push([]);
      for (let x = 0; x < this.tilesWide; x++) {
        let _x = x * 100 + this.marginX;
        let _y = y * 100 + this.marginY;
        let tile = SceneManager.instantiate(Tile, new Base.Point(_x, _y), new Point(1,1), 0);
        this.gameObject.children.push(tile);
        this.peons[y].push(tile);

        //Randomly assign water
        let waterBehavior = tile.getComponent(TileBehavior);
        if (Math.random() < .1 && (y != 0 && x != 0)) {
          waterBehavior.isWater = true;
        }
      }
    }

    this.select(0, 0);

    //Add the strategy character
    this.strategyCharacter = SceneManager.instantiate(GameObjects.StrategyCharacter, new Point(this.marginX, this.marginY), new Point(1,1), 0);

  }
  update() {
    let proposedX = this.characterX;
    let proposedY = this.characterY;
    if (Base.Input.getKeyUp('ArrowUp')) {
      proposedY -= 1;
    }
    if (Base.Input.getKeyUp('ArrowDown')) {
      proposedY += 1
    }
    if (Base.Input.getKeyUp('ArrowLeft')) {
      proposedX -= 1
    }
    if (Base.Input.getKeyUp('ArrowRight')) {
      proposedX += 1
    }

    if (proposedX >= 0 && proposedX < this.tilesWide && proposedY >= 0 && proposedY < this.tilesHigh) {
      let tileBehavior = this.peons[proposedY][proposedX].getComponent(TileBehavior);
      if (!tileBehavior.isWater) {
        this.characterX = proposedX;
        this.characterY = proposedY;
        this.strategyCharacter.x = this.marginX   + this.characterX * 100;
        this.strategyCharacter.y = this.marginY + this.characterY * 100;

        this.select(this.characterX, this.characterY);
      }
    }


  }
  select(_x, _y) {
    for (let y = 0; y < this.tilesHigh; y++) {
      for (let x = 0; x < this.tilesWide; x++) {
        let tile = this.peons[y][x];
        let behavior = tile.getComponent(TileBehavior);
        if (x != _x || y != _y)
          behavior.hasCharacter = false;
        else
          behavior.hasCharacter = true;
      }
    }
  }

}

class OrbitBehavior extends Base.Behavior{
  time = 0;
  distance = 75;
  start(){
      
  }
  update(){
      this.time+=.01;
      
      this.gameObject.x = Math.cos(this.time)*this.distance;
      this.gameObject.y = Math.sin(this.time)*this.distance;
  }
}


class RectangleBehavior extends Base.Behavior{
  start(){
      this.gameObject.rotation = 0;
  }
  update(){
      this.gameObject.rotation += .1;
  }
}

class ScaleBehavior extends Base.Behavior{
  tick = 0;
  start(){
      
  }
  update(){
      this.tick += .1
      this.gameObject.scaleX = Math.abs(Math.sin(this.tick)) + 1
      this.gameObject.scaleY = Math.abs(Math.cos(this.tick)) + 1
  }
}

class StartSceneInputListener extends Base.Behavior {
    
  start() {

  }
  update() {
      if(Engine.Base.Input.getMouseButtonUp(0)){
          SceneManager.currentScene = "CollisionScene" ;
      }
      if(Engine.Base.Input.getKeyUp(' '))
      {
          SceneManager.currentScene = "SceneOne";
      }
      if(Engine.Base.Input.getKeyUp('a'))
      {
          SceneManager.currentScene = "SceneTwo";
      }
      if(Engine.Base.Input.getKeyUp('Enter'))
      {
          SceneManager.currentScene = "StrategyScene";
      }
      if(Engine.Base.Input.getKeyUp('r'))
      {
          SceneManager.currentScene = "RoomScene";
      }
      if(Engine.Base.Input.getKeyUp('c'))
      {
          SceneManager.currentScene = "CircleCollisionScene";
      }
      if(Engine.Base.Input.getKeyUp('m'))
      {
          SceneManager.currentScene = "MouseScene";
      }

  }
}

class TextBehavior extends Base.Behavior {
  time = 10;

  start() {

  }
  update() {
      this.time -= .1;
      if (Input.keys[' ']) {
          this.gameObject.getComponent(Components.TextComponent).text = 'Down';
      }
      else {
          this.gameObject.getComponent(Components.TextComponent).text = 'Up';

      }

  }
}

class TileBehavior extends Base.Behavior{
  selected = false;
  isWater = false;
  hasCharacter = false;
  start(){
      
  }
  update(){
      let component = this.gameObject.getComponent(Engine.Components.RectangleComponent);
      if(this.isWater){
          component.fill = "blue";
      }
      else if(this.hasCharacter){
          component.fill = "green";
      }
      else{
          component.fill = "gray";
      }
      
  }
}




const GameBehaviors = (function () {

  return {
    CircleBehavior,
    RectangleBehavior,
    TextBehavior,
    StartSceneInputListener,
    CountDownTimer,
    BackToStartSceneBehavior,
    CollisionCircleBehavior,
    MovementBehavior,
    DotBehavior,
    NapsterBehavior,
    TileBehavior,
    OrbitBehavior,
    ScaleBehavior,
    CameraMover,
    MouseText,
    ClickBehavior,
  }
 

  })();