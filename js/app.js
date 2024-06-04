const container = document.querySelector(".container");

for (let i = 0; i < 100; i++) {
  let element = document.createElement("div");
  element.className = "cell";
  element.id = "cell" + i;
  container.appendChild(element);
}

let snake = [5];
let direction = "left";

const moveSnake = () => {
  switch (direction) {
    case "rigth":
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

const render = () => {
  moveSnake();
  document.querySelectorAll(".snake").forEach((cell) => {
    cell.className = "cell";
  });
  document.querySelector(`#cell${snake[0]}`).className = "snake";
};

const initialize = () => {
  render();
};
initialize();

setInterval(render, 1000);
