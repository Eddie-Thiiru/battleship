/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/battleship.js":
/*!***************************!*\
  !*** ./src/battleship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameMenu: () => (/* binding */ gameMenu),
/* harmony export */   gameMenuEventHandler: () => (/* binding */ gameMenuEventHandler),
/* harmony export */   gameWinner: () => (/* binding */ gameWinner),
/* harmony export */   renderBoards: () => (/* binding */ renderBoards)
/* harmony export */ });
/* harmony import */ var _start_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./start-menu */ "./src/start-menu.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _styles_gamemenu_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/gamemenu.css */ "./src/styles/gamemenu.css");




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
  containerOne.appendChild(battlefieldOne);
  containerTwo.appendChild(battlefieldTwo);
  containerOne.appendChild(battlefieldOnePara);
  containerTwo.appendChild(battlefieldTwoPara);
  container.appendChild(containerOne);
  container.appendChild(containerTwo);
};
const renderBoards = () => {
  const userBattlefield = document.querySelector(".user-battlefield");
  const computerBattlefield = document.querySelector(".computer-battlefield");

  // Render user game board
  const renderUserBoard = board => {
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
  const renderComputerBoard = board => {
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
  return {
    renderUserBoard,
    renderComputerBoard
  };
};
const gameWinner = winner => {
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
const gameMenuEventHandler = () => {
  const mainSection = document.querySelector(".main-section");
  const winnerContainer = document.querySelector(".winner-container");
  mainSection.addEventListener("click", e => {
    if (winnerContainer.hasChildNodes()) {
      return;
    }
    if (e.target.className === "square") {
      const square = e.target;
      const data = square.dataset.pos;
      const array = data.split(",");
      const pos = [parseInt(array[0]), parseInt(array[1])];
      (0,_game__WEBPACK_IMPORTED_MODULE_1__.playRound)(pos);
    }
  });
  winnerContainer.addEventListener("click", e => {
    if (e.target.className = "restart-button") {
      mainSection.textContent = "";
      winnerContainer.textContent = "";

      // Empty attacked squares history
      _player__WEBPACK_IMPORTED_MODULE_2__.userAttacks.length = 0;
      _player__WEBPACK_IMPORTED_MODULE_2__.computerAttacks.length = 0;

      // Start new game
      (0,_start_menu__WEBPACK_IMPORTED_MODULE_0__.startMenu)();
    }
  });
};


/***/ }),

/***/ "./src/game-board.js":
/*!***************************!*\
  !*** ./src/game-board.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameBoard: () => (/* binding */ GameBoard)
/* harmony export */ });
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/ships.js");

const GameBoard = () => {
  let board = [];
  const createBoard = () => {
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = 0;
      }
    }
  };
  const getBoard = () => board;
  const playerShips = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.PlayerShips)();
  const ships = playerShips.getShips();
  const populateBoard = array => {
    playerShips.addShipCoordinates(array);

    // Place all ships onto the board
    (0,_ships__WEBPACK_IMPORTED_MODULE_0__.Ship)().placeShips(board, ships);
  };
  const findAttackedShip = pos => {
    for (let key in ships) {
      const array = ships[key].coordinates;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element[0] === pos[0] && element[1] === pos[1]) {
          return ships[key];
        }
      }
    }
  };
  const receiveAttack = pos => {
    let x = pos[0];
    let y = pos[1];
    if (board[x][y] === 1) {
      const attackedShip = findAttackedShip(pos);

      // Mark board position as attacked
      board[x][y] = 3;

      // Add hit count to attacked ship
      (0,_ships__WEBPACK_IMPORTED_MODULE_0__.Ship)().hit(attackedShip);
    } else if (board[x][y] === 0) {
      // Mark board position as attacked
      board[x][y] = 2;
    }
  };
  const allShipsDestroyed = () => {
    let count = 0;
    for (let key in ships) {
      const shipState = ships[key].destroyed;
      if (shipState === true) {
        count += 1;
      }
    }
    return count === 5 ? true : false;
  };
  return {
    createBoard,
    getBoard,
    populateBoard,
    receiveAttack,
    allShipsDestroyed
  };
};


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game),
/* harmony export */   playRound: () => (/* binding */ playRound)
/* harmony export */ });
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ships */ "./src/ships.js");
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");
/* harmony import */ var _start_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./start-menu */ "./src/start-menu.js");





let userGameBoard;
let computerGameBoard;
let user;
let computer;
const Game = () => {
  // Create Player objects and GameBoard objects for each player
  user = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)("user");
  computer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)("computer AI");
  userGameBoard = (0,_game_board__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
  computerGameBoard = (0,_game_board__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();

  // Create new boards for each player
  userGameBoard.createBoard();
  computerGameBoard.createBoard();

  // Populate player boards with ships
  userGameBoard.populateBoard(_start_menu__WEBPACK_IMPORTED_MODULE_4__.userShipsCoordinates);
  computerGameBoard.populateBoard(_start_menu__WEBPACK_IMPORTED_MODULE_4__.computerShipCoordinates);

  //   Get player boards from GameBoard objects
  const userBoard = userGameBoard.getBoard();
  const computerBoard = computerGameBoard.getBoard();

  // Initial player boards are rendered
  (0,_battleship__WEBPACK_IMPORTED_MODULE_3__.renderBoards)().renderUserBoard(userBoard);
  (0,_battleship__WEBPACK_IMPORTED_MODULE_3__.renderBoards)().renderComputerBoard(computerBoard);

  // Initialize event handler
  (0,_battleship__WEBPACK_IMPORTED_MODULE_3__.gameMenuEventHandler)();
};
const playRound = pos => {
  let userAttacks = user.attack(computer, computerGameBoard, pos);
  if (userAttacks === false) {
    return;
  } else {
    // Update computer board on the screen
    const computerBoard = computerGameBoard.getBoard();
    (0,_battleship__WEBPACK_IMPORTED_MODULE_3__.renderBoards)().renderComputerBoard(computerBoard);

    // Check if all computer ships are destroyed
    if (computerGameBoard.allShipsDestroyed() === true) {
      (0,_battleship__WEBPACK_IMPORTED_MODULE_3__.gameWinner)("You Win!");
      return;
    }

    // // Computer attacks the user 200 seconds after being attacked
    // const myPromise = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(computer.attack(user, userGameBoard, pos));
    //   }, 200);
    // }).then(() => {
    computer.attack(user, userGameBoard, pos);
    // Update user board on the screen
    const userBoard = userGameBoard.getBoard();
    (0,_battleship__WEBPACK_IMPORTED_MODULE_3__.renderBoards)().renderUserBoard(userBoard);

    // Check if all user ships are destroyed
    if (userGameBoard.allShipsDestroyed() === true) {
      (0,_battleship__WEBPACK_IMPORTED_MODULE_3__.gameWinner)("Computer Wins!");
      return;
    }
    // });
  }
};



// // Create Player objects and GameBoard objects for each player
// user = Player("user");
// computer = Player("computer AI");

// userGameBoard = GameBoard();
// computerGameBoard = GameBoard();

// // Create new boards for each player
// userGameBoard.createBoard();
// computerGameBoard.createBoard();

// // Add ship coordinates and populate user board with ships
// const userPlayerShips = PlayerShips();
// const computerPlayerShips = PlayerShips();

// userPlayerShips.addShipCoordinates(userShipsCoordinates);
// computerPlayerShips.addShipCoordinates(computerShipCoordinates);

// const userShips = userPlayerShips.getShips();
// const computerShips = computerPlayerShips.getShips();

// userGameBoard.populateBoard(userShips);
// computerGameBoard.populateBoard(computerShips);
// // userGameBoard.populateBoard();

// // // Update ship coordinates and populate computer board with ships
// // Ship.updateShipCoordinates(computerShipCoordinates);
// // computerGameBoard.populateBoard();

// //   Get player boards from GameBoard objects
// const userBoard = userGameBoard.getBoard();
// const computerBoard = computerGameBoard.getBoard();

// // Initial player boards are rendered
// renderBoards().renderUserBoard(userBoard);
// renderBoards().renderComputerBoard(computerBoard);

// gameMenuEventHandler();

/***/ }),

/***/ "./src/layout.js":
/*!***********************!*\
  !*** ./src/layout.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pageLayout: () => (/* binding */ pageLayout)
/* harmony export */ });
/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/global.css */ "./src/styles/global.css");

const pageLayout = () => {
  const content = document.querySelector(".content");
  const header = document.createElement("div");
  const main = document.createElement("div");
  const footer = document.createElement("div");
  const title = document.createElement("h1");
  const winnerContainer = document.createElement("div");
  const logoContainer = document.createElement("div");
  const logo = new Image();
  header.classList.add("header");
  main.classList.add("main-section");
  footer.classList.add("footer");
  title.classList.add("title");
  title.textContent = "Battleship";
  winnerContainer.classList.add("winner-container");
  logoContainer.classList.add("logo-container");
  logo.alt = "Submarine logo";
  logoContainer.appendChild(logo);
  header.appendChild(title);
  header.appendChild(logoContainer);
  header.appendChild(winnerContainer);
  content.appendChild(header);
  content.appendChild(main);
  content.appendChild(footer);
};


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player),
/* harmony export */   computerAttacks: () => (/* binding */ computerAttacks),
/* harmony export */   userAttacks: () => (/* binding */ userAttacks)
/* harmony export */ });
let userAttacks = [];
let computerAttacks = [];
const Player = name => {
  const getName = () => name;
  const isAttackLegal = (enemy, pos) => {
    let array;
    if (enemy === "user") {
      array = computerAttacks.slice();
    } else {
      array = userAttacks.slice();
    }
    while (array.length) {
      const element = array.shift();
      if (element[0] === pos[0] && element[1] === pos[1]) {
        return false;
      }
    }
    return true;
  };
  const attack = (enemy, GameBoard, pos) => {
    const enemyName = enemy.getName();
    if (enemyName === "user") {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      let pos = [x, y];
      let checkLegal = isAttackLegal(enemyName, pos);
      if (checkLegal === true) {
        computerAttacks.push(pos);
        GameBoard.receiveAttack(pos);
      } else {
        attack(enemy, GameBoard);
      }
    } else {
      let checkLegal = isAttackLegal(enemyName, pos);
      if (checkLegal === true) {
        userAttacks.push(pos);
        GameBoard.receiveAttack(pos);
      } else {
        return false;
      }
    }
  };
  return {
    getName,
    isAttackLegal,
    attack
  };
};


/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlayerShips: () => (/* binding */ PlayerShips),
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
const PlayerShips = () => {
  let ships = {
    carrier: {
      length: 5,
      hits: 0,
      destroyed: false,
      coordinates: []
    },
    battleship: {
      length: 4,
      hits: 0,
      destroyed: false,
      coordinates: []
    },
    destroyer: {
      length: 3,
      hits: 0,
      destroyed: false,
      coordinates: []
    },
    submarine: {
      length: 3,
      hits: 0,
      destroyed: false,
      coordinates: []
    },
    patrolBoat: {
      length: 2,
      hits: 0,
      destroyed: false,
      coordinates: []
    }
  };
  const getShips = () => ships;
  const addShipCoordinates = array => {
    let copy = array.slice();
    for (let key in ships) {
      let shipArray = ships[key].coordinates;
      let arr = copy.shift();
      for (let i = 0; i < arr.length; i++) {
        shipArray.push(arr[i]);
      }
    }
  };
  return {
    getShips,
    addShipCoordinates
  };
};
const Ship = () => {
  const placeShips = (board, ships) => {
    for (let key in ships) {
      let array = ships[key].coordinates;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const x = element[0];
        const y = element[1];
        board[x][y] = 1;
      }
    }
  };
  const isSunk = ship => {
    const shipLength = ship.length;
    const hitsCount = ship.hits;

    // check ship length and no of times its been hit
    return shipLength === hitsCount ? true : false;
  };
  const hit = ship => {
    ship.hits += 1;

    // After every hit, check if the ship is destroyed
    const checkShip = isSunk(ship);
    if (checkShip === true) {
      ship.destroyed = true;
    }
  };
  return {
    placeShips,
    hit
  };
};


/***/ }),

/***/ "./src/start-menu.js":
/*!***************************!*\
  !*** ./src/start-menu.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computerShipCoordinates: () => (/* binding */ computerShipCoordinates),
/* harmony export */   startMenu: () => (/* binding */ startMenu),
/* harmony export */   startMenuEventHandler: () => (/* binding */ startMenuEventHandler),
/* harmony export */   userShipsCoordinates: () => (/* binding */ userShipsCoordinates)
/* harmony export */ });
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _styles_startmenu_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/startmenu.css */ "./src/styles/startmenu.css");




const getStartScreenBoard = () => {
  const gameBoard = (0,_game_board__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();

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
let userShipsCoordinates = [];
let computerShipCoordinates = [];
let visited = [];
const isArrayInArray = (source, search) => {
  for (let i = 0; i < search.length; i++) {
    let searchEle = search[i];
    if (source.length === 0) return false;

    // Search for each "search array" element in the source array
    for (let j = 0; j < source.length; j++) {
      let sourceEle = source[j];
      if (searchEle[0] === sourceEle[0]) {
        return true;
      }
    }
  }
};
const getRandomPosition = length => {
  let valid = false;
  let pos;
  while (valid === false) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    pos = [x, y];
    if (x + length <= 10 && y + length <= 10) {
      valid = true;
    }
  }
  return pos;
};
const getLegalCombos = shipLength => {
  const legalCombos = [[[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]], [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0]]];
  const pos = getRandomPosition(shipLength);
  let coordinates = [];
  let set = legalCombos[0];
  let lengthDiff = set.length - shipLength;
  let arrayLength = set.length - 1 - lengthDiff;
  coordinates.push(pos);
  for (let i = 0; i < arrayLength; i++) {
    const values = set[i];
    let x = pos[0];
    let y = pos[1];
    let move = [x + values[0], y + values[1]];
    coordinates.push(move);
  }
  return coordinates;
};
const getComputerShips = () => {
  let length = 5;
  let repeatShip = 1;

  // Get coordinates for each ship
  while (length > 1) {
    let coordinates = getLegalCombos(length);
    let itemVisited = isArrayInArray(visited, coordinates);
    while (itemVisited === true) {
      coordinates = getLegalCombos(length);
      itemVisited = isArrayInArray(visited, coordinates);
    }
    computerShipCoordinates.push(coordinates);
    for (let i = 0; i < coordinates.length; i++) {
      visited.push(coordinates[i]);
    }
    if (length === 3 && repeatShip === 1) {
      repeatShip -= 1;
    } else {
      length -= 1;
    }
  }
};
const allShipsPlaced = () => {
  const port = document.querySelector(".port");
  const nodeList = port.childNodes;
  let ships = 0;
  for (let i = 0; i < nodeList.length; i++) {
    const element = nodeList[i];
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
    port.appendChild(btn);
  }
};
const isDropValid = (index, shipLength, nodeList) => {
  // If ship drop exceeds the bound of the board, return false
  if (index + shipLength > 10) {
    return false;
  }

  /* This checks if there is a ship to the immediate left of the 
  "drop ship", and stops execution if a placed ship is detected. */
  const checkBack = () => {
    let squareIndex = index - 1;
    let square = nodeList[squareIndex];
    if (square === undefined) {
      return false;
    }
    let squareClass = square.className;
    if (squareClass.includes("carrier") || squareClass.includes("battleship") || squareClass.includes("destroyer") || squareClass.includes("submarine") || squareClass.includes("patrol-boat")) {
      return false;
    } else {
      return true;
    }
  };

  /* This checks if there is a ship to the immediate right of the 
  "drop ship", and stops execution if a placed ship is detected. */
  const checkFront = () => {
    for (let i = 0; i < shipLength + 1; i++) {
      let squareIndex = index + i;
      let square = nodeList[squareIndex];
      if (square === undefined) {
        return true;
      }
      let squareClass = square.className;
      if (squareClass.includes("carrier") || squareClass.includes("battleship") || squareClass.includes("destroyer") || squareClass.includes("submarine") || squareClass.includes("patrol-boat")) {
        return false;
      }
    }
  };
  let backValid = checkBack();
  let frontValid = checkFront();
  if (backValid === false && frontValid === true) {
    return true;
  } else if (backValid === false && frontValid === false || backValid === true && frontValid === false) {
    return false;
  }
};
const startMenuEventHandler = () => {
  const mainSection = document.querySelector(".main-section");
  mainSection.addEventListener("dragstart", e => {
    let element = e.target.id;
    if (element === "carrier" || element === "battleship" || element === "destroyer" || element === "submarine" || element === "patrol-boat") {
      e.dataTransfer.setData("text/plain", element);
    } else {
      return;
    }
  });
  mainSection.addEventListener("dragover", e => {
    if (e.target.className === "table-cell") {
      e.target.style.backgroundColor = "aqua";
      e.preventDefault();
    }
  });
  mainSection.addEventListener("dragleave", e => {
    if (e.target.className === "table-cell") {
      e.target.style.backgroundColor = "";
    }
  });
  mainSection.addEventListener("drop", e => {
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
      const shipLength = parseInt(draggableElement.dataset.length);

      // This checks if the drop is valid
      let valid = isDropValid(y, shipLength, nodeList);
      let shipCoordinates = [];

      // If drop is not valid, stop execution
      if (valid === false) {
        nodeList[y].style.backgroundColor = "";
        return;
      } else {
        // This adds a visual indication where the ship is dropped
        for (let i = 0; i < shipLength; i++) {
          let index = y + i;
          nodeList[index].classList.add(draggableId);
          nodeList[index].style.backgroundColor = "aqua";
          shipCoordinates.push([x, index]);
        }
        const draggableParent = draggableElement.parentNode;
        draggableParent.textContent = "";
        e.dataTransfer.clearData();
        userShipsCoordinates.push(shipCoordinates);
        allShipsPlaced();
      }
    }
  });
  mainSection.addEventListener("click", e => {
    if (e.target.className === "start-btn") {
      mainSection.textContent = "";
      getComputerShips();
      (0,_battleship__WEBPACK_IMPORTED_MODULE_1__.gameMenu)();
      (0,_game__WEBPACK_IMPORTED_MODULE_2__.Game)();
      userShipsCoordinates.length = 0;
      computerShipCoordinates.length = 0;
      visited.length = 0;
    }
  });
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/gamemenu.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/gamemenu.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.user-container,
.computer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.user-battlefield,
.computer-battlefield {
  height: 350px;
  width: 350px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
}

.square {
  border: solid 1px grey;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ship-square {
  background-color: aquamarine;
}

.ship-missed {
  background-color: grey;
}

.ship-hit {
  background-color: red;
}

.square:hover {
  background-color: green;
}
`, "",{"version":3,"sources":["webpack://./src/styles/gamemenu.css"],"names":[],"mappings":"AAAA;;EAEE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,YAAY;EACZ,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB","sourcesContent":[".user-container,\n.computer-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.user-battlefield,\n.computer-battlefield {\n  height: 350px;\n  width: 350px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.square {\n  border: solid 1px grey;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.ship-square {\n  background-color: aquamarine;\n}\n\n.ship-missed {\n  background-color: grey;\n}\n\n.ship-hit {\n  background-color: red;\n}\n\n.square:hover {\n  background-color: green;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/global.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/global.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  font-size: 1rem;
  background-color: bisque;
}

.content {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 100px 1fr 150px;
}

.main-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
`, "",{"version":3,"sources":["webpack://./src/styles/global.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,wBAAwB;AAC1B;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  font-size: 1rem;\n  background-color: bisque;\n}\n\n.content {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-rows: 100px 1fr 150px;\n}\n\n.main-section {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/startmenu.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/startmenu.css ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.left-section {
  display: grid;
  justify-items: center;
  align-items: center;
}

.right-section {
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  justify-items: center;
  align-items: center;
}

.start-menu-table {
  height: 400px;
  width: 400px;
  display: grid;
}

tbody {
  width: 100%;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
}

.table-row {
  position: relative;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.table-cell {
  border: 1px solid gray;
  background-color: white;
}

.port {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.carrier-berth,
.battleship-berth,
.destroyer-berth,
.submarine-berth,
.patrol-boat-berth {
  height: 50px;
  display: flex;
  align-items: center;
}

#carrier {
  width: 200px;
}

#battleship {
  width: 160px;
}

#destroyer {
  width: 120px;
}

#submarine {
  width: 120px;
}

#patrol-boat {
  width: 80px;
}

#carrier,
#battleship,
#destroyer,
#submarine,
#patrol-boat {
  height: 35px;
  background-color: lightblue;
  border: 1px solid skyblue;
}

