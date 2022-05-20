const board = [];
let playerColour = "w";
let boardSize = 0;

for (let i = 0; i < 8; i++) {
  board.push(["", "", "", "", "", "", "", ""]);
}

const resetBoard = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board[i][j] = "";
    }
  }
};

const underAttackByRook = (row, col) => {
  const underAttack = [];
  // under attack on row going left
  let tempCol = col - 1;
  while (true) {
    if (tempCol < 0) {
      break;
    }
    if (board[row][tempCol]) {
      if (board[row][tempCol][0] === playerColour) {
        underAttack.push([row, tempCol, "red"]);
      }
      break;
    } else {
      underAttack.push([row, tempCol, "orange"]);
    }
    tempCol -= 1;
  }
  // under attack on row going right
  tempCol = col + 1;
  while (true) {
    if (tempCol >= 8) {
      break;
    }
    if (board[row][tempCol]) {
      if (board[row][tempCol][0] === playerColour) {
        underAttack.push([row, tempCol, "red"]);
      }
      break;
    } else {
      underAttack.push([row, tempCol, "orange"]);
    }
    tempCol += 1;
  }

  // under attack on column going up
  let tempRow = row - 1;
  while (true) {
    if (tempRow < 0) {
      break;
    }
    if (board[tempRow][col]) {
      if (board[tempRow][col][0] === playerColour) {
        underAttack.push([tempRow, col, "red"]);
      }
      break;
    } else {
      underAttack.push([tempRow, col, "orange"]);
    }
    tempRow -= 1;
  }

  // under attack on column going down
  tempRow = row + 1;
  while (true) {
    if (tempRow >= 8) {
      break;
    }
    if (board[tempRow][col]) {
      if (board[tempRow][col][0] === playerColour) {
        underAttack.push([tempRow, col, "red"]);
      }
      break;
    } else {
      underAttack.push([tempRow, col, "orange"]);
    }
    tempRow += 1;
  }
  return underAttack;
};

const underAttackByKnight = (row, col) => {
  const underAttack = [];
  const options = [
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
  ];
  for (const option of options) {
    if (
      row + option[0] >= 0 &&
      col + option[1] >= 0 &&
      row + option[0] < 8 &&
      col + option[1] < 8
    ) {
      if (
        board[row + option[0]][col + option[1]] &&
        board[row + option[0]][col + option[1]][0] === playerColour
      ) {
        underAttack.push([row + option[0], col + option[1], "red"]);
      } else {
        underAttack.push([row + option[0], col + option[1], "orange"]);
      }
    }
  }
  return underAttack;
};

const underAttackByBishop = (row, col) => {
  const underAttack = [];
  // under attack going up and left
  let tempRow = row - 1;
  let tempCol = col - 1;
  while (true) {
    if (tempRow < 0 || tempCol < 0) {
      break;
    }
    if (board[tempRow][tempCol]) {
      if (board[tempRow][tempCol][0] === playerColour) {
        underAttack.push([tempRow, tempCol, "red"]);
      }
      break;
    } else {
      underAttack.push([tempRow, tempCol, "orange"]);
    }
    tempRow -= 1;
    tempCol -= 1;
  }

  // under attack going up and right
  tempRow = row - 1;
  tempCol = col + 1;
  while (true) {
    if (tempRow < 0 || tempCol >= 8) {
      break;
    }
    if (board[tempRow][tempCol]) {
      if (board[tempRow][tempCol][0] === playerColour) {
        underAttack.push([tempRow, tempCol, "red"]);
      }
      break;
    } else {
      underAttack.push([tempRow, tempCol, "orange"]);
    }
    tempRow -= 1;
    tempCol += 1;
  }

  // under attack going down and left
  tempRow = row + 1;
  tempCol = col - 1;
  while (true) {
    if (tempRow >= 8 || tempCol < 0) {
      break;
    }
    if (board[tempRow][tempCol]) {
      if (board[tempRow][tempCol][0] === playerColour) {
        underAttack.push([tempRow, tempCol, "red"]);
      }
      break;
    } else {
      underAttack.push([tempRow, tempCol, "orange"]);
    }
    tempRow += 1;
    tempCol -= 1;
  }

  // under attack going down and right
  tempRow = row + 1;
  tempCol = col + 1;
  while (true) {
    if (tempRow >= 8 || tempCol >= 8) {
      break;
    }
    if (board[tempRow][tempCol]) {
      if (board[tempRow][tempCol][0] === playerColour) {
        underAttack.push([tempRow, tempCol, "red"]);
      }
      break;
    } else {
      underAttack.push([tempRow, tempCol, "orange"]);
    }
    tempRow += 1;
    tempCol += 1;
  }

  return underAttack;
};

