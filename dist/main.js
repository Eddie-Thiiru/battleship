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
  para.classList.add("instructions");
  para.textContent = "Drag and drop ships";
  paraTwo.classList.add("instructions");
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
  rightSection.appendChild(paraTwo);
  rightSection.appendChild(shipsContainer);
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
      if (searchEle[0] === sourceEle[0] && searchEle[1] === sourceEle[1]) {
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
const getAdjCoordinates = coordinates => {
  let adjPositions = [];
  let orientation = "";
  let one = coordinates[0];
  let two = coordinates[1];

  // Check coordinates orientation
  if (one[0] === two[0] && one[1] !== two[1]) {
    orientation = "horizontal";
  } else if (one[0] !== two[0] && one[1] === two[1]) {
    orientation = "vertical";
  }
  if (orientation === "vertical") {
    for (let i = 0; i < coordinates.length; i++) {
      const element = coordinates[i];
      let adjLeft = [element[0], element[1] - 1];
      let adjRight = [element[0], element[1] + 1];
      if (adjLeft[1] >= 0 && adjLeft[1] <= 9) {
        adjPositions.push(adjLeft);
      }
      if (adjRight[1] >= 0 && adjRight[1] <= 9) {
        adjPositions.push(adjRight);
      }
      if (i === 0) {
        let adjTop = [element[0] - 1, element[1]];
        if (adjTop[0] >= 0 && adjTop[0] <= 9) {
          adjPositions.push(adjTop);
          let left = [adjTop[0], adjTop[1] - 1];
          let right = [adjTop[0], adjTop[1] + 1];
          if (left[1] >= 0 && left[1] <= 9) {
            adjPositions.push(left);
          }
          if (right[1] >= 0 && right[1] <= 9) {
            adjPositions.push(right);
          }
        }
      }
      if (coordinates.length - i === 1) {
        let adjBottom = [element[0] + 1, element[1]];
        if (adjBottom[0] >= 0 && adjBottom[0] <= 9) {
          adjPositions.push(adjBottom);
          let left = [adjBottom[0], adjBottom[1] - 1];
          let right = [adjBottom[0], adjBottom[1] + 1];
          if (left[1] >= 0 && left[1] <= 9) {
            adjPositions.push(left);
          }
          if (right[1] >= 0 && right[1] <= 9) {
            adjPositions.push(right);
          }
        }
      }
    }
    return adjPositions;
  }
  if (orientation === "horizontal") {
    for (let i = 0; i < coordinates.length; i++) {
      const element = coordinates[i];
      let adjTop = [element[0] - 1, element[1]];
      let adjBottom = [element[0] + 1, element[1]];
      if (adjTop[0] >= 0 && adjTop[0] <= 9) {
        adjPositions.push(adjTop);
      }
      if (adjBottom[0] >= 0 && adjBottom[0] <= 9) {
        adjPositions.push(adjBottom);
      }
      if (i === 0) {
        let adjLeft = [element[0], element[1] - 1];
        if (adjLeft[1] >= 0 && adjLeft[1] <= 9) {
          adjPositions.push(adjLeft);
          let top = [adjLeft[0] - 1, adjLeft[1]];
          let bottom = [adjLeft[0] + 1, adjLeft[1]];
          if (top[0] >= 0 && top[0] <= 9) {
            adjPositions.push(top);
          }
          if (bottom[0] >= 0 && bottom[0] <= 9) {
            adjPositions.push(bottom);
          }
        }
      }
      if (coordinates.length - i === 1) {
        let adjRight = [element[0], element[1] + 1];
        if (adjRight[1] >= 0 && adjRight[1] <= 9) {
          adjPositions.push(adjRight);
          let top = [adjRight[0] - 1, adjRight[1]];
          let bottom = [adjRight[0] + 1, adjRight[1]];
          if (top[0] >= 0 && top[0] <= 9) {
            adjPositions.push(top);
          }
          if (bottom[0] >= 0 && bottom[0] <= 9) {
            adjPositions.push(bottom);
          }
        }
      }
    }
    return adjPositions;
  }
};
const getLegalCombos = shipLength => {
  const legalCombos = [[[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]], [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0]]];
  const pos = getRandomPosition(shipLength);
  let coordinates = [];
  let set;
  if (shipLength % 2 === 0) {
    set = legalCombos[0];
  } else {
    set = legalCombos[1];
  }
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

    // Push coordinates to the visited array
    for (let i = 0; i < coordinates.length; i++) {
      let coordinate = coordinates[i];
      visited.push(coordinate);
    }
    const adjCoordinates = getAdjCoordinates(coordinates);

    // Push adjacent coordinates to the visited array
    for (let i = 0; i < adjCoordinates.length; i++) {
      let coordinate = adjCoordinates[i];
      visited.push(coordinate);
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
      if (squareClass.includes("carrier") || squareClass.includes("battleship") || squareClass.includes("destroyer") || squareClass.includes("submarine") || squareClass.includes("patrol-boat")) {
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
      if (squareClass.includes("carrier") || squareClass.includes("battleship") || squareClass.includes("destroyer") || squareClass.includes("submarine") || squareClass.includes("patrol-boat")) {
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
      if (squareClass.includes("carrier") || squareClass.includes("battleship") || squareClass.includes("destroyer") || squareClass.includes("submarine") || squareClass.includes("patrol-boat")) {
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
      if (squareClass.includes("carrier") || squareClass.includes("battleship") || squareClass.includes("destroyer") || squareClass.includes("submarine") || squareClass.includes("patrol-boat")) {
        return false;
      }
    }
    return true;
  };
  let topValid = checkTop();
  let rightValid = checkRight();
  let bottomValid = checkBottom();
  let leftValid = checkLeft();
  if (topValid === true && rightValid === true && bottomValid === true && leftValid === true) {
    return true;
  } else if (topValid === false || rightValid === false || bottomValid === false || leftValid === false) {
    return false;
  }
};
const startMenuEventHandler = () => {
  const mainSection = document.querySelector(".main-section");
  mainSection.addEventListener("dblclick", e => {
    let element = e.target;
    if (element.id === "carrier" || element.id === "battleship" || element.id === "destroyer" || element.id === "submarine" || element.id === "patrol-boat") {
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
  mainSection.addEventListener("dragstart", e => {
    let element = e.target.id;
    if (element === "carrier" || element === "battleship" || element === "destroyer" || element === "submarine" || element === "patrol-boat") {
      e.dataTransfer.setData("text/plain", element);
      if (e.target.className === "horizontal") {
        e.target.textContent = element;
      }
    } else {
      return;
    }
  });
  mainSection.addEventListener("dragend", e => {
    e.target.textContent = "";
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
            nodeList[index].style.backgroundColor = "aqua";
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
            list[y].style.backgroundColor = "aqua";
            shipCoordinates.push([index, y]);
          }
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
  grid-template-rows: 50px 50px 1fr;
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
  display: grid;
  grid-template-columns: min-content auto;
  grid-auto-rows: minmax(min-content, max-content);
  justify-content: center;
}

.carrier-berth,
.battleship-berth,
.destroyer-berth,
.submarine-berth,
.patrol-boat-berth {
  padding: 10px;
}

#carrier.horizontal {
  height: 35px;
  width: 200px;
}
#battleship.horizontal {
  height: 35px;
  width: 160px;
}

#destroyer.horizontal,
#submarine.horizontal {
  height: 35px;
  width: 120px;
}

#patrol-boat.horizontal {
  height: 35px;
  width: 80px;
}

#carrier.vertical {
  height: 200px;
  width: 35px;
}

#battleship.vertical {
  height: 160px;
  width: 35px;
}

#destroyer.vertical,
#submarine.vertical {
  height: 120px;
  width: 35px;
}

#patrol-boat.vertical {
  height: 80px;
  width: 35px;
}

#carrier,
#battleship,
#destroyer,
#submarine,
#patrol-boat {
  display: flex;
  background-color: lightblue;
  border: 1px solid skyblue;
  justify-content: center;
  align-items: center;
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
`, "",{"version":3,"sources":["webpack://./src/styles/startmenu.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,iCAAiC;EACjC,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,WAAW;EACX,aAAa;EACb,uCAAuC;EACvC,gDAAgD;EAChD,uBAAuB;AACzB;;AAEA;;;;;EAKE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;AACA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;;EAEE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;;EAEE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;;;;;EAKE,aAAa;EACb,2BAA2B;EAC3B,yBAAyB;EACzB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB","sourcesContent":[".left-section {\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n.right-section {\n  display: grid;\n  grid-template-rows: 50px 50px 1fr;\n  justify-items: center;\n  align-items: center;\n}\n\n.start-menu-table {\n  height: 400px;\n  width: 400px;\n  display: grid;\n}\n\ntbody {\n  width: 100%;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.table-row {\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.table-cell {\n  border: 1px solid gray;\n  background-color: white;\n}\n\n.port {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-columns: min-content auto;\n  grid-auto-rows: minmax(min-content, max-content);\n  justify-content: center;\n}\n\n.carrier-berth,\n.battleship-berth,\n.destroyer-berth,\n.submarine-berth,\n.patrol-boat-berth {\n  padding: 10px;\n}\n\n#carrier.horizontal {\n  height: 35px;\n  width: 200px;\n}\n#battleship.horizontal {\n  height: 35px;\n  width: 160px;\n}\n\n#destroyer.horizontal,\n#submarine.horizontal {\n  height: 35px;\n  width: 120px;\n}\n\n#patrol-boat.horizontal {\n  height: 35px;\n  width: 80px;\n}\n\n#carrier.vertical {\n  height: 200px;\n  width: 35px;\n}\n\n#battleship.vertical {\n  height: 160px;\n  width: 35px;\n}\n\n#destroyer.vertical,\n#submarine.vertical {\n  height: 120px;\n  width: 35px;\n}\n\n#patrol-boat.vertical {\n  height: 80px;\n  width: 35px;\n}\n\n#carrier,\n#battleship,\n#destroyer,\n#submarine,\n#patrol-boat {\n  display: flex;\n  background-color: lightblue;\n  border: 1px solid skyblue;\n  justify-content: center;\n  align-items: center;\n}\n\n.start-btn {\n  position: absolute;\n  height: 100px;\n  width: 200px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7QUNBc0M7QUFDMEI7QUFFaEUsTUFBTXFNLFNBQVMsR0FBR0EsQ0FBQSxLQUFNO0VBQ3RCekksbURBQVUsQ0FBQyxDQUFDO0VBRVpyRixzREFBUyxDQUFDLENBQUM7RUFFWCtNLGtFQUFxQixDQUFDLENBQUM7QUFDekIsQ0FBQztBQUNEZSxTQUFTLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9iYXR0bGVzaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS1ib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0YXJ0LW1lbnUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2FtZW1lbnUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2dsb2JhbC5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3RhcnRtZW51LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2FtZW1lbnUuY3NzPzI1OTMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzcz9mMGQ4Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0YXJ0bWVudS5jc3M/MTJiMCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RhcnRNZW51IH0gZnJvbSBcIi4vc3RhcnQtbWVudVwiO1xuaW1wb3J0IHsgcGxheVJvdW5kIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgdXNlckF0dGFja3MsIGNvbXB1dGVyQXR0YWNrcyB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFwiLi9zdHlsZXMvZ2FtZW1lbnUuY3NzXCI7XG5cbmNvbnN0IGdhbWVNZW51ID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcblxuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gIGNvbnN0IGNvbnRhaW5lck9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGNvbnRhaW5lclR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZWZpZWxkT25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZE9uZVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRUd29QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgY29udGFpbmVyT25lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLWNvbnRhaW5lclwiKTtcbiAgY29udGFpbmVyVHdvLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1jb250YWluZXJcIik7XG4gIGJhdHRsZWZpZWxkT25lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLWJhdHRsZWZpZWxkXCIpO1xuICBiYXR0bGVmaWVsZFR3by5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYmF0dGxlZmllbGRcIik7XG4gIGJhdHRsZWZpZWxkT25lUGFyYS50ZXh0Q29udGVudCA9IFwiUGxheWVyIEJvYXJkXCI7XG4gIGJhdHRsZWZpZWxkVHdvUGFyYS50ZXh0Q29udGVudCA9IFwiQUkgQm9hcmRcIjtcblxuICBjb250YWluZXJPbmUuYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRPbmUpO1xuICBjb250YWluZXJUd28uYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRUd28pO1xuICBjb250YWluZXJPbmUuYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRPbmVQYXJhKTtcbiAgY29udGFpbmVyVHdvLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkVHdvUGFyYSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJPbmUpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVHdvKTtcbn07XG5cbmNvbnN0IHJlbmRlckJvYXJkcyA9ICgpID0+IHtcbiAgY29uc3QgdXNlckJhdHRsZWZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWJhdHRsZWZpZWxkXCIpO1xuICBjb25zdCBjb21wdXRlckJhdHRsZWZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci1iYXR0bGVmaWVsZFwiKTtcblxuICAvLyBSZW5kZXIgdXNlciBnYW1lIGJvYXJkXG4gIGNvbnN0IHJlbmRlclVzZXJCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgIHVzZXJCYXR0bGVmaWVsZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bi5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICAgIGlmIChkYXRhID09PSAxKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLXNxdWFyZVwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAyKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW1pc3NlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAzKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVzZXJCYXR0bGVmaWVsZC5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBSZW5kZXIgY29tcHV0ZXIgZ2FtZSBib2FyZFxuICBjb25zdCByZW5kZXJDb21wdXRlckJvYXJkID0gKGJvYXJkKSA9PiB7XG4gICAgY29tcHV0ZXJCYXR0bGVmaWVsZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bi5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICAgIGlmIChkYXRhID09PSAyKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW1pc3NlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAzKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXB1dGVyQmF0dGxlZmllbGQuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiB7IHJlbmRlclVzZXJCb2FyZCwgcmVuZGVyQ29tcHV0ZXJCb2FyZCB9O1xufTtcblxuY29uc3QgZ2FtZVdpbm5lciA9ICh3aW5uZXIpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItY29udGFpbmVyXCIpO1xuICBjb25zdCB3aW5uZXJBbm5vdW5jZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIHdpbm5lckFubm91bmNlci5jbGFzc0xpc3QuYWRkKFwid2lubmVyXCIpO1xuICB3aW5uZXJBbm5vdW5jZXIudGV4dENvbnRlbnQgPSB3aW5uZXI7XG4gIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc3RhcnQtYnV0dG9uXCIpO1xuICByZXN0YXJ0QnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZW1hdGNoXCI7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdpbm5lckFubm91bmNlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN0YXJ0QnV0dG9uKTtcbn07XG5cbmNvbnN0IGdhbWVNZW51RXZlbnRIYW5kbGVyID0gKCkgPT4ge1xuICBjb25zdCBtYWluU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xuICBjb25zdCB3aW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1jb250YWluZXJcIik7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKHdpbm5lckNvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInNxdWFyZVwiKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IGRhdGEgPSBzcXVhcmUuZGF0YXNldC5wb3M7XG4gICAgICBjb25zdCBhcnJheSA9IGRhdGEuc3BsaXQoXCIsXCIpO1xuICAgICAgY29uc3QgcG9zID0gW3BhcnNlSW50KGFycmF5WzBdKSwgcGFyc2VJbnQoYXJyYXlbMV0pXTtcblxuICAgICAgcGxheVJvdW5kKHBvcyk7XG4gICAgfVxuICB9KTtcblxuICB3aW5uZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKChlLnRhcmdldC5jbGFzc05hbWUgPSBcInJlc3RhcnQtYnV0dG9uXCIpKSB7XG4gICAgICBtYWluU2VjdGlvbi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICB3aW5uZXJDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAvLyBFbXB0eSBhdHRhY2tlZCBzcXVhcmVzIGhpc3RvcnlcbiAgICAgIHVzZXJBdHRhY2tzLmxlbmd0aCA9IDA7XG4gICAgICBjb21wdXRlckF0dGFja3MubGVuZ3RoID0gMDtcblxuICAgICAgLy8gU3RhcnQgbmV3IGdhbWVcbiAgICAgIHN0YXJ0TWVudSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBnYW1lTWVudSwgcmVuZGVyQm9hcmRzLCBnYW1lV2lubmVyLCBnYW1lTWVudUV2ZW50SGFuZGxlciB9O1xuIiwiaW1wb3J0IHsgUGxheWVyU2hpcHMsIFNoaXAgfSBmcm9tIFwiLi9zaGlwc1wiO1xuXG5jb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGxldCBib2FyZCA9IFtdO1xuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBib2FyZFtpXVtqXSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgcGxheWVyU2hpcHMgPSBQbGF5ZXJTaGlwcygpO1xuICBjb25zdCBzaGlwcyA9IHBsYXllclNoaXBzLmdldFNoaXBzKCk7XG5cbiAgY29uc3QgcG9wdWxhdGVCb2FyZCA9IChhcnJheSkgPT4ge1xuICAgIHBsYXllclNoaXBzLmFkZFNoaXBDb29yZGluYXRlcyhhcnJheSk7XG5cbiAgICAvLyBQbGFjZSBhbGwgc2hpcHMgb250byB0aGUgYm9hcmRcbiAgICBTaGlwKCkucGxhY2VTaGlwcyhib2FyZCwgc2hpcHMpO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRBdHRhY2tlZFNoaXAgPSAocG9zKSA9PiB7XG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBjb25zdCBhcnJheSA9IHNoaXBzW2tleV0uY29vcmRpbmF0ZXM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2ldO1xuXG4gICAgICAgIGlmIChlbGVtZW50WzBdID09PSBwb3NbMF0gJiYgZWxlbWVudFsxXSA9PT0gcG9zWzFdKSB7XG4gICAgICAgICAgcmV0dXJuIHNoaXBzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChwb3MpID0+IHtcbiAgICBsZXQgeCA9IHBvc1swXTtcbiAgICBsZXQgeSA9IHBvc1sxXTtcblxuICAgIGlmIChib2FyZFt4XVt5XSA9PT0gMSkge1xuICAgICAgY29uc3QgYXR0YWNrZWRTaGlwID0gZmluZEF0dGFja2VkU2hpcChwb3MpO1xuXG4gICAgICAvLyBNYXJrIGJvYXJkIHBvc2l0aW9uIGFzIGF0dGFja2VkXG4gICAgICBib2FyZFt4XVt5XSA9IDM7XG5cbiAgICAgIC8vIEFkZCBoaXQgY291bnQgdG8gYXR0YWNrZWQgc2hpcFxuICAgICAgU2hpcCgpLmhpdChhdHRhY2tlZFNoaXApO1xuICAgIH0gZWxzZSBpZiAoYm9hcmRbeF1beV0gPT09IDApIHtcbiAgICAgIC8vIE1hcmsgYm9hcmQgcG9zaXRpb24gYXMgYXR0YWNrZWRcbiAgICAgIGJvYXJkW3hdW3ldID0gMjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWxsU2hpcHNEZXN0cm95ZWQgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcblxuICAgIGZvciAobGV0IGtleSBpbiBzaGlwcykge1xuICAgICAgY29uc3Qgc2hpcFN0YXRlID0gc2hpcHNba2V5XS5kZXN0cm95ZWQ7XG5cbiAgICAgIGlmIChzaGlwU3RhdGUgPT09IHRydWUpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY291bnQgPT09IDUgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVCb2FyZCxcbiAgICBnZXRCb2FyZCxcbiAgICBwb3B1bGF0ZUJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU2hpcHNEZXN0cm95ZWQsXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgUGxheWVyU2hpcHMgfSBmcm9tIFwiLi9zaGlwc1wiO1xuaW1wb3J0IHsgcmVuZGVyQm9hcmRzLCBnYW1lV2lubmVyLCBnYW1lTWVudUV2ZW50SGFuZGxlciB9IGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcbmltcG9ydCB7IHVzZXJTaGlwc0Nvb3JkaW5hdGVzLCBjb21wdXRlclNoaXBDb29yZGluYXRlcyB9IGZyb20gXCIuL3N0YXJ0LW1lbnVcIjtcblxubGV0IHVzZXJHYW1lQm9hcmQ7XG5sZXQgY29tcHV0ZXJHYW1lQm9hcmQ7XG5sZXQgdXNlcjtcbmxldCBjb21wdXRlcjtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgLy8gQ3JlYXRlIFBsYXllciBvYmplY3RzIGFuZCBHYW1lQm9hcmQgb2JqZWN0cyBmb3IgZWFjaCBwbGF5ZXJcbiAgdXNlciA9IFBsYXllcihcInVzZXJcIik7XG4gIGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXIgQUlcIik7XG5cbiAgdXNlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBjb21wdXRlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuXG4gIC8vIENyZWF0ZSBuZXcgYm9hcmRzIGZvciBlYWNoIHBsYXllclxuICB1c2VyR2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG5cbiAgLy8gUG9wdWxhdGUgcGxheWVyIGJvYXJkcyB3aXRoIHNoaXBzXG4gIHVzZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCh1c2VyU2hpcHNDb29yZGluYXRlcyk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQoY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gIC8vICAgR2V0IHBsYXllciBib2FyZHMgZnJvbSBHYW1lQm9hcmQgb2JqZWN0c1xuICBjb25zdCB1c2VyQm9hcmQgPSB1c2VyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuXG4gIC8vIEluaXRpYWwgcGxheWVyIGJvYXJkcyBhcmUgcmVuZGVyZWRcbiAgcmVuZGVyQm9hcmRzKCkucmVuZGVyVXNlckJvYXJkKHVzZXJCb2FyZCk7XG4gIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoY29tcHV0ZXJCb2FyZCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBldmVudCBoYW5kbGVyXG4gIGdhbWVNZW51RXZlbnRIYW5kbGVyKCk7XG59O1xuXG5jb25zdCBwbGF5Um91bmQgPSAocG9zKSA9PiB7XG4gIGxldCB1c2VyQXR0YWNrcyA9IHVzZXIuYXR0YWNrKGNvbXB1dGVyLCBjb21wdXRlckdhbWVCb2FyZCwgcG9zKTtcblxuICBpZiAodXNlckF0dGFja3MgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIC8vIFVwZGF0ZSBjb21wdXRlciBib2FyZCBvbiB0aGUgc2NyZWVuXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gICAgcmVuZGVyQm9hcmRzKCkucmVuZGVyQ29tcHV0ZXJCb2FyZChjb21wdXRlckJvYXJkKTtcblxuICAgIC8vIENoZWNrIGlmIGFsbCBjb21wdXRlciBzaGlwcyBhcmUgZGVzdHJveWVkXG4gICAgaWYgKGNvbXB1dGVyR2FtZUJvYXJkLmFsbFNoaXBzRGVzdHJveWVkKCkgPT09IHRydWUpIHtcbiAgICAgIGdhbWVXaW5uZXIoXCJZb3UgV2luIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyAvLyBDb21wdXRlciBhdHRhY2tzIHRoZSB1c2VyIDIwMCBzZWNvbmRzIGFmdGVyIGJlaW5nIGF0dGFja2VkXG4gICAgLy8gY29uc3QgbXlQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAvLyAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgICByZXNvbHZlKGNvbXB1dGVyLmF0dGFjayh1c2VyLCB1c2VyR2FtZUJvYXJkLCBwb3MpKTtcbiAgICAvLyAgIH0sIDIwMCk7XG4gICAgLy8gfSkudGhlbigoKSA9PiB7XG4gICAgY29tcHV0ZXIuYXR0YWNrKHVzZXIsIHVzZXJHYW1lQm9hcmQsIHBvcyk7XG4gICAgLy8gVXBkYXRlIHVzZXIgYm9hcmQgb24gdGhlIHNjcmVlblxuICAgIGNvbnN0IHVzZXJCb2FyZCA9IHVzZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICByZW5kZXJCb2FyZHMoKS5yZW5kZXJVc2VyQm9hcmQodXNlckJvYXJkKTtcblxuICAgIC8vIENoZWNrIGlmIGFsbCB1c2VyIHNoaXBzIGFyZSBkZXN0cm95ZWRcbiAgICBpZiAodXNlckdhbWVCb2FyZC5hbGxTaGlwc0Rlc3Ryb3llZCgpID09PSB0cnVlKSB7XG4gICAgICBnYW1lV2lubmVyKFwiQ29tcHV0ZXIgV2lucyFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBHYW1lLCBwbGF5Um91bmQgfTtcblxuLy8gLy8gQ3JlYXRlIFBsYXllciBvYmplY3RzIGFuZCBHYW1lQm9hcmQgb2JqZWN0cyBmb3IgZWFjaCBwbGF5ZXJcbi8vIHVzZXIgPSBQbGF5ZXIoXCJ1c2VyXCIpO1xuLy8gY29tcHV0ZXIgPSBQbGF5ZXIoXCJjb21wdXRlciBBSVwiKTtcblxuLy8gdXNlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuLy8gY29tcHV0ZXJHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcblxuLy8gLy8gQ3JlYXRlIG5ldyBib2FyZHMgZm9yIGVhY2ggcGxheWVyXG4vLyB1c2VyR2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4vLyBjb21wdXRlckdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4vLyAvLyBBZGQgc2hpcCBjb29yZGluYXRlcyBhbmQgcG9wdWxhdGUgdXNlciBib2FyZCB3aXRoIHNoaXBzXG4vLyBjb25zdCB1c2VyUGxheWVyU2hpcHMgPSBQbGF5ZXJTaGlwcygpO1xuLy8gY29uc3QgY29tcHV0ZXJQbGF5ZXJTaGlwcyA9IFBsYXllclNoaXBzKCk7XG5cbi8vIHVzZXJQbGF5ZXJTaGlwcy5hZGRTaGlwQ29vcmRpbmF0ZXModXNlclNoaXBzQ29vcmRpbmF0ZXMpO1xuLy8gY29tcHV0ZXJQbGF5ZXJTaGlwcy5hZGRTaGlwQ29vcmRpbmF0ZXMoY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMpO1xuXG4vLyBjb25zdCB1c2VyU2hpcHMgPSB1c2VyUGxheWVyU2hpcHMuZ2V0U2hpcHMoKTtcbi8vIGNvbnN0IGNvbXB1dGVyU2hpcHMgPSBjb21wdXRlclBsYXllclNoaXBzLmdldFNoaXBzKCk7XG5cbi8vIHVzZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCh1c2VyU2hpcHMpO1xuLy8gY29tcHV0ZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZChjb21wdXRlclNoaXBzKTtcbi8vIC8vIHVzZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCgpO1xuXG4vLyAvLyAvLyBVcGRhdGUgc2hpcCBjb29yZGluYXRlcyBhbmQgcG9wdWxhdGUgY29tcHV0ZXIgYm9hcmQgd2l0aCBzaGlwc1xuLy8gLy8gU2hpcC51cGRhdGVTaGlwQ29vcmRpbmF0ZXMoY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMpO1xuLy8gLy8gY29tcHV0ZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCgpO1xuXG4vLyAvLyAgIEdldCBwbGF5ZXIgYm9hcmRzIGZyb20gR2FtZUJvYXJkIG9iamVjdHNcbi8vIGNvbnN0IHVzZXJCb2FyZCA9IHVzZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbi8vIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuXG4vLyAvLyBJbml0aWFsIHBsYXllciBib2FyZHMgYXJlIHJlbmRlcmVkXG4vLyByZW5kZXJCb2FyZHMoKS5yZW5kZXJVc2VyQm9hcmQodXNlckJvYXJkKTtcbi8vIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoY29tcHV0ZXJCb2FyZCk7XG5cbi8vIGdhbWVNZW51RXZlbnRIYW5kbGVyKCk7XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy9nbG9iYWwuY3NzXCI7XG5cbmNvbnN0IHBhZ2VMYXlvdXQgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICBjb25zdCB3aW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBsb2dvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgbG9nbyA9IG5ldyBJbWFnZSgpO1xuXG4gIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xuICBtYWluLmNsYXNzTGlzdC5hZGQoXCJtYWluLXNlY3Rpb25cIik7XG4gIGZvb3Rlci5jbGFzc0xpc3QuYWRkKFwiZm9vdGVyXCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG5cbiAgd2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3aW5uZXItY29udGFpbmVyXCIpO1xuICBsb2dvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJsb2dvLWNvbnRhaW5lclwiKTtcbiAgbG9nby5hbHQgPSBcIlN1Ym1hcmluZSBsb2dvXCI7XG5cbiAgbG9nb0NvbnRhaW5lci5hcHBlbmRDaGlsZChsb2dvKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGxvZ29Db250YWluZXIpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQod2lubmVyQ29udGFpbmVyKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKG1haW4pO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGZvb3Rlcik7XG59O1xuXG5leHBvcnQgeyBwYWdlTGF5b3V0IH07XG4iLCJsZXQgdXNlckF0dGFja3MgPSBbXTtcbmxldCBjb21wdXRlckF0dGFja3MgPSBbXTtcblxuY29uc3QgUGxheWVyID0gKG5hbWUpID0+IHtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgY29uc3QgaXNBdHRhY2tMZWdhbCA9IChlbmVteSwgcG9zKSA9PiB7XG4gICAgbGV0IGFycmF5O1xuXG4gICAgaWYgKGVuZW15ID09PSBcInVzZXJcIikge1xuICAgICAgYXJyYXkgPSBjb21wdXRlckF0dGFja3Muc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXkgPSB1c2VyQXR0YWNrcy5zbGljZSgpO1xuICAgIH1cblxuICAgIHdoaWxlIChhcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheS5zaGlmdCgpO1xuICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHBvc1swXSAmJiBlbGVtZW50WzFdID09PSBwb3NbMV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIEdhbWVCb2FyZCwgcG9zKSA9PiB7XG4gICAgY29uc3QgZW5lbXlOYW1lID0gZW5lbXkuZ2V0TmFtZSgpO1xuXG4gICAgaWYgKGVuZW15TmFtZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBsZXQgcG9zID0gW3gsIHldO1xuXG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb21wdXRlckF0dGFja3MucHVzaChwb3MpO1xuICAgICAgICBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXR0YWNrKGVuZW15LCBHYW1lQm9hcmQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB1c2VyQXR0YWNrcy5wdXNoKHBvcyk7XG4gICAgICAgIEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGdldE5hbWUsIGlzQXR0YWNrTGVnYWwsIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyLCB1c2VyQXR0YWNrcywgY29tcHV0ZXJBdHRhY2tzIH07XG4iLCJjb25zdCBQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgbGV0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IHtcbiAgICAgIGxlbmd0aDogNSxcbiAgICAgIGhpdHM6IDAsXG4gICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgY29vcmRpbmF0ZXM6IFtdLFxuICAgIH0sXG5cbiAgICBiYXR0bGVzaGlwOiB7XG4gICAgICBsZW5ndGg6IDQsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgZGVzdHJveWVyOiB7XG4gICAgICBsZW5ndGg6IDMsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgc3VibWFyaW5lOiB7XG4gICAgICBsZW5ndGg6IDMsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgcGF0cm9sQm9hdDoge1xuICAgICAgbGVuZ3RoOiAyLFxuICAgICAgaGl0czogMCxcbiAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgICBjb29yZGluYXRlczogW10sXG4gICAgfSxcbiAgfTtcbiAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBzaGlwcztcblxuICBjb25zdCBhZGRTaGlwQ29vcmRpbmF0ZXMgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgY29weSA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGxldCBzaGlwQXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuICAgICAgbGV0IGFyciA9IGNvcHkuc2hpZnQoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2hpcEFycmF5LnB1c2goYXJyW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0U2hpcHMsIGFkZFNoaXBDb29yZGluYXRlcyB9O1xufTtcblxuY29uc3QgU2hpcCA9ICgpID0+IHtcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChib2FyZCwgc2hpcHMpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGxldCBhcnJheSA9IHNoaXBzW2tleV0uY29vcmRpbmF0ZXM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2ldO1xuICAgICAgICBjb25zdCB4ID0gZWxlbWVudFswXTtcbiAgICAgICAgY29uc3QgeSA9IGVsZW1lbnRbMV07XG5cbiAgICAgICAgYm9hcmRbeF1beV0gPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoc2hpcCkgPT4ge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICBjb25zdCBoaXRzQ291bnQgPSBzaGlwLmhpdHM7XG5cbiAgICAvLyBjaGVjayBzaGlwIGxlbmd0aCBhbmQgbm8gb2YgdGltZXMgaXRzIGJlZW4gaGl0XG4gICAgcmV0dXJuIHNoaXBMZW5ndGggPT09IGhpdHNDb3VudCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0cyArPSAxO1xuXG4gICAgLy8gQWZ0ZXIgZXZlcnkgaGl0LCBjaGVjayBpZiB0aGUgc2hpcCBpcyBkZXN0cm95ZWRcbiAgICBjb25zdCBjaGVja1NoaXAgPSBpc1N1bmsoc2hpcCk7XG5cbiAgICBpZiAoY2hlY2tTaGlwID09PSB0cnVlKSB7XG4gICAgICBzaGlwLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IHBsYWNlU2hpcHMsIGhpdCB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyU2hpcHMsIFNoaXAgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCB7IGdhbWVNZW51IH0gZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0YXJ0bWVudS5jc3NcIjtcblxuY29uc3QgZ2V0U3RhcnRTY3JlZW5Cb2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvYXJkXG4gIGdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2FtZUJvYXJkLmdldEJvYXJkKCk7XG5cbiAgcmV0dXJuIGJvYXJkO1xufTtcblxuY29uc3Qgc3RhcnRNZW51ID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcbiAgY29uc3QgbGVmdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCByaWdodFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHBhcmFUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBjYXJyaWVyQmVydGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVzaGlwQmVydGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkZXN0cm95ZXJCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHN1Ym1hcmluZUJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgcGF0cm9sQm9hdEJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY2FycmllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBwYXRyb2xCb2F0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBsZWZ0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwibGVmdC1zZWN0aW9uXCIpO1xuICByaWdodFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcInJpZ2h0LXNlY3Rpb25cIik7XG4gIHRhYmxlLmNsYXNzTGlzdC5hZGQoXCJzdGFydC1tZW51LXRhYmxlXCIpO1xuICBwYXJhLmNsYXNzTGlzdC5hZGQoXCJpbnN0cnVjdGlvbnNcIik7XG4gIHBhcmEudGV4dENvbnRlbnQgPSBcIkRyYWcgYW5kIGRyb3Agc2hpcHNcIjtcbiAgcGFyYVR3by5jbGFzc0xpc3QuYWRkKFwiaW5zdHJ1Y3Rpb25zXCIpO1xuICBwYXJhVHdvLnRleHRDb250ZW50ID0gXCJEb3VibGUgY2xpY2sgdG8gcm90YXRlXCI7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3J0XCIpO1xuICBjYXJyaWVyQmVydGguY2xhc3NMaXN0LmFkZChcImNhcnJpZXItYmVydGhcIik7XG4gIGJhdHRsZXNoaXBCZXJ0aC5jbGFzc0xpc3QuYWRkKFwiYmF0dGxlc2hpcC1iZXJ0aFwiKTtcbiAgZGVzdHJveWVyQmVydGguY2xhc3NMaXN0LmFkZChcImRlc3Ryb3llci1iZXJ0aFwiKTtcbiAgc3VibWFyaW5lQmVydGguY2xhc3NMaXN0LmFkZChcInN1Ym1hcmluZS1iZXJ0aFwiKTtcbiAgcGF0cm9sQm9hdEJlcnRoLmNsYXNzTGlzdC5hZGQoXCJwYXRyb2wtYm9hdC1iZXJ0aFwiKTtcbiAgY2Fycmllci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgY2Fycmllci5pZCA9IFwiY2FycmllclwiO1xuICBjYXJyaWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgY2Fycmllci5kYXRhc2V0LndpZHRoID0gNTtcbiAgY2Fycmllci5kcmFnZ2FibGUgPSB0cnVlO1xuICBiYXR0bGVzaGlwLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBiYXR0bGVzaGlwLmlkID0gXCJiYXR0bGVzaGlwXCI7XG4gIGJhdHRsZXNoaXAuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBiYXR0bGVzaGlwLmRhdGFzZXQud2lkdGggPSA0O1xuICBiYXR0bGVzaGlwLmRyYWdnYWJsZSA9IHRydWU7XG4gIGRlc3Ryb3llci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgZGVzdHJveWVyLmlkID0gXCJkZXN0cm95ZXJcIjtcbiAgZGVzdHJveWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgZGVzdHJveWVyLmRhdGFzZXQud2lkdGggPSAzO1xuICBkZXN0cm95ZXIuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgc3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBzdWJtYXJpbmUuaWQgPSBcInN1Ym1hcmluZVwiO1xuICBzdWJtYXJpbmUuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBzdWJtYXJpbmUuZGF0YXNldC53aWR0aCA9IDM7XG4gIHN1Ym1hcmluZS5kcmFnZ2FibGUgPSB0cnVlO1xuICBwYXRyb2xCb2F0LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBwYXRyb2xCb2F0LmlkID0gXCJwYXRyb2wtYm9hdFwiO1xuICBwYXRyb2xCb2F0LmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgcGF0cm9sQm9hdC5kYXRhc2V0LndpZHRoID0gMjtcbiAgcGF0cm9sQm9hdC5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2V0U3RhcnRTY3JlZW5Cb2FyZCgpO1xuICAvLyBDcmVhdGUgYSBncmlkIG9mIHRhYmxlIHJvd3MgYW5kIHRhYmxlIGNlbGxzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0YWJsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAgIHRhYmxlUm93LmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1yb3dcIik7XG4gICAgdGFibGVSb3cuaWQgPSBgZHJvcHpvbmUtJHtpfWA7XG5cbiAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1jZWxsXCIpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRhYmxlUm93KTtcbiAgfVxuXG4gIGNhcnJpZXJCZXJ0aC5hcHBlbmRDaGlsZChjYXJyaWVyKTtcbiAgYmF0dGxlc2hpcEJlcnRoLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBkZXN0cm95ZXJCZXJ0aC5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzdWJtYXJpbmVCZXJ0aC5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBwYXRyb2xCb2F0QmVydGguYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcnJpZXJCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXBCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc3Ryb3llckJlcnRoKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lQmVydGgpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0QmVydGgpO1xuICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChwYXJhKTtcbiAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHBhcmFUd28pO1xuICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdFNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRTZWN0aW9uKTtcbn07XG5cbmxldCB1c2VyU2hpcHNDb29yZGluYXRlcyA9IFtdO1xubGV0IGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzID0gW107XG5sZXQgdmlzaXRlZCA9IFtdO1xuXG5jb25zdCBpc0FycmF5SW5BcnJheSA9IChzb3VyY2UsIHNlYXJjaCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlYXJjaC5sZW5ndGg7IGkrKykge1xuICAgIGxldCBzZWFyY2hFbGUgPSBzZWFyY2hbaV07XG5cbiAgICBpZiAoc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU2VhcmNoIGZvciBlYWNoIFwic2VhcmNoIGFycmF5XCIgZWxlbWVudCBpbiB0aGUgc291cmNlIGFycmF5XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBzb3VyY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgIGxldCBzb3VyY2VFbGUgPSBzb3VyY2Vbal07XG5cbiAgICAgIGlmIChzZWFyY2hFbGVbMF0gPT09IHNvdXJjZUVsZVswXSAmJiBzZWFyY2hFbGVbMV0gPT09IHNvdXJjZUVsZVsxXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGdldFJhbmRvbVBvc2l0aW9uID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgdmFsaWQgPSBmYWxzZTtcbiAgbGV0IHBvcztcblxuICB3aGlsZSAodmFsaWQgPT09IGZhbHNlKSB7XG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgcG9zID0gW3gsIHldO1xuXG4gICAgaWYgKHggKyBsZW5ndGggPD0gMTAgJiYgeSArIGxlbmd0aCA8PSAxMCkge1xuICAgICAgdmFsaWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwb3M7XG59O1xuXG5jb25zdCBnZXRBZGpDb29yZGluYXRlcyA9IChjb29yZGluYXRlcykgPT4ge1xuICBsZXQgYWRqUG9zaXRpb25zID0gW107XG4gIGxldCBvcmllbnRhdGlvbiA9IFwiXCI7XG4gIGxldCBvbmUgPSBjb29yZGluYXRlc1swXTtcbiAgbGV0IHR3byA9IGNvb3JkaW5hdGVzWzFdO1xuXG4gIC8vIENoZWNrIGNvb3JkaW5hdGVzIG9yaWVudGF0aW9uXG4gIGlmIChvbmVbMF0gPT09IHR3b1swXSAmJiBvbmVbMV0gIT09IHR3b1sxXSkge1xuICAgIG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gIH0gZWxzZSBpZiAob25lWzBdICE9PSB0d29bMF0gJiYgb25lWzFdID09PSB0d29bMV0pIHtcbiAgICBvcmllbnRhdGlvbiA9IFwidmVydGljYWxcIjtcbiAgfVxuXG4gIGlmIChvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNvb3JkaW5hdGVzW2ldO1xuXG4gICAgICBsZXQgYWRqTGVmdCA9IFtlbGVtZW50WzBdLCBlbGVtZW50WzFdIC0gMV07XG4gICAgICBsZXQgYWRqUmlnaHQgPSBbZWxlbWVudFswXSwgZWxlbWVudFsxXSArIDFdO1xuXG4gICAgICBpZiAoYWRqTGVmdFsxXSA+PSAwICYmIGFkakxlZnRbMV0gPD0gOSkge1xuICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpMZWZ0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFkalJpZ2h0WzFdID49IDAgJiYgYWRqUmlnaHRbMV0gPD0gOSkge1xuICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpSaWdodCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGxldCBhZGpUb3AgPSBbZWxlbWVudFswXSAtIDEsIGVsZW1lbnRbMV1dO1xuXG4gICAgICAgIGlmIChhZGpUb3BbMF0gPj0gMCAmJiBhZGpUb3BbMF0gPD0gOSkge1xuICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkalRvcCk7XG5cbiAgICAgICAgICBsZXQgbGVmdCA9IFthZGpUb3BbMF0sIGFkalRvcFsxXSAtIDFdO1xuICAgICAgICAgIGxldCByaWdodCA9IFthZGpUb3BbMF0sIGFkalRvcFsxXSArIDFdO1xuXG4gICAgICAgICAgaWYgKGxlZnRbMV0gPj0gMCAmJiBsZWZ0WzFdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGxlZnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyaWdodFsxXSA+PSAwICYmIHJpZ2h0WzFdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKHJpZ2h0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIGkgPT09IDEpIHtcbiAgICAgICAgbGV0IGFkakJvdHRvbSA9IFtlbGVtZW50WzBdICsgMSwgZWxlbWVudFsxXV07XG5cbiAgICAgICAgaWYgKGFkakJvdHRvbVswXSA+PSAwICYmIGFkakJvdHRvbVswXSA8PSA5KSB7XG4gICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqQm90dG9tKTtcblxuICAgICAgICAgIGxldCBsZWZ0ID0gW2FkakJvdHRvbVswXSwgYWRqQm90dG9tWzFdIC0gMV07XG4gICAgICAgICAgbGV0IHJpZ2h0ID0gW2FkakJvdHRvbVswXSwgYWRqQm90dG9tWzFdICsgMV07XG5cbiAgICAgICAgICBpZiAobGVmdFsxXSA+PSAwICYmIGxlZnRbMV0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2gobGVmdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJpZ2h0WzFdID49IDAgJiYgcmlnaHRbMV0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2gocmlnaHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhZGpQb3NpdGlvbnM7XG4gIH1cblxuICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNvb3JkaW5hdGVzW2ldO1xuXG4gICAgICBsZXQgYWRqVG9wID0gW2VsZW1lbnRbMF0gLSAxLCBlbGVtZW50WzFdXTtcbiAgICAgIGxldCBhZGpCb3R0b20gPSBbZWxlbWVudFswXSArIDEsIGVsZW1lbnRbMV1dO1xuXG4gICAgICBpZiAoYWRqVG9wWzBdID49IDAgJiYgYWRqVG9wWzBdIDw9IDkpIHtcbiAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqVG9wKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFkakJvdHRvbVswXSA+PSAwICYmIGFkakJvdHRvbVswXSA8PSA5KSB7XG4gICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkakJvdHRvbSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGxldCBhZGpMZWZ0ID0gW2VsZW1lbnRbMF0sIGVsZW1lbnRbMV0gLSAxXTtcblxuICAgICAgICBpZiAoYWRqTGVmdFsxXSA+PSAwICYmIGFkakxlZnRbMV0gPD0gOSkge1xuICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkakxlZnQpO1xuXG4gICAgICAgICAgbGV0IHRvcCA9IFthZGpMZWZ0WzBdIC0gMSwgYWRqTGVmdFsxXV07XG4gICAgICAgICAgbGV0IGJvdHRvbSA9IFthZGpMZWZ0WzBdICsgMSwgYWRqTGVmdFsxXV07XG5cbiAgICAgICAgICBpZiAodG9wWzBdID49IDAgJiYgdG9wWzBdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKHRvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGJvdHRvbVswXSA+PSAwICYmIGJvdHRvbVswXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChib3R0b20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoIC0gaSA9PT0gMSkge1xuICAgICAgICBsZXQgYWRqUmlnaHQgPSBbZWxlbWVudFswXSwgZWxlbWVudFsxXSArIDFdO1xuXG4gICAgICAgIGlmIChhZGpSaWdodFsxXSA+PSAwICYmIGFkalJpZ2h0WzFdIDw9IDkpIHtcbiAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpSaWdodCk7XG5cbiAgICAgICAgICBsZXQgdG9wID0gW2FkalJpZ2h0WzBdIC0gMSwgYWRqUmlnaHRbMV1dO1xuICAgICAgICAgIGxldCBib3R0b20gPSBbYWRqUmlnaHRbMF0gKyAxLCBhZGpSaWdodFsxXV07XG5cbiAgICAgICAgICBpZiAodG9wWzBdID49IDAgJiYgdG9wWzBdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKHRvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGJvdHRvbVswXSA+PSAwICYmIGJvdHRvbVswXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChib3R0b20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhZGpQb3NpdGlvbnM7XG4gIH1cbn07XG5cbmNvbnN0IGdldExlZ2FsQ29tYm9zID0gKHNoaXBMZW5ndGgpID0+IHtcbiAgY29uc3QgbGVnYWxDb21ib3MgPSBbXG4gICAgW1xuICAgICAgWzAsIDFdLFxuICAgICAgWzAsIDJdLFxuICAgICAgWzAsIDNdLFxuICAgICAgWzAsIDRdLFxuICAgICAgWzAsIDVdLFxuICAgIF0sXG4gICAgW1xuICAgICAgWzEsIDBdLFxuICAgICAgWzIsIDBdLFxuICAgICAgWzMsIDBdLFxuICAgICAgWzQsIDBdLFxuICAgICAgWzUsIDBdLFxuICAgIF0sXG4gIF07XG4gIGNvbnN0IHBvcyA9IGdldFJhbmRvbVBvc2l0aW9uKHNoaXBMZW5ndGgpO1xuXG4gIGxldCBjb29yZGluYXRlcyA9IFtdO1xuICBsZXQgc2V0O1xuXG4gIGlmIChzaGlwTGVuZ3RoICUgMiA9PT0gMCkge1xuICAgIHNldCA9IGxlZ2FsQ29tYm9zWzBdO1xuICB9IGVsc2Uge1xuICAgIHNldCA9IGxlZ2FsQ29tYm9zWzFdO1xuICB9XG5cbiAgbGV0IGxlbmd0aERpZmYgPSBzZXQubGVuZ3RoIC0gc2hpcExlbmd0aDtcbiAgbGV0IGFycmF5TGVuZ3RoID0gc2V0Lmxlbmd0aCAtIDEgLSBsZW5ndGhEaWZmO1xuXG4gIGNvb3JkaW5hdGVzLnB1c2gocG9zKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBzZXRbaV07XG5cbiAgICBsZXQgeCA9IHBvc1swXTtcbiAgICBsZXQgeSA9IHBvc1sxXTtcbiAgICBsZXQgbW92ZSA9IFt4ICsgdmFsdWVzWzBdLCB5ICsgdmFsdWVzWzFdXTtcblxuICAgIGNvb3JkaW5hdGVzLnB1c2gobW92ZSk7XG4gIH1cblxuICByZXR1cm4gY29vcmRpbmF0ZXM7XG59O1xuXG5jb25zdCBnZXRDb21wdXRlclNoaXBzID0gKCkgPT4ge1xuICBsZXQgbGVuZ3RoID0gNTtcbiAgbGV0IHJlcGVhdFNoaXAgPSAxO1xuXG4gIC8vIEdldCBjb29yZGluYXRlcyBmb3IgZWFjaCBzaGlwXG4gIHdoaWxlIChsZW5ndGggPiAxKSB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gZ2V0TGVnYWxDb21ib3MobGVuZ3RoKTtcbiAgICBsZXQgaXRlbVZpc2l0ZWQgPSBpc0FycmF5SW5BcnJheSh2aXNpdGVkLCBjb29yZGluYXRlcyk7XG5cbiAgICB3aGlsZSAoaXRlbVZpc2l0ZWQgPT09IHRydWUpIHtcbiAgICAgIGNvb3JkaW5hdGVzID0gZ2V0TGVnYWxDb21ib3MobGVuZ3RoKTtcbiAgICAgIGl0ZW1WaXNpdGVkID0gaXNBcnJheUluQXJyYXkodmlzaXRlZCwgY29vcmRpbmF0ZXMpO1xuICAgIH1cblxuICAgIGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZXMpO1xuXG4gICAgLy8gUHVzaCBjb29yZGluYXRlcyB0byB0aGUgdmlzaXRlZCBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjb29yZGluYXRlID0gY29vcmRpbmF0ZXNbaV07XG5cbiAgICAgIHZpc2l0ZWQucHVzaChjb29yZGluYXRlKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGpDb29yZGluYXRlcyA9IGdldEFkakNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcblxuICAgIC8vIFB1c2ggYWRqYWNlbnQgY29vcmRpbmF0ZXMgdG8gdGhlIHZpc2l0ZWQgYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkakNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY29vcmRpbmF0ZSA9IGFkakNvb3JkaW5hdGVzW2ldO1xuXG4gICAgICB2aXNpdGVkLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKGxlbmd0aCA9PT0gMyAmJiByZXBlYXRTaGlwID09PSAxKSB7XG4gICAgICByZXBlYXRTaGlwIC09IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCAtPSAxO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgYWxsU2hpcHNQbGFjZWQgPSAoKSA9PiB7XG4gIGNvbnN0IHBvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcnRcIik7XG4gIGNvbnN0IG5vZGVMaXN0ID0gcG9ydC5jaGlsZE5vZGVzO1xuXG4gIGxldCBzaGlwcyA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBub2RlTGlzdFtpXTtcblxuICAgIGlmIChlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgc2hpcHMgKz0gMTtcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgXCJzdGFydC1nYW1lXCIgYnV0dG9uIHdoZW4gYWxsIHNoaXBzIGFyZSBwbGFjZWQgb24gdGhlIGJvYXJkXG4gIGlmIChzaGlwcyA9PT0gMCkge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBidG4uY2xhc3NMaXN0LmFkZChcInN0YXJ0LWJ0blwiKTtcbiAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCJTdGFydCBHYW1lXCI7XG5cbiAgICBwb3J0LmFwcGVuZENoaWxkKGJ0bik7XG4gIH1cbn07XG5cbmNvbnN0IGlzRHJvcFZhbGlkID0gKGluZGV4WCwgaW5kZXhZLCBzaGlwSGVpZ2h0LCBzaGlwV2lkdGgsIG5vZGVMaXN0KSA9PiB7XG4gIC8vIElmIHNoaXAgZHJvcCBleGNlZWRzIHRoZSBib3VuZCBvZiB0aGUgYm9hcmQsIHJldHVybiBmYWxzZVxuICBpZiAoaW5kZXhZICsgc2hpcFdpZHRoID4gMTApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiBUaGlzIGNoZWNrcyBpZiB0aGVyZSBpcyBhIHNoaXAgdG8gdGhlIGltbWVkaWF0ZSB0b3Agb2YgdGhlIFxuICBcImRyb3Agc2hpcFwiLCBhbmQgc3RvcHMgZXhlY3V0aW9uIGlmIGEgcGxhY2VkIHNoaXAgaXMgZGV0ZWN0ZWQuICovXG4gIGNvbnN0IGNoZWNrVG9wID0gKCkgPT4ge1xuICAgIGxldCBkcm9wU3F1YXJlID0gbm9kZUxpc3RbaW5kZXhZXTtcbiAgICBsZXQgcGFyZW50ID0gZHJvcFNxdWFyZS5wYXJlbnROb2RlO1xuICAgIGxldCBwYXJlbnRTaWJsaW5nID0gcGFyZW50LnByZXZpb3VzU2libGluZztcbiAgICBsZXQgc3RhcnRJbmRleCA9IGluZGV4WSAtIDE7XG5cbiAgICBpZiAocGFyZW50U2libGluZyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwV2lkdGggKyAyOyBpKyspIHtcbiAgICAgIC8vIENoZWNrcyBjaGlsZCBub2RlcyBvZiB0aGUgcGFyZW50IHNpYmxpbmdcbiAgICAgIGxldCBzcXVhcmVJbmRleCA9IHN0YXJ0SW5kZXggKyBpO1xuICAgICAgbGV0IG5vZGVMaXN0ID0gcGFyZW50U2libGluZy5jaGlsZE5vZGVzO1xuICAgICAgbGV0IHNxdWFyZSA9IG5vZGVMaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyogVGhpcyBjaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIHRvIHRoZSBpbW1lZGlhdGUgcmlnaHQgb2YgdGhlIFxuICBcImRyb3Agc2hpcFwiLCBhbmQgc3RvcHMgZXhlY3V0aW9uIGlmIGEgcGxhY2VkIHNoaXAgaXMgZGV0ZWN0ZWQuICovXG4gIGNvbnN0IGNoZWNrUmlnaHQgPSAoKSA9PiB7XG4gICAgbGV0IGRyb3BTcXVhcmUgPSBub2RlTGlzdFtpbmRleFldO1xuICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgbGV0IGdyYW5kUGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgbGV0IHBhcmVudExpc3QgPSBncmFuZFBhcmVudC5jaGlsZE5vZGVzO1xuICAgIGxldCBzcXVhcmVJbmRleCA9IGluZGV4WSArIHNoaXBXaWR0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEhlaWdodDsgaSsrKSB7XG4gICAgICBsZXQgaW5kZXggPSBpbmRleFggKyBpO1xuICAgICAgbGV0IGNoaWxkcmVuID0gcGFyZW50TGlzdFtpbmRleF07XG4gICAgICBsZXQgbGlzdCA9IGNoaWxkcmVuLmNoaWxkTm9kZXM7XG4gICAgICBsZXQgc3F1YXJlID0gbGlzdFtzcXVhcmVJbmRleF07XG5cbiAgICAgIGlmIChzcXVhcmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNxdWFyZUNsYXNzID0gc3F1YXJlLmNsYXNzTmFtZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImNhcnJpZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJiYXR0bGVzaGlwXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiZGVzdHJveWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwic3VibWFyaW5lXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwicGF0cm9sLWJvYXRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCB0byB0aGUgaW1tZWRpYXRlIGJvdHRvbSBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tCb3R0b20gPSAoKSA9PiB7XG4gICAgbGV0IGRyb3BTcXVhcmUgPSBub2RlTGlzdFtpbmRleFldO1xuICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgbGV0IHBhcmVudFNpYmxpbmcgPSBwYXJlbnQubmV4dFNpYmxpbmc7XG4gICAgbGV0IHN0YXJ0SW5kZXggPSBpbmRleFkgLSAxO1xuXG4gICAgaWYgKHBhcmVudFNpYmxpbmcgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFdpZHRoICsgMjsgaSsrKSB7XG4gICAgICAvLyBDaGVja3MgY2hpbGQgbm9kZXMgb2YgdGhlIHBhcmVudCBzaWJsaW5nXG4gICAgICBsZXQgc3F1YXJlSW5kZXggPSBzdGFydEluZGV4ICsgaTtcbiAgICAgIGxldCBub2RlTGlzdCA9IHBhcmVudFNpYmxpbmcuY2hpbGROb2RlcztcbiAgICAgIGxldCBzcXVhcmUgPSBub2RlTGlzdFtzcXVhcmVJbmRleF07XG5cbiAgICAgIGlmIChzcXVhcmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNxdWFyZUNsYXNzID0gc3F1YXJlLmNsYXNzTmFtZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImNhcnJpZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJiYXR0bGVzaGlwXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiZGVzdHJveWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwic3VibWFyaW5lXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwicGF0cm9sLWJvYXRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCB0byB0aGUgaW1tZWRpYXRlIGxlZnQgb2YgdGhlIFxuICBcImRyb3Agc2hpcFwiLCBhbmQgc3RvcHMgZXhlY3V0aW9uIGlmIGEgcGxhY2VkIHNoaXAgaXMgZGV0ZWN0ZWQuICovXG4gIGNvbnN0IGNoZWNrTGVmdCA9ICgpID0+IHtcbiAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W2luZGV4WV07XG4gICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICBsZXQgZ3JhbmRQYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICBsZXQgcGFyZW50TGlzdCA9IGdyYW5kUGFyZW50LmNoaWxkTm9kZXM7XG4gICAgbGV0IHNxdWFyZUluZGV4ID0gaW5kZXhZIC0gMTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEhlaWdodDsgaSsrKSB7XG4gICAgICBsZXQgaW5kZXggPSBpbmRleFggKyBpO1xuICAgICAgbGV0IGNoaWxkcmVuID0gcGFyZW50TGlzdFtpbmRleF07XG4gICAgICBsZXQgbGlzdCA9IGNoaWxkcmVuLmNoaWxkTm9kZXM7XG4gICAgICBsZXQgc3F1YXJlID0gbGlzdFtzcXVhcmVJbmRleF07XG5cbiAgICAgIGlmIChzcXVhcmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNxdWFyZUNsYXNzID0gc3F1YXJlLmNsYXNzTmFtZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImNhcnJpZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJiYXR0bGVzaGlwXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiZGVzdHJveWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwic3VibWFyaW5lXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwicGF0cm9sLWJvYXRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGxldCB0b3BWYWxpZCA9IGNoZWNrVG9wKCk7XG4gIGxldCByaWdodFZhbGlkID0gY2hlY2tSaWdodCgpO1xuICBsZXQgYm90dG9tVmFsaWQgPSBjaGVja0JvdHRvbSgpO1xuICBsZXQgbGVmdFZhbGlkID0gY2hlY2tMZWZ0KCk7XG5cbiAgaWYgKFxuICAgIHRvcFZhbGlkID09PSB0cnVlICYmXG4gICAgcmlnaHRWYWxpZCA9PT0gdHJ1ZSAmJlxuICAgIGJvdHRvbVZhbGlkID09PSB0cnVlICYmXG4gICAgbGVmdFZhbGlkID09PSB0cnVlXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKFxuICAgIHRvcFZhbGlkID09PSBmYWxzZSB8fFxuICAgIHJpZ2h0VmFsaWQgPT09IGZhbHNlIHx8XG4gICAgYm90dG9tVmFsaWQgPT09IGZhbHNlIHx8XG4gICAgbGVmdFZhbGlkID09PSBmYWxzZVxuICApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IHN0YXJ0TWVudUV2ZW50SGFuZGxlciA9ICgpID0+IHtcbiAgY29uc3QgbWFpblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKFxuICAgICAgZWxlbWVudC5pZCA9PT0gXCJjYXJyaWVyXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwiYmF0dGxlc2hpcFwiIHx8XG4gICAgICBlbGVtZW50LmlkID09PSBcImRlc3Ryb3llclwiIHx8XG4gICAgICBlbGVtZW50LmlkID09PSBcInN1Ym1hcmluZVwiIHx8XG4gICAgICBlbGVtZW50LmlkID09PSBcInBhdHJvbC1ib2F0XCJcbiAgICApIHtcbiAgICAgIGxldCBoZWlnaHQgPSBlbGVtZW50LmRhdGFzZXQuaGVpZ2h0O1xuICAgICAgbGV0IHdpZHRoID0gZWxlbWVudC5kYXRhc2V0LndpZHRoO1xuXG4gICAgICBlbGVtZW50LmRhdGFzZXQuaGVpZ2h0ID0gd2lkdGg7XG4gICAgICBlbGVtZW50LmRhdGFzZXQud2lkdGggPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVwbGFjZShcImhvcml6b250YWxcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlcGxhY2UoXCJ2ZXJ0aWNhbFwiLCBcImhvcml6b250YWxcIik7XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldC5pZDtcblxuICAgIGlmIChcbiAgICAgIGVsZW1lbnQgPT09IFwiY2FycmllclwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcImJhdHRsZXNoaXBcIiB8fFxuICAgICAgZWxlbWVudCA9PT0gXCJkZXN0cm95ZXJcIiB8fFxuICAgICAgZWxlbWVudCA9PT0gXCJzdWJtYXJpbmVcIiB8fFxuICAgICAgZWxlbWVudCA9PT0gXCJwYXRyb2wtYm9hdFwiXG4gICAgKSB7XG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBlbGVtZW50KTtcblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgZS50YXJnZXQudGV4dENvbnRlbnQgPSBlbGVtZW50O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gXCJcIjtcbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJ0YWJsZS1jZWxsXCIpIHtcbiAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiYXF1YVwiO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidGFibGUtY2VsbFwiKSB7XG4gICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInRhYmxlLWNlbGxcIikge1xuICAgICAgY29uc3QgZHJvcHpvbmUgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGRyb3B6b25lLnBhcmVudE5vZGU7XG4gICAgICBjb25zdCBub2RlTGlzdCA9IHBhcmVudC5jaGlsZE5vZGVzO1xuICAgICAgY29uc3QgZGF0YSA9IGRyb3B6b25lLmRhdGFzZXQucG9zO1xuICAgICAgY29uc3QgYXJyYXkgPSBkYXRhLnNwbGl0KFwiLFwiKTtcbiAgICAgIGNvbnN0IHggPSBwYXJzZUludChhcnJheVswXSk7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgY29uc3QgZHJhZ2dhYmxlSWQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKTtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcmFnZ2FibGVJZCk7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IGRyYWdnYWJsZUVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgY29uc3Qgc2hpcEhlaWdodCA9IHBhcnNlSW50KGRyYWdnYWJsZUVsZW1lbnQuZGF0YXNldC5oZWlnaHQpO1xuICAgICAgY29uc3Qgc2hpcFdpZHRoID0gcGFyc2VJbnQoZHJhZ2dhYmxlRWxlbWVudC5kYXRhc2V0LndpZHRoKTtcblxuICAgICAgLy8gVGhpcyBjaGVja3MgaWYgdGhlIGRyb3AgaXMgdmFsaWRcbiAgICAgIGxldCB2YWxpZCA9IGlzRHJvcFZhbGlkKHgsIHksIHNoaXBIZWlnaHQsIHNoaXBXaWR0aCwgbm9kZUxpc3QpO1xuICAgICAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgICAvLyBJZiBkcm9wIGlzIG5vdCB2YWxpZCwgc3RvcCBleGVjdXRpb25cbiAgICAgIGlmICh2YWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgbm9kZUxpc3RbeV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgIC8vIFRoaXMgYWRkcyBhIHZpc3VhbCBpbmRpY2F0aW9uIHdoZXJlIHRoZSBzaGlwIGlzIGRyb3BwZWRcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBXaWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB5ICsgaTtcbiAgICAgICAgICAgIG5vZGVMaXN0W2luZGV4XS5jbGFzc0xpc3QuYWRkKGRyYWdnYWJsZUlkKTtcbiAgICAgICAgICAgIG5vZGVMaXN0W2luZGV4XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImFxdWFcIjtcbiAgICAgICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKFt4LCBpbmRleF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUaGlzIGFkZHMgYSB2aXN1YWwgaW5kaWNhdGlvbiB3aGVyZSB0aGUgc2hpcCBpcyBkcm9wcGVkXG4gICAgICAgICAgbGV0IGRyb3BTcXVhcmUgPSBub2RlTGlzdFt5XTtcbiAgICAgICAgICBsZXQgcGFyZW50ID0gZHJvcFNxdWFyZS5wYXJlbnROb2RlO1xuICAgICAgICAgIGxldCBncmFuZFBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICAgIGxldCBwYXJlbnRMaXN0ID0gZ3JhbmRQYXJlbnQuY2hpbGROb2RlcztcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEhlaWdodDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB4ICsgaTtcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IHBhcmVudExpc3RbaW5kZXhdO1xuICAgICAgICAgICAgbGV0IGxpc3QgPSBjaGlsZHJlbi5jaGlsZE5vZGVzO1xuXG4gICAgICAgICAgICBsaXN0W3ldLmNsYXNzTGlzdC5hZGQoZHJhZ2dhYmxlSWQpO1xuICAgICAgICAgICAgbGlzdFt5XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImFxdWFcIjtcbiAgICAgICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKFtpbmRleCwgeV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZVBhcmVudCA9IGRyYWdnYWJsZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgZHJhZ2dhYmxlUGFyZW50LnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgICBlLmRhdGFUcmFuc2Zlci5jbGVhckRhdGEoKTtcbiAgICAgICAgdXNlclNoaXBzQ29vcmRpbmF0ZXMucHVzaChzaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgICBhbGxTaGlwc1BsYWNlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJzdGFydC1idG5cIikge1xuICAgICAgbWFpblNlY3Rpb24udGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICBnZXRDb21wdXRlclNoaXBzKCk7XG4gICAgICBnYW1lTWVudSgpO1xuICAgICAgR2FtZSgpO1xuXG4gICAgICB1c2VyU2hpcHNDb29yZGluYXRlcy5sZW5ndGggPSAwO1xuICAgICAgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMubGVuZ3RoID0gMDtcbiAgICAgIHZpc2l0ZWQubGVuZ3RoID0gMDtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHtcbiAgc3RhcnRNZW51LFxuICB1c2VyU2hpcHNDb29yZGluYXRlcyxcbiAgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMsXG4gIHN0YXJ0TWVudUV2ZW50SGFuZGxlcixcbn07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLnVzZXItY29udGFpbmVyLFxuLmNvbXB1dGVyLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDIwcHg7XG59XG5cbi51c2VyLWJhdHRsZWZpZWxkLFxuLmNvbXB1dGVyLWJhdHRsZWZpZWxkIHtcbiAgaGVpZ2h0OiAzNTBweDtcbiAgd2lkdGg6IDM1MHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG59XG5cbi5zcXVhcmUge1xuICBib3JkZXI6IHNvbGlkIDFweCBncmV5O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnNoaXAtc3F1YXJlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YW1hcmluZTtcbn1cblxuLnNoaXAtbWlzc2VkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn1cblxuLnNoaXAtaGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uc3F1YXJlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvZ2FtZW1lbnUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOztFQUVFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixTQUFTO0FBQ1g7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIudXNlci1jb250YWluZXIsXFxuLmNvbXB1dGVyLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLnVzZXItYmF0dGxlZmllbGQsXFxuLmNvbXB1dGVyLWJhdHRsZWZpZWxkIHtcXG4gIGhlaWdodDogMzUwcHg7XFxuICB3aWR0aDogMzUwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnNxdWFyZSB7XFxuICBib3JkZXI6IHNvbGlkIDFweCBncmV5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNoaXAtc3F1YXJlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XFxufVxcblxcbi5zaGlwLW1pc3NlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG5cXG4uc2hpcC1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uc3F1YXJlOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmJvZHkge1xuICBoZWlnaHQ6IDEwMHZoO1xuICBmb250LXNpemU6IDFyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcbn1cblxuLmNvbnRlbnQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDEwMHB4IDFmciAxNTBweDtcbn1cblxuLm1haW4tc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9nbG9iYWwuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7QUFDaENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xcbn1cXG5cXG4uY29udGVudCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDEwMHB4IDFmciAxNTBweDtcXG59XFxuXFxuLm1haW4tc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC5sZWZ0LXNlY3Rpb24ge1xuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5yaWdodC1zZWN0aW9uIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA1MHB4IDUwcHggMWZyO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5zdGFydC1tZW51LXRhYmxlIHtcbiAgaGVpZ2h0OiA0MDBweDtcbiAgd2lkdGg6IDQwMHB4O1xuICBkaXNwbGF5OiBncmlkO1xufVxuXG50Ym9keSB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLnRhYmxlLXJvdyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG59XG5cbi50YWJsZS1jZWxsIHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5wb3J0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbi1jb250ZW50IGF1dG87XG4gIGdyaWQtYXV0by1yb3dzOiBtaW5tYXgobWluLWNvbnRlbnQsIG1heC1jb250ZW50KTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5jYXJyaWVyLWJlcnRoLFxuLmJhdHRsZXNoaXAtYmVydGgsXG4uZGVzdHJveWVyLWJlcnRoLFxuLnN1Ym1hcmluZS1iZXJ0aCxcbi5wYXRyb2wtYm9hdC1iZXJ0aCB7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbiNjYXJyaWVyLmhvcml6b250YWwge1xuICBoZWlnaHQ6IDM1cHg7XG4gIHdpZHRoOiAyMDBweDtcbn1cbiNiYXR0bGVzaGlwLmhvcml6b250YWwge1xuICBoZWlnaHQ6IDM1cHg7XG4gIHdpZHRoOiAxNjBweDtcbn1cblxuI2Rlc3Ryb3llci5ob3Jpem9udGFsLFxuI3N1Ym1hcmluZS5ob3Jpem9udGFsIHtcbiAgaGVpZ2h0OiAzNXB4O1xuICB3aWR0aDogMTIwcHg7XG59XG5cbiNwYXRyb2wtYm9hdC5ob3Jpem9udGFsIHtcbiAgaGVpZ2h0OiAzNXB4O1xuICB3aWR0aDogODBweDtcbn1cblxuI2NhcnJpZXIudmVydGljYWwge1xuICBoZWlnaHQ6IDIwMHB4O1xuICB3aWR0aDogMzVweDtcbn1cblxuI2JhdHRsZXNoaXAudmVydGljYWwge1xuICBoZWlnaHQ6IDE2MHB4O1xuICB3aWR0aDogMzVweDtcbn1cblxuI2Rlc3Ryb3llci52ZXJ0aWNhbCxcbiNzdWJtYXJpbmUudmVydGljYWwge1xuICBoZWlnaHQ6IDEyMHB4O1xuICB3aWR0aDogMzVweDtcbn1cblxuI3BhdHJvbC1ib2F0LnZlcnRpY2FsIHtcbiAgaGVpZ2h0OiA4MHB4O1xuICB3aWR0aDogMzVweDtcbn1cblxuI2NhcnJpZXIsXG4jYmF0dGxlc2hpcCxcbiNkZXN0cm95ZXIsXG4jc3VibWFyaW5lLFxuI3BhdHJvbC1ib2F0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xuICBib3JkZXI6IDFweCBzb2xpZCBza3libHVlO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnN0YXJ0LWJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgd2lkdGg6IDIwMHB4O1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3RhcnRtZW51LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGlDQUFpQztFQUNqQyxxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osV0FBVztFQUNYLGFBQWE7RUFDYix1Q0FBdUM7RUFDdkMsZ0RBQWdEO0VBQ2hELHVCQUF1QjtBQUN6Qjs7QUFFQTs7Ozs7RUFLRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtBQUNkO0FBQ0E7RUFDRSxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBOztFQUVFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7Ozs7O0VBS0UsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQix5QkFBeUI7RUFDekIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsWUFBWTtFQUNaLFFBQVE7RUFDUixTQUFTO0VBQ1QsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5sZWZ0LXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5yaWdodC1zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDUwcHggNTBweCAxZnI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc3RhcnQtbWVudS10YWJsZSB7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxudGJvZHkge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi50YWJsZS1yb3cge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4udGFibGUtY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5wb3J0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgYXV0bztcXG4gIGdyaWQtYXV0by1yb3dzOiBtaW5tYXgobWluLWNvbnRlbnQsIG1heC1jb250ZW50KTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uY2Fycmllci1iZXJ0aCxcXG4uYmF0dGxlc2hpcC1iZXJ0aCxcXG4uZGVzdHJveWVyLWJlcnRoLFxcbi5zdWJtYXJpbmUtYmVydGgsXFxuLnBhdHJvbC1ib2F0LWJlcnRoIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbiNjYXJyaWVyLmhvcml6b250YWwge1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbn1cXG4jYmF0dGxlc2hpcC5ob3Jpem9udGFsIHtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuXFxuI2Rlc3Ryb3llci5ob3Jpem9udGFsLFxcbiNzdWJtYXJpbmUuaG9yaXpvbnRhbCB7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICB3aWR0aDogMTIwcHg7XFxufVxcblxcbiNwYXRyb2wtYm9hdC5ob3Jpem9udGFsIHtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiA4MHB4O1xcbn1cXG5cXG4jY2Fycmllci52ZXJ0aWNhbCB7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgd2lkdGg6IDM1cHg7XFxufVxcblxcbiNiYXR0bGVzaGlwLnZlcnRpY2FsIHtcXG4gIGhlaWdodDogMTYwcHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxuI2Rlc3Ryb3llci52ZXJ0aWNhbCxcXG4jc3VibWFyaW5lLnZlcnRpY2FsIHtcXG4gIGhlaWdodDogMTIwcHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxuI3BhdHJvbC1ib2F0LnZlcnRpY2FsIHtcXG4gIGhlaWdodDogODBweDtcXG4gIHdpZHRoOiAzNXB4O1xcbn1cXG5cXG4jY2FycmllcixcXG4jYmF0dGxlc2hpcCxcXG4jZGVzdHJveWVyLFxcbiNzdWJtYXJpbmUsXFxuI3BhdHJvbC1ib2F0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBza3libHVlO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc3RhcnQtYnRuIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwcHg7XFxuICB3aWR0aDogMjAwcHg7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2FtZW1lbnUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nYW1lbWVudS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2xvYmFsLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2xvYmFsLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGFydG1lbnUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGFydG1lbnUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBwYWdlTGF5b3V0IH0gZnJvbSBcIi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBzdGFydE1lbnUsIHN0YXJ0TWVudUV2ZW50SGFuZGxlciB9IGZyb20gXCIuL3N0YXJ0LW1lbnVcIjtcblxuY29uc3QgY29tcG9uZW50ID0gKCkgPT4ge1xuICBwYWdlTGF5b3V0KCk7XG5cbiAgc3RhcnRNZW51KCk7XG5cbiAgc3RhcnRNZW51RXZlbnRIYW5kbGVyKCk7XG59O1xuY29tcG9uZW50KCk7XG4iXSwibmFtZXMiOlsic3RhcnRNZW51IiwicGxheVJvdW5kIiwidXNlckF0dGFja3MiLCJjb21wdXRlckF0dGFja3MiLCJnYW1lTWVudSIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50IiwiY29udGFpbmVyT25lIiwiY3JlYXRlRWxlbWVudCIsImNvbnRhaW5lclR3byIsImJhdHRsZWZpZWxkT25lIiwiYmF0dGxlZmllbGRUd28iLCJiYXR0bGVmaWVsZE9uZVBhcmEiLCJiYXR0bGVmaWVsZFR3b1BhcmEiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInJlbmRlckJvYXJkcyIsInVzZXJCYXR0bGVmaWVsZCIsImNvbXB1dGVyQmF0dGxlZmllbGQiLCJyZW5kZXJVc2VyQm9hcmQiLCJib2FyZCIsImkiLCJsZW5ndGgiLCJyb3ciLCJqIiwiYnRuIiwiZGF0YSIsInR5cGUiLCJkYXRhc2V0IiwicG9zIiwicmVuZGVyQ29tcHV0ZXJCb2FyZCIsImdhbWVXaW5uZXIiLCJ3aW5uZXIiLCJ3aW5uZXJBbm5vdW5jZXIiLCJyZXN0YXJ0QnV0dG9uIiwiZ2FtZU1lbnVFdmVudEhhbmRsZXIiLCJtYWluU2VjdGlvbiIsIndpbm5lckNvbnRhaW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiaGFzQ2hpbGROb2RlcyIsInRhcmdldCIsImNsYXNzTmFtZSIsInNxdWFyZSIsImFycmF5Iiwic3BsaXQiLCJwYXJzZUludCIsIlBsYXllclNoaXBzIiwiU2hpcCIsIkdhbWVCb2FyZCIsImNyZWF0ZUJvYXJkIiwiZ2V0Qm9hcmQiLCJwbGF5ZXJTaGlwcyIsInNoaXBzIiwiZ2V0U2hpcHMiLCJwb3B1bGF0ZUJvYXJkIiwiYWRkU2hpcENvb3JkaW5hdGVzIiwicGxhY2VTaGlwcyIsImZpbmRBdHRhY2tlZFNoaXAiLCJrZXkiLCJjb29yZGluYXRlcyIsImVsZW1lbnQiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJhdHRhY2tlZFNoaXAiLCJoaXQiLCJhbGxTaGlwc0Rlc3Ryb3llZCIsImNvdW50Iiwic2hpcFN0YXRlIiwiZGVzdHJveWVkIiwiUGxheWVyIiwidXNlclNoaXBzQ29vcmRpbmF0ZXMiLCJjb21wdXRlclNoaXBDb29yZGluYXRlcyIsInVzZXJHYW1lQm9hcmQiLCJjb21wdXRlckdhbWVCb2FyZCIsInVzZXIiLCJjb21wdXRlciIsIkdhbWUiLCJ1c2VyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwiYXR0YWNrIiwicGFnZUxheW91dCIsImNvbnRlbnQiLCJoZWFkZXIiLCJtYWluIiwiZm9vdGVyIiwidGl0bGUiLCJsb2dvQ29udGFpbmVyIiwibG9nbyIsIkltYWdlIiwiYWx0IiwibmFtZSIsImdldE5hbWUiLCJpc0F0dGFja0xlZ2FsIiwiZW5lbXkiLCJzbGljZSIsInNoaWZ0IiwiZW5lbXlOYW1lIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY2hlY2tMZWdhbCIsInB1c2giLCJjYXJyaWVyIiwiaGl0cyIsImJhdHRsZXNoaXAiLCJkZXN0cm95ZXIiLCJzdWJtYXJpbmUiLCJwYXRyb2xCb2F0IiwiY29weSIsInNoaXBBcnJheSIsImFyciIsImlzU3VuayIsInNoaXAiLCJzaGlwTGVuZ3RoIiwiaGl0c0NvdW50IiwiY2hlY2tTaGlwIiwiZ2V0U3RhcnRTY3JlZW5Cb2FyZCIsImdhbWVCb2FyZCIsImxlZnRTZWN0aW9uIiwicmlnaHRTZWN0aW9uIiwidGFibGUiLCJ0YWJsZUJvZHkiLCJwYXJhIiwicGFyYVR3byIsInNoaXBzQ29udGFpbmVyIiwiY2FycmllckJlcnRoIiwiYmF0dGxlc2hpcEJlcnRoIiwiZGVzdHJveWVyQmVydGgiLCJzdWJtYXJpbmVCZXJ0aCIsInBhdHJvbEJvYXRCZXJ0aCIsImlkIiwiaGVpZ2h0Iiwid2lkdGgiLCJkcmFnZ2FibGUiLCJ0YWJsZVJvdyIsImNlbGwiLCJ2aXNpdGVkIiwiaXNBcnJheUluQXJyYXkiLCJzb3VyY2UiLCJzZWFyY2giLCJzZWFyY2hFbGUiLCJzb3VyY2VFbGUiLCJnZXRSYW5kb21Qb3NpdGlvbiIsInZhbGlkIiwiZ2V0QWRqQ29vcmRpbmF0ZXMiLCJhZGpQb3NpdGlvbnMiLCJvcmllbnRhdGlvbiIsIm9uZSIsInR3byIsImFkakxlZnQiLCJhZGpSaWdodCIsImFkalRvcCIsImxlZnQiLCJyaWdodCIsImFkakJvdHRvbSIsInRvcCIsImJvdHRvbSIsImdldExlZ2FsQ29tYm9zIiwibGVnYWxDb21ib3MiLCJzZXQiLCJsZW5ndGhEaWZmIiwiYXJyYXlMZW5ndGgiLCJ2YWx1ZXMiLCJtb3ZlIiwiZ2V0Q29tcHV0ZXJTaGlwcyIsInJlcGVhdFNoaXAiLCJpdGVtVmlzaXRlZCIsImNvb3JkaW5hdGUiLCJhZGpDb29yZGluYXRlcyIsImFsbFNoaXBzUGxhY2VkIiwicG9ydCIsIm5vZGVMaXN0IiwiY2hpbGROb2RlcyIsImlzRHJvcFZhbGlkIiwiaW5kZXhYIiwiaW5kZXhZIiwic2hpcEhlaWdodCIsInNoaXBXaWR0aCIsImNoZWNrVG9wIiwiZHJvcFNxdWFyZSIsInBhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnRTaWJsaW5nIiwicHJldmlvdXNTaWJsaW5nIiwic3RhcnRJbmRleCIsInNxdWFyZUluZGV4IiwidW5kZWZpbmVkIiwic3F1YXJlQ2xhc3MiLCJpbmNsdWRlcyIsImNoZWNrUmlnaHQiLCJncmFuZFBhcmVudCIsInBhcmVudExpc3QiLCJpbmRleCIsImNoaWxkcmVuIiwibGlzdCIsImNoZWNrQm90dG9tIiwibmV4dFNpYmxpbmciLCJjaGVja0xlZnQiLCJ0b3BWYWxpZCIsInJpZ2h0VmFsaWQiLCJib3R0b21WYWxpZCIsImxlZnRWYWxpZCIsInN0YXJ0TWVudUV2ZW50SGFuZGxlciIsInJlcGxhY2UiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwcmV2ZW50RGVmYXVsdCIsImRyb3B6b25lIiwiZHJhZ2dhYmxlSWQiLCJnZXREYXRhIiwiZHJhZ2dhYmxlRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwic2hpcENvb3JkaW5hdGVzIiwiZHJhZ2dhYmxlUGFyZW50IiwiY2xlYXJEYXRhIiwiY29tcG9uZW50Il0sInNvdXJjZVJvb3QiOiIifQ==