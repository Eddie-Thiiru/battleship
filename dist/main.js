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
  const container = document.querySelector(".main-section");
  const popUp = document.createElement("div");
  const winnerAnnouncer = document.createElement("h3");
  const restartButton = document.createElement("button");
  popUp.classList.add("pop-up");
  winnerAnnouncer.classList.add("winner");
  winnerAnnouncer.textContent = winner;
  restartButton.classList.add("restart-button");
  restartButton.type = "button";
  restartButton.textContent = "Rematch";
  document.body.classList.toggle("modal-open");
  popUp.appendChild(winnerAnnouncer);
  popUp.appendChild(restartButton);
  container.appendChild(popUp);
};
const gameMenuEventHandler = () => {
  const mainSection = document.querySelector(".main-section");
  mainSection.addEventListener("click", e => {
    if (e.target.className === "square") {
      const square = e.target;
      const data = square.dataset.pos;
      const array = data.split(",");
      const pos = [parseInt(array[0]), parseInt(array[1])];
      (0,_game_controller__WEBPACK_IMPORTED_MODULE_1__.playRound)(pos);
    }
  });
  mainSection.addEventListener("click", e => {
    if (e.target.className === "restart-button") {
      document.body.classList.toggle("modal-open");
      mainSection.textContent = "";

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
  const copyright = document.createElement("p");
  const title = document.createElement("h1");
  const logo = new Image();
  header.classList.add("header");
  main.classList.add("main-section");
  footer.classList.add("footer");
  title.classList.add("title");
  title.textContent = "Battleship";
  copyright.classList.add("copyright");
  copyright.textContent = "Copyright @ Battleship 2023";
  logo.src = _images_submarine_png__WEBPACK_IMPORTED_MODULE_1__;
  logo.alt = "Submarine logo";
  header.appendChild(title);
  header.appendChild(logo);
  footer.appendChild(copyright);
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
  const container = document.querySelector(".right-section");
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
    container.appendChild(btn);
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
        let str = element;
        let letter = str.charAt(0).toUpperCase();
        let text = str.replace(str.charAt(0), letter);
        e.target.textContent = text;
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
      e.target.style.backgroundColor = "#23ffcf";
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
___CSS_LOADER_EXPORT___.push([module.id, `body.modal-open {
  pointer-events: none;
}

body.modal-open .user-container,
body.modal-open .computer-container {
  opacity: 0.5;
}

body.modal-open .pop-up {
  pointer-events: auto;
}

.pop-up {
  position: absolute;
  height: 200px;
  width: 400px;
  color: #d1d4dc;
  background-color: rgba(39, 57, 77, 0.7);
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.user-container,
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

.user-battlefield {
  justify-self: end;
}

.computer-battlefield {
  justify-self: start;
}

.square {
  border: 1px solid #131c26;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ship-square {
  background-color: #0099d6;
}

.ship-missed {
  background-color: #9ea0a1;
}

.ship-hit {
  background-color: #ff1a1a;
}

.square:hover {
  background-color: #23ffcf;
}
`, "",{"version":3,"sources":["webpack://./src/styles/gamemenu.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;AACtB;;AAEA;;EAEE,YAAY;AACd;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,cAAc;EACd,uCAAuC;EACvC,aAAa;EACb,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,YAAY;EACZ,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B","sourcesContent":["body.modal-open {\n  pointer-events: none;\n}\n\nbody.modal-open .user-container,\nbody.modal-open .computer-container {\n  opacity: 0.5;\n}\n\nbody.modal-open .pop-up {\n  pointer-events: auto;\n}\n\n.pop-up {\n  position: absolute;\n  height: 200px;\n  width: 400px;\n  color: #d1d4dc;\n  background-color: rgba(39, 57, 77, 0.7);\n  padding: 10px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n}\n\n.user-container,\n.computer-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.user-battlefield,\n.computer-battlefield {\n  height: 350px;\n  width: 350px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.user-battlefield {\n  justify-self: end;\n}\n\n.computer-battlefield {\n  justify-self: start;\n}\n\n.square {\n  border: 1px solid #131c26;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.ship-square {\n  background-color: #0099d6;\n}\n\n.ship-missed {\n  background-color: #9ea0a1;\n}\n\n.ship-hit {\n  background-color: #ff1a1a;\n}\n\n.square:hover {\n  background-color: #23ffcf;\n}\n"],"sourceRoot":""}]);
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
  color: #d1d4dc;
  background-color: #131c26;
}

.content {
  height: 100%;
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: 100px 1fr 100px;
}

.main-section {
  position: relative;
  display: grid;
  grid-template-columns: minmax(400px, 750px) minmax(400px, 750px);
  justify-content: center;
}

.header {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 60px;
  justify-self: end;
}
`, "",{"version":3,"sources":["webpack://./src/styles/global.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,gEAAgE;EAChE,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,iBAAiB;AACnB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  font-size: 1rem;\n  color: #d1d4dc;\n  background-color: #131c26;\n}\n\n.content {\n  height: 100%;\n  width: 100%;\n  padding: 10px;\n  display: grid;\n  grid-template-rows: 100px 1fr 100px;\n}\n\n.main-section {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(400px, 750px) minmax(400px, 750px);\n  justify-content: center;\n}\n\n.header {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n\n.footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nimg {\n  width: 60px;\n  justify-self: end;\n}\n"],"sourceRoot":""}]);
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
  position: relative;
  display: grid;
  grid-template-rows: 100px 100px 1fr;
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
  border: 1px solid #131c26;
  background-color: #d1d4dc;
}

.instructions-one {
  align-self: self-end;
}

.port {
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
  color: #030201;
  background-color: #0099d6;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-btn {
  position: absolute;
  height: 80px;
  width: 160px;
  border: none;
  border-radius: 5px;
  background-color: #18bc9c;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
`, "",{"version":3,"sources":["webpack://./src/styles/startmenu.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,mCAAmC;EACnC,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,yBAAyB;EACzB,yBAAyB;AAC3B;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,uCAAuC;EACvC,gDAAgD;EAChD,uBAAuB;AACzB;;AAEA;;;;;EAKE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;AACA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;;EAEE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;;EAEE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;;;;;EAKE,cAAc;EACd,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,yBAAyB;EACzB,aAAa;EACb,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB","sourcesContent":[".left-section {\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n.right-section {\n  position: relative;\n  display: grid;\n  grid-template-rows: 100px 100px 1fr;\n  justify-items: center;\n  align-items: center;\n}\n\n.start-menu-table {\n  height: 400px;\n  width: 400px;\n  display: grid;\n}\n\ntbody {\n  width: 100%;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.table-row {\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.table-cell {\n  border: 1px solid #131c26;\n  background-color: #d1d4dc;\n}\n\n.instructions-one {\n  align-self: self-end;\n}\n\n.port {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-columns: min-content auto;\n  grid-auto-rows: minmax(min-content, max-content);\n  justify-content: center;\n}\n\n.carrier-berth,\n.battleship-berth,\n.destroyer-berth,\n.submarine-berth,\n.patrol-boat-berth {\n  padding: 10px;\n}\n\n#carrier.horizontal {\n  height: 35px;\n  width: 200px;\n}\n#battleship.horizontal {\n  height: 35px;\n  width: 160px;\n}\n\n#destroyer.horizontal,\n#submarine.horizontal {\n  height: 35px;\n  width: 120px;\n}\n\n#patrol-boat.horizontal {\n  height: 35px;\n  width: 80px;\n}\n\n#carrier.vertical {\n  height: 200px;\n  width: 35px;\n}\n\n#battleship.vertical {\n  height: 160px;\n  width: 35px;\n}\n\n#destroyer.vertical,\n#submarine.vertical {\n  height: 120px;\n  width: 35px;\n}\n\n#patrol-boat.vertical {\n  height: 80px;\n  width: 35px;\n}\n\n#carrier,\n#battleship,\n#destroyer,\n#submarine,\n#patrol-boat {\n  color: #030201;\n  background-color: #0099d6;\n  border-radius: 2px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.start-btn {\n  position: absolute;\n  height: 80px;\n  width: 160px;\n  border: none;\n  border-radius: 5px;\n  background-color: #18bc9c;\n  padding: 10px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7Ozs7Ozs7Ozs7Ozs7QUNBc0M7QUFDMEI7QUFFaEUsTUFBTThNLFNBQVMsR0FBR0EsQ0FBQSxLQUFNO0VBQ3RCMUcsbURBQVUsQ0FBQyxDQUFDO0VBRVo3SCxzREFBUyxDQUFDLENBQUM7RUFFWG1OLGtFQUFxQixDQUFDLENBQUM7QUFDekIsQ0FBQztBQUNEb0IsU0FBUyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYmF0dGxlc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyQUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdGFydC1tZW51LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2dhbWVtZW51LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9nbG9iYWwuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0YXJ0bWVudS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2dhbWVtZW51LmNzcz8yNTkzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2dsb2JhbC5jc3M/ZjBkOCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdGFydG1lbnUuY3NzPzEyYjAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0YXJ0TWVudSB9IGZyb20gXCIuL3N0YXJ0LW1lbnVcIjtcbmltcG9ydCB7IHBsYXlSb3VuZCB9IGZyb20gXCIuL2dhbWUtY29udHJvbGxlclwiO1xuaW1wb3J0IHsgdXNlckF0dGFja3MsIGNvbXB1dGVyQXR0YWNrcyB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFwiLi9zdHlsZXMvZ2FtZW1lbnUuY3NzXCI7XG5cbmNvbnN0IGdhbWVNZW51ID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcblxuICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gIGNvbnN0IGNvbnRhaW5lck9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGNvbnRhaW5lclR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZWZpZWxkT25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZE9uZVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRUd29QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgY29udGFpbmVyT25lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLWNvbnRhaW5lclwiKTtcbiAgY29udGFpbmVyVHdvLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1jb250YWluZXJcIik7XG4gIGJhdHRsZWZpZWxkT25lLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLWJhdHRsZWZpZWxkXCIpO1xuICBiYXR0bGVmaWVsZFR3by5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYmF0dGxlZmllbGRcIik7XG4gIGJhdHRsZWZpZWxkT25lUGFyYS50ZXh0Q29udGVudCA9IFwiUGxheWVyIEJvYXJkXCI7XG4gIGJhdHRsZWZpZWxkVHdvUGFyYS50ZXh0Q29udGVudCA9IFwiQUkgQm9hcmRcIjtcblxuICBjb250YWluZXJPbmUuYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRPbmUpO1xuICBjb250YWluZXJUd28uYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRUd28pO1xuICBjb250YWluZXJPbmUuYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRPbmVQYXJhKTtcbiAgY29udGFpbmVyVHdvLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkVHdvUGFyYSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJPbmUpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVHdvKTtcbn07XG5cbmNvbnN0IHJlbmRlckJvYXJkcyA9ICgpID0+IHtcbiAgY29uc3QgdXNlckJhdHRsZWZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWJhdHRsZWZpZWxkXCIpO1xuICBjb25zdCBjb21wdXRlckJhdHRsZWZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci1iYXR0bGVmaWVsZFwiKTtcblxuICAvLyBSZW5kZXIgdXNlciBnYW1lIGJvYXJkXG4gIGNvbnN0IHJlbmRlclVzZXJCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgIHVzZXJCYXR0bGVmaWVsZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bi5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICAgIGlmIChkYXRhID09PSAxKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLXNxdWFyZVwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAyKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW1pc3NlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAzKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVzZXJCYXR0bGVmaWVsZC5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBSZW5kZXIgY29tcHV0ZXIgZ2FtZSBib2FyZFxuICBjb25zdCByZW5kZXJDb21wdXRlckJvYXJkID0gKGJvYXJkKSA9PiB7XG4gICAgY29tcHV0ZXJCYXR0bGVmaWVsZC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bi5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICAgIGlmIChkYXRhID09PSAyKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW1pc3NlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAzKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXB1dGVyQmF0dGxlZmllbGQuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiB7IHJlbmRlclVzZXJCb2FyZCwgcmVuZGVyQ29tcHV0ZXJCb2FyZCB9O1xufTtcblxuY29uc3QgZ2FtZVdpbm5lciA9ICh3aW5uZXIpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXNlY3Rpb25cIik7XG4gIGNvbnN0IHBvcFVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3Qgd2lubmVyQW5ub3VuY2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICBwb3BVcC5jbGFzc0xpc3QuYWRkKFwicG9wLXVwXCIpO1xuICB3aW5uZXJBbm5vdW5jZXIuY2xhc3NMaXN0LmFkZChcIndpbm5lclwiKTtcbiAgd2lubmVyQW5ub3VuY2VyLnRleHRDb250ZW50ID0gd2lubmVyO1xuICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXN0YXJ0LWJ1dHRvblwiKTtcbiAgcmVzdGFydEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVtYXRjaFwiO1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJtb2RhbC1vcGVuXCIpO1xuXG4gIHBvcFVwLmFwcGVuZENoaWxkKHdpbm5lckFubm91bmNlcik7XG4gIHBvcFVwLmFwcGVuZENoaWxkKHJlc3RhcnRCdXR0b24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wVXApO1xufTtcblxuY29uc3QgZ2FtZU1lbnVFdmVudEhhbmRsZXIgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW5TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXNlY3Rpb25cIik7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJzcXVhcmVcIikge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBkYXRhID0gc3F1YXJlLmRhdGFzZXQucG9zO1xuICAgICAgY29uc3QgYXJyYXkgPSBkYXRhLnNwbGl0KFwiLFwiKTtcbiAgICAgIGNvbnN0IHBvcyA9IFtwYXJzZUludChhcnJheVswXSksIHBhcnNlSW50KGFycmF5WzFdKV07XG5cbiAgICAgIHBsYXlSb3VuZChwb3MpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJyZXN0YXJ0LWJ1dHRvblwiKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJtb2RhbC1vcGVuXCIpO1xuICAgICAgbWFpblNlY3Rpb24udGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAvLyBFbXB0eSBhdHRhY2tlZCBzcXVhcmVzIGhpc3RvcnlcbiAgICAgIHVzZXJBdHRhY2tzLmxlbmd0aCA9IDA7XG4gICAgICBjb21wdXRlckF0dGFja3MubGVuZ3RoID0gMDtcblxuICAgICAgLy8gU3RhcnQgbmV3IGdhbWVcbiAgICAgIHN0YXJ0TWVudSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBnYW1lTWVudSwgcmVuZGVyQm9hcmRzLCBnYW1lV2lubmVyLCBnYW1lTWVudUV2ZW50SGFuZGxlciB9O1xuIiwibGV0IGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzID0gW107XG5sZXQgdmlzaXRlZCA9IFtdO1xuXG5jb25zdCBpc0FycmF5SW5BcnJheSA9IChzb3VyY2UsIHNlYXJjaCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlYXJjaC5sZW5ndGg7IGkrKykge1xuICAgIGxldCBzZWFyY2hFbGUgPSBzZWFyY2hbaV07XG5cbiAgICBpZiAoc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU2VhcmNoIGZvciBlYWNoIFwic2VhcmNoIGFycmF5XCIgZWxlbWVudCBpbiB0aGUgc291cmNlIGFycmF5XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBzb3VyY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgIGxldCBzb3VyY2VFbGUgPSBzb3VyY2Vbal07XG5cbiAgICAgIGlmIChzZWFyY2hFbGVbMF0gPT09IHNvdXJjZUVsZVswXSAmJiBzZWFyY2hFbGVbMV0gPT09IHNvdXJjZUVsZVsxXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGdldEFkakNvb3JkaW5hdGVzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gIGxldCBhZGpQb3NpdGlvbnMgPSBbXTtcbiAgbGV0IG9yaWVudGF0aW9uID0gXCJcIjtcbiAgbGV0IG9uZSA9IGNvb3JkaW5hdGVzWzBdO1xuICBsZXQgdHdvID0gY29vcmRpbmF0ZXNbMV07XG5cbiAgLy8gQ2hlY2sgY29vcmRpbmF0ZXMgb3JpZW50YXRpb25cbiAgaWYgKG9uZVswXSA9PT0gdHdvWzBdICYmIG9uZVsxXSAhPT0gdHdvWzFdKSB7XG4gICAgb3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcbiAgfSBlbHNlIGlmIChvbmVbMF0gIT09IHR3b1swXSAmJiBvbmVbMV0gPT09IHR3b1sxXSkge1xuICAgIG9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICB9XG5cbiAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciBzaGlwIGNvb3JkaW5hdGVzIGFsb25nIHRoZSBZLWF4aXNcbiAgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY29vcmRpbmF0ZXNbaV07XG5cbiAgICAgIGxldCBhZGpMZWZ0ID0gW2VsZW1lbnRbMF0sIGVsZW1lbnRbMV0gLSAxXTtcbiAgICAgIGxldCBhZGpSaWdodCA9IFtlbGVtZW50WzBdLCBlbGVtZW50WzFdICsgMV07XG5cbiAgICAgIGlmIChhZGpMZWZ0WzFdID49IDAgJiYgYWRqTGVmdFsxXSA8PSA5KSB7XG4gICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkakxlZnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWRqUmlnaHRbMV0gPj0gMCAmJiBhZGpSaWdodFsxXSA8PSA5KSB7XG4gICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkalJpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciB0aGUgZmlyc3Qgc3F1YXJlIG9mIHRoZSBzaGlwIGNvb3JkaW5hdGVzXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBsZXQgYWRqVG9wID0gW2VsZW1lbnRbMF0gLSAxLCBlbGVtZW50WzFdXTtcblxuICAgICAgICBpZiAoYWRqVG9wWzBdID49IDAgJiYgYWRqVG9wWzBdIDw9IDkpIHtcbiAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpUb3ApO1xuXG4gICAgICAgICAgbGV0IGxlZnQgPSBbYWRqVG9wWzBdLCBhZGpUb3BbMV0gLSAxXTtcbiAgICAgICAgICBsZXQgcmlnaHQgPSBbYWRqVG9wWzBdLCBhZGpUb3BbMV0gKyAxXTtcblxuICAgICAgICAgIGlmIChsZWZ0WzFdID49IDAgJiYgbGVmdFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChsZWZ0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmlnaHRbMV0gPj0gMCAmJiByaWdodFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChyaWdodCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3IgdGhlIGxhc3Qgc3F1YXJlIG9mIHRoZSBzaGlwIGNvb3JkaW5hdGVzXG4gICAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoIC0gaSA9PT0gMSkge1xuICAgICAgICBsZXQgYWRqQm90dG9tID0gW2VsZW1lbnRbMF0gKyAxLCBlbGVtZW50WzFdXTtcblxuICAgICAgICBpZiAoYWRqQm90dG9tWzBdID49IDAgJiYgYWRqQm90dG9tWzBdIDw9IDkpIHtcbiAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpCb3R0b20pO1xuXG4gICAgICAgICAgbGV0IGxlZnQgPSBbYWRqQm90dG9tWzBdLCBhZGpCb3R0b21bMV0gLSAxXTtcbiAgICAgICAgICBsZXQgcmlnaHQgPSBbYWRqQm90dG9tWzBdLCBhZGpCb3R0b21bMV0gKyAxXTtcblxuICAgICAgICAgIGlmIChsZWZ0WzFdID49IDAgJiYgbGVmdFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChsZWZ0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmlnaHRbMV0gPj0gMCAmJiByaWdodFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChyaWdodCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkalBvc2l0aW9ucztcbiAgfVxuXG4gIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3Igc2hpcCBjb29yZGluYXRlcyBhbG9uZyB0aGUgWC1heGlzXG4gIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY29vcmRpbmF0ZXNbaV07XG5cbiAgICAgIGxldCBhZGpUb3AgPSBbZWxlbWVudFswXSAtIDEsIGVsZW1lbnRbMV1dO1xuICAgICAgbGV0IGFkakJvdHRvbSA9IFtlbGVtZW50WzBdICsgMSwgZWxlbWVudFsxXV07XG5cbiAgICAgIGlmIChhZGpUb3BbMF0gPj0gMCAmJiBhZGpUb3BbMF0gPD0gOSkge1xuICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpUb3ApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWRqQm90dG9tWzBdID49IDAgJiYgYWRqQm90dG9tWzBdIDw9IDkpIHtcbiAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqQm90dG9tKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciB0aGUgZmlyc3Qgc3F1YXJlIG9mIHRoZSBzaGlwIGNvb3JkaW5hdGVzXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBsZXQgYWRqTGVmdCA9IFtlbGVtZW50WzBdLCBlbGVtZW50WzFdIC0gMV07XG5cbiAgICAgICAgaWYgKGFkakxlZnRbMV0gPj0gMCAmJiBhZGpMZWZ0WzFdIDw9IDkpIHtcbiAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpMZWZ0KTtcblxuICAgICAgICAgIGxldCB0b3AgPSBbYWRqTGVmdFswXSAtIDEsIGFkakxlZnRbMV1dO1xuICAgICAgICAgIGxldCBib3R0b20gPSBbYWRqTGVmdFswXSArIDEsIGFkakxlZnRbMV1dO1xuXG4gICAgICAgICAgaWYgKHRvcFswXSA+PSAwICYmIHRvcFswXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaCh0b3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChib3R0b21bMF0gPj0gMCAmJiBib3R0b21bMF0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYm90dG9tKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciB0aGUgbGFzdCBzcXVhcmUgb2YgdGhlIHNoaXAgY29vcmRpbmF0ZXNcbiAgICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggLSBpID09PSAxKSB7XG4gICAgICAgIGxldCBhZGpSaWdodCA9IFtlbGVtZW50WzBdLCBlbGVtZW50WzFdICsgMV07XG5cbiAgICAgICAgaWYgKGFkalJpZ2h0WzFdID49IDAgJiYgYWRqUmlnaHRbMV0gPD0gOSkge1xuICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkalJpZ2h0KTtcblxuICAgICAgICAgIGxldCB0b3AgPSBbYWRqUmlnaHRbMF0gLSAxLCBhZGpSaWdodFsxXV07XG4gICAgICAgICAgbGV0IGJvdHRvbSA9IFthZGpSaWdodFswXSArIDEsIGFkalJpZ2h0WzFdXTtcblxuICAgICAgICAgIGlmICh0b3BbMF0gPj0gMCAmJiB0b3BbMF0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2godG9wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYm90dG9tWzBdID49IDAgJiYgYm90dG9tWzBdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGJvdHRvbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkalBvc2l0aW9ucztcbiAgfVxufTtcblxuY29uc3QgZ2V0UmFuZG9tUG9zaXRpb24gPSAobGVuZ3RoKSA9PiB7XG4gIGxldCB2YWxpZCA9IGZhbHNlO1xuICBsZXQgcG9zO1xuXG4gIHdoaWxlICh2YWxpZCA9PT0gZmFsc2UpIHtcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBwb3MgPSBbeCwgeV07XG5cbiAgICBpZiAoeCArIGxlbmd0aCA8PSAxMCAmJiB5ICsgbGVuZ3RoIDw9IDEwKSB7XG4gICAgICB2YWxpZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBvcztcbn07XG5cbmNvbnN0IGdldExlZ2FsQ29tYm9zID0gKHNoaXBMZW5ndGgpID0+IHtcbiAgY29uc3QgbGVnYWxDb21ib3MgPSBbXG4gICAgW1xuICAgICAgWzAsIDFdLFxuICAgICAgWzAsIDJdLFxuICAgICAgWzAsIDNdLFxuICAgICAgWzAsIDRdLFxuICAgICAgWzAsIDVdLFxuICAgIF0sXG4gICAgW1xuICAgICAgWzEsIDBdLFxuICAgICAgWzIsIDBdLFxuICAgICAgWzMsIDBdLFxuICAgICAgWzQsIDBdLFxuICAgICAgWzUsIDBdLFxuICAgIF0sXG4gIF07XG4gIGNvbnN0IHBvcyA9IGdldFJhbmRvbVBvc2l0aW9uKHNoaXBMZW5ndGgpO1xuXG4gIGxldCBjb29yZGluYXRlcyA9IFtdO1xuICBsZXQgc2V0O1xuXG4gIC8vIFJhbmRvbWl6ZSBzZXQgb2YgY29tYm9zIHRvIGJlIHVzZWRcbiAgaWYgKHNoaXBMZW5ndGggJSAyID09PSAwKSB7XG4gICAgc2V0ID0gbGVnYWxDb21ib3NbMF07XG4gIH0gZWxzZSB7XG4gICAgc2V0ID0gbGVnYWxDb21ib3NbMV07XG4gIH1cblxuICBsZXQgbGVuZ3RoRGlmZiA9IHNldC5sZW5ndGggLSBzaGlwTGVuZ3RoO1xuICBsZXQgYXJyYXlMZW5ndGggPSBzZXQubGVuZ3RoIC0gMSAtIGxlbmd0aERpZmY7XG5cbiAgY29vcmRpbmF0ZXMucHVzaChwb3MpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHZhbHVlcyA9IHNldFtpXTtcblxuICAgIGxldCB4ID0gcG9zWzBdO1xuICAgIGxldCB5ID0gcG9zWzFdO1xuICAgIGxldCBtb3ZlID0gW3ggKyB2YWx1ZXNbMF0sIHkgKyB2YWx1ZXNbMV1dO1xuXG4gICAgY29vcmRpbmF0ZXMucHVzaChtb3ZlKTtcbiAgfVxuXG4gIHJldHVybiBjb29yZGluYXRlcztcbn07XG5cbmNvbnN0IGdldENvbXB1dGVyU2hpcHMgPSAoKSA9PiB7XG4gIGxldCBsZW5ndGggPSA1O1xuICBsZXQgcmVwZWF0ID0gMTtcblxuICAvLyBHZXQgY29vcmRpbmF0ZXMgZm9yIGVhY2ggc2hpcFxuICB3aGlsZSAobGVuZ3RoID4gMSkge1xuICAgIGxldCBjb29yZGluYXRlcyA9IGdldExlZ2FsQ29tYm9zKGxlbmd0aCk7XG4gICAgbGV0IGl0ZW1WaXNpdGVkID0gaXNBcnJheUluQXJyYXkodmlzaXRlZCwgY29vcmRpbmF0ZXMpO1xuXG4gICAgd2hpbGUgKGl0ZW1WaXNpdGVkID09PSB0cnVlKSB7XG4gICAgICBjb29yZGluYXRlcyA9IGdldExlZ2FsQ29tYm9zKGxlbmd0aCk7XG4gICAgICBpdGVtVmlzaXRlZCA9IGlzQXJyYXlJbkFycmF5KHZpc2l0ZWQsIGNvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICBjb21wdXRlclNoaXBDb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGVzKTtcblxuICAgIC8vIFB1c2ggY29vcmRpbmF0ZXMgdG8gdGhlIHZpc2l0ZWQgYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGVzW2ldO1xuXG4gICAgICB2aXNpdGVkLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWRqQ29vcmRpbmF0ZXMgPSBnZXRBZGpDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG5cbiAgICAvLyBQdXNoIGFkamFjZW50IGNvb3JkaW5hdGVzIHRvIHRoZSB2aXNpdGVkIGFycmF5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGpDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNvb3JkaW5hdGUgPSBhZGpDb29yZGluYXRlc1tpXTtcblxuICAgICAgdmlzaXRlZC5wdXNoKGNvb3JkaW5hdGUpO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZXMgYm90aCB0aGUgZGVzdHJveWVyIGFuZCB0aGUgc3VibWFyaW5lIGhhdmUgdGhlIHNhbWUgbGVuZ3RoXG4gICAgaWYgKGxlbmd0aCA9PT0gMyAmJiByZXBlYXQgPT09IDEpIHtcbiAgICAgIHJlcGVhdCAtPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggLT0gMTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdldENvbXB1dGVyU2hpcHMsIGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzLCB2aXNpdGVkIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXJTaGlwcywgU2hpcCB9IGZyb20gXCIuL3NoaXBzXCI7XG5cbmNvbnN0IEdhbWVCb2FyZCA9ICgpID0+IHtcbiAgbGV0IGJvYXJkID0gW107XG5cbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGJvYXJkW2ldW2pdID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICBjb25zdCBwbGF5ZXJTaGlwcyA9IFBsYXllclNoaXBzKCk7XG4gIGNvbnN0IHNoaXBzID0gcGxheWVyU2hpcHMuZ2V0U2hpcHMoKTtcblxuICBjb25zdCBwb3B1bGF0ZUJvYXJkID0gKGFycmF5KSA9PiB7XG4gICAgcGxheWVyU2hpcHMuYWRkU2hpcENvb3JkaW5hdGVzKGFycmF5KTtcblxuICAgIC8vIFBsYWNlIGFsbCBzaGlwcyBvbnRvIHRoZSBib2FyZFxuICAgIFNoaXAoKS5wbGFjZVNoaXBzKGJvYXJkLCBzaGlwcyk7XG4gIH07XG5cbiAgY29uc3QgZmluZEF0dGFja2VkU2hpcCA9IChwb3MpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGNvbnN0IGFycmF5ID0gc2hpcHNba2V5XS5jb29yZGluYXRlcztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaV07XG5cbiAgICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHBvc1swXSAmJiBlbGVtZW50WzFdID09PSBwb3NbMV0pIHtcbiAgICAgICAgICByZXR1cm4gc2hpcHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHBvcykgPT4ge1xuICAgIGxldCB4ID0gcG9zWzBdO1xuICAgIGxldCB5ID0gcG9zWzFdO1xuXG4gICAgaWYgKGJvYXJkW3hdW3ldID09PSAxKSB7XG4gICAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSBmaW5kQXR0YWNrZWRTaGlwKHBvcyk7XG5cbiAgICAgIC8vIE1hcmsgYm9hcmQgcG9zaXRpb24gYXMgYXR0YWNrZWRcbiAgICAgIGJvYXJkW3hdW3ldID0gMztcblxuICAgICAgLy8gQWRkIGhpdCBjb3VudCB0byBhdHRhY2tlZCBzaGlwXG4gICAgICBTaGlwKCkuaGl0KGF0dGFja2VkU2hpcCk7XG4gICAgfSBlbHNlIGlmIChib2FyZFt4XVt5XSA9PT0gMCkge1xuICAgICAgLy8gTWFyayBib2FyZCBwb3NpdGlvbiBhcyBhdHRhY2tlZFxuICAgICAgYm9hcmRbeF1beV0gPSAyO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhbGxTaGlwc0Rlc3Ryb3llZCA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBjb25zdCBzaGlwU3RhdGUgPSBzaGlwc1trZXldLmRlc3Ryb3llZDtcblxuICAgICAgaWYgKHNoaXBTdGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb3VudCA9PT0gNSA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUJvYXJkLFxuICAgIGdldEJvYXJkLFxuICAgIHBvcHVsYXRlQm9hcmQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbGxTaGlwc0Rlc3Ryb3llZCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZS1ib2FyZFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyByZW5kZXJCb2FyZHMsIGdhbWVXaW5uZXIsIGdhbWVNZW51RXZlbnRIYW5kbGVyIH0gZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuaW1wb3J0IHsgdXNlclNoaXBzQ29vcmRpbmF0ZXMgfSBmcm9tIFwiLi9zdGFydC1tZW51XCI7XG5pbXBvcnQgeyBjb21wdXRlclNoaXBDb29yZGluYXRlcyB9IGZyb20gXCIuL2NvbXB1dGVyQUlcIjtcblxubGV0IHVzZXJHYW1lQm9hcmQ7XG5sZXQgY29tcHV0ZXJHYW1lQm9hcmQ7XG5sZXQgdXNlcjtcbmxldCBjb21wdXRlcjtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgLy8gQ3JlYXRlIFBsYXllciBvYmplY3RzIGFuZCBHYW1lQm9hcmQgb2JqZWN0cyBmb3IgZWFjaCBwbGF5ZXJcbiAgdXNlciA9IFBsYXllcihcInVzZXJcIik7XG4gIGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXIgQUlcIik7XG5cbiAgdXNlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBjb21wdXRlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuXG4gIC8vIENyZWF0ZSBuZXcgYm9hcmRzIGZvciBlYWNoIHBsYXllclxuICB1c2VyR2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG5cbiAgLy8gUG9wdWxhdGUgcGxheWVyIGJvYXJkcyB3aXRoIHNoaXBzXG4gIHVzZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCh1c2VyU2hpcHNDb29yZGluYXRlcyk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQoY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gIC8vICAgR2V0IHBsYXllciBib2FyZHMgZnJvbSBHYW1lQm9hcmQgb2JqZWN0c1xuICBjb25zdCB1c2VyQm9hcmQgPSB1c2VyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuXG4gIC8vIEluaXRpYWwgcGxheWVyIGJvYXJkcyBhcmUgcmVuZGVyZWRcbiAgcmVuZGVyQm9hcmRzKCkucmVuZGVyVXNlckJvYXJkKHVzZXJCb2FyZCk7XG4gIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoY29tcHV0ZXJCb2FyZCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBldmVudCBoYW5kbGVyXG4gIGdhbWVNZW51RXZlbnRIYW5kbGVyKCk7XG59O1xuXG5jb25zdCBwbGF5Um91bmQgPSAocG9zKSA9PiB7XG4gIGxldCB1c2VyQXR0YWNrcyA9IHVzZXIuYXR0YWNrKGNvbXB1dGVyLCBjb21wdXRlckdhbWVCb2FyZCwgcG9zKTtcblxuICBpZiAodXNlckF0dGFja3MgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIC8vIFVwZGF0ZSBjb21wdXRlciBib2FyZCBvbiB0aGUgc2NyZWVuXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gICAgcmVuZGVyQm9hcmRzKCkucmVuZGVyQ29tcHV0ZXJCb2FyZChjb21wdXRlckJvYXJkKTtcblxuICAgIC8vIENoZWNrIGlmIGFsbCBjb21wdXRlciBzaGlwcyBhcmUgZGVzdHJveWVkXG4gICAgaWYgKGNvbXB1dGVyR2FtZUJvYXJkLmFsbFNoaXBzRGVzdHJveWVkKCkgPT09IHRydWUpIHtcbiAgICAgIGdhbWVXaW5uZXIoXCJZb3UgV2luIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb21wdXRlci5hdHRhY2sodXNlciwgdXNlckdhbWVCb2FyZCwgcG9zKTtcblxuICAgIC8vIFVwZGF0ZSB1c2VyIGJvYXJkIG9uIHRoZSBzY3JlZW5cbiAgICBjb25zdCB1c2VyQm9hcmQgPSB1c2VyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gICAgcmVuZGVyQm9hcmRzKCkucmVuZGVyVXNlckJvYXJkKHVzZXJCb2FyZCk7XG5cbiAgICAvLyBDaGVjayBpZiBhbGwgdXNlciBzaGlwcyBhcmUgZGVzdHJveWVkXG4gICAgaWYgKHVzZXJHYW1lQm9hcmQuYWxsU2hpcHNEZXN0cm95ZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgZ2FtZVdpbm5lcihcIkNvbXB1dGVyIFdpbnMhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHsgR2FtZSwgcGxheVJvdW5kIH07XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy9nbG9iYWwuY3NzXCI7XG5pbXBvcnQgSW1nIGZyb20gXCIuL2ltYWdlcy9zdWJtYXJpbmUucG5nXCI7XG5cbmNvbnN0IHBhZ2VMYXlvdXQgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIGNvbnN0IGxvZ28gPSBuZXcgSW1hZ2UoKTtcblxuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcbiAgbWFpbi5jbGFzc0xpc3QuYWRkKFwibWFpbi1zZWN0aW9uXCIpO1xuICBmb290ZXIuY2xhc3NMaXN0LmFkZChcImZvb3RlclwiKTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICBjb3B5cmlnaHQuY2xhc3NMaXN0LmFkZChcImNvcHlyaWdodFwiKTtcbiAgY29weXJpZ2h0LnRleHRDb250ZW50ID0gXCJDb3B5cmlnaHQgQCBCYXR0bGVzaGlwIDIwMjNcIjtcbiAgbG9nby5zcmMgPSBJbWc7XG4gIGxvZ28uYWx0ID0gXCJTdWJtYXJpbmUgbG9nb1wiO1xuXG4gIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChsb2dvKTtcbiAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodCk7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChtYWluKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChmb290ZXIpO1xufTtcblxuZXhwb3J0IHsgcGFnZUxheW91dCB9O1xuIiwibGV0IHVzZXJBdHRhY2tzID0gW107XG5sZXQgY29tcHV0ZXJBdHRhY2tzID0gW107XG5cbmNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuXG4gIGNvbnN0IGlzQXR0YWNrTGVnYWwgPSAoZW5lbXksIHBvcykgPT4ge1xuICAgIGxldCBhcnJheTtcblxuICAgIGlmIChlbmVteSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIGFycmF5ID0gY29tcHV0ZXJBdHRhY2tzLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFycmF5ID0gdXNlckF0dGFja3Muc2xpY2UoKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoYXJyYXkubGVuZ3RoKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXkuc2hpZnQoKTtcbiAgICAgIGlmIChlbGVtZW50WzBdID09PSBwb3NbMF0gJiYgZWxlbWVudFsxXSA9PT0gcG9zWzFdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGVuZW15LCBHYW1lQm9hcmQsIHBvcykgPT4ge1xuICAgIGNvbnN0IGVuZW15TmFtZSA9IGVuZW15LmdldE5hbWUoKTtcblxuICAgIGlmIChlbmVteU5hbWUgPT09IFwidXNlclwiKSB7XG4gICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IHBvcyA9IFt4LCB5XTtcblxuICAgICAgbGV0IGNoZWNrTGVnYWwgPSBpc0F0dGFja0xlZ2FsKGVuZW15TmFtZSwgcG9zKTtcblxuICAgICAgaWYgKGNoZWNrTGVnYWwgPT09IHRydWUpIHtcbiAgICAgICAgY29tcHV0ZXJBdHRhY2tzLnB1c2gocG9zKTtcbiAgICAgICAgR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2socG9zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF0dGFjayhlbmVteSwgR2FtZUJvYXJkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNoZWNrTGVnYWwgPSBpc0F0dGFja0xlZ2FsKGVuZW15TmFtZSwgcG9zKTtcblxuICAgICAgaWYgKGNoZWNrTGVnYWwgPT09IHRydWUpIHtcbiAgICAgICAgdXNlckF0dGFja3MucHVzaChwb3MpO1xuICAgICAgICBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBnZXROYW1lLCBpc0F0dGFja0xlZ2FsLCBhdHRhY2sgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciwgdXNlckF0dGFja3MsIGNvbXB1dGVyQXR0YWNrcyB9O1xuIiwiY29uc3QgUGxheWVyU2hpcHMgPSAoKSA9PiB7XG4gIGxldCBzaGlwcyA9IHtcbiAgICBjYXJyaWVyOiB7XG4gICAgICBsZW5ndGg6IDUsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgYmF0dGxlc2hpcDoge1xuICAgICAgbGVuZ3RoOiA0LFxuICAgICAgaGl0czogMCxcbiAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgICBjb29yZGluYXRlczogW10sXG4gICAgfSxcblxuICAgIGRlc3Ryb3llcjoge1xuICAgICAgbGVuZ3RoOiAzLFxuICAgICAgaGl0czogMCxcbiAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgICBjb29yZGluYXRlczogW10sXG4gICAgfSxcblxuICAgIHN1Ym1hcmluZToge1xuICAgICAgbGVuZ3RoOiAzLFxuICAgICAgaGl0czogMCxcbiAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgICBjb29yZGluYXRlczogW10sXG4gICAgfSxcblxuICAgIHBhdHJvbEJvYXQ6IHtcbiAgICAgIGxlbmd0aDogMixcbiAgICAgIGhpdHM6IDAsXG4gICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgY29vcmRpbmF0ZXM6IFtdLFxuICAgIH0sXG4gIH07XG4gIGNvbnN0IGdldFNoaXBzID0gKCkgPT4gc2hpcHM7XG5cbiAgY29uc3QgYWRkU2hpcENvb3JkaW5hdGVzID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IGNvcHkgPSBhcnJheS5zbGljZSgpO1xuXG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBsZXQgc2hpcEFycmF5ID0gc2hpcHNba2V5XS5jb29yZGluYXRlcztcbiAgICAgIGxldCBhcnIgPSBjb3B5LnNoaWZ0KCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNoaXBBcnJheS5wdXNoKGFycltpXSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGdldFNoaXBzLCBhZGRTaGlwQ29vcmRpbmF0ZXMgfTtcbn07XG5cbmNvbnN0IFNoaXAgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYWNlU2hpcHMgPSAoYm9hcmQsIHNoaXBzKSA9PiB7XG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBsZXQgYXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpXTtcbiAgICAgICAgY29uc3QgeCA9IGVsZW1lbnRbMF07XG4gICAgICAgIGNvbnN0IHkgPSBlbGVtZW50WzFdO1xuXG4gICAgICAgIGJvYXJkW3hdW3ldID0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKHNoaXApID0+IHtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgY29uc3QgaGl0c0NvdW50ID0gc2hpcC5oaXRzO1xuXG4gICAgLy8gY2hlY2sgc2hpcCBsZW5ndGggYW5kIG5vIG9mIHRpbWVzIGl0cyBiZWVuIGhpdFxuICAgIHJldHVybiBzaGlwTGVuZ3RoID09PSBoaXRzQ291bnQgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgaGl0ID0gKHNoaXApID0+IHtcbiAgICBzaGlwLmhpdHMgKz0gMTtcblxuICAgIC8vIEFmdGVyIGV2ZXJ5IGhpdCwgY2hlY2sgaWYgdGhlIHNoaXAgaXMgZGVzdHJveWVkXG4gICAgY29uc3QgY2hlY2tTaGlwID0gaXNTdW5rKHNoaXApO1xuXG4gICAgaWYgKGNoZWNrU2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgc2hpcC5kZXN0cm95ZWQgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBwbGFjZVNoaXBzLCBoaXQgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllclNoaXBzLCBTaGlwIH07XG4iLCJpbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lLWJvYXJkXCI7XG5pbXBvcnQgeyBnYW1lTWVudSB9IGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7XG4gIGdldENvbXB1dGVyU2hpcHMsXG4gIGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzLFxuICB2aXNpdGVkLFxufSBmcm9tIFwiLi9jb21wdXRlckFJXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9zdGFydG1lbnUuY3NzXCI7XG5cbmNvbnN0IGdldFN0YXJ0U2NyZWVuQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuXG4gIC8vIENyZWF0ZSBhIG5ldyBib2FyZFxuICBnYW1lQm9hcmQuY3JlYXRlQm9hcmQoKTtcblxuICBjb25zdCBib2FyZCA9IGdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuXG4gIHJldHVybiBib2FyZDtcbn07XG5cbmNvbnN0IHN0YXJ0TWVudSA9ICgpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXNlY3Rpb25cIik7XG4gIGNvbnN0IGxlZnRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgcmlnaHRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKTtcbiAgY29uc3QgcGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBjb25zdCBwYXJhVHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY2FycmllckJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlc2hpcEJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZGVzdHJveWVyQmVydGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzdWJtYXJpbmVCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHBhdHJvbEJvYXRCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgbGVmdFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImxlZnQtc2VjdGlvblwiKTtcbiAgcmlnaHRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJyaWdodC1zZWN0aW9uXCIpO1xuICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwic3RhcnQtbWVudS10YWJsZVwiKTtcbiAgcGFyYS5jbGFzc0xpc3QuYWRkKFwiaW5zdHJ1Y3Rpb25zLW9uZVwiKTtcbiAgcGFyYS50ZXh0Q29udGVudCA9IFwiRHJhZyBhbmQgZHJvcCBzaGlwc1wiO1xuICBwYXJhVHdvLmNsYXNzTGlzdC5hZGQoXCJpbnN0cnVjdGlvbnMtdHdvXCIpO1xuICBwYXJhVHdvLnRleHRDb250ZW50ID0gXCJEb3VibGUgY2xpY2sgdG8gcm90YXRlXCI7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3J0XCIpO1xuICBjYXJyaWVyQmVydGguY2xhc3NMaXN0LmFkZChcImNhcnJpZXItYmVydGhcIik7XG4gIGJhdHRsZXNoaXBCZXJ0aC5jbGFzc0xpc3QuYWRkKFwiYmF0dGxlc2hpcC1iZXJ0aFwiKTtcbiAgZGVzdHJveWVyQmVydGguY2xhc3NMaXN0LmFkZChcImRlc3Ryb3llci1iZXJ0aFwiKTtcbiAgc3VibWFyaW5lQmVydGguY2xhc3NMaXN0LmFkZChcInN1Ym1hcmluZS1iZXJ0aFwiKTtcbiAgcGF0cm9sQm9hdEJlcnRoLmNsYXNzTGlzdC5hZGQoXCJwYXRyb2wtYm9hdC1iZXJ0aFwiKTtcbiAgY2Fycmllci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgY2Fycmllci5pZCA9IFwiY2FycmllclwiO1xuICBjYXJyaWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgY2Fycmllci5kYXRhc2V0LndpZHRoID0gNTtcbiAgY2Fycmllci5kcmFnZ2FibGUgPSB0cnVlO1xuICBiYXR0bGVzaGlwLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBiYXR0bGVzaGlwLmlkID0gXCJiYXR0bGVzaGlwXCI7XG4gIGJhdHRsZXNoaXAuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBiYXR0bGVzaGlwLmRhdGFzZXQud2lkdGggPSA0O1xuICBiYXR0bGVzaGlwLmRyYWdnYWJsZSA9IHRydWU7XG4gIGRlc3Ryb3llci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgZGVzdHJveWVyLmlkID0gXCJkZXN0cm95ZXJcIjtcbiAgZGVzdHJveWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgZGVzdHJveWVyLmRhdGFzZXQud2lkdGggPSAzO1xuICBkZXN0cm95ZXIuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgc3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBzdWJtYXJpbmUuaWQgPSBcInN1Ym1hcmluZVwiO1xuICBzdWJtYXJpbmUuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBzdWJtYXJpbmUuZGF0YXNldC53aWR0aCA9IDM7XG4gIHN1Ym1hcmluZS5kcmFnZ2FibGUgPSB0cnVlO1xuICBwYXRyb2xCb2F0LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBwYXRyb2xCb2F0LmlkID0gXCJwYXRyb2wtYm9hdFwiO1xuICBwYXRyb2xCb2F0LmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgcGF0cm9sQm9hdC5kYXRhc2V0LndpZHRoID0gMjtcbiAgcGF0cm9sQm9hdC5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2V0U3RhcnRTY3JlZW5Cb2FyZCgpO1xuICAvLyBDcmVhdGUgYSBncmlkIG9mIHRhYmxlIHJvd3MgYW5kIHRhYmxlIGNlbGxzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0YWJsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAgIHRhYmxlUm93LmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1yb3dcIik7XG4gICAgdGFibGVSb3cuaWQgPSBgZHJvcHpvbmUtJHtpfWA7XG5cbiAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1jZWxsXCIpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRhYmxlUm93KTtcbiAgfVxuXG4gIGNhcnJpZXJCZXJ0aC5hcHBlbmRDaGlsZChjYXJyaWVyKTtcbiAgYmF0dGxlc2hpcEJlcnRoLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBkZXN0cm95ZXJCZXJ0aC5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzdWJtYXJpbmVCZXJ0aC5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBwYXRyb2xCb2F0QmVydGguYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcnJpZXJCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXBCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc3Ryb3llckJlcnRoKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lQmVydGgpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0QmVydGgpO1xuICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChwYXJhKTtcbiAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHBhcmFUd28pO1xuICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdFNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRTZWN0aW9uKTtcbn07XG5cbmxldCB1c2VyU2hpcHNDb29yZGluYXRlcyA9IFtdO1xuXG5jb25zdCBhbGxTaGlwc1BsYWNlZCA9ICgpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yaWdodC1zZWN0aW9uXCIpO1xuICBjb25zdCBwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3J0XCIpO1xuICBjb25zdCBub2RlTGlzdCA9IHBvcnQuY2hpbGROb2RlcztcblxuICBsZXQgc2hpcHMgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gbm9kZUxpc3RbaV07XG5cbiAgICBpZiAoZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHNoaXBzICs9IDE7XG4gICAgfVxuICB9XG5cbiAgLy8gQ3JlYXRlIFwic3RhcnQtZ2FtZVwiIGJ1dHRvbiB3aGVuIGFsbCBzaGlwcyBhcmUgcGxhY2VkIG9uIHRoZSBib2FyZFxuICBpZiAoc2hpcHMgPT09IDApIHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzdGFydC1idG5cIik7XG4gICAgYnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiU3RhcnQgR2FtZVwiO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XG4gIH1cbn07XG5cbmNvbnN0IGlzRHJvcFZhbGlkID0gKGluZGV4WCwgaW5kZXhZLCBzaGlwSGVpZ2h0LCBzaGlwV2lkdGgsIG5vZGVMaXN0KSA9PiB7XG4gIC8vIElmIHNoaXAgZHJvcCBleGNlZWRzIHRoZSBib3VuZCBvZiB0aGUgYm9hcmQsIHJldHVybiBmYWxzZVxuICBpZiAoaW5kZXhZICsgc2hpcFdpZHRoID4gMTApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiBUaGlzIGNoZWNrcyBpZiB0aGVyZSBpcyBhIHNoaXAgdG8gdGhlIGltbWVkaWF0ZSB0b3Agb2YgdGhlIFxuICBcImRyb3Agc2hpcFwiLCBhbmQgc3RvcHMgZXhlY3V0aW9uIGlmIGEgcGxhY2VkIHNoaXAgaXMgZGV0ZWN0ZWQuICovXG4gIGNvbnN0IGNoZWNrVG9wID0gKCkgPT4ge1xuICAgIGxldCBkcm9wU3F1YXJlID0gbm9kZUxpc3RbaW5kZXhZXTtcbiAgICBsZXQgcGFyZW50ID0gZHJvcFNxdWFyZS5wYXJlbnROb2RlO1xuICAgIGxldCBwYXJlbnRTaWJsaW5nID0gcGFyZW50LnByZXZpb3VzU2libGluZztcbiAgICBsZXQgc3RhcnRJbmRleCA9IGluZGV4WSAtIDE7XG5cbiAgICBpZiAocGFyZW50U2libGluZyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwV2lkdGggKyAyOyBpKyspIHtcbiAgICAgIC8vIENoZWNrcyBjaGlsZCBub2RlcyBvZiB0aGUgcGFyZW50IHNpYmxpbmdcbiAgICAgIGxldCBzcXVhcmVJbmRleCA9IHN0YXJ0SW5kZXggKyBpO1xuICAgICAgbGV0IG5vZGVMaXN0ID0gcGFyZW50U2libGluZy5jaGlsZE5vZGVzO1xuICAgICAgbGV0IHNxdWFyZSA9IG5vZGVMaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyogVGhpcyBjaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIHRvIHRoZSBpbW1lZGlhdGUgcmlnaHQgb2YgdGhlIFxuICBcImRyb3Agc2hpcFwiLCBhbmQgc3RvcHMgZXhlY3V0aW9uIGlmIGEgcGxhY2VkIHNoaXAgaXMgZGV0ZWN0ZWQuICovXG4gIGNvbnN0IGNoZWNrUmlnaHQgPSAoKSA9PiB7XG4gICAgbGV0IGRyb3BTcXVhcmUgPSBub2RlTGlzdFtpbmRleFldO1xuICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgbGV0IGdyYW5kUGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgbGV0IHBhcmVudExpc3QgPSBncmFuZFBhcmVudC5jaGlsZE5vZGVzO1xuICAgIGxldCBzcXVhcmVJbmRleCA9IGluZGV4WSArIHNoaXBXaWR0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEhlaWdodDsgaSsrKSB7XG4gICAgICBsZXQgaW5kZXggPSBpbmRleFggKyBpO1xuICAgICAgbGV0IGNoaWxkcmVuID0gcGFyZW50TGlzdFtpbmRleF07XG4gICAgICBsZXQgbGlzdCA9IGNoaWxkcmVuLmNoaWxkTm9kZXM7XG4gICAgICBsZXQgc3F1YXJlID0gbGlzdFtzcXVhcmVJbmRleF07XG5cbiAgICAgIGlmIChzcXVhcmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNxdWFyZUNsYXNzID0gc3F1YXJlLmNsYXNzTmFtZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImNhcnJpZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJiYXR0bGVzaGlwXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiZGVzdHJveWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwic3VibWFyaW5lXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwicGF0cm9sLWJvYXRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCB0byB0aGUgaW1tZWRpYXRlIGJvdHRvbSBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tCb3R0b20gPSAoKSA9PiB7XG4gICAgbGV0IGRyb3BTcXVhcmUgPSBub2RlTGlzdFtpbmRleFldO1xuICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgbGV0IHBhcmVudFNpYmxpbmcgPSBwYXJlbnQubmV4dFNpYmxpbmc7XG4gICAgbGV0IHN0YXJ0SW5kZXggPSBpbmRleFkgLSAxO1xuXG4gICAgaWYgKHBhcmVudFNpYmxpbmcgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFdpZHRoICsgMjsgaSsrKSB7XG4gICAgICAvLyBDaGVja3MgY2hpbGQgbm9kZXMgb2YgdGhlIHBhcmVudCBzaWJsaW5nXG4gICAgICBsZXQgc3F1YXJlSW5kZXggPSBzdGFydEluZGV4ICsgaTtcbiAgICAgIGxldCBub2RlTGlzdCA9IHBhcmVudFNpYmxpbmcuY2hpbGROb2RlcztcbiAgICAgIGxldCBzcXVhcmUgPSBub2RlTGlzdFtzcXVhcmVJbmRleF07XG5cbiAgICAgIGlmIChzcXVhcmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNxdWFyZUNsYXNzID0gc3F1YXJlLmNsYXNzTmFtZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImNhcnJpZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJiYXR0bGVzaGlwXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiZGVzdHJveWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwic3VibWFyaW5lXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwicGF0cm9sLWJvYXRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCB0byB0aGUgaW1tZWRpYXRlIGxlZnQgb2YgdGhlIFxuICBcImRyb3Agc2hpcFwiLCBhbmQgc3RvcHMgZXhlY3V0aW9uIGlmIGEgcGxhY2VkIHNoaXAgaXMgZGV0ZWN0ZWQuICovXG4gIGNvbnN0IGNoZWNrTGVmdCA9ICgpID0+IHtcbiAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W2luZGV4WV07XG4gICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICBsZXQgZ3JhbmRQYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICBsZXQgcGFyZW50TGlzdCA9IGdyYW5kUGFyZW50LmNoaWxkTm9kZXM7XG4gICAgbGV0IHNxdWFyZUluZGV4ID0gaW5kZXhZIC0gMTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEhlaWdodDsgaSsrKSB7XG4gICAgICBsZXQgaW5kZXggPSBpbmRleFggKyBpO1xuICAgICAgbGV0IGNoaWxkcmVuID0gcGFyZW50TGlzdFtpbmRleF07XG4gICAgICBsZXQgbGlzdCA9IGNoaWxkcmVuLmNoaWxkTm9kZXM7XG4gICAgICBsZXQgc3F1YXJlID0gbGlzdFtzcXVhcmVJbmRleF07XG5cbiAgICAgIGlmIChzcXVhcmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNxdWFyZUNsYXNzID0gc3F1YXJlLmNsYXNzTmFtZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImNhcnJpZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJiYXR0bGVzaGlwXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiZGVzdHJveWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwic3VibWFyaW5lXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwicGF0cm9sLWJvYXRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGxldCB0b3BWYWxpZCA9IGNoZWNrVG9wKCk7XG4gIGxldCByaWdodFZhbGlkID0gY2hlY2tSaWdodCgpO1xuICBsZXQgYm90dG9tVmFsaWQgPSBjaGVja0JvdHRvbSgpO1xuICBsZXQgbGVmdFZhbGlkID0gY2hlY2tMZWZ0KCk7XG5cbiAgaWYgKFxuICAgIHRvcFZhbGlkID09PSB0cnVlICYmXG4gICAgcmlnaHRWYWxpZCA9PT0gdHJ1ZSAmJlxuICAgIGJvdHRvbVZhbGlkID09PSB0cnVlICYmXG4gICAgbGVmdFZhbGlkID09PSB0cnVlXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKFxuICAgIHRvcFZhbGlkID09PSBmYWxzZSB8fFxuICAgIHJpZ2h0VmFsaWQgPT09IGZhbHNlIHx8XG4gICAgYm90dG9tVmFsaWQgPT09IGZhbHNlIHx8XG4gICAgbGVmdFZhbGlkID09PSBmYWxzZVxuICApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IHN0YXJ0TWVudUV2ZW50SGFuZGxlciA9ICgpID0+IHtcbiAgY29uc3QgbWFpblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKFxuICAgICAgZWxlbWVudC5pZCA9PT0gXCJjYXJyaWVyXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwiYmF0dGxlc2hpcFwiIHx8XG4gICAgICBlbGVtZW50LmlkID09PSBcImRlc3Ryb3llclwiIHx8XG4gICAgICBlbGVtZW50LmlkID09PSBcInN1Ym1hcmluZVwiIHx8XG4gICAgICBlbGVtZW50LmlkID09PSBcInBhdHJvbC1ib2F0XCJcbiAgICApIHtcbiAgICAgIGxldCBoZWlnaHQgPSBlbGVtZW50LmRhdGFzZXQuaGVpZ2h0O1xuICAgICAgbGV0IHdpZHRoID0gZWxlbWVudC5kYXRhc2V0LndpZHRoO1xuXG4gICAgICBlbGVtZW50LmRhdGFzZXQuaGVpZ2h0ID0gd2lkdGg7XG4gICAgICBlbGVtZW50LmRhdGFzZXQud2lkdGggPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVwbGFjZShcImhvcml6b250YWxcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlcGxhY2UoXCJ2ZXJ0aWNhbFwiLCBcImhvcml6b250YWxcIik7XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldC5pZDtcblxuICAgIGlmIChcbiAgICAgIGVsZW1lbnQgPT09IFwiY2FycmllclwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcImJhdHRsZXNoaXBcIiB8fFxuICAgICAgZWxlbWVudCA9PT0gXCJkZXN0cm95ZXJcIiB8fFxuICAgICAgZWxlbWVudCA9PT0gXCJzdWJtYXJpbmVcIiB8fFxuICAgICAgZWxlbWVudCA9PT0gXCJwYXRyb2wtYm9hdFwiXG4gICAgKSB7XG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBlbGVtZW50KTtcblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgbGV0IHN0ciA9IGVsZW1lbnQ7XG4gICAgICAgIGxldCBsZXR0ZXIgPSBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGxldCB0ZXh0ID0gc3RyLnJlcGxhY2Uoc3RyLmNoYXJBdCgwKSwgbGV0dGVyKTtcbiAgICAgICAgZS50YXJnZXQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gXCJcIjtcbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJ0YWJsZS1jZWxsXCIpIHtcbiAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzIzZmZjZlwiO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidGFibGUtY2VsbFwiKSB7XG4gICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInRhYmxlLWNlbGxcIikge1xuICAgICAgY29uc3QgZHJvcHpvbmUgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGRyb3B6b25lLnBhcmVudE5vZGU7XG4gICAgICBjb25zdCBub2RlTGlzdCA9IHBhcmVudC5jaGlsZE5vZGVzO1xuICAgICAgY29uc3QgZGF0YSA9IGRyb3B6b25lLmRhdGFzZXQucG9zO1xuICAgICAgY29uc3QgYXJyYXkgPSBkYXRhLnNwbGl0KFwiLFwiKTtcbiAgICAgIGNvbnN0IHggPSBwYXJzZUludChhcnJheVswXSk7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgY29uc3QgZHJhZ2dhYmxlSWQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKTtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcmFnZ2FibGVJZCk7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IGRyYWdnYWJsZUVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgY29uc3Qgc2hpcEhlaWdodCA9IHBhcnNlSW50KGRyYWdnYWJsZUVsZW1lbnQuZGF0YXNldC5oZWlnaHQpO1xuICAgICAgY29uc3Qgc2hpcFdpZHRoID0gcGFyc2VJbnQoZHJhZ2dhYmxlRWxlbWVudC5kYXRhc2V0LndpZHRoKTtcblxuICAgICAgLy8gVGhpcyBjaGVja3MgaWYgdGhlIGRyb3AgaXMgdmFsaWRcbiAgICAgIGxldCB2YWxpZCA9IGlzRHJvcFZhbGlkKHgsIHksIHNoaXBIZWlnaHQsIHNoaXBXaWR0aCwgbm9kZUxpc3QpO1xuICAgICAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgICAvLyBJZiBkcm9wIGlzIG5vdCB2YWxpZCwgc3RvcCBleGVjdXRpb25cbiAgICAgIGlmICh2YWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgbm9kZUxpc3RbeV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgLy8gVGhpcyBhZGRzIGEgdmlzdWFsIGluZGljYXRpb24gd2hlcmUgdGhlIHNoaXAgaXMgZHJvcHBlZFxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHkgKyBpO1xuICAgICAgICAgICAgbm9kZUxpc3RbaW5kZXhdLmNsYXNzTGlzdC5hZGQoZHJhZ2dhYmxlSWQpO1xuICAgICAgICAgICAgbm9kZUxpc3RbaW5kZXhdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzAwOTlkNlwiO1xuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3gsIGluZGV4XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRoaXMgYWRkcyBhIHZpc3VhbCBpbmRpY2F0aW9uIHdoZXJlIHRoZSBzaGlwIGlzIGRyb3BwZWRcbiAgICAgICAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W3ldO1xuICAgICAgICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgICAgICAgbGV0IGdyYW5kUGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgbGV0IHBhcmVudExpc3QgPSBncmFuZFBhcmVudC5jaGlsZE5vZGVzO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwSGVpZ2h0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHggKyBpO1xuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gcGFyZW50TGlzdFtpbmRleF07XG4gICAgICAgICAgICBsZXQgbGlzdCA9IGNoaWxkcmVuLmNoaWxkTm9kZXM7XG5cbiAgICAgICAgICAgIGxpc3RbeV0uY2xhc3NMaXN0LmFkZChkcmFnZ2FibGVJZCk7XG4gICAgICAgICAgICBsaXN0W3ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzAwOTlkNlwiO1xuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW2luZGV4LCB5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlUGFyZW50ID0gZHJhZ2dhYmxlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICBkcmFnZ2FibGVQYXJlbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLmNsZWFyRGF0YSgpO1xuICAgICAgICB1c2VyU2hpcHNDb29yZGluYXRlcy5wdXNoKHNoaXBDb29yZGluYXRlcyk7XG4gICAgICAgIGFsbFNoaXBzUGxhY2VkKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInN0YXJ0LWJ0blwiKSB7XG4gICAgICBtYWluU2VjdGlvbi50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgIGdldENvbXB1dGVyU2hpcHMoKTtcbiAgICAgIGdhbWVNZW51KCk7XG4gICAgICBHYW1lKCk7XG5cbiAgICAgIHVzZXJTaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aCA9IDA7XG4gICAgICBjb21wdXRlclNoaXBDb29yZGluYXRlcy5sZW5ndGggPSAwO1xuICAgICAgdmlzaXRlZC5sZW5ndGggPSAwO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBzdGFydE1lbnUsIHVzZXJTaGlwc0Nvb3JkaW5hdGVzLCBzdGFydE1lbnVFdmVudEhhbmRsZXIgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBib2R5Lm1vZGFsLW9wZW4ge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuYm9keS5tb2RhbC1vcGVuIC51c2VyLWNvbnRhaW5lcixcbmJvZHkubW9kYWwtb3BlbiAuY29tcHV0ZXItY29udGFpbmVyIHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG5ib2R5Lm1vZGFsLW9wZW4gLnBvcC11cCB7XG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xufVxuXG4ucG9wLXVwIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBoZWlnaHQ6IDIwMHB4O1xuICB3aWR0aDogNDAwcHg7XG4gIGNvbG9yOiAjZDFkNGRjO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDM5LCA1NywgNzcsIDAuNyk7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xufVxuXG4udXNlci1jb250YWluZXIsXG4uY29tcHV0ZXItY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMjBweDtcbn1cblxuLnVzZXItYmF0dGxlZmllbGQsXG4uY29tcHV0ZXItYmF0dGxlZmllbGQge1xuICBoZWlnaHQ6IDM1MHB4O1xuICB3aWR0aDogMzUwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLnVzZXItYmF0dGxlZmllbGQge1xuICBqdXN0aWZ5LXNlbGY6IGVuZDtcbn1cblxuLmNvbXB1dGVyLWJhdHRsZWZpZWxkIHtcbiAganVzdGlmeS1zZWxmOiBzdGFydDtcbn1cblxuLnNxdWFyZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMxMzFjMjY7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc2hpcC1zcXVhcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5OWQ2O1xufVxuXG4uc2hpcC1taXNzZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWVhMGExO1xufVxuXG4uc2hpcC1oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYxYTFhO1xufVxuXG4uc3F1YXJlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzZmZjZjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9nYW1lbWVudS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7O0VBRUUsWUFBWTtBQUNkOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixZQUFZO0VBQ1osY0FBYztFQUNkLHVDQUF1QztFQUN2QyxhQUFhO0VBQ2IsUUFBUTtFQUNSLFNBQVM7RUFDVCxnQ0FBZ0M7RUFDaEMsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTs7RUFFRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBOztFQUVFLGFBQWE7RUFDYixZQUFZO0VBQ1osYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keS5tb2RhbC1vcGVuIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG5ib2R5Lm1vZGFsLW9wZW4gLnVzZXItY29udGFpbmVyLFxcbmJvZHkubW9kYWwtb3BlbiAuY29tcHV0ZXItY29udGFpbmVyIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuYm9keS5tb2RhbC1vcGVuIC5wb3AtdXAge1xcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XFxufVxcblxcbi5wb3AtdXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAyMDBweDtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGNvbG9yOiAjZDFkNGRjO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzOSwgNTcsIDc3LCAwLjcpO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuLnVzZXItY29udGFpbmVyLFxcbi5jb21wdXRlci1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi51c2VyLWJhdHRsZWZpZWxkLFxcbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XFxuICBoZWlnaHQ6IDM1MHB4O1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi51c2VyLWJhdHRsZWZpZWxkIHtcXG4gIGp1c3RpZnktc2VsZjogZW5kO1xcbn1cXG5cXG4uY29tcHV0ZXItYmF0dGxlZmllbGQge1xcbiAganVzdGlmeS1zZWxmOiBzdGFydDtcXG59XFxuXFxuLnNxdWFyZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMTMxYzI2O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNoaXAtc3F1YXJlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDk5ZDY7XFxufVxcblxcbi5zaGlwLW1pc3NlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWVhMGExO1xcbn1cXG5cXG4uc2hpcC1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMWExYTtcXG59XFxuXFxuLnNxdWFyZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjNmZmNmO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmJvZHkge1xuICBoZWlnaHQ6IDEwMHZoO1xuICBmb250LXNpemU6IDFyZW07XG4gIGNvbG9yOiAjZDFkNGRjO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTMxYzI2O1xufVxuXG4uY29udGVudCB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTAwcHggMWZyIDEwMHB4O1xufVxuXG4ubWFpbi1zZWN0aW9uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCg0MDBweCwgNzUwcHgpIG1pbm1heCg0MDBweCwgNzUwcHgpO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmhlYWRlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbn1cblxuLmZvb3RlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5pbWcge1xuICB3aWR0aDogNjBweDtcbiAganVzdGlmeS1zZWxmOiBlbmQ7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixjQUFjO0VBQ2QseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxhQUFhO0VBQ2IsYUFBYTtFQUNiLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsZ0VBQWdFO0VBQ2hFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgY29sb3I6ICNkMWQ0ZGM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTMxYzI2O1xcbn1cXG5cXG4uY29udGVudCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxZnIgMTAwcHg7XFxufVxcblxcbi5tYWluLXNlY3Rpb24ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDQwMHB4LCA3NTBweCkgbWlubWF4KDQwMHB4LCA3NTBweCk7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmhlYWRlciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbn1cXG5cXG4uZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmltZyB7XFxuICB3aWR0aDogNjBweDtcXG4gIGp1c3RpZnktc2VsZjogZW5kO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC5sZWZ0LXNlY3Rpb24ge1xuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5yaWdodC1zZWN0aW9uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDEwMHB4IDEwMHB4IDFmcjtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc3RhcnQtbWVudS10YWJsZSB7XG4gIGhlaWdodDogNDAwcHg7XG4gIHdpZHRoOiA0MDBweDtcbiAgZGlzcGxheTogZ3JpZDtcbn1cblxudGJvZHkge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG59XG5cbi50YWJsZS1yb3cge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4udGFibGUtY2VsbCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMxMzFjMjY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkMWQ0ZGM7XG59XG5cbi5pbnN0cnVjdGlvbnMtb25lIHtcbiAgYWxpZ24tc2VsZjogc2VsZi1lbmQ7XG59XG5cbi5wb3J0IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCBhdXRvO1xuICBncmlkLWF1dG8tcm93czogbWlubWF4KG1pbi1jb250ZW50LCBtYXgtY29udGVudCk7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uY2Fycmllci1iZXJ0aCxcbi5iYXR0bGVzaGlwLWJlcnRoLFxuLmRlc3Ryb3llci1iZXJ0aCxcbi5zdWJtYXJpbmUtYmVydGgsXG4ucGF0cm9sLWJvYXQtYmVydGgge1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG4jY2Fycmllci5ob3Jpem9udGFsIHtcbiAgaGVpZ2h0OiAzNXB4O1xuICB3aWR0aDogMjAwcHg7XG59XG4jYmF0dGxlc2hpcC5ob3Jpem9udGFsIHtcbiAgaGVpZ2h0OiAzNXB4O1xuICB3aWR0aDogMTYwcHg7XG59XG5cbiNkZXN0cm95ZXIuaG9yaXpvbnRhbCxcbiNzdWJtYXJpbmUuaG9yaXpvbnRhbCB7XG4gIGhlaWdodDogMzVweDtcbiAgd2lkdGg6IDEyMHB4O1xufVxuXG4jcGF0cm9sLWJvYXQuaG9yaXpvbnRhbCB7XG4gIGhlaWdodDogMzVweDtcbiAgd2lkdGg6IDgwcHg7XG59XG5cbiNjYXJyaWVyLnZlcnRpY2FsIHtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgd2lkdGg6IDM1cHg7XG59XG5cbiNiYXR0bGVzaGlwLnZlcnRpY2FsIHtcbiAgaGVpZ2h0OiAxNjBweDtcbiAgd2lkdGg6IDM1cHg7XG59XG5cbiNkZXN0cm95ZXIudmVydGljYWwsXG4jc3VibWFyaW5lLnZlcnRpY2FsIHtcbiAgaGVpZ2h0OiAxMjBweDtcbiAgd2lkdGg6IDM1cHg7XG59XG5cbiNwYXRyb2wtYm9hdC52ZXJ0aWNhbCB7XG4gIGhlaWdodDogODBweDtcbiAgd2lkdGg6IDM1cHg7XG59XG5cbiNjYXJyaWVyLFxuI2JhdHRsZXNoaXAsXG4jZGVzdHJveWVyLFxuI3N1Ym1hcmluZSxcbiNwYXRyb2wtYm9hdCB7XG4gIGNvbG9yOiAjMDMwMjAxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5OWQ2O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc3RhcnQtYnRuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBoZWlnaHQ6IDgwcHg7XG4gIHdpZHRoOiAxNjBweDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxOGJjOWM7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdGFydG1lbnUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLG1DQUFtQztFQUNuQyxxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxnREFBZ0Q7RUFDaEQsdUJBQXVCO0FBQ3pCOztBQUVBOzs7OztFQUtFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7QUFDQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7O0VBRUUsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTs7Ozs7RUFLRSxjQUFjO0VBQ2QseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixRQUFRO0VBQ1IsU0FBUztFQUNULGdDQUFnQztFQUNoQyxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubGVmdC1zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucmlnaHQtc2VjdGlvbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxMDBweCAxZnI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc3RhcnQtbWVudS10YWJsZSB7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG59XFxuXFxudGJvZHkge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi50YWJsZS1yb3cge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4udGFibGUtY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMTMxYzI2O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2QxZDRkYztcXG59XFxuXFxuLmluc3RydWN0aW9ucy1vbmUge1xcbiAgYWxpZ24tc2VsZjogc2VsZi1lbmQ7XFxufVxcblxcbi5wb3J0IHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgYXV0bztcXG4gIGdyaWQtYXV0by1yb3dzOiBtaW5tYXgobWluLWNvbnRlbnQsIG1heC1jb250ZW50KTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uY2Fycmllci1iZXJ0aCxcXG4uYmF0dGxlc2hpcC1iZXJ0aCxcXG4uZGVzdHJveWVyLWJlcnRoLFxcbi5zdWJtYXJpbmUtYmVydGgsXFxuLnBhdHJvbC1ib2F0LWJlcnRoIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbiNjYXJyaWVyLmhvcml6b250YWwge1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbn1cXG4jYmF0dGxlc2hpcC5ob3Jpem9udGFsIHtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuXFxuI2Rlc3Ryb3llci5ob3Jpem9udGFsLFxcbiNzdWJtYXJpbmUuaG9yaXpvbnRhbCB7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICB3aWR0aDogMTIwcHg7XFxufVxcblxcbiNwYXRyb2wtYm9hdC5ob3Jpem9udGFsIHtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiA4MHB4O1xcbn1cXG5cXG4jY2Fycmllci52ZXJ0aWNhbCB7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgd2lkdGg6IDM1cHg7XFxufVxcblxcbiNiYXR0bGVzaGlwLnZlcnRpY2FsIHtcXG4gIGhlaWdodDogMTYwcHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxuI2Rlc3Ryb3llci52ZXJ0aWNhbCxcXG4jc3VibWFyaW5lLnZlcnRpY2FsIHtcXG4gIGhlaWdodDogMTIwcHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxuI3BhdHJvbC1ib2F0LnZlcnRpY2FsIHtcXG4gIGhlaWdodDogODBweDtcXG4gIHdpZHRoOiAzNXB4O1xcbn1cXG5cXG4jY2FycmllcixcXG4jYmF0dGxlc2hpcCxcXG4jZGVzdHJveWVyLFxcbiNzdWJtYXJpbmUsXFxuI3BhdHJvbC1ib2F0IHtcXG4gIGNvbG9yOiAjMDMwMjAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwOTlkNjtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydC1idG4ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgd2lkdGg6IDE2MHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE4YmM5YztcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2FtZW1lbnUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nYW1lbWVudS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2xvYmFsLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2xvYmFsLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGFydG1lbnUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGFydG1lbnUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IHBhZ2VMYXlvdXQgfSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7IHN0YXJ0TWVudSwgc3RhcnRNZW51RXZlbnRIYW5kbGVyIH0gZnJvbSBcIi4vc3RhcnQtbWVudVwiO1xuXG5jb25zdCBjb21wb25lbnQgPSAoKSA9PiB7XG4gIHBhZ2VMYXlvdXQoKTtcblxuICBzdGFydE1lbnUoKTtcblxuICBzdGFydE1lbnVFdmVudEhhbmRsZXIoKTtcbn07XG5jb21wb25lbnQoKTtcbiJdLCJuYW1lcyI6WyJzdGFydE1lbnUiLCJwbGF5Um91bmQiLCJ1c2VyQXR0YWNrcyIsImNvbXB1dGVyQXR0YWNrcyIsImdhbWVNZW51IiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJjb250YWluZXJPbmUiLCJjcmVhdGVFbGVtZW50IiwiY29udGFpbmVyVHdvIiwiYmF0dGxlZmllbGRPbmUiLCJiYXR0bGVmaWVsZFR3byIsImJhdHRsZWZpZWxkT25lUGFyYSIsImJhdHRsZWZpZWxkVHdvUGFyYSIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwicmVuZGVyQm9hcmRzIiwidXNlckJhdHRsZWZpZWxkIiwiY29tcHV0ZXJCYXR0bGVmaWVsZCIsInJlbmRlclVzZXJCb2FyZCIsImJvYXJkIiwiaSIsImxlbmd0aCIsInJvdyIsImoiLCJidG4iLCJkYXRhIiwidHlwZSIsImRhdGFzZXQiLCJwb3MiLCJyZW5kZXJDb21wdXRlckJvYXJkIiwiZ2FtZVdpbm5lciIsIndpbm5lciIsInBvcFVwIiwid2lubmVyQW5ub3VuY2VyIiwicmVzdGFydEJ1dHRvbiIsImJvZHkiLCJ0b2dnbGUiLCJnYW1lTWVudUV2ZW50SGFuZGxlciIsIm1haW5TZWN0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjbGFzc05hbWUiLCJzcXVhcmUiLCJhcnJheSIsInNwbGl0IiwicGFyc2VJbnQiLCJjb21wdXRlclNoaXBDb29yZGluYXRlcyIsInZpc2l0ZWQiLCJpc0FycmF5SW5BcnJheSIsInNvdXJjZSIsInNlYXJjaCIsInNlYXJjaEVsZSIsInNvdXJjZUVsZSIsImdldEFkakNvb3JkaW5hdGVzIiwiY29vcmRpbmF0ZXMiLCJhZGpQb3NpdGlvbnMiLCJvcmllbnRhdGlvbiIsIm9uZSIsInR3byIsImVsZW1lbnQiLCJhZGpMZWZ0IiwiYWRqUmlnaHQiLCJwdXNoIiwiYWRqVG9wIiwibGVmdCIsInJpZ2h0IiwiYWRqQm90dG9tIiwidG9wIiwiYm90dG9tIiwiZ2V0UmFuZG9tUG9zaXRpb24iLCJ2YWxpZCIsIngiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ5IiwiZ2V0TGVnYWxDb21ib3MiLCJzaGlwTGVuZ3RoIiwibGVnYWxDb21ib3MiLCJzZXQiLCJsZW5ndGhEaWZmIiwiYXJyYXlMZW5ndGgiLCJ2YWx1ZXMiLCJtb3ZlIiwiZ2V0Q29tcHV0ZXJTaGlwcyIsInJlcGVhdCIsIml0ZW1WaXNpdGVkIiwiY29vcmRpbmF0ZSIsImFkakNvb3JkaW5hdGVzIiwiUGxheWVyU2hpcHMiLCJTaGlwIiwiR2FtZUJvYXJkIiwiY3JlYXRlQm9hcmQiLCJnZXRCb2FyZCIsInBsYXllclNoaXBzIiwic2hpcHMiLCJnZXRTaGlwcyIsInBvcHVsYXRlQm9hcmQiLCJhZGRTaGlwQ29vcmRpbmF0ZXMiLCJwbGFjZVNoaXBzIiwiZmluZEF0dGFja2VkU2hpcCIsImtleSIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tlZFNoaXAiLCJoaXQiLCJhbGxTaGlwc0Rlc3Ryb3llZCIsImNvdW50Iiwic2hpcFN0YXRlIiwiZGVzdHJveWVkIiwiUGxheWVyIiwidXNlclNoaXBzQ29vcmRpbmF0ZXMiLCJ1c2VyR2FtZUJvYXJkIiwiY29tcHV0ZXJHYW1lQm9hcmQiLCJ1c2VyIiwiY29tcHV0ZXIiLCJHYW1lIiwidXNlckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsImF0dGFjayIsIkltZyIsInBhZ2VMYXlvdXQiLCJjb250ZW50IiwiaGVhZGVyIiwibWFpbiIsImZvb3RlciIsImNvcHlyaWdodCIsInRpdGxlIiwibG9nbyIsIkltYWdlIiwic3JjIiwiYWx0IiwibmFtZSIsImdldE5hbWUiLCJpc0F0dGFja0xlZ2FsIiwiZW5lbXkiLCJzbGljZSIsInNoaWZ0IiwiZW5lbXlOYW1lIiwiY2hlY2tMZWdhbCIsImNhcnJpZXIiLCJoaXRzIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJjb3B5Iiwic2hpcEFycmF5IiwiYXJyIiwiaXNTdW5rIiwic2hpcCIsImhpdHNDb3VudCIsImNoZWNrU2hpcCIsImdldFN0YXJ0U2NyZWVuQm9hcmQiLCJnYW1lQm9hcmQiLCJsZWZ0U2VjdGlvbiIsInJpZ2h0U2VjdGlvbiIsInRhYmxlIiwidGFibGVCb2R5IiwicGFyYSIsInBhcmFUd28iLCJzaGlwc0NvbnRhaW5lciIsImNhcnJpZXJCZXJ0aCIsImJhdHRsZXNoaXBCZXJ0aCIsImRlc3Ryb3llckJlcnRoIiwic3VibWFyaW5lQmVydGgiLCJwYXRyb2xCb2F0QmVydGgiLCJpZCIsImhlaWdodCIsIndpZHRoIiwiZHJhZ2dhYmxlIiwidGFibGVSb3ciLCJjZWxsIiwiYWxsU2hpcHNQbGFjZWQiLCJwb3J0Iiwibm9kZUxpc3QiLCJjaGlsZE5vZGVzIiwiaGFzQ2hpbGROb2RlcyIsImlzRHJvcFZhbGlkIiwiaW5kZXhYIiwiaW5kZXhZIiwic2hpcEhlaWdodCIsInNoaXBXaWR0aCIsImNoZWNrVG9wIiwiZHJvcFNxdWFyZSIsInBhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnRTaWJsaW5nIiwicHJldmlvdXNTaWJsaW5nIiwic3RhcnRJbmRleCIsInNxdWFyZUluZGV4IiwidW5kZWZpbmVkIiwic3F1YXJlQ2xhc3MiLCJpbmNsdWRlcyIsImNoZWNrUmlnaHQiLCJncmFuZFBhcmVudCIsInBhcmVudExpc3QiLCJpbmRleCIsImNoaWxkcmVuIiwibGlzdCIsImNoZWNrQm90dG9tIiwibmV4dFNpYmxpbmciLCJjaGVja0xlZnQiLCJ0b3BWYWxpZCIsInJpZ2h0VmFsaWQiLCJib3R0b21WYWxpZCIsImxlZnRWYWxpZCIsInN0YXJ0TWVudUV2ZW50SGFuZGxlciIsInJlcGxhY2UiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwic3RyIiwibGV0dGVyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJ0ZXh0Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwcmV2ZW50RGVmYXVsdCIsImRyb3B6b25lIiwiZHJhZ2dhYmxlSWQiLCJnZXREYXRhIiwiZHJhZ2dhYmxlRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwic2hpcENvb3JkaW5hdGVzIiwiZHJhZ2dhYmxlUGFyZW50IiwiY2xlYXJEYXRhIiwiY29tcG9uZW50Il0sInNvdXJjZVJvb3QiOiIifQ==