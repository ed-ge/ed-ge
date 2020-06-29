import Board from "./board.js"

function positionToX(position) {
  if (position <= 10) {
    return position;
  }
  else if (position <= 20) {
    return 10;
  }
  else if (position <= 30) {
    return 10 - (position - 20);
  }
  else {
    return 0;
  }

}

function positionToY(position) {
  if (position <= 10) {
    return 0;
  }
  else if (position <= 20) {
    return position - 10;
  }
  else if (position <= 30) {
    return 10;
  }
  else {
    return 10 - (position - 30);
  }
}

function getProperty(position) {
  let x = positionToX(position);
  let y = positionToY(position);

  let property = Board.find(d => d.x == x && d.y == y);
  if (!property) throw new Error("Could not find property at " + position);
  return property;
}

export {getProperty, positionToX, positionToY};