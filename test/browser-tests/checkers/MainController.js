import Base from "../../../src/Base.js"
import Point from "../../../src/base/Point.js";

export default class MainController extends Base.Behavior {
  start() {
    this.BoardBase = Base._cs.$("BoardBase");
    this.buildBoard();
    this.addPieces();
    this.addKings();
  }
  buildBoard() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let rectangle = Base.Serializer.instantiate(Base.Prefabs.RectangleNoCollider, this.BoardBase, new Base.Point(x * 50, y * 50));
        let color = "red";
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
  addKings() {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 2; x++) {


        let piece = Base.Serializer.instantiate(Base.SceneManager.Prefabs.King, Base._cs, new Base.Point(-100 - x*50, y * 50))
        piece.$("CircleComponent").radius = 20;
        piece.$("CircleCollider").radius = 20;
        piece.$("CircleComponent").fill = "black";
        piece.$("CircleComponent").stroke = "black";

        piece = Base.Serializer.instantiate(Base.SceneManager.Prefabs.King, Base._cs, new Base.Point(450 + x*50, y * 50 + 200))
        piece.$("CircleComponent").radius = 20;
        piece.$("CircleCollider").radius = 20;
        piece.$("CircleComponent").fill = "red";
        piece.$("CircleComponent").stroke = "black";
      }

    }
  }
}

