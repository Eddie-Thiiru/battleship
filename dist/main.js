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
/* harmony import */ var _images_submarine_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/submarine.png */ "./src/images/submarine.png");


const pageLayout = () => {
  const content = document.querySelector(".content");
  const header = document.createElement("div");
  const main = document.createElement("div");
  const footer = document.createElement("div");
  const title = document.createElement("h1");
  const winnerContainer = document.createElement("div");
  const titleContainer = document.createElement("div");
  const logo = new Image();
  header.classList.add("header");
  main.classList.add("main-section");
  footer.classList.add("footer");
  title.classList.add("title");
  title.textContent = "Battleship";
  winnerContainer.classList.add("winner-container");
  titleContainer.classList.add("title-container");
  logo.src = _images_submarine_png__WEBPACK_IMPORTED_MODULE_1__;
  logo.alt = "Submarine logo";
  titleContainer.appendChild(title);
  titleContainer.appendChild(logo);
  header.appendChild(titleContainer);
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
  padding: 10px;
  display: grid;
  grid-template-rows: 100px 1fr 150px;
}

.main-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.title-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
}

h1 {
  grid-column: 2 / 3;
}

img {
  grid-column: 3 / 4;
  width: 60px;
  justify-self: end;
}
`, "",{"version":3,"sources":["webpack://./src/styles/global.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,wBAAwB;AAC1B;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,qCAAqC;EACrC,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,iBAAiB;AACnB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  font-size: 1rem;\n  background-color: bisque;\n}\n\n.content {\n  height: 100%;\n  width: 100%;\n  padding: 10px;\n  display: grid;\n  grid-template-rows: 100px 1fr 150px;\n}\n\n.main-section {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n\n.title-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  justify-items: center;\n  align-items: center;\n}\n\nh1 {\n  grid-column: 2 / 3;\n}\n\nimg {\n  grid-column: 3 / 4;\n  width: 60px;\n  justify-self: end;\n}\n"],"sourceRoot":""}]);
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

/***/ }),

/***/ "./src/images/submarine.png":
/*!**********************************!*\
  !*** ./src/images/submarine.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "be6e8637473d89c896a2.png";

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7Ozs7Ozs7Ozs7Ozs7QUNBc0M7QUFDMEI7QUFFaEUsTUFBTXVNLFNBQVMsR0FBR0EsQ0FBQSxLQUFNO0VBQ3RCcEcsbURBQVUsQ0FBQyxDQUFDO0VBRVo1SCxzREFBUyxDQUFDLENBQUM7RUFFWGlOLGtFQUFxQixDQUFDLENBQUM7QUFDekIsQ0FBQztBQUNEZSxTQUFTLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9iYXR0bGVzaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXJBSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUtYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0YXJ0LW1lbnUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2FtZW1lbnUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2dsb2JhbC5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3RhcnRtZW51LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2FtZW1lbnUuY3NzPzI1OTMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzcz9mMGQ4Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0YXJ0bWVudS5jc3M/MTJiMCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RhcnRNZW51IH0gZnJvbSBcIi4vc3RhcnQtbWVudVwiO1xuaW1wb3J0IHsgcGxheVJvdW5kIH0gZnJvbSBcIi4vZ2FtZS1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyB1c2VyQXR0YWNrcywgY29tcHV0ZXJBdHRhY2tzIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9nYW1lbWVudS5jc3NcIjtcblxuY29uc3QgZ2FtZU1lbnUgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xuXG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgY29uc3QgY29udGFpbmVyT25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY29udGFpbmVyVHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRPbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZFR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZWZpZWxkT25lUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZFR3b1BhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICBjb250YWluZXJPbmUuY2xhc3NMaXN0LmFkZChcInVzZXItY29udGFpbmVyXCIpO1xuICBjb250YWluZXJUd28uY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyLWNvbnRhaW5lclwiKTtcbiAgYmF0dGxlZmllbGRPbmUuY2xhc3NMaXN0LmFkZChcInVzZXItYmF0dGxlZmllbGRcIik7XG4gIGJhdHRsZWZpZWxkVHdvLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1iYXR0bGVmaWVsZFwiKTtcbiAgYmF0dGxlZmllbGRPbmVQYXJhLnRleHRDb250ZW50ID0gXCJQbGF5ZXIgQm9hcmRcIjtcbiAgYmF0dGxlZmllbGRUd29QYXJhLnRleHRDb250ZW50ID0gXCJBSSBCb2FyZFwiO1xuXG4gIGNvbnRhaW5lck9uZS5hcHBlbmRDaGlsZChiYXR0bGVmaWVsZE9uZSk7XG4gIGNvbnRhaW5lclR3by5hcHBlbmRDaGlsZChiYXR0bGVmaWVsZFR3byk7XG4gIGNvbnRhaW5lck9uZS5hcHBlbmRDaGlsZChiYXR0bGVmaWVsZE9uZVBhcmEpO1xuICBjb250YWluZXJUd28uYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRUd29QYXJhKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lck9uZSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUd28pO1xufTtcblxuY29uc3QgcmVuZGVyQm9hcmRzID0gKCkgPT4ge1xuICBjb25zdCB1c2VyQmF0dGxlZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItYmF0dGxlZmllbGRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQmF0dGxlZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyLWJhdHRsZWZpZWxkXCIpO1xuXG4gIC8vIFJlbmRlciB1c2VyIGdhbWUgYm9hcmRcbiAgY29uc3QgcmVuZGVyVXNlckJvYXJkID0gKGJvYXJkKSA9PiB7XG4gICAgdXNlckJhdHRsZWZpZWxkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGJvYXJkW2ldO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25zdCBkYXRhID0gYm9hcmRbaV1bal07XG5cbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICAgIGJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgICAgICAgYnRuLmRhdGFzZXQucG9zID0gYCR7aX0sJHtqfWA7XG5cbiAgICAgICAgaWYgKGRhdGEgPT09IDEpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtc3F1YXJlXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IDIpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtbWlzc2VkXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IDMpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtaGl0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXNlckJhdHRsZWZpZWxkLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlbmRlciBjb21wdXRlciBnYW1lIGJvYXJkXG4gIGNvbnN0IHJlbmRlckNvbXB1dGVyQm9hcmQgPSAoYm9hcmQpID0+IHtcbiAgICBjb21wdXRlckJhdHRsZWZpZWxkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGJvYXJkW2ldO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25zdCBkYXRhID0gYm9hcmRbaV1bal07XG5cbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICAgIGJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgICAgICAgYnRuLmRhdGFzZXQucG9zID0gYCR7aX0sJHtqfWA7XG5cbiAgICAgICAgaWYgKGRhdGEgPT09IDIpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtbWlzc2VkXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IDMpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtaGl0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcHV0ZXJCYXR0bGVmaWVsZC5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHsgcmVuZGVyVXNlckJvYXJkLCByZW5kZXJDb21wdXRlckJvYXJkIH07XG59O1xuXG5jb25zdCBnYW1lV2lubmVyID0gKHdpbm5lcikgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1jb250YWluZXJcIik7XG4gIGNvbnN0IHdpbm5lckFubm91bmNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgY29uc3QgcmVzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgd2lubmVyQW5ub3VuY2VyLmNsYXNzTGlzdC5hZGQoXCJ3aW5uZXJcIik7XG4gIHdpbm5lckFubm91bmNlci50ZXh0Q29udGVudCA9IHdpbm5lcjtcbiAgcmVzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVzdGFydC1idXR0b25cIik7XG4gIHJlc3RhcnRCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gIHJlc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlbWF0Y2hcIjtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQod2lubmVyQW5ub3VuY2VyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlc3RhcnRCdXR0b24pO1xufTtcblxuY29uc3QgZ2FtZU1lbnVFdmVudEhhbmRsZXIgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW5TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXNlY3Rpb25cIik7XG4gIGNvbnN0IHdpbm5lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyLWNvbnRhaW5lclwiKTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZiAod2lubmVyQ29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwic3F1YXJlXCIpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgZGF0YSA9IHNxdWFyZS5kYXRhc2V0LnBvcztcbiAgICAgIGNvbnN0IGFycmF5ID0gZGF0YS5zcGxpdChcIixcIik7XG4gICAgICBjb25zdCBwb3MgPSBbcGFyc2VJbnQoYXJyYXlbMF0pLCBwYXJzZUludChhcnJheVsxXSldO1xuXG4gICAgICBwbGF5Um91bmQocG9zKTtcbiAgICB9XG4gIH0pO1xuXG4gIHdpbm5lckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZiAoKGUudGFyZ2V0LmNsYXNzTmFtZSA9IFwicmVzdGFydC1idXR0b25cIikpIHtcbiAgICAgIG1haW5TZWN0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIHdpbm5lckNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgIC8vIEVtcHR5IGF0dGFja2VkIHNxdWFyZXMgaGlzdG9yeVxuICAgICAgdXNlckF0dGFja3MubGVuZ3RoID0gMDtcbiAgICAgIGNvbXB1dGVyQXR0YWNrcy5sZW5ndGggPSAwO1xuXG4gICAgICAvLyBTdGFydCBuZXcgZ2FtZVxuICAgICAgc3RhcnRNZW51KCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCB7IGdhbWVNZW51LCByZW5kZXJCb2FyZHMsIGdhbWVXaW5uZXIsIGdhbWVNZW51RXZlbnRIYW5kbGVyIH07XG4iLCJsZXQgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbmxldCB2aXNpdGVkID0gW107XG5cbmNvbnN0IGlzQXJyYXlJbkFycmF5ID0gKHNvdXJjZSwgc2VhcmNoKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2VhcmNoLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHNlYXJjaEVsZSA9IHNlYXJjaFtpXTtcblxuICAgIGlmIChzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBTZWFyY2ggZm9yIGVhY2ggXCJzZWFyY2ggYXJyYXlcIiBlbGVtZW50IGluIHRoZSBzb3VyY2UgYXJyYXlcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNvdXJjZS5sZW5ndGg7IGorKykge1xuICAgICAgbGV0IHNvdXJjZUVsZSA9IHNvdXJjZVtqXTtcblxuICAgICAgaWYgKHNlYXJjaEVsZVswXSA9PT0gc291cmNlRWxlWzBdICYmIHNlYXJjaEVsZVsxXSA9PT0gc291cmNlRWxlWzFdKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgZ2V0QWRqQ29vcmRpbmF0ZXMgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgbGV0IGFkalBvc2l0aW9ucyA9IFtdO1xuICBsZXQgb3JpZW50YXRpb24gPSBcIlwiO1xuICBsZXQgb25lID0gY29vcmRpbmF0ZXNbMF07XG4gIGxldCB0d28gPSBjb29yZGluYXRlc1sxXTtcblxuICAvLyBDaGVjayBjb29yZGluYXRlcyBvcmllbnRhdGlvblxuICBpZiAob25lWzBdID09PSB0d29bMF0gJiYgb25lWzFdICE9PSB0d29bMV0pIHtcbiAgICBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICB9IGVsc2UgaWYgKG9uZVswXSAhPT0gdHdvWzBdICYmIG9uZVsxXSA9PT0gdHdvWzFdKSB7XG4gICAgb3JpZW50YXRpb24gPSBcInZlcnRpY2FsXCI7XG4gIH1cblxuICAvLyBBZGQgYWRqYWNlbnQgY29vcmRpbmF0ZXMgZm9yIHNoaXAgY29vcmRpbmF0ZXMgYWxvbmcgdGhlIFktYXhpc1xuICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBjb29yZGluYXRlc1tpXTtcblxuICAgICAgbGV0IGFkakxlZnQgPSBbZWxlbWVudFswXSwgZWxlbWVudFsxXSAtIDFdO1xuICAgICAgbGV0IGFkalJpZ2h0ID0gW2VsZW1lbnRbMF0sIGVsZW1lbnRbMV0gKyAxXTtcblxuICAgICAgaWYgKGFkakxlZnRbMV0gPj0gMCAmJiBhZGpMZWZ0WzFdIDw9IDkpIHtcbiAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqTGVmdCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGpSaWdodFsxXSA+PSAwICYmIGFkalJpZ2h0WzFdIDw9IDkpIHtcbiAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqUmlnaHQpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYWRqYWNlbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBmaXJzdCBzcXVhcmUgb2YgdGhlIHNoaXAgY29vcmRpbmF0ZXNcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGxldCBhZGpUb3AgPSBbZWxlbWVudFswXSAtIDEsIGVsZW1lbnRbMV1dO1xuXG4gICAgICAgIGlmIChhZGpUb3BbMF0gPj0gMCAmJiBhZGpUb3BbMF0gPD0gOSkge1xuICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkalRvcCk7XG5cbiAgICAgICAgICBsZXQgbGVmdCA9IFthZGpUb3BbMF0sIGFkalRvcFsxXSAtIDFdO1xuICAgICAgICAgIGxldCByaWdodCA9IFthZGpUb3BbMF0sIGFkalRvcFsxXSArIDFdO1xuXG4gICAgICAgICAgaWYgKGxlZnRbMV0gPj0gMCAmJiBsZWZ0WzFdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGxlZnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyaWdodFsxXSA+PSAwICYmIHJpZ2h0WzFdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKHJpZ2h0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciB0aGUgbGFzdCBzcXVhcmUgb2YgdGhlIHNoaXAgY29vcmRpbmF0ZXNcbiAgICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggLSBpID09PSAxKSB7XG4gICAgICAgIGxldCBhZGpCb3R0b20gPSBbZWxlbWVudFswXSArIDEsIGVsZW1lbnRbMV1dO1xuXG4gICAgICAgIGlmIChhZGpCb3R0b21bMF0gPj0gMCAmJiBhZGpCb3R0b21bMF0gPD0gOSkge1xuICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkakJvdHRvbSk7XG5cbiAgICAgICAgICBsZXQgbGVmdCA9IFthZGpCb3R0b21bMF0sIGFkakJvdHRvbVsxXSAtIDFdO1xuICAgICAgICAgIGxldCByaWdodCA9IFthZGpCb3R0b21bMF0sIGFkakJvdHRvbVsxXSArIDFdO1xuXG4gICAgICAgICAgaWYgKGxlZnRbMV0gPj0gMCAmJiBsZWZ0WzFdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGxlZnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyaWdodFsxXSA+PSAwICYmIHJpZ2h0WzFdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKHJpZ2h0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWRqUG9zaXRpb25zO1xuICB9XG5cbiAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciBzaGlwIGNvb3JkaW5hdGVzIGFsb25nIHRoZSBYLWF4aXNcbiAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBjb29yZGluYXRlc1tpXTtcblxuICAgICAgbGV0IGFkalRvcCA9IFtlbGVtZW50WzBdIC0gMSwgZWxlbWVudFsxXV07XG4gICAgICBsZXQgYWRqQm90dG9tID0gW2VsZW1lbnRbMF0gKyAxLCBlbGVtZW50WzFdXTtcblxuICAgICAgaWYgKGFkalRvcFswXSA+PSAwICYmIGFkalRvcFswXSA8PSA5KSB7XG4gICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkalRvcCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGpCb3R0b21bMF0gPj0gMCAmJiBhZGpCb3R0b21bMF0gPD0gOSkge1xuICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpCb3R0b20pO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYWRqYWNlbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBmaXJzdCBzcXVhcmUgb2YgdGhlIHNoaXAgY29vcmRpbmF0ZXNcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGxldCBhZGpMZWZ0ID0gW2VsZW1lbnRbMF0sIGVsZW1lbnRbMV0gLSAxXTtcblxuICAgICAgICBpZiAoYWRqTGVmdFsxXSA+PSAwICYmIGFkakxlZnRbMV0gPD0gOSkge1xuICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkakxlZnQpO1xuXG4gICAgICAgICAgbGV0IHRvcCA9IFthZGpMZWZ0WzBdIC0gMSwgYWRqTGVmdFsxXV07XG4gICAgICAgICAgbGV0IGJvdHRvbSA9IFthZGpMZWZ0WzBdICsgMSwgYWRqTGVmdFsxXV07XG5cbiAgICAgICAgICBpZiAodG9wWzBdID49IDAgJiYgdG9wWzBdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKHRvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGJvdHRvbVswXSA+PSAwICYmIGJvdHRvbVswXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChib3R0b20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYWRqYWNlbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBsYXN0IHNxdWFyZSBvZiB0aGUgc2hpcCBjb29yZGluYXRlc1xuICAgICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIGkgPT09IDEpIHtcbiAgICAgICAgbGV0IGFkalJpZ2h0ID0gW2VsZW1lbnRbMF0sIGVsZW1lbnRbMV0gKyAxXTtcblxuICAgICAgICBpZiAoYWRqUmlnaHRbMV0gPj0gMCAmJiBhZGpSaWdodFsxXSA8PSA5KSB7XG4gICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqUmlnaHQpO1xuXG4gICAgICAgICAgbGV0IHRvcCA9IFthZGpSaWdodFswXSAtIDEsIGFkalJpZ2h0WzFdXTtcbiAgICAgICAgICBsZXQgYm90dG9tID0gW2FkalJpZ2h0WzBdICsgMSwgYWRqUmlnaHRbMV1dO1xuXG4gICAgICAgICAgaWYgKHRvcFswXSA+PSAwICYmIHRvcFswXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaCh0b3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChib3R0b21bMF0gPj0gMCAmJiBib3R0b21bMF0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYm90dG9tKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWRqUG9zaXRpb25zO1xuICB9XG59O1xuXG5jb25zdCBnZXRSYW5kb21Qb3NpdGlvbiA9IChsZW5ndGgpID0+IHtcbiAgbGV0IHZhbGlkID0gZmFsc2U7XG4gIGxldCBwb3M7XG5cbiAgd2hpbGUgKHZhbGlkID09PSBmYWxzZSkge1xuICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIHBvcyA9IFt4LCB5XTtcblxuICAgIGlmICh4ICsgbGVuZ3RoIDw9IDEwICYmIHkgKyBsZW5ndGggPD0gMTApIHtcbiAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcG9zO1xufTtcblxuY29uc3QgZ2V0TGVnYWxDb21ib3MgPSAoc2hpcExlbmd0aCkgPT4ge1xuICBjb25zdCBsZWdhbENvbWJvcyA9IFtcbiAgICBbXG4gICAgICBbMCwgMV0sXG4gICAgICBbMCwgMl0sXG4gICAgICBbMCwgM10sXG4gICAgICBbMCwgNF0sXG4gICAgICBbMCwgNV0sXG4gICAgXSxcbiAgICBbXG4gICAgICBbMSwgMF0sXG4gICAgICBbMiwgMF0sXG4gICAgICBbMywgMF0sXG4gICAgICBbNCwgMF0sXG4gICAgICBbNSwgMF0sXG4gICAgXSxcbiAgXTtcbiAgY29uc3QgcG9zID0gZ2V0UmFuZG9tUG9zaXRpb24oc2hpcExlbmd0aCk7XG5cbiAgbGV0IGNvb3JkaW5hdGVzID0gW107XG4gIGxldCBzZXQ7XG5cbiAgLy8gUmFuZG9taXplIHNldCBvZiBjb21ib3MgdG8gYmUgdXNlZFxuICBpZiAoc2hpcExlbmd0aCAlIDIgPT09IDApIHtcbiAgICBzZXQgPSBsZWdhbENvbWJvc1swXTtcbiAgfSBlbHNlIHtcbiAgICBzZXQgPSBsZWdhbENvbWJvc1sxXTtcbiAgfVxuXG4gIGxldCBsZW5ndGhEaWZmID0gc2V0Lmxlbmd0aCAtIHNoaXBMZW5ndGg7XG4gIGxldCBhcnJheUxlbmd0aCA9IHNldC5sZW5ndGggLSAxIC0gbGVuZ3RoRGlmZjtcblxuICBjb29yZGluYXRlcy5wdXNoKHBvcyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdmFsdWVzID0gc2V0W2ldO1xuXG4gICAgbGV0IHggPSBwb3NbMF07XG4gICAgbGV0IHkgPSBwb3NbMV07XG4gICAgbGV0IG1vdmUgPSBbeCArIHZhbHVlc1swXSwgeSArIHZhbHVlc1sxXV07XG5cbiAgICBjb29yZGluYXRlcy5wdXNoKG1vdmUpO1xuICB9XG5cbiAgcmV0dXJuIGNvb3JkaW5hdGVzO1xufTtcblxuY29uc3QgZ2V0Q29tcHV0ZXJTaGlwcyA9ICgpID0+IHtcbiAgbGV0IGxlbmd0aCA9IDU7XG4gIGxldCByZXBlYXQgPSAxO1xuXG4gIC8vIEdldCBjb29yZGluYXRlcyBmb3IgZWFjaCBzaGlwXG4gIHdoaWxlIChsZW5ndGggPiAxKSB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gZ2V0TGVnYWxDb21ib3MobGVuZ3RoKTtcbiAgICBsZXQgaXRlbVZpc2l0ZWQgPSBpc0FycmF5SW5BcnJheSh2aXNpdGVkLCBjb29yZGluYXRlcyk7XG5cbiAgICB3aGlsZSAoaXRlbVZpc2l0ZWQgPT09IHRydWUpIHtcbiAgICAgIGNvb3JkaW5hdGVzID0gZ2V0TGVnYWxDb21ib3MobGVuZ3RoKTtcbiAgICAgIGl0ZW1WaXNpdGVkID0gaXNBcnJheUluQXJyYXkodmlzaXRlZCwgY29vcmRpbmF0ZXMpO1xuICAgIH1cblxuICAgIGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZXMpO1xuXG4gICAgLy8gUHVzaCBjb29yZGluYXRlcyB0byB0aGUgdmlzaXRlZCBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjb29yZGluYXRlID0gY29vcmRpbmF0ZXNbaV07XG5cbiAgICAgIHZpc2l0ZWQucHVzaChjb29yZGluYXRlKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGpDb29yZGluYXRlcyA9IGdldEFkakNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcblxuICAgIC8vIFB1c2ggYWRqYWNlbnQgY29vcmRpbmF0ZXMgdG8gdGhlIHZpc2l0ZWQgYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkakNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY29vcmRpbmF0ZSA9IGFkakNvb3JkaW5hdGVzW2ldO1xuXG4gICAgICB2aXNpdGVkLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlcyBib3RoIHRoZSBkZXN0cm95ZXIgYW5kIHRoZSBzdWJtYXJpbmUgaGF2ZSB0aGUgc2FtZSBsZW5ndGhcbiAgICBpZiAobGVuZ3RoID09PSAzICYmIHJlcGVhdCA9PT0gMSkge1xuICAgICAgcmVwZWF0IC09IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCAtPSAxO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHsgZ2V0Q29tcHV0ZXJTaGlwcywgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMsIHZpc2l0ZWQgfTtcbiIsImltcG9ydCB7IFBsYXllclNoaXBzLCBTaGlwIH0gZnJvbSBcIi4vc2hpcHNcIjtcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBsZXQgYm9hcmQgPSBbXTtcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGJvYXJkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgYm9hcmRbaV1bal0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gIGNvbnN0IHBsYXllclNoaXBzID0gUGxheWVyU2hpcHMoKTtcbiAgY29uc3Qgc2hpcHMgPSBwbGF5ZXJTaGlwcy5nZXRTaGlwcygpO1xuXG4gIGNvbnN0IHBvcHVsYXRlQm9hcmQgPSAoYXJyYXkpID0+IHtcbiAgICBwbGF5ZXJTaGlwcy5hZGRTaGlwQ29vcmRpbmF0ZXMoYXJyYXkpO1xuXG4gICAgLy8gUGxhY2UgYWxsIHNoaXBzIG9udG8gdGhlIGJvYXJkXG4gICAgU2hpcCgpLnBsYWNlU2hpcHMoYm9hcmQsIHNoaXBzKTtcbiAgfTtcblxuICBjb25zdCBmaW5kQXR0YWNrZWRTaGlwID0gKHBvcykgPT4ge1xuICAgIGZvciAobGV0IGtleSBpbiBzaGlwcykge1xuICAgICAgY29uc3QgYXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpXTtcblxuICAgICAgICBpZiAoZWxlbWVudFswXSA9PT0gcG9zWzBdICYmIGVsZW1lbnRbMV0gPT09IHBvc1sxXSkge1xuICAgICAgICAgIHJldHVybiBzaGlwc1trZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocG9zKSA9PiB7XG4gICAgbGV0IHggPSBwb3NbMF07XG4gICAgbGV0IHkgPSBwb3NbMV07XG5cbiAgICBpZiAoYm9hcmRbeF1beV0gPT09IDEpIHtcbiAgICAgIGNvbnN0IGF0dGFja2VkU2hpcCA9IGZpbmRBdHRhY2tlZFNoaXAocG9zKTtcblxuICAgICAgLy8gTWFyayBib2FyZCBwb3NpdGlvbiBhcyBhdHRhY2tlZFxuICAgICAgYm9hcmRbeF1beV0gPSAzO1xuXG4gICAgICAvLyBBZGQgaGl0IGNvdW50IHRvIGF0dGFja2VkIHNoaXBcbiAgICAgIFNoaXAoKS5oaXQoYXR0YWNrZWRTaGlwKTtcbiAgICB9IGVsc2UgaWYgKGJvYXJkW3hdW3ldID09PSAwKSB7XG4gICAgICAvLyBNYXJrIGJvYXJkIHBvc2l0aW9uIGFzIGF0dGFja2VkXG4gICAgICBib2FyZFt4XVt5XSA9IDI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFsbFNoaXBzRGVzdHJveWVkID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGNvbnN0IHNoaXBTdGF0ZSA9IHNoaXBzW2tleV0uZGVzdHJveWVkO1xuXG4gICAgICBpZiAoc2hpcFN0YXRlID09PSB0cnVlKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvdW50ID09PSA1ID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlQm9hcmQsXG4gICAgZ2V0Qm9hcmQsXG4gICAgcG9wdWxhdGVCb2FyZCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFsbFNoaXBzRGVzdHJveWVkLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lLWJvYXJkXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHJlbmRlckJvYXJkcywgZ2FtZVdpbm5lciwgZ2FtZU1lbnVFdmVudEhhbmRsZXIgfSBmcm9tIFwiLi9iYXR0bGVzaGlwXCI7XG5pbXBvcnQgeyB1c2VyU2hpcHNDb29yZGluYXRlcyB9IGZyb20gXCIuL3N0YXJ0LW1lbnVcIjtcbmltcG9ydCB7IGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzIH0gZnJvbSBcIi4vY29tcHV0ZXJBSVwiO1xuXG5sZXQgdXNlckdhbWVCb2FyZDtcbmxldCBjb21wdXRlckdhbWVCb2FyZDtcbmxldCB1c2VyO1xubGV0IGNvbXB1dGVyO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICAvLyBDcmVhdGUgUGxheWVyIG9iamVjdHMgYW5kIEdhbWVCb2FyZCBvYmplY3RzIGZvciBlYWNoIHBsYXllclxuICB1c2VyID0gUGxheWVyKFwidXNlclwiKTtcbiAgY29tcHV0ZXIgPSBQbGF5ZXIoXCJjb21wdXRlciBBSVwiKTtcblxuICB1c2VyR2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgLy8gQ3JlYXRlIG5ldyBib2FyZHMgZm9yIGVhY2ggcGxheWVyXG4gIHVzZXJHYW1lQm9hcmQuY3JlYXRlQm9hcmQoKTtcbiAgY29tcHV0ZXJHYW1lQm9hcmQuY3JlYXRlQm9hcmQoKTtcblxuICAvLyBQb3B1bGF0ZSBwbGF5ZXIgYm9hcmRzIHdpdGggc2hpcHNcbiAgdXNlckdhbWVCb2FyZC5wb3B1bGF0ZUJvYXJkKHVzZXJTaGlwc0Nvb3JkaW5hdGVzKTtcbiAgY29tcHV0ZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZChjb21wdXRlclNoaXBDb29yZGluYXRlcyk7XG5cbiAgLy8gICBHZXQgcGxheWVyIGJvYXJkcyBmcm9tIEdhbWVCb2FyZCBvYmplY3RzXG4gIGNvbnN0IHVzZXJCb2FyZCA9IHVzZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG5cbiAgLy8gSW5pdGlhbCBwbGF5ZXIgYm9hcmRzIGFyZSByZW5kZXJlZFxuICByZW5kZXJCb2FyZHMoKS5yZW5kZXJVc2VyQm9hcmQodXNlckJvYXJkKTtcbiAgcmVuZGVyQm9hcmRzKCkucmVuZGVyQ29tcHV0ZXJCb2FyZChjb21wdXRlckJvYXJkKTtcblxuICAvLyBJbml0aWFsaXplIGV2ZW50IGhhbmRsZXJcbiAgZ2FtZU1lbnVFdmVudEhhbmRsZXIoKTtcbn07XG5cbmNvbnN0IHBsYXlSb3VuZCA9IChwb3MpID0+IHtcbiAgbGV0IHVzZXJBdHRhY2tzID0gdXNlci5hdHRhY2soY29tcHV0ZXIsIGNvbXB1dGVyR2FtZUJvYXJkLCBwb3MpO1xuXG4gIGlmICh1c2VyQXR0YWNrcyA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgLy8gVXBkYXRlIGNvbXB1dGVyIGJvYXJkIG9uIHRoZSBzY3JlZW5cbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICByZW5kZXJCb2FyZHMoKS5yZW5kZXJDb21wdXRlckJvYXJkKGNvbXB1dGVyQm9hcmQpO1xuXG4gICAgLy8gQ2hlY2sgaWYgYWxsIGNvbXB1dGVyIHNoaXBzIGFyZSBkZXN0cm95ZWRcbiAgICBpZiAoY29tcHV0ZXJHYW1lQm9hcmQuYWxsU2hpcHNEZXN0cm95ZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgZ2FtZVdpbm5lcihcIllvdSBXaW4hXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbXB1dGVyLmF0dGFjayh1c2VyLCB1c2VyR2FtZUJvYXJkLCBwb3MpO1xuXG4gICAgLy8gVXBkYXRlIHVzZXIgYm9hcmQgb24gdGhlIHNjcmVlblxuICAgIGNvbnN0IHVzZXJCb2FyZCA9IHVzZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICByZW5kZXJCb2FyZHMoKS5yZW5kZXJVc2VyQm9hcmQodXNlckJvYXJkKTtcblxuICAgIC8vIENoZWNrIGlmIGFsbCB1c2VyIHNoaXBzIGFyZSBkZXN0cm95ZWRcbiAgICBpZiAodXNlckdhbWVCb2FyZC5hbGxTaGlwc0Rlc3Ryb3llZCgpID09PSB0cnVlKSB7XG4gICAgICBnYW1lV2lubmVyKFwiQ29tcHV0ZXIgV2lucyFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgeyBHYW1lLCBwbGF5Um91bmQgfTtcbiIsImltcG9ydCBcIi4vc3R5bGVzL2dsb2JhbC5jc3NcIjtcbmltcG9ydCBJbWcgZnJvbSBcIi4vaW1hZ2VzL3N1Ym1hcmluZS5wbmdcIjtcblxuY29uc3QgcGFnZUxheW91dCA9ICgpID0+IHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBjb25zdCB3aW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0aXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGxvZ28gPSBuZXcgSW1hZ2UoKTtcblxuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcbiAgbWFpbi5jbGFzc0xpc3QuYWRkKFwibWFpbi1zZWN0aW9uXCIpO1xuICBmb290ZXIuY2xhc3NMaXN0LmFkZChcImZvb3RlclwiKTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICB3aW5uZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndpbm5lci1jb250YWluZXJcIik7XG4gIHRpdGxlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZS1jb250YWluZXJcIik7XG4gIGxvZ28uc3JjID0gSW1nO1xuICBsb2dvLmFsdCA9IFwiU3VibWFyaW5lIGxvZ29cIjtcblxuICB0aXRsZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIHRpdGxlQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvZ28pO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGVDb250YWluZXIpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQod2lubmVyQ29udGFpbmVyKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKG1haW4pO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGZvb3Rlcik7XG59O1xuXG5leHBvcnQgeyBwYWdlTGF5b3V0IH07XG4iLCJsZXQgdXNlckF0dGFja3MgPSBbXTtcbmxldCBjb21wdXRlckF0dGFja3MgPSBbXTtcblxuY29uc3QgUGxheWVyID0gKG5hbWUpID0+IHtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgY29uc3QgaXNBdHRhY2tMZWdhbCA9IChlbmVteSwgcG9zKSA9PiB7XG4gICAgbGV0IGFycmF5O1xuXG4gICAgaWYgKGVuZW15ID09PSBcInVzZXJcIikge1xuICAgICAgYXJyYXkgPSBjb21wdXRlckF0dGFja3Muc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXkgPSB1c2VyQXR0YWNrcy5zbGljZSgpO1xuICAgIH1cblxuICAgIHdoaWxlIChhcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheS5zaGlmdCgpO1xuICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHBvc1swXSAmJiBlbGVtZW50WzFdID09PSBwb3NbMV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIEdhbWVCb2FyZCwgcG9zKSA9PiB7XG4gICAgY29uc3QgZW5lbXlOYW1lID0gZW5lbXkuZ2V0TmFtZSgpO1xuXG4gICAgaWYgKGVuZW15TmFtZSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBsZXQgcG9zID0gW3gsIHldO1xuXG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb21wdXRlckF0dGFja3MucHVzaChwb3MpO1xuICAgICAgICBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXR0YWNrKGVuZW15LCBHYW1lQm9hcmQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB1c2VyQXR0YWNrcy5wdXNoKHBvcyk7XG4gICAgICAgIEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGdldE5hbWUsIGlzQXR0YWNrTGVnYWwsIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyLCB1c2VyQXR0YWNrcywgY29tcHV0ZXJBdHRhY2tzIH07XG4iLCJjb25zdCBQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgbGV0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IHtcbiAgICAgIGxlbmd0aDogNSxcbiAgICAgIGhpdHM6IDAsXG4gICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgY29vcmRpbmF0ZXM6IFtdLFxuICAgIH0sXG5cbiAgICBiYXR0bGVzaGlwOiB7XG4gICAgICBsZW5ndGg6IDQsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgZGVzdHJveWVyOiB7XG4gICAgICBsZW5ndGg6IDMsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgc3VibWFyaW5lOiB7XG4gICAgICBsZW5ndGg6IDMsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgcGF0cm9sQm9hdDoge1xuICAgICAgbGVuZ3RoOiAyLFxuICAgICAgaGl0czogMCxcbiAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgICBjb29yZGluYXRlczogW10sXG4gICAgfSxcbiAgfTtcbiAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBzaGlwcztcblxuICBjb25zdCBhZGRTaGlwQ29vcmRpbmF0ZXMgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgY29weSA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGxldCBzaGlwQXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuICAgICAgbGV0IGFyciA9IGNvcHkuc2hpZnQoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2hpcEFycmF5LnB1c2goYXJyW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0U2hpcHMsIGFkZFNoaXBDb29yZGluYXRlcyB9O1xufTtcblxuY29uc3QgU2hpcCA9ICgpID0+IHtcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChib2FyZCwgc2hpcHMpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGxldCBhcnJheSA9IHNoaXBzW2tleV0uY29vcmRpbmF0ZXM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2ldO1xuICAgICAgICBjb25zdCB4ID0gZWxlbWVudFswXTtcbiAgICAgICAgY29uc3QgeSA9IGVsZW1lbnRbMV07XG5cbiAgICAgICAgYm9hcmRbeF1beV0gPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoc2hpcCkgPT4ge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICBjb25zdCBoaXRzQ291bnQgPSBzaGlwLmhpdHM7XG5cbiAgICAvLyBjaGVjayBzaGlwIGxlbmd0aCBhbmQgbm8gb2YgdGltZXMgaXRzIGJlZW4gaGl0XG4gICAgcmV0dXJuIHNoaXBMZW5ndGggPT09IGhpdHNDb3VudCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0cyArPSAxO1xuXG4gICAgLy8gQWZ0ZXIgZXZlcnkgaGl0LCBjaGVjayBpZiB0aGUgc2hpcCBpcyBkZXN0cm95ZWRcbiAgICBjb25zdCBjaGVja1NoaXAgPSBpc1N1bmsoc2hpcCk7XG5cbiAgICBpZiAoY2hlY2tTaGlwID09PSB0cnVlKSB7XG4gICAgICBzaGlwLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IHBsYWNlU2hpcHMsIGhpdCB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyU2hpcHMsIFNoaXAgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCB7IGdhbWVNZW51IH0gZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWUtY29udHJvbGxlclwiO1xuaW1wb3J0IHtcbiAgZ2V0Q29tcHV0ZXJTaGlwcyxcbiAgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMsXG4gIHZpc2l0ZWQsXG59IGZyb20gXCIuL2NvbXB1dGVyQUlcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0YXJ0bWVudS5jc3NcIjtcblxuY29uc3QgZ2V0U3RhcnRTY3JlZW5Cb2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvYXJkXG4gIGdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2FtZUJvYXJkLmdldEJvYXJkKCk7XG5cbiAgcmV0dXJuIGJvYXJkO1xufTtcblxuY29uc3Qgc3RhcnRNZW51ID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcbiAgY29uc3QgbGVmdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCByaWdodFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHBhcmFUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBjYXJyaWVyQmVydGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVzaGlwQmVydGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkZXN0cm95ZXJCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHN1Ym1hcmluZUJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgcGF0cm9sQm9hdEJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY2FycmllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBwYXRyb2xCb2F0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBsZWZ0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwibGVmdC1zZWN0aW9uXCIpO1xuICByaWdodFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcInJpZ2h0LXNlY3Rpb25cIik7XG4gIHRhYmxlLmNsYXNzTGlzdC5hZGQoXCJzdGFydC1tZW51LXRhYmxlXCIpO1xuICBwYXJhLmNsYXNzTGlzdC5hZGQoXCJpbnN0cnVjdGlvbnNcIik7XG4gIHBhcmEudGV4dENvbnRlbnQgPSBcIkRyYWcgYW5kIGRyb3Agc2hpcHNcIjtcbiAgcGFyYVR3by5jbGFzc0xpc3QuYWRkKFwiaW5zdHJ1Y3Rpb25zXCIpO1xuICBwYXJhVHdvLnRleHRDb250ZW50ID0gXCJEb3VibGUgY2xpY2sgdG8gcm90YXRlXCI7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3J0XCIpO1xuICBjYXJyaWVyQmVydGguY2xhc3NMaXN0LmFkZChcImNhcnJpZXItYmVydGhcIik7XG4gIGJhdHRsZXNoaXBCZXJ0aC5jbGFzc0xpc3QuYWRkKFwiYmF0dGxlc2hpcC1iZXJ0aFwiKTtcbiAgZGVzdHJveWVyQmVydGguY2xhc3NMaXN0LmFkZChcImRlc3Ryb3llci1iZXJ0aFwiKTtcbiAgc3VibWFyaW5lQmVydGguY2xhc3NMaXN0LmFkZChcInN1Ym1hcmluZS1iZXJ0aFwiKTtcbiAgcGF0cm9sQm9hdEJlcnRoLmNsYXNzTGlzdC5hZGQoXCJwYXRyb2wtYm9hdC1iZXJ0aFwiKTtcbiAgY2Fycmllci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgY2Fycmllci5pZCA9IFwiY2FycmllclwiO1xuICBjYXJyaWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgY2Fycmllci5kYXRhc2V0LndpZHRoID0gNTtcbiAgY2Fycmllci5kcmFnZ2FibGUgPSB0cnVlO1xuICBiYXR0bGVzaGlwLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBiYXR0bGVzaGlwLmlkID0gXCJiYXR0bGVzaGlwXCI7XG4gIGJhdHRsZXNoaXAuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBiYXR0bGVzaGlwLmRhdGFzZXQud2lkdGggPSA0O1xuICBiYXR0bGVzaGlwLmRyYWdnYWJsZSA9IHRydWU7XG4gIGRlc3Ryb3llci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgZGVzdHJveWVyLmlkID0gXCJkZXN0cm95ZXJcIjtcbiAgZGVzdHJveWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgZGVzdHJveWVyLmRhdGFzZXQud2lkdGggPSAzO1xuICBkZXN0cm95ZXIuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgc3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBzdWJtYXJpbmUuaWQgPSBcInN1Ym1hcmluZVwiO1xuICBzdWJtYXJpbmUuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBzdWJtYXJpbmUuZGF0YXNldC53aWR0aCA9IDM7XG4gIHN1Ym1hcmluZS5kcmFnZ2FibGUgPSB0cnVlO1xuICBwYXRyb2xCb2F0LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBwYXRyb2xCb2F0LmlkID0gXCJwYXRyb2wtYm9hdFwiO1xuICBwYXRyb2xCb2F0LmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgcGF0cm9sQm9hdC5kYXRhc2V0LndpZHRoID0gMjtcbiAgcGF0cm9sQm9hdC5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2V0U3RhcnRTY3JlZW5Cb2FyZCgpO1xuICAvLyBDcmVhdGUgYSBncmlkIG9mIHRhYmxlIHJvd3MgYW5kIHRhYmxlIGNlbGxzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0YWJsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAgIHRhYmxlUm93LmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1yb3dcIik7XG4gICAgdGFibGVSb3cuaWQgPSBgZHJvcHpvbmUtJHtpfWA7XG5cbiAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1jZWxsXCIpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRhYmxlUm93KTtcbiAgfVxuXG4gIGNhcnJpZXJCZXJ0aC5hcHBlbmRDaGlsZChjYXJyaWVyKTtcbiAgYmF0dGxlc2hpcEJlcnRoLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBkZXN0cm95ZXJCZXJ0aC5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzdWJtYXJpbmVCZXJ0aC5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBwYXRyb2xCb2F0QmVydGguYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcnJpZXJCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXBCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc3Ryb3llckJlcnRoKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lQmVydGgpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0QmVydGgpO1xuICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChwYXJhKTtcbiAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHBhcmFUd28pO1xuICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdFNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRTZWN0aW9uKTtcbn07XG5cbmxldCB1c2VyU2hpcHNDb29yZGluYXRlcyA9IFtdO1xuXG5jb25zdCBhbGxTaGlwc1BsYWNlZCA9ICgpID0+IHtcbiAgY29uc3QgcG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9ydFwiKTtcbiAgY29uc3Qgbm9kZUxpc3QgPSBwb3J0LmNoaWxkTm9kZXM7XG5cbiAgbGV0IHNoaXBzID0gMDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IG5vZGVMaXN0W2ldO1xuXG4gICAgaWYgKGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICBzaGlwcyArPSAxO1xuICAgIH1cbiAgfVxuXG4gIC8vIENyZWF0ZSBcInN0YXJ0LWdhbWVcIiBidXR0b24gd2hlbiBhbGwgc2hpcHMgYXJlIHBsYWNlZCBvbiB0aGUgYm9hcmRcbiAgaWYgKHNoaXBzID09PSAwKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3RhcnQtYnRuXCIpO1xuICAgIGJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcIlN0YXJ0IEdhbWVcIjtcblxuICAgIHBvcnQuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgfVxufTtcblxuY29uc3QgaXNEcm9wVmFsaWQgPSAoaW5kZXhYLCBpbmRleFksIHNoaXBIZWlnaHQsIHNoaXBXaWR0aCwgbm9kZUxpc3QpID0+IHtcbiAgLy8gSWYgc2hpcCBkcm9wIGV4Y2VlZHMgdGhlIGJvdW5kIG9mIHRoZSBib2FyZCwgcmV0dXJuIGZhbHNlXG4gIGlmIChpbmRleFkgKyBzaGlwV2lkdGggPiAxMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCB0byB0aGUgaW1tZWRpYXRlIHRvcCBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tUb3AgPSAoKSA9PiB7XG4gICAgbGV0IGRyb3BTcXVhcmUgPSBub2RlTGlzdFtpbmRleFldO1xuICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgbGV0IHBhcmVudFNpYmxpbmcgPSBwYXJlbnQucHJldmlvdXNTaWJsaW5nO1xuICAgIGxldCBzdGFydEluZGV4ID0gaW5kZXhZIC0gMTtcblxuICAgIGlmIChwYXJlbnRTaWJsaW5nID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBXaWR0aCArIDI7IGkrKykge1xuICAgICAgLy8gQ2hlY2tzIGNoaWxkIG5vZGVzIG9mIHRoZSBwYXJlbnQgc2libGluZ1xuICAgICAgbGV0IHNxdWFyZUluZGV4ID0gc3RhcnRJbmRleCArIGk7XG4gICAgICBsZXQgbm9kZUxpc3QgPSBwYXJlbnRTaWJsaW5nLmNoaWxkTm9kZXM7XG4gICAgICBsZXQgc3F1YXJlID0gbm9kZUxpc3Rbc3F1YXJlSW5kZXhdO1xuXG4gICAgICBpZiAoc3F1YXJlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBzcXVhcmVDbGFzcyA9IHNxdWFyZS5jbGFzc05hbWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJjYXJyaWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiYmF0dGxlc2hpcFwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImRlc3Ryb3llclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcInN1Ym1hcmluZVwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcInBhdHJvbC1ib2F0XCIpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKiBUaGlzIGNoZWNrcyBpZiB0aGVyZSBpcyBhIHNoaXAgdG8gdGhlIGltbWVkaWF0ZSByaWdodCBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tSaWdodCA9ICgpID0+IHtcbiAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W2luZGV4WV07XG4gICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICBsZXQgZ3JhbmRQYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICBsZXQgcGFyZW50TGlzdCA9IGdyYW5kUGFyZW50LmNoaWxkTm9kZXM7XG4gICAgbGV0IHNxdWFyZUluZGV4ID0gaW5kZXhZICsgc2hpcFdpZHRoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwSGVpZ2h0OyBpKyspIHtcbiAgICAgIGxldCBpbmRleCA9IGluZGV4WCArIGk7XG4gICAgICBsZXQgY2hpbGRyZW4gPSBwYXJlbnRMaXN0W2luZGV4XTtcbiAgICAgIGxldCBsaXN0ID0gY2hpbGRyZW4uY2hpbGROb2RlcztcbiAgICAgIGxldCBzcXVhcmUgPSBsaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyogVGhpcyBjaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIHRvIHRoZSBpbW1lZGlhdGUgYm90dG9tIG9mIHRoZSBcbiAgXCJkcm9wIHNoaXBcIiwgYW5kIHN0b3BzIGV4ZWN1dGlvbiBpZiBhIHBsYWNlZCBzaGlwIGlzIGRldGVjdGVkLiAqL1xuICBjb25zdCBjaGVja0JvdHRvbSA9ICgpID0+IHtcbiAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W2luZGV4WV07XG4gICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICBsZXQgcGFyZW50U2libGluZyA9IHBhcmVudC5uZXh0U2libGluZztcbiAgICBsZXQgc3RhcnRJbmRleCA9IGluZGV4WSAtIDE7XG5cbiAgICBpZiAocGFyZW50U2libGluZyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwV2lkdGggKyAyOyBpKyspIHtcbiAgICAgIC8vIENoZWNrcyBjaGlsZCBub2RlcyBvZiB0aGUgcGFyZW50IHNpYmxpbmdcbiAgICAgIGxldCBzcXVhcmVJbmRleCA9IHN0YXJ0SW5kZXggKyBpO1xuICAgICAgbGV0IG5vZGVMaXN0ID0gcGFyZW50U2libGluZy5jaGlsZE5vZGVzO1xuICAgICAgbGV0IHNxdWFyZSA9IG5vZGVMaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyogVGhpcyBjaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIHRvIHRoZSBpbW1lZGlhdGUgbGVmdCBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tMZWZ0ID0gKCkgPT4ge1xuICAgIGxldCBkcm9wU3F1YXJlID0gbm9kZUxpc3RbaW5kZXhZXTtcbiAgICBsZXQgcGFyZW50ID0gZHJvcFNxdWFyZS5wYXJlbnROb2RlO1xuICAgIGxldCBncmFuZFBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgIGxldCBwYXJlbnRMaXN0ID0gZ3JhbmRQYXJlbnQuY2hpbGROb2RlcztcbiAgICBsZXQgc3F1YXJlSW5kZXggPSBpbmRleFkgLSAxO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwSGVpZ2h0OyBpKyspIHtcbiAgICAgIGxldCBpbmRleCA9IGluZGV4WCArIGk7XG4gICAgICBsZXQgY2hpbGRyZW4gPSBwYXJlbnRMaXN0W2luZGV4XTtcbiAgICAgIGxldCBsaXN0ID0gY2hpbGRyZW4uY2hpbGROb2RlcztcbiAgICAgIGxldCBzcXVhcmUgPSBsaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgbGV0IHRvcFZhbGlkID0gY2hlY2tUb3AoKTtcbiAgbGV0IHJpZ2h0VmFsaWQgPSBjaGVja1JpZ2h0KCk7XG4gIGxldCBib3R0b21WYWxpZCA9IGNoZWNrQm90dG9tKCk7XG4gIGxldCBsZWZ0VmFsaWQgPSBjaGVja0xlZnQoKTtcblxuICBpZiAoXG4gICAgdG9wVmFsaWQgPT09IHRydWUgJiZcbiAgICByaWdodFZhbGlkID09PSB0cnVlICYmXG4gICAgYm90dG9tVmFsaWQgPT09IHRydWUgJiZcbiAgICBsZWZ0VmFsaWQgPT09IHRydWVcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoXG4gICAgdG9wVmFsaWQgPT09IGZhbHNlIHx8XG4gICAgcmlnaHRWYWxpZCA9PT0gZmFsc2UgfHxcbiAgICBib3R0b21WYWxpZCA9PT0gZmFsc2UgfHxcbiAgICBsZWZ0VmFsaWQgPT09IGZhbHNlXG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3Qgc3RhcnRNZW51RXZlbnRIYW5kbGVyID0gKCkgPT4ge1xuICBjb25zdCBtYWluU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoZSkgPT4ge1xuICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XG5cbiAgICBpZiAoXG4gICAgICBlbGVtZW50LmlkID09PSBcImNhcnJpZXJcIiB8fFxuICAgICAgZWxlbWVudC5pZCA9PT0gXCJiYXR0bGVzaGlwXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwiZGVzdHJveWVyXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwic3VibWFyaW5lXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwicGF0cm9sLWJvYXRcIlxuICAgICkge1xuICAgICAgbGV0IGhlaWdodCA9IGVsZW1lbnQuZGF0YXNldC5oZWlnaHQ7XG4gICAgICBsZXQgd2lkdGggPSBlbGVtZW50LmRhdGFzZXQud2lkdGg7XG5cbiAgICAgIGVsZW1lbnQuZGF0YXNldC5oZWlnaHQgPSB3aWR0aDtcbiAgICAgIGVsZW1lbnQuZGF0YXNldC53aWR0aCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZXBsYWNlKFwiaG9yaXpvbnRhbFwiLCBcInZlcnRpY2FsXCIpO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09IFwidmVydGljYWxcIikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVwbGFjZShcInZlcnRpY2FsXCIsIFwiaG9yaXpvbnRhbFwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcbiAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0LmlkO1xuXG4gICAgaWYgKFxuICAgICAgZWxlbWVudCA9PT0gXCJjYXJyaWVyXCIgfHxcbiAgICAgIGVsZW1lbnQgPT09IFwiYmF0dGxlc2hpcFwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcImRlc3Ryb3llclwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcInN1Ym1hcmluZVwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcInBhdHJvbC1ib2F0XCJcbiAgICApIHtcbiAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIGVsZW1lbnQpO1xuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9IGVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIChlKSA9PiB7XG4gICAgZS50YXJnZXQudGV4dENvbnRlbnQgPSBcIlwiO1xuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInRhYmxlLWNlbGxcIikge1xuICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJhcXVhXCI7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJ0YWJsZS1jZWxsXCIpIHtcbiAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidGFibGUtY2VsbFwiKSB7XG4gICAgICBjb25zdCBkcm9wem9uZSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50ID0gZHJvcHpvbmUucGFyZW50Tm9kZTtcbiAgICAgIGNvbnN0IG5vZGVMaXN0ID0gcGFyZW50LmNoaWxkTm9kZXM7XG4gICAgICBjb25zdCBkYXRhID0gZHJvcHpvbmUuZGF0YXNldC5wb3M7XG4gICAgICBjb25zdCBhcnJheSA9IGRhdGEuc3BsaXQoXCIsXCIpO1xuICAgICAgY29uc3QgeCA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgICAgIGNvbnN0IHkgPSBwYXJzZUludChhcnJheVsxXSk7XG4gICAgICBjb25zdCBkcmFnZ2FibGVJZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpO1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRyYWdnYWJsZUlkKTtcbiAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZHJhZ2dhYmxlRWxlbWVudC5jbGFzc05hbWU7XG4gICAgICBjb25zdCBzaGlwSGVpZ2h0ID0gcGFyc2VJbnQoZHJhZ2dhYmxlRWxlbWVudC5kYXRhc2V0LmhlaWdodCk7XG4gICAgICBjb25zdCBzaGlwV2lkdGggPSBwYXJzZUludChkcmFnZ2FibGVFbGVtZW50LmRhdGFzZXQud2lkdGgpO1xuXG4gICAgICAvLyBUaGlzIGNoZWNrcyBpZiB0aGUgZHJvcCBpcyB2YWxpZFxuICAgICAgbGV0IHZhbGlkID0gaXNEcm9wVmFsaWQoeCwgeSwgc2hpcEhlaWdodCwgc2hpcFdpZHRoLCBub2RlTGlzdCk7XG4gICAgICBsZXQgc2hpcENvb3JkaW5hdGVzID0gW107XG5cbiAgICAgIC8vIElmIGRyb3AgaXMgbm90IHZhbGlkLCBzdG9wIGV4ZWN1dGlvblxuICAgICAgaWYgKHZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICBub2RlTGlzdFt5XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAvLyBUaGlzIGFkZHMgYSB2aXN1YWwgaW5kaWNhdGlvbiB3aGVyZSB0aGUgc2hpcCBpcyBkcm9wcGVkXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwV2lkdGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0geSArIGk7XG4gICAgICAgICAgICBub2RlTGlzdFtpbmRleF0uY2xhc3NMaXN0LmFkZChkcmFnZ2FibGVJZCk7XG4gICAgICAgICAgICBub2RlTGlzdFtpbmRleF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJhcXVhXCI7XG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChbeCwgaW5kZXhdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVGhpcyBhZGRzIGEgdmlzdWFsIGluZGljYXRpb24gd2hlcmUgdGhlIHNoaXAgaXMgZHJvcHBlZFxuICAgICAgICAgIGxldCBkcm9wU3F1YXJlID0gbm9kZUxpc3RbeV07XG4gICAgICAgICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICAgICAgICBsZXQgZ3JhbmRQYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICBsZXQgcGFyZW50TGlzdCA9IGdyYW5kUGFyZW50LmNoaWxkTm9kZXM7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBIZWlnaHQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0geCArIGk7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBwYXJlbnRMaXN0W2luZGV4XTtcbiAgICAgICAgICAgIGxldCBsaXN0ID0gY2hpbGRyZW4uY2hpbGROb2RlcztcblxuICAgICAgICAgICAgbGlzdFt5XS5jbGFzc0xpc3QuYWRkKGRyYWdnYWJsZUlkKTtcbiAgICAgICAgICAgIGxpc3RbeV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJhcXVhXCI7XG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChbaW5kZXgsIHldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVQYXJlbnQgPSBkcmFnZ2FibGVFbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIGRyYWdnYWJsZVBhcmVudC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuY2xlYXJEYXRhKCk7XG4gICAgICAgIHVzZXJTaGlwc0Nvb3JkaW5hdGVzLnB1c2goc2hpcENvb3JkaW5hdGVzKTtcbiAgICAgICAgYWxsU2hpcHNQbGFjZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwic3RhcnQtYnRuXCIpIHtcbiAgICAgIG1haW5TZWN0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgZ2V0Q29tcHV0ZXJTaGlwcygpO1xuICAgICAgZ2FtZU1lbnUoKTtcbiAgICAgIEdhbWUoKTtcblxuICAgICAgdXNlclNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoID0gMDtcbiAgICAgIGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzLmxlbmd0aCA9IDA7XG4gICAgICB2aXNpdGVkLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCB7IHN0YXJ0TWVudSwgdXNlclNoaXBzQ29vcmRpbmF0ZXMsIHN0YXJ0TWVudUV2ZW50SGFuZGxlciB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC51c2VyLWNvbnRhaW5lcixcbi5jb21wdXRlci1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyMHB4O1xufVxuXG4udXNlci1iYXR0bGVmaWVsZCxcbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XG4gIGhlaWdodDogMzUwcHg7XG4gIHdpZHRoOiAzNTBweDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4uc3F1YXJlIHtcbiAgYm9yZGVyOiBzb2xpZCAxcHggZ3JleTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5zaGlwLXNxdWFyZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWFtYXJpbmU7XG59XG5cbi5zaGlwLW1pc3NlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG5cbi5zaGlwLWhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLnNxdWFyZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2dhbWVtZW51LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7RUFFRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBOztFQUVFLGFBQWE7RUFDYixZQUFZO0VBQ1osYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnVzZXItY29udGFpbmVyLFxcbi5jb21wdXRlci1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi51c2VyLWJhdHRsZWZpZWxkLFxcbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XFxuICBoZWlnaHQ6IDM1MHB4O1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5zcXVhcmUge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggZ3JleTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zaGlwLXNxdWFyZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhbWFyaW5lO1xcbn1cXG5cXG4uc2hpcC1taXNzZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLnNoaXAtaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLnNxdWFyZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5ib2R5IHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XG59XG5cbi5jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMTBweDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxZnIgMTUwcHg7XG59XG5cbi5tYWluLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG59XG5cbi50aXRsZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmgxIHtcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xufVxuXG5pbWcge1xuICBncmlkLWNvbHVtbjogMyAvIDQ7XG4gIHdpZHRoOiA2MHB4O1xuICBqdXN0aWZ5LXNlbGY6IGVuZDtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9nbG9iYWwuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLGFBQWE7RUFDYixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHFDQUFxQztFQUNyQyxxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xcbn1cXG5cXG4uY29udGVudCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxZnIgMTUwcHg7XFxufVxcblxcbi5tYWluLXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG59XFxuXFxuLnRpdGxlLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmgxIHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMztcXG59XFxuXFxuaW1nIHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gNDtcXG4gIHdpZHRoOiA2MHB4O1xcbiAganVzdGlmeS1zZWxmOiBlbmQ7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLmxlZnQtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnJpZ2h0LXNlY3Rpb24ge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDUwcHggNTBweCAxZnI7XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnN0YXJ0LW1lbnUtdGFibGUge1xuICBoZWlnaHQ6IDQwMHB4O1xuICB3aWR0aDogNDAwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG59XG5cbnRib2R5IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4udGFibGUtcm93IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLnRhYmxlLWNlbGwge1xuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLnBvcnQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgYXV0bztcbiAgZ3JpZC1hdXRvLXJvd3M6IG1pbm1heChtaW4tY29udGVudCwgbWF4LWNvbnRlbnQpO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmNhcnJpZXItYmVydGgsXG4uYmF0dGxlc2hpcC1iZXJ0aCxcbi5kZXN0cm95ZXItYmVydGgsXG4uc3VibWFyaW5lLWJlcnRoLFxuLnBhdHJvbC1ib2F0LWJlcnRoIHtcbiAgcGFkZGluZzogMTBweDtcbn1cblxuI2NhcnJpZXIuaG9yaXpvbnRhbCB7XG4gIGhlaWdodDogMzVweDtcbiAgd2lkdGg6IDIwMHB4O1xufVxuI2JhdHRsZXNoaXAuaG9yaXpvbnRhbCB7XG4gIGhlaWdodDogMzVweDtcbiAgd2lkdGg6IDE2MHB4O1xufVxuXG4jZGVzdHJveWVyLmhvcml6b250YWwsXG4jc3VibWFyaW5lLmhvcml6b250YWwge1xuICBoZWlnaHQ6IDM1cHg7XG4gIHdpZHRoOiAxMjBweDtcbn1cblxuI3BhdHJvbC1ib2F0Lmhvcml6b250YWwge1xuICBoZWlnaHQ6IDM1cHg7XG4gIHdpZHRoOiA4MHB4O1xufVxuXG4jY2Fycmllci52ZXJ0aWNhbCB7XG4gIGhlaWdodDogMjAwcHg7XG4gIHdpZHRoOiAzNXB4O1xufVxuXG4jYmF0dGxlc2hpcC52ZXJ0aWNhbCB7XG4gIGhlaWdodDogMTYwcHg7XG4gIHdpZHRoOiAzNXB4O1xufVxuXG4jZGVzdHJveWVyLnZlcnRpY2FsLFxuI3N1Ym1hcmluZS52ZXJ0aWNhbCB7XG4gIGhlaWdodDogMTIwcHg7XG4gIHdpZHRoOiAzNXB4O1xufVxuXG4jcGF0cm9sLWJvYXQudmVydGljYWwge1xuICBoZWlnaHQ6IDgwcHg7XG4gIHdpZHRoOiAzNXB4O1xufVxuXG4jY2FycmllcixcbiNiYXR0bGVzaGlwLFxuI2Rlc3Ryb3llcixcbiNzdWJtYXJpbmUsXG4jcGF0cm9sLWJvYXQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHNreWJsdWU7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc3RhcnQtYnRuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBoZWlnaHQ6IDEwMHB4O1xuICB3aWR0aDogMjAwcHg7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdGFydG1lbnUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsaUNBQWlDO0VBQ2pDLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxnREFBZ0Q7RUFDaEQsdUJBQXVCO0FBQ3pCOztBQUVBOzs7OztFQUtFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7QUFDQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7O0VBRUUsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTs7Ozs7RUFLRSxhQUFhO0VBQ2IsMkJBQTJCO0VBQzNCLHlCQUF5QjtFQUN6Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixZQUFZO0VBQ1osUUFBUTtFQUNSLFNBQVM7RUFDVCxnQ0FBZ0M7RUFDaEMsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmxlZnQtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnJpZ2h0LXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogNTBweCA1MHB4IDFmcjtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydC1tZW51LXRhYmxlIHtcXG4gIGhlaWdodDogNDAwcHg7XFxuICB3aWR0aDogNDAwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG50Ym9keSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnRhYmxlLXJvdyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi50YWJsZS1jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLnBvcnQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCBhdXRvO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IG1pbm1heChtaW4tY29udGVudCwgbWF4LWNvbnRlbnQpO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5jYXJyaWVyLWJlcnRoLFxcbi5iYXR0bGVzaGlwLWJlcnRoLFxcbi5kZXN0cm95ZXItYmVydGgsXFxuLnN1Ym1hcmluZS1iZXJ0aCxcXG4ucGF0cm9sLWJvYXQtYmVydGgge1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuXFxuI2NhcnJpZXIuaG9yaXpvbnRhbCB7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcbiNiYXR0bGVzaGlwLmhvcml6b250YWwge1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgd2lkdGg6IDE2MHB4O1xcbn1cXG5cXG4jZGVzdHJveWVyLmhvcml6b250YWwsXFxuI3N1Ym1hcmluZS5ob3Jpem9udGFsIHtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAxMjBweDtcXG59XFxuXFxuI3BhdHJvbC1ib2F0Lmhvcml6b250YWwge1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgd2lkdGg6IDgwcHg7XFxufVxcblxcbiNjYXJyaWVyLnZlcnRpY2FsIHtcXG4gIGhlaWdodDogMjAwcHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxuI2JhdHRsZXNoaXAudmVydGljYWwge1xcbiAgaGVpZ2h0OiAxNjBweDtcXG4gIHdpZHRoOiAzNXB4O1xcbn1cXG5cXG4jZGVzdHJveWVyLnZlcnRpY2FsLFxcbiNzdWJtYXJpbmUudmVydGljYWwge1xcbiAgaGVpZ2h0OiAxMjBweDtcXG4gIHdpZHRoOiAzNXB4O1xcbn1cXG5cXG4jcGF0cm9sLWJvYXQudmVydGljYWwge1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgd2lkdGg6IDM1cHg7XFxufVxcblxcbiNjYXJyaWVyLFxcbiNiYXR0bGVzaGlwLFxcbiNkZXN0cm95ZXIsXFxuI3N1Ym1hcmluZSxcXG4jcGF0cm9sLWJvYXQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHNreWJsdWU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydC1idG4ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nYW1lbWVudS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dhbWVtZW51LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nbG9iYWwuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nbG9iYWwuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0YXJ0bWVudS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0YXJ0bWVudS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgcGFnZUxheW91dCB9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHsgc3RhcnRNZW51LCBzdGFydE1lbnVFdmVudEhhbmRsZXIgfSBmcm9tIFwiLi9zdGFydC1tZW51XCI7XG5cbmNvbnN0IGNvbXBvbmVudCA9ICgpID0+IHtcbiAgcGFnZUxheW91dCgpO1xuXG4gIHN0YXJ0TWVudSgpO1xuXG4gIHN0YXJ0TWVudUV2ZW50SGFuZGxlcigpO1xufTtcbmNvbXBvbmVudCgpO1xuIl0sIm5hbWVzIjpbInN0YXJ0TWVudSIsInBsYXlSb3VuZCIsInVzZXJBdHRhY2tzIiwiY29tcHV0ZXJBdHRhY2tzIiwiZ2FtZU1lbnUiLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsImNvbnRhaW5lck9uZSIsImNyZWF0ZUVsZW1lbnQiLCJjb250YWluZXJUd28iLCJiYXR0bGVmaWVsZE9uZSIsImJhdHRsZWZpZWxkVHdvIiwiYmF0dGxlZmllbGRPbmVQYXJhIiwiYmF0dGxlZmllbGRUd29QYXJhIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJCb2FyZHMiLCJ1c2VyQmF0dGxlZmllbGQiLCJjb21wdXRlckJhdHRsZWZpZWxkIiwicmVuZGVyVXNlckJvYXJkIiwiYm9hcmQiLCJpIiwibGVuZ3RoIiwicm93IiwiaiIsImJ0biIsImRhdGEiLCJ0eXBlIiwiZGF0YXNldCIsInBvcyIsInJlbmRlckNvbXB1dGVyQm9hcmQiLCJnYW1lV2lubmVyIiwid2lubmVyIiwid2lubmVyQW5ub3VuY2VyIiwicmVzdGFydEJ1dHRvbiIsImdhbWVNZW51RXZlbnRIYW5kbGVyIiwibWFpblNlY3Rpb24iLCJ3aW5uZXJDb250YWluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImhhc0NoaWxkTm9kZXMiLCJ0YXJnZXQiLCJjbGFzc05hbWUiLCJzcXVhcmUiLCJhcnJheSIsInNwbGl0IiwicGFyc2VJbnQiLCJjb21wdXRlclNoaXBDb29yZGluYXRlcyIsInZpc2l0ZWQiLCJpc0FycmF5SW5BcnJheSIsInNvdXJjZSIsInNlYXJjaCIsInNlYXJjaEVsZSIsInNvdXJjZUVsZSIsImdldEFkakNvb3JkaW5hdGVzIiwiY29vcmRpbmF0ZXMiLCJhZGpQb3NpdGlvbnMiLCJvcmllbnRhdGlvbiIsIm9uZSIsInR3byIsImVsZW1lbnQiLCJhZGpMZWZ0IiwiYWRqUmlnaHQiLCJwdXNoIiwiYWRqVG9wIiwibGVmdCIsInJpZ2h0IiwiYWRqQm90dG9tIiwidG9wIiwiYm90dG9tIiwiZ2V0UmFuZG9tUG9zaXRpb24iLCJ2YWxpZCIsIngiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ5IiwiZ2V0TGVnYWxDb21ib3MiLCJzaGlwTGVuZ3RoIiwibGVnYWxDb21ib3MiLCJzZXQiLCJsZW5ndGhEaWZmIiwiYXJyYXlMZW5ndGgiLCJ2YWx1ZXMiLCJtb3ZlIiwiZ2V0Q29tcHV0ZXJTaGlwcyIsInJlcGVhdCIsIml0ZW1WaXNpdGVkIiwiY29vcmRpbmF0ZSIsImFkakNvb3JkaW5hdGVzIiwiUGxheWVyU2hpcHMiLCJTaGlwIiwiR2FtZUJvYXJkIiwiY3JlYXRlQm9hcmQiLCJnZXRCb2FyZCIsInBsYXllclNoaXBzIiwic2hpcHMiLCJnZXRTaGlwcyIsInBvcHVsYXRlQm9hcmQiLCJhZGRTaGlwQ29vcmRpbmF0ZXMiLCJwbGFjZVNoaXBzIiwiZmluZEF0dGFja2VkU2hpcCIsImtleSIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tlZFNoaXAiLCJoaXQiLCJhbGxTaGlwc0Rlc3Ryb3llZCIsImNvdW50Iiwic2hpcFN0YXRlIiwiZGVzdHJveWVkIiwiUGxheWVyIiwidXNlclNoaXBzQ29vcmRpbmF0ZXMiLCJ1c2VyR2FtZUJvYXJkIiwiY29tcHV0ZXJHYW1lQm9hcmQiLCJ1c2VyIiwiY29tcHV0ZXIiLCJHYW1lIiwidXNlckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsImF0dGFjayIsIkltZyIsInBhZ2VMYXlvdXQiLCJjb250ZW50IiwiaGVhZGVyIiwibWFpbiIsImZvb3RlciIsInRpdGxlIiwidGl0bGVDb250YWluZXIiLCJsb2dvIiwiSW1hZ2UiLCJzcmMiLCJhbHQiLCJuYW1lIiwiZ2V0TmFtZSIsImlzQXR0YWNrTGVnYWwiLCJlbmVteSIsInNsaWNlIiwic2hpZnQiLCJlbmVteU5hbWUiLCJjaGVja0xlZ2FsIiwiY2FycmllciIsImhpdHMiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsImNvcHkiLCJzaGlwQXJyYXkiLCJhcnIiLCJpc1N1bmsiLCJzaGlwIiwiaGl0c0NvdW50IiwiY2hlY2tTaGlwIiwiZ2V0U3RhcnRTY3JlZW5Cb2FyZCIsImdhbWVCb2FyZCIsImxlZnRTZWN0aW9uIiwicmlnaHRTZWN0aW9uIiwidGFibGUiLCJ0YWJsZUJvZHkiLCJwYXJhIiwicGFyYVR3byIsInNoaXBzQ29udGFpbmVyIiwiY2FycmllckJlcnRoIiwiYmF0dGxlc2hpcEJlcnRoIiwiZGVzdHJveWVyQmVydGgiLCJzdWJtYXJpbmVCZXJ0aCIsInBhdHJvbEJvYXRCZXJ0aCIsImlkIiwiaGVpZ2h0Iiwid2lkdGgiLCJkcmFnZ2FibGUiLCJ0YWJsZVJvdyIsImNlbGwiLCJhbGxTaGlwc1BsYWNlZCIsInBvcnQiLCJub2RlTGlzdCIsImNoaWxkTm9kZXMiLCJpc0Ryb3BWYWxpZCIsImluZGV4WCIsImluZGV4WSIsInNoaXBIZWlnaHQiLCJzaGlwV2lkdGgiLCJjaGVja1RvcCIsImRyb3BTcXVhcmUiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwicGFyZW50U2libGluZyIsInByZXZpb3VzU2libGluZyIsInN0YXJ0SW5kZXgiLCJzcXVhcmVJbmRleCIsInVuZGVmaW5lZCIsInNxdWFyZUNsYXNzIiwiaW5jbHVkZXMiLCJjaGVja1JpZ2h0IiwiZ3JhbmRQYXJlbnQiLCJwYXJlbnRMaXN0IiwiaW5kZXgiLCJjaGlsZHJlbiIsImxpc3QiLCJjaGVja0JvdHRvbSIsIm5leHRTaWJsaW5nIiwiY2hlY2tMZWZ0IiwidG9wVmFsaWQiLCJyaWdodFZhbGlkIiwiYm90dG9tVmFsaWQiLCJsZWZ0VmFsaWQiLCJzdGFydE1lbnVFdmVudEhhbmRsZXIiLCJyZXBsYWNlIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwicHJldmVudERlZmF1bHQiLCJkcm9wem9uZSIsImRyYWdnYWJsZUlkIiwiZ2V0RGF0YSIsImRyYWdnYWJsZUVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNoaXBDb29yZGluYXRlcyIsImRyYWdnYWJsZVBhcmVudCIsImNsZWFyRGF0YSIsImNvbXBvbmVudCJdLCJzb3VyY2VSb290IjoiIn0=