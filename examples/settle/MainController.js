
export default class MainController extends Base.Behavior {
  start() {
    //Build the board
    let startX = -100;
    let startY = -200;
    let radius = 75;
    let apothem = .866 * radius; // Approximation, see https://www.omnicalculator.com/math/hexagon#diagonals-of-a-hexagon

    let tiles = [];

    let indeces = [0, 1, -1, 2, -2]
    let hexagonsAcross = [3, 4, 5, 4, 3];


    for (let i = 0; i < hexagonsAcross.length; i++) {
      let across = hexagonsAcross[i];
      let lineStartX = startX;
      if (i % 2 == 1)
        lineStartX -= apothem

      for (let j = 0; j < across; j++) {
        let index = indeces[j]
        let tile = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Hexagon, Base._cs, new Base.Point(lineStartX + index * apothem * 2, startY + i * radius * 1.5), new Base.Point(1, 1), 0);

        tiles.push(tile);
      }
    }

    let totalHexagons = tiles.length;
    let assignmentArray = [];
    for (let i = 0; i < totalHexagons; i++) {
      assignmentArray.push(i);
    }
    assignmentArray = this.shuffleArray(assignmentArray);
    let rollArray = ["12", "11", "11", "10", "10", "9", "9", "8", "8", "6", "6", "5", "5", "4", "4", "3", "3", "2"];
    rollArray = this.shuffleArray(rollArray);

    //Assign titles
    let tileTypes = [
      { name: "Empty", color: "lightgray", count: 1 },
      { name: "Brick", color: "red", count: 3 },
      { name: "Stone", color: "gray", count: 3 },
      { name: "Wheat", color: "yellow", count: 4 },
      { name: "Sheep", color: "lime", count: 4 },
      { name: "Wood", color: "green", count: 4 },
    ]

    let inc = 0;
    let foundBlank = false;
    for (let i = 0; i < tileTypes.length; i++) {
      let type = tileTypes[i];
      for (let j = 0; j < type.count; j++, inc++) {
        tiles[assignmentArray[inc]].$("HexagonComponent").fill = type.color;
        if (inc == 0) {
          foundBlank = true;
          tiles[assignmentArray[inc]].findByName("Cost").$("TextComponent").text = "--";
        }
        else {
          tiles[assignmentArray[inc]].findByName("Cost").$("TextComponent").text = rollArray[foundBlank ? inc - 1 : inc];
        }
      }
    }

    //Setup trade spots
    let tradeCoords = [0,-radius*1.5,0,radius*3,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let pushPull = [0,0,
                    Math.PI*2/60,0,
                    Math.PI*2/120,-.25,
                    0,0,
                    Math.PI*2/60,0,
                    Math.PI*2/120,-.25,
                    0,0,
                    Math.PI*2/60,0,
                    Math.PI*2/120,-.25];

    let tradeIcons = ["\uf128","\uf128","\uf128","\uf128","\uf7ec","\uf553","\uf84c","\uf1bb","\uf19c"];
    tradeIcons = this.shuffleArray(tradeIcons);

    for(let i = 0; i < tradeCoords.length; i+=2){
      let angle = Math.PI*2/tradeCoords.length*i + (Math.PI*2/50) + pushPull[i];
      let x = Math.cos(angle)*(4.5+pushPull[i+1])*radius;
      let y = Math.sin(angle)*(4.5+pushPull[i+1])*radius;
      tradeCoords[i] = x;
      tradeCoords[i+1] = y;
    }

    for(let i = 0 ; i < tradeCoords.length; i+=2){
      let trade = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Trade, Base._cs, new Base.Point(tradeCoords[i] + startX, tradeCoords[i+1] + startY+3*radius));
      trade.findByName("Icon").$("TextComponent").text = tradeIcons[i/2];
    }

    //Now setup the players
    let px = 300;
    let py = -300;
    let yMargin = 175
    let playerColors = ["orange", "violet", "blue", "cyan"];
    for (let i = 0; i < 4; i++) {
      let x = px;
      //Cities
      for (let c = 0; c < 4; c++) {
        let city = Base.Serializer.instantiate(Base.SceneManager.Prefabs.City, Base._cs, new Point(px + c * 30, py + i * yMargin));
        city.$("CircleComponent").fill = playerColors[i];
      }
      x += 4 * 30;
      for (let t = 0; t < 5; t++) {
        let town = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Town, Base._cs, new Point(x + t * 30, py + i * yMargin));
        town.$("RectangleComponent").fill = playerColors[i];
      }
      x = px
      for (let t = 0; t < 15; t++) {
        let road = Base.Serializer.instantiate(Base.SceneManager.Prefabs.Road, Base._cs, new Point(x + (t%8 * 30), py + 30*(1+Math.floor(t/8)) + i*yMargin));
        road.$("CircleComponent").fill = playerColors[i];
      }
    }


  }
  // from https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
  shuffleArray(arr) {
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);

  }


}

