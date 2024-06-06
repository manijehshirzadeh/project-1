const container = document.querySelector(".container");
const messageEl = document.querySelector("#message");

for (let i = 1; i <= 100; i++) {
  let element = document.createElement("div");
  element.className = "cell";
  element.id = "cell" + i;
  container.appendChild(element);
}

let snakeTail;
let snakeHead;
let food;
let direction;
let gameOver;
let refreshIntervalId;

const hitWall = () => {
  if (snakeHead % 10 === 0) {
    gameOver = true;
  }

  if (snakeHead % 10 === 1) {
    gameOver = true;
  }

  if (snakeHead < 10) {
    gameOver = true;
  }

  if (snakeHead > 90) {
    gameOver = true;
  }
};

const moveSnake = () => {
  if (snakeHead !== food) {
    snakeTail.shift();
  } else {
    food = randomFood();
  }

  snakeTail.push(snakeHead);
  switch (direction) {
    case "right":
      snakeHead = snakeHead + 1;
      break;
    case "left":
      snakeHead = snakeHead - 1;
      break;
    case "up":
      snakeHead = snakeHead - 10;
      break;
    case "down":
      snakeHead = snakeHead + 10;
      break;
  }
};
window.addEventListener("keydown", handleKey);

function randomFood() {
  return Math.floor(Math.random() * 100);
}

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
  render();
}

const render = () => {
  document.querySelector(`#cell${snakeHead}`).className = "snake";
  document.querySelector(`#cell${food}`).className = "food";
  moveSnake();
  document.querySelectorAll(".snake").forEach((cell) => {
    cell.className = "cell";
  });

  snakeTail.forEach((tail) => {
    document.querySelector(`#cell${tail}`).className = "snake";
  });

  hitWall();
  if (gameOver) {
    messageEl.innerHTML = "GAME OVER";
    clearInterval(refreshIntervalId);
  }
};

const initialize = () => {
  snakeTail = [12, 13];
  snakeHead = 14;
  food = randomFood();
  direction = "right";
  gameOver = false;
  render();
  refreshIntervalId = setInterval(render, 1000);
};
initialize();

const reset = document.querySelector("#reset-button");
reset.addEventListener("click", initialize);
