const container = document.querySelector(".container");

for (let i = 0; i < 100; i++) {
  let element = document.createElement("div");
  element.className = "cell";
  element.id = "cell" + i;
  container.appendChild(element);
}

let snake = [0];

const render = () => {
  const element = (document.querySelector("#cell1").style.backgroundColor =
    "red");
};

const initialize = () => {
  render();
};

initialize();
