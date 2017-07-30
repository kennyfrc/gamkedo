var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 30;
var ballSpeedY = 4;
var paddle1Y = 250;
var paddle2Y = 250;
var playerScore = 0;
var computerScore = 0;
const initialBallSpeedX = 10;
const initialBallSpeedY = 4;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 30;
  setInterval(moveAndDrawEverything, 1000/framesPerSecond);

  canvas.addEventListener('mousemove',
    function(evt) {
      var mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
    });
}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function ballReset(){
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = -initialBallSpeedX
  ballSpeedY = -initialBallSpeedY
}

function moveAndDrawEverything() {
  moveEverything();
  drawEverything();
}

function computerMoves() {
  if (ballY > paddle2Y+PADDLE_HEIGHT/2) {
    paddle2Y += 4;
  } else {
    paddle2Y -= 4;
  }
}

function moveEverything() {
  computerMoves();

  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;


  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2)
      ballSpeedY = deltaY * 0.35
    } else {
      computerScore++;
      ballReset();
    }
  }

  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2)
      ballSpeedY = deltaY * 0.35
    } else {
      playerScore++;
      ballReset();
    }
  }

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  // background
  colorRect(0,0,canvas.width,canvas.height,'black');
  // ball
  colorBall(ballX,ballY,10,'white');
  // left paddle
  colorRect(0,paddle1Y,PADDLE_WIDTH,PADDLE_HEIGHT,'white');
  // right paddle
  colorRect(790,paddle2Y,PADDLE_WIDTH,PADDLE_HEIGHT,'white');
  fillScore();
}

function fillScore(){
  canvasContext.fillText(playerScore, 100,100);
  canvasContext.fillText(computerScore, canvas.width-100,100);
}
function colorBall(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius,0,Math.PI*2, true);
  canvasContext.fill();
}

function colorRect(leftX, topY, height, width, color){
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, height, width);
}