.start-btn {
  position: absolute;
  height: 100px;
  width: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
`, "",{"version":3,"sources":["webpack://./src/styles/startmenu.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,+BAA+B;EAC/B,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;;;;;EAKE,YAAY;EACZ,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;;;;;EAKE,YAAY;EACZ,2BAA2B;EAC3B,yBAAyB;AAC3B;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB","sourcesContent":[".left-section {\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n.right-section {\n  display: grid;\n  grid-template-rows: 1fr 3fr 1fr;\n  justify-items: center;\n  align-items: center;\n}\n\n.start-menu-table {\n  height: 400px;\n  width: 400px;\n  display: grid;\n}\n\ntbody {\n  width: 100%;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.table-row {\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.table-cell {\n  border: 1px solid gray;\n  background-color: white;\n}\n\n.port {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n\n.carrier-berth,\n.battleship-berth,\n.destroyer-berth,\n.submarine-berth,\n.patrol-boat-berth {\n  height: 50px;\n  display: flex;\n  align-items: center;\n}\n\n#carrier {\n  width: 200px;\n}\n\n#battleship {\n  width: 160px;\n}\n\n#destroyer {\n  width: 120px;\n}\n\n#submarine {\n  width: 120px;\n}\n\n#patrol-boat {\n  width: 80px;\n}\n\n#carrier,\n#battleship,\n#destroyer,\n#submarine,\n#patrol-boat {\n  height: 35px;\n  background-color: lightblue;\n  border: 1px solid skyblue;\n}\n\n.start-btn {\n  position: absolute;\n  height: 100px;\n  width: 200px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/gamemenu.css":
/*!*********************************!*\
  !*** ./src/styles/gamemenu.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_gamemenu_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./gamemenu.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/gamemenu.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_gamemenu_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_gamemenu_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_gamemenu_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_gamemenu_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/global.css":
/*!*******************************!*\
  !*** ./src/styles/global.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_global_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./global.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/global.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_global_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_global_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_global_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_global_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/startmenu.css":
/*!**********************************!*\
  !*** ./src/styles/startmenu.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_startmenu_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./startmenu.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/startmenu.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_startmenu_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_startmenu_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_startmenu_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_startmenu_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./src/layout.js");
/* harmony import */ var _start_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./start-menu */ "./src/start-menu.js");


const component = () => {
  (0,_layout__WEBPACK_IMPORTED_MODULE_0__.pageLayout)();
  (0,_start_menu__WEBPACK_IMPORTED_MODULE_1__.startMenu)();
  (0,_start_menu__WEBPACK_IMPORTED_MODULE_1__.startMenuEventHandler)();
};
component();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0FzQztBQUMwQjtBQUVoRSxNQUFNa0ssU0FBUyxHQUFHQSxDQUFBLEtBQU07RUFDdEJ0RyxtREFBVSxDQUFDLENBQUM7RUFFWnJGLHNEQUFTLENBQUMsQ0FBQztFQUVYMkssa0VBQXFCLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBQ0RnQixTQUFTLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9iYXR0bGVzaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS1ib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0YXJ0LW1lbnUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2FtZW1lbnUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2dsb2JhbC5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3RhcnRtZW51LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2FtZW1lbnUuY3NzPzI1OTMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzcz9mMGQ4Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0YXJ0bWVudS5jc3M/MTJiMCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RhcnRNZW51IH0gZnJvbSBcIi4vc3RhcnQtbWVudVwiO1xuaW1wb3J0IHsgcGxheVJvdW5kIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgdXNlckF0dGFja3MsIGNvbXB1dGVyQXR0YWNrcyB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFwiLi9zdHlsZXMvZ2FtZW1lbnUuY3NzXCI7XG5cbmNvbnN0IGdhbWVNZW51ID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcblxuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gIGNvbnN0IGNvbnRhaW5lck9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGNvbnRhaW5lclR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZWZpZWxkT25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZE9uZVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRUd29QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgY29udGFpbmVyT25lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLWNvbnRhaW5lclwiKTtcbiAgY29udGFpbmVyVHdvLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1jb250YWluZXJcIik7XG4gIGJhdHRsZWZpZWxkT25lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLWJhdHRsZWZpZWxkXCIpO1xuICBiYXR0bGVmaWVsZFR3by5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYmF0dGxlZmllbGRcIik7XG4gIGJhdHRsZWZpZWxkT25lUGFyYS50ZXh0Q29udGVudCA9IFwiUGxheWVyIEJvYXJkXCI7XG4gIGJhdHRsZWZpZWxkVHdvUGFyYS50ZXh0Q29udGVudCA9IFwiQUkgQm9hcmRcIjtcblxuICBjb250YWluZXJPbmUuYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRPbmUpO1xuICBjb250YWluZXJUd28uYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRUd28pO1xuICBjb250YWluZXJPbmUuYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRPbmVQYXJhKTtcbiAgY29udGFpbmVyVHdvLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkVHdvUGFyYSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJPbmUpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVHdvKTtcbn07XG5cbmNvbnN0IHJlbmRlckJvYXJkcyA9ICgpID0+IHtcbiAgY29uc3QgdXNlckJhdHRsZWZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWJhdHRsZWZpZWxkXCIpO1xuICBjb25zdCBjb21wdXRlckJhdHRsZWZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci1iYXR0bGVmaWVsZFwiKTtcblxuICAvLyBSZW5kZXIgdXNlciBnYW1lIGJvYXJkXG4gIGNvbnN0IHJlbmRlclVzZXJCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgIHVzZXJCYXR0bGVmaWVsZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bi5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICAgIGlmIChkYXRhID09PSAxKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLXNxdWFyZVwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAyKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW1pc3NlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAzKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVzZXJCYXR0bGVmaWVsZC5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBSZW5kZXIgY29tcHV0ZXIgZ2FtZSBib2FyZFxuICBjb25zdCByZW5kZXJDb21wdXRlckJvYXJkID0gKGJvYXJkKSA9PiB7XG4gICAgY29tcHV0ZXJCYXR0bGVmaWVsZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bi5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICAgIGlmIChkYXRhID09PSAyKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW1pc3NlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAzKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXB1dGVyQmF0dGxlZmllbGQuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiB7IHJlbmRlclVzZXJCb2FyZCwgcmVuZGVyQ29tcHV0ZXJCb2FyZCB9O1xufTtcblxuY29uc3QgZ2FtZVdpbm5lciA9ICh3aW5uZXIpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItY29udGFpbmVyXCIpO1xuICBjb25zdCB3aW5uZXJBbm5vdW5jZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIHdpbm5lckFubm91bmNlci5jbGFzc0xpc3QuYWRkKFwid2lubmVyXCIpO1xuICB3aW5uZXJBbm5vdW5jZXIudGV4dENvbnRlbnQgPSB3aW5uZXI7XG4gIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc3RhcnQtYnV0dG9uXCIpO1xuICByZXN0YXJ0QnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZW1hdGNoXCI7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdpbm5lckFubm91bmNlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN0YXJ0QnV0dG9uKTtcbn07XG5cbmNvbnN0IGdhbWVNZW51RXZlbnRIYW5kbGVyID0gKCkgPT4ge1xuICBjb25zdCBtYWluU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xuICBjb25zdCB3aW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1jb250YWluZXJcIik7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKHdpbm5lckNvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInNxdWFyZVwiKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IGRhdGEgPSBzcXVhcmUuZGF0YXNldC5wb3M7XG4gICAgICBjb25zdCBhcnJheSA9IGRhdGEuc3BsaXQoXCIsXCIpO1xuICAgICAgY29uc3QgcG9zID0gW3BhcnNlSW50KGFycmF5WzBdKSwgcGFyc2VJbnQoYXJyYXlbMV0pXTtcblxuICAgICAgcGxheVJvdW5kKHBvcyk7XG4gICAgfVxuICB9KTtcblxuICB3aW5uZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKChlLnRhcmdldC5jbGFzc05hbWUgPSBcInJlc3RhcnQtYnV0dG9uXCIpKSB7XG4gICAgICBtYWluU2VjdGlvbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICB3aW5uZXJDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAvLyBFbXB0eSBhdHRhY2tlZCBzcXVhcmVzIGhpc3RvcnlcbiAgICAgIHVzZXJBdHRhY2tzLmxlbmd0aCA9IDA7XG4gICAgICBjb21wdXRlckF0dGFja3MubGVuZ3RoID0gMDtcblxuICAgICAgLy8gU3RhcnQgbmV3IGdhbWVcbiAgICAgIHN0YXJ0TWVudSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBnYW1lTWVudSwgcmVuZGVyQm9hcmRzLCBnYW1lV2lubmVyLCBnYW1lTWVudUV2ZW50SGFuZGxlciB9O1xuIiwiaW1wb3J0IHsgUGxheWVyU2hpcHMsIFNoaXAgfSBmcm9tIFwiLi9zaGlwc1wiO1xuXG5jb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGxldCBib2FyZCA9IFtdO1xuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBib2FyZFtpXVtqXSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgcGxheWVyU2hpcHMgPSBQbGF5ZXJTaGlwcygpO1xuICBjb25zdCBzaGlwcyA9IHBsYXllclNoaXBzLmdldFNoaXBzKCk7XG5cbiAgY29uc3QgcG9wdWxhdGVCb2FyZCA9IChhcnJheSkgPT4ge1xuICAgIHBsYXllclNoaXBzLmFkZFNoaXBDb29yZGluYXRlcyhhcnJheSk7XG5cbiAgICAvLyBQbGFjZSBhbGwgc2hpcHMgb250byB0aGUgYm9hcmRcbiAgICBTaGlwKCkucGxhY2VTaGlwcyhib2FyZCwgc2hpcHMpO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRBdHRhY2tlZFNoaXAgPSAocG9zKSA9PiB7XG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBjb25zdCBhcnJheSA9IHNoaXBzW2tleV0uY29vcmRpbmF0ZXM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2ldO1xuXG4gICAgICAgIGlmIChlbGVtZW50WzBdID09PSBwb3NbMF0gJiYgZWxlbWVudFsxXSA9PT0gcG9zWzFdKSB7XG4gICAgICAgICAgcmV0dXJuIHNoaXBzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChwb3MpID0+IHtcbiAgICBsZXQgeCA9IHBvc1swXTtcbiAgICBsZXQgeSA9IHBvc1sxXTtcblxuICAgIGlmIChib2FyZFt4XVt5XSA9PT0gMSkge1xuICAgICAgY29uc3QgYXR0YWNrZWRTaGlwID0gZmluZEF0dGFja2VkU2hpcChwb3MpO1xuXG4gICAgICAvLyBNYXJrIGJvYXJkIHBvc2l0aW9uIGFzIGF0dGFja2VkXG4gICAgICBib2FyZFt4XVt5XSA9IDM7XG5cbiAgICAgIC8vIEFkZCBoaXQgY291bnQgdG8gYXR0YWNrZWQgc2hpcFxuICAgICAgU2hpcCgpLmhpdChhdHRhY2tlZFNoaXApO1xuICAgIH0gZWxzZSBpZiAoYm9hcmRbeF1beV0gPT09IDApIHtcbiAgICAgIC8vIE1hcmsgYm9hcmQgcG9zaXRpb24gYXMgYXR0YWNrZWRcbiAgICAgIGJvYXJkW3hdW3ldID0gMjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWxsU2hpcHNEZXN0cm95ZWQgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcblxuICAgIGZvciAobGV0IGtleSBpbiBzaGlwcykge1xuICAgICAgY29uc3Qgc2hpcFN0YXRlID0gc2hpcHNba2V5XS5kZXN0cm95ZWQ7XG5cbiAgICAgIGlmIChzaGlwU3RhdGUgPT09IHRydWUpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY291bnQgPT09IDUgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVCb2FyZCxcbiAgICBnZXRCb2FyZCxcbiAgICBwb3B1bGF0ZUJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU2hpcHNEZXN0cm95ZWQsXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgUGxheWVyU2hpcHMgfSBmcm9tIFwiLi9zaGlwc1wiO1xuaW1wb3J0IHsgcmVuZGVyQm9hcmRzLCBnYW1lV2lubmVyLCBnYW1lTWVudUV2ZW50SGFuZGxlciB9IGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcbmltcG9ydCB7IHVzZXJTaGlwc0Nvb3JkaW5hdGVzLCBjb21wdXRlclNoaXBDb29yZGluYXRlcyB9IGZyb20gXCIuL3N0YXJ0LW1lbnVcIjtcblxubGV0IHVzZXJHYW1lQm9hcmQ7XG5sZXQgY29tcHV0ZXJHYW1lQm9hcmQ7XG5sZXQgdXNlcjtcbmxldCBjb21wdXRlcjtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgLy8gQ3JlYXRlIFBsYXllciBvYmplY3RzIGFuZCBHYW1lQm9hcmQgb2JqZWN0cyBmb3IgZWFjaCBwbGF5ZXJcbiAgdXNlciA9IFBsYXllcihcInVzZXJcIik7XG4gIGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXIgQUlcIik7XG5cbiAgdXNlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBjb21wdXRlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuXG4gIC8vIENyZWF0ZSBuZXcgYm9hcmRzIGZvciBlYWNoIHBsYXllclxuICB1c2VyR2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG5cbiAgLy8gUG9wdWxhdGUgcGxheWVyIGJvYXJkcyB3aXRoIHNoaXBzXG4gIHVzZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCh1c2VyU2hpcHNDb29yZGluYXRlcyk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQoY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gIC8vICAgR2V0IHBsYXllciBib2FyZHMgZnJvbSBHYW1lQm9hcmQgb2JqZWN0c1xuICBjb25zdCB1c2VyQm9hcmQgPSB1c2VyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuXG4gIC8vIEluaXRpYWwgcGxheWVyIGJvYXJkcyBhcmUgcmVuZGVyZWRcbiAgcmVuZGVyQm9hcmRzKCkucmVuZGVyVXNlckJvYXJkKHVzZXJCb2FyZCk7XG4gIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoY29tcHV0ZXJCb2FyZCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBldmVudCBoYW5kbGVyXG4gIGdhbWVNZW51RXZlbnRIYW5kbGVyKCk7XG59O1xuXG5jb25zdCBwbGF5Um91bmQgPSAocG9zKSA9PiB7XG4gIGxldCB1c2VyQXR0YWNrcyA9IHVzZXIuYXR0YWNrKGNvbXB1dGVyLCBjb21wdXRlckdhbWVCb2FyZCwgcG9zKTtcblxuICBpZiAodXNlckF0dGFja3MgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIC8vIFVwZGF0ZSBjb21wdXRlciBib2FyZCBvbiB0aGUgc2NyZWVuXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gICAgcmVuZGVyQm9hcmRzKCkucmVuZGVyQ29tcHV0ZXJCb2FyZChjb21wdXRlckJvYXJkKTtcblxuICAgIC8vIENoZWNrIGlmIGFsbCBjb21wdXRlciBzaGlwcyBhcmUgZGVzdHJveWVkXG4gICAgaWYgKGNvbXB1dGVyR2FtZUJvYXJkLmFsbFNoaXBzRGVzdHJveWVkKCkgPT09IHRydWUpIHtcbiAgICAgIGdhbWVXaW5uZXIoXCJZb3UgV2luIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyAvLyBDb21wdXRlciBhdHRhY2tzIHRoZSB1c2VyIDIwMCBzZWNvbmRzIGFmdGVyIGJlaW5nIGF0dGFja2VkXG4gICAgLy8gY29uc3QgbXlQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAvLyAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgICByZXNvbHZlKGNvbXB1dGVyLmF0dGFjayh1c2VyLCB1c2VyR2FtZUJvYXJkLCBwb3MpKTtcbiAgICAvLyAgIH0sIDIwMCk7XG4gICAgLy8gfSkudGhlbigoKSA9PiB7XG4gICAgY29tcHV0ZXIuYXR0YWNrKHVzZXIsIHVzZXJHYW1lQm9hcmQsIHBvcyk7XG4gICAgLy8gVXBkYXRlIHVzZXIgYm9hcmQgb24gdGhlIHNjcmVlblxuICAgIGNvbnN0IHVzZXJCb2FyZCA9IHVzZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICByZW5kZXJCb2FyZHMoKS5yZW5kZXJVc2VyQm9hcmQodXNlckJvYXJkKTtcblxuICAgIC8vIENoZWNrIGlmIGFsbCB1c2VyIHNoaXBzIGFyZSBkZXN0cm95ZWRcbiAgICBpZiAodXNlckdhbWVCb2FyZC5hbGxTaGlwc0Rlc3Ryb3llZCgpID09PSB0cnVlKSB7XG4gICAgICBnYW1lV2lubmVyKFwiQ29tcHV0ZXIgV2lucyFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBHYW1lLCBwbGF5Um91bmQgfTtcblxuLy8gLy8gQ3JlYXRlIFBsYXllciBvYmplY3RzIGFuZCBHYW1lQm9hcmQgb2JqZWN0cyBmb3IgZWFjaCBwbGF5ZXJcbi8vIHVzZXIgPSBQbGF5ZXIoXCJ1c2VyXCIpO1xuLy8gY29tcHV0ZXIgPSBQbGF5ZXIoXCJjb21wdXRlciBBSVwiKTtcblxuLy8gdXNlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuLy8gY29tcHV0ZXJHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcblxuLy8gLy8gQ3JlYXRlIG5ldyBib2FyZHMgZm9yIGVhY2ggcGxheWVyXG4vLyB1c2VyR2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4vLyBjb21wdXRlckdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4vLyAvLyBBZGQgc2hpcCBjb29yZGluYXRlcyBhbmQgcG9wdWxhdGUgdXNlciBib2FyZCB3aXRoIHNoaXBzXG4vLyBjb25zdCB1c2VyUGxheWVyU2hpcHMgPSBQbGF5ZXJTaGlwcygpO1xuLy8gY29uc3QgY29tcHV0ZXJQbGF5ZXJTaGlwcyA9IFBsYXllclNoaXBzKCk7XG5cbi8vIHVzZXJQbGF5ZXJTaGlwcy5hZGRTaGlwQ29vcmRpbmF0ZXModXNlclNoaXBzQ29vcmRpbmF0ZXMpO1xuLy8gY29tcHV0ZXJQbGF5ZXJTaGlwcy5hZGRTaGlwQ29vcmRpbmF0ZXMoY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMpO1xuXG4vLyBjb25zdCB1c2VyU2hpcHMgPSB1c2VyUGxheWVyU2hpcHMuZ2V0U2hpcHMoKTtcbi8vIGNvbnN0IGNvbXB1dGVyU2hpcHMgPSBjb21wdXRlclBsYXllclNoaXBzLmdldFNoaXBzKCk7XG5cbi8vIHVzZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCh1c2VyU2hpcHMpO1xuLy8gY29tcHV0ZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZChjb21wdXRlclNoaXBzKTtcbi8vIC8vIHVzZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCgpO1xuXG4vLyAvLyAvLyBVcGRhdGUgc2hpcCBjb29yZGluYXRlcyBhbmQgcG9wdWxhdGUgY29tcHV0ZXIgYm9hcmQgd2l0aCBzaGlwc1xuLy8gLy8gU2hpcC51cGRhdGVTaGlwQ29vcmRpbmF0ZXMoY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMpO1xuLy8gLy8gY29tcHV0ZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCgpO1xuXG4vLyAvLyAgIEdldCBwbGF5ZXIgYm9hcmRzIGZyb20gR2FtZUJvYXJkIG9iamVjdHNcbi8vIGNvbnN0IHVzZXJCb2FyZCA9IHVzZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbi8vIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuXG4vLyAvLyBJbml0aWFsIHBsYXllciBib2FyZHMgYXJlIHJlbmRlcmVkXG4vLyByZW5kZXJCb2FyZHMoKS5yZW5kZXJVc2VyQm9hcmQodXNlckJvYXJkKTtcbi8vIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoY29tcHV0ZXJCb2FyZCk7XG5cbi8vIGdhbWVNZW51RXZlbnRIYW5kbGVyKCk7XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy9nbG9iYWwuY3NzXCI7XG5cbmNvbnN0IHBhZ2VMYXlvdXQgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICBjb25zdCB3aW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBsb2dvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgbG9nbyA9IG5ldyBJbWFnZSgpO1xuXG4gIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xuICBtYWluLmNsYXNzTGlzdC5hZGQoXCJtYWluLXNlY3Rpb25cIik7XG4gIGZvb3Rlci5jbGFzc0xpc3QuYWRkKFwiZm9vdGVyXCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG5cbiAgd2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3aW5uZXItY29udGFpbmVyXCIpO1xuICBsb2dvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJsb2dvLWNvbnRhaW5lclwiKTtcbiAgbG9nby5hbHQgPSBcIlN1Ym1hcmluZSBsb2dvXCI7XG5cbiAgbG9nb0NvbnRhaW5lci5hcHBlbmRDaGlsZChsb2dvKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGxvZ29Db250YWluZXIpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQod2lubmVyQ29udGFpbmVyKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKG1haW4pO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGZvb3Rlcik7XG59O1xuXG5leHBvcnQgeyBwYWdlTGF5b3V0IH07XG4iLCJsZXQgdXNlckF0dGFja3MgPSBbXTtcbmxldCBjb21wdXRlckF0dGFja3MgPSBbXTtcblxuY29uc3QgUGxheWVyID0gKG5hbWUpID0+IHtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgY29uc3QgaXNBdHRhY2tMZWdhbCA9IChlbmVteSwgcG9zKSA9PiB7XG4gICAgbGV0IGFycmF5O1xuXG4gICAgaWYgKGVuZW15ID09PSBcInVzZXJcIikge1xuICAgICAgYXJyYXkgPSBjb21wdXRlckF0dGFja3Muc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXkgPSB1c2VyQXR0YWNrcy5zbGljZSgpO1xuICAgIH1cblxuICAgIHdoaWxlIChhcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheS5zaGlmdCgpO1xuICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHBvc1swXSAmJiBlbGVtZW50WzFdID09PSBwb3NbMV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIEdhbWVCb2FyZCwgcG9zKSA9PiB7XG4gICAgY29uc3QgZW5lbXlOYW1lID0gZW5lbXkuZ2V0TmFtZSgpO1xuXG4gICAgaWYgKGVuZW15TmFtZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBsZXQgcG9zID0gW3gsIHldO1xuXG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb21wdXRlckF0dGFja3MucHVzaChwb3MpO1xuICAgICAgICBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXR0YWNrKGVuZW15LCBHYW1lQm9hcmQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB1c2VyQXR0YWNrcy5wdXNoKHBvcyk7XG4gICAgICAgIEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGdldE5hbWUsIGlzQXR0YWNrTGVnYWwsIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyLCB1c2VyQXR0YWNrcywgY29tcHV0ZXJBdHRhY2tzIH07XG4iLCJjb25zdCBQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgbGV0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IHtcbiAgICAgIGxlbmd0aDogNSxcbiAgICAgIGhpdHM6IDAsXG4gICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgY29vcmRpbmF0ZXM6IFtdLFxuICAgIH0sXG5cbiAgICBiYXR0bGVzaGlwOiB7XG4gICAgICBsZW5ndGg6IDQsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgZGVzdHJveWVyOiB7XG4gICAgICBsZW5ndGg6IDMsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgc3VibWFyaW5lOiB7XG4gICAgICBsZW5ndGg6IDMsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgcGF0cm9sQm9hdDoge1xuICAgICAgbGVuZ3RoOiAyLFxuICAgICAgaGl0czogMCxcbiAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgICBjb29yZGluYXRlczogW10sXG4gICAgfSxcbiAgfTtcbiAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBzaGlwcztcblxuICBjb25zdCBhZGRTaGlwQ29vcmRpbmF0ZXMgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgY29weSA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGxldCBzaGlwQXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuICAgICAgbGV0IGFyciA9IGNvcHkuc2hpZnQoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2hpcEFycmF5LnB1c2goYXJyW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0U2hpcHMsIGFkZFNoaXBDb29yZGluYXRlcyB9O1xufTtcblxuY29uc3QgU2hpcCA9ICgpID0+IHtcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChib2FyZCwgc2hpcHMpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGxldCBhcnJheSA9IHNoaXBzW2tleV0uY29vcmRpbmF0ZXM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2ldO1xuICAgICAgICBjb25zdCB4ID0gZWxlbWVudFswXTtcbiAgICAgICAgY29uc3QgeSA9IGVsZW1lbnRbMV07XG5cbiAgICAgICAgYm9hcmRbeF1beV0gPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoc2hpcCkgPT4ge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICBjb25zdCBoaXRzQ291bnQgPSBzaGlwLmhpdHM7XG5cbiAgICAvLyBjaGVjayBzaGlwIGxlbmd0aCBhbmQgbm8gb2YgdGltZXMgaXRzIGJlZW4gaGl0XG4gICAgcmV0dXJuIHNoaXBMZW5ndGggPT09IGhpdHNDb3VudCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0cyArPSAxO1xuXG4gICAgLy8gQWZ0ZXIgZXZlcnkgaGl0LCBjaGVjayBpZiB0aGUgc2hpcCBpcyBkZXN0cm95ZWRcbiAgICBjb25zdCBjaGVja1NoaXAgPSBpc1N1bmsoc2hpcCk7XG5cbiAgICBpZiAoY2hlY2tTaGlwID09PSB0cnVlKSB7XG4gICAgICBzaGlwLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IHBsYWNlU2hpcHMsIGhpdCB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyU2hpcHMsIFNoaXAgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCB7IGdhbWVNZW51IH0gZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0YXJ0bWVudS5jc3NcIjtcblxuY29uc3QgZ2V0U3RhcnRTY3JlZW5Cb2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvYXJkXG4gIGdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2FtZUJvYXJkLmdldEJvYXJkKCk7XG5cbiAgcmV0dXJuIGJvYXJkO1xufTtcblxuY29uc3Qgc3RhcnRNZW51ID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcbiAgY29uc3QgbGVmdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCByaWdodFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY2FycmllckJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlc2hpcEJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZGVzdHJveWVyQmVydGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzdWJtYXJpbmVCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHBhdHJvbEJvYXRCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgbGVmdFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImxlZnQtc2VjdGlvblwiKTtcbiAgcmlnaHRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJyaWdodC1zZWN0aW9uXCIpO1xuICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwic3RhcnQtbWVudS10YWJsZVwiKTtcbiAgcGFyYS5jbGFzc0xpc3QuYWRkKFwic3RhcnQtbWVudS1wYXJhXCIpO1xuICBwYXJhLnRleHRDb250ZW50ID0gXCJQbGFjZSB5b3VyIHNoaXBzIG9uIHRoZSBncmlkXCI7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3J0XCIpO1xuICBjYXJyaWVyQmVydGguY2xhc3NMaXN0LmFkZChcImNhcnJpZXItYmVydGhcIik7XG4gIGJhdHRsZXNoaXBCZXJ0aC5jbGFzc0xpc3QuYWRkKFwiYmF0dGxlc2hpcC1iZXJ0aFwiKTtcbiAgZGVzdHJveWVyQmVydGguY2xhc3NMaXN0LmFkZChcImRlc3Ryb3llci1iZXJ0aFwiKTtcbiAgc3VibWFyaW5lQmVydGguY2xhc3NMaXN0LmFkZChcInN1Ym1hcmluZS1iZXJ0aFwiKTtcbiAgcGF0cm9sQm9hdEJlcnRoLmNsYXNzTGlzdC5hZGQoXCJwYXRyb2wtYm9hdC1iZXJ0aFwiKTtcbiAgY2Fycmllci5pZCA9IFwiY2FycmllclwiO1xuICBjYXJyaWVyLmRhdGFzZXQubGVuZ3RoID0gNTtcbiAgY2Fycmllci5kcmFnZ2FibGUgPSB0cnVlO1xuICBjYXJyaWVyLnRleHRDb250ZW50ID0gXCJDYXJyaWVyXCI7XG4gIGJhdHRsZXNoaXAuaWQgPSBcImJhdHRsZXNoaXBcIjtcbiAgYmF0dGxlc2hpcC5kYXRhc2V0Lmxlbmd0aCA9IDQ7XG4gIGJhdHRsZXNoaXAuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgYmF0dGxlc2hpcC50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICBkZXN0cm95ZXIuaWQgPSBcImRlc3Ryb3llclwiO1xuICBkZXN0cm95ZXIuZGF0YXNldC5sZW5ndGggPSAzO1xuICBkZXN0cm95ZXIuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgZGVzdHJveWVyLnRleHRDb250ZW50ID0gXCJEZXN0cm95ZXJcIjtcbiAgc3VibWFyaW5lLmlkID0gXCJzdWJtYXJpbmVcIjtcbiAgc3VibWFyaW5lLmRhdGFzZXQubGVuZ3RoID0gMztcbiAgc3VibWFyaW5lLmRyYWdnYWJsZSA9IHRydWU7XG4gIHN1Ym1hcmluZS50ZXh0Q29udGVudCA9IFwiU3VibWFyaW5lXCI7XG4gIHBhdHJvbEJvYXQuaWQgPSBcInBhdHJvbC1ib2F0XCI7XG4gIHBhdHJvbEJvYXQuZGF0YXNldC5sZW5ndGggPSAyO1xuICBwYXRyb2xCb2F0LmRyYWdnYWJsZSA9IHRydWU7XG4gIHBhdHJvbEJvYXQudGV4dENvbnRlbnQgPSBcIlBhdHJvbCBCb2F0XCI7XG4gIHJvdGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwicm90YXRlLWJ0blwiKTtcbiAgcm90YXRlQnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuICByb3RhdGVCdG4udGV4dENvbnRlbnQgPSBcIlJvdGF0ZVwiO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2V0U3RhcnRTY3JlZW5Cb2FyZCgpO1xuICAvLyBDcmVhdGUgYSBncmlkIG9mIHRhYmxlIHJvd3MgYW5kIHRhYmxlIGNlbGxzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0YWJsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAgIHRhYmxlUm93LmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1yb3dcIik7XG4gICAgdGFibGVSb3cuaWQgPSBgZHJvcHpvbmUtJHtpfWA7XG5cbiAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1jZWxsXCIpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRhYmxlUm93KTtcbiAgfVxuXG4gIGNhcnJpZXJCZXJ0aC5hcHBlbmRDaGlsZChjYXJyaWVyKTtcbiAgYmF0dGxlc2hpcEJlcnRoLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBkZXN0cm95ZXJCZXJ0aC5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzdWJtYXJpbmVCZXJ0aC5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBwYXRyb2xCb2F0QmVydGguYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcnJpZXJCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXBCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc3Ryb3llckJlcnRoKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lQmVydGgpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0QmVydGgpO1xuICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChwYXJhKTtcbiAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHNoaXBzQ29udGFpbmVyKTtcbiAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHJvdGF0ZUJ0bik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsZWZ0U2VjdGlvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyaWdodFNlY3Rpb24pO1xufTtcblxubGV0IHVzZXJTaGlwc0Nvb3JkaW5hdGVzID0gW107XG5sZXQgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbmxldCB2aXNpdGVkID0gW107XG5cbmNvbnN0IGlzQXJyYXlJbkFycmF5ID0gKHNvdXJjZSwgc2VhcmNoKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2VhcmNoLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHNlYXJjaEVsZSA9IHNlYXJjaFtpXTtcblxuICAgIGlmIChzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBTZWFyY2ggZm9yIGVhY2ggXCJzZWFyY2ggYXJyYXlcIiBlbGVtZW50IGluIHRoZSBzb3VyY2UgYXJyYXlcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNvdXJjZS5sZW5ndGg7IGorKykge1xuICAgICAgbGV0IHNvdXJjZUVsZSA9IHNvdXJjZVtqXTtcblxuICAgICAgaWYgKHNlYXJjaEVsZVswXSA9PT0gc291cmNlRWxlWzBdKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgZ2V0UmFuZG9tUG9zaXRpb24gPSAobGVuZ3RoKSA9PiB7XG4gIGxldCB2YWxpZCA9IGZhbHNlO1xuICBsZXQgcG9zO1xuXG4gIHdoaWxlICh2YWxpZCA9PT0gZmFsc2UpIHtcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBwb3MgPSBbeCwgeV07XG5cbiAgICBpZiAoeCArIGxlbmd0aCA8PSAxMCAmJiB5ICsgbGVuZ3RoIDw9IDEwKSB7XG4gICAgICB2YWxpZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBvcztcbn07XG5cbmNvbnN0IGdldExlZ2FsQ29tYm9zID0gKHNoaXBMZW5ndGgpID0+IHtcbiAgY29uc3QgbGVnYWxDb21ib3MgPSBbXG4gICAgW1xuICAgICAgWzAsIDFdLFxuICAgICAgWzAsIDJdLFxuICAgICAgWzAsIDNdLFxuICAgICAgWzAsIDRdLFxuICAgICAgWzAsIDVdLFxuICAgIF0sXG4gICAgW1xuICAgICAgWzEsIDBdLFxuICAgICAgWzIsIDBdLFxuICAgICAgWzMsIDBdLFxuICAgICAgWzQsIDBdLFxuICAgICAgWzUsIDBdLFxuICAgIF0sXG4gIF07XG4gIGNvbnN0IHBvcyA9IGdldFJhbmRvbVBvc2l0aW9uKHNoaXBMZW5ndGgpO1xuXG4gIGxldCBjb29yZGluYXRlcyA9IFtdO1xuICBsZXQgc2V0ID0gbGVnYWxDb21ib3NbMF07XG4gIGxldCBsZW5ndGhEaWZmID0gc2V0Lmxlbmd0aCAtIHNoaXBMZW5ndGg7XG4gIGxldCBhcnJheUxlbmd0aCA9IHNldC5sZW5ndGggLSAxIC0gbGVuZ3RoRGlmZjtcblxuICBjb29yZGluYXRlcy5wdXNoKHBvcyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdmFsdWVzID0gc2V0W2ldO1xuXG4gICAgbGV0IHggPSBwb3NbMF07XG4gICAgbGV0IHkgPSBwb3NbMV07XG4gICAgbGV0IG1vdmUgPSBbeCArIHZhbHVlc1swXSwgeSArIHZhbHVlc1sxXV07XG5cbiAgICBjb29yZGluYXRlcy5wdXNoKG1vdmUpO1xuICB9XG5cbiAgcmV0dXJuIGNvb3JkaW5hdGVzO1xufTtcblxuY29uc3QgZ2V0Q29tcHV0ZXJTaGlwcyA9ICgpID0+IHtcbiAgbGV0IGxlbmd0aCA9IDU7XG4gIGxldCByZXBlYXRTaGlwID0gMTtcblxuICAvLyBHZXQgY29vcmRpbmF0ZXMgZm9yIGVhY2ggc2hpcFxuICB3aGlsZSAobGVuZ3RoID4gMSkge1xuICAgIGxldCBjb29yZGluYXRlcyA9IGdldExlZ2FsQ29tYm9zKGxlbmd0aCk7XG4gICAgbGV0IGl0ZW1WaXNpdGVkID0gaXNBcnJheUluQXJyYXkodmlzaXRlZCwgY29vcmRpbmF0ZXMpO1xuXG4gICAgd2hpbGUgKGl0ZW1WaXNpdGVkID09PSB0cnVlKSB7XG4gICAgICBjb29yZGluYXRlcyA9IGdldExlZ2FsQ29tYm9zKGxlbmd0aCk7XG4gICAgICBpdGVtVmlzaXRlZCA9IGlzQXJyYXlJbkFycmF5KHZpc2l0ZWQsIGNvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICBjb21wdXRlclNoaXBDb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGVzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZpc2l0ZWQucHVzaChjb29yZGluYXRlc1tpXSk7XG4gICAgfVxuXG4gICAgaWYgKGxlbmd0aCA9PT0gMyAmJiByZXBlYXRTaGlwID09PSAxKSB7XG4gICAgICByZXBlYXRTaGlwIC09IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCAtPSAxO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgYWxsU2hpcHNQbGFjZWQgPSAoKSA9PiB7XG4gIGNvbnN0IHBvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcnRcIik7XG4gIGNvbnN0IG5vZGVMaXN0ID0gcG9ydC5jaGlsZE5vZGVzO1xuXG4gIGxldCBzaGlwcyA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBub2RlTGlzdFtpXTtcblxuICAgIGlmIChlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgc2hpcHMgKz0gMTtcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgXCJzdGFydC1nYW1lXCIgYnV0dG9uIHdoZW4gYWxsIHNoaXBzIGFyZSBwbGFjZWQgb24gdGhlIGJvYXJkXG4gIGlmIChzaGlwcyA9PT0gMCkge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBidG4uY2xhc3NMaXN0LmFkZChcInN0YXJ0LWJ0blwiKTtcbiAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCJTdGFydCBHYW1lXCI7XG5cbiAgICBwb3J0LmFwcGVuZENoaWxkKGJ0bik7XG4gIH1cbn07XG5cbmNvbnN0IGlzRHJvcFZhbGlkID0gKGluZGV4LCBzaGlwTGVuZ3RoLCBub2RlTGlzdCkgPT4ge1xuICAvLyBJZiBzaGlwIGRyb3AgZXhjZWVkcyB0aGUgYm91bmQgb2YgdGhlIGJvYXJkLCByZXR1cm4gZmFsc2VcbiAgaWYgKGluZGV4ICsgc2hpcExlbmd0aCA+IDEwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyogVGhpcyBjaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIHRvIHRoZSBpbW1lZGlhdGUgbGVmdCBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tCYWNrID0gKCkgPT4ge1xuICAgIGxldCBzcXVhcmVJbmRleCA9IGluZGV4IC0gMTtcbiAgICBsZXQgc3F1YXJlID0gbm9kZUxpc3Rbc3F1YXJlSW5kZXhdO1xuXG4gICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHNxdWFyZUNsYXNzID0gc3F1YXJlLmNsYXNzTmFtZTtcblxuICAgIGlmIChcbiAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJiYXR0bGVzaGlwXCIpIHx8XG4gICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImRlc3Ryb3llclwiKSB8fFxuICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwicGF0cm9sLWJvYXRcIilcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9O1xuXG4gIC8qIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCB0byB0aGUgaW1tZWRpYXRlIHJpZ2h0IG9mIHRoZSBcbiAgXCJkcm9wIHNoaXBcIiwgYW5kIHN0b3BzIGV4ZWN1dGlvbiBpZiBhIHBsYWNlZCBzaGlwIGlzIGRldGVjdGVkLiAqL1xuICBjb25zdCBjaGVja0Zyb250ID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aCArIDE7IGkrKykge1xuICAgICAgbGV0IHNxdWFyZUluZGV4ID0gaW5kZXggKyBpO1xuICAgICAgbGV0IHNxdWFyZSA9IG5vZGVMaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgbGV0IGJhY2tWYWxpZCA9IGNoZWNrQmFjaygpO1xuICBsZXQgZnJvbnRWYWxpZCA9IGNoZWNrRnJvbnQoKTtcblxuICBpZiAoYmFja1ZhbGlkID09PSBmYWxzZSAmJiBmcm9udFZhbGlkID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoXG4gICAgKGJhY2tWYWxpZCA9PT0gZmFsc2UgJiYgZnJvbnRWYWxpZCA9PT0gZmFsc2UpIHx8XG4gICAgKGJhY2tWYWxpZCA9PT0gdHJ1ZSAmJiBmcm9udFZhbGlkID09PSBmYWxzZSlcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBzdGFydE1lbnVFdmVudEhhbmRsZXIgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW5TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXNlY3Rpb25cIik7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQuaWQ7XG5cbiAgICBpZiAoXG4gICAgICBlbGVtZW50ID09PSBcImNhcnJpZXJcIiB8fFxuICAgICAgZWxlbWVudCA9PT0gXCJiYXR0bGVzaGlwXCIgfHxcbiAgICAgIGVsZW1lbnQgPT09IFwiZGVzdHJveWVyXCIgfHxcbiAgICAgIGVsZW1lbnQgPT09IFwic3VibWFyaW5lXCIgfHxcbiAgICAgIGVsZW1lbnQgPT09IFwicGF0cm9sLWJvYXRcIlxuICAgICkge1xuICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidGFibGUtY2VsbFwiKSB7XG4gICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImFxdWFcIjtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInRhYmxlLWNlbGxcIikge1xuICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJ0YWJsZS1jZWxsXCIpIHtcbiAgICAgIGNvbnN0IGRyb3B6b25lID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQgPSBkcm9wem9uZS5wYXJlbnROb2RlO1xuICAgICAgY29uc3Qgbm9kZUxpc3QgPSBwYXJlbnQuY2hpbGROb2RlcztcbiAgICAgIGNvbnN0IGRhdGEgPSBkcm9wem9uZS5kYXRhc2V0LnBvcztcbiAgICAgIGNvbnN0IGFycmF5ID0gZGF0YS5zcGxpdChcIixcIik7XG4gICAgICBjb25zdCB4ID0gcGFyc2VJbnQoYXJyYXlbMF0pO1xuICAgICAgY29uc3QgeSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUlkID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIik7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJhZ2dhYmxlSWQpO1xuICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IHBhcnNlSW50KGRyYWdnYWJsZUVsZW1lbnQuZGF0YXNldC5sZW5ndGgpO1xuXG4gICAgICAvLyBUaGlzIGNoZWNrcyBpZiB0aGUgZHJvcCBpcyB2YWxpZFxuICAgICAgbGV0IHZhbGlkID0gaXNEcm9wVmFsaWQoeSwgc2hpcExlbmd0aCwgbm9kZUxpc3QpO1xuICAgICAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgICAvLyBJZiBkcm9wIGlzIG5vdCB2YWxpZCwgc3RvcCBleGVjdXRpb25cbiAgICAgIGlmICh2YWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgbm9kZUxpc3RbeV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhpcyBhZGRzIGEgdmlzdWFsIGluZGljYXRpb24gd2hlcmUgdGhlIHNoaXAgaXMgZHJvcHBlZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBpbmRleCA9IHkgKyBpO1xuICAgICAgICAgIG5vZGVMaXN0W2luZGV4XS5jbGFzc0xpc3QuYWRkKGRyYWdnYWJsZUlkKTtcbiAgICAgICAgICBub2RlTGlzdFtpbmRleF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJhcXVhXCI7XG4gICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3gsIGluZGV4XSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVQYXJlbnQgPSBkcmFnZ2FibGVFbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIGRyYWdnYWJsZVBhcmVudC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuY2xlYXJEYXRhKCk7XG4gICAgICAgIHVzZXJTaGlwc0Nvb3JkaW5hdGVzLnB1c2goc2hpcENvb3JkaW5hdGVzKTtcbiAgICAgICAgYWxsU2hpcHNQbGFjZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwic3RhcnQtYnRuXCIpIHtcbiAgICAgIG1haW5TZWN0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgZ2V0Q29tcHV0ZXJTaGlwcygpO1xuICAgICAgZ2FtZU1lbnUoKTtcbiAgICAgIEdhbWUoKTtcblxuICAgICAgdXNlclNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoID0gMDtcbiAgICAgIGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzLmxlbmd0aCA9IDA7XG4gICAgICB2aXNpdGVkLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCB7XG4gIHN0YXJ0TWVudSxcbiAgdXNlclNoaXBzQ29vcmRpbmF0ZXMsXG4gIGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzLFxuICBzdGFydE1lbnVFdmVudEhhbmRsZXIsXG59O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC51c2VyLWNvbnRhaW5lcixcbi5jb21wdXRlci1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyMHB4O1xufVxuXG4udXNlci1iYXR0bGVmaWVsZCxcbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XG4gIGhlaWdodDogMzUwcHg7XG4gIHdpZHRoOiAzNTBweDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4uc3F1YXJlIHtcbiAgYm9yZGVyOiBzb2xpZCAxcHggZ3JleTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5zaGlwLXNxdWFyZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XG59XG5cbi5zaGlwLW1pc3NlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG5cbi5zaGlwLWhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLnNxdWFyZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2dhbWVtZW51LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7RUFFRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBOztFQUVFLGFBQWE7RUFDYixZQUFZO0VBQ1osYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnVzZXItY29udGFpbmVyLFxcbi5jb21wdXRlci1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi51c2VyLWJhdHRsZWZpZWxkLFxcbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XFxuICBoZWlnaHQ6IDM1MHB4O1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5zcXVhcmUge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggZ3JleTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zaGlwLXNxdWFyZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhbWFyaW5lO1xcbn1cXG5cXG4uc2hpcC1taXNzZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLnNoaXAtaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLnNxdWFyZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5ib2R5IHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XG59XG5cbi5jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxZnIgMTUwcHg7XG59XG5cbi5tYWluLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGFBQWE7RUFDYixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcXG59XFxuXFxuLmNvbnRlbnQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxZnIgMTUwcHg7XFxufVxcblxcbi5tYWluLXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAubGVmdC1zZWN0aW9uIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ucmlnaHQtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDNmciAxZnI7XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnN0YXJ0LW1lbnUtdGFibGUge1xuICBoZWlnaHQ6IDQwMHB4O1xuICB3aWR0aDogNDAwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG59XG5cbnRib2R5IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4udGFibGUtcm93IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLnRhYmxlLWNlbGwge1xuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLnBvcnQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNXB4O1xufVxuXG4uY2Fycmllci1iZXJ0aCxcbi5iYXR0bGVzaGlwLWJlcnRoLFxuLmRlc3Ryb3llci1iZXJ0aCxcbi5zdWJtYXJpbmUtYmVydGgsXG4ucGF0cm9sLWJvYXQtYmVydGgge1xuICBoZWlnaHQ6IDUwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbiNjYXJyaWVyIHtcbiAgd2lkdGg6IDIwMHB4O1xufVxuXG4jYmF0dGxlc2hpcCB7XG4gIHdpZHRoOiAxNjBweDtcbn1cblxuI2Rlc3Ryb3llciB7XG4gIHdpZHRoOiAxMjBweDtcbn1cblxuI3N1Ym1hcmluZSB7XG4gIHdpZHRoOiAxMjBweDtcbn1cblxuI3BhdHJvbC1ib2F0IHtcbiAgd2lkdGg6IDgwcHg7XG59XG5cbiNjYXJyaWVyLFxuI2JhdHRsZXNoaXAsXG4jZGVzdHJveWVyLFxuI3N1Ym1hcmluZSxcbiNwYXRyb2wtYm9hdCB7XG4gIGhlaWdodDogMzVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xuICBib3JkZXI6IDFweCBzb2xpZCBza3libHVlO1xufVxuXG4uc3RhcnQtYnRuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBoZWlnaHQ6IDEwMHB4O1xuICB3aWR0aDogMjAwcHg7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdGFydG1lbnUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsK0JBQStCO0VBQy9CLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixRQUFRO0FBQ1Y7O0FBRUE7Ozs7O0VBS0UsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7Ozs7O0VBS0UsWUFBWTtFQUNaLDJCQUEyQjtFQUMzQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFlBQVk7RUFDWixRQUFRO0VBQ1IsU0FBUztFQUNULGdDQUFnQztFQUNoQyxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubGVmdC1zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucmlnaHQtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgM2ZyIDFmcjtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydC1tZW51LXRhYmxlIHtcXG4gIGhlaWdodDogNDAwcHg7XFxuICB3aWR0aDogNDAwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG50Ym9keSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnRhYmxlLXJvdyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi50YWJsZS1jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLnBvcnQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG4uY2Fycmllci1iZXJ0aCxcXG4uYmF0dGxlc2hpcC1iZXJ0aCxcXG4uZGVzdHJveWVyLWJlcnRoLFxcbi5zdWJtYXJpbmUtYmVydGgsXFxuLnBhdHJvbC1ib2F0LWJlcnRoIHtcXG4gIGhlaWdodDogNTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jY2FycmllciB7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcblxcbiNiYXR0bGVzaGlwIHtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuXFxuI2Rlc3Ryb3llciB7XFxuICB3aWR0aDogMTIwcHg7XFxufVxcblxcbiNzdWJtYXJpbmUge1xcbiAgd2lkdGg6IDEyMHB4O1xcbn1cXG5cXG4jcGF0cm9sLWJvYXQge1xcbiAgd2lkdGg6IDgwcHg7XFxufVxcblxcbiNjYXJyaWVyLFxcbiNiYXR0bGVzaGlwLFxcbiNkZXN0cm95ZXIsXFxuI3N1Ym1hcmluZSxcXG4jcGF0cm9sLWJvYXQge1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgc2t5Ymx1ZTtcXG59XFxuXFxuLnN0YXJ0LWJ0biB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dhbWVtZW51LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2FtZW1lbnUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dsb2JhbC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dsb2JhbC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3RhcnRtZW51LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3RhcnRtZW51LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgcGFnZUxheW91dCB9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHsgc3RhcnRNZW51LCBzdGFydE1lbnVFdmVudEhhbmRsZXIgfSBmcm9tIFwiLi9zdGFydC1tZW51XCI7XG5cbmNvbnN0IGNvbXBvbmVudCA9ICgpID0+IHtcbiAgcGFnZUxheW91dCgpO1xuXG4gIHN0YXJ0TWVudSgpO1xuXG4gIHN0YXJ0TWVudUV2ZW50SGFuZGxlcigpO1xufTtcbmNvbXBvbmVudCgpO1xuIl0sIm5hbWVzIjpbInN0YXJ0TWVudSIsInBsYXlSb3VuZCIsInVzZXJBdHRhY2tzIiwiY29tcHV0ZXJBdHRhY2tzIiwiZ2FtZU1lbnUiLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsImNvbnRhaW5lck9uZSIsImNyZWF0ZUVsZW1lbnQiLCJjb250YWluZXJUd28iLCJiYXR0bGVmaWVsZE9uZSIsImJhdHRsZWZpZWxkVHdvIiwiYmF0dGxlZmllbGRPbmVQYXJhIiwiYmF0dGxlZmllbGRUd29QYXJhIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJCb2FyZHMiLCJ1c2VyQmF0dGxlZmllbGQiLCJjb21wdXRlckJhdHRsZWZpZWxkIiwicmVuZGVyVXNlckJvYXJkIiwiYm9hcmQiLCJpIiwibGVuZ3RoIiwicm93IiwiaiIsImJ0biIsImRhdGEiLCJ0eXBlIiwiZGF0YXNldCIsInBvcyIsInJlbmRlckNvbXB1dGVyQm9hcmQiLCJnYW1lV2lubmVyIiwid2lubmVyIiwid2lubmVyQW5ub3VuY2VyIiwicmVzdGFydEJ1dHRvbiIsImdhbWVNZW51RXZlbnRIYW5kbGVyIiwibWFpblNlY3Rpb24iLCJ3aW5uZXJDb250YWluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImhhc0NoaWxkTm9kZXMiLCJ0YXJnZXQiLCJjbGFzc05hbWUiLCJzcXVhcmUiLCJhcnJheSIsInNwbGl0IiwicGFyc2VJbnQiLCJQbGF5ZXJTaGlwcyIsIlNoaXAiLCJHYW1lQm9hcmQiLCJjcmVhdGVCb2FyZCIsImdldEJvYXJkIiwicGxheWVyU2hpcHMiLCJzaGlwcyIsImdldFNoaXBzIiwicG9wdWxhdGVCb2FyZCIsImFkZFNoaXBDb29yZGluYXRlcyIsInBsYWNlU2hpcHMiLCJmaW5kQXR0YWNrZWRTaGlwIiwia2V5IiwiY29vcmRpbmF0ZXMiLCJlbGVtZW50IiwicmVjZWl2ZUF0dGFjayIsIngiLCJ5IiwiYXR0YWNrZWRTaGlwIiwiaGl0IiwiYWxsU2hpcHNEZXN0cm95ZWQiLCJjb3VudCIsInNoaXBTdGF0ZSIsImRlc3Ryb3llZCIsIlBsYXllciIsInVzZXJTaGlwc0Nvb3JkaW5hdGVzIiwiY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMiLCJ1c2VyR2FtZUJvYXJkIiwiY29tcHV0ZXJHYW1lQm9hcmQiLCJ1c2VyIiwiY29tcHV0ZXIiLCJHYW1lIiwidXNlckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsImF0dGFjayIsInBhZ2VMYXlvdXQiLCJjb250ZW50IiwiaGVhZGVyIiwibWFpbiIsImZvb3RlciIsInRpdGxlIiwibG9nb0NvbnRhaW5lciIsImxvZ28iLCJJbWFnZSIsImFsdCIsIm5hbWUiLCJnZXROYW1lIiwiaXNBdHRhY2tMZWdhbCIsImVuZW15Iiwic2xpY2UiLCJzaGlmdCIsImVuZW15TmFtZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNoZWNrTGVnYWwiLCJwdXNoIiwiY2FycmllciIsImhpdHMiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsImNvcHkiLCJzaGlwQXJyYXkiLCJhcnIiLCJpc1N1bmsiLCJzaGlwIiwic2hpcExlbmd0aCIsImhpdHNDb3VudCIsImNoZWNrU2hpcCIsImdldFN0YXJ0U2NyZWVuQm9hcmQiLCJnYW1lQm9hcmQiLCJsZWZ0U2VjdGlvbiIsInJpZ2h0U2VjdGlvbiIsInRhYmxlIiwidGFibGVCb2R5IiwicGFyYSIsInNoaXBzQ29udGFpbmVyIiwiY2FycmllckJlcnRoIiwiYmF0dGxlc2hpcEJlcnRoIiwiZGVzdHJveWVyQmVydGgiLCJzdWJtYXJpbmVCZXJ0aCIsInBhdHJvbEJvYXRCZXJ0aCIsInJvdGF0ZUJ0biIsImlkIiwiZHJhZ2dhYmxlIiwidGFibGVSb3ciLCJjZWxsIiwidmlzaXRlZCIsImlzQXJyYXlJbkFycmF5Iiwic291cmNlIiwic2VhcmNoIiwic2VhcmNoRWxlIiwic291cmNlRWxlIiwiZ2V0UmFuZG9tUG9zaXRpb24iLCJ2YWxpZCIsImdldExlZ2FsQ29tYm9zIiwibGVnYWxDb21ib3MiLCJzZXQiLCJsZW5ndGhEaWZmIiwiYXJyYXlMZW5ndGgiLCJ2YWx1ZXMiLCJtb3ZlIiwiZ2V0Q29tcHV0ZXJTaGlwcyIsInJlcGVhdFNoaXAiLCJpdGVtVmlzaXRlZCIsImFsbFNoaXBzUGxhY2VkIiwicG9ydCIsIm5vZGVMaXN0IiwiY2hpbGROb2RlcyIsImlzRHJvcFZhbGlkIiwiaW5kZXgiLCJjaGVja0JhY2siLCJzcXVhcmVJbmRleCIsInVuZGVmaW5lZCIsInNxdWFyZUNsYXNzIiwiaW5jbHVkZXMiLCJjaGVja0Zyb250IiwiYmFja1ZhbGlkIiwiZnJvbnRWYWxpZCIsInN0YXJ0TWVudUV2ZW50SGFuZGxlciIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsInByZXZlbnREZWZhdWx0IiwiZHJvcHpvbmUiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwiZHJhZ2dhYmxlSWQiLCJnZXREYXRhIiwiZHJhZ2dhYmxlRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwic2hpcENvb3JkaW5hdGVzIiwiZHJhZ2dhYmxlUGFyZW50IiwiY2xlYXJEYXRhIiwiY29tcG9uZW50Il0sInNvdXJjZVJvb3QiOiIifQ==