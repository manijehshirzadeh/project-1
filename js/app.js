// selecting the elements in the DOM
const container = document.querySelector(".container");
const messageEl = document.querySelector("#message");
const reset = document.querySelector("button");

// decalring game state variables
let snakeTail;
let snakeHead;
let food;
let direction;
let gameOver;
let refreshIntervalId;

// Create the board by creating elements and appending them into the DOM
for (let i = 1; i <= 100; i++) {
  let element = document.createElement("div");
  element.className = "cell";
  element.id = "cell" + i;
  container.appendChild(element);
}

// Check for the game over conditions
const checkForGameOver = () => {
  switch (true) {
    case snakeHead % 10 === 0 && direction === "right":
      gameOver = true;
      break;
    case snakeHead % 10 === 1 && direction === "left":
      gameOver = true;
      break;
    case snakeHead < 10 && direction === "up":
      gameOver = true;
      break;
    case snakeHead > 90 && direction === "down":
      gameOver = true;
      break;
    case snakeTail.some((tail) => snakeHead === tail):
      gameOver = true;
      break;
  }
};

// Implement the Snake's moving logic
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

// To create a random food, so it will be put/draw into the board
function randomFood() {
  return Math.floor(Math.random() * 100);
}

// Event handler for pressing arrow keys
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

// The function for drawing all the stuff into DOM, checking game over, and moving the snake
const render = () => {
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
  moveSnake();
};

// Setting up the game so the user can start playing
const initialize = () => {
  snakeTail = [11, 12];
  snakeHead = 13;
  food = randomFood();
  direction = "right";
  gameOver = false;
  refreshIntervalId = setInterval(render, 1000);
  render();
};
initialize();

// Adding event listener to arrow keys
window.addEventListener("keydown", handleKey);

// adding event listener to reset button
reset.addEventListener("click", () => {
  clearInterval(refreshIntervalId);
  document.querySelector("body").className = "";
  messageEl.innerHTML = "";
  initialize();
});
