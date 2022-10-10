var squares = [];
var squaresDraw = [];
var used = [];
var board = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
var turn = 1;
var gameOver = false;
var winner = false;
var scoreOne = 0;
var scoreTwo = 0;

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "inline-block";

  for (i = 1; i <= 9; i++) {
    squares.push(document.getElementById(i.toString()));
    var name = "square" + i.toString();
    squaresDraw.push(document.getElementById(name));
    switch (i) {
      case 1:
      case 2:
      case 4:
      case 5:
      squares[i - 1].style.borderRight = "solid";
      squares[i - 1].style.borderBottom = "solid";
      break;

      case 3:
      case 6:
      squares[i - 1].style.borderBottom = "solid";
      break;

      case 7:
      case 8:
      squares[i - 1].style.borderRight = "solid";
      break;

      default:
      break;
    }
  }
}

function testSquare(num) {
  var index = num - 1;
  if (used.indexOf(num) == -1 && gameOver == false) {
    used.push(num);
    var ctx = squaresDraw[index].getContext("2d");
    ctx.strokeStyle = "black";
    if (turn == 1) {
      board[index] = "X";
      ctx.beginPath();
      ctx.moveTo(squaresDraw[index].width / 4, squaresDraw[index].height / 4);
      ctx.lineTo(squaresDraw[index].width * 0.75, squaresDraw[index].height * 0.75);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(squaresDraw[index].width / 4, squaresDraw[index].height * 0.75);
      ctx.lineTo(squaresDraw[index].width * 0.75, squaresDraw[index].height / 4);
      ctx.stroke();
      turn = 2;
      document.getElementById("playerOne").style.backgroundColor = "white";
      document.getElementById("playerTwo").style.backgroundColor = "#fcba03";
      document.getElementById("oneTurn").style.display = "none";
      document.getElementById("twoTurn").style.display = "initial";
    } else {
      board[index] = "O";
      ctx.beginPath();
      ctx.arc(squaresDraw[index].width / 2, squaresDraw[index].height / 2, squaresDraw[index].width / 4, 0, Math.PI * 2);
      ctx.stroke();
      turn = 1;
      document.getElementById("playerTwo").style.backgroundColor = "white";
      document.getElementById("playerOne").style.backgroundColor = "#fcba03";
      document.getElementById("twoTurn").style.display = "none";
      document.getElementById("oneTurn").style.display = "initial";
    }

    if (board[0] == board[1] && board[1] == board[2]) {
      drawHorizontal(0, 1, 2);
      gameOver = true;
      winner = true;
    } else if (board[3] == board[4] && board[4] == board[5]) {
      drawHorizontal(3, 4, 5);
      gameOver = true;
      winner = true;
    } else if (board[6] == board[7] && board[7] == board[8]) {
      drawHorizontal(6, 7, 8);
      gameOver = true;
      winner = true;
    } else if (board[0] == board[3] && board[3] == board[6]) {
      drawVertical(0, 3, 6);
      gameOver = true;
      winner = true;
    } else if (board[1] == board[4] && board[4] == board[7]) {
      drawVertical(1, 4, 7);
      gameOver = true;
      winner = true;
    } else if (board[2] == board[5] && board[5] == board[8]) {
      drawVertical(2, 5, 8);
      gameOver = true;
      winner = true;
    } else if (board[0] == board[4] && board[4] == board[8]) {
      drawDiagonal(0, 4, 8);
      gameOver = true;
      winner = true;
    } else if (board[2] == board[4] && board[4] == board[6]) {
      drawDiagonal(2, 4, 6);
      gameOver = true;
      winner = true;
    }

    if (used.length == 9) {
      gameOver = true;
    }

    if (gameOver == true) {
      endGame();
    }
  }
}

function drawHorizontal(...nums) {
  for (i of nums) {
    var ctx = squaresDraw[i].getContext("2d");
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(0, squaresDraw[i].height / 2);
    ctx.lineTo(squaresDraw[i].width, squaresDraw[i].height / 2);
    ctx.stroke();
  }
}

function drawVertical(...nums) {
  for (i of nums) {
    var ctx = squaresDraw[i].getContext("2d");
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(squaresDraw[i].width / 2, 0);
    ctx.lineTo(squaresDraw[i].width / 2, squaresDraw[i].height);
    ctx.stroke();
  }
}

function drawDiagonal(...nums) {
  if (nums.indexOf(0) != -1) {
    for (i of nums) {
      var ctx = squaresDraw[i].getContext("2d");
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(squaresDraw[i].width, squaresDraw[i].height);
      ctx.stroke();
    }
  } else {
    for (i of nums) {
      var ctx = squaresDraw[i].getContext("2d");
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(squaresDraw[i].width, 0);
      ctx.lineTo(0, squaresDraw[i].height);
      ctx.stroke();
    }
  }
}

function endGame() {
  var result = document.getElementById("result");
  result.style.color = "black";
  document.getElementById("playerOne").style.backgroundColor = "white";
  document.getElementById("playerTwo").style.backgroundColor = "white";
  document.getElementById("oneTurn").style.display = "none";
  document.getElementById("twoTurn").style.display = "none";
  if (winner == false) {
    result.innerHTML = "TIE";
  } else {
    if (turn == 1) {
      result.innerHTML = "PLAYER TWO WINS";
      scoreTwo++;
      document.getElementById("scoreTwo").innerHTML = "Games Won: " + scoreTwo.toString();
    } else {
      result.innerHTML = "PLAYER ONE WINS";
      scoreOne++;
      document.getElementById("scoreOne").innerHTML = "Games Won: " + scoreOne.toString();
    }
  }
  document.getElementById("gameOver").style.display = "initial";
}

function replay() {
  document.getElementById("gameboard").style.display = "";
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("playerOne").style.backgroundColor = "#fcba03";
  document.getElementById("oneTurn").style.display = "initial";
  document.getElementById("result").style.color = "white";
  for (i = 0; i < 9; i++) {
    var ctx = squaresDraw[i].getContext("2d");
    ctx.clearRect(0, 0, squaresDraw[i].width, squaresDraw[i].height);
  }
  squares = [];
  squaresDraw = [];
  used = [];
  board = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
  turn = 1;
  gameOver = false;
  winner = false;
  startGame();
}
