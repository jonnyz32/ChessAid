var board = [];
var green = "chartreuse";
var playerColour = "w";
var boardSize = 0;
for (var i = 0; i < 8; i++) {
    board.push(["", "", "", "", "", "", "", ""]);
}
var resetBoard = function () {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            board[i][j] = "";
        }
    }
};
var underAttackByRook = function (row, col) {
    var underAttack = [];
    var rookColour = board[row][col][0];
    // Under attack on row going left
    var tempCol = col - 1;
    while (true) {
        if (tempCol < 0) {
            break;
        }
        if (board[row][tempCol]) {
            if (board[row][tempCol][0] === playerColour &&
                rookColour !== playerColour) {
                underAttack.push([row, tempCol, "red"]);
            }
            if (board[row][tempCol][0] !== playerColour &&
                rookColour === playerColour) {
                underAttack.push([row, tempCol, green]);
            }
            break;
        }
        else if (rookColour !== playerColour) {
            underAttack.push([row, tempCol, "orange"]);
        }
        tempCol -= 1;
    }
    // Under attack on row going right
    tempCol = col + 1;
    while (true) {
        if (tempCol >= 8) {
            break;
        }
        if (board[row][tempCol]) {
            if (board[row][tempCol][0] === playerColour &&
                rookColour !== playerColour) {
                underAttack.push([row, tempCol, "red"]);
            }
            if (board[row][tempCol][0] !== playerColour &&
                rookColour === playerColour) {
                underAttack.push([row, tempCol, green]);
            }
            break;
        }
        else if (rookColour !== playerColour) {
            underAttack.push([row, tempCol, "orange"]);
        }
        tempCol += 1;
    }
    // Under attack on column going up
    var tempRow = row - 1;
    while (true) {
        if (tempRow < 0) {
            break;
        }
        if (board[tempRow][col]) {
            if (board[tempRow][col][0] === playerColour &&
                rookColour !== playerColour) {
                underAttack.push([tempRow, col, "red"]);
            }
            if (board[tempRow][col][0] !== playerColour &&
                rookColour === playerColour) {
                underAttack.push([tempRow, col, green]);
            }
            break;
        }
        else if (rookColour !== playerColour) {
            underAttack.push([tempRow, col, "orange"]);
        }
        tempRow -= 1;
    }
    // Under attack on column going down
    tempRow = row + 1;
    while (true) {
        if (tempRow >= 8) {
            break;
        }
        if (board[tempRow][col]) {
            if (board[tempRow][col][0] === playerColour &&
                rookColour !== playerColour) {
                underAttack.push([tempRow, col, "red"]);
            }
            if (board[tempRow][col][0] !== playerColour &&
                rookColour === playerColour) {
                underAttack.push([tempRow, col, green]);
            }
            break;
        }
        else if (rookColour !== playerColour) {
            underAttack.push([tempRow, col, "orange"]);
        }
        tempRow += 1;
    }
    return underAttack;
};
var underAttackByKnight = function (row, col) {
    var knightColour = board[row][col][0];
    var underAttack = [];
    var options = [
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
    ];
    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var option = options_1[_i];
        if (row + option[0] >= 0 &&
            col + option[1] >= 0 &&
            row + option[0] < 8 &&
            col + option[1] < 8) {
            if (board[row + option[0]][col + option[1]]) {
                if (board[row + option[0]][col + option[1]][0] === playerColour &&
                    knightColour !== playerColour) {
                    underAttack.push([row + option[0], col + option[1], "red"]);
                }
                else if (board[row + option[0]][col + option[1]][0] !== playerColour &&
                    knightColour === playerColour) {
                    underAttack.push([row + option[0], col + option[1], green]);
                }
            }
            else if (knightColour !== playerColour) {
                underAttack.push([row + option[0], col + option[1], "orange"]);
            }
        }
    }
    return underAttack;
};
var underAttackByKing = function (row, col) {
    var kingColour = board[row][col][0];
    var underAttack = [];
    var options = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    for (var _i = 0, options_2 = options; _i < options_2.length; _i++) {
        var option = options_2[_i];
        if (row + option[0] >= 0 &&
            col + option[1] >= 0 &&
            row + option[0] < 8 &&
            col + option[1] < 8) {
            if (board[row + option[0]][col + option[1]]) {
                if (board[row + option[0]][col + option[1]][0] === playerColour &&
                    kingColour !== playerColour) {
                    underAttack.push([row + option[0], col + option[1], "red"]);
                }
                else if (board[row + option[0]][col + option[1]][0] !== playerColour &&
                    kingColour === playerColour) {
                    underAttack.push([row + option[0], col + option[1], green]);
                }
            }
            else if (kingColour !== playerColour) {
                underAttack.push([row + option[0], col + option[1], "orange"]);
            }
        }
    }
    return underAttack;
};
var underAttackByBishop = function (row, col) {
    var bishopColour = board[row][col][0];
    var underAttack = [];
    // Under attack going up and left
    var tempRow = row - 1;
    var tempCol = col - 1;
    while (true) {
        if (tempRow < 0 || tempCol < 0) {
            break;
        }
        if (board[tempRow][tempCol]) {
            if (board[tempRow][tempCol][0] === playerColour &&
                bishopColour !== playerColour) {
                underAttack.push([tempRow, tempCol, "red"]);
            }
            else if (board[tempRow][tempCol][0] !== playerColour &&
                bishopColour === playerColour) {
                underAttack.push([tempRow, tempCol, green]);
            }
            break;
        }
        else if (bishopColour !== playerColour) {
            underAttack.push([tempRow, tempCol, "orange"]);
        }
        tempRow -= 1;
        tempCol -= 1;
    }
    // Under attack going up and right
    tempRow = row - 1;
    tempCol = col + 1;
    while (true) {
        if (tempRow < 0 || tempCol >= 8) {
            break;
        }
        if (board[tempRow][tempCol]) {
            if (board[tempRow][tempCol][0] === playerColour &&
                bishopColour !== playerColour) {
                underAttack.push([tempRow, tempCol, "red"]);
            }
            else if (board[tempRow][tempCol][0] !== playerColour &&
                bishopColour === playerColour) {
                underAttack.push([tempRow, tempCol, green]);
            }
            break;
        }
        else if (bishopColour !== playerColour) {
            underAttack.push([tempRow, tempCol, "orange"]);
        }
        tempRow -= 1;
        tempCol += 1;
    }
    // Under attack going down and left
    tempRow = row + 1;
    tempCol = col - 1;
    while (true) {
        if (tempRow >= 8 || tempCol < 0) {
            break;
        }
        if (board[tempRow][tempCol]) {
            if (board[tempRow][tempCol][0] === playerColour &&
                bishopColour !== playerColour) {
                underAttack.push([tempRow, tempCol, "red"]);
            }
            else if (board[tempRow][tempCol][0] !== playerColour &&
                bishopColour === playerColour) {
                underAttack.push([tempRow, tempCol, green]);
            }
            break;
        }
        else if (bishopColour !== playerColour) {
            underAttack.push([tempRow, tempCol, "orange"]);
        }
        tempRow += 1;
        tempCol -= 1;
    }
    // Under attack going down and right
    tempRow = row + 1;
    tempCol = col + 1;
    while (true) {
        if (tempRow >= 8 || tempCol >= 8) {
            break;
        }
        if (board[tempRow][tempCol]) {
            if (board[tempRow][tempCol][0] === playerColour &&
                bishopColour !== playerColour) {
                underAttack.push([tempRow, tempCol, "red"]);
            }
            else if (board[tempRow][tempCol][0] !== playerColour &&
                bishopColour === playerColour) {
                underAttack.push([tempRow, tempCol, green]);
            }
            break;
        }
        else if (bishopColour !== playerColour) {
            underAttack.push([tempRow, tempCol, "orange"]);
        }
        tempRow += 1;
        tempCol += 1;
    }
    return underAttack;
};
var init = function () {
    var isBlack = document
        .querySelector("#game-board")
        .classList.contains("flipped");
    if (isBlack) {
        playerColour = "b";
    }
    getPiecePositions();
    document.querySelector(".arrows-container").style.position = "relative";
    boardSize = document.querySelector(".arrows-container").clientHeight / 8;
};
var getPiecePositions = function () {
    var isBlack = document
        .querySelector("#game-board")
        .classList.contains("flipped");
    if (isBlack) {
        playerColour = "b";
    }
    else {
        playerColour = "w";
    }
    var pieces = document.querySelector(".pieces").childNodes;
    for (var _i = 0, _a = pieces; _i < _a.length; _i++) {
        var piece = _a[_i];
        var coord = piece.classList[1].split("-")[1];
        var col = parseInt(coord[1]);
        var row = parseInt(coord[3]);
        var name_1 = piece.style.backgroundImage
            .split("/")[7]
            .substring(0, 2);
        if (playerColour === "w") {
            board[8 - row][col - 1] = name_1;
        }
        else {
            board[row - 1][8 - col] = name_1;
        }
    }
    return board;
};
var underAttackByPawn = function (row, col) {
    var underAttack = [];
    var pawnColour = board[row][col][0];
    if (pawnColour !== playerColour) {
        if (row + 1 < 8 && col - 1 >= 0) {
            if (board[row + 1][col - 1] &&
                board[row + 1][col - 1][0] === playerColour) {
                underAttack.push([row + 1, col - 1, "red"]);
            }
            else if (!board[row + 1][col - 1]) {
                underAttack.push([row + 1, col - 1, "orange"]);
            }
        }
        if (row + 1 < 8 && col + 1 < 8) {
            if (board[row + 1][col + 1] &&
                board[row + 1][col + 1][0] === playerColour) {
                underAttack.push([row + 1, col + 1, "red"]);
            }
            else if (!board[row + 1][col + 1]) {
                underAttack.push([row + 1, col + 1, "orange"]);
            }
        }
    }
    else {
        if (row - 1 < 8 &&
            col - 1 >= 0 &&
            board[row - 1][col - 1] &&
            board[row - 1][col - 1][0] !== playerColour) {
            underAttack.push([row - 1, col - 1, green]);
        }
        if (row + 1 < 8 &&
            col + 1 < 8 &&
            board[row - 1][col + 1] &&
            board[row - 1][col + 1][0] !== playerColour) {
            underAttack.push([row - 1, col + 1, green]);
        }
    }
    return underAttack;
};
var getPiecesUnderAttack = function () {
    var underAttack = [];
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            if (!board[row][col]) {
                continue;
            }
            // Pieces under attack by pawn
            if (board[row][col][1] === "p") {
                underAttack = underAttack.concat(underAttackByPawn(row, col));
            }
            // Pieces under attack by rook
            else if (board[row][col][1] === "r") {
                underAttack = underAttack.concat(underAttackByRook(row, col));
            }
            // Pieces under attack by bishop
            else if (board[row][col][1] === "b") {
                underAttack = underAttack.concat(underAttackByBishop(row, col));
            }
            // Pieces under attack by queen
            else if (board[row][col][1] === "q") {
                underAttack = underAttack.concat(underAttackByBishop(row, col));
                underAttack = underAttack.concat(underAttackByRook(row, col));
            }
            // Pieces under attack by knight
            else if (board[row][col][1] === "n") {
                underAttack = underAttack.concat(underAttackByKnight(row, col));
            }
            // Pieces under attack by king
            else if (board[row][col][1] === "k") {
                underAttack = underAttack.concat(underAttackByKing(row, col));
            }
        }
    }
    return underAttack;
};
var highlightSquareByCoordinate = function (row, col, colour) {
    var left = col * boardSize;
    var top = row * boardSize;
    var div = document.createElement("div");
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
var deleteHighlights = function () {
    var highlights = document.getElementsByClassName("highlights");
    while (highlights.length > 0)
        highlights[0].remove();
};
var mainLoop = function () {
    resetBoard();
    getPiecePositions();
    deleteHighlights();
    var underAttack = getPiecesUnderAttack();
    for (var _i = 0, underAttack_1 = underAttack; _i < underAttack_1.length; _i++) {
        var square = underAttack_1[_i];
        highlightSquareByCoordinate(square[0], square[1], square[2]);
    }
};
init();
var interval = window.setInterval(mainLoop, 750);
