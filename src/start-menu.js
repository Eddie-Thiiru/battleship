import { GameBoard } from "./game-board";

const getStartScreenBoard = () => {
  const gameBoard = GameBoard();

  gameBoard.createBoard();

  const board = gameBoard.getBoard();

  return board;
};

const startMenu = () => {
  const container = document.querySelector(".main-section");
  const leftSection = document.createElement("div");
  const rightSection = document.createElement("div");
  const para = document.createElement("p");
  const rotateBtn = document.createElement("button");
  const menuGrid = document.createElement("div");

  leftSection.classList.add("left-section");
  rightSection.classList.add("right-section");
  para.classList.add("start-menu-para");
  para.textContent = "Place your carrier";
  rotateBtn.classList.add("rotate-btn");
  rotateBtn.type = "button";
  rotateBtn.textContent = "Rotate";
  menuGrid.classList.add("start-menu-grid");

  const board = getStartScreenBoard();

  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      const btn = document.createElement("button");

      btn.classList.add("start-menu-square");
      btn.type = "button";

      menuGrid.appendChild(btn);
    }
  }

  leftSection.appendChild(menuGrid);
  rightSection.appendChild(para);
  rightSection.appendChild(rotateBtn);
  container.appendChild(leftSection);
  container.appendChild(rightSection);
};

export { startMenu };
