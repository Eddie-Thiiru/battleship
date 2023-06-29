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
/* harmony import */ var _game_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-controller */ "./src/game-controller.js");
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
      (0,_game_controller__WEBPACK_IMPORTED_MODULE_1__.playRound)(pos);
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

/***/ "./src/computerAI.js":
/*!***************************!*\
  !*** ./src/computerAI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computerShipCoordinates: () => (/* binding */ computerShipCoordinates),
/* harmony export */   getComputerShips: () => (/* binding */ getComputerShips),
/* harmony export */   visited: () => (/* binding */ visited)
/* harmony export */ });
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

  // Add adjacent coordinates for ship coordinates along the Y-axis
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

      // Add adjacent coordinates for the first square of the ship coordinates
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

      // Add adjacent coordinates for the last square of the ship coordinates
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

  // Add adjacent coordinates for ship coordinates along the X-axis
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

      // Add adjacent coordinates for the first square of the ship coordinates
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

      // Add adjacent coordinates for the last square of the ship coordinates
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
  let set;

  // Randomize set of combos to be used
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
  let repeat = 1;

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

    // Ensures both the destroyer and the submarine have the same length
    if (length === 3 && repeat === 1) {
      repeat -= 1;
    } else {
      length -= 1;
    }
  }
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

/***/ "./src/game-controller.js":
/*!********************************!*\
  !*** ./src/game-controller.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game),
/* harmony export */   playRound: () => (/* binding */ playRound)
/* harmony export */ });
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");
/* harmony import */ var _start_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-menu */ "./src/start-menu.js");
/* harmony import */ var _computerAI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./computerAI */ "./src/computerAI.js");





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
  userGameBoard.populateBoard(_start_menu__WEBPACK_IMPORTED_MODULE_3__.userShipsCoordinates);
  computerGameBoard.populateBoard(_computerAI__WEBPACK_IMPORTED_MODULE_4__.computerShipCoordinates);

  //   Get player boards from GameBoard objects
  const userBoard = userGameBoard.getBoard();
  const computerBoard = computerGameBoard.getBoard();

  // Initial player boards are rendered
  (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderUserBoard(userBoard);
  (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderComputerBoard(computerBoard);

  // Initialize event handler
  (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.gameMenuEventHandler)();
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
    computer.attack(user, userGameBoard, pos);

    // Update user board on the screen
    const userBoard = userGameBoard.getBoard();
    (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderUserBoard(userBoard);

    // Check if all user ships are destroyed
    if (userGameBoard.allShipsDestroyed() === true) {
      (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.gameWinner)("Computer Wins!");
      return;
    }
  }
};


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
/* harmony export */   startMenu: () => (/* binding */ startMenu),
/* harmony export */   startMenuEventHandler: () => (/* binding */ startMenuEventHandler),
/* harmony export */   userShipsCoordinates: () => (/* binding */ userShipsCoordinates)
/* harmony export */ });
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");
/* harmony import */ var _game_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-controller */ "./src/game-controller.js");
/* harmony import */ var _computerAI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./computerAI */ "./src/computerAI.js");
/* harmony import */ var _styles_startmenu_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/startmenu.css */ "./src/styles/startmenu.css");





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
      (0,_computerAI__WEBPACK_IMPORTED_MODULE_3__.getComputerShips)();
      (0,_battleship__WEBPACK_IMPORTED_MODULE_1__.gameMenu)();
      (0,_game_controller__WEBPACK_IMPORTED_MODULE_2__.Game)();
      userShipsCoordinates.length = 0;
      _computerAI__WEBPACK_IMPORTED_MODULE_3__.computerShipCoordinates.length = 0;
      _computerAI__WEBPACK_IMPORTED_MODULE_3__.visited.length = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztBQUN6QixDQUFDO0FBQ0RlLFNBQVMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2JhdHRsZXNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wdXRlckFJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS1ib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xheW91dC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3RhcnQtbWVudS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9nYW1lbWVudS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdGFydG1lbnUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9nYW1lbWVudS5jc3M/MjU5MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9nbG9iYWwuY3NzP2YwZDgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3RhcnRtZW51LmNzcz8xMmIwIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdGFydE1lbnUgfSBmcm9tIFwiLi9zdGFydC1tZW51XCI7XG5pbXBvcnQgeyBwbGF5Um91bmQgfSBmcm9tIFwiLi9nYW1lLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IHVzZXJBdHRhY2tzLCBjb21wdXRlckF0dGFja3MgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBcIi4vc3R5bGVzL2dhbWVtZW51LmNzc1wiO1xuXG5jb25zdCBnYW1lTWVudSA9ICgpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXNlY3Rpb25cIik7XG5cbiAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcblxuICBjb25zdCBjb250YWluZXJPbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBjb250YWluZXJUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZE9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZWZpZWxkVHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRPbmVQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IGJhdHRsZWZpZWxkVHdvUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gIGNvbnRhaW5lck9uZS5jbGFzc0xpc3QuYWRkKFwidXNlci1jb250YWluZXJcIik7XG4gIGNvbnRhaW5lclR3by5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItY29udGFpbmVyXCIpO1xuICBiYXR0bGVmaWVsZE9uZS5jbGFzc0xpc3QuYWRkKFwidXNlci1iYXR0bGVmaWVsZFwiKTtcbiAgYmF0dGxlZmllbGRUd28uY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyLWJhdHRsZWZpZWxkXCIpO1xuICBiYXR0bGVmaWVsZE9uZVBhcmEudGV4dENvbnRlbnQgPSBcIlBsYXllciBCb2FyZFwiO1xuICBiYXR0bGVmaWVsZFR3b1BhcmEudGV4dENvbnRlbnQgPSBcIkFJIEJvYXJkXCI7XG5cbiAgY29udGFpbmVyT25lLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkT25lKTtcbiAgY29udGFpbmVyVHdvLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkVHdvKTtcbiAgY29udGFpbmVyT25lLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkT25lUGFyYSk7XG4gIGNvbnRhaW5lclR3by5hcHBlbmRDaGlsZChiYXR0bGVmaWVsZFR3b1BhcmEpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyT25lKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lclR3byk7XG59O1xuXG5jb25zdCByZW5kZXJCb2FyZHMgPSAoKSA9PiB7XG4gIGNvbnN0IHVzZXJCYXR0bGVmaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1iYXR0bGVmaWVsZFwiKTtcbiAgY29uc3QgY29tcHV0ZXJCYXR0bGVmaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXItYmF0dGxlZmllbGRcIik7XG5cbiAgLy8gUmVuZGVyIHVzZXIgZ2FtZSBib2FyZFxuICBjb25zdCByZW5kZXJVc2VyQm9hcmQgPSAoYm9hcmQpID0+IHtcbiAgICB1c2VyQmF0dGxlZmllbGQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gYm9hcmRbaV07XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBib2FyZFtpXVtqXTtcblxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgICAgYnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgICBidG4uZGF0YXNldC5wb3MgPSBgJHtpfSwke2p9YDtcblxuICAgICAgICBpZiAoZGF0YSA9PT0gMSkge1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic2hpcC1zcXVhcmVcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gMikge1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic2hpcC1taXNzZWRcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gMykge1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic2hpcC1oaXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB1c2VyQmF0dGxlZmllbGQuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gUmVuZGVyIGNvbXB1dGVyIGdhbWUgYm9hcmRcbiAgY29uc3QgcmVuZGVyQ29tcHV0ZXJCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgIGNvbXB1dGVyQmF0dGxlZmllbGQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gYm9hcmRbaV07XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBib2FyZFtpXVtqXTtcblxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgICAgYnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgICBidG4uZGF0YXNldC5wb3MgPSBgJHtpfSwke2p9YDtcblxuICAgICAgICBpZiAoZGF0YSA9PT0gMikge1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic2hpcC1taXNzZWRcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gMykge1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic2hpcC1oaXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb21wdXRlckJhdHRsZWZpZWxkLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZXR1cm4geyByZW5kZXJVc2VyQm9hcmQsIHJlbmRlckNvbXB1dGVyQm9hcmQgfTtcbn07XG5cbmNvbnN0IGdhbWVXaW5uZXIgPSAod2lubmVyKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyLWNvbnRhaW5lclwiKTtcbiAgY29uc3Qgd2lubmVyQW5ub3VuY2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICB3aW5uZXJBbm5vdW5jZXIuY2xhc3NMaXN0LmFkZChcIndpbm5lclwiKTtcbiAgd2lubmVyQW5ub3VuY2VyLnRleHRDb250ZW50ID0gd2lubmVyO1xuICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXN0YXJ0LWJ1dHRvblwiKTtcbiAgcmVzdGFydEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVtYXRjaFwiO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5uZXJBbm5vdW5jZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVzdGFydEJ1dHRvbik7XG59O1xuXG5jb25zdCBnYW1lTWVudUV2ZW50SGFuZGxlciA9ICgpID0+IHtcbiAgY29uc3QgbWFpblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcbiAgY29uc3Qgd2lubmVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItY29udGFpbmVyXCIpO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmICh3aW5uZXJDb250YWluZXIuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJzcXVhcmVcIikge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBkYXRhID0gc3F1YXJlLmRhdGFzZXQucG9zO1xuICAgICAgY29uc3QgYXJyYXkgPSBkYXRhLnNwbGl0KFwiLFwiKTtcbiAgICAgIGNvbnN0IHBvcyA9IFtwYXJzZUludChhcnJheVswXSksIHBhcnNlSW50KGFycmF5WzFdKV07XG5cbiAgICAgIHBsYXlSb3VuZChwb3MpO1xuICAgIH1cbiAgfSk7XG5cbiAgd2lubmVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmICgoZS50YXJnZXQuY2xhc3NOYW1lID0gXCJyZXN0YXJ0LWJ1dHRvblwiKSkge1xuICAgICAgbWFpblNlY3Rpb24udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgd2lubmVyQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgLy8gRW1wdHkgYXR0YWNrZWQgc3F1YXJlcyBoaXN0b3J5XG4gICAgICB1c2VyQXR0YWNrcy5sZW5ndGggPSAwO1xuICAgICAgY29tcHV0ZXJBdHRhY2tzLmxlbmd0aCA9IDA7XG5cbiAgICAgIC8vIFN0YXJ0IG5ldyBnYW1lXG4gICAgICBzdGFydE1lbnUoKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgZ2FtZU1lbnUsIHJlbmRlckJvYXJkcywgZ2FtZVdpbm5lciwgZ2FtZU1lbnVFdmVudEhhbmRsZXIgfTtcbiIsImxldCBjb21wdXRlclNoaXBDb29yZGluYXRlcyA9IFtdO1xubGV0IHZpc2l0ZWQgPSBbXTtcblxuY29uc3QgaXNBcnJheUluQXJyYXkgPSAoc291cmNlLCBzZWFyY2gpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWFyY2gubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgc2VhcmNoRWxlID0gc2VhcmNoW2ldO1xuXG4gICAgaWYgKHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgIC8vIFNlYXJjaCBmb3IgZWFjaCBcInNlYXJjaCBhcnJheVwiIGVsZW1lbnQgaW4gdGhlIHNvdXJjZSBhcnJheVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgc291cmNlLmxlbmd0aDsgaisrKSB7XG4gICAgICBsZXQgc291cmNlRWxlID0gc291cmNlW2pdO1xuXG4gICAgICBpZiAoc2VhcmNoRWxlWzBdID09PSBzb3VyY2VFbGVbMF0gJiYgc2VhcmNoRWxlWzFdID09PSBzb3VyY2VFbGVbMV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBnZXRBZGpDb29yZGluYXRlcyA9IChjb29yZGluYXRlcykgPT4ge1xuICBsZXQgYWRqUG9zaXRpb25zID0gW107XG4gIGxldCBvcmllbnRhdGlvbiA9IFwiXCI7XG4gIGxldCBvbmUgPSBjb29yZGluYXRlc1swXTtcbiAgbGV0IHR3byA9IGNvb3JkaW5hdGVzWzFdO1xuXG4gIC8vIENoZWNrIGNvb3JkaW5hdGVzIG9yaWVudGF0aW9uXG4gIGlmIChvbmVbMF0gPT09IHR3b1swXSAmJiBvbmVbMV0gIT09IHR3b1sxXSkge1xuICAgIG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gIH0gZWxzZSBpZiAob25lWzBdICE9PSB0d29bMF0gJiYgb25lWzFdID09PSB0d29bMV0pIHtcbiAgICBvcmllbnRhdGlvbiA9IFwidmVydGljYWxcIjtcbiAgfVxuXG4gIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3Igc2hpcCBjb29yZGluYXRlcyBhbG9uZyB0aGUgWS1heGlzXG4gIGlmIChvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNvb3JkaW5hdGVzW2ldO1xuXG4gICAgICBsZXQgYWRqTGVmdCA9IFtlbGVtZW50WzBdLCBlbGVtZW50WzFdIC0gMV07XG4gICAgICBsZXQgYWRqUmlnaHQgPSBbZWxlbWVudFswXSwgZWxlbWVudFsxXSArIDFdO1xuXG4gICAgICBpZiAoYWRqTGVmdFsxXSA+PSAwICYmIGFkakxlZnRbMV0gPD0gOSkge1xuICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpMZWZ0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFkalJpZ2h0WzFdID49IDAgJiYgYWRqUmlnaHRbMV0gPD0gOSkge1xuICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpSaWdodCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3IgdGhlIGZpcnN0IHNxdWFyZSBvZiB0aGUgc2hpcCBjb29yZGluYXRlc1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgbGV0IGFkalRvcCA9IFtlbGVtZW50WzBdIC0gMSwgZWxlbWVudFsxXV07XG5cbiAgICAgICAgaWYgKGFkalRvcFswXSA+PSAwICYmIGFkalRvcFswXSA8PSA5KSB7XG4gICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqVG9wKTtcblxuICAgICAgICAgIGxldCBsZWZ0ID0gW2FkalRvcFswXSwgYWRqVG9wWzFdIC0gMV07XG4gICAgICAgICAgbGV0IHJpZ2h0ID0gW2FkalRvcFswXSwgYWRqVG9wWzFdICsgMV07XG5cbiAgICAgICAgICBpZiAobGVmdFsxXSA+PSAwICYmIGxlZnRbMV0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2gobGVmdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJpZ2h0WzFdID49IDAgJiYgcmlnaHRbMV0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2gocmlnaHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYWRqYWNlbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBsYXN0IHNxdWFyZSBvZiB0aGUgc2hpcCBjb29yZGluYXRlc1xuICAgICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIGkgPT09IDEpIHtcbiAgICAgICAgbGV0IGFkakJvdHRvbSA9IFtlbGVtZW50WzBdICsgMSwgZWxlbWVudFsxXV07XG5cbiAgICAgICAgaWYgKGFkakJvdHRvbVswXSA+PSAwICYmIGFkakJvdHRvbVswXSA8PSA5KSB7XG4gICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqQm90dG9tKTtcblxuICAgICAgICAgIGxldCBsZWZ0ID0gW2FkakJvdHRvbVswXSwgYWRqQm90dG9tWzFdIC0gMV07XG4gICAgICAgICAgbGV0IHJpZ2h0ID0gW2FkakJvdHRvbVswXSwgYWRqQm90dG9tWzFdICsgMV07XG5cbiAgICAgICAgICBpZiAobGVmdFsxXSA+PSAwICYmIGxlZnRbMV0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2gobGVmdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJpZ2h0WzFdID49IDAgJiYgcmlnaHRbMV0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2gocmlnaHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhZGpQb3NpdGlvbnM7XG4gIH1cblxuICAvLyBBZGQgYWRqYWNlbnQgY29vcmRpbmF0ZXMgZm9yIHNoaXAgY29vcmRpbmF0ZXMgYWxvbmcgdGhlIFgtYXhpc1xuICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNvb3JkaW5hdGVzW2ldO1xuXG4gICAgICBsZXQgYWRqVG9wID0gW2VsZW1lbnRbMF0gLSAxLCBlbGVtZW50WzFdXTtcbiAgICAgIGxldCBhZGpCb3R0b20gPSBbZWxlbWVudFswXSArIDEsIGVsZW1lbnRbMV1dO1xuXG4gICAgICBpZiAoYWRqVG9wWzBdID49IDAgJiYgYWRqVG9wWzBdIDw9IDkpIHtcbiAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqVG9wKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFkakJvdHRvbVswXSA+PSAwICYmIGFkakJvdHRvbVswXSA8PSA5KSB7XG4gICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkakJvdHRvbSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3IgdGhlIGZpcnN0IHNxdWFyZSBvZiB0aGUgc2hpcCBjb29yZGluYXRlc1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgbGV0IGFkakxlZnQgPSBbZWxlbWVudFswXSwgZWxlbWVudFsxXSAtIDFdO1xuXG4gICAgICAgIGlmIChhZGpMZWZ0WzFdID49IDAgJiYgYWRqTGVmdFsxXSA8PSA5KSB7XG4gICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqTGVmdCk7XG5cbiAgICAgICAgICBsZXQgdG9wID0gW2FkakxlZnRbMF0gLSAxLCBhZGpMZWZ0WzFdXTtcbiAgICAgICAgICBsZXQgYm90dG9tID0gW2FkakxlZnRbMF0gKyAxLCBhZGpMZWZ0WzFdXTtcblxuICAgICAgICAgIGlmICh0b3BbMF0gPj0gMCAmJiB0b3BbMF0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2godG9wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYm90dG9tWzBdID49IDAgJiYgYm90dG9tWzBdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGJvdHRvbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3IgdGhlIGxhc3Qgc3F1YXJlIG9mIHRoZSBzaGlwIGNvb3JkaW5hdGVzXG4gICAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoIC0gaSA9PT0gMSkge1xuICAgICAgICBsZXQgYWRqUmlnaHQgPSBbZWxlbWVudFswXSwgZWxlbWVudFsxXSArIDFdO1xuXG4gICAgICAgIGlmIChhZGpSaWdodFsxXSA+PSAwICYmIGFkalJpZ2h0WzFdIDw9IDkpIHtcbiAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpSaWdodCk7XG5cbiAgICAgICAgICBsZXQgdG9wID0gW2FkalJpZ2h0WzBdIC0gMSwgYWRqUmlnaHRbMV1dO1xuICAgICAgICAgIGxldCBib3R0b20gPSBbYWRqUmlnaHRbMF0gKyAxLCBhZGpSaWdodFsxXV07XG5cbiAgICAgICAgICBpZiAodG9wWzBdID49IDAgJiYgdG9wWzBdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKHRvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGJvdHRvbVswXSA+PSAwICYmIGJvdHRvbVswXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChib3R0b20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhZGpQb3NpdGlvbnM7XG4gIH1cbn07XG5cbmNvbnN0IGdldFJhbmRvbVBvc2l0aW9uID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgdmFsaWQgPSBmYWxzZTtcbiAgbGV0IHBvcztcblxuICB3aGlsZSAodmFsaWQgPT09IGZhbHNlKSB7XG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgcG9zID0gW3gsIHldO1xuXG4gICAgaWYgKHggKyBsZW5ndGggPD0gMTAgJiYgeSArIGxlbmd0aCA8PSAxMCkge1xuICAgICAgdmFsaWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwb3M7XG59O1xuXG5jb25zdCBnZXRMZWdhbENvbWJvcyA9IChzaGlwTGVuZ3RoKSA9PiB7XG4gIGNvbnN0IGxlZ2FsQ29tYm9zID0gW1xuICAgIFtcbiAgICAgIFswLCAxXSxcbiAgICAgIFswLCAyXSxcbiAgICAgIFswLCAzXSxcbiAgICAgIFswLCA0XSxcbiAgICAgIFswLCA1XSxcbiAgICBdLFxuICAgIFtcbiAgICAgIFsxLCAwXSxcbiAgICAgIFsyLCAwXSxcbiAgICAgIFszLCAwXSxcbiAgICAgIFs0LCAwXSxcbiAgICAgIFs1LCAwXSxcbiAgICBdLFxuICBdO1xuICBjb25zdCBwb3MgPSBnZXRSYW5kb21Qb3NpdGlvbihzaGlwTGVuZ3RoKTtcblxuICBsZXQgY29vcmRpbmF0ZXMgPSBbXTtcbiAgbGV0IHNldDtcblxuICAvLyBSYW5kb21pemUgc2V0IG9mIGNvbWJvcyB0byBiZSB1c2VkXG4gIGlmIChzaGlwTGVuZ3RoICUgMiA9PT0gMCkge1xuICAgIHNldCA9IGxlZ2FsQ29tYm9zWzBdO1xuICB9IGVsc2Uge1xuICAgIHNldCA9IGxlZ2FsQ29tYm9zWzFdO1xuICB9XG5cbiAgbGV0IGxlbmd0aERpZmYgPSBzZXQubGVuZ3RoIC0gc2hpcExlbmd0aDtcbiAgbGV0IGFycmF5TGVuZ3RoID0gc2V0Lmxlbmd0aCAtIDEgLSBsZW5ndGhEaWZmO1xuXG4gIGNvb3JkaW5hdGVzLnB1c2gocG9zKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBzZXRbaV07XG5cbiAgICBsZXQgeCA9IHBvc1swXTtcbiAgICBsZXQgeSA9IHBvc1sxXTtcbiAgICBsZXQgbW92ZSA9IFt4ICsgdmFsdWVzWzBdLCB5ICsgdmFsdWVzWzFdXTtcblxuICAgIGNvb3JkaW5hdGVzLnB1c2gobW92ZSk7XG4gIH1cblxuICByZXR1cm4gY29vcmRpbmF0ZXM7XG59O1xuXG5jb25zdCBnZXRDb21wdXRlclNoaXBzID0gKCkgPT4ge1xuICBsZXQgbGVuZ3RoID0gNTtcbiAgbGV0IHJlcGVhdCA9IDE7XG5cbiAgLy8gR2V0IGNvb3JkaW5hdGVzIGZvciBlYWNoIHNoaXBcbiAgd2hpbGUgKGxlbmd0aCA+IDEpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBnZXRMZWdhbENvbWJvcyhsZW5ndGgpO1xuICAgIGxldCBpdGVtVmlzaXRlZCA9IGlzQXJyYXlJbkFycmF5KHZpc2l0ZWQsIGNvb3JkaW5hdGVzKTtcblxuICAgIHdoaWxlIChpdGVtVmlzaXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgY29vcmRpbmF0ZXMgPSBnZXRMZWdhbENvbWJvcyhsZW5ndGgpO1xuICAgICAgaXRlbVZpc2l0ZWQgPSBpc0FycmF5SW5BcnJheSh2aXNpdGVkLCBjb29yZGluYXRlcyk7XG4gICAgfVxuXG4gICAgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlcyk7XG5cbiAgICAvLyBQdXNoIGNvb3JkaW5hdGVzIHRvIHRoZSB2aXNpdGVkIGFycmF5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNvb3JkaW5hdGUgPSBjb29yZGluYXRlc1tpXTtcblxuICAgICAgdmlzaXRlZC5wdXNoKGNvb3JkaW5hdGUpO1xuICAgIH1cblxuICAgIGNvbnN0IGFkakNvb3JkaW5hdGVzID0gZ2V0QWRqQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuXG4gICAgLy8gUHVzaCBhZGphY2VudCBjb29yZGluYXRlcyB0byB0aGUgdmlzaXRlZCBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRqQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjb29yZGluYXRlID0gYWRqQ29vcmRpbmF0ZXNbaV07XG5cbiAgICAgIHZpc2l0ZWQucHVzaChjb29yZGluYXRlKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmVzIGJvdGggdGhlIGRlc3Ryb3llciBhbmQgdGhlIHN1Ym1hcmluZSBoYXZlIHRoZSBzYW1lIGxlbmd0aFxuICAgIGlmIChsZW5ndGggPT09IDMgJiYgcmVwZWF0ID09PSAxKSB7XG4gICAgICByZXBlYXQgLT0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoIC09IDE7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgeyBnZXRDb21wdXRlclNoaXBzLCBjb21wdXRlclNoaXBDb29yZGluYXRlcywgdmlzaXRlZCB9O1xuIiwiaW1wb3J0IHsgUGxheWVyU2hpcHMsIFNoaXAgfSBmcm9tIFwiLi9zaGlwc1wiO1xuXG5jb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGxldCBib2FyZCA9IFtdO1xuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBib2FyZFtpXVtqXSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgcGxheWVyU2hpcHMgPSBQbGF5ZXJTaGlwcygpO1xuICBjb25zdCBzaGlwcyA9IHBsYXllclNoaXBzLmdldFNoaXBzKCk7XG5cbiAgY29uc3QgcG9wdWxhdGVCb2FyZCA9IChhcnJheSkgPT4ge1xuICAgIHBsYXllclNoaXBzLmFkZFNoaXBDb29yZGluYXRlcyhhcnJheSk7XG5cbiAgICAvLyBQbGFjZSBhbGwgc2hpcHMgb250byB0aGUgYm9hcmRcbiAgICBTaGlwKCkucGxhY2VTaGlwcyhib2FyZCwgc2hpcHMpO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRBdHRhY2tlZFNoaXAgPSAocG9zKSA9PiB7XG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBjb25zdCBhcnJheSA9IHNoaXBzW2tleV0uY29vcmRpbmF0ZXM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2ldO1xuXG4gICAgICAgIGlmIChlbGVtZW50WzBdID09PSBwb3NbMF0gJiYgZWxlbWVudFsxXSA9PT0gcG9zWzFdKSB7XG4gICAgICAgICAgcmV0dXJuIHNoaXBzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChwb3MpID0+IHtcbiAgICBsZXQgeCA9IHBvc1swXTtcbiAgICBsZXQgeSA9IHBvc1sxXTtcblxuICAgIGlmIChib2FyZFt4XVt5XSA9PT0gMSkge1xuICAgICAgY29uc3QgYXR0YWNrZWRTaGlwID0gZmluZEF0dGFja2VkU2hpcChwb3MpO1xuXG4gICAgICAvLyBNYXJrIGJvYXJkIHBvc2l0aW9uIGFzIGF0dGFja2VkXG4gICAgICBib2FyZFt4XVt5XSA9IDM7XG5cbiAgICAgIC8vIEFkZCBoaXQgY291bnQgdG8gYXR0YWNrZWQgc2hpcFxuICAgICAgU2hpcCgpLmhpdChhdHRhY2tlZFNoaXApO1xuICAgIH0gZWxzZSBpZiAoYm9hcmRbeF1beV0gPT09IDApIHtcbiAgICAgIC8vIE1hcmsgYm9hcmQgcG9zaXRpb24gYXMgYXR0YWNrZWRcbiAgICAgIGJvYXJkW3hdW3ldID0gMjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWxsU2hpcHNEZXN0cm95ZWQgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcblxuICAgIGZvciAobGV0IGtleSBpbiBzaGlwcykge1xuICAgICAgY29uc3Qgc2hpcFN0YXRlID0gc2hpcHNba2V5XS5kZXN0cm95ZWQ7XG5cbiAgICAgIGlmIChzaGlwU3RhdGUgPT09IHRydWUpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY291bnQgPT09IDUgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVCb2FyZCxcbiAgICBnZXRCb2FyZCxcbiAgICBwb3B1bGF0ZUJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU2hpcHNEZXN0cm95ZWQsXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgcmVuZGVyQm9hcmRzLCBnYW1lV2lubmVyLCBnYW1lTWVudUV2ZW50SGFuZGxlciB9IGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcbmltcG9ydCB7IHVzZXJTaGlwc0Nvb3JkaW5hdGVzIH0gZnJvbSBcIi4vc3RhcnQtbWVudVwiO1xuaW1wb3J0IHsgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMgfSBmcm9tIFwiLi9jb21wdXRlckFJXCI7XG5cbmxldCB1c2VyR2FtZUJvYXJkO1xubGV0IGNvbXB1dGVyR2FtZUJvYXJkO1xubGV0IHVzZXI7XG5sZXQgY29tcHV0ZXI7XG5cbmNvbnN0IEdhbWUgPSAoKSA9PiB7XG4gIC8vIENyZWF0ZSBQbGF5ZXIgb2JqZWN0cyBhbmQgR2FtZUJvYXJkIG9iamVjdHMgZm9yIGVhY2ggcGxheWVyXG4gIHVzZXIgPSBQbGF5ZXIoXCJ1c2VyXCIpO1xuICBjb21wdXRlciA9IFBsYXllcihcImNvbXB1dGVyIEFJXCIpO1xuXG4gIHVzZXJHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgY29tcHV0ZXJHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcblxuICAvLyBDcmVhdGUgbmV3IGJvYXJkcyBmb3IgZWFjaCBwbGF5ZXJcbiAgdXNlckdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuICBjb21wdXRlckdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gIC8vIFBvcHVsYXRlIHBsYXllciBib2FyZHMgd2l0aCBzaGlwc1xuICB1c2VyR2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQodXNlclNoaXBzQ29vcmRpbmF0ZXMpO1xuICBjb21wdXRlckdhbWVCb2FyZC5wb3B1bGF0ZUJvYXJkKGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzKTtcblxuICAvLyAgIEdldCBwbGF5ZXIgYm9hcmRzIGZyb20gR2FtZUJvYXJkIG9iamVjdHNcbiAgY29uc3QgdXNlckJvYXJkID0gdXNlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcblxuICAvLyBJbml0aWFsIHBsYXllciBib2FyZHMgYXJlIHJlbmRlcmVkXG4gIHJlbmRlckJvYXJkcygpLnJlbmRlclVzZXJCb2FyZCh1c2VyQm9hcmQpO1xuICByZW5kZXJCb2FyZHMoKS5yZW5kZXJDb21wdXRlckJvYXJkKGNvbXB1dGVyQm9hcmQpO1xuXG4gIC8vIEluaXRpYWxpemUgZXZlbnQgaGFuZGxlclxuICBnYW1lTWVudUV2ZW50SGFuZGxlcigpO1xufTtcblxuY29uc3QgcGxheVJvdW5kID0gKHBvcykgPT4ge1xuICBsZXQgdXNlckF0dGFja3MgPSB1c2VyLmF0dGFjayhjb21wdXRlciwgY29tcHV0ZXJHYW1lQm9hcmQsIHBvcyk7XG5cbiAgaWYgKHVzZXJBdHRhY2tzID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICAvLyBVcGRhdGUgY29tcHV0ZXIgYm9hcmQgb24gdGhlIHNjcmVlblxuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuICAgIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoY29tcHV0ZXJCb2FyZCk7XG5cbiAgICAvLyBDaGVjayBpZiBhbGwgY29tcHV0ZXIgc2hpcHMgYXJlIGRlc3Ryb3llZFxuICAgIGlmIChjb21wdXRlckdhbWVCb2FyZC5hbGxTaGlwc0Rlc3Ryb3llZCgpID09PSB0cnVlKSB7XG4gICAgICBnYW1lV2lubmVyKFwiWW91IFdpbiFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29tcHV0ZXIuYXR0YWNrKHVzZXIsIHVzZXJHYW1lQm9hcmQsIHBvcyk7XG5cbiAgICAvLyBVcGRhdGUgdXNlciBib2FyZCBvbiB0aGUgc2NyZWVuXG4gICAgY29uc3QgdXNlckJvYXJkID0gdXNlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuICAgIHJlbmRlckJvYXJkcygpLnJlbmRlclVzZXJCb2FyZCh1c2VyQm9hcmQpO1xuXG4gICAgLy8gQ2hlY2sgaWYgYWxsIHVzZXIgc2hpcHMgYXJlIGRlc3Ryb3llZFxuICAgIGlmICh1c2VyR2FtZUJvYXJkLmFsbFNoaXBzRGVzdHJveWVkKCkgPT09IHRydWUpIHtcbiAgICAgIGdhbWVXaW5uZXIoXCJDb21wdXRlciBXaW5zIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IEdhbWUsIHBsYXlSb3VuZCB9O1xuIiwiaW1wb3J0IFwiLi9zdHlsZXMvZ2xvYmFsLmNzc1wiO1xuXG5jb25zdCBwYWdlTGF5b3V0ID0gKCkgPT4ge1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpO1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIGNvbnN0IHdpbm5lckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGxvZ29Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBsb2dvID0gbmV3IEltYWdlKCk7XG5cbiAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJcIik7XG4gIG1haW4uY2xhc3NMaXN0LmFkZChcIm1haW4tc2VjdGlvblwiKTtcbiAgZm9vdGVyLmNsYXNzTGlzdC5hZGQoXCJmb290ZXJcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcbiAgd2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3aW5uZXItY29udGFpbmVyXCIpO1xuICBsb2dvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJsb2dvLWNvbnRhaW5lclwiKTtcbiAgbG9nby5hbHQgPSBcIlN1Ym1hcmluZSBsb2dvXCI7XG5cbiAgbG9nb0NvbnRhaW5lci5hcHBlbmRDaGlsZChsb2dvKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGxvZ29Db250YWluZXIpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQod2lubmVyQ29udGFpbmVyKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKG1haW4pO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGZvb3Rlcik7XG59O1xuXG5leHBvcnQgeyBwYWdlTGF5b3V0IH07XG4iLCJsZXQgdXNlckF0dGFja3MgPSBbXTtcbmxldCBjb21wdXRlckF0dGFja3MgPSBbXTtcblxuY29uc3QgUGxheWVyID0gKG5hbWUpID0+IHtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgY29uc3QgaXNBdHRhY2tMZWdhbCA9IChlbmVteSwgcG9zKSA9PiB7XG4gICAgbGV0IGFycmF5O1xuXG4gICAgaWYgKGVuZW15ID09PSBcInVzZXJcIikge1xuICAgICAgYXJyYXkgPSBjb21wdXRlckF0dGFja3Muc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXkgPSB1c2VyQXR0YWNrcy5zbGljZSgpO1xuICAgIH1cblxuICAgIHdoaWxlIChhcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheS5zaGlmdCgpO1xuICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHBvc1swXSAmJiBlbGVtZW50WzFdID09PSBwb3NbMV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIEdhbWVCb2FyZCwgcG9zKSA9PiB7XG4gICAgY29uc3QgZW5lbXlOYW1lID0gZW5lbXkuZ2V0TmFtZSgpO1xuXG4gICAgaWYgKGVuZW15TmFtZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBsZXQgcG9zID0gW3gsIHldO1xuXG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb21wdXRlckF0dGFja3MucHVzaChwb3MpO1xuICAgICAgICBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXR0YWNrKGVuZW15LCBHYW1lQm9hcmQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB1c2VyQXR0YWNrcy5wdXNoKHBvcyk7XG4gICAgICAgIEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGdldE5hbWUsIGlzQXR0YWNrTGVnYWwsIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyLCB1c2VyQXR0YWNrcywgY29tcHV0ZXJBdHRhY2tzIH07XG4iLCJjb25zdCBQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgbGV0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IHtcbiAgICAgIGxlbmd0aDogNSxcbiAgICAgIGhpdHM6IDAsXG4gICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgY29vcmRpbmF0ZXM6IFtdLFxuICAgIH0sXG5cbiAgICBiYXR0bGVzaGlwOiB7XG4gICAgICBsZW5ndGg6IDQsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgZGVzdHJveWVyOiB7XG4gICAgICBsZW5ndGg6IDMsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgc3VibWFyaW5lOiB7XG4gICAgICBsZW5ndGg6IDMsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgcGF0cm9sQm9hdDoge1xuICAgICAgbGVuZ3RoOiAyLFxuICAgICAgaGl0czogMCxcbiAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgICBjb29yZGluYXRlczogW10sXG4gICAgfSxcbiAgfTtcbiAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBzaGlwcztcblxuICBjb25zdCBhZGRTaGlwQ29vcmRpbmF0ZXMgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgY29weSA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGxldCBzaGlwQXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuICAgICAgbGV0IGFyciA9IGNvcHkuc2hpZnQoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2hpcEFycmF5LnB1c2goYXJyW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0U2hpcHMsIGFkZFNoaXBDb29yZGluYXRlcyB9O1xufTtcblxuY29uc3QgU2hpcCA9ICgpID0+IHtcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChib2FyZCwgc2hpcHMpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGxldCBhcnJheSA9IHNoaXBzW2tleV0uY29vcmRpbmF0ZXM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2ldO1xuICAgICAgICBjb25zdCB4ID0gZWxlbWVudFswXTtcbiAgICAgICAgY29uc3QgeSA9IGVsZW1lbnRbMV07XG5cbiAgICAgICAgYm9hcmRbeF1beV0gPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoc2hpcCkgPT4ge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICBjb25zdCBoaXRzQ291bnQgPSBzaGlwLmhpdHM7XG5cbiAgICAvLyBjaGVjayBzaGlwIGxlbmd0aCBhbmQgbm8gb2YgdGltZXMgaXRzIGJlZW4gaGl0XG4gICAgcmV0dXJuIHNoaXBMZW5ndGggPT09IGhpdHNDb3VudCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0cyArPSAxO1xuXG4gICAgLy8gQWZ0ZXIgZXZlcnkgaGl0LCBjaGVjayBpZiB0aGUgc2hpcCBpcyBkZXN0cm95ZWRcbiAgICBjb25zdCBjaGVja1NoaXAgPSBpc1N1bmsoc2hpcCk7XG5cbiAgICBpZiAoY2hlY2tTaGlwID09PSB0cnVlKSB7XG4gICAgICBzaGlwLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IHBsYWNlU2hpcHMsIGhpdCB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyU2hpcHMsIFNoaXAgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCB7IGdhbWVNZW51IH0gZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWUtY29udHJvbGxlclwiO1xuaW1wb3J0IHtcbiAgZ2V0Q29tcHV0ZXJTaGlwcyxcbiAgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMsXG4gIHZpc2l0ZWQsXG59IGZyb20gXCIuL2NvbXB1dGVyQUlcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0YXJ0bWVudS5jc3NcIjtcblxuY29uc3QgZ2V0U3RhcnRTY3JlZW5Cb2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvYXJkXG4gIGdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2FtZUJvYXJkLmdldEJvYXJkKCk7XG5cbiAgcmV0dXJuIGJvYXJkO1xufTtcblxuY29uc3Qgc3RhcnRNZW51ID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcbiAgY29uc3QgbGVmdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCByaWdodFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHBhcmFUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBjYXJyaWVyQmVydGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVzaGlwQmVydGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkZXN0cm95ZXJCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHN1Ym1hcmluZUJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgcGF0cm9sQm9hdEJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY2FycmllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBwYXRyb2xCb2F0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBsZWZ0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwibGVmdC1zZWN0aW9uXCIpO1xuICByaWdodFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcInJpZ2h0LXNlY3Rpb25cIik7XG4gIHRhYmxlLmNsYXNzTGlzdC5hZGQoXCJzdGFydC1tZW51LXRhYmxlXCIpO1xuICBwYXJhLmNsYXNzTGlzdC5hZGQoXCJpbnN0cnVjdGlvbnNcIik7XG4gIHBhcmEudGV4dENvbnRlbnQgPSBcIkRyYWcgYW5kIGRyb3Agc2hpcHNcIjtcbiAgcGFyYVR3by5jbGFzc0xpc3QuYWRkKFwiaW5zdHJ1Y3Rpb25zXCIpO1xuICBwYXJhVHdvLnRleHRDb250ZW50ID0gXCJEb3VibGUgY2xpY2sgdG8gcm90YXRlXCI7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3J0XCIpO1xuICBjYXJyaWVyQmVydGguY2xhc3NMaXN0LmFkZChcImNhcnJpZXItYmVydGhcIik7XG4gIGJhdHRsZXNoaXBCZXJ0aC5jbGFzc0xpc3QuYWRkKFwiYmF0dGxlc2hpcC1iZXJ0aFwiKTtcbiAgZGVzdHJveWVyQmVydGguY2xhc3NMaXN0LmFkZChcImRlc3Ryb3llci1iZXJ0aFwiKTtcbiAgc3VibWFyaW5lQmVydGguY2xhc3NMaXN0LmFkZChcInN1Ym1hcmluZS1iZXJ0aFwiKTtcbiAgcGF0cm9sQm9hdEJlcnRoLmNsYXNzTGlzdC5hZGQoXCJwYXRyb2wtYm9hdC1iZXJ0aFwiKTtcbiAgY2Fycmllci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgY2Fycmllci5pZCA9IFwiY2FycmllclwiO1xuICBjYXJyaWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgY2Fycmllci5kYXRhc2V0LndpZHRoID0gNTtcbiAgY2Fycmllci5kcmFnZ2FibGUgPSB0cnVlO1xuICBiYXR0bGVzaGlwLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBiYXR0bGVzaGlwLmlkID0gXCJiYXR0bGVzaGlwXCI7XG4gIGJhdHRsZXNoaXAuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBiYXR0bGVzaGlwLmRhdGFzZXQud2lkdGggPSA0O1xuICBiYXR0bGVzaGlwLmRyYWdnYWJsZSA9IHRydWU7XG4gIGRlc3Ryb3llci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgZGVzdHJveWVyLmlkID0gXCJkZXN0cm95ZXJcIjtcbiAgZGVzdHJveWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgZGVzdHJveWVyLmRhdGFzZXQud2lkdGggPSAzO1xuICBkZXN0cm95ZXIuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgc3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBzdWJtYXJpbmUuaWQgPSBcInN1Ym1hcmluZVwiO1xuICBzdWJtYXJpbmUuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBzdWJtYXJpbmUuZGF0YXNldC53aWR0aCA9IDM7XG4gIHN1Ym1hcmluZS5kcmFnZ2FibGUgPSB0cnVlO1xuICBwYXRyb2xCb2F0LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBwYXRyb2xCb2F0LmlkID0gXCJwYXRyb2wtYm9hdFwiO1xuICBwYXRyb2xCb2F0LmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgcGF0cm9sQm9hdC5kYXRhc2V0LndpZHRoID0gMjtcbiAgcGF0cm9sQm9hdC5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2V0U3RhcnRTY3JlZW5Cb2FyZCgpO1xuICAvLyBDcmVhdGUgYSBncmlkIG9mIHRhYmxlIHJvd3MgYW5kIHRhYmxlIGNlbGxzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0YWJsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAgIHRhYmxlUm93LmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1yb3dcIik7XG4gICAgdGFibGVSb3cuaWQgPSBgZHJvcHpvbmUtJHtpfWA7XG5cbiAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1jZWxsXCIpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRhYmxlUm93KTtcbiAgfVxuXG4gIGNhcnJpZXJCZXJ0aC5hcHBlbmRDaGlsZChjYXJyaWVyKTtcbiAgYmF0dGxlc2hpcEJlcnRoLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBkZXN0cm95ZXJCZXJ0aC5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzdWJtYXJpbmVCZXJ0aC5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBwYXRyb2xCb2F0QmVydGguYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcnJpZXJCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXBCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc3Ryb3llckJlcnRoKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lQmVydGgpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0QmVydGgpO1xuICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChwYXJhKTtcbiAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHBhcmFUd28pO1xuICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdFNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRTZWN0aW9uKTtcbn07XG5cbmxldCB1c2VyU2hpcHNDb29yZGluYXRlcyA9IFtdO1xuXG5jb25zdCBhbGxTaGlwc1BsYWNlZCA9ICgpID0+IHtcbiAgY29uc3QgcG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9ydFwiKTtcbiAgY29uc3Qgbm9kZUxpc3QgPSBwb3J0LmNoaWxkTm9kZXM7XG5cbiAgbGV0IHNoaXBzID0gMDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IG5vZGVMaXN0W2ldO1xuXG4gICAgaWYgKGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICBzaGlwcyArPSAxO1xuICAgIH1cbiAgfVxuXG4gIC8vIENyZWF0ZSBcInN0YXJ0LWdhbWVcIiBidXR0b24gd2hlbiBhbGwgc2hpcHMgYXJlIHBsYWNlZCBvbiB0aGUgYm9hcmRcbiAgaWYgKHNoaXBzID09PSAwKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3RhcnQtYnRuXCIpO1xuICAgIGJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcIlN0YXJ0IEdhbWVcIjtcblxuICAgIHBvcnQuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgfVxufTtcblxuY29uc3QgaXNEcm9wVmFsaWQgPSAoaW5kZXhYLCBpbmRleFksIHNoaXBIZWlnaHQsIHNoaXBXaWR0aCwgbm9kZUxpc3QpID0+IHtcbiAgLy8gSWYgc2hpcCBkcm9wIGV4Y2VlZHMgdGhlIGJvdW5kIG9mIHRoZSBib2FyZCwgcmV0dXJuIGZhbHNlXG4gIGlmIChpbmRleFkgKyBzaGlwV2lkdGggPiAxMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCB0byB0aGUgaW1tZWRpYXRlIHRvcCBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tUb3AgPSAoKSA9PiB7XG4gICAgbGV0IGRyb3BTcXVhcmUgPSBub2RlTGlzdFtpbmRleFldO1xuICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgbGV0IHBhcmVudFNpYmxpbmcgPSBwYXJlbnQucHJldmlvdXNTaWJsaW5nO1xuICAgIGxldCBzdGFydEluZGV4ID0gaW5kZXhZIC0gMTtcblxuICAgIGlmIChwYXJlbnRTaWJsaW5nID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBXaWR0aCArIDI7IGkrKykge1xuICAgICAgLy8gQ2hlY2tzIGNoaWxkIG5vZGVzIG9mIHRoZSBwYXJlbnQgc2libGluZ1xuICAgICAgbGV0IHNxdWFyZUluZGV4ID0gc3RhcnRJbmRleCArIGk7XG4gICAgICBsZXQgbm9kZUxpc3QgPSBwYXJlbnRTaWJsaW5nLmNoaWxkTm9kZXM7XG4gICAgICBsZXQgc3F1YXJlID0gbm9kZUxpc3Rbc3F1YXJlSW5kZXhdO1xuXG4gICAgICBpZiAoc3F1YXJlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBzcXVhcmVDbGFzcyA9IHNxdWFyZS5jbGFzc05hbWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJjYXJyaWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiYmF0dGxlc2hpcFwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImRlc3Ryb3llclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcInN1Ym1hcmluZVwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcInBhdHJvbC1ib2F0XCIpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKiBUaGlzIGNoZWNrcyBpZiB0aGVyZSBpcyBhIHNoaXAgdG8gdGhlIGltbWVkaWF0ZSByaWdodCBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tSaWdodCA9ICgpID0+IHtcbiAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W2luZGV4WV07XG4gICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICBsZXQgZ3JhbmRQYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICBsZXQgcGFyZW50TGlzdCA9IGdyYW5kUGFyZW50LmNoaWxkTm9kZXM7XG4gICAgbGV0IHNxdWFyZUluZGV4ID0gaW5kZXhZICsgc2hpcFdpZHRoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwSGVpZ2h0OyBpKyspIHtcbiAgICAgIGxldCBpbmRleCA9IGluZGV4WCArIGk7XG4gICAgICBsZXQgY2hpbGRyZW4gPSBwYXJlbnRMaXN0W2luZGV4XTtcbiAgICAgIGxldCBsaXN0ID0gY2hpbGRyZW4uY2hpbGROb2RlcztcbiAgICAgIGxldCBzcXVhcmUgPSBsaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyogVGhpcyBjaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIHRvIHRoZSBpbW1lZGlhdGUgYm90dG9tIG9mIHRoZSBcbiAgXCJkcm9wIHNoaXBcIiwgYW5kIHN0b3BzIGV4ZWN1dGlvbiBpZiBhIHBsYWNlZCBzaGlwIGlzIGRldGVjdGVkLiAqL1xuICBjb25zdCBjaGVja0JvdHRvbSA9ICgpID0+IHtcbiAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W2luZGV4WV07XG4gICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICBsZXQgcGFyZW50U2libGluZyA9IHBhcmVudC5uZXh0U2libGluZztcbiAgICBsZXQgc3RhcnRJbmRleCA9IGluZGV4WSAtIDE7XG5cbiAgICBpZiAocGFyZW50U2libGluZyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwV2lkdGggKyAyOyBpKyspIHtcbiAgICAgIC8vIENoZWNrcyBjaGlsZCBub2RlcyBvZiB0aGUgcGFyZW50IHNpYmxpbmdcbiAgICAgIGxldCBzcXVhcmVJbmRleCA9IHN0YXJ0SW5kZXggKyBpO1xuICAgICAgbGV0IG5vZGVMaXN0ID0gcGFyZW50U2libGluZy5jaGlsZE5vZGVzO1xuICAgICAgbGV0IHNxdWFyZSA9IG5vZGVMaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyogVGhpcyBjaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIHRvIHRoZSBpbW1lZGlhdGUgbGVmdCBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tMZWZ0ID0gKCkgPT4ge1xuICAgIGxldCBkcm9wU3F1YXJlID0gbm9kZUxpc3RbaW5kZXhZXTtcbiAgICBsZXQgcGFyZW50ID0gZHJvcFNxdWFyZS5wYXJlbnROb2RlO1xuICAgIGxldCBncmFuZFBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgIGxldCBwYXJlbnRMaXN0ID0gZ3JhbmRQYXJlbnQuY2hpbGROb2RlcztcbiAgICBsZXQgc3F1YXJlSW5kZXggPSBpbmRleFkgLSAxO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwSGVpZ2h0OyBpKyspIHtcbiAgICAgIGxldCBpbmRleCA9IGluZGV4WCArIGk7XG4gICAgICBsZXQgY2hpbGRyZW4gPSBwYXJlbnRMaXN0W2luZGV4XTtcbiAgICAgIGxldCBsaXN0ID0gY2hpbGRyZW4uY2hpbGROb2RlcztcbiAgICAgIGxldCBzcXVhcmUgPSBsaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgbGV0IHRvcFZhbGlkID0gY2hlY2tUb3AoKTtcbiAgbGV0IHJpZ2h0VmFsaWQgPSBjaGVja1JpZ2h0KCk7XG4gIGxldCBib3R0b21WYWxpZCA9IGNoZWNrQm90dG9tKCk7XG4gIGxldCBsZWZ0VmFsaWQgPSBjaGVja0xlZnQoKTtcblxuICBpZiAoXG4gICAgdG9wVmFsaWQgPT09IHRydWUgJiZcbiAgICByaWdodFZhbGlkID09PSB0cnVlICYmXG4gICAgYm90dG9tVmFsaWQgPT09IHRydWUgJiZcbiAgICBsZWZ0VmFsaWQgPT09IHRydWVcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoXG4gICAgdG9wVmFsaWQgPT09IGZhbHNlIHx8XG4gICAgcmlnaHRWYWxpZCA9PT0gZmFsc2UgfHxcbiAgICBib3R0b21WYWxpZCA9PT0gZmFsc2UgfHxcbiAgICBsZWZ0VmFsaWQgPT09IGZhbHNlXG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3Qgc3RhcnRNZW51RXZlbnRIYW5kbGVyID0gKCkgPT4ge1xuICBjb25zdCBtYWluU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoZSkgPT4ge1xuICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XG5cbiAgICBpZiAoXG4gICAgICBlbGVtZW50LmlkID09PSBcImNhcnJpZXJcIiB8fFxuICAgICAgZWxlbWVudC5pZCA9PT0gXCJiYXR0bGVzaGlwXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwiZGVzdHJveWVyXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwic3VibWFyaW5lXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwicGF0cm9sLWJvYXRcIlxuICAgICkge1xuICAgICAgbGV0IGhlaWdodCA9IGVsZW1lbnQuZGF0YXNldC5oZWlnaHQ7XG4gICAgICBsZXQgd2lkdGggPSBlbGVtZW50LmRhdGFzZXQud2lkdGg7XG5cbiAgICAgIGVsZW1lbnQuZGF0YXNldC5oZWlnaHQgPSB3aWR0aDtcbiAgICAgIGVsZW1lbnQuZGF0YXNldC53aWR0aCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZXBsYWNlKFwiaG9yaXpvbnRhbFwiLCBcInZlcnRpY2FsXCIpO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09IFwidmVydGljYWxcIikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVwbGFjZShcInZlcnRpY2FsXCIsIFwiaG9yaXpvbnRhbFwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcbiAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0LmlkO1xuXG4gICAgaWYgKFxuICAgICAgZWxlbWVudCA9PT0gXCJjYXJyaWVyXCIgfHxcbiAgICAgIGVsZW1lbnQgPT09IFwiYmF0dGxlc2hpcFwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcImRlc3Ryb3llclwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcInN1Ym1hcmluZVwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcInBhdHJvbC1ib2F0XCJcbiAgICApIHtcbiAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIGVsZW1lbnQpO1xuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9IGVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIChlKSA9PiB7XG4gICAgZS50YXJnZXQudGV4dENvbnRlbnQgPSBcIlwiO1xuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInRhYmxlLWNlbGxcIikge1xuICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJhcXVhXCI7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJ0YWJsZS1jZWxsXCIpIHtcbiAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidGFibGUtY2VsbFwiKSB7XG4gICAgICBjb25zdCBkcm9wem9uZSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50ID0gZHJvcHpvbmUucGFyZW50Tm9kZTtcbiAgICAgIGNvbnN0IG5vZGVMaXN0ID0gcGFyZW50LmNoaWxkTm9kZXM7XG4gICAgICBjb25zdCBkYXRhID0gZHJvcHpvbmUuZGF0YXNldC5wb3M7XG4gICAgICBjb25zdCBhcnJheSA9IGRhdGEuc3BsaXQoXCIsXCIpO1xuICAgICAgY29uc3QgeCA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChhcnJheVsxXSk7XG4gICAgICBjb25zdCBkcmFnZ2FibGVJZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpO1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRyYWdnYWJsZUlkKTtcbiAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZHJhZ2dhYmxlRWxlbWVudC5jbGFzc05hbWU7XG4gICAgICBjb25zdCBzaGlwSGVpZ2h0ID0gcGFyc2VJbnQoZHJhZ2dhYmxlRWxlbWVudC5kYXRhc2V0LmhlaWdodCk7XG4gICAgICBjb25zdCBzaGlwV2lkdGggPSBwYXJzZUludChkcmFnZ2FibGVFbGVtZW50LmRhdGFzZXQud2lkdGgpO1xuXG4gICAgICAvLyBUaGlzIGNoZWNrcyBpZiB0aGUgZHJvcCBpcyB2YWxpZFxuICAgICAgbGV0IHZhbGlkID0gaXNEcm9wVmFsaWQoeCwgeSwgc2hpcEhlaWdodCwgc2hpcFdpZHRoLCBub2RlTGlzdCk7XG4gICAgICBsZXQgc2hpcENvb3JkaW5hdGVzID0gW107XG5cbiAgICAgIC8vIElmIGRyb3AgaXMgbm90IHZhbGlkLCBzdG9wIGV4ZWN1dGlvblxuICAgICAgaWYgKHZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICBub2RlTGlzdFt5XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAvLyBUaGlzIGFkZHMgYSB2aXN1YWwgaW5kaWNhdGlvbiB3aGVyZSB0aGUgc2hpcCBpcyBkcm9wcGVkXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwV2lkdGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0geSArIGk7XG4gICAgICAgICAgICBub2RlTGlzdFtpbmRleF0uY2xhc3NMaXN0LmFkZChkcmFnZ2FibGVJZCk7XG4gICAgICAgICAgICBub2RlTGlzdFtpbmRleF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJhcXVhXCI7XG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChbeCwgaW5kZXhdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVGhpcyBhZGRzIGEgdmlzdWFsIGluZGljYXRpb24gd2hlcmUgdGhlIHNoaXAgaXMgZHJvcHBlZFxuICAgICAgICAgIGxldCBkcm9wU3F1YXJlID0gbm9kZUxpc3RbeV07XG4gICAgICAgICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICAgICAgICBsZXQgZ3JhbmRQYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICBsZXQgcGFyZW50TGlzdCA9IGdyYW5kUGFyZW50LmNoaWxkTm9kZXM7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBIZWlnaHQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0geCArIGk7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBwYXJlbnRMaXN0W2luZGV4XTtcbiAgICAgICAgICAgIGxldCBsaXN0ID0gY2hpbGRyZW4uY2hpbGROb2RlcztcblxuICAgICAgICAgICAgbGlzdFt5XS5jbGFzc0xpc3QuYWRkKGRyYWdnYWJsZUlkKTtcbiAgICAgICAgICAgIGxpc3RbeV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJhcXVhXCI7XG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChbaW5kZXgsIHldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVQYXJlbnQgPSBkcmFnZ2FibGVFbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIGRyYWdnYWJsZVBhcmVudC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuY2xlYXJEYXRhKCk7XG4gICAgICAgIHVzZXJTaGlwc0Nvb3JkaW5hdGVzLnB1c2goc2hpcENvb3JkaW5hdGVzKTtcbiAgICAgICAgYWxsU2hpcHNQbGFjZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwic3RhcnQtYnRuXCIpIHtcbiAgICAgIG1haW5TZWN0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgZ2V0Q29tcHV0ZXJTaGlwcygpO1xuICAgICAgZ2FtZU1lbnUoKTtcbiAgICAgIEdhbWUoKTtcblxuICAgICAgdXNlclNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoID0gMDtcbiAgICAgIGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzLmxlbmd0aCA9IDA7XG4gICAgICB2aXNpdGVkLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCB7IHN0YXJ0TWVudSwgdXNlclNoaXBzQ29vcmRpbmF0ZXMsIHN0YXJ0TWVudUV2ZW50SGFuZGxlciB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC51c2VyLWNvbnRhaW5lcixcbi5jb21wdXRlci1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyMHB4O1xufVxuXG4udXNlci1iYXR0bGVmaWVsZCxcbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XG4gIGhlaWdodDogMzUwcHg7XG4gIHdpZHRoOiAzNTBweDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4uc3F1YXJlIHtcbiAgYm9yZGVyOiBzb2xpZCAxcHggZ3JleTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5zaGlwLXNxdWFyZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XG59XG5cbi5zaGlwLW1pc3NlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG5cbi5zaGlwLWhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLnNxdWFyZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2dhbWVtZW51LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7RUFFRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBOztFQUVFLGFBQWE7RUFDYixZQUFZO0VBQ1osYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnVzZXItY29udGFpbmVyLFxcbi5jb21wdXRlci1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi51c2VyLWJhdHRsZWZpZWxkLFxcbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XFxuICBoZWlnaHQ6IDM1MHB4O1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5zcXVhcmUge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggZ3JleTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zaGlwLXNxdWFyZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhbWFyaW5lO1xcbn1cXG5cXG4uc2hpcC1taXNzZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLnNoaXAtaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLnNxdWFyZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5ib2R5IHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XG59XG5cbi5jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxZnIgMTUwcHg7XG59XG5cbi5tYWluLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGFBQWE7RUFDYixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcXG59XFxuXFxuLmNvbnRlbnQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxZnIgMTUwcHg7XFxufVxcblxcbi5tYWluLXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAubGVmdC1zZWN0aW9uIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ucmlnaHQtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogNTBweCA1MHB4IDFmcjtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc3RhcnQtbWVudS10YWJsZSB7XG4gIGhlaWdodDogNDAwcHg7XG4gIHdpZHRoOiA0MDBweDtcbiAgZGlzcGxheTogZ3JpZDtcbn1cblxudGJvZHkge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG59XG5cbi50YWJsZS1yb3cge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4udGFibGUtY2VsbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4ucG9ydCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCBhdXRvO1xuICBncmlkLWF1dG8tcm93czogbWlubWF4KG1pbi1jb250ZW50LCBtYXgtY29udGVudCk7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uY2Fycmllci1iZXJ0aCxcbi5iYXR0bGVzaGlwLWJlcnRoLFxuLmRlc3Ryb3llci1iZXJ0aCxcbi5zdWJtYXJpbmUtYmVydGgsXG4ucGF0cm9sLWJvYXQtYmVydGgge1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG4jY2Fycmllci5ob3Jpem9udGFsIHtcbiAgaGVpZ2h0OiAzNXB4O1xuICB3aWR0aDogMjAwcHg7XG59XG4jYmF0dGxlc2hpcC5ob3Jpem9udGFsIHtcbiAgaGVpZ2h0OiAzNXB4O1xuICB3aWR0aDogMTYwcHg7XG59XG5cbiNkZXN0cm95ZXIuaG9yaXpvbnRhbCxcbiNzdWJtYXJpbmUuaG9yaXpvbnRhbCB7XG4gIGhlaWdodDogMzVweDtcbiAgd2lkdGg6IDEyMHB4O1xufVxuXG4jcGF0cm9sLWJvYXQuaG9yaXpvbnRhbCB7XG4gIGhlaWdodDogMzVweDtcbiAgd2lkdGg6IDgwcHg7XG59XG5cbiNjYXJyaWVyLnZlcnRpY2FsIHtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgd2lkdGg6IDM1cHg7XG59XG5cbiNiYXR0bGVzaGlwLnZlcnRpY2FsIHtcbiAgaGVpZ2h0OiAxNjBweDtcbiAgd2lkdGg6IDM1cHg7XG59XG5cbiNkZXN0cm95ZXIudmVydGljYWwsXG4jc3VibWFyaW5lLnZlcnRpY2FsIHtcbiAgaGVpZ2h0OiAxMjBweDtcbiAgd2lkdGg6IDM1cHg7XG59XG5cbiNwYXRyb2wtYm9hdC52ZXJ0aWNhbCB7XG4gIGhlaWdodDogODBweDtcbiAgd2lkdGg6IDM1cHg7XG59XG5cbiNjYXJyaWVyLFxuI2JhdHRsZXNoaXAsXG4jZGVzdHJveWVyLFxuI3N1Ym1hcmluZSxcbiNwYXRyb2wtYm9hdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgc2t5Ymx1ZTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5zdGFydC1idG4ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGhlaWdodDogMTAwcHg7XG4gIHdpZHRoOiAyMDBweDtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3N0YXJ0bWVudS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixpQ0FBaUM7RUFDakMscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0Qix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLFdBQVc7RUFDWCxhQUFhO0VBQ2IsdUNBQXVDO0VBQ3ZDLGdEQUFnRDtFQUNoRCx1QkFBdUI7QUFDekI7O0FBRUE7Ozs7O0VBS0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7QUFDZDtBQUNBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTs7RUFFRSxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBOztFQUVFLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztBQUNiOztBQUVBOzs7OztFQUtFLGFBQWE7RUFDYiwyQkFBMkI7RUFDM0IseUJBQXlCO0VBQ3pCLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFlBQVk7RUFDWixRQUFRO0VBQ1IsU0FBUztFQUNULGdDQUFnQztFQUNoQyxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubGVmdC1zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucmlnaHQtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA1MHB4IDUwcHggMWZyO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0LW1lbnUtdGFibGUge1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbnRib2R5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4udGFibGUtcm93IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnRhYmxlLWNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4ucG9ydCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbi1jb250ZW50IGF1dG87XFxuICBncmlkLWF1dG8tcm93czogbWlubWF4KG1pbi1jb250ZW50LCBtYXgtY29udGVudCk7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmNhcnJpZXItYmVydGgsXFxuLmJhdHRsZXNoaXAtYmVydGgsXFxuLmRlc3Ryb3llci1iZXJ0aCxcXG4uc3VibWFyaW5lLWJlcnRoLFxcbi5wYXRyb2wtYm9hdC1iZXJ0aCB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbn1cXG5cXG4jY2Fycmllci5ob3Jpem9udGFsIHtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAyMDBweDtcXG59XFxuI2JhdHRsZXNoaXAuaG9yaXpvbnRhbCB7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICB3aWR0aDogMTYwcHg7XFxufVxcblxcbiNkZXN0cm95ZXIuaG9yaXpvbnRhbCxcXG4jc3VibWFyaW5lLmhvcml6b250YWwge1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgd2lkdGg6IDEyMHB4O1xcbn1cXG5cXG4jcGF0cm9sLWJvYXQuaG9yaXpvbnRhbCB7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICB3aWR0aDogODBweDtcXG59XFxuXFxuI2NhcnJpZXIudmVydGljYWwge1xcbiAgaGVpZ2h0OiAyMDBweDtcXG4gIHdpZHRoOiAzNXB4O1xcbn1cXG5cXG4jYmF0dGxlc2hpcC52ZXJ0aWNhbCB7XFxuICBoZWlnaHQ6IDE2MHB4O1xcbiAgd2lkdGg6IDM1cHg7XFxufVxcblxcbiNkZXN0cm95ZXIudmVydGljYWwsXFxuI3N1Ym1hcmluZS52ZXJ0aWNhbCB7XFxuICBoZWlnaHQ6IDEyMHB4O1xcbiAgd2lkdGg6IDM1cHg7XFxufVxcblxcbiNwYXRyb2wtYm9hdC52ZXJ0aWNhbCB7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxuI2NhcnJpZXIsXFxuI2JhdHRsZXNoaXAsXFxuI2Rlc3Ryb3llcixcXG4jc3VibWFyaW5lLFxcbiNwYXRyb2wtYm9hdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgc2t5Ymx1ZTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0LWJ0biB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dhbWVtZW51LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2FtZW1lbnUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dsb2JhbC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dsb2JhbC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3RhcnRtZW51LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3RhcnRtZW51LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgcGFnZUxheW91dCB9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHsgc3RhcnRNZW51LCBzdGFydE1lbnVFdmVudEhhbmRsZXIgfSBmcm9tIFwiLi9zdGFydC1tZW51XCI7XG5cbmNvbnN0IGNvbXBvbmVudCA9ICgpID0+IHtcbiAgcGFnZUxheW91dCgpO1xuXG4gIHN0YXJ0TWVudSgpO1xuXG4gIHN0YXJ0TWVudUV2ZW50SGFuZGxlcigpO1xufTtcbmNvbXBvbmVudCgpO1xuIl0sIm5hbWVzIjpbInN0YXJ0TWVudSIsInBsYXlSb3VuZCIsInVzZXJBdHRhY2tzIiwiY29tcHV0ZXJBdHRhY2tzIiwiZ2FtZU1lbnUiLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsImNvbnRhaW5lck9uZSIsImNyZWF0ZUVsZW1lbnQiLCJjb250YWluZXJUd28iLCJiYXR0bGVmaWVsZE9uZSIsImJhdHRsZWZpZWxkVHdvIiwiYmF0dGxlZmllbGRPbmVQYXJhIiwiYmF0dGxlZmllbGRUd29QYXJhIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJCb2FyZHMiLCJ1c2VyQmF0dGxlZmllbGQiLCJjb21wdXRlckJhdHRsZWZpZWxkIiwicmVuZGVyVXNlckJvYXJkIiwiYm9hcmQiLCJpIiwibGVuZ3RoIiwicm93IiwiaiIsImJ0biIsImRhdGEiLCJ0eXBlIiwiZGF0YXNldCIsInBvcyIsInJlbmRlckNvbXB1dGVyQm9hcmQiLCJnYW1lV2lubmVyIiwid2lubmVyIiwid2lubmVyQW5ub3VuY2VyIiwicmVzdGFydEJ1dHRvbiIsImdhbWVNZW51RXZlbnRIYW5kbGVyIiwibWFpblNlY3Rpb24iLCJ3aW5uZXJDb250YWluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImhhc0NoaWxkTm9kZXMiLCJ0YXJnZXQiLCJjbGFzc05hbWUiLCJzcXVhcmUiLCJhcnJheSIsInNwbGl0IiwicGFyc2VJbnQiLCJjb21wdXRlclNoaXBDb29yZGluYXRlcyIsInZpc2l0ZWQiLCJpc0FycmF5SW5BcnJheSIsInNvdXJjZSIsInNlYXJjaCIsInNlYXJjaEVsZSIsInNvdXJjZUVsZSIsImdldEFkakNvb3JkaW5hdGVzIiwiY29vcmRpbmF0ZXMiLCJhZGpQb3NpdGlvbnMiLCJvcmllbnRhdGlvbiIsIm9uZSIsInR3byIsImVsZW1lbnQiLCJhZGpMZWZ0IiwiYWRqUmlnaHQiLCJwdXNoIiwiYWRqVG9wIiwibGVmdCIsInJpZ2h0IiwiYWRqQm90dG9tIiwidG9wIiwiYm90dG9tIiwiZ2V0UmFuZG9tUG9zaXRpb24iLCJ2YWxpZCIsIngiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ5IiwiZ2V0TGVnYWxDb21ib3MiLCJzaGlwTGVuZ3RoIiwibGVnYWxDb21ib3MiLCJzZXQiLCJsZW5ndGhEaWZmIiwiYXJyYXlMZW5ndGgiLCJ2YWx1ZXMiLCJtb3ZlIiwiZ2V0Q29tcHV0ZXJTaGlwcyIsInJlcGVhdCIsIml0ZW1WaXNpdGVkIiwiY29vcmRpbmF0ZSIsImFkakNvb3JkaW5hdGVzIiwiUGxheWVyU2hpcHMiLCJTaGlwIiwiR2FtZUJvYXJkIiwiY3JlYXRlQm9hcmQiLCJnZXRCb2FyZCIsInBsYXllclNoaXBzIiwic2hpcHMiLCJnZXRTaGlwcyIsInBvcHVsYXRlQm9hcmQiLCJhZGRTaGlwQ29vcmRpbmF0ZXMiLCJwbGFjZVNoaXBzIiwiZmluZEF0dGFja2VkU2hpcCIsImtleSIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tlZFNoaXAiLCJoaXQiLCJhbGxTaGlwc0Rlc3Ryb3llZCIsImNvdW50Iiwic2hpcFN0YXRlIiwiZGVzdHJveWVkIiwiUGxheWVyIiwidXNlclNoaXBzQ29vcmRpbmF0ZXMiLCJ1c2VyR2FtZUJvYXJkIiwiY29tcHV0ZXJHYW1lQm9hcmQiLCJ1c2VyIiwiY29tcHV0ZXIiLCJHYW1lIiwidXNlckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsImF0dGFjayIsInBhZ2VMYXlvdXQiLCJjb250ZW50IiwiaGVhZGVyIiwibWFpbiIsImZvb3RlciIsInRpdGxlIiwibG9nb0NvbnRhaW5lciIsImxvZ28iLCJJbWFnZSIsImFsdCIsIm5hbWUiLCJnZXROYW1lIiwiaXNBdHRhY2tMZWdhbCIsImVuZW15Iiwic2xpY2UiLCJzaGlmdCIsImVuZW15TmFtZSIsImNoZWNrTGVnYWwiLCJjYXJyaWVyIiwiaGl0cyIsImJhdHRsZXNoaXAiLCJkZXN0cm95ZXIiLCJzdWJtYXJpbmUiLCJwYXRyb2xCb2F0IiwiY29weSIsInNoaXBBcnJheSIsImFyciIsImlzU3VuayIsInNoaXAiLCJoaXRzQ291bnQiLCJjaGVja1NoaXAiLCJnZXRTdGFydFNjcmVlbkJvYXJkIiwiZ2FtZUJvYXJkIiwibGVmdFNlY3Rpb24iLCJyaWdodFNlY3Rpb24iLCJ0YWJsZSIsInRhYmxlQm9keSIsInBhcmEiLCJwYXJhVHdvIiwic2hpcHNDb250YWluZXIiLCJjYXJyaWVyQmVydGgiLCJiYXR0bGVzaGlwQmVydGgiLCJkZXN0cm95ZXJCZXJ0aCIsInN1Ym1hcmluZUJlcnRoIiwicGF0cm9sQm9hdEJlcnRoIiwiaWQiLCJoZWlnaHQiLCJ3aWR0aCIsImRyYWdnYWJsZSIsInRhYmxlUm93IiwiY2VsbCIsImFsbFNoaXBzUGxhY2VkIiwicG9ydCIsIm5vZGVMaXN0IiwiY2hpbGROb2RlcyIsImlzRHJvcFZhbGlkIiwiaW5kZXhYIiwiaW5kZXhZIiwic2hpcEhlaWdodCIsInNoaXBXaWR0aCIsImNoZWNrVG9wIiwiZHJvcFNxdWFyZSIsInBhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnRTaWJsaW5nIiwicHJldmlvdXNTaWJsaW5nIiwic3RhcnRJbmRleCIsInNxdWFyZUluZGV4IiwidW5kZWZpbmVkIiwic3F1YXJlQ2xhc3MiLCJpbmNsdWRlcyIsImNoZWNrUmlnaHQiLCJncmFuZFBhcmVudCIsInBhcmVudExpc3QiLCJpbmRleCIsImNoaWxkcmVuIiwibGlzdCIsImNoZWNrQm90dG9tIiwibmV4dFNpYmxpbmciLCJjaGVja0xlZnQiLCJ0b3BWYWxpZCIsInJpZ2h0VmFsaWQiLCJib3R0b21WYWxpZCIsImxlZnRWYWxpZCIsInN0YXJ0TWVudUV2ZW50SGFuZGxlciIsInJlcGxhY2UiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwcmV2ZW50RGVmYXVsdCIsImRyb3B6b25lIiwiZHJhZ2dhYmxlSWQiLCJnZXREYXRhIiwiZHJhZ2dhYmxlRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwic2hpcENvb3JkaW5hdGVzIiwiZHJhZ2dhYmxlUGFyZW50IiwiY2xlYXJEYXRhIiwiY29tcG9uZW50Il0sInNvdXJjZVJvb3QiOiIifQ==