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

const checkForGameOver = () => {
  if (snakeHead % 10 === 0 && direction === "right") {
    gameOver = true;
  }

  if (snakeHead % 10 === 1 && direction === "left") {
    gameOver = true;
  }

  if (snakeHead < 10 && direction === "up") {
    gameOver = true;
  }

  if (snakeHead > 90 && direction === "down") {
    gameOver = true;
  }
  if (snakeTail.some((tail) => snakeHead === tail)) {
    gameOver = true;
  }
};

const moveSnake = () => {
  if (snakeHead !== food) {
    snakeTail.shift();
  } else {
    food = randomFood();
  }

  if (snakeTail.length !== 0) snakeTail.push(snakeHead);
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
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
}

const render = () => {
  console.log({ snakeTail, snakeHead, direction, gameOver });
  moveSnake();

  if (gameOver) {
    messageEl.innerHTML = "GAME OVER";
    document.querySelector("body").className = "gameover";
    clearInterval(refreshIntervalId);
    return;
  } else {
    checkForGameOver();
    document.querySelectorAll("div[id^=cell]").forEach((cell) => {
      cell.className = "cell";
    });

    document.querySelector(`#cell${food}`).className = "food";

    snakeTail.forEach((tail) => {
      document.querySelector(`#cell${tail}`).className = "snakeTail";
    });
    document.querySelector(`#cell${snakeHead}`).className = "snakeHead";
  }
};

const initialize = () => {
  snakeTail = [11, 12];
  snakeHead = 13;
  food = randomFood();
  direction = "right";
  gameOver = false;
  render();
  refreshIntervalId = setInterval(render, 1000);
};
initialize();

const reset = document.querySelector("#reset-button");
reset.addEventListener("click", () => {
  clearInterval(refreshIntervalId);
  document.querySelector("body").className = "";
  messageEl.innerHTML = "";
  initialize();
});