const init = () => {
  const isBlack = document
    .querySelector("#game-board")
    .classList.contains("flipped");
  if (isBlack) {
    playerColour = "b";
  }
  getPiecePositions();

  (document.querySelector(".arrows-container") as HTMLDivElement).style.position = "relative";
  boardSize = document.querySelector(".arrows-container").clientHeight / 8;
};

const getPiecePositions = () => {
  const isBlack = document
    .querySelector("#game-board")
    .classList.contains("flipped");
  if (isBlack) {
    playerColour = "b";
  } else {
    playerColour = "w";
  }
  console.log("Is Black is ", isBlack);
  const pieces = document.querySelector(".pieces").childNodes;

  for (const piece of pieces) {
    const coord = (piece as HTMLElement).classList[1].split("-")[1];
    const col = parseInt(coord[1]);
    const row = parseInt(coord[3]);
    const name = (piece as HTMLElement).style.backgroundImage.split("/")[7].substring(0, 2);
    console.log("playerColour is ", playerColour);
    if (playerColour === "w") {
      board[8 - row][col - 1] = name;
    } else {
      board[row - 1][8 - col] = name;
    }
  }
  return board;
};

const getPiecesUnderAttack = () => {
  let underAttack = [];
  const enemyColour = playerColour === "w" ? "b" : "w";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      // Friendly pieces under attack by pawn
      if (!board[row][col]){
        continue;
      }
      if (board[row][col][1] === "p") {
        if (board[row][col][0] === enemyColour ){
          if (
            row + 1 < 8 &&
            col - 1 > 0 &&
            board[row + 1][col - 1][0] === playerColour
          ) {
            underAttack.push([row + 1, col - 1, "red"]);
          }
          if (
            row + 1 < 8 &&
            col + 1 < 8 &&
            board[row + 1][col + 1][0] === playerColour
          ) {
            underAttack.push([row + 1, col + 1, "red"]);
          }

        }
       
      }

      // Friendly pieces under attack by rook
      else if (board[row][col] === enemyColour + "r") {
        underAttack = underAttack.concat(underAttackByRook(row, col));
      }

      // Friendly pieces under attack by bishop
      else if (board[row][col] === enemyColour + "b") {
        underAttack = underAttack.concat(underAttackByBishop(row, col));
      }
      // Friendly pieces under attack by queen
      else if (board[row][col] === enemyColour + "q") {
        underAttack = underAttack.concat(underAttackByBishop(row, col));
        underAttack = underAttack.concat(underAttackByRook(row, col));
      }
      // Friendly pieces under attack by knight
      else if (board[row][col] === enemyColour + "n") {
        underAttack = underAttack.concat(underAttackByKnight(row, col));
      }
    }
  }
  return underAttack;
};

const highlightSquareByCoordinate = (row, col, colour) => {
  const left = col * boardSize;
  const top = row * boardSize;
  let div = document.createElement("div");
  div.className = "highlights";
  div.style.position = "absolute";
  div.style.width = boardSize + "px";
  div.style.height = boardSize + "px";
  div.style.background = colour;
  div.style.opacity = colour === "orange" ? "0.5" : "1";
  div.style.left = left + "px";
  div.style.top = top + "px";
  document.querySelector(".arrows-container").appendChild(div);
};

const deleteHighlights = () => {
  const highlights = document.getElementsByClassName("highlights");
  while (highlights.length > 0) highlights[0].remove();
};

const mainLoop = () => {
  resetBoard();
  getPiecePositions();
  console.log("board: ", board);
  deleteHighlights();
  const underAttack = getPiecesUnderAttack();
  //   console.log("underAttack: ", underAttack);
  for (const square of underAttack) {
    highlightSquareByCoordinate(square[0], square[1], square[2]);
  }
};
init();
const interval = window.setInterval(mainLoop, 1000);
