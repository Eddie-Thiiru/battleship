import { GameBoard } from "./game-board";
import { gameMenu } from "./battleship";
import { Game } from "./game-controller";
import {
  getComputerShips,
  computerShipCoordinates,
  visited,
} from "./computerAI";
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
  const para = document.createElement("h3");
  const paraTwo = document.createElement("p");
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

  leftSection.classList.add("left-section");
  rightSection.classList.add("right-section");
  table.classList.add("start-menu-table");
  para.classList.add("instructions-one");
  para.textContent = "Drag and drop ships";
  paraTwo.classList.add("instructions-two");
  paraTwo.textContent = "Double click to rotate";
  shipsContainer.classList.add("port");
  carrierBerth.classList.add("carrier-berth");
  battleshipBerth.classList.add("battleship-berth");
  destroyerBerth.classList.add("destroyer-berth");
  submarineBerth.classList.add("submarine-berth");
  patrolBoatBerth.classList.add("patrol-boat-berth");
  carrier.classList.add("horizontal");
  carrier.id = "carrier";
  carrier.dataset.height = 1;
  carrier.dataset.width = 5;
  carrier.draggable = true;
  battleship.classList.add("horizontal");
  battleship.id = "battleship";
  battleship.dataset.height = 1;
  battleship.dataset.width = 4;
  battleship.draggable = true;
  destroyer.classList.add("horizontal");
  destroyer.id = "destroyer";
  destroyer.dataset.height = 1;
  destroyer.dataset.width = 3;
  destroyer.draggable = true;
  submarine.classList.add("horizontal");
  submarine.id = "submarine";
  submarine.dataset.height = 1;
  submarine.dataset.width = 3;
  submarine.draggable = true;
  patrolBoat.classList.add("horizontal");
  patrolBoat.id = "patrol-boat";
  patrolBoat.dataset.height = 1;
  patrolBoat.dataset.width = 2;
  patrolBoat.draggable = true;

  const board = getStartScreenBoard();

  // Create a grid of table rows and table cells
  for (let i = 0; i < board.length; i++) {
    // Create row
    const tableRow = document.createElement("tr");

    tableRow.classList.add("table-row");
    tableRow.id = `dropzone-${i}`;

    let row = board[i];

    for (let j = 0; j < row.length; j++) {
      // create row cell
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
  rightSection.appendChild(paraTwo);
  rightSection.appendChild(shipsContainer);
  container.appendChild(leftSection);
  container.appendChild(rightSection);
};

let userShips = {
  carrier: null,
  battleship: null,
  destroyer: null,
  submarine: null,
  "patrol-boat": null,
};

let userShipsCoordinates = [];

const sortShipsCoordinates = () => {
  for (let key in userShips) {
    let arr = userShips[key];

    userShipsCoordinates.push(arr);
  }
};

const allShipsPlaced = () => {
  const container = document.querySelector(".right-section");
  const port = document.querySelector(".port");
  let nodeList = port.childNodes;
  let ships = 0;

  for (let i = 0; i < nodeList.length; i++) {
    let element = nodeList[i];

    if (element.hasChildNodes()) {
      ships += 1;
    }
  }

  // Create "start-game" button when all ships are placed on the board
  if (ships === 0) {
    const btn = document.createElement("button");

    btn.classList.add("start-btn");
    btn.type = "button";
    btn.textContent = "Start Game";
    container.style.color = "grey";

    container.appendChild(btn);

    // Add ship coordinates to array
    sortShipsCoordinates();
  }
};

const isDropValid = (indexX, indexY, shipHeight, shipWidth, nodeList) => {
  // If ship drop exceeds the bound of the board, return false
  if (indexY + shipWidth > 10) {
    return false;
  }

  /* This checks if there is a ship to the immediate top of the 
  "drop ship", and stops execution if a placed ship is detected. */
  const checkTop = () => {
    let dropSquare = nodeList[indexY];
    let parent = dropSquare.parentNode;
    let parentSibling = parent.previousSibling;
    let startIndex = indexY - 1;

    if (parentSibling === null) {
      return true;
    }

    for (let i = 0; i < shipWidth + 2; i++) {
      // Checks child nodes of the parent sibling
      let squareIndex = startIndex + i;
      let nodeList = parentSibling.childNodes;
      let square = nodeList[squareIndex];

      if (square === undefined) {
        continue;
      }

      let squareClass = square.className;

      if (
        squareClass.includes("carrier") ||
        squareClass.includes("battleship") ||
        squareClass.includes("destroyer") ||
        squareClass.includes("submarine") ||
        squareClass.includes("patrol-boat")
      ) {
        return false;
      }
    }
    return true;
  };

  /* This checks if there is a ship to the immediate right of the 
  "drop ship", and stops execution if a placed ship is detected. */
  const checkRight = () => {
    let dropSquare = nodeList[indexY];
    let parent = dropSquare.parentNode;
    let grandParent = parent.parentNode;
    let parentList = grandParent.childNodes;
    let squareIndex = indexY + shipWidth;

    for (let i = 0; i < shipHeight; i++) {
      let index = indexX + i;
      let children = parentList[index];
      let list = children.childNodes;
      let square = list[squareIndex];

      if (square === undefined) {
        continue;
      }

      let squareClass = square.className;

      if (
        squareClass.includes("carrier") ||
        squareClass.includes("battleship") ||
        squareClass.includes("destroyer") ||
        squareClass.includes("submarine") ||
        squareClass.includes("patrol-boat")
      ) {
        return false;
      }
    }
    return true;
  };

  /* This checks if there is a ship to the immediate bottom of the 
  "drop ship", and stops execution if a placed ship is detected. */
  const checkBottom = () => {
    let dropSquare = nodeList[indexY];
    let parent = dropSquare.parentNode;
    let parentSibling = parent.nextSibling;
    let startIndex = indexY - 1;

    if (parentSibling === null) {
      return true;
    }

    for (let i = 0; i < shipWidth + 2; i++) {
      // Checks child nodes of the parent sibling
      let squareIndex = startIndex + i;
      let nodeList = parentSibling.childNodes;
      let square = nodeList[squareIndex];

      if (square === undefined) {
        continue;
      }

      let squareClass = square.className;

      if (
        squareClass.includes("carrier") ||
        squareClass.includes("battleship") ||
        squareClass.includes("destroyer") ||
        squareClass.includes("submarine") ||
        squareClass.includes("patrol-boat")
      ) {
        return false;
      }
    }
    return true;
  };

  /* This checks if there is a ship to the immediate left of the 
  "drop ship", and stops execution if a placed ship is detected. */
  const checkLeft = () => {
    let dropSquare = nodeList[indexY];
    let parent = dropSquare.parentNode;
    let grandParent = parent.parentNode;
    let parentList = grandParent.childNodes;
    let squareIndex = indexY - 1;

    for (let i = 0; i < shipHeight; i++) {
      let index = indexX + i;
      let children = parentList[index];
      let list = children.childNodes;
      let square = list[squareIndex];

      if (square === undefined) {
        continue;
      }

      let squareClass = square.className;

      if (
        squareClass.includes("carrier") ||
        squareClass.includes("battleship") ||
        squareClass.includes("destroyer") ||
        squareClass.includes("submarine") ||
        squareClass.includes("patrol-boat")
      ) {
        return false;
      }
    }
    return true;
  };

  let topValid = checkTop();
  let rightValid = checkRight();
  let bottomValid = checkBottom();
  let leftValid = checkLeft();

  if (
    topValid === true &&
    rightValid === true &&
    bottomValid === true &&
    leftValid === true
  ) {
    return true;
  } else if (
    topValid === false ||
    rightValid === false ||
    bottomValid === false ||
    leftValid === false
  ) {
    return false;
  }
};

const startMenuEventHandler = () => {
  const mainSection = document.querySelector(".main-section");

  mainSection.addEventListener("dblclick", (e) => {
    let element = e.target;

    if (
      element.id === "carrier" ||
      element.id === "battleship" ||
      element.id === "destroyer" ||
      element.id === "submarine" ||
      element.id === "patrol-boat"
    ) {
      let height = element.dataset.height;
      let width = element.dataset.width;

      element.dataset.height = width;
      element.dataset.width = height;
    }

    if (element.className === "horizontal") {
      element.classList.replace("horizontal", "vertical");
    } else if (element.className === "vertical") {
      element.classList.replace("vertical", "horizontal");
    }
  });

  mainSection.addEventListener("dragstart", (e) => {
    let element = e.target.id;
    console.log("started");

    if (
      element === "carrier" ||
      element === "battleship" ||
      element === "destroyer" ||
      element === "submarine" ||
      element === "patrol-boat"
    ) {
      e.dataTransfer.setData("text/plain", element);

      if (e.target.className === "horizontal") {
        let str = element;
        let letter = str.charAt(0).toUpperCase();
        let text = str.replace(str.charAt(0), letter);

        e.target.textContent = text;
      }
    } else {
      return;
    }
  });

  mainSection.addEventListener("dragend", (e) => {
    e.target.textContent = "";
  });

  mainSection.addEventListener("dragover", (e) => {
    if (e.target.className === "table-cell") {
      e.target.style.backgroundColor = "#23ffcf";
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
      const x = parseInt(array[0]);
      const y = parseInt(array[1]);
      const draggableId = e.dataTransfer.getData("text");
      const draggableElement = document.getElementById(draggableId);
      const orientation = draggableElement.className;
      const shipHeight = parseInt(draggableElement.dataset.height);
      const shipWidth = parseInt(draggableElement.dataset.width);

      // This checks if the drop is valid
      let valid = isDropValid(x, y, shipHeight, shipWidth, nodeList);
      let shipCoordinates = [];

      // If drop is not valid, stop execution
      if (valid === false) {
        nodeList[y].style.backgroundColor = "";

        return;
      } else {
        if (orientation === "horizontal") {
          // This adds a visual indication where the ship is dropped
          for (let i = 0; i < shipWidth; i++) {
            let index = y + i;

            nodeList[index].classList.add(draggableId);
            nodeList[index].style.backgroundColor = "#0099d6";
            shipCoordinates.push([x, index]);
          }
        } else {
          // This adds a visual indication where the ship is dropped
          let dropSquare = nodeList[y];
          let parent = dropSquare.parentNode;
          let grandParent = parent.parentNode;
          let parentList = grandParent.childNodes;

          for (let i = 0; i < shipHeight; i++) {
            let index = x + i;
            let children = parentList[index];
            let list = children.childNodes;

            list[y].classList.add(draggableId);
            list[y].style.backgroundColor = "#0099d6";
            shipCoordinates.push([index, y]);
          }
        }

        const draggableParent = draggableElement.parentNode;

        draggableParent.textContent = "";
        userShips[draggableId] = shipCoordinates;
        e.dataTransfer.clearData();
        allShipsPlaced();
      }
    }
  });

  mainSection.addEventListener("click", (e) => {
    if (e.target.className === "start-btn") {
      mainSection.textContent = "";

      getComputerShips();
      gameMenu();
      Game();

      userShipsCoordinates.length = 0;
      computerShipCoordinates.length = 0;
      visited.length = 0;
    }
  });
};

export { startMenu, userShipsCoordinates, startMenuEventHandler };
