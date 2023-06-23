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
/* harmony export */   pageLayout: () => (/* binding */ pageLayout),
/* harmony export */   renderBoards: () => (/* binding */ renderBoards)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/styles.css */ "./src/styles/styles.css");



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
      (0,_game__WEBPACK_IMPORTED_MODULE_0__.playRound)(pos);
    }
  });
  winnerContainer.addEventListener("click", e => {
    if (e.target.className = "restart-button") {
      parentTwo.textContent = "";

      // Empty attacked squares history
      _player__WEBPACK_IMPORTED_MODULE_1__.userAttacks.length = 0;
      _player__WEBPACK_IMPORTED_MODULE_1__.computerAttacks.length = 0;

      // Start new game
      (0,_game__WEBPACK_IMPORTED_MODULE_0__.Game)();
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
  const ships = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.PlayerShips)();
  const populateBoard = () => {
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
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");



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

  // Populate boards with ships for each player
  // userGameBoard.populateBoard();
  // computerGameBoard.populateBoard();

  //   Get player boards from GameBoard objects
  const userBoard = userGameBoard.getBoard();
  const computerBoard = computerGameBoard.getBoard();

  // Initial player boards are rendered
  (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderUserBoard(userBoard);
  (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderComputerBoard(computerBoard);
};
const playRound = pos => {
  let userAttacks = user.attack(computer, computerGameBoard, pos);
  if (userAttacks === false) {
    return;
  } else {
    // Update computer board on the screen
    const computerBoard = computerGameBoard.getBoard();
    (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderComputerBoard(computerBoard);

    // Check if all computer ships are destroyed
    if (computerGameBoard.allShipsDestroyed() === true) {
      (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.gameWinner)("You Win!");
      return;
    }

    // Computer attacks the user 200 seconds after being attacked
    const myPromise = new Promise(resolve => {
      setTimeout(() => {
        resolve(computer.attack(user, userGameBoard, pos));
      }, 200);
    }).then(() => {
      // Update user board on the screen
      const userBoard = userGameBoard.getBoard();
      (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderUserBoard(userBoard);

      // Check if all user ships are destroyed
      if (userGameBoard.allShipsDestroyed() === true) {
        (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.gameWinner)("Computer Wins!");
        return;
      }
    });
  }
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
  let carrier = {
    length: 5,
    hits: 0,
    destroyed: false,
    coordinates: [[5, 1], [6, 1], [7, 1], [8, 1], [9, 1]]
  };
  let battleship = {
    length: 4,
    hits: 0,
    destroyed: false,
    coordinates: [[0, 8], [1, 8], [2, 8], [3, 8]]
  };
  let destroyer = {
    length: 3,
    hits: 0,
    destroyed: false,
    coordinates: [[5, 5], [5, 6], [5, 7]]
  };
  let submarine = {
    length: 3,
    hits: 0,
    destroyed: false,
    coordinates: [[1, 2], [1, 3], [1, 4]]
  };
  let patrolBoat = {
    length: 2,
    hits: 0,
    destroyed: false,
    coordinates: [[7, 8], [8, 8]]
  };
  return {
    carrier,
    battleship,
    destroyer,
    submarine,
    patrolBoat
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
/* harmony export */   startMenu: () => (/* binding */ startMenu),
/* harmony export */   startMenuEventHandler: () => (/* binding */ startMenuEventHandler)
/* harmony export */ });
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");

const getStartScreenBoard = () => {
  const gameBoard = (0,_game_board__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();

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



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css ***!
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

.user-container,
.computer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.left-section {
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
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.table-cell {
  border: 1px solid gray;
  background-color: white;
}

.port {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.carrier {
  width: 200px;
}

.battleship {
  width: 160px;
}

.destroyer {
  width: 120px;
}

.submarine {
  width: 120px;
}

.patrol-boat {
  width: 80px;
}

.carrier,
.battleship,
.destroyer,
.submarine,
.patrol-boat {
  height: 40px;
  background-color: lightblue;
  border: 1px solid skyblue;
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
`, "",{"version":3,"sources":["webpack://./src/styles/styles.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,wBAAwB;AAC1B;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,+BAA+B;EAC/B,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,sBAAsB;EACtB,uBAAuB;AACzB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;;;;;EAKE,YAAY;EACZ,2BAA2B;EAC3B,yBAAyB;AAC3B;;AAEA;;EAEE,aAAa;EACb,YAAY;EACZ,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  font-size: 1rem;\n  background-color: bisque;\n}\n\n.content {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-rows: 100px 1fr 150px;\n}\n\n.main-section {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n\n.user-container,\n.computer-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.left-section {\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n.right-section {\n  display: grid;\n  grid-template-rows: 1fr 3fr 1fr;\n  justify-items: center;\n  align-items: center;\n}\n\n.start-menu-table {\n  height: 400px;\n  width: 400px;\n  display: grid;\n}\n\ntbody {\n  width: 100%;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.table-row {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.table-cell {\n  border: 1px solid gray;\n  background-color: white;\n}\n\n.port {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n\n.carrier {\n  width: 200px;\n}\n\n.battleship {\n  width: 160px;\n}\n\n.destroyer {\n  width: 120px;\n}\n\n.submarine {\n  width: 120px;\n}\n\n.patrol-boat {\n  width: 80px;\n}\n\n.carrier,\n.battleship,\n.destroyer,\n.submarine,\n.patrol-boat {\n  height: 40px;\n  background-color: lightblue;\n  border: 1px solid skyblue;\n}\n\n.user-battlefield,\n.computer-battlefield {\n  height: 350px;\n  width: 350px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.square {\n  border: solid 1px grey;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.ship-square {\n  background-color: aquamarine;\n}\n\n.ship-missed {\n  background-color: grey;\n}\n\n.ship-hit {\n  background-color: red;\n}\n\n.square:hover {\n  background-color: green;\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");
/* harmony import */ var _start_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./start-menu */ "./src/start-menu.js");

// import { userEventHandler } from "./battleship";

const component = () => {
  (0,_battleship__WEBPACK_IMPORTED_MODULE_0__.pageLayout)();
  // Game();
  (0,_start_menu__WEBPACK_IMPORTED_MODULE_1__.startMenu)();
  // userEventHandler();
  (0,_start_menu__WEBPACK_IMPORTED_MODULE_1__.startMenuEventHandler)();
};
component();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUM7QUFDZTtBQUMzQjtBQUU3QixNQUFNSSxVQUFVLEdBQUdBLENBQUEsS0FBTTtFQUN2QixNQUFNQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFVBQVUsQ0FBQztFQUNsRCxNQUFNQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUM1QyxNQUFNQyxJQUFJLEdBQUdKLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMxQyxNQUFNRSxNQUFNLEdBQUdMLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUM1QyxNQUFNRyxLQUFLLEdBQUdOLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLElBQUksQ0FBQztFQUUxQyxNQUFNSSxlQUFlLEdBQUdQLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUNyRCxNQUFNSyxhQUFhLEdBQUdSLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUNuRCxNQUFNTSxJQUFJLEdBQUcsSUFBSUMsS0FBSyxDQUFDLENBQUM7RUFFeEJSLE1BQU0sQ0FBQ1MsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQzlCUixJQUFJLENBQUNPLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsQ0FBQztFQUNsQ1AsTUFBTSxDQUFDTSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDOUJOLEtBQUssQ0FBQ0ssU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0VBQzVCTixLQUFLLENBQUNPLFdBQVcsR0FBRyxZQUFZO0VBRWhDTixlQUFlLENBQUNJLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGtCQUFrQixDQUFDO0VBQ2pESixhQUFhLENBQUNHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0VBQzdDSCxJQUFJLENBQUNLLEdBQUcsR0FBRyxnQkFBZ0I7RUFFM0JOLGFBQWEsQ0FBQ08sV0FBVyxDQUFDTixJQUFJLENBQUM7RUFDL0JQLE1BQU0sQ0FBQ2EsV0FBVyxDQUFDVCxLQUFLLENBQUM7RUFDekJKLE1BQU0sQ0FBQ2EsV0FBVyxDQUFDUCxhQUFhLENBQUM7RUFDakNOLE1BQU0sQ0FBQ2EsV0FBVyxDQUFDUixlQUFlLENBQUM7RUFDbkNSLE9BQU8sQ0FBQ2dCLFdBQVcsQ0FBQ2IsTUFBTSxDQUFDO0VBQzNCSCxPQUFPLENBQUNnQixXQUFXLENBQUNYLElBQUksQ0FBQztFQUN6QkwsT0FBTyxDQUFDZ0IsV0FBVyxDQUFDVixNQUFNLENBQUM7QUFDN0IsQ0FBQztBQUVELE1BQU1XLFFBQVEsR0FBR0EsQ0FBQSxLQUFNO0VBQ3JCLE1BQU1DLFNBQVMsR0FBR2pCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGVBQWUsQ0FBQztFQUV6RGdCLFNBQVMsQ0FBQ0osV0FBVyxHQUFHLEVBQUU7RUFFMUIsTUFBTUssWUFBWSxHQUFHbEIsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ2xELE1BQU1nQixZQUFZLEdBQUduQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDbEQsTUFBTWlCLGNBQWMsR0FBR3BCLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUNwRCxNQUFNa0IsY0FBYyxHQUFHckIsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ3BELE1BQU1tQixrQkFBa0IsR0FBR3RCLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEdBQUcsQ0FBQztFQUN0RCxNQUFNb0Isa0JBQWtCLEdBQUd2QixRQUFRLENBQUNHLGFBQWEsQ0FBQyxHQUFHLENBQUM7RUFFdERlLFlBQVksQ0FBQ1AsU0FBUyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7RUFDNUNPLFlBQVksQ0FBQ1IsU0FBUyxDQUFDQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7RUFDaERRLGNBQWMsQ0FBQ1QsU0FBUyxDQUFDQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7RUFDaERTLGNBQWMsQ0FBQ1YsU0FBUyxDQUFDQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7RUFDcERVLGtCQUFrQixDQUFDVCxXQUFXLEdBQUcsY0FBYztFQUMvQ1Usa0JBQWtCLENBQUNWLFdBQVcsR0FBRyxVQUFVO0VBRTNDSyxZQUFZLENBQUNILFdBQVcsQ0FBQ0ssY0FBYyxDQUFDO0VBQ3hDRCxZQUFZLENBQUNKLFdBQVcsQ0FBQ00sY0FBYyxDQUFDO0VBQ3hDSCxZQUFZLENBQUNILFdBQVcsQ0FBQ08sa0JBQWtCLENBQUM7RUFDNUNILFlBQVksQ0FBQ0osV0FBVyxDQUFDUSxrQkFBa0IsQ0FBQztFQUM1Q04sU0FBUyxDQUFDRixXQUFXLENBQUNHLFlBQVksQ0FBQztFQUNuQ0QsU0FBUyxDQUFDRixXQUFXLENBQUNJLFlBQVksQ0FBQztBQUNyQyxDQUFDO0FBRUQsTUFBTUssWUFBWSxHQUFHQSxDQUFBLEtBQU07RUFDekIsTUFBTUMsZUFBZSxHQUFHekIsUUFBUSxDQUFDQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7RUFDbkUsTUFBTXlCLG1CQUFtQixHQUFHMUIsUUFBUSxDQUFDQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7O0VBRTNFO0VBQ0EsTUFBTTBCLGVBQWUsR0FBSUMsS0FBSyxJQUFLO0lBQ2pDSCxlQUFlLENBQUNaLFdBQVcsR0FBRyxFQUFFO0lBRWhDLEtBQUssSUFBSWdCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0QsS0FBSyxDQUFDRSxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQ3JDLE1BQU1FLEdBQUcsR0FBR0gsS0FBSyxDQUFDQyxDQUFDLENBQUM7TUFFcEIsS0FBSyxJQUFJRyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdELEdBQUcsQ0FBQ0QsTUFBTSxFQUFFRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxNQUFNQyxHQUFHLEdBQUdqQyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDNUMsTUFBTStCLElBQUksR0FBR04sS0FBSyxDQUFDQyxDQUFDLENBQUMsQ0FBQ0csQ0FBQyxDQUFDO1FBRXhCQyxHQUFHLENBQUN0QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDM0JxQixHQUFHLENBQUNFLElBQUksR0FBRyxRQUFRO1FBQ25CRixHQUFHLENBQUNHLE9BQU8sQ0FBQ0MsR0FBRyxHQUFJLEdBQUVSLENBQUUsSUFBR0csQ0FBRSxFQUFDO1FBRTdCLElBQUlFLElBQUksS0FBSyxDQUFDLEVBQUU7VUFDZEQsR0FBRyxDQUFDdEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ2xDLENBQUMsTUFBTSxJQUFJc0IsSUFBSSxLQUFLLENBQUMsRUFBRTtVQUNyQkQsR0FBRyxDQUFDdEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ2xDLENBQUMsTUFBTSxJQUFJc0IsSUFBSSxLQUFLLENBQUMsRUFBRTtVQUNyQkQsR0FBRyxDQUFDdEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQy9CO1FBRUFhLGVBQWUsQ0FBQ1YsV0FBVyxDQUFDa0IsR0FBRyxDQUFDO01BQ2xDO0lBQ0Y7RUFDRixDQUFDOztFQUVEO0VBQ0EsTUFBTUssbUJBQW1CLEdBQUlWLEtBQUssSUFBSztJQUNyQ0YsbUJBQW1CLENBQUNiLFdBQVcsR0FBRyxFQUFFO0lBRXBDLEtBQUssSUFBSWdCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0QsS0FBSyxDQUFDRSxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQ3JDLE1BQU1FLEdBQUcsR0FBR0gsS0FBSyxDQUFDQyxDQUFDLENBQUM7TUFFcEIsS0FBSyxJQUFJRyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdELEdBQUcsQ0FBQ0QsTUFBTSxFQUFFRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxNQUFNQyxHQUFHLEdBQUdqQyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDNUMsTUFBTStCLElBQUksR0FBR04sS0FBSyxDQUFDQyxDQUFDLENBQUMsQ0FBQ0csQ0FBQyxDQUFDO1FBRXhCQyxHQUFHLENBQUN0QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDM0JxQixHQUFHLENBQUNFLElBQUksR0FBRyxRQUFRO1FBQ25CRixHQUFHLENBQUNHLE9BQU8sQ0FBQ0MsR0FBRyxHQUFJLEdBQUVSLENBQUUsSUFBR0csQ0FBRSxFQUFDO1FBRTdCLElBQUlFLElBQUksS0FBSyxDQUFDLEVBQUU7VUFDZEQsR0FBRyxDQUFDdEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ2xDLENBQUMsTUFBTSxJQUFJc0IsSUFBSSxLQUFLLENBQUMsRUFBRTtVQUNyQkQsR0FBRyxDQUFDdEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQy9CO1FBRUFjLG1CQUFtQixDQUFDWCxXQUFXLENBQUNrQixHQUFHLENBQUM7TUFDdEM7SUFDRjtFQUNGLENBQUM7RUFDRCxPQUFPO0lBQUVOLGVBQWU7SUFBRVc7RUFBb0IsQ0FBQztBQUNqRCxDQUFDO0FBRUQsTUFBTUMsVUFBVSxHQUFJQyxNQUFNLElBQUs7RUFDN0IsTUFBTXZCLFNBQVMsR0FBR2pCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0VBQzdELE1BQU13QyxlQUFlLEdBQUd6QyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxJQUFJLENBQUM7RUFDcEQsTUFBTXVDLGFBQWEsR0FBRzFDLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUV0RHNDLGVBQWUsQ0FBQzlCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztFQUN2QzZCLGVBQWUsQ0FBQzVCLFdBQVcsR0FBRzJCLE1BQU07RUFDcENFLGFBQWEsQ0FBQy9CLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0VBQzdDOEIsYUFBYSxDQUFDUCxJQUFJLEdBQUcsUUFBUTtFQUM3Qk8sYUFBYSxDQUFDN0IsV0FBVyxHQUFHLFNBQVM7RUFFckNJLFNBQVMsQ0FBQ0YsV0FBVyxDQUFDMEIsZUFBZSxDQUFDO0VBQ3RDeEIsU0FBUyxDQUFDRixXQUFXLENBQUMyQixhQUFhLENBQUM7QUFDdEMsQ0FBQztBQUVELE1BQU1DLG9CQUFvQixHQUFHQSxDQUFBLEtBQU07RUFDakMsTUFBTUMsV0FBVyxHQUFHNUMsUUFBUSxDQUFDQyxhQUFhLENBQUMsZUFBZSxDQUFDO0VBQzNELE1BQU1NLGVBQWUsR0FBR1AsUUFBUSxDQUFDQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7RUFFbkUyQyxXQUFXLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sRUFBR0MsQ0FBQyxJQUFLO0lBQzNDLElBQUl2QyxlQUFlLENBQUN3QyxhQUFhLENBQUMsQ0FBQyxFQUFFO01BQ25DO0lBQ0Y7SUFFQSxJQUFJRCxDQUFDLENBQUNFLE1BQU0sQ0FBQ0MsU0FBUyxLQUFLLFFBQVEsRUFBRTtNQUNuQyxNQUFNQyxNQUFNLEdBQUdKLENBQUMsQ0FBQ0UsTUFBTTtNQUN2QixNQUFNZCxJQUFJLEdBQUdnQixNQUFNLENBQUNkLE9BQU8sQ0FBQ0MsR0FBRztNQUMvQixNQUFNYyxLQUFLLEdBQUdqQixJQUFJLENBQUNrQixLQUFLLENBQUMsR0FBRyxDQUFDO01BQzdCLE1BQU1mLEdBQUcsR0FBRyxDQUFDZ0IsUUFBUSxDQUFDRixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUUsUUFBUSxDQUFDRixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUVwRHhELGdEQUFTLENBQUMwQyxHQUFHLENBQUM7SUFDaEI7RUFDRixDQUFDLENBQUM7RUFFRjlCLGVBQWUsQ0FBQ3NDLGdCQUFnQixDQUFDLE9BQU8sRUFBR0MsQ0FBQyxJQUFLO0lBQy9DLElBQUtBLENBQUMsQ0FBQ0UsTUFBTSxDQUFDQyxTQUFTLEdBQUcsZ0JBQWdCLEVBQUc7TUFDM0NLLFNBQVMsQ0FBQ3pDLFdBQVcsR0FBRyxFQUFFOztNQUUxQjtNQUNBakIsZ0RBQVcsQ0FBQ2tDLE1BQU0sR0FBRyxDQUFDO01BQ3RCakMsb0RBQWUsQ0FBQ2lDLE1BQU0sR0FBRyxDQUFDOztNQUUxQjtNQUNBcEMsMkNBQUksQ0FBQyxDQUFDO0lBQ1I7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdksyQztBQUU1QyxNQUFNK0QsU0FBUyxHQUFHQSxDQUFBLEtBQU07RUFDdEIsSUFBSTdCLEtBQUssR0FBRyxFQUFFO0VBRWQsTUFBTThCLFdBQVcsR0FBR0EsQ0FBQSxLQUFNO0lBQ3hCLEtBQUssSUFBSTdCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO01BQzNCRCxLQUFLLENBQUNDLENBQUMsQ0FBQyxHQUFHLEVBQUU7TUFDYixLQUFLLElBQUlHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO1FBQzNCSixLQUFLLENBQUNDLENBQUMsQ0FBQyxDQUFDRyxDQUFDLENBQUMsR0FBRyxDQUFDO01BQ2pCO0lBQ0Y7RUFDRixDQUFDO0VBRUQsTUFBTTJCLFFBQVEsR0FBR0EsQ0FBQSxLQUFNL0IsS0FBSztFQUU1QixNQUFNZ0MsS0FBSyxHQUFHTCxtREFBVyxDQUFDLENBQUM7RUFFM0IsTUFBTU0sYUFBYSxHQUFHQSxDQUFBLEtBQU07SUFDMUI7SUFDQUwsNENBQUksQ0FBQyxDQUFDLENBQUNNLFVBQVUsQ0FBQ2xDLEtBQUssRUFBRWdDLEtBQUssQ0FBQztFQUNqQyxDQUFDO0VBRUQsTUFBTUcsZ0JBQWdCLEdBQUkxQixHQUFHLElBQUs7SUFDaEMsS0FBSyxJQUFJMkIsR0FBRyxJQUFJSixLQUFLLEVBQUU7TUFDckIsTUFBTVQsS0FBSyxHQUFHUyxLQUFLLENBQUNJLEdBQUcsQ0FBQyxDQUFDQyxXQUFXO01BRXBDLEtBQUssSUFBSXBDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3NCLEtBQUssQ0FBQ3JCLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7UUFDckMsTUFBTXFDLE9BQU8sR0FBR2YsS0FBSyxDQUFDdEIsQ0FBQyxDQUFDO1FBRXhCLElBQUlxQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUs3QixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk2QixPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUs3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7VUFDbEQsT0FBT3VCLEtBQUssQ0FBQ0ksR0FBRyxDQUFDO1FBQ25CO01BQ0Y7SUFDRjtFQUNGLENBQUM7RUFFRCxNQUFNRyxhQUFhLEdBQUk5QixHQUFHLElBQUs7SUFDN0IsSUFBSStCLENBQUMsR0FBRy9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDZCxJQUFJZ0MsQ0FBQyxHQUFHaEMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVkLElBQUlULEtBQUssQ0FBQ3dDLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7TUFDckIsTUFBTUMsWUFBWSxHQUFHUCxnQkFBZ0IsQ0FBQzFCLEdBQUcsQ0FBQzs7TUFFMUM7TUFDQVQsS0FBSyxDQUFDd0MsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxHQUFHLENBQUM7O01BRWY7TUFDQWIsNENBQUksQ0FBQyxDQUFDLENBQUNlLEdBQUcsQ0FBQ0QsWUFBWSxDQUFDO0lBQzFCLENBQUMsTUFBTSxJQUFJMUMsS0FBSyxDQUFDd0MsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtNQUM1QjtNQUNBekMsS0FBSyxDQUFDd0MsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDakI7RUFDRixDQUFDO0VBRUQsTUFBTUcsaUJBQWlCLEdBQUdBLENBQUEsS0FBTTtJQUM5QixJQUFJQyxLQUFLLEdBQUcsQ0FBQztJQUViLEtBQUssSUFBSVQsR0FBRyxJQUFJSixLQUFLLEVBQUU7TUFDckIsTUFBTWMsU0FBUyxHQUFHZCxLQUFLLENBQUNJLEdBQUcsQ0FBQyxDQUFDVyxTQUFTO01BRXRDLElBQUlELFNBQVMsS0FBSyxJQUFJLEVBQUU7UUFDdEJELEtBQUssSUFBSSxDQUFDO01BQ1o7SUFDRjtJQUVBLE9BQU9BLEtBQUssS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUs7RUFDbkMsQ0FBQztFQUVELE9BQU87SUFDTGYsV0FBVztJQUNYQyxRQUFRO0lBQ1JFLGFBQWE7SUFDYk0sYUFBYTtJQUNiSztFQUNGLENBQUM7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUV3QztBQUNQO0FBQ3NCO0FBRXhELElBQUlLLGFBQWE7QUFDakIsSUFBSUMsaUJBQWlCO0FBQ3JCLElBQUlDLElBQUk7QUFDUixJQUFJQyxRQUFRO0FBRVosTUFBTXRGLElBQUksR0FBR0EsQ0FBQSxLQUFNO0VBQ2pCO0VBQ0FxRixJQUFJLEdBQUdILCtDQUFNLENBQUMsTUFBTSxDQUFDO0VBQ3JCSSxRQUFRLEdBQUdKLCtDQUFNLENBQUMsYUFBYSxDQUFDO0VBRWhDQyxhQUFhLEdBQUdwQixzREFBUyxDQUFDLENBQUM7RUFDM0JxQixpQkFBaUIsR0FBR3JCLHNEQUFTLENBQUMsQ0FBQzs7RUFFL0I7RUFDQW9CLGFBQWEsQ0FBQ25CLFdBQVcsQ0FBQyxDQUFDO0VBQzNCb0IsaUJBQWlCLENBQUNwQixXQUFXLENBQUMsQ0FBQzs7RUFFL0I7RUFDQTtFQUNBOztFQUVBO0VBQ0EsTUFBTXVCLFNBQVMsR0FBR0osYUFBYSxDQUFDbEIsUUFBUSxDQUFDLENBQUM7RUFDMUMsTUFBTXVCLGFBQWEsR0FBR0osaUJBQWlCLENBQUNuQixRQUFRLENBQUMsQ0FBQzs7RUFFbEQ7RUFDQW5DLHlEQUFZLENBQUMsQ0FBQyxDQUFDRyxlQUFlLENBQUNzRCxTQUFTLENBQUM7RUFDekN6RCx5REFBWSxDQUFDLENBQUMsQ0FBQ2MsbUJBQW1CLENBQUM0QyxhQUFhLENBQUM7QUFDbkQsQ0FBQztBQUVELE1BQU12RixTQUFTLEdBQUkwQyxHQUFHLElBQUs7RUFDekIsSUFBSXpDLFdBQVcsR0FBR21GLElBQUksQ0FBQ0ksTUFBTSxDQUFDSCxRQUFRLEVBQUVGLGlCQUFpQixFQUFFekMsR0FBRyxDQUFDO0VBRS9ELElBQUl6QyxXQUFXLEtBQUssS0FBSyxFQUFFO0lBQ3pCO0VBQ0YsQ0FBQyxNQUFNO0lBQ0w7SUFDQSxNQUFNc0YsYUFBYSxHQUFHSixpQkFBaUIsQ0FBQ25CLFFBQVEsQ0FBQyxDQUFDO0lBQ2xEbkMseURBQVksQ0FBQyxDQUFDLENBQUNjLG1CQUFtQixDQUFDNEMsYUFBYSxDQUFDOztJQUVqRDtJQUNBLElBQUlKLGlCQUFpQixDQUFDTixpQkFBaUIsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO01BQ2xEakMsdURBQVUsQ0FBQyxVQUFVLENBQUM7TUFDdEI7SUFDRjs7SUFFQTtJQUNBLE1BQU02QyxTQUFTLEdBQUcsSUFBSUMsT0FBTyxDQUFFQyxPQUFPLElBQUs7TUFDekNDLFVBQVUsQ0FBQyxNQUFNO1FBQ2ZELE9BQU8sQ0FBQ04sUUFBUSxDQUFDRyxNQUFNLENBQUNKLElBQUksRUFBRUYsYUFBYSxFQUFFeEMsR0FBRyxDQUFDLENBQUM7TUFDcEQsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDbUQsSUFBSSxDQUFDLE1BQU07TUFDWjtNQUNBLE1BQU1QLFNBQVMsR0FBR0osYUFBYSxDQUFDbEIsUUFBUSxDQUFDLENBQUM7TUFDMUNuQyx5REFBWSxDQUFDLENBQUMsQ0FBQ0csZUFBZSxDQUFDc0QsU0FBUyxDQUFDOztNQUV6QztNQUNBLElBQUlKLGFBQWEsQ0FBQ0wsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUM5Q2pDLHVEQUFVLENBQUMsZ0JBQWdCLENBQUM7UUFDNUI7TUFDRjtJQUNGLENBQUMsQ0FBQztFQUNKO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRUQsSUFBSTNDLFdBQVcsR0FBRyxFQUFFO0FBQ3BCLElBQUlDLGVBQWUsR0FBRyxFQUFFO0FBRXhCLE1BQU0rRSxNQUFNLEdBQUlhLElBQUksSUFBSztFQUN2QixNQUFNQyxPQUFPLEdBQUdBLENBQUEsS0FBTUQsSUFBSTtFQUUxQixNQUFNRSxhQUFhLEdBQUdBLENBQUNDLEtBQUssRUFBRXZELEdBQUcsS0FBSztJQUNwQyxJQUFJYyxLQUFLO0lBRVQsSUFBSXlDLEtBQUssS0FBSyxNQUFNLEVBQUU7TUFDcEJ6QyxLQUFLLEdBQUd0RCxlQUFlLENBQUNnRyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDLE1BQU07TUFDTDFDLEtBQUssR0FBR3ZELFdBQVcsQ0FBQ2lHLEtBQUssQ0FBQyxDQUFDO0lBQzdCO0lBRUEsT0FBTzFDLEtBQUssQ0FBQ3JCLE1BQU0sRUFBRTtNQUNuQixNQUFNb0MsT0FBTyxHQUFHZixLQUFLLENBQUMyQyxLQUFLLENBQUMsQ0FBQztNQUM3QixJQUFJNUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJNkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2xELE9BQU8sS0FBSztNQUNkO0lBQ0Y7SUFDQSxPQUFPLElBQUk7RUFDYixDQUFDO0VBRUQsTUFBTThDLE1BQU0sR0FBR0EsQ0FBQ1MsS0FBSyxFQUFFbkMsU0FBUyxFQUFFcEIsR0FBRyxLQUFLO0lBQ3hDLE1BQU0wRCxTQUFTLEdBQUdILEtBQUssQ0FBQ0YsT0FBTyxDQUFDLENBQUM7SUFFakMsSUFBSUssU0FBUyxLQUFLLE1BQU0sRUFBRTtNQUN4QixJQUFJM0IsQ0FBQyxHQUFHNEIsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7TUFDdEMsSUFBSTdCLENBQUMsR0FBRzJCLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO01BQ3RDLElBQUk3RCxHQUFHLEdBQUcsQ0FBQytCLENBQUMsRUFBRUMsQ0FBQyxDQUFDO01BRWhCLElBQUk4QixVQUFVLEdBQUdSLGFBQWEsQ0FBQ0ksU0FBUyxFQUFFMUQsR0FBRyxDQUFDO01BRTlDLElBQUk4RCxVQUFVLEtBQUssSUFBSSxFQUFFO1FBQ3ZCdEcsZUFBZSxDQUFDdUcsSUFBSSxDQUFDL0QsR0FBRyxDQUFDO1FBQ3pCb0IsU0FBUyxDQUFDVSxhQUFhLENBQUM5QixHQUFHLENBQUM7TUFDOUIsQ0FBQyxNQUFNO1FBQ0w4QyxNQUFNLENBQUNTLEtBQUssRUFBRW5DLFNBQVMsQ0FBQztNQUMxQjtJQUNGLENBQUMsTUFBTTtNQUNMLElBQUkwQyxVQUFVLEdBQUdSLGFBQWEsQ0FBQ0ksU0FBUyxFQUFFMUQsR0FBRyxDQUFDO01BRTlDLElBQUk4RCxVQUFVLEtBQUssSUFBSSxFQUFFO1FBQ3ZCdkcsV0FBVyxDQUFDd0csSUFBSSxDQUFDL0QsR0FBRyxDQUFDO1FBQ3JCb0IsU0FBUyxDQUFDVSxhQUFhLENBQUM5QixHQUFHLENBQUM7TUFDOUIsQ0FBQyxNQUFNO1FBQ0wsT0FBTyxLQUFLO01BQ2Q7SUFDRjtFQUNGLENBQUM7RUFFRCxPQUFPO0lBQUVxRCxPQUFPO0lBQUVDLGFBQWE7SUFBRVI7RUFBTyxDQUFDO0FBQzNDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyREQsTUFBTTVCLFdBQVcsR0FBR0EsQ0FBQSxLQUFNO0VBQ3hCLElBQUk4QyxPQUFPLEdBQUc7SUFDWnZFLE1BQU0sRUFBRSxDQUFDO0lBQ1R3RSxJQUFJLEVBQUUsQ0FBQztJQUNQM0IsU0FBUyxFQUFFLEtBQUs7SUFDaEJWLFdBQVcsRUFBRSxDQUNYLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUVWLENBQUM7RUFFRCxJQUFJc0MsVUFBVSxHQUFHO0lBQ2Z6RSxNQUFNLEVBQUUsQ0FBQztJQUNUd0UsSUFBSSxFQUFFLENBQUM7SUFDUDNCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCVixXQUFXLEVBQUUsQ0FDWCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFFVixDQUFDO0VBRUQsSUFBSXVDLFNBQVMsR0FBRztJQUNkMUUsTUFBTSxFQUFFLENBQUM7SUFDVHdFLElBQUksRUFBRSxDQUFDO0lBQ1AzQixTQUFTLEVBQUUsS0FBSztJQUNoQlYsV0FBVyxFQUFFLENBQ1gsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBRVYsQ0FBQztFQUVELElBQUl3QyxTQUFTLEdBQUc7SUFDZDNFLE1BQU0sRUFBRSxDQUFDO0lBQ1R3RSxJQUFJLEVBQUUsQ0FBQztJQUNQM0IsU0FBUyxFQUFFLEtBQUs7SUFDaEJWLFdBQVcsRUFBRSxDQUNYLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUVWLENBQUM7RUFFRCxJQUFJeUMsVUFBVSxHQUFHO0lBQ2Y1RSxNQUFNLEVBQUUsQ0FBQztJQUNUd0UsSUFBSSxFQUFFLENBQUM7SUFDUDNCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCVixXQUFXLEVBQUUsQ0FDWCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFFVixDQUFDO0VBRUQsT0FBTztJQUFFb0MsT0FBTztJQUFFRSxVQUFVO0lBQUVDLFNBQVM7SUFBRUMsU0FBUztJQUFFQztFQUFXLENBQUM7QUFDbEUsQ0FBQztBQUVELE1BQU1sRCxJQUFJLEdBQUdBLENBQUEsS0FBTTtFQUNqQixNQUFNTSxVQUFVLEdBQUdBLENBQUNsQyxLQUFLLEVBQUVnQyxLQUFLLEtBQUs7SUFDbkMsS0FBSyxJQUFJSSxHQUFHLElBQUlKLEtBQUssRUFBRTtNQUNyQixJQUFJVCxLQUFLLEdBQUdTLEtBQUssQ0FBQ0ksR0FBRyxDQUFDLENBQUNDLFdBQVc7TUFFbEMsS0FBSyxJQUFJcEMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHc0IsS0FBSyxDQUFDckIsTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtRQUNyQyxNQUFNcUMsT0FBTyxHQUFHZixLQUFLLENBQUN0QixDQUFDLENBQUM7UUFDeEIsTUFBTXVDLENBQUMsR0FBR0YsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNRyxDQUFDLEdBQUdILE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFcEJ0QyxLQUFLLENBQUN3QyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQztNQUNqQjtJQUNGO0VBQ0YsQ0FBQztFQUVELE1BQU1zQyxNQUFNLEdBQUlDLElBQUksSUFBSztJQUN2QixNQUFNQyxVQUFVLEdBQUdELElBQUksQ0FBQzlFLE1BQU07SUFDOUIsTUFBTWdGLFNBQVMsR0FBR0YsSUFBSSxDQUFDTixJQUFJOztJQUUzQjtJQUNBLE9BQU9PLFVBQVUsS0FBS0MsU0FBUyxHQUFHLElBQUksR0FBRyxLQUFLO0VBQ2hELENBQUM7RUFFRCxNQUFNdkMsR0FBRyxHQUFJcUMsSUFBSSxJQUFLO0lBQ3BCQSxJQUFJLENBQUNOLElBQUksSUFBSSxDQUFDOztJQUVkO0lBQ0EsTUFBTVMsU0FBUyxHQUFHSixNQUFNLENBQUNDLElBQUksQ0FBQztJQUU5QixJQUFJRyxTQUFTLEtBQUssSUFBSSxFQUFFO01BQ3RCSCxJQUFJLENBQUNqQyxTQUFTLEdBQUcsSUFBSTtJQUN2QjtFQUNGLENBQUM7RUFFRCxPQUFPO0lBQUViLFVBQVU7SUFBRVM7RUFBSSxDQUFDO0FBQzVCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEd3QztBQUV6QyxNQUFNeUMsbUJBQW1CLEdBQUdBLENBQUEsS0FBTTtFQUNoQyxNQUFNQyxTQUFTLEdBQUd4RCxzREFBUyxDQUFDLENBQUM7O0VBRTdCO0VBQ0F3RCxTQUFTLENBQUN2RCxXQUFXLENBQUMsQ0FBQztFQUV2QixNQUFNOUIsS0FBSyxHQUFHcUYsU0FBUyxDQUFDdEQsUUFBUSxDQUFDLENBQUM7RUFFbEMsT0FBTy9CLEtBQUs7QUFDZCxDQUFDO0FBRUQsTUFBTXNGLFNBQVMsR0FBR0EsQ0FBQSxLQUFNO0VBQ3RCLE1BQU1qRyxTQUFTLEdBQUdqQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFDekQsTUFBTWtILFdBQVcsR0FBR25ILFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUNqRCxNQUFNaUgsWUFBWSxHQUFHcEgsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ2xELE1BQU1rSCxLQUFLLEdBQUdySCxRQUFRLENBQUNHLGFBQWEsQ0FBQyxPQUFPLENBQUM7RUFDN0MsTUFBTW1ILFNBQVMsR0FBR3RILFFBQVEsQ0FBQ0csYUFBYSxDQUFDLE9BQU8sQ0FBQztFQUNqRCxNQUFNb0gsSUFBSSxHQUFHdkgsUUFBUSxDQUFDRyxhQUFhLENBQUMsR0FBRyxDQUFDO0VBQ3hDLE1BQU1xSCxjQUFjLEdBQUd4SCxRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDcEQsTUFBTWtHLE9BQU8sR0FBR3JHLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUM3QyxNQUFNb0csVUFBVSxHQUFHdkcsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ2hELE1BQU1xRyxTQUFTLEdBQUd4RyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDL0MsTUFBTXNHLFNBQVMsR0FBR3pHLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMvQyxNQUFNdUcsVUFBVSxHQUFHMUcsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ2hELE1BQU1zSCxTQUFTLEdBQUd6SCxRQUFRLENBQUNHLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFFbERnSCxXQUFXLENBQUN4RyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxjQUFjLENBQUM7RUFDekN3RyxZQUFZLENBQUN6RyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7RUFDM0MyRyxJQUFJLENBQUM1RyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztFQUNyQzJHLElBQUksQ0FBQzFHLFdBQVcsR0FBRyw4QkFBOEI7RUFDakQyRyxjQUFjLENBQUM3RyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7RUFDcEN5RixPQUFPLENBQUMxRixTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUM7RUFDaEN5RixPQUFPLENBQUNxQixTQUFTLEdBQUcsSUFBSTtFQUN4QnJCLE9BQU8sQ0FBQ3hGLFdBQVcsR0FBRyxTQUFTO0VBQy9CMEYsVUFBVSxDQUFDNUYsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDO0VBQ3RDMkYsVUFBVSxDQUFDbUIsU0FBUyxHQUFHLElBQUk7RUFDM0JuQixVQUFVLENBQUMxRixXQUFXLEdBQUcsWUFBWTtFQUNyQzJGLFNBQVMsQ0FBQzdGLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztFQUNwQzRGLFNBQVMsQ0FBQ2tCLFNBQVMsR0FBRyxJQUFJO0VBQzFCbEIsU0FBUyxDQUFDM0YsV0FBVyxHQUFHLFdBQVc7RUFDbkM0RixTQUFTLENBQUM5RixTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7RUFDcEM2RixTQUFTLENBQUNpQixTQUFTLEdBQUcsSUFBSTtFQUMxQmpCLFNBQVMsQ0FBQzVGLFdBQVcsR0FBRyxXQUFXO0VBQ25DNkYsVUFBVSxDQUFDL0YsU0FBUyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDO0VBQ3ZDOEYsVUFBVSxDQUFDZ0IsU0FBUyxHQUFHLElBQUk7RUFDM0JoQixVQUFVLENBQUM3RixXQUFXLEdBQUcsYUFBYTtFQUN0QzRHLFNBQVMsQ0FBQzlHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztFQUNyQzZHLFNBQVMsQ0FBQ3RGLElBQUksR0FBRyxRQUFRO0VBQ3pCc0YsU0FBUyxDQUFDNUcsV0FBVyxHQUFHLFFBQVE7RUFDaEN3RyxLQUFLLENBQUMxRyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztFQUV2QyxNQUFNZ0IsS0FBSyxHQUFHb0YsbUJBQW1CLENBQUMsQ0FBQzs7RUFFbkM7RUFDQSxLQUFLLElBQUluRixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdELEtBQUssQ0FBQ0UsTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtJQUNyQyxNQUFNOEYsUUFBUSxHQUFHM0gsUUFBUSxDQUFDRyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBRTdDd0gsUUFBUSxDQUFDaEgsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBRW5DLE1BQU1tQixHQUFHLEdBQUdILEtBQUssQ0FBQ0MsQ0FBQyxDQUFDO0lBRXBCLEtBQUssSUFBSUcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRCxHQUFHLENBQUNELE1BQU0sRUFBRUUsQ0FBQyxFQUFFLEVBQUU7TUFDbkMsTUFBTTRGLElBQUksR0FBRzVILFFBQVEsQ0FBQ0csYUFBYSxDQUFDLElBQUksQ0FBQztNQUV6Q3lILElBQUksQ0FBQ2pILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztNQUVoQ2dILElBQUksQ0FBQ3hGLE9BQU8sQ0FBQ0MsR0FBRyxHQUFJLEdBQUVSLENBQUUsSUFBR0csQ0FBRSxFQUFDO01BRTlCMkYsUUFBUSxDQUFDNUcsV0FBVyxDQUFDNkcsSUFBSSxDQUFDO0lBQzVCO0lBQ0FOLFNBQVMsQ0FBQ3ZHLFdBQVcsQ0FBQzRHLFFBQVEsQ0FBQztFQUNqQztFQUVBSCxjQUFjLENBQUN6RyxXQUFXLENBQUNzRixPQUFPLENBQUM7RUFDbkNtQixjQUFjLENBQUN6RyxXQUFXLENBQUN3RixVQUFVLENBQUM7RUFDdENpQixjQUFjLENBQUN6RyxXQUFXLENBQUN5RixTQUFTLENBQUM7RUFDckNnQixjQUFjLENBQUN6RyxXQUFXLENBQUMwRixTQUFTLENBQUM7RUFDckNlLGNBQWMsQ0FBQ3pHLFdBQVcsQ0FBQzJGLFVBQVUsQ0FBQztFQUN0Q1csS0FBSyxDQUFDdEcsV0FBVyxDQUFDdUcsU0FBUyxDQUFDO0VBQzVCSCxXQUFXLENBQUNwRyxXQUFXLENBQUNzRyxLQUFLLENBQUM7RUFDOUJELFlBQVksQ0FBQ3JHLFdBQVcsQ0FBQ3dHLElBQUksQ0FBQztFQUM5QkgsWUFBWSxDQUFDckcsV0FBVyxDQUFDeUcsY0FBYyxDQUFDO0VBQ3hDSixZQUFZLENBQUNyRyxXQUFXLENBQUMwRyxTQUFTLENBQUM7RUFDbkN4RyxTQUFTLENBQUNGLFdBQVcsQ0FBQ29HLFdBQVcsQ0FBQztFQUNsQ2xHLFNBQVMsQ0FBQ0YsV0FBVyxDQUFDcUcsWUFBWSxDQUFDO0FBQ3JDLENBQUM7QUFFRCxNQUFNUyxxQkFBcUIsR0FBR0EsQ0FBQSxLQUFNO0VBQ2xDLE1BQU1qRixXQUFXLEdBQUc1QyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFDM0Q7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SUQ7QUFDNkc7QUFDakI7QUFDNUYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyx3RkFBd0YsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLFNBQVMsVUFBVSxZQUFZLGFBQWEsT0FBTyxNQUFNLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSw2QkFBNkIsZUFBZSxjQUFjLDJCQUEyQixHQUFHLFVBQVUsa0JBQWtCLG9CQUFvQiw2QkFBNkIsR0FBRyxjQUFjLGlCQUFpQixnQkFBZ0Isa0JBQWtCLHdDQUF3QyxHQUFHLG1CQUFtQixrQkFBa0IsbUNBQW1DLEdBQUcsMkNBQTJDLGtCQUFrQiwyQkFBMkIsNEJBQTRCLHdCQUF3QixjQUFjLEdBQUcsbUJBQW1CLGtCQUFrQiwwQkFBMEIsd0JBQXdCLEdBQUcsb0JBQW9CLGtCQUFrQixvQ0FBb0MsMEJBQTBCLHdCQUF3QixHQUFHLHVCQUF1QixrQkFBa0IsaUJBQWlCLGtCQUFrQixHQUFHLFdBQVcsZ0JBQWdCLGtCQUFrQix3Q0FBd0MsR0FBRyxnQkFBZ0Isa0JBQWtCLDJDQUEyQyxHQUFHLGlCQUFpQiwyQkFBMkIsNEJBQTRCLEdBQUcsV0FBVyxpQkFBaUIsZ0JBQWdCLGtCQUFrQiwyQkFBMkIsYUFBYSxHQUFHLGNBQWMsaUJBQWlCLEdBQUcsaUJBQWlCLGlCQUFpQixHQUFHLGdCQUFnQixpQkFBaUIsR0FBRyxnQkFBZ0IsaUJBQWlCLEdBQUcsa0JBQWtCLGdCQUFnQixHQUFHLHFFQUFxRSxpQkFBaUIsZ0NBQWdDLDhCQUE4QixHQUFHLCtDQUErQyxrQkFBa0IsaUJBQWlCLGtCQUFrQiwyQ0FBMkMsd0NBQXdDLEdBQUcsYUFBYSwyQkFBMkIsa0JBQWtCLDRCQUE0Qix3QkFBd0IsR0FBRyxrQkFBa0IsaUNBQWlDLEdBQUcsa0JBQWtCLDJCQUEyQixHQUFHLGVBQWUsMEJBQTBCLEdBQUcsbUJBQW1CLDRCQUE0QixHQUFHLHFCQUFxQjtBQUM1OUY7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUNoSjFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUF1RztBQUN2RztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHVGQUFPOzs7O0FBSWlEO0FBQ3pFLE9BQU8saUVBQWUsdUZBQU8sSUFBSSx1RkFBTyxVQUFVLHVGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0EwQztBQUMxQztBQUNnRTtBQUVoRSxNQUFNNkgsU0FBUyxHQUFHQSxDQUFBLEtBQU07RUFDdEJoSSx1REFBVSxDQUFDLENBQUM7RUFDWjtFQUNBb0gsc0RBQVMsQ0FBQyxDQUFDO0VBQ1g7RUFDQVcsa0VBQXFCLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBQ0RDLFNBQVMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2JhdHRsZXNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3RhcnQtbWVudS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZXMuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZXMuY3NzP2U0NWIiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWUsIHBsYXlSb3VuZCB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IHVzZXJBdHRhY2tzLCBjb21wdXRlckF0dGFja3MgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0eWxlcy5jc3NcIjtcblxuY29uc3QgcGFnZUxheW91dCA9ICgpID0+IHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gIGNvbnN0IHdpbm5lckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGxvZ29Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBsb2dvID0gbmV3IEltYWdlKCk7XG5cbiAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJcIik7XG4gIG1haW4uY2xhc3NMaXN0LmFkZChcIm1haW4tc2VjdGlvblwiKTtcbiAgZm9vdGVyLmNsYXNzTGlzdC5hZGQoXCJmb290ZXJcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcblxuICB3aW5uZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndpbm5lci1jb250YWluZXJcIik7XG4gIGxvZ29Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImxvZ28tY29udGFpbmVyXCIpO1xuICBsb2dvLmFsdCA9IFwiU3VibWFyaW5lIGxvZ29cIjtcblxuICBsb2dvQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvZ28pO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nb0NvbnRhaW5lcik7XG4gIGhlYWRlci5hcHBlbmRDaGlsZCh3aW5uZXJDb250YWluZXIpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQobWFpbik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn07XG5cbmNvbnN0IGdhbWVNZW51ID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcblxuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gIGNvbnN0IGNvbnRhaW5lck9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGNvbnRhaW5lclR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZWZpZWxkT25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZE9uZVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRUd29QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgY29udGFpbmVyT25lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLWNvbnRhaW5lclwiKTtcbiAgY29udGFpbmVyVHdvLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1jb250YWluZXJcIik7XG4gIGJhdHRsZWZpZWxkT25lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLWJhdHRsZWZpZWxkXCIpO1xuICBiYXR0bGVmaWVsZFR3by5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYmF0dGxlZmllbGRcIik7XG4gIGJhdHRsZWZpZWxkT25lUGFyYS50ZXh0Q29udGVudCA9IFwiUGxheWVyIEJvYXJkXCI7XG4gIGJhdHRsZWZpZWxkVHdvUGFyYS50ZXh0Q29udGVudCA9IFwiQUkgQm9hcmRcIjtcblxuICBjb250YWluZXJPbmUuYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRPbmUpO1xuICBjb250YWluZXJUd28uYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRUd28pO1xuICBjb250YWluZXJPbmUuYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRPbmVQYXJhKTtcbiAgY29udGFpbmVyVHdvLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkVHdvUGFyYSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJPbmUpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVHdvKTtcbn07XG5cbmNvbnN0IHJlbmRlckJvYXJkcyA9ICgpID0+IHtcbiAgY29uc3QgdXNlckJhdHRsZWZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWJhdHRsZWZpZWxkXCIpO1xuICBjb25zdCBjb21wdXRlckJhdHRsZWZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci1iYXR0bGVmaWVsZFwiKTtcblxuICAvLyBSZW5kZXIgdXNlciBnYW1lIGJvYXJkXG4gIGNvbnN0IHJlbmRlclVzZXJCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgIHVzZXJCYXR0bGVmaWVsZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bi5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICAgIGlmIChkYXRhID09PSAxKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLXNxdWFyZVwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAyKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW1pc3NlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAzKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVzZXJCYXR0bGVmaWVsZC5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBSZW5kZXIgY29tcHV0ZXIgZ2FtZSBib2FyZFxuICBjb25zdCByZW5kZXJDb21wdXRlckJvYXJkID0gKGJvYXJkKSA9PiB7XG4gICAgY29tcHV0ZXJCYXR0bGVmaWVsZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bi5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICAgIGlmIChkYXRhID09PSAyKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW1pc3NlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAzKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXB1dGVyQmF0dGxlZmllbGQuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiB7IHJlbmRlclVzZXJCb2FyZCwgcmVuZGVyQ29tcHV0ZXJCb2FyZCB9O1xufTtcblxuY29uc3QgZ2FtZVdpbm5lciA9ICh3aW5uZXIpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItY29udGFpbmVyXCIpO1xuICBjb25zdCB3aW5uZXJBbm5vdW5jZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIHdpbm5lckFubm91bmNlci5jbGFzc0xpc3QuYWRkKFwid2lubmVyXCIpO1xuICB3aW5uZXJBbm5vdW5jZXIudGV4dENvbnRlbnQgPSB3aW5uZXI7XG4gIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc3RhcnQtYnV0dG9uXCIpO1xuICByZXN0YXJ0QnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZW1hdGNoXCI7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdpbm5lckFubm91bmNlcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN0YXJ0QnV0dG9uKTtcbn07XG5cbmNvbnN0IGdhbWVNZW51RXZlbnRIYW5kbGVyID0gKCkgPT4ge1xuICBjb25zdCBtYWluU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xuICBjb25zdCB3aW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1jb250YWluZXJcIik7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKHdpbm5lckNvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInNxdWFyZVwiKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IGRhdGEgPSBzcXVhcmUuZGF0YXNldC5wb3M7XG4gICAgICBjb25zdCBhcnJheSA9IGRhdGEuc3BsaXQoXCIsXCIpO1xuICAgICAgY29uc3QgcG9zID0gW3BhcnNlSW50KGFycmF5WzBdKSwgcGFyc2VJbnQoYXJyYXlbMV0pXTtcblxuICAgICAgcGxheVJvdW5kKHBvcyk7XG4gICAgfVxuICB9KTtcblxuICB3aW5uZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKChlLnRhcmdldC5jbGFzc05hbWUgPSBcInJlc3RhcnQtYnV0dG9uXCIpKSB7XG4gICAgICBwYXJlbnRUd28udGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAvLyBFbXB0eSBhdHRhY2tlZCBzcXVhcmVzIGhpc3RvcnlcbiAgICAgIHVzZXJBdHRhY2tzLmxlbmd0aCA9IDA7XG4gICAgICBjb21wdXRlckF0dGFja3MubGVuZ3RoID0gMDtcblxuICAgICAgLy8gU3RhcnQgbmV3IGdhbWVcbiAgICAgIEdhbWUoKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgcGFnZUxheW91dCwgZ2FtZU1lbnUsIHJlbmRlckJvYXJkcywgZ2FtZVdpbm5lciwgZ2FtZU1lbnVFdmVudEhhbmRsZXIgfTtcbiIsImltcG9ydCB7IFBsYXllclNoaXBzLCBTaGlwIH0gZnJvbSBcIi4vc2hpcHNcIjtcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBsZXQgYm9hcmQgPSBbXTtcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGJvYXJkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgYm9hcmRbaV1bal0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gIGNvbnN0IHNoaXBzID0gUGxheWVyU2hpcHMoKTtcblxuICBjb25zdCBwb3B1bGF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIC8vIFBsYWNlIGFsbCBzaGlwcyBvbnRvIHRoZSBib2FyZFxuICAgIFNoaXAoKS5wbGFjZVNoaXBzKGJvYXJkLCBzaGlwcyk7XG4gIH07XG5cbiAgY29uc3QgZmluZEF0dGFja2VkU2hpcCA9IChwb3MpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGNvbnN0IGFycmF5ID0gc2hpcHNba2V5XS5jb29yZGluYXRlcztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaV07XG5cbiAgICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHBvc1swXSAmJiBlbGVtZW50WzFdID09PSBwb3NbMV0pIHtcbiAgICAgICAgICByZXR1cm4gc2hpcHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHBvcykgPT4ge1xuICAgIGxldCB4ID0gcG9zWzBdO1xuICAgIGxldCB5ID0gcG9zWzFdO1xuXG4gICAgaWYgKGJvYXJkW3hdW3ldID09PSAxKSB7XG4gICAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSBmaW5kQXR0YWNrZWRTaGlwKHBvcyk7XG5cbiAgICAgIC8vIE1hcmsgYm9hcmQgcG9zaXRpb24gYXMgYXR0YWNrZWRcbiAgICAgIGJvYXJkW3hdW3ldID0gMztcblxuICAgICAgLy8gQWRkIGhpdCBjb3VudCB0byBhdHRhY2tlZCBzaGlwXG4gICAgICBTaGlwKCkuaGl0KGF0dGFja2VkU2hpcCk7XG4gICAgfSBlbHNlIGlmIChib2FyZFt4XVt5XSA9PT0gMCkge1xuICAgICAgLy8gTWFyayBib2FyZCBwb3NpdGlvbiBhcyBhdHRhY2tlZFxuICAgICAgYm9hcmRbeF1beV0gPSAyO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhbGxTaGlwc0Rlc3Ryb3llZCA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBjb25zdCBzaGlwU3RhdGUgPSBzaGlwc1trZXldLmRlc3Ryb3llZDtcblxuICAgICAgaWYgKHNoaXBTdGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb3VudCA9PT0gNSA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUJvYXJkLFxuICAgIGdldEJvYXJkLFxuICAgIHBvcHVsYXRlQm9hcmQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbGxTaGlwc0Rlc3Ryb3llZCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZS1ib2FyZFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyByZW5kZXJCb2FyZHMsIGdhbWVXaW5uZXIgfSBmcm9tIFwiLi9iYXR0bGVzaGlwXCI7XG5cbmxldCB1c2VyR2FtZUJvYXJkO1xubGV0IGNvbXB1dGVyR2FtZUJvYXJkO1xubGV0IHVzZXI7XG5sZXQgY29tcHV0ZXI7XG5cbmNvbnN0IEdhbWUgPSAoKSA9PiB7XG4gIC8vIENyZWF0ZSBQbGF5ZXIgb2JqZWN0cyBhbmQgR2FtZUJvYXJkIG9iamVjdHMgZm9yIGVhY2ggcGxheWVyXG4gIHVzZXIgPSBQbGF5ZXIoXCJ1c2VyXCIpO1xuICBjb21wdXRlciA9IFBsYXllcihcImNvbXB1dGVyIEFJXCIpO1xuXG4gIHVzZXJHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgY29tcHV0ZXJHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcblxuICAvLyBDcmVhdGUgbmV3IGJvYXJkcyBmb3IgZWFjaCBwbGF5ZXJcbiAgdXNlckdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuICBjb21wdXRlckdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gIC8vIFBvcHVsYXRlIGJvYXJkcyB3aXRoIHNoaXBzIGZvciBlYWNoIHBsYXllclxuICAvLyB1c2VyR2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQoKTtcbiAgLy8gY29tcHV0ZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCgpO1xuXG4gIC8vICAgR2V0IHBsYXllciBib2FyZHMgZnJvbSBHYW1lQm9hcmQgb2JqZWN0c1xuICBjb25zdCB1c2VyQm9hcmQgPSB1c2VyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuXG4gIC8vIEluaXRpYWwgcGxheWVyIGJvYXJkcyBhcmUgcmVuZGVyZWRcbiAgcmVuZGVyQm9hcmRzKCkucmVuZGVyVXNlckJvYXJkKHVzZXJCb2FyZCk7XG4gIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoY29tcHV0ZXJCb2FyZCk7XG59O1xuXG5jb25zdCBwbGF5Um91bmQgPSAocG9zKSA9PiB7XG4gIGxldCB1c2VyQXR0YWNrcyA9IHVzZXIuYXR0YWNrKGNvbXB1dGVyLCBjb21wdXRlckdhbWVCb2FyZCwgcG9zKTtcblxuICBpZiAodXNlckF0dGFja3MgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIC8vIFVwZGF0ZSBjb21wdXRlciBib2FyZCBvbiB0aGUgc2NyZWVuXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gICAgcmVuZGVyQm9hcmRzKCkucmVuZGVyQ29tcHV0ZXJCb2FyZChjb21wdXRlckJvYXJkKTtcblxuICAgIC8vIENoZWNrIGlmIGFsbCBjb21wdXRlciBzaGlwcyBhcmUgZGVzdHJveWVkXG4gICAgaWYgKGNvbXB1dGVyR2FtZUJvYXJkLmFsbFNoaXBzRGVzdHJveWVkKCkgPT09IHRydWUpIHtcbiAgICAgIGdhbWVXaW5uZXIoXCJZb3UgV2luIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlciBhdHRhY2tzIHRoZSB1c2VyIDIwMCBzZWNvbmRzIGFmdGVyIGJlaW5nIGF0dGFja2VkXG4gICAgY29uc3QgbXlQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKGNvbXB1dGVyLmF0dGFjayh1c2VyLCB1c2VyR2FtZUJvYXJkLCBwb3MpKTtcbiAgICAgIH0sIDIwMCk7XG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAvLyBVcGRhdGUgdXNlciBib2FyZCBvbiB0aGUgc2NyZWVuXG4gICAgICBjb25zdCB1c2VyQm9hcmQgPSB1c2VyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gICAgICByZW5kZXJCb2FyZHMoKS5yZW5kZXJVc2VyQm9hcmQodXNlckJvYXJkKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgYWxsIHVzZXIgc2hpcHMgYXJlIGRlc3Ryb3llZFxuICAgICAgaWYgKHVzZXJHYW1lQm9hcmQuYWxsU2hpcHNEZXN0cm95ZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgICBnYW1lV2lubmVyKFwiQ29tcHV0ZXIgV2lucyFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHsgR2FtZSwgcGxheVJvdW5kIH07XG4iLCJsZXQgdXNlckF0dGFja3MgPSBbXTtcbmxldCBjb21wdXRlckF0dGFja3MgPSBbXTtcblxuY29uc3QgUGxheWVyID0gKG5hbWUpID0+IHtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgY29uc3QgaXNBdHRhY2tMZWdhbCA9IChlbmVteSwgcG9zKSA9PiB7XG4gICAgbGV0IGFycmF5O1xuXG4gICAgaWYgKGVuZW15ID09PSBcInVzZXJcIikge1xuICAgICAgYXJyYXkgPSBjb21wdXRlckF0dGFja3Muc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXkgPSB1c2VyQXR0YWNrcy5zbGljZSgpO1xuICAgIH1cblxuICAgIHdoaWxlIChhcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheS5zaGlmdCgpO1xuICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHBvc1swXSAmJiBlbGVtZW50WzFdID09PSBwb3NbMV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIEdhbWVCb2FyZCwgcG9zKSA9PiB7XG4gICAgY29uc3QgZW5lbXlOYW1lID0gZW5lbXkuZ2V0TmFtZSgpO1xuXG4gICAgaWYgKGVuZW15TmFtZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBsZXQgcG9zID0gW3gsIHldO1xuXG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb21wdXRlckF0dGFja3MucHVzaChwb3MpO1xuICAgICAgICBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXR0YWNrKGVuZW15LCBHYW1lQm9hcmQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB1c2VyQXR0YWNrcy5wdXNoKHBvcyk7XG4gICAgICAgIEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGdldE5hbWUsIGlzQXR0YWNrTGVnYWwsIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyLCB1c2VyQXR0YWNrcywgY29tcHV0ZXJBdHRhY2tzIH07XG4iLCJjb25zdCBQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgbGV0IGNhcnJpZXIgPSB7XG4gICAgbGVuZ3RoOiA1LFxuICAgIGhpdHM6IDAsXG4gICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICBjb29yZGluYXRlczogW1xuICAgICAgWzUsIDFdLFxuICAgICAgWzYsIDFdLFxuICAgICAgWzcsIDFdLFxuICAgICAgWzgsIDFdLFxuICAgICAgWzksIDFdLFxuICAgIF0sXG4gIH07XG5cbiAgbGV0IGJhdHRsZXNoaXAgPSB7XG4gICAgbGVuZ3RoOiA0LFxuICAgIGhpdHM6IDAsXG4gICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICBjb29yZGluYXRlczogW1xuICAgICAgWzAsIDhdLFxuICAgICAgWzEsIDhdLFxuICAgICAgWzIsIDhdLFxuICAgICAgWzMsIDhdLFxuICAgIF0sXG4gIH07XG5cbiAgbGV0IGRlc3Ryb3llciA9IHtcbiAgICBsZW5ndGg6IDMsXG4gICAgaGl0czogMCxcbiAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgIGNvb3JkaW5hdGVzOiBbXG4gICAgICBbNSwgNV0sXG4gICAgICBbNSwgNl0sXG4gICAgICBbNSwgN10sXG4gICAgXSxcbiAgfTtcblxuICBsZXQgc3VibWFyaW5lID0ge1xuICAgIGxlbmd0aDogMyxcbiAgICBoaXRzOiAwLFxuICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgY29vcmRpbmF0ZXM6IFtcbiAgICAgIFsxLCAyXSxcbiAgICAgIFsxLCAzXSxcbiAgICAgIFsxLCA0XSxcbiAgICBdLFxuICB9O1xuXG4gIGxldCBwYXRyb2xCb2F0ID0ge1xuICAgIGxlbmd0aDogMixcbiAgICBoaXRzOiAwLFxuICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgY29vcmRpbmF0ZXM6IFtcbiAgICAgIFs3LCA4XSxcbiAgICAgIFs4LCA4XSxcbiAgICBdLFxuICB9O1xuXG4gIHJldHVybiB7IGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0IH07XG59O1xuXG5jb25zdCBTaGlwID0gKCkgPT4ge1xuICBjb25zdCBwbGFjZVNoaXBzID0gKGJvYXJkLCBzaGlwcykgPT4ge1xuICAgIGZvciAobGV0IGtleSBpbiBzaGlwcykge1xuICAgICAgbGV0IGFycmF5ID0gc2hpcHNba2V5XS5jb29yZGluYXRlcztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaV07XG4gICAgICAgIGNvbnN0IHggPSBlbGVtZW50WzBdO1xuICAgICAgICBjb25zdCB5ID0gZWxlbWVudFsxXTtcblxuICAgICAgICBib2FyZFt4XVt5XSA9IDE7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IChzaGlwKSA9PiB7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgIGNvbnN0IGhpdHNDb3VudCA9IHNoaXAuaGl0cztcblxuICAgIC8vIGNoZWNrIHNoaXAgbGVuZ3RoIGFuZCBubyBvZiB0aW1lcyBpdHMgYmVlbiBoaXRcbiAgICByZXR1cm4gc2hpcExlbmd0aCA9PT0gaGl0c0NvdW50ID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGhpdCA9IChzaGlwKSA9PiB7XG4gICAgc2hpcC5oaXRzICs9IDE7XG5cbiAgICAvLyBBZnRlciBldmVyeSBoaXQsIGNoZWNrIGlmIHRoZSBzaGlwIGlzIGRlc3Ryb3llZFxuICAgIGNvbnN0IGNoZWNrU2hpcCA9IGlzU3VuayhzaGlwKTtcblxuICAgIGlmIChjaGVja1NoaXAgPT09IHRydWUpIHtcbiAgICAgIHNoaXAuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgcGxhY2VTaGlwcywgaGl0IH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXJTaGlwcywgU2hpcCB9O1xuIiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZS1ib2FyZFwiO1xuXG5jb25zdCBnZXRTdGFydFNjcmVlbkJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBnYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcblxuICAvLyBDcmVhdGUgYm9hcmRcbiAgZ2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG5cbiAgY29uc3QgYm9hcmQgPSBnYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcblxuICByZXR1cm4gYm9hcmQ7XG59O1xuXG5jb25zdCBzdGFydE1lbnUgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xuICBjb25zdCBsZWZ0U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHJpZ2h0U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIik7XG4gIGNvbnN0IHBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBjYXJyaWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIGxlZnRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJsZWZ0LXNlY3Rpb25cIik7XG4gIHJpZ2h0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwicmlnaHQtc2VjdGlvblwiKTtcbiAgcGFyYS5jbGFzc0xpc3QuYWRkKFwic3RhcnQtbWVudS1wYXJhXCIpO1xuICBwYXJhLnRleHRDb250ZW50ID0gXCJQbGFjZSB5b3VyIHNoaXBzIG9uIHRoZSBncmlkXCI7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3J0XCIpO1xuICBjYXJyaWVyLmNsYXNzTGlzdC5hZGQoXCJjYXJyaWVyXCIpO1xuICBjYXJyaWVyLmRyYWdnYWJsZSA9IHRydWU7XG4gIGNhcnJpZXIudGV4dENvbnRlbnQgPSBcIkNhcnJpZXJcIjtcbiAgYmF0dGxlc2hpcC5jbGFzc0xpc3QuYWRkKFwiYmF0dGxlc2hpcFwiKTtcbiAgYmF0dGxlc2hpcC5kcmFnZ2FibGUgPSB0cnVlO1xuICBiYXR0bGVzaGlwLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCI7XG4gIGRlc3Ryb3llci5jbGFzc0xpc3QuYWRkKFwiZGVzdHJveWVyXCIpO1xuICBkZXN0cm95ZXIuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgZGVzdHJveWVyLnRleHRDb250ZW50ID0gXCJEZXN0cm95ZXJcIjtcbiAgc3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJzdWJtYXJpbmVcIik7XG4gIHN1Ym1hcmluZS5kcmFnZ2FibGUgPSB0cnVlO1xuICBzdWJtYXJpbmUudGV4dENvbnRlbnQgPSBcIlN1Ym1hcmluZVwiO1xuICBwYXRyb2xCb2F0LmNsYXNzTGlzdC5hZGQoXCJwYXRyb2wtYm9hdFwiKTtcbiAgcGF0cm9sQm9hdC5kcmFnZ2FibGUgPSB0cnVlO1xuICBwYXRyb2xCb2F0LnRleHRDb250ZW50ID0gXCJQYXRyb2wgQm9hdFwiO1xuICByb3RhdGVCdG4uY2xhc3NMaXN0LmFkZChcInJvdGF0ZS1idG5cIik7XG4gIHJvdGF0ZUJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgcm90YXRlQnRuLnRleHRDb250ZW50ID0gXCJSb3RhdGVcIjtcbiAgdGFibGUuY2xhc3NMaXN0LmFkZChcInN0YXJ0LW1lbnUtdGFibGVcIik7XG5cbiAgY29uc3QgYm9hcmQgPSBnZXRTdGFydFNjcmVlbkJvYXJkKCk7XG5cbiAgLy8gQ3JlYXRlIGEgZ3JpZCBvZiB0YWJsZSByb3dzIGFuZCB0YWJsZSBjZWxsc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdGFibGVSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG5cbiAgICB0YWJsZVJvdy5jbGFzc0xpc3QuYWRkKFwidGFibGUtcm93XCIpO1xuXG4gICAgY29uc3Qgcm93ID0gYm9hcmRbaV07XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwidGFibGUtY2VsbFwiKTtcblxuICAgICAgY2VsbC5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRhYmxlUm93KTtcbiAgfVxuXG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcnJpZXIpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChiYXR0bGVzaGlwKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVzdHJveWVyKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG4gIHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlQm9keSk7XG4gIGxlZnRTZWN0aW9uLmFwcGVuZENoaWxkKHRhYmxlKTtcbiAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHBhcmEpO1xuICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQocm90YXRlQnRuKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxlZnRTZWN0aW9uKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJpZ2h0U2VjdGlvbik7XG59O1xuXG5jb25zdCBzdGFydE1lbnVFdmVudEhhbmRsZXIgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW5TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXNlY3Rpb25cIik7XG4gIC8vIGNvbnN0IHdpbm5lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyLWNvbnRhaW5lclwiKTtcblxuICAvLyBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XG4gIC8vICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJ0YWJsZS1jZWxsXCIpIHtcbiAgLy8gICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcbiAgLy8gICAgIGNvbnN0IGRhdGEgPSBjZWxsLmRhdGFzZXQucG9zO1xuICAvLyAgICAgY29uc3QgYXJyYXkgPSBkYXRhLnNwbGl0KFwiLFwiKTtcbiAgLy8gICAgIGNvbnN0IHggPSBwYXJzZUludChhcnJheVswXSk7XG4gIC8vICAgICBjb25zdCB5ID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuXG4gIC8vICAgICBpZiAoY2VsbC5pZCA9PT0gXCJcIikge1xuICAvLyAgICAgICBhZGRIb3ZlckVmZmVjdCh5LCBjZWxsKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH0pO1xuXG4gIC8vIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoZSkgPT4ge1xuICAvLyAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidGFibGUtY2VsbFwiKSB7XG4gIC8vICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgLy8gICAgIHJlbW92ZUhvdmVyRWZmZWN0KGNlbGwpO1xuICAvLyAgIH1cbiAgLy8gfSk7XG5cbiAgLy8gbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIC8vICAgLy8gaWYgKHdpbm5lckNvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgLy8gICAvLyAgIHJldHVybjtcbiAgLy8gICAvLyB9XG5cbiAgLy8gICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInRhYmxlLWNlbGxcIikge1xuICAvLyAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuICAvLyAgICAgY29uc3QgZGF0YSA9IGNlbGwuZGF0YXNldC5wb3M7XG4gIC8vICAgICBjb25zdCBhcnJheSA9IGRhdGEuc3BsaXQoXCIsXCIpO1xuICAvLyAgICAgY29uc3QgeCA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgLy8gICAgIGNvbnN0IHkgPSBwYXJzZUludChhcnJheVsxXSk7XG5cbiAgLy8gICAgIHBsYWNlU2hpcFNoYWRvdyh5LCBjZWxsKTtcbiAgLy8gICB9XG5cbiAgLy8gICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInJvdGF0ZS1idG5cIikge1xuICAvLyAgICAgY29uc29sZS5sb2coXCJ5ZWFoXCIpO1xuICAvLyAgIH1cbiAgLy8gfSk7XG59O1xuXG5leHBvcnQgeyBzdGFydE1lbnUsIHN0YXJ0TWVudUV2ZW50SGFuZGxlciB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmJvZHkge1xuICBoZWlnaHQ6IDEwMHZoO1xuICBmb250LXNpemU6IDFyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcbn1cblxuLmNvbnRlbnQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDEwMHB4IDFmciAxNTBweDtcbn1cblxuLm1haW4tc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbn1cblxuLnVzZXItY29udGFpbmVyLFxuLmNvbXB1dGVyLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDIwcHg7XG59XG5cbi5sZWZ0LXNlY3Rpb24ge1xuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5yaWdodC1zZWN0aW9uIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgM2ZyIDFmcjtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc3RhcnQtbWVudS10YWJsZSB7XG4gIGhlaWdodDogNDAwcHg7XG4gIHdpZHRoOiA0MDBweDtcbiAgZGlzcGxheTogZ3JpZDtcbn1cblxudGJvZHkge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG59XG5cbi50YWJsZS1yb3cge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLnRhYmxlLWNlbGwge1xuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLnBvcnQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDVweDtcbn1cblxuLmNhcnJpZXIge1xuICB3aWR0aDogMjAwcHg7XG59XG5cbi5iYXR0bGVzaGlwIHtcbiAgd2lkdGg6IDE2MHB4O1xufVxuXG4uZGVzdHJveWVyIHtcbiAgd2lkdGg6IDEyMHB4O1xufVxuXG4uc3VibWFyaW5lIHtcbiAgd2lkdGg6IDEyMHB4O1xufVxuXG4ucGF0cm9sLWJvYXQge1xuICB3aWR0aDogODBweDtcbn1cblxuLmNhcnJpZXIsXG4uYmF0dGxlc2hpcCxcbi5kZXN0cm95ZXIsXG4uc3VibWFyaW5lLFxuLnBhdHJvbC1ib2F0IHtcbiAgaGVpZ2h0OiA0MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHNreWJsdWU7XG59XG5cbi51c2VyLWJhdHRsZWZpZWxkLFxuLmNvbXB1dGVyLWJhdHRsZWZpZWxkIHtcbiAgaGVpZ2h0OiAzNTBweDtcbiAgd2lkdGg6IDM1MHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG59XG5cbi5zcXVhcmUge1xuICBib3JkZXI6IHNvbGlkIDFweCBncmV5O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnNoaXAtc3F1YXJlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YW1hcmluZTtcbn1cblxuLnNoaXAtbWlzc2VkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn1cblxuLnNoaXAtaGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uc3F1YXJlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGFBQWE7RUFDYixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDOztBQUVBOztFQUVFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiwrQkFBK0I7RUFDL0IscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7Ozs7O0VBS0UsWUFBWTtFQUNaLDJCQUEyQjtFQUMzQix5QkFBeUI7QUFDM0I7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XFxufVxcblxcbi5jb250ZW50IHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTAwcHggMWZyIDE1MHB4O1xcbn1cXG5cXG4ubWFpbi1zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxufVxcblxcbi51c2VyLWNvbnRhaW5lcixcXG4uY29tcHV0ZXItY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cXG4ubGVmdC1zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucmlnaHQtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgM2ZyIDFmcjtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydC1tZW51LXRhYmxlIHtcXG4gIGhlaWdodDogNDAwcHg7XFxuICB3aWR0aDogNDAwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG50Ym9keSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnRhYmxlLXJvdyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi50YWJsZS1jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLnBvcnQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG4uY2FycmllciB7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcblxcbi5iYXR0bGVzaGlwIHtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuXFxuLmRlc3Ryb3llciB7XFxuICB3aWR0aDogMTIwcHg7XFxufVxcblxcbi5zdWJtYXJpbmUge1xcbiAgd2lkdGg6IDEyMHB4O1xcbn1cXG5cXG4ucGF0cm9sLWJvYXQge1xcbiAgd2lkdGg6IDgwcHg7XFxufVxcblxcbi5jYXJyaWVyLFxcbi5iYXR0bGVzaGlwLFxcbi5kZXN0cm95ZXIsXFxuLnN1Ym1hcmluZSxcXG4ucGF0cm9sLWJvYXQge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgc2t5Ymx1ZTtcXG59XFxuXFxuLnVzZXItYmF0dGxlZmllbGQsXFxuLmNvbXB1dGVyLWJhdHRsZWZpZWxkIHtcXG4gIGhlaWdodDogMzUwcHg7XFxuICB3aWR0aDogMzUwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnNxdWFyZSB7XFxuICBib3JkZXI6IHNvbGlkIDFweCBncmV5O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNoaXAtc3F1YXJlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XFxufVxcblxcbi5zaGlwLW1pc3NlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG5cXG4uc2hpcC1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uc3F1YXJlOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBwYWdlTGF5b3V0IH0gZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuLy8gaW1wb3J0IHsgdXNlckV2ZW50SGFuZGxlciB9IGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcbmltcG9ydCB7IHN0YXJ0TWVudSwgc3RhcnRNZW51RXZlbnRIYW5kbGVyIH0gZnJvbSBcIi4vc3RhcnQtbWVudVwiO1xuXG5jb25zdCBjb21wb25lbnQgPSAoKSA9PiB7XG4gIHBhZ2VMYXlvdXQoKTtcbiAgLy8gR2FtZSgpO1xuICBzdGFydE1lbnUoKTtcbiAgLy8gdXNlckV2ZW50SGFuZGxlcigpO1xuICBzdGFydE1lbnVFdmVudEhhbmRsZXIoKTtcbn07XG5jb21wb25lbnQoKTtcbiJdLCJuYW1lcyI6WyJHYW1lIiwicGxheVJvdW5kIiwidXNlckF0dGFja3MiLCJjb21wdXRlckF0dGFja3MiLCJwYWdlTGF5b3V0IiwiY29udGVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhlYWRlciIsImNyZWF0ZUVsZW1lbnQiLCJtYWluIiwiZm9vdGVyIiwidGl0bGUiLCJ3aW5uZXJDb250YWluZXIiLCJsb2dvQ29udGFpbmVyIiwibG9nbyIsIkltYWdlIiwiY2xhc3NMaXN0IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhbHQiLCJhcHBlbmRDaGlsZCIsImdhbWVNZW51IiwiY29udGFpbmVyIiwiY29udGFpbmVyT25lIiwiY29udGFpbmVyVHdvIiwiYmF0dGxlZmllbGRPbmUiLCJiYXR0bGVmaWVsZFR3byIsImJhdHRsZWZpZWxkT25lUGFyYSIsImJhdHRsZWZpZWxkVHdvUGFyYSIsInJlbmRlckJvYXJkcyIsInVzZXJCYXR0bGVmaWVsZCIsImNvbXB1dGVyQmF0dGxlZmllbGQiLCJyZW5kZXJVc2VyQm9hcmQiLCJib2FyZCIsImkiLCJsZW5ndGgiLCJyb3ciLCJqIiwiYnRuIiwiZGF0YSIsInR5cGUiLCJkYXRhc2V0IiwicG9zIiwicmVuZGVyQ29tcHV0ZXJCb2FyZCIsImdhbWVXaW5uZXIiLCJ3aW5uZXIiLCJ3aW5uZXJBbm5vdW5jZXIiLCJyZXN0YXJ0QnV0dG9uIiwiZ2FtZU1lbnVFdmVudEhhbmRsZXIiLCJtYWluU2VjdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiaGFzQ2hpbGROb2RlcyIsInRhcmdldCIsImNsYXNzTmFtZSIsInNxdWFyZSIsImFycmF5Iiwic3BsaXQiLCJwYXJzZUludCIsInBhcmVudFR3byIsIlBsYXllclNoaXBzIiwiU2hpcCIsIkdhbWVCb2FyZCIsImNyZWF0ZUJvYXJkIiwiZ2V0Qm9hcmQiLCJzaGlwcyIsInBvcHVsYXRlQm9hcmQiLCJwbGFjZVNoaXBzIiwiZmluZEF0dGFja2VkU2hpcCIsImtleSIsImNvb3JkaW5hdGVzIiwiZWxlbWVudCIsInJlY2VpdmVBdHRhY2siLCJ4IiwieSIsImF0dGFja2VkU2hpcCIsImhpdCIsImFsbFNoaXBzRGVzdHJveWVkIiwiY291bnQiLCJzaGlwU3RhdGUiLCJkZXN0cm95ZWQiLCJQbGF5ZXIiLCJ1c2VyR2FtZUJvYXJkIiwiY29tcHV0ZXJHYW1lQm9hcmQiLCJ1c2VyIiwiY29tcHV0ZXIiLCJ1c2VyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwiYXR0YWNrIiwibXlQcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwidGhlbiIsIm5hbWUiLCJnZXROYW1lIiwiaXNBdHRhY2tMZWdhbCIsImVuZW15Iiwic2xpY2UiLCJzaGlmdCIsImVuZW15TmFtZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNoZWNrTGVnYWwiLCJwdXNoIiwiY2FycmllciIsImhpdHMiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsImlzU3VuayIsInNoaXAiLCJzaGlwTGVuZ3RoIiwiaGl0c0NvdW50IiwiY2hlY2tTaGlwIiwiZ2V0U3RhcnRTY3JlZW5Cb2FyZCIsImdhbWVCb2FyZCIsInN0YXJ0TWVudSIsImxlZnRTZWN0aW9uIiwicmlnaHRTZWN0aW9uIiwidGFibGUiLCJ0YWJsZUJvZHkiLCJwYXJhIiwic2hpcHNDb250YWluZXIiLCJyb3RhdGVCdG4iLCJkcmFnZ2FibGUiLCJ0YWJsZVJvdyIsImNlbGwiLCJzdGFydE1lbnVFdmVudEhhbmRsZXIiLCJjb21wb25lbnQiXSwic291cmNlUm9vdCI6IiJ9