var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 30;
var ballSpeedY = 4;
var paddle1Y = 250;
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

function moveAndDrawEverything() {
  moveEverything();
  drawEverything();
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

function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
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
  colorRect(0,paddle1Y,10,PADDLE_HEIGHT,'white');
  // right paddle
  colorRect(790,PADDLE_HEIGHT,10,PADDLE_HEIGHT,'white');
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
