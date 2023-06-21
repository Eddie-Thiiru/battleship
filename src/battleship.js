import { playRound } from "./game-controller";
import "./styles/styles.css";

const pageLayout = () => {
  const content = document.querySelector(".content");
  const header = document.createElement("div");
  const main = document.createElement("div");
  const footer = document.createElement("div");
  const title = document.createElement("h1");
  const containerOne = document.createElement("div");
  const containerTwo = document.createElement("div");
  const battlefieldOne = document.createElement("div");
  const battlefieldTwo = document.createElement("div");
  const battlefieldOneTitle = document.createElement("h4");
  const battlefieldTwoTitle = document.createElement("h4");
  const logoContainer = document.createElement("div");
  const logo = new Image();

  header.classList.add("header");
  main.classList.add("main-section");
  footer.classList.add("footer");
  title.classList.add("title");
  title.textContent = "Battleship";
  containerOne.classList.add("user-container");
  containerTwo.classList.add("computer-container");
  battlefieldOne.classList.add("user-battlefield");
  battlefieldTwo.classList.add("computer-battlefield");
  battlefieldOneTitle.textContent = "Player Board";
  battlefieldTwoTitle.textContent = "AI Board";
  logo.alt = "Submarine logo";

  logoContainer.appendChild(logo);
  header.appendChild(title);
  header.appendChild(logoContainer);
  containerOne.appendChild(battlefieldOne);
  containerTwo.appendChild(battlefieldTwo);
  containerOne.appendChild(battlefieldOneTitle);
  containerTwo.appendChild(battlefieldTwoTitle);
  main.appendChild(containerOne);
  main.appendChild(containerTwo);
  content.appendChild(header);
  content.appendChild(main);
  content.appendChild(footer);
};

const renderBoards = () => {
  const userBattlefield = document.querySelector(".user-battlefield");
  const computerBattlefield = document.querySelector(".computer-battlefield");

  // Render user game board
  const renderUserBoard = (board) => {
    userBattlefield.textContent = "";

    for (let i = 0; i < board.length; i++) {
      const row = board[i];

      for (let j = 0; j < row.length; j++) {
        const btn = document.createElement("button");
        const data = board[i][j];

        btn.classList.add("square");
        btn.type = "button";
        btn.dataset.pos = `${i},${j}`;

        if (data === 1) {
          btn.classList.add("ship-square");
        } else if (data === 2) {
          btn.classList.add("ship-missed");
        } else if (data === 3) {
          btn.classList.add("ship-hit");
        }

        userBattlefield.appendChild(btn);
      }
    }
  };

  // Render computer game board
  const renderComputerBoard = (board) => {
    computerBattlefield.textContent = "";

    for (let i = 0; i < board.length; i++) {
      const row = board[i];

      for (let j = 0; j < row.length; j++) {
        const btn = document.createElement("button");
        const data = board[i][j];

        btn.classList.add("square");
        btn.type = "button";
        btn.dataset.pos = `${i},${j}`;

        if (data === 2) {
          btn.classList.add("ship-missed");
        } else if (data === 3) {
          btn.classList.add("ship-hit");
        }

        computerBattlefield.appendChild(btn);
      }
    }
  };
  return { renderUserBoard, renderComputerBoard };
};

const userEventHandler = () => {
  const parent = document.querySelector(".computer-battlefield");
  parent.addEventListener("click", (e) => {
    let t = e.target.tagName;
    if (e.target.tagName === "BUTTON") {
      const square = e.target;
      const data = square.dataset.pos;
      const array = data.split(",");
      const pos = [parseInt(array[0]), parseInt(array[1])];

      playRound("computer AI", pos);
    }
  });
};

export { pageLayout, renderBoards, userEventHandler };
