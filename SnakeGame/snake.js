//board
var blockSize = 10;
var rows = 50;
var cols = 100;
var board;
var context; 

//snake head
var snakeX = blockSize * 2;
var snakeY = blockSize * 2;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;
var foodShape = "circle";

var score = 0;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    board.addEventListener("click", restartGame); 
    setInterval(update, 1000/10);
}

function update() {
    if (gameOver) {
        context.fillStyle = "red";
        context.font = "40px Arial";
        context.textAlign = "center";
        context.fillText("Game Over", board.width/2, board.height/2);
        drawRestartButton(); 
        return;
    }

    context.fillStyle = "blue";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    if (foodShape === "square") {
        context.fillRect(foodX, foodY, blockSize, blockSize);
    } else if (foodShape === "circle") {
        context.beginPath();
        context.arc(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
        context.fill();
    }

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
        }
    }
  
    drawScore();
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function drawScore() {
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20);
}

function drawRestartButton() {
    context.fillStyle = "green";
    context.fillRect(board.width/2 - 50, board.height/2 + 20, 100, 40);

    context.fillStyle = "white";
    context.font = "20px Arial";
    context.textAlign = "center";
    context.fillText("Restart", board.width/2, board.height/2 + 45);
}

function restartGame(event) {
    var rect = board.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    if (clickX >= board.width/2 - 50 && clickX <= board.width/2 + 50 && clickY >= board.height/2 + 20 && clickY <= board.height/2 + 60) {
       
        snakeX = blockSize * 2;
        snakeY = blockSize * 2;
        velocityX = 0;
        velocityY = 0;
        snakeBody = [];
        score = 0;
        gameOver = false;
        placeFood();
    }
}
