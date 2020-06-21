let Board = [

]

function bootBoard() {
  //Add Corners
  Board.push({ x: 0, y: 0, name: "Go", type: "Corner" })
  Board.push({ x: 10, y: 0, name: "Jail", type: "Corner" })
  Board.push({ x: 10, y: 10, name: "Free Parking", type: "Corner" })
  Board.push({ x: 0, y: 10, name: "Go to Jail", type: "Corner" })


  //Draw Cards
  Board.push({ x: 2, y: 0, name: "Community Chest", type: "DrawCard" })
  Board.push({ x: 10, y: 7, name: "Community Chest", type: "DrawCard" })
  Board.push({ x: 0, y: 7, name: "Community Chest", type: "DrawCard" })
  Board.push({ x: 7, y: 0, name: "Chance", type: "DrawCard" })
  Board.push({ x: 8, y: 10, name: "Chance", type: "DrawCard" })
  Board.push({ x: 0, y: 4, name: "Chance", type: "DrawCard" })

  //Taxes
  Board.push({ x: 3, y: 0, name: "Income Tax", type: "Tax" })
  Board.push({ x: 0, y: 2, name: "Luxury Tax", type: "Tax" })

  //RailRoads
  Board.push({ x: 5, y: 0, name: "Reading RailRoad", type: "property", class: "RailRoad" })
  Board.push({ x: 10, y: 5, name: "Pennsylvania RailRoad", type: "property", class: "RailRoad" })
  Board.push({ x: 5, y: 10, name: "B&O RailRoad", type: "property", class: "RailRoad" })
  Board.push({ x: 0, y: 5, name: "Short Line", type: "property", class: "RailRoad" })

  //Utilities
  Board.push({ x: 10, y: 2, name: "Electric Company", type: "property", class: "Utility" })
  Board.push({ x: 2, y: 10, name: "Water Works", type: "property", class: "Utility" })

  //Normal Properties
  Board.push({ x: 1, y: 0, name: "Medditeranian Avenue", type: "property", class: 0, cost:60, rent: [2] });
  Board.push({ x: 4, y: 0, name: "Baltic Avenue", type: "property", class: 0, cost:60, rent: [4] });

  Board.push({ x: 6, y: 0, name: "Oriental Avenue", type: "property", class: 1, cost:100, rent: [6] });
  Board.push({ x: 8, y: 0, name: "Vermont Avenue", type: "property", class: 1, cost:100, rent: [6] });
  Board.push({ x: 9, y: 0, name: "Connecticut Avenue", type: "property", class: 1, cost:120, rent: [8] });

  Board.push({ x: 10, y: 1, name: "St. Pail Avenue", type: "property", class: 2, cost:140, rent: [10] });
  Board.push({ x: 10, y: 3, name: "States Avenue", type: "property", class: 2, cost:140, rent: [10] });
  Board.push({ x: 10, y: 4, name: "Virginia Avenue", type: "property", class: 2, cost:160, rent: [12] });

  Board.push({ x: 10, y: 6, name: "St. James Place", type: "property", class: 3, cost:180, rent: [14] });
  Board.push({ x: 10, y: 8, name: "Tennessee Avenue", type: "property", class: 3, cost:180, rent: [14] });
  Board.push({ x: 10, y: 9, name: "New York Avenue", type: "property", class: 3, cost:200, rent: [16] });

  Board.push({ x: 9, y: 10, name: "Kentucky Avenue", type: "property", class: 4, cost:220, rent: [18] })
  Board.push({ x: 7, y: 10, name: "Indiana Avenue", type: "property", class: 4, cost:220, rent: [18] })
  Board.push({ x: 6, y: 10, name: "Illinois Avenue", type: "property", class: 4, cost:240, rent: [20] })

  Board.push({ x: 4, y: 10, name: "Atlantic Avenue", type: "property", class: 5, cost:260, rent: [22] })
  Board.push({ x: 3, y: 10, name: "Ventor Avenue", type: "property", class: 5, cost:260, rent: [22] })
  Board.push({ x: 1, y: 10, name: "Marvin Gardens", type: "property", class: 5, cost:280, rent: [24] })

  Board.push({ x: 0, y: 9, name: "Pacific Avenue", type: "property", class: 6, cost:300, rent: [26] })
  Board.push({ x: 0, y: 8, name: "North Carolina Avenue", type: "property", class: 300, cost:60, rent: [26] })
  Board.push({ x: 0, y: 6, name: "Pennsylvania Avenue", type: "property", class: 320, cost:60, rent: [28] })

  Board.push({ x: 0, y: 3, name: "Park Place", type: "property", class: 7, cost:350, rent: [35] })
  Board.push({ x: 0, y: 1, name: "Boardwalk", type: "property", class: 7, cost:400, rent: [50] })
}

bootBoard();

export default Board;