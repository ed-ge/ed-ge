export default class MainController extends Base.Behavior {
  start() {
    this.BoardBase = Base._cs.$("BoardBase");
    this.buildBoard();
    this.addPieces();
    
  }
  buildBoard() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let rectangle = Base.Serializer.instantiate(Base.Prefabs.RectangleNoCollider, this.BoardBase, new Base.Point(x * 50, y * 50));
        let color = "#DD0000";
        if ((y + x) % 2) {
          color = "black"
        }
        rectangle.$("RectangleComponent").fill = color
        rectangle.$("RectangleComponent").stroke = color
        rectangle.$("RectangleComponent").width = 50
        rectangle.$("RectangleComponent").height = 50
      }
    }
  }
  addPieces() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {

        if ((y + x) % 2 || y == 3 || y == 4) {
          continue;
        }

        let color = "black";
        if (y > 4)
          color = "red";

        let piece = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Piece, Base._cs, new Base.Point(x * 50, y * 50))
        piece.$("CircleComponent").radius = 20;
        piece.$("CircleCollider").radius = 20;
        piece.$("CircleComponent").fill = color;
        piece.$("CircleComponent").stroke = "black";
        
      }
    }
  }
  
}

