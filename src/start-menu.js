import { GameBoard } from "./game-board";
import "./styles/startmenu.css";

const getStartScreenBoard = () => {
  const gameBoard = GameBoard();

  // Create a new board
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
  const carrierBerth = document.createElement("div");
  const battleshipBerth = document.createElement("div");
  const destroyerBerth = document.createElement("div");
  const submarineBerth = document.createElement("div");
  const patrolBoatBerth = document.createElement("div");

  const carrier = document.createElement("div");
  const battleship = document.createElement("div");
  const destroyer = document.createElement("div");
  const submarine = document.createElement("div");
  const patrolBoat = document.createElement("div");
  const rotateBtn = document.createElement("button");

  leftSection.classList.add("left-section");
  rightSection.classList.add("right-section");
  table.classList.add("start-menu-table");
  para.classList.add("start-menu-para");
  para.textContent = "Place your ships on the grid";
  shipsContainer.classList.add("port");
  carrierBerth.classList.add("carrier-berth");
  battleshipBerth.classList.add("battleship-berth");
  destroyerBerth.classList.add("destroyer-berth");
  submarineBerth.classList.add("submarine-berth");
  patrolBoatBerth.classList.add("patrol-boat-berth");
  carrier.id = "carrier";
  carrier.dataset.length = 5;
  carrier.draggable = true;
  carrier.textContent = "Carrier";
  battleship.id = "battleship";
  battleship.dataset.length = 4;
  battleship.draggable = true;
  battleship.textContent = "Battleship";
  destroyer.id = "destroyer";
  destroyer.dataset.length = 3;
  destroyer.draggable = true;
  destroyer.textContent = "Destroyer";
  submarine.id = "submarine";
  submarine.dataset.length = 3;
  submarine.draggable = true;
  submarine.textContent = "Submarine";
  patrolBoat.id = "patrol-boat";
  patrolBoat.dataset.length = 2;
  patrolBoat.draggable = true;
  patrolBoat.textContent = "Patrol Boat";
  rotateBtn.classList.add("rotate-btn");
  rotateBtn.type = "button";
  rotateBtn.textContent = "Rotate";

  const board = getStartScreenBoard();

  // Create a grid of table rows and table cells
  for (let i = 0; i < board.length; i++) {
    const tableRow = document.createElement("tr");

    tableRow.classList.add("table-row");
    tableRow.id = `dropzone-${i}`;

    const row = board[i];

    for (let j = 0; j < row.length; j++) {
      const cell = document.createElement("td");

      cell.classList.add("table-cell");

      cell.dataset.pos = `${i},${j}`;

      tableRow.appendChild(cell);
    }
    tableBody.appendChild(tableRow);
  }

  carrierBerth.appendChild(carrier);
  battleshipBerth.appendChild(battleship);
  destroyerBerth.appendChild(destroyer);
  submarineBerth.appendChild(submarine);
  patrolBoatBerth.appendChild(patrolBoat);
  shipsContainer.appendChild(carrierBerth);
  shipsContainer.appendChild(battleshipBerth);
  shipsContainer.appendChild(destroyerBerth);
  shipsContainer.appendChild(submarineBerth);
  shipsContainer.appendChild(patrolBoatBerth);
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

  mainSection.addEventListener("dragstart", (e) => {
    let element = e.target.id;

    if (
      element === "carrier" ||
      element === "battleship" ||
      element === "destroyer" ||
      element === "submarine" ||
      element === "patrol-boat"
    ) {
      e.dataTransfer.setData("text/plain", element);
    } else {
      return;
    }
  });

  mainSection.addEventListener("dragover", (e) => {
    if (e.target.className === "table-cell") {
      e.target.style.backgroundColor = "aqua";
      e.preventDefault();
    }
  });

  mainSection.addEventListener("dragleave", (e) => {
    if (e.target.className === "table-cell") {
      e.target.style.backgroundColor = "";
    }
  });

  mainSection.addEventListener("drop", (e) => {
    if (e.target.className === "table-cell") {
      const dropzone = e.target;
      const parent = dropzone.parentNode;
      const nodeList = parent.childNodes;

      const data = dropzone.dataset.pos;
      const array = data.split(",");
      // const x = parseInt(array[0]);
      const y = parseInt(array[1]);

      const draggableId = e.dataTransfer.getData("text");
      const draggableElement = document.getElementById(draggableId);
      const shipLength = parseInt(draggableElement.dataset.length);

      if (y + shipLength > 10) {
        nodeList[y].style.backgroundColor = "";
        return;
      } else {
        for (let i = 0; i < shipLength; i++) {
          let index = y + i;
          nodeList[index].classList.add(`${draggableId}`);
          nodeList[index].style.backgroundColor = "aqua";
        }

        const draggableParent = draggableElement.parentNode;

        draggableParent.textContent = "";

        e.dataTransfer.clearData();
      }
    }
  });
};

export { startMenu, startMenuEventHandler };
