import { Game, playRound } from "./game";
import { userAttacks, computerAttacks } from "./player";
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
  const winnerContainer = document.createElement("div");
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
  winnerContainer.classList.add("winner-container");
  logoContainer.classList.add("logo-container");
  logo.alt = "Submarine logo";

  logoContainer.appendChild(logo);
  header.appendChild(title);
  header.appendChild(logoContainer);
  header.appendChild(winnerContainer);
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

const gameWinner = (winner) => {
  const container = document.querySelector(".winner-container");
  const winnerAnnouncer = document.createElement("h3");
  const restartButton = document.createElement("button");

  winnerAnnouncer.classList.add("winner");
  winnerAnnouncer.textContent = winner;
  restartButton.classList.add("restart-button");
  restartButton.type = "button";
  restartButton.textContent = "Rematch";

  container.appendChild(winnerAnnouncer);
  container.appendChild(restartButton);
};

const userEventHandler = () => {
  const parent = document.querySelector(".computer-battlefield");
  const parentTwo = document.querySelector(".winner-container");

  parent.addEventListener("click", (e) => {
    if (parentTwo.hasChildNodes()) {
      return;
    }

    if (e.target.tagName === "BUTTON") {
      const square = e.target;
      const data = square.dataset.pos;
      const array = data.split(",");
      const pos = [parseInt(array[0]), parseInt(array[1])];

      playRound("computer AI", pos);
    }
  });

  parentTwo.addEventListener("click", (e) => {
    if ((e.target.className = "restart-button")) {
      parentTwo.textContent = "";

      // Empty attacked squares history
      userAttacks.length = 0;
      computerAttacks.length = 0;

      // Start new game
      Game();
    }
  });
};

export { pageLayout, renderBoards, gameWinner, userEventHandler };
