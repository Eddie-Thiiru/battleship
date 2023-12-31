import { startMenu } from "./start-menu";
import { playRound } from "./game-controller";
import { userAttacks, computerAttacks } from "./player";
import "./styles/gamemenu.css";

const gameMenu = () => {
  const container = document.querySelector(".main-section");

  container.textContent = "";

  const containerOne = document.createElement("div");
  const containerTwo = document.createElement("div");
  const battlefieldOne = document.createElement("div");
  const battlefieldTwo = document.createElement("div");
  const battlefieldOnePara = document.createElement("p");
  const battlefieldTwoPara = document.createElement("p");

  containerOne.classList.add("user-container");
  containerTwo.classList.add("computer-container");
  battlefieldOne.classList.add("user-battlefield");
  battlefieldTwo.classList.add("computer-battlefield");
  battlefieldOnePara.textContent = "Player Board";
  battlefieldTwoPara.textContent = "AI Board";

  containerOne.appendChild(battlefieldOnePara);
  containerTwo.appendChild(battlefieldTwoPara);
  containerOne.appendChild(battlefieldOne);
  containerTwo.appendChild(battlefieldTwo);
  container.appendChild(containerOne);
  container.appendChild(containerTwo);
};

const renderBoards = () => {
  const userBattlefield = document.querySelector(".user-battlefield");
  const computerBattlefield = document.querySelector(".computer-battlefield");

  // Render user game board
  const renderUserBoard = (board) => {
    userBattlefield.textContent = "";

    for (let i = 0; i < board.length; i++) {
      let row = board[i];

      for (let j = 0; j < row.length; j++) {
        const btn = document.createElement("button");
        let data = board[i][j];

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
      let row = board[i];

      for (let j = 0; j < row.length; j++) {
        const btn = document.createElement("button");
        let data = board[i][j];

        btn.classList.add("square");
        btn.classList.add("computer");
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
  const container = document.querySelector(".main-section");
  const popUp = document.createElement("div");
  const winnerAnnouncer = document.createElement("h3");
  const restartButton = document.createElement("button");

  popUp.classList.add("pop-up");
  winnerAnnouncer.classList.add("winner");
  winnerAnnouncer.textContent = winner;
  restartButton.classList.add("restart-btn");
  restartButton.type = "button";
  restartButton.textContent = "Rematch";
  document.body.classList.toggle("modal-open");

  popUp.appendChild(winnerAnnouncer);
  popUp.appendChild(restartButton);
  container.appendChild(popUp);
};

const gameMenuEventHandler = () => {
  const mainSection = document.querySelector(".main-section");

  mainSection.addEventListener("mouseover", (e) => {
    let element = e.target;

    if (element.className === "square computer") {
      element.style.backgroundColor = "#23ffcf";
    }
  });

  mainSection.addEventListener("mouseout", (e) => {
    let element = e.target;

    if (element.className === "square computer") {
      element.style.backgroundColor = "";
    }
  });

  mainSection.addEventListener("click", (e) => {
    let element = e.target;

    if (element.className === "square computer") {
      let data = element.dataset.pos;
      let array = data.split(",");
      let pos = [parseInt(array[0]), parseInt(array[1])];

      playRound(pos);
    }
  });

  mainSection.addEventListener("click", (e) => {
    if (e.target.className === "restart-btn") {
      document.body.classList.toggle("modal-open");
      mainSection.textContent = "";

      // Empty attacked squares history
      userAttacks.length = 0;
      computerAttacks.length = 0;

      // Start new game
      startMenu();
    }
  });
};

export { gameMenu, renderBoards, gameWinner, gameMenuEventHandler };
