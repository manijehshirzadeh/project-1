const container = document.querySelector(".container");
const messageEl = document.querySelector("#message");

for (let i = 1; i <= 100; i++) {
  let element = document.createElement("div");
  element.className = "cell";
  element.id = "cell" + i;
  container.appendChild(element);
}

let snake;
let direction;
let gameOver;
let refreshIntervalId;

const checkCollision = () => {
  if (snake[0] % 10 === 0) {
    gameOver = true;
  }

  if (snake[0] % 10 === 1) {
    gameOver = true;
  }

  if (snake[0] < 10) {
    gameOver = true;
  }

  if (snake[0] > 90) {
    gameOver = true;
  }
};

const moveSnake = () => {
  switch (direction) {
    case "right":
      snake = snake.map((snakeCell) => snakeCell + 1);
      break;
    case "left":
      snake = snake.map((snakeCell) => snakeCell - 1);
      break;
    case "up":
      snake = snake.map((snakeCell) => snakeCell - 10);
      break;
    case "down":
      snake = snake.map((snakeCell) => snakeCell + 10);
      break;
  }
};
window.addEventListener("keydown", handleKey);

function handleKey(event) {
  switch (event.key) {
    case "ArrowRight":
      direction = "right";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
  }
}

const render = () => {
  moveSnake();
  document.querySelectorAll(".snake").forEach((cell) => {
    cell.className = "cell";
  });
  snake.forEach((piece) => {
    document.querySelector(`#cell${piece}`).className = "snake";
  });
  checkCollision();
  if (gameOver) {
    messageEl.innerHTML = "GAME OVER";
    clearInterval(refreshIntervalId);
  }
};

const initialize = () => {
  snake = [35];
  direction = "down";
  gameOver = false;
  render();
  refreshIntervalId = setInterval(render, 1000);
};
initialize();

const reset = document.querySelector("#reset-button");
reset.addEventListener("click", initialize);
