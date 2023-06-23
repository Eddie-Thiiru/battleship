import { GameBoard } from "./game-board";
import "./styles/startmenu.css";

const getStartScreenBoard = () => {
  const gameBoard = GameBoard();

  // Create board
  gameBoard.createBoard();

  const board = gameBoard.getBoard();

  return board;
};

const startMenu = () => {
  const container = document.querySelector(".main-section");
  const leftSection = document.createElement("div");
  const rightSection = document.createElement("div");
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  const para = document.createElement("p");
  const shipsContainer = document.createElement("div");
  const carrier = document.createElement("div");
  const battleship = document.createElement("div");
  const destroyer = document.createElement("div");
  const submarine = document.createElement("div");
  const patrolBoat = document.createElement("div");
  const rotateBtn = document.createElement("button");

  leftSection.classList.add("left-section");
  rightSection.classList.add("right-section");
  para.classList.add("start-menu-para");
  para.textContent = "Place your ships on the grid";
  shipsContainer.classList.add("port");
  carrier.classList.add("carrier");
  carrier.draggable = true;
  carrier.textContent = "Carrier";
  battleship.classList.add("battleship");
  battleship.draggable = true;
  battleship.textContent = "Battleship";
  destroyer.classList.add("destroyer");
  destroyer.draggable = true;
  destroyer.textContent = "Destroyer";
  submarine.classList.add("submarine");
  submarine.draggable = true;
  submarine.textContent = "Submarine";
  patrolBoat.classList.add("patrol-boat");
  patrolBoat.draggable = true;
  patrolBoat.textContent = "Patrol Boat";
  rotateBtn.classList.add("rotate-btn");
  rotateBtn.type = "button";
  rotateBtn.textContent = "Rotate";
  table.classList.add("start-menu-table");

  const board = getStartScreenBoard();

  // Create a grid of table rows and table cells
  for (let i = 0; i < board.length; i++) {
    const tableRow = document.createElement("tr");

    tableRow.classList.add("table-row");

    const row = board[i];

    for (let j = 0; j < row.length; j++) {
      const cell = document.createElement("td");

      cell.classList.add("table-cell");

      cell.dataset.pos = `${i},${j}`;

      tableRow.appendChild(cell);
    }
    tableBody.appendChild(tableRow);
  }

  shipsContainer.appendChild(carrier);
  shipsContainer.appendChild(battleship);
  shipsContainer.appendChild(destroyer);
  shipsContainer.appendChild(submarine);
  shipsContainer.appendChild(patrolBoat);
  table.appendChild(tableBody);
  leftSection.appendChild(table);
  rightSection.appendChild(para);
  rightSection.appendChild(shipsContainer);
  rightSection.appendChild(rotateBtn);
  container.appendChild(leftSection);
  container.appendChild(rightSection);
};

const startMenuEventHandler = () => {
  const mainSection = document.querySelector(".main-section");
  // const winnerContainer = document.querySelector(".winner-container");

  // mainSection.addEventListener("mouseover", (e) => {
  //   if (e.target.className === "table-cell") {
  //     const cell = e.target;
  //     const data = cell.dataset.pos;
  //     const array = data.split(",");
  //     const x = parseInt(array[0]);
  //     const y = parseInt(array[1]);

  //     if (cell.id === "") {
  //       addHoverEffect(y, cell);
  //     }
  //   }
  // });

  // mainSection.addEventListener("mouseout", (e) => {
  //   if (e.target.className === "table-cell") {
  //     const cell = e.target;

  //     removeHoverEffect(cell);
  //   }
  // });

  // mainSection.addEventListener("click", (e) => {
  //   // if (winnerContainer.hasChildNodes()) {
  //   //   return;
  //   // }

  //   if (e.target.className === "table-cell") {
  //     const cell = e.target;
  //     const data = cell.dataset.pos;
  //     const array = data.split(",");
  //     const x = parseInt(array[0]);
  //     const y = parseInt(array[1]);

  //     placeShipShadow(y, cell);
  //   }

  //   if (e.target.className === "rotate-btn") {
  //     console.log("yeah");
  //   }
  // });
};

export { startMenu, startMenuEventHandler };
