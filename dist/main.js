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
        btn.classList.add("computer");
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
  restartButton.classList.add("restart-btn");
  restartButton.type = "button";
  restartButton.textContent = "Rematch";
  document.body.classList.toggle("modal-open");
  popUp.appendChild(winnerAnnouncer);
  popUp.appendChild(restartButton);
  container.appendChild(popUp);
};
const gameMenuEventHandler = () => {
  const mainSection = document.querySelector(".main-section");
  mainSection.addEventListener("mouseover", e => {
    const element = e.target;
    if (element.className === "square computer") {
      element.style.backgroundColor = "#23ffcf";
    }
  });
  mainSection.addEventListener("mouseout", e => {
    const element = e.target;
    if (element.className === "square computer") {
      element.style.backgroundColor = "";
    }
  });
  mainSection.addEventListener("click", e => {
    const element = e.target;
    if (element.className === "square computer") {
      const data = element.dataset.pos;
      const array = data.split(",");
      const pos = [parseInt(array[0]), parseInt(array[1])];
      (0,_game_controller__WEBPACK_IMPORTED_MODULE_1__.playRound)(pos);
    }
  });
  mainSection.addEventListener("click", e => {
    if (e.target.className === "restart-btn") {
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
  let random = Math.floor(Math.random() * 3);
  if (random % 2 === 0) {
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
      (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.gameWinner)("You Win");
      return;
    }
    computer.attack(user, userGameBoard, pos);

    // Update user board on the screen
    const userBoard = userGameBoard.getBoard();
    (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderUserBoard(userBoard);

    // Check if all user ships are destroyed
    if (userGameBoard.allShipsDestroyed() === true) {
      (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.gameWinner)("AI Wins!");
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
    const getRandom = () => {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      return [x, y];
    };
    if (enemyName === "user") {
      let pos = getRandom();
      let checkLegal = isAttackLegal(enemyName, pos);
      while (checkLegal === false) {
        pos = getRandom();
        checkLegal = isAttackLegal(enemyName, pos);
      }
      computerAttacks.push(pos);
      GameBoard.receiveAttack(pos);
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
let userShips = {
  carrier: null,
  battleship: null,
  destroyer: null,
  submarine: null,
  "patrol-boat": null
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
    sortShipsCoordinates();
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
        userShips[draggableId] = shipCoordinates;
        e.dataTransfer.clearData();
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
  opacity: 0.3;
}

body.modal-open .pop-up {
  pointer-events: auto;
}

.pop-up {
  position: absolute;
  height: 40%;
  width: 40%;
  max-height: 250px;
  min-height: 200px;
  max-width: 450px;
  min-width: 350px;
  color: #d1d4dc;
  background-color: rgba(45, 67, 90, 0.8);
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  gap: 20px;
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

.restart-btn {
  height: 55px;
  width: 110px;
  font-size: 1.25rem;
  background-color: #18bc9c;
  border: none;
  border-radius: 5px;
  padding: 10px;
}

.pop-up h3 {
  font-size: 2.5rem;
}

.restart-btn:hover {
  background-color: #1bd3af;
  height: 60px;
  width: 115px;
}
`, "",{"version":3,"sources":["webpack://./src/styles/gamemenu.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;AACtB;;AAEA;;EAEE,YAAY;AACd;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,UAAU;EACV,iBAAiB;EACjB,iBAAiB;EACjB,gBAAgB;EAChB,gBAAgB;EAChB,cAAc;EACd,uCAAuC;EACvC,aAAa;EACb,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,kCAAkC;EAClC,qBAAqB;EACrB,mBAAmB;EACnB,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,YAAY;EACZ,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,yBAAyB;EACzB,YAAY;EACZ,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,YAAY;AACd","sourcesContent":["body.modal-open {\n  pointer-events: none;\n}\n\nbody.modal-open .user-container,\nbody.modal-open .computer-container {\n  opacity: 0.3;\n}\n\nbody.modal-open .pop-up {\n  pointer-events: auto;\n}\n\n.pop-up {\n  position: absolute;\n  height: 40%;\n  width: 40%;\n  max-height: 250px;\n  min-height: 200px;\n  max-width: 450px;\n  min-width: 350px;\n  color: #d1d4dc;\n  background-color: rgba(45, 67, 90, 0.8);\n  padding: 10px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: grid;\n  grid-template-rows: repeat(2, 1fr);\n  justify-items: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.user-container,\n.computer-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.user-battlefield,\n.computer-battlefield {\n  height: 350px;\n  width: 350px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.user-battlefield {\n  justify-self: end;\n}\n\n.computer-battlefield {\n  justify-self: start;\n}\n\n.square {\n  border: 1px solid #131c26;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.ship-square {\n  background-color: #0099d6;\n}\n\n.ship-missed {\n  background-color: #9ea0a1;\n}\n\n.ship-hit {\n  background-color: #ff1a1a;\n}\n\n.restart-btn {\n  height: 55px;\n  width: 110px;\n  font-size: 1.25rem;\n  background-color: #18bc9c;\n  border: none;\n  border-radius: 5px;\n  padding: 10px;\n}\n\n.pop-up h3 {\n  font-size: 2.5rem;\n}\n\n.restart-btn:hover {\n  background-color: #1bd3af;\n  height: 60px;\n  width: 115px;\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Open+Sans&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  font-family: "Black Ops One", cursive;
  font-size: 1rem;
  color: #d1d4dc;
  background-color: #131c26;
}

.content {
  height: 100%;
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  grid-template-rows: 100px 1fr 100px;
}

.main-section {
  position: relative;
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: minmax(400px, 600px) minmax(400px, 600px);
  justify-content: center;
}

.header {
  grid-column: 2 / 3;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.footer {
  grid-column: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-family: "Black Ops One", cursive;
  font-size: 3rem;
}

.footer p {
  font-family: "Open Sans", sans-serif;
}

img {
  width: 60px;
  justify-self: end;
}
`, "",{"version":3,"sources":["webpack://./src/styles/global.css"],"names":[],"mappings":"AAEA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,qCAAqC;EACrC,eAAe;EACf,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,aAAa;EACb,gEAAgE;EAChE,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,qCAAqC;EACrC,eAAe;AACjB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,WAAW;EACX,iBAAiB;AACnB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Open+Sans&display=swap\");\n\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  font-family: \"Black Ops One\", cursive;\n  font-size: 1rem;\n  color: #d1d4dc;\n  background-color: #131c26;\n}\n\n.content {\n  height: 100%;\n  width: 100%;\n  padding: 10px;\n  display: grid;\n  grid-template-columns: 100px 1fr 100px;\n  grid-template-rows: 100px 1fr 100px;\n}\n\n.main-section {\n  position: relative;\n  grid-column: 2 / 3;\n  display: grid;\n  grid-template-columns: minmax(400px, 600px) minmax(400px, 600px);\n  justify-content: center;\n}\n\n.header {\n  grid-column: 2 / 3;\n  padding: 10px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n\n.footer {\n  grid-column: 2 / 3;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nh1 {\n  font-family: \"Black Ops One\", cursive;\n  font-size: 3rem;\n}\n\n.footer p {\n  font-family: \"Open Sans\", sans-serif;\n}\n\nimg {\n  width: 60px;\n  justify-self: end;\n}\n"],"sourceRoot":""}]);
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
  font-size: 1.5rem;
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
  font-size: 0.75rem;
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
  font-size: 1.25rem;
  background-color: #18bc9c;
  border: none;
  border-radius: 5px;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-btn:hover {
  background-color: #1bd3af;
  height: 85px;
  width: 165px;
}
`, "",{"version":3,"sources":["webpack://./src/styles/startmenu.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,mCAAmC;EACnC,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,yBAAyB;EACzB,yBAAyB;AAC3B;;AAEA;EACE,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,uCAAuC;EACvC,gDAAgD;EAChD,uBAAuB;AACzB;;AAEA;;;;;EAKE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;AACA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;;EAEE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;;EAEE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;;;;;EAKE,kBAAkB;EAClB,cAAc;EACd,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,yBAAyB;EACzB,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,YAAY;AACd","sourcesContent":[".left-section {\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n.right-section {\n  position: relative;\n  display: grid;\n  grid-template-rows: 100px 100px 1fr;\n  justify-items: center;\n  align-items: center;\n}\n\n.start-menu-table {\n  height: 400px;\n  width: 400px;\n  display: grid;\n}\n\ntbody {\n  width: 100%;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.table-row {\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.table-cell {\n  border: 1px solid #131c26;\n  background-color: #d1d4dc;\n}\n\n.instructions-one {\n  font-size: 1.5rem;\n  align-self: self-end;\n}\n\n.port {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-columns: min-content auto;\n  grid-auto-rows: minmax(min-content, max-content);\n  justify-content: center;\n}\n\n.carrier-berth,\n.battleship-berth,\n.destroyer-berth,\n.submarine-berth,\n.patrol-boat-berth {\n  padding: 10px;\n}\n\n#carrier.horizontal {\n  height: 35px;\n  width: 200px;\n}\n#battleship.horizontal {\n  height: 35px;\n  width: 160px;\n}\n\n#destroyer.horizontal,\n#submarine.horizontal {\n  height: 35px;\n  width: 120px;\n}\n\n#patrol-boat.horizontal {\n  height: 35px;\n  width: 80px;\n}\n\n#carrier.vertical {\n  height: 200px;\n  width: 35px;\n}\n\n#battleship.vertical {\n  height: 160px;\n  width: 35px;\n}\n\n#destroyer.vertical,\n#submarine.vertical {\n  height: 120px;\n  width: 35px;\n}\n\n#patrol-boat.vertical {\n  height: 80px;\n  width: 35px;\n}\n\n#carrier,\n#battleship,\n#destroyer,\n#submarine,\n#patrol-boat {\n  font-size: 0.75rem;\n  color: #030201;\n  background-color: #0099d6;\n  border-radius: 2px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.start-btn {\n  position: absolute;\n  height: 80px;\n  width: 160px;\n  font-size: 1.25rem;\n  background-color: #18bc9c;\n  border: none;\n  border-radius: 5px;\n  padding: 10px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.start-btn:hover {\n  background-color: #1bd3af;\n  height: 85px;\n  width: 165px;\n}\n"],"sourceRoot":""}]);
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
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");



const component = () => {
  (0,_layout__WEBPACK_IMPORTED_MODULE_0__.pageLayout)();
  (0,_start_menu__WEBPACK_IMPORTED_MODULE_1__.startMenu)();
  (0,_start_menu__WEBPACK_IMPORTED_MODULE_1__.startMenuEventHandler)();
  (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.gameMenuEventHandler)();
};
component();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7Ozs7Ozs7Ozs7Ozs7O0FDQXNDO0FBQzBCO0FBQ1o7QUFFcEQsTUFBTWdOLFNBQVMsR0FBR0EsQ0FBQSxLQUFNO0VBQ3RCM0csbURBQVUsQ0FBQyxDQUFDO0VBRVovSCxzREFBUyxDQUFDLENBQUM7RUFFWEMsa0VBQXFCLENBQUMsQ0FBQztFQUV2QnlDLGlFQUFvQixDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUNEZ00sU0FBUyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYmF0dGxlc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyQUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGF5b3V0LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdGFydC1tZW51LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2dhbWVtZW51LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9nbG9iYWwuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0YXJ0bWVudS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2dhbWVtZW51LmNzcz8yNTkzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2dsb2JhbC5jc3M/ZjBkOCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdGFydG1lbnUuY3NzPzEyYjAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0YXJ0TWVudSwgc3RhcnRNZW51RXZlbnRIYW5kbGVyIH0gZnJvbSBcIi4vc3RhcnQtbWVudVwiO1xuaW1wb3J0IHsgcGxheVJvdW5kIH0gZnJvbSBcIi4vZ2FtZS1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyB1c2VyQXR0YWNrcywgY29tcHV0ZXJBdHRhY2tzIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9nYW1lbWVudS5jc3NcIjtcblxuY29uc3QgZ2FtZU1lbnUgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xuXG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgY29uc3QgY29udGFpbmVyT25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY29udGFpbmVyVHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRPbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZFR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZWZpZWxkT25lUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZFR3b1BhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICBjb250YWluZXJPbmUuY2xhc3NMaXN0LmFkZChcInVzZXItY29udGFpbmVyXCIpO1xuICBjb250YWluZXJUd28uY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyLWNvbnRhaW5lclwiKTtcbiAgYmF0dGxlZmllbGRPbmUuY2xhc3NMaXN0LmFkZChcInVzZXItYmF0dGxlZmllbGRcIik7XG4gIGJhdHRsZWZpZWxkVHdvLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1iYXR0bGVmaWVsZFwiKTtcbiAgYmF0dGxlZmllbGRPbmVQYXJhLnRleHRDb250ZW50ID0gXCJQbGF5ZXIgQm9hcmRcIjtcbiAgYmF0dGxlZmllbGRUd29QYXJhLnRleHRDb250ZW50ID0gXCJBSSBCb2FyZFwiO1xuXG4gIGNvbnRhaW5lck9uZS5hcHBlbmRDaGlsZChiYXR0bGVmaWVsZE9uZSk7XG4gIGNvbnRhaW5lclR3by5hcHBlbmRDaGlsZChiYXR0bGVmaWVsZFR3byk7XG4gIGNvbnRhaW5lck9uZS5hcHBlbmRDaGlsZChiYXR0bGVmaWVsZE9uZVBhcmEpO1xuICBjb250YWluZXJUd28uYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRUd29QYXJhKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lck9uZSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUd28pO1xufTtcblxuY29uc3QgcmVuZGVyQm9hcmRzID0gKCkgPT4ge1xuICBjb25zdCB1c2VyQmF0dGxlZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItYmF0dGxlZmllbGRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQmF0dGxlZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyLWJhdHRsZWZpZWxkXCIpO1xuXG4gIC8vIFJlbmRlciB1c2VyIGdhbWUgYm9hcmRcbiAgY29uc3QgcmVuZGVyVXNlckJvYXJkID0gKGJvYXJkKSA9PiB7XG4gICAgdXNlckJhdHRsZWZpZWxkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGJvYXJkW2ldO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25zdCBkYXRhID0gYm9hcmRbaV1bal07XG5cbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICAgIGJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgICAgICAgYnRuLmRhdGFzZXQucG9zID0gYCR7aX0sJHtqfWA7XG5cbiAgICAgICAgaWYgKGRhdGEgPT09IDEpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtc3F1YXJlXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IDIpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtbWlzc2VkXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IDMpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtaGl0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXNlckJhdHRsZWZpZWxkLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlbmRlciBjb21wdXRlciBnYW1lIGJvYXJkXG4gIGNvbnN0IHJlbmRlckNvbXB1dGVyQm9hcmQgPSAoYm9hcmQpID0+IHtcbiAgICBjb21wdXRlckJhdHRsZWZpZWxkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGJvYXJkW2ldO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25zdCBkYXRhID0gYm9hcmRbaV1bal07XG5cbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXJcIik7XG4gICAgICAgIGJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgICAgICAgYnRuLmRhdGFzZXQucG9zID0gYCR7aX0sJHtqfWA7XG5cbiAgICAgICAgaWYgKGRhdGEgPT09IDIpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtbWlzc2VkXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IDMpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtaGl0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcHV0ZXJCYXR0bGVmaWVsZC5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHsgcmVuZGVyVXNlckJvYXJkLCByZW5kZXJDb21wdXRlckJvYXJkIH07XG59O1xuXG5jb25zdCBnYW1lV2lubmVyID0gKHdpbm5lcikgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcbiAgY29uc3QgcG9wVXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB3aW5uZXJBbm5vdW5jZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIHBvcFVwLmNsYXNzTGlzdC5hZGQoXCJwb3AtdXBcIik7XG4gIHdpbm5lckFubm91bmNlci5jbGFzc0xpc3QuYWRkKFwid2lubmVyXCIpO1xuICB3aW5uZXJBbm5vdW5jZXIudGV4dENvbnRlbnQgPSB3aW5uZXI7XG4gIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc3RhcnQtYnRuXCIpO1xuICByZXN0YXJ0QnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZW1hdGNoXCI7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcIm1vZGFsLW9wZW5cIik7XG5cbiAgcG9wVXAuYXBwZW5kQ2hpbGQod2lubmVyQW5ub3VuY2VyKTtcbiAgcG9wVXAuYXBwZW5kQ2hpbGQocmVzdGFydEJ1dHRvbik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3BVcCk7XG59O1xuXG5jb25zdCBnYW1lTWVudUV2ZW50SGFuZGxlciA9ICgpID0+IHtcbiAgY29uc3QgbWFpblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInNxdWFyZSBjb21wdXRlclwiKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzIzZmZjZlwiO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIChlKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInNxdWFyZSBjb21wdXRlclwiKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZS50YXJnZXQ7XG5cbiAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09IFwic3F1YXJlIGNvbXB1dGVyXCIpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBlbGVtZW50LmRhdGFzZXQucG9zO1xuICAgICAgY29uc3QgYXJyYXkgPSBkYXRhLnNwbGl0KFwiLFwiKTtcbiAgICAgIGNvbnN0IHBvcyA9IFtwYXJzZUludChhcnJheVswXSksIHBhcnNlSW50KGFycmF5WzFdKV07XG5cbiAgICAgIHBsYXlSb3VuZChwb3MpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJyZXN0YXJ0LWJ0blwiKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJtb2RhbC1vcGVuXCIpO1xuICAgICAgbWFpblNlY3Rpb24udGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAvLyBFbXB0eSBhdHRhY2tlZCBzcXVhcmVzIGhpc3RvcnlcbiAgICAgIHVzZXJBdHRhY2tzLmxlbmd0aCA9IDA7XG4gICAgICBjb21wdXRlckF0dGFja3MubGVuZ3RoID0gMDtcblxuICAgICAgLy8gU3RhcnQgbmV3IGdhbWVcbiAgICAgIHN0YXJ0TWVudSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBnYW1lTWVudSwgcmVuZGVyQm9hcmRzLCBnYW1lV2lubmVyLCBnYW1lTWVudUV2ZW50SGFuZGxlciB9O1xuIiwibGV0IGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzID0gW107XG5sZXQgdmlzaXRlZCA9IFtdO1xuXG5jb25zdCBpc0FycmF5SW5BcnJheSA9IChzb3VyY2UsIHNlYXJjaCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlYXJjaC5sZW5ndGg7IGkrKykge1xuICAgIGxldCBzZWFyY2hFbGUgPSBzZWFyY2hbaV07XG5cbiAgICBpZiAoc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU2VhcmNoIGZvciBlYWNoIFwic2VhcmNoIGFycmF5XCIgZWxlbWVudCBpbiB0aGUgc291cmNlIGFycmF5XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBzb3VyY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgIGxldCBzb3VyY2VFbGUgPSBzb3VyY2Vbal07XG5cbiAgICAgIGlmIChzZWFyY2hFbGVbMF0gPT09IHNvdXJjZUVsZVswXSAmJiBzZWFyY2hFbGVbMV0gPT09IHNvdXJjZUVsZVsxXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGdldEFkakNvb3JkaW5hdGVzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gIGxldCBhZGpQb3NpdGlvbnMgPSBbXTtcbiAgbGV0IG9yaWVudGF0aW9uID0gXCJcIjtcbiAgbGV0IG9uZSA9IGNvb3JkaW5hdGVzWzBdO1xuICBsZXQgdHdvID0gY29vcmRpbmF0ZXNbMV07XG5cbiAgLy8gQ2hlY2sgY29vcmRpbmF0ZXMgb3JpZW50YXRpb25cbiAgaWYgKG9uZVswXSA9PT0gdHdvWzBdICYmIG9uZVsxXSAhPT0gdHdvWzFdKSB7XG4gICAgb3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcbiAgfSBlbHNlIGlmIChvbmVbMF0gIT09IHR3b1swXSAmJiBvbmVbMV0gPT09IHR3b1sxXSkge1xuICAgIG9yaWVudGF0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICB9XG5cbiAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciBzaGlwIGNvb3JkaW5hdGVzIGFsb25nIHRoZSBZLWF4aXNcbiAgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY29vcmRpbmF0ZXNbaV07XG5cbiAgICAgIGxldCBhZGpMZWZ0ID0gW2VsZW1lbnRbMF0sIGVsZW1lbnRbMV0gLSAxXTtcbiAgICAgIGxldCBhZGpSaWdodCA9IFtlbGVtZW50WzBdLCBlbGVtZW50WzFdICsgMV07XG5cbiAgICAgIGlmIChhZGpMZWZ0WzFdID49IDAgJiYgYWRqTGVmdFsxXSA8PSA5KSB7XG4gICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkakxlZnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWRqUmlnaHRbMV0gPj0gMCAmJiBhZGpSaWdodFsxXSA8PSA5KSB7XG4gICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkalJpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciB0aGUgZmlyc3Qgc3F1YXJlIG9mIHRoZSBzaGlwIGNvb3JkaW5hdGVzXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBsZXQgYWRqVG9wID0gW2VsZW1lbnRbMF0gLSAxLCBlbGVtZW50WzFdXTtcblxuICAgICAgICBpZiAoYWRqVG9wWzBdID49IDAgJiYgYWRqVG9wWzBdIDw9IDkpIHtcbiAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpUb3ApO1xuXG4gICAgICAgICAgbGV0IGxlZnQgPSBbYWRqVG9wWzBdLCBhZGpUb3BbMV0gLSAxXTtcbiAgICAgICAgICBsZXQgcmlnaHQgPSBbYWRqVG9wWzBdLCBhZGpUb3BbMV0gKyAxXTtcblxuICAgICAgICAgIGlmIChsZWZ0WzFdID49IDAgJiYgbGVmdFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChsZWZ0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmlnaHRbMV0gPj0gMCAmJiByaWdodFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChyaWdodCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3IgdGhlIGxhc3Qgc3F1YXJlIG9mIHRoZSBzaGlwIGNvb3JkaW5hdGVzXG4gICAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoIC0gaSA9PT0gMSkge1xuICAgICAgICBsZXQgYWRqQm90dG9tID0gW2VsZW1lbnRbMF0gKyAxLCBlbGVtZW50WzFdXTtcblxuICAgICAgICBpZiAoYWRqQm90dG9tWzBdID49IDAgJiYgYWRqQm90dG9tWzBdIDw9IDkpIHtcbiAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpCb3R0b20pO1xuXG4gICAgICAgICAgbGV0IGxlZnQgPSBbYWRqQm90dG9tWzBdLCBhZGpCb3R0b21bMV0gLSAxXTtcbiAgICAgICAgICBsZXQgcmlnaHQgPSBbYWRqQm90dG9tWzBdLCBhZGpCb3R0b21bMV0gKyAxXTtcblxuICAgICAgICAgIGlmIChsZWZ0WzFdID49IDAgJiYgbGVmdFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChsZWZ0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmlnaHRbMV0gPj0gMCAmJiByaWdodFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChyaWdodCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkalBvc2l0aW9ucztcbiAgfVxuXG4gIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3Igc2hpcCBjb29yZGluYXRlcyBhbG9uZyB0aGUgWC1heGlzXG4gIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY29vcmRpbmF0ZXNbaV07XG5cbiAgICAgIGxldCBhZGpUb3AgPSBbZWxlbWVudFswXSAtIDEsIGVsZW1lbnRbMV1dO1xuICAgICAgbGV0IGFkakJvdHRvbSA9IFtlbGVtZW50WzBdICsgMSwgZWxlbWVudFsxXV07XG5cbiAgICAgIGlmIChhZGpUb3BbMF0gPj0gMCAmJiBhZGpUb3BbMF0gPD0gOSkge1xuICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpUb3ApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWRqQm90dG9tWzBdID49IDAgJiYgYWRqQm90dG9tWzBdIDw9IDkpIHtcbiAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqQm90dG9tKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciB0aGUgZmlyc3Qgc3F1YXJlIG9mIHRoZSBzaGlwIGNvb3JkaW5hdGVzXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBsZXQgYWRqTGVmdCA9IFtlbGVtZW50WzBdLCBlbGVtZW50WzFdIC0gMV07XG5cbiAgICAgICAgaWYgKGFkakxlZnRbMV0gPj0gMCAmJiBhZGpMZWZ0WzFdIDw9IDkpIHtcbiAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpMZWZ0KTtcblxuICAgICAgICAgIGxldCB0b3AgPSBbYWRqTGVmdFswXSAtIDEsIGFkakxlZnRbMV1dO1xuICAgICAgICAgIGxldCBib3R0b20gPSBbYWRqTGVmdFswXSArIDEsIGFkakxlZnRbMV1dO1xuXG4gICAgICAgICAgaWYgKHRvcFswXSA+PSAwICYmIHRvcFswXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaCh0b3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChib3R0b21bMF0gPj0gMCAmJiBib3R0b21bMF0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYm90dG9tKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciB0aGUgbGFzdCBzcXVhcmUgb2YgdGhlIHNoaXAgY29vcmRpbmF0ZXNcbiAgICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggLSBpID09PSAxKSB7XG4gICAgICAgIGxldCBhZGpSaWdodCA9IFtlbGVtZW50WzBdLCBlbGVtZW50WzFdICsgMV07XG5cbiAgICAgICAgaWYgKGFkalJpZ2h0WzFdID49IDAgJiYgYWRqUmlnaHRbMV0gPD0gOSkge1xuICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkalJpZ2h0KTtcblxuICAgICAgICAgIGxldCB0b3AgPSBbYWRqUmlnaHRbMF0gLSAxLCBhZGpSaWdodFsxXV07XG4gICAgICAgICAgbGV0IGJvdHRvbSA9IFthZGpSaWdodFswXSArIDEsIGFkalJpZ2h0WzFdXTtcblxuICAgICAgICAgIGlmICh0b3BbMF0gPj0gMCAmJiB0b3BbMF0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2godG9wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYm90dG9tWzBdID49IDAgJiYgYm90dG9tWzBdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGJvdHRvbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkalBvc2l0aW9ucztcbiAgfVxufTtcblxuY29uc3QgZ2V0UmFuZG9tUG9zaXRpb24gPSAobGVuZ3RoKSA9PiB7XG4gIGxldCB2YWxpZCA9IGZhbHNlO1xuICBsZXQgcG9zO1xuXG4gIHdoaWxlICh2YWxpZCA9PT0gZmFsc2UpIHtcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBwb3MgPSBbeCwgeV07XG5cbiAgICBpZiAoeCArIGxlbmd0aCA8PSAxMCAmJiB5ICsgbGVuZ3RoIDw9IDEwKSB7XG4gICAgICB2YWxpZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBvcztcbn07XG5cbmNvbnN0IGdldExlZ2FsQ29tYm9zID0gKHNoaXBMZW5ndGgpID0+IHtcbiAgY29uc3QgbGVnYWxDb21ib3MgPSBbXG4gICAgW1xuICAgICAgWzAsIDFdLFxuICAgICAgWzAsIDJdLFxuICAgICAgWzAsIDNdLFxuICAgICAgWzAsIDRdLFxuICAgICAgWzAsIDVdLFxuICAgIF0sXG4gICAgW1xuICAgICAgWzEsIDBdLFxuICAgICAgWzIsIDBdLFxuICAgICAgWzMsIDBdLFxuICAgICAgWzQsIDBdLFxuICAgICAgWzUsIDBdLFxuICAgIF0sXG4gIF07XG4gIGNvbnN0IHBvcyA9IGdldFJhbmRvbVBvc2l0aW9uKHNoaXBMZW5ndGgpO1xuXG4gIGxldCBjb29yZGluYXRlcyA9IFtdO1xuICBsZXQgc2V0O1xuXG4gIC8vIFJhbmRvbWl6ZSBzZXQgb2YgY29tYm9zIHRvIGJlIHVzZWRcbiAgbGV0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpO1xuXG4gIGlmIChyYW5kb20gJSAyID09PSAwKSB7XG4gICAgc2V0ID0gbGVnYWxDb21ib3NbMF07XG4gIH0gZWxzZSB7XG4gICAgc2V0ID0gbGVnYWxDb21ib3NbMV07XG4gIH1cblxuICBsZXQgbGVuZ3RoRGlmZiA9IHNldC5sZW5ndGggLSBzaGlwTGVuZ3RoO1xuICBsZXQgYXJyYXlMZW5ndGggPSBzZXQubGVuZ3RoIC0gMSAtIGxlbmd0aERpZmY7XG5cbiAgY29vcmRpbmF0ZXMucHVzaChwb3MpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHZhbHVlcyA9IHNldFtpXTtcblxuICAgIGxldCB4ID0gcG9zWzBdO1xuICAgIGxldCB5ID0gcG9zWzFdO1xuICAgIGxldCBtb3ZlID0gW3ggKyB2YWx1ZXNbMF0sIHkgKyB2YWx1ZXNbMV1dO1xuXG4gICAgY29vcmRpbmF0ZXMucHVzaChtb3ZlKTtcbiAgfVxuXG4gIHJldHVybiBjb29yZGluYXRlcztcbn07XG5cbmNvbnN0IGdldENvbXB1dGVyU2hpcHMgPSAoKSA9PiB7XG4gIGxldCBsZW5ndGggPSA1O1xuICBsZXQgcmVwZWF0ID0gMTtcblxuICAvLyBHZXQgY29vcmRpbmF0ZXMgZm9yIGVhY2ggc2hpcFxuICB3aGlsZSAobGVuZ3RoID4gMSkge1xuICAgIGxldCBjb29yZGluYXRlcyA9IGdldExlZ2FsQ29tYm9zKGxlbmd0aCk7XG4gICAgbGV0IGl0ZW1WaXNpdGVkID0gaXNBcnJheUluQXJyYXkodmlzaXRlZCwgY29vcmRpbmF0ZXMpO1xuXG4gICAgd2hpbGUgKGl0ZW1WaXNpdGVkID09PSB0cnVlKSB7XG4gICAgICBjb29yZGluYXRlcyA9IGdldExlZ2FsQ29tYm9zKGxlbmd0aCk7XG4gICAgICBpdGVtVmlzaXRlZCA9IGlzQXJyYXlJbkFycmF5KHZpc2l0ZWQsIGNvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICBjb21wdXRlclNoaXBDb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGVzKTtcblxuICAgIC8vIFB1c2ggY29vcmRpbmF0ZXMgdG8gdGhlIHZpc2l0ZWQgYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGVzW2ldO1xuXG4gICAgICB2aXNpdGVkLnB1c2goY29vcmRpbmF0ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWRqQ29vcmRpbmF0ZXMgPSBnZXRBZGpDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG5cbiAgICAvLyBQdXNoIGFkamFjZW50IGNvb3JkaW5hdGVzIHRvIHRoZSB2aXNpdGVkIGFycmF5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGpDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNvb3JkaW5hdGUgPSBhZGpDb29yZGluYXRlc1tpXTtcblxuICAgICAgdmlzaXRlZC5wdXNoKGNvb3JkaW5hdGUpO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZXMgYm90aCB0aGUgZGVzdHJveWVyIGFuZCB0aGUgc3VibWFyaW5lIGhhdmUgdGhlIHNhbWUgbGVuZ3RoXG4gICAgaWYgKGxlbmd0aCA9PT0gMyAmJiByZXBlYXQgPT09IDEpIHtcbiAgICAgIHJlcGVhdCAtPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggLT0gMTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdldENvbXB1dGVyU2hpcHMsIGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzLCB2aXNpdGVkIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXJTaGlwcywgU2hpcCB9IGZyb20gXCIuL3NoaXBzXCI7XG5cbmNvbnN0IEdhbWVCb2FyZCA9ICgpID0+IHtcbiAgbGV0IGJvYXJkID0gW107XG5cbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGJvYXJkW2ldW2pdID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICBjb25zdCBwbGF5ZXJTaGlwcyA9IFBsYXllclNoaXBzKCk7XG4gIGNvbnN0IHNoaXBzID0gcGxheWVyU2hpcHMuZ2V0U2hpcHMoKTtcblxuICBjb25zdCBwb3B1bGF0ZUJvYXJkID0gKGFycmF5KSA9PiB7XG4gICAgcGxheWVyU2hpcHMuYWRkU2hpcENvb3JkaW5hdGVzKGFycmF5KTtcblxuICAgIC8vIFBsYWNlIGFsbCBzaGlwcyBvbnRvIHRoZSBib2FyZFxuICAgIFNoaXAoKS5wbGFjZVNoaXBzKGJvYXJkLCBzaGlwcyk7XG4gIH07XG5cbiAgY29uc3QgZmluZEF0dGFja2VkU2hpcCA9IChwb3MpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGNvbnN0IGFycmF5ID0gc2hpcHNba2V5XS5jb29yZGluYXRlcztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaV07XG5cbiAgICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHBvc1swXSAmJiBlbGVtZW50WzFdID09PSBwb3NbMV0pIHtcbiAgICAgICAgICByZXR1cm4gc2hpcHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHBvcykgPT4ge1xuICAgIGxldCB4ID0gcG9zWzBdO1xuICAgIGxldCB5ID0gcG9zWzFdO1xuXG4gICAgaWYgKGJvYXJkW3hdW3ldID09PSAxKSB7XG4gICAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSBmaW5kQXR0YWNrZWRTaGlwKHBvcyk7XG5cbiAgICAgIC8vIE1hcmsgYm9hcmQgcG9zaXRpb24gYXMgYXR0YWNrZWRcbiAgICAgIGJvYXJkW3hdW3ldID0gMztcblxuICAgICAgLy8gQWRkIGhpdCBjb3VudCB0byBhdHRhY2tlZCBzaGlwXG4gICAgICBTaGlwKCkuaGl0KGF0dGFja2VkU2hpcCk7XG4gICAgfSBlbHNlIGlmIChib2FyZFt4XVt5XSA9PT0gMCkge1xuICAgICAgLy8gTWFyayBib2FyZCBwb3NpdGlvbiBhcyBhdHRhY2tlZFxuICAgICAgYm9hcmRbeF1beV0gPSAyO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhbGxTaGlwc0Rlc3Ryb3llZCA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBjb25zdCBzaGlwU3RhdGUgPSBzaGlwc1trZXldLmRlc3Ryb3llZDtcblxuICAgICAgaWYgKHNoaXBTdGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb3VudCA9PT0gNSA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUJvYXJkLFxuICAgIGdldEJvYXJkLFxuICAgIHBvcHVsYXRlQm9hcmQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbGxTaGlwc0Rlc3Ryb3llZCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZS1ib2FyZFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyByZW5kZXJCb2FyZHMsIGdhbWVXaW5uZXIgfSBmcm9tIFwiLi9iYXR0bGVzaGlwXCI7XG5pbXBvcnQgeyB1c2VyU2hpcHNDb29yZGluYXRlcyB9IGZyb20gXCIuL3N0YXJ0LW1lbnVcIjtcbmltcG9ydCB7IGNvbXB1dGVyU2hpcENvb3JkaW5hdGVzIH0gZnJvbSBcIi4vY29tcHV0ZXJBSVwiO1xuXG5sZXQgdXNlckdhbWVCb2FyZDtcbmxldCBjb21wdXRlckdhbWVCb2FyZDtcbmxldCB1c2VyO1xubGV0IGNvbXB1dGVyO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICAvLyBDcmVhdGUgUGxheWVyIG9iamVjdHMgYW5kIEdhbWVCb2FyZCBvYmplY3RzIGZvciBlYWNoIHBsYXllclxuICB1c2VyID0gUGxheWVyKFwidXNlclwiKTtcbiAgY29tcHV0ZXIgPSBQbGF5ZXIoXCJjb21wdXRlciBBSVwiKTtcblxuICB1c2VyR2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgLy8gQ3JlYXRlIG5ldyBib2FyZHMgZm9yIGVhY2ggcGxheWVyXG4gIHVzZXJHYW1lQm9hcmQuY3JlYXRlQm9hcmQoKTtcbiAgY29tcHV0ZXJHYW1lQm9hcmQuY3JlYXRlQm9hcmQoKTtcblxuICAvLyBQb3B1bGF0ZSBwbGF5ZXIgYm9hcmRzIHdpdGggc2hpcHNcbiAgdXNlckdhbWVCb2FyZC5wb3B1bGF0ZUJvYXJkKHVzZXJTaGlwc0Nvb3JkaW5hdGVzKTtcbiAgY29tcHV0ZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZChjb21wdXRlclNoaXBDb29yZGluYXRlcyk7XG5cbiAgLy8gICBHZXQgcGxheWVyIGJvYXJkcyBmcm9tIEdhbWVCb2FyZCBvYmplY3RzXG4gIGNvbnN0IHVzZXJCb2FyZCA9IHVzZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG5cbiAgLy8gSW5pdGlhbCBwbGF5ZXIgYm9hcmRzIGFyZSByZW5kZXJlZFxuICByZW5kZXJCb2FyZHMoKS5yZW5kZXJVc2VyQm9hcmQodXNlckJvYXJkKTtcbiAgcmVuZGVyQm9hcmRzKCkucmVuZGVyQ29tcHV0ZXJCb2FyZChjb21wdXRlckJvYXJkKTtcbn07XG5cbmNvbnN0IHBsYXlSb3VuZCA9IChwb3MpID0+IHtcbiAgbGV0IHVzZXJBdHRhY2tzID0gdXNlci5hdHRhY2soY29tcHV0ZXIsIGNvbXB1dGVyR2FtZUJvYXJkLCBwb3MpO1xuXG4gIGlmICh1c2VyQXR0YWNrcyA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgLy8gVXBkYXRlIGNvbXB1dGVyIGJvYXJkIG9uIHRoZSBzY3JlZW5cbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICByZW5kZXJCb2FyZHMoKS5yZW5kZXJDb21wdXRlckJvYXJkKGNvbXB1dGVyQm9hcmQpO1xuXG4gICAgLy8gQ2hlY2sgaWYgYWxsIGNvbXB1dGVyIHNoaXBzIGFyZSBkZXN0cm95ZWRcbiAgICBpZiAoY29tcHV0ZXJHYW1lQm9hcmQuYWxsU2hpcHNEZXN0cm95ZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgZ2FtZVdpbm5lcihcIllvdSBXaW5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29tcHV0ZXIuYXR0YWNrKHVzZXIsIHVzZXJHYW1lQm9hcmQsIHBvcyk7XG5cbiAgICAvLyBVcGRhdGUgdXNlciBib2FyZCBvbiB0aGUgc2NyZWVuXG4gICAgY29uc3QgdXNlckJvYXJkID0gdXNlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuICAgIHJlbmRlckJvYXJkcygpLnJlbmRlclVzZXJCb2FyZCh1c2VyQm9hcmQpO1xuXG4gICAgLy8gQ2hlY2sgaWYgYWxsIHVzZXIgc2hpcHMgYXJlIGRlc3Ryb3llZFxuICAgIGlmICh1c2VyR2FtZUJvYXJkLmFsbFNoaXBzRGVzdHJveWVkKCkgPT09IHRydWUpIHtcbiAgICAgIGdhbWVXaW5uZXIoXCJBSSBXaW5zIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IEdhbWUsIHBsYXlSb3VuZCB9O1xuIiwiaW1wb3J0IFwiLi9zdHlsZXMvZ2xvYmFsLmNzc1wiO1xuaW1wb3J0IEltZyBmcm9tIFwiLi9pbWFnZXMvc3VibWFyaW5lLnBuZ1wiO1xuXG5jb25zdCBwYWdlTGF5b3V0ID0gKCkgPT4ge1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpO1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY29weXJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBjb25zdCBsb2dvID0gbmV3IEltYWdlKCk7XG5cbiAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJcIik7XG4gIG1haW4uY2xhc3NMaXN0LmFkZChcIm1haW4tc2VjdGlvblwiKTtcbiAgZm9vdGVyLmNsYXNzTGlzdC5hZGQoXCJmb290ZXJcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcbiAgY29weXJpZ2h0LmNsYXNzTGlzdC5hZGQoXCJjb3B5cmlnaHRcIik7XG4gIGNvcHlyaWdodC50ZXh0Q29udGVudCA9IFwiQ29weXJpZ2h0IEAgQmF0dGxlc2hpcCAyMDIzXCI7XG4gIGxvZ28uc3JjID0gSW1nO1xuICBsb2dvLmFsdCA9IFwiU3VibWFyaW5lIGxvZ29cIjtcblxuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbyk7XG4gIGZvb3Rlci5hcHBlbmRDaGlsZChjb3B5cmlnaHQpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQobWFpbik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn07XG5cbmV4cG9ydCB7IHBhZ2VMYXlvdXQgfTtcbiIsImxldCB1c2VyQXR0YWNrcyA9IFtdO1xubGV0IGNvbXB1dGVyQXR0YWNrcyA9IFtdO1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcblxuICBjb25zdCBpc0F0dGFja0xlZ2FsID0gKGVuZW15LCBwb3MpID0+IHtcbiAgICBsZXQgYXJyYXk7XG5cbiAgICBpZiAoZW5lbXkgPT09IFwidXNlclwiKSB7XG4gICAgICBhcnJheSA9IGNvbXB1dGVyQXR0YWNrcy5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnJheSA9IHVzZXJBdHRhY2tzLnNsaWNlKCk7XG4gICAgfVxuXG4gICAgd2hpbGUgKGFycmF5Lmxlbmd0aCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5LnNoaWZ0KCk7XG4gICAgICBpZiAoZWxlbWVudFswXSA9PT0gcG9zWzBdICYmIGVsZW1lbnRbMV0gPT09IHBvc1sxXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgR2FtZUJvYXJkLCBwb3MpID0+IHtcbiAgICBjb25zdCBlbmVteU5hbWUgPSBlbmVteS5nZXROYW1lKCk7XG5cbiAgICBjb25zdCBnZXRSYW5kb20gPSAoKSA9PiB7XG4gICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICByZXR1cm4gW3gsIHldO1xuICAgIH07XG5cbiAgICBpZiAoZW5lbXlOYW1lID09PSBcInVzZXJcIikge1xuICAgICAgbGV0IHBvcyA9IGdldFJhbmRvbSgpO1xuICAgICAgbGV0IGNoZWNrTGVnYWwgPSBpc0F0dGFja0xlZ2FsKGVuZW15TmFtZSwgcG9zKTtcblxuICAgICAgd2hpbGUgKGNoZWNrTGVnYWwgPT09IGZhbHNlKSB7XG4gICAgICAgIHBvcyA9IGdldFJhbmRvbSgpO1xuICAgICAgICBjaGVja0xlZ2FsID0gaXNBdHRhY2tMZWdhbChlbmVteU5hbWUsIHBvcyk7XG4gICAgICB9XG5cbiAgICAgIGNvbXB1dGVyQXR0YWNrcy5wdXNoKHBvcyk7XG4gICAgICBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXlOYW1lLCBwb3MpO1xuXG4gICAgICBpZiAoY2hlY2tMZWdhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB1c2VyQXR0YWNrcy5wdXNoKHBvcyk7XG4gICAgICAgIEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGdldE5hbWUsIGlzQXR0YWNrTGVnYWwsIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyLCB1c2VyQXR0YWNrcywgY29tcHV0ZXJBdHRhY2tzIH07XG4iLCJjb25zdCBQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgbGV0IHNoaXBzID0ge1xuICAgIGNhcnJpZXI6IHtcbiAgICAgIGxlbmd0aDogNSxcbiAgICAgIGhpdHM6IDAsXG4gICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgY29vcmRpbmF0ZXM6IFtdLFxuICAgIH0sXG5cbiAgICBiYXR0bGVzaGlwOiB7XG4gICAgICBsZW5ndGg6IDQsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgZGVzdHJveWVyOiB7XG4gICAgICBsZW5ndGg6IDMsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgc3VibWFyaW5lOiB7XG4gICAgICBsZW5ndGg6IDMsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuXG4gICAgcGF0cm9sQm9hdDoge1xuICAgICAgbGVuZ3RoOiAyLFxuICAgICAgaGl0czogMCxcbiAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgICBjb29yZGluYXRlczogW10sXG4gICAgfSxcbiAgfTtcbiAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiBzaGlwcztcblxuICBjb25zdCBhZGRTaGlwQ29vcmRpbmF0ZXMgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgY29weSA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGxldCBzaGlwQXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuICAgICAgbGV0IGFyciA9IGNvcHkuc2hpZnQoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2hpcEFycmF5LnB1c2goYXJyW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0U2hpcHMsIGFkZFNoaXBDb29yZGluYXRlcyB9O1xufTtcblxuY29uc3QgU2hpcCA9ICgpID0+IHtcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChib2FyZCwgc2hpcHMpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGxldCBhcnJheSA9IHNoaXBzW2tleV0uY29vcmRpbmF0ZXM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2ldO1xuICAgICAgICBjb25zdCB4ID0gZWxlbWVudFswXTtcbiAgICAgICAgY29uc3QgeSA9IGVsZW1lbnRbMV07XG5cbiAgICAgICAgYm9hcmRbeF1beV0gPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoc2hpcCkgPT4ge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICBjb25zdCBoaXRzQ291bnQgPSBzaGlwLmhpdHM7XG5cbiAgICAvLyBjaGVjayBzaGlwIGxlbmd0aCBhbmQgbm8gb2YgdGltZXMgaXRzIGJlZW4gaGl0XG4gICAgcmV0dXJuIHNoaXBMZW5ndGggPT09IGhpdHNDb3VudCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0cyArPSAxO1xuXG4gICAgLy8gQWZ0ZXIgZXZlcnkgaGl0LCBjaGVjayBpZiB0aGUgc2hpcCBpcyBkZXN0cm95ZWRcbiAgICBjb25zdCBjaGVja1NoaXAgPSBpc1N1bmsoc2hpcCk7XG5cbiAgICBpZiAoY2hlY2tTaGlwID09PSB0cnVlKSB7XG4gICAgICBzaGlwLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IHBsYWNlU2hpcHMsIGhpdCB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyU2hpcHMsIFNoaXAgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCB7IGdhbWVNZW51IH0gZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWUtY29udHJvbGxlclwiO1xuaW1wb3J0IHtcbiAgZ2V0Q29tcHV0ZXJTaGlwcyxcbiAgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMsXG4gIHZpc2l0ZWQsXG59IGZyb20gXCIuL2NvbXB1dGVyQUlcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0YXJ0bWVudS5jc3NcIjtcblxuY29uc3QgZ2V0U3RhcnRTY3JlZW5Cb2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvYXJkXG4gIGdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2FtZUJvYXJkLmdldEJvYXJkKCk7XG5cbiAgcmV0dXJuIGJvYXJkO1xufTtcblxuY29uc3Qgc3RhcnRNZW51ID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcbiAgY29uc3QgbGVmdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCByaWdodFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBjb25zdCBwYXJhVHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY2FycmllckJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlc2hpcEJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZGVzdHJveWVyQmVydGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzdWJtYXJpbmVCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHBhdHJvbEJvYXRCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgbGVmdFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImxlZnQtc2VjdGlvblwiKTtcbiAgcmlnaHRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJyaWdodC1zZWN0aW9uXCIpO1xuICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwic3RhcnQtbWVudS10YWJsZVwiKTtcbiAgcGFyYS5jbGFzc0xpc3QuYWRkKFwiaW5zdHJ1Y3Rpb25zLW9uZVwiKTtcbiAgcGFyYS50ZXh0Q29udGVudCA9IFwiRHJhZyBhbmQgZHJvcCBzaGlwc1wiO1xuICBwYXJhVHdvLmNsYXNzTGlzdC5hZGQoXCJpbnN0cnVjdGlvbnMtdHdvXCIpO1xuICBwYXJhVHdvLnRleHRDb250ZW50ID0gXCJEb3VibGUgY2xpY2sgdG8gcm90YXRlXCI7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3J0XCIpO1xuICBjYXJyaWVyQmVydGguY2xhc3NMaXN0LmFkZChcImNhcnJpZXItYmVydGhcIik7XG4gIGJhdHRsZXNoaXBCZXJ0aC5jbGFzc0xpc3QuYWRkKFwiYmF0dGxlc2hpcC1iZXJ0aFwiKTtcbiAgZGVzdHJveWVyQmVydGguY2xhc3NMaXN0LmFkZChcImRlc3Ryb3llci1iZXJ0aFwiKTtcbiAgc3VibWFyaW5lQmVydGguY2xhc3NMaXN0LmFkZChcInN1Ym1hcmluZS1iZXJ0aFwiKTtcbiAgcGF0cm9sQm9hdEJlcnRoLmNsYXNzTGlzdC5hZGQoXCJwYXRyb2wtYm9hdC1iZXJ0aFwiKTtcbiAgY2Fycmllci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgY2Fycmllci5pZCA9IFwiY2FycmllclwiO1xuICBjYXJyaWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgY2Fycmllci5kYXRhc2V0LndpZHRoID0gNTtcbiAgY2Fycmllci5kcmFnZ2FibGUgPSB0cnVlO1xuICBiYXR0bGVzaGlwLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBiYXR0bGVzaGlwLmlkID0gXCJiYXR0bGVzaGlwXCI7XG4gIGJhdHRsZXNoaXAuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBiYXR0bGVzaGlwLmRhdGFzZXQud2lkdGggPSA0O1xuICBiYXR0bGVzaGlwLmRyYWdnYWJsZSA9IHRydWU7XG4gIGRlc3Ryb3llci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgZGVzdHJveWVyLmlkID0gXCJkZXN0cm95ZXJcIjtcbiAgZGVzdHJveWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgZGVzdHJveWVyLmRhdGFzZXQud2lkdGggPSAzO1xuICBkZXN0cm95ZXIuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgc3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBzdWJtYXJpbmUuaWQgPSBcInN1Ym1hcmluZVwiO1xuICBzdWJtYXJpbmUuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBzdWJtYXJpbmUuZGF0YXNldC53aWR0aCA9IDM7XG4gIHN1Ym1hcmluZS5kcmFnZ2FibGUgPSB0cnVlO1xuICBwYXRyb2xCb2F0LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBwYXRyb2xCb2F0LmlkID0gXCJwYXRyb2wtYm9hdFwiO1xuICBwYXRyb2xCb2F0LmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgcGF0cm9sQm9hdC5kYXRhc2V0LndpZHRoID0gMjtcbiAgcGF0cm9sQm9hdC5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2V0U3RhcnRTY3JlZW5Cb2FyZCgpO1xuICAvLyBDcmVhdGUgYSBncmlkIG9mIHRhYmxlIHJvd3MgYW5kIHRhYmxlIGNlbGxzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0YWJsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAgIHRhYmxlUm93LmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1yb3dcIik7XG4gICAgdGFibGVSb3cuaWQgPSBgZHJvcHpvbmUtJHtpfWA7XG5cbiAgICBjb25zdCByb3cgPSBib2FyZFtpXTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1jZWxsXCIpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRhYmxlUm93KTtcbiAgfVxuXG4gIGNhcnJpZXJCZXJ0aC5hcHBlbmRDaGlsZChjYXJyaWVyKTtcbiAgYmF0dGxlc2hpcEJlcnRoLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBkZXN0cm95ZXJCZXJ0aC5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzdWJtYXJpbmVCZXJ0aC5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBwYXRyb2xCb2F0QmVydGguYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcnJpZXJCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXBCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc3Ryb3llckJlcnRoKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lQmVydGgpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0QmVydGgpO1xuICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChwYXJhKTtcbiAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHBhcmFUd28pO1xuICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdFNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRTZWN0aW9uKTtcbn07XG5cbmxldCB1c2VyU2hpcHMgPSB7XG4gIGNhcnJpZXI6IG51bGwsXG4gIGJhdHRsZXNoaXA6IG51bGwsXG4gIGRlc3Ryb3llcjogbnVsbCxcbiAgc3VibWFyaW5lOiBudWxsLFxuICBcInBhdHJvbC1ib2F0XCI6IG51bGwsXG59O1xuXG5sZXQgdXNlclNoaXBzQ29vcmRpbmF0ZXMgPSBbXTtcblxuY29uc3Qgc29ydFNoaXBzQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gIGZvciAobGV0IGtleSBpbiB1c2VyU2hpcHMpIHtcbiAgICBsZXQgYXJyID0gdXNlclNoaXBzW2tleV07XG5cbiAgICB1c2VyU2hpcHNDb29yZGluYXRlcy5wdXNoKGFycik7XG4gIH1cbn07XG5cbmNvbnN0IGFsbFNoaXBzUGxhY2VkID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0LXNlY3Rpb25cIik7XG4gIGNvbnN0IHBvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcnRcIik7XG4gIGNvbnN0IG5vZGVMaXN0ID0gcG9ydC5jaGlsZE5vZGVzO1xuXG4gIGxldCBzaGlwcyA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBub2RlTGlzdFtpXTtcblxuICAgIGlmIChlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgc2hpcHMgKz0gMTtcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgXCJzdGFydC1nYW1lXCIgYnV0dG9uIHdoZW4gYWxsIHNoaXBzIGFyZSBwbGFjZWQgb24gdGhlIGJvYXJkXG4gIGlmIChzaGlwcyA9PT0gMCkge1xuICAgIHNvcnRTaGlwc0Nvb3JkaW5hdGVzKCk7XG5cbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzdGFydC1idG5cIik7XG4gICAgYnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiU3RhcnQgR2FtZVwiO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XG4gIH1cbn07XG5cbmNvbnN0IGlzRHJvcFZhbGlkID0gKGluZGV4WCwgaW5kZXhZLCBzaGlwSGVpZ2h0LCBzaGlwV2lkdGgsIG5vZGVMaXN0KSA9PiB7XG4gIC8vIElmIHNoaXAgZHJvcCBleGNlZWRzIHRoZSBib3VuZCBvZiB0aGUgYm9hcmQsIHJldHVybiBmYWxzZVxuICBpZiAoaW5kZXhZICsgc2hpcFdpZHRoID4gMTApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiBUaGlzIGNoZWNrcyBpZiB0aGVyZSBpcyBhIHNoaXAgdG8gdGhlIGltbWVkaWF0ZSB0b3Agb2YgdGhlIFxuICBcImRyb3Agc2hpcFwiLCBhbmQgc3RvcHMgZXhlY3V0aW9uIGlmIGEgcGxhY2VkIHNoaXAgaXMgZGV0ZWN0ZWQuICovXG4gIGNvbnN0IGNoZWNrVG9wID0gKCkgPT4ge1xuICAgIGxldCBkcm9wU3F1YXJlID0gbm9kZUxpc3RbaW5kZXhZXTtcbiAgICBsZXQgcGFyZW50ID0gZHJvcFNxdWFyZS5wYXJlbnROb2RlO1xuICAgIGxldCBwYXJlbnRTaWJsaW5nID0gcGFyZW50LnByZXZpb3VzU2libGluZztcbiAgICBsZXQgc3RhcnRJbmRleCA9IGluZGV4WSAtIDE7XG5cbiAgICBpZiAocGFyZW50U2libGluZyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwV2lkdGggKyAyOyBpKyspIHtcbiAgICAgIC8vIENoZWNrcyBjaGlsZCBub2RlcyBvZiB0aGUgcGFyZW50IHNpYmxpbmdcbiAgICAgIGxldCBzcXVhcmVJbmRleCA9IHN0YXJ0SW5kZXggKyBpO1xuICAgICAgbGV0IG5vZGVMaXN0ID0gcGFyZW50U2libGluZy5jaGlsZE5vZGVzO1xuICAgICAgbGV0IHNxdWFyZSA9IG5vZGVMaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyogVGhpcyBjaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIHRvIHRoZSBpbW1lZGlhdGUgcmlnaHQgb2YgdGhlIFxuICBcImRyb3Agc2hpcFwiLCBhbmQgc3RvcHMgZXhlY3V0aW9uIGlmIGEgcGxhY2VkIHNoaXAgaXMgZGV0ZWN0ZWQuICovXG4gIGNvbnN0IGNoZWNrUmlnaHQgPSAoKSA9PiB7XG4gICAgbGV0IGRyb3BTcXVhcmUgPSBub2RlTGlzdFtpbmRleFldO1xuICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgbGV0IGdyYW5kUGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgbGV0IHBhcmVudExpc3QgPSBncmFuZFBhcmVudC5jaGlsZE5vZGVzO1xuICAgIGxldCBzcXVhcmVJbmRleCA9IGluZGV4WSArIHNoaXBXaWR0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEhlaWdodDsgaSsrKSB7XG4gICAgICBsZXQgaW5kZXggPSBpbmRleFggKyBpO1xuICAgICAgbGV0IGNoaWxkcmVuID0gcGFyZW50TGlzdFtpbmRleF07XG4gICAgICBsZXQgbGlzdCA9IGNoaWxkcmVuLmNoaWxkTm9kZXM7XG4gICAgICBsZXQgc3F1YXJlID0gbGlzdFtzcXVhcmVJbmRleF07XG5cbiAgICAgIGlmIChzcXVhcmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNxdWFyZUNsYXNzID0gc3F1YXJlLmNsYXNzTmFtZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImNhcnJpZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJiYXR0bGVzaGlwXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiZGVzdHJveWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwic3VibWFyaW5lXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwicGF0cm9sLWJvYXRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCB0byB0aGUgaW1tZWRpYXRlIGJvdHRvbSBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tCb3R0b20gPSAoKSA9PiB7XG4gICAgbGV0IGRyb3BTcXVhcmUgPSBub2RlTGlzdFtpbmRleFldO1xuICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgbGV0IHBhcmVudFNpYmxpbmcgPSBwYXJlbnQubmV4dFNpYmxpbmc7XG4gICAgbGV0IHN0YXJ0SW5kZXggPSBpbmRleFkgLSAxO1xuXG4gICAgaWYgKHBhcmVudFNpYmxpbmcgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFdpZHRoICsgMjsgaSsrKSB7XG4gICAgICAvLyBDaGVja3MgY2hpbGQgbm9kZXMgb2YgdGhlIHBhcmVudCBzaWJsaW5nXG4gICAgICBsZXQgc3F1YXJlSW5kZXggPSBzdGFydEluZGV4ICsgaTtcbiAgICAgIGxldCBub2RlTGlzdCA9IHBhcmVudFNpYmxpbmcuY2hpbGROb2RlcztcbiAgICAgIGxldCBzcXVhcmUgPSBub2RlTGlzdFtzcXVhcmVJbmRleF07XG5cbiAgICAgIGlmIChzcXVhcmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNxdWFyZUNsYXNzID0gc3F1YXJlLmNsYXNzTmFtZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImNhcnJpZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJiYXR0bGVzaGlwXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiZGVzdHJveWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwic3VibWFyaW5lXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwicGF0cm9sLWJvYXRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCB0byB0aGUgaW1tZWRpYXRlIGxlZnQgb2YgdGhlIFxuICBcImRyb3Agc2hpcFwiLCBhbmQgc3RvcHMgZXhlY3V0aW9uIGlmIGEgcGxhY2VkIHNoaXAgaXMgZGV0ZWN0ZWQuICovXG4gIGNvbnN0IGNoZWNrTGVmdCA9ICgpID0+IHtcbiAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W2luZGV4WV07XG4gICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICBsZXQgZ3JhbmRQYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICBsZXQgcGFyZW50TGlzdCA9IGdyYW5kUGFyZW50LmNoaWxkTm9kZXM7XG4gICAgbGV0IHNxdWFyZUluZGV4ID0gaW5kZXhZIC0gMTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEhlaWdodDsgaSsrKSB7XG4gICAgICBsZXQgaW5kZXggPSBpbmRleFggKyBpO1xuICAgICAgbGV0IGNoaWxkcmVuID0gcGFyZW50TGlzdFtpbmRleF07XG4gICAgICBsZXQgbGlzdCA9IGNoaWxkcmVuLmNoaWxkTm9kZXM7XG4gICAgICBsZXQgc3F1YXJlID0gbGlzdFtzcXVhcmVJbmRleF07XG5cbiAgICAgIGlmIChzcXVhcmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNxdWFyZUNsYXNzID0gc3F1YXJlLmNsYXNzTmFtZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImNhcnJpZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJiYXR0bGVzaGlwXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiZGVzdHJveWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwic3VibWFyaW5lXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwicGF0cm9sLWJvYXRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGxldCB0b3BWYWxpZCA9IGNoZWNrVG9wKCk7XG4gIGxldCByaWdodFZhbGlkID0gY2hlY2tSaWdodCgpO1xuICBsZXQgYm90dG9tVmFsaWQgPSBjaGVja0JvdHRvbSgpO1xuICBsZXQgbGVmdFZhbGlkID0gY2hlY2tMZWZ0KCk7XG5cbiAgaWYgKFxuICAgIHRvcFZhbGlkID09PSB0cnVlICYmXG4gICAgcmlnaHRWYWxpZCA9PT0gdHJ1ZSAmJlxuICAgIGJvdHRvbVZhbGlkID09PSB0cnVlICYmXG4gICAgbGVmdFZhbGlkID09PSB0cnVlXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKFxuICAgIHRvcFZhbGlkID09PSBmYWxzZSB8fFxuICAgIHJpZ2h0VmFsaWQgPT09IGZhbHNlIHx8XG4gICAgYm90dG9tVmFsaWQgPT09IGZhbHNlIHx8XG4gICAgbGVmdFZhbGlkID09PSBmYWxzZVxuICApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IHN0YXJ0TWVudUV2ZW50SGFuZGxlciA9ICgpID0+IHtcbiAgY29uc3QgbWFpblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKFxuICAgICAgZWxlbWVudC5pZCA9PT0gXCJjYXJyaWVyXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwiYmF0dGxlc2hpcFwiIHx8XG4gICAgICBlbGVtZW50LmlkID09PSBcImRlc3Ryb3llclwiIHx8XG4gICAgICBlbGVtZW50LmlkID09PSBcInN1Ym1hcmluZVwiIHx8XG4gICAgICBlbGVtZW50LmlkID09PSBcInBhdHJvbC1ib2F0XCJcbiAgICApIHtcbiAgICAgIGxldCBoZWlnaHQgPSBlbGVtZW50LmRhdGFzZXQuaGVpZ2h0O1xuICAgICAgbGV0IHdpZHRoID0gZWxlbWVudC5kYXRhc2V0LndpZHRoO1xuXG4gICAgICBlbGVtZW50LmRhdGFzZXQuaGVpZ2h0ID0gd2lkdGg7XG4gICAgICBlbGVtZW50LmRhdGFzZXQud2lkdGggPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVwbGFjZShcImhvcml6b250YWxcIiwgXCJ2ZXJ0aWNhbFwiKTtcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlcGxhY2UoXCJ2ZXJ0aWNhbFwiLCBcImhvcml6b250YWxcIik7XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldC5pZDtcblxuICAgIGlmIChcbiAgICAgIGVsZW1lbnQgPT09IFwiY2FycmllclwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcImJhdHRsZXNoaXBcIiB8fFxuICAgICAgZWxlbWVudCA9PT0gXCJkZXN0cm95ZXJcIiB8fFxuICAgICAgZWxlbWVudCA9PT0gXCJzdWJtYXJpbmVcIiB8fFxuICAgICAgZWxlbWVudCA9PT0gXCJwYXRyb2wtYm9hdFwiXG4gICAgKSB7XG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBlbGVtZW50KTtcblxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgbGV0IHN0ciA9IGVsZW1lbnQ7XG4gICAgICAgIGxldCBsZXR0ZXIgPSBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGxldCB0ZXh0ID0gc3RyLnJlcGxhY2Uoc3RyLmNoYXJBdCgwKSwgbGV0dGVyKTtcbiAgICAgICAgZS50YXJnZXQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gXCJcIjtcbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJ0YWJsZS1jZWxsXCIpIHtcbiAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzIzZmZjZlwiO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidGFibGUtY2VsbFwiKSB7XG4gICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInRhYmxlLWNlbGxcIikge1xuICAgICAgY29uc3QgZHJvcHpvbmUgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGRyb3B6b25lLnBhcmVudE5vZGU7XG4gICAgICBjb25zdCBub2RlTGlzdCA9IHBhcmVudC5jaGlsZE5vZGVzO1xuICAgICAgY29uc3QgZGF0YSA9IGRyb3B6b25lLmRhdGFzZXQucG9zO1xuICAgICAgY29uc3QgYXJyYXkgPSBkYXRhLnNwbGl0KFwiLFwiKTtcbiAgICAgIGNvbnN0IHggPSBwYXJzZUludChhcnJheVswXSk7XG4gICAgICBjb25zdCB5ID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgY29uc3QgZHJhZ2dhYmxlSWQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKTtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcmFnZ2FibGVJZCk7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IGRyYWdnYWJsZUVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgY29uc3Qgc2hpcEhlaWdodCA9IHBhcnNlSW50KGRyYWdnYWJsZUVsZW1lbnQuZGF0YXNldC5oZWlnaHQpO1xuICAgICAgY29uc3Qgc2hpcFdpZHRoID0gcGFyc2VJbnQoZHJhZ2dhYmxlRWxlbWVudC5kYXRhc2V0LndpZHRoKTtcblxuICAgICAgLy8gVGhpcyBjaGVja3MgaWYgdGhlIGRyb3AgaXMgdmFsaWRcbiAgICAgIGxldCB2YWxpZCA9IGlzRHJvcFZhbGlkKHgsIHksIHNoaXBIZWlnaHQsIHNoaXBXaWR0aCwgbm9kZUxpc3QpO1xuICAgICAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgICAvLyBJZiBkcm9wIGlzIG5vdCB2YWxpZCwgc3RvcCBleGVjdXRpb25cbiAgICAgIGlmICh2YWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgbm9kZUxpc3RbeV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgLy8gVGhpcyBhZGRzIGEgdmlzdWFsIGluZGljYXRpb24gd2hlcmUgdGhlIHNoaXAgaXMgZHJvcHBlZFxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHkgKyBpO1xuICAgICAgICAgICAgbm9kZUxpc3RbaW5kZXhdLmNsYXNzTGlzdC5hZGQoZHJhZ2dhYmxlSWQpO1xuICAgICAgICAgICAgbm9kZUxpc3RbaW5kZXhdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzAwOTlkNlwiO1xuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3gsIGluZGV4XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRoaXMgYWRkcyBhIHZpc3VhbCBpbmRpY2F0aW9uIHdoZXJlIHRoZSBzaGlwIGlzIGRyb3BwZWRcbiAgICAgICAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W3ldO1xuICAgICAgICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgICAgICAgbGV0IGdyYW5kUGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgbGV0IHBhcmVudExpc3QgPSBncmFuZFBhcmVudC5jaGlsZE5vZGVzO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwSGVpZ2h0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHggKyBpO1xuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gcGFyZW50TGlzdFtpbmRleF07XG4gICAgICAgICAgICBsZXQgbGlzdCA9IGNoaWxkcmVuLmNoaWxkTm9kZXM7XG5cbiAgICAgICAgICAgIGxpc3RbeV0uY2xhc3NMaXN0LmFkZChkcmFnZ2FibGVJZCk7XG4gICAgICAgICAgICBsaXN0W3ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzAwOTlkNlwiO1xuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW2luZGV4LCB5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlUGFyZW50ID0gZHJhZ2dhYmxlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICBkcmFnZ2FibGVQYXJlbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAgIHVzZXJTaGlwc1tkcmFnZ2FibGVJZF0gPSBzaGlwQ29vcmRpbmF0ZXM7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLmNsZWFyRGF0YSgpO1xuICAgICAgICBhbGxTaGlwc1BsYWNlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJzdGFydC1idG5cIikge1xuICAgICAgbWFpblNlY3Rpb24udGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICBnZXRDb21wdXRlclNoaXBzKCk7XG4gICAgICBnYW1lTWVudSgpO1xuICAgICAgR2FtZSgpO1xuXG4gICAgICB1c2VyU2hpcHNDb29yZGluYXRlcy5sZW5ndGggPSAwO1xuICAgICAgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMubGVuZ3RoID0gMDtcbiAgICAgIHZpc2l0ZWQubGVuZ3RoID0gMDtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgc3RhcnRNZW51LCB1c2VyU2hpcHNDb29yZGluYXRlcywgc3RhcnRNZW51RXZlbnRIYW5kbGVyIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgYm9keS5tb2RhbC1vcGVuIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbmJvZHkubW9kYWwtb3BlbiAudXNlci1jb250YWluZXIsXG5ib2R5Lm1vZGFsLW9wZW4gLmNvbXB1dGVyLWNvbnRhaW5lciB7XG4gIG9wYWNpdHk6IDAuMztcbn1cblxuYm9keS5tb2RhbC1vcGVuIC5wb3AtdXAge1xuICBwb2ludGVyLWV2ZW50czogYXV0bztcbn1cblxuLnBvcC11cCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaGVpZ2h0OiA0MCU7XG4gIHdpZHRoOiA0MCU7XG4gIG1heC1oZWlnaHQ6IDI1MHB4O1xuICBtaW4taGVpZ2h0OiAyMDBweDtcbiAgbWF4LXdpZHRoOiA0NTBweDtcbiAgbWluLXdpZHRoOiAzNTBweDtcbiAgY29sb3I6ICNkMWQ0ZGM7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDUsIDY3LCA5MCwgMC44KTtcbiAgcGFkZGluZzogMTBweDtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDIsIDFmcik7XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyMHB4O1xufVxuXG4udXNlci1jb250YWluZXIsXG4uY29tcHV0ZXItY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMjBweDtcbn1cblxuLnVzZXItYmF0dGxlZmllbGQsXG4uY29tcHV0ZXItYmF0dGxlZmllbGQge1xuICBoZWlnaHQ6IDM1MHB4O1xuICB3aWR0aDogMzUwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLnVzZXItYmF0dGxlZmllbGQge1xuICBqdXN0aWZ5LXNlbGY6IGVuZDtcbn1cblxuLmNvbXB1dGVyLWJhdHRsZWZpZWxkIHtcbiAganVzdGlmeS1zZWxmOiBzdGFydDtcbn1cblxuLnNxdWFyZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMxMzFjMjY7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc2hpcC1zcXVhcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5OWQ2O1xufVxuXG4uc2hpcC1taXNzZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWVhMGExO1xufVxuXG4uc2hpcC1oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYxYTFhO1xufVxuXG4ucmVzdGFydC1idG4ge1xuICBoZWlnaHQ6IDU1cHg7XG4gIHdpZHRoOiAxMTBweDtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMThiYzljO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogMTBweDtcbn1cblxuLnBvcC11cCBoMyB7XG4gIGZvbnQtc2l6ZTogMi41cmVtO1xufVxuXG4ucmVzdGFydC1idG46aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWJkM2FmO1xuICBoZWlnaHQ6IDYwcHg7XG4gIHdpZHRoOiAxMTVweDtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9nYW1lbWVudS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7O0VBRUUsWUFBWTtBQUNkOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCx1Q0FBdUM7RUFDdkMsYUFBYTtFQUNiLFFBQVE7RUFDUixTQUFTO0VBQ1QsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYixrQ0FBa0M7RUFDbEMscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixTQUFTO0FBQ1g7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixZQUFZO0FBQ2RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keS5tb2RhbC1vcGVuIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG5ib2R5Lm1vZGFsLW9wZW4gLnVzZXItY29udGFpbmVyLFxcbmJvZHkubW9kYWwtb3BlbiAuY29tcHV0ZXItY29udGFpbmVyIHtcXG4gIG9wYWNpdHk6IDAuMztcXG59XFxuXFxuYm9keS5tb2RhbC1vcGVuIC5wb3AtdXAge1xcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XFxufVxcblxcbi5wb3AtdXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiA0MCU7XFxuICB3aWR0aDogNDAlO1xcbiAgbWF4LWhlaWdodDogMjUwcHg7XFxuICBtaW4taGVpZ2h0OiAyMDBweDtcXG4gIG1heC13aWR0aDogNDUwcHg7XFxuICBtaW4td2lkdGg6IDM1MHB4O1xcbiAgY29sb3I6ICNkMWQ0ZGM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQ1LCA2NywgOTAsIDAuOCk7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLnVzZXItY29udGFpbmVyLFxcbi5jb21wdXRlci1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi51c2VyLWJhdHRsZWZpZWxkLFxcbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XFxuICBoZWlnaHQ6IDM1MHB4O1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi51c2VyLWJhdHRsZWZpZWxkIHtcXG4gIGp1c3RpZnktc2VsZjogZW5kO1xcbn1cXG5cXG4uY29tcHV0ZXItYmF0dGxlZmllbGQge1xcbiAganVzdGlmeS1zZWxmOiBzdGFydDtcXG59XFxuXFxuLnNxdWFyZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMTMxYzI2O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNoaXAtc3F1YXJlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDk5ZDY7XFxufVxcblxcbi5zaGlwLW1pc3NlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWVhMGExO1xcbn1cXG5cXG4uc2hpcC1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMWExYTtcXG59XFxuXFxuLnJlc3RhcnQtYnRuIHtcXG4gIGhlaWdodDogNTVweDtcXG4gIHdpZHRoOiAxMTBweDtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxOGJjOWM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbn1cXG5cXG4ucG9wLXVwIGgzIHtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4ucmVzdGFydC1idG46aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFiZDNhZjtcXG4gIGhlaWdodDogNjBweDtcXG4gIHdpZHRoOiAxMTVweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9QmxhY2srT3BzK09uZSZmYW1pbHk9T3BlbitTYW5zJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuYm9keSB7XG4gIGhlaWdodDogMTAwdmg7XG4gIGZvbnQtZmFtaWx5OiBcIkJsYWNrIE9wcyBPbmVcIiwgY3Vyc2l2ZTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBjb2xvcjogI2QxZDRkYztcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEzMWMyNjtcbn1cblxuLmNvbnRlbnQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAxMHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDEwMHB4IDFmciAxMDBweDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxZnIgMTAwcHg7XG59XG5cbi5tYWluLXNlY3Rpb24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGdyaWQtY29sdW1uOiAyIC8gMztcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoNDAwcHgsIDYwMHB4KSBtaW5tYXgoNDAwcHgsIDYwMHB4KTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5oZWFkZXIge1xuICBncmlkLWNvbHVtbjogMiAvIDM7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbn1cblxuLmZvb3RlciB7XG4gIGdyaWQtY29sdW1uOiAyIC8gMztcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmgxIHtcbiAgZm9udC1mYW1pbHk6IFwiQmxhY2sgT3BzIE9uZVwiLCBjdXJzaXZlO1xuICBmb250LXNpemU6IDNyZW07XG59XG5cbi5mb290ZXIgcCB7XG4gIGZvbnQtZmFtaWx5OiBcIk9wZW4gU2Fuc1wiLCBzYW5zLXNlcmlmO1xufVxuXG5pbWcge1xuICB3aWR0aDogNjBweDtcbiAganVzdGlmeS1zZWxmOiBlbmQ7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHFDQUFxQztFQUNyQyxlQUFlO0VBQ2YsY0FBYztFQUNkLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsZ0VBQWdFO0VBQ2hFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsYUFBYTtFQUNiLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHFDQUFxQztFQUNyQyxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsV0FBVztFQUNYLGlCQUFpQjtBQUNuQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1CbGFjaytPcHMrT25lJmZhbWlseT1PcGVuK1NhbnMmZGlzcGxheT1zd2FwXFxcIik7XFxuXFxuKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJCbGFjayBPcHMgT25lXFxcIiwgY3Vyc2l2ZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGNvbG9yOiAjZDFkNGRjO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEzMWMyNjtcXG59XFxuXFxuLmNvbnRlbnQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMTAwcHggMWZyIDEwMHB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxZnIgMTAwcHg7XFxufVxcblxcbi5tYWluLXNlY3Rpb24ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDQwMHB4LCA2MDBweCkgbWlubWF4KDQwMHB4LCA2MDBweCk7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmhlYWRlciB7XFxuICBncmlkLWNvbHVtbjogMiAvIDM7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG59XFxuXFxuLmZvb3RlciB7XFxuICBncmlkLWNvbHVtbjogMiAvIDM7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5oMSB7XFxuICBmb250LWZhbWlseTogXFxcIkJsYWNrIE9wcyBPbmVcXFwiLCBjdXJzaXZlO1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbn1cXG5cXG4uZm9vdGVyIHAge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJPcGVuIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5pbWcge1xcbiAgd2lkdGg6IDYwcHg7XFxuICBqdXN0aWZ5LXNlbGY6IGVuZDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAubGVmdC1zZWN0aW9uIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ucmlnaHQtc2VjdGlvbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMDBweCAxMDBweCAxZnI7XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnN0YXJ0LW1lbnUtdGFibGUge1xuICBoZWlnaHQ6IDQwMHB4O1xuICB3aWR0aDogNDAwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG59XG5cbnRib2R5IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4udGFibGUtcm93IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLnRhYmxlLWNlbGwge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMTMxYzI2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDFkNGRjO1xufVxuXG4uaW5zdHJ1Y3Rpb25zLW9uZSB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBhbGlnbi1zZWxmOiBzZWxmLWVuZDtcbn1cblxuLnBvcnQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbi1jb250ZW50IGF1dG87XG4gIGdyaWQtYXV0by1yb3dzOiBtaW5tYXgobWluLWNvbnRlbnQsIG1heC1jb250ZW50KTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5jYXJyaWVyLWJlcnRoLFxuLmJhdHRsZXNoaXAtYmVydGgsXG4uZGVzdHJveWVyLWJlcnRoLFxuLnN1Ym1hcmluZS1iZXJ0aCxcbi5wYXRyb2wtYm9hdC1iZXJ0aCB7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbiNjYXJyaWVyLmhvcml6b250YWwge1xuICBoZWlnaHQ6IDM1cHg7XG4gIHdpZHRoOiAyMDBweDtcbn1cbiNiYXR0bGVzaGlwLmhvcml6b250YWwge1xuICBoZWlnaHQ6IDM1cHg7XG4gIHdpZHRoOiAxNjBweDtcbn1cblxuI2Rlc3Ryb3llci5ob3Jpem9udGFsLFxuI3N1Ym1hcmluZS5ob3Jpem9udGFsIHtcbiAgaGVpZ2h0OiAzNXB4O1xuICB3aWR0aDogMTIwcHg7XG59XG5cbiNwYXRyb2wtYm9hdC5ob3Jpem9udGFsIHtcbiAgaGVpZ2h0OiAzNXB4O1xuICB3aWR0aDogODBweDtcbn1cblxuI2NhcnJpZXIudmVydGljYWwge1xuICBoZWlnaHQ6IDIwMHB4O1xuICB3aWR0aDogMzVweDtcbn1cblxuI2JhdHRsZXNoaXAudmVydGljYWwge1xuICBoZWlnaHQ6IDE2MHB4O1xuICB3aWR0aDogMzVweDtcbn1cblxuI2Rlc3Ryb3llci52ZXJ0aWNhbCxcbiNzdWJtYXJpbmUudmVydGljYWwge1xuICBoZWlnaHQ6IDEyMHB4O1xuICB3aWR0aDogMzVweDtcbn1cblxuI3BhdHJvbC1ib2F0LnZlcnRpY2FsIHtcbiAgaGVpZ2h0OiA4MHB4O1xuICB3aWR0aDogMzVweDtcbn1cblxuI2NhcnJpZXIsXG4jYmF0dGxlc2hpcCxcbiNkZXN0cm95ZXIsXG4jc3VibWFyaW5lLFxuI3BhdHJvbC1ib2F0IHtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBjb2xvcjogIzAzMDIwMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwOTlkNjtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnN0YXJ0LWJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaGVpZ2h0OiA4MHB4O1xuICB3aWR0aDogMTYwcHg7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE4YmM5YztcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnN0YXJ0LWJ0bjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYmQzYWY7XG4gIGhlaWdodDogODVweDtcbiAgd2lkdGg6IDE2NXB4O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3N0YXJ0bWVudS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsbUNBQW1DO0VBQ25DLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxnREFBZ0Q7RUFDaEQsdUJBQXVCO0FBQ3pCOztBQUVBOzs7OztFQUtFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7QUFDQTtFQUNFLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7O0VBRUUsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTs7Ozs7RUFLRSxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFFBQVE7RUFDUixTQUFTO0VBQ1QsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixZQUFZO0FBQ2RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmxlZnQtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnJpZ2h0LXNlY3Rpb24ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTAwcHggMTAwcHggMWZyO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0LW1lbnUtdGFibGUge1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbnRib2R5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4udGFibGUtcm93IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnRhYmxlLWNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzEzMWMyNjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkMWQ0ZGM7XFxufVxcblxcbi5pbnN0cnVjdGlvbnMtb25lIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgYWxpZ24tc2VsZjogc2VsZi1lbmQ7XFxufVxcblxcbi5wb3J0IHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgYXV0bztcXG4gIGdyaWQtYXV0by1yb3dzOiBtaW5tYXgobWluLWNvbnRlbnQsIG1heC1jb250ZW50KTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uY2Fycmllci1iZXJ0aCxcXG4uYmF0dGxlc2hpcC1iZXJ0aCxcXG4uZGVzdHJveWVyLWJlcnRoLFxcbi5zdWJtYXJpbmUtYmVydGgsXFxuLnBhdHJvbC1ib2F0LWJlcnRoIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbiNjYXJyaWVyLmhvcml6b250YWwge1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbn1cXG4jYmF0dGxlc2hpcC5ob3Jpem9udGFsIHtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuXFxuI2Rlc3Ryb3llci5ob3Jpem9udGFsLFxcbiNzdWJtYXJpbmUuaG9yaXpvbnRhbCB7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICB3aWR0aDogMTIwcHg7XFxufVxcblxcbiNwYXRyb2wtYm9hdC5ob3Jpem9udGFsIHtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiA4MHB4O1xcbn1cXG5cXG4jY2Fycmllci52ZXJ0aWNhbCB7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgd2lkdGg6IDM1cHg7XFxufVxcblxcbiNiYXR0bGVzaGlwLnZlcnRpY2FsIHtcXG4gIGhlaWdodDogMTYwcHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxuI2Rlc3Ryb3llci52ZXJ0aWNhbCxcXG4jc3VibWFyaW5lLnZlcnRpY2FsIHtcXG4gIGhlaWdodDogMTIwcHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxuI3BhdHJvbC1ib2F0LnZlcnRpY2FsIHtcXG4gIGhlaWdodDogODBweDtcXG4gIHdpZHRoOiAzNXB4O1xcbn1cXG5cXG4jY2FycmllcixcXG4jYmF0dGxlc2hpcCxcXG4jZGVzdHJveWVyLFxcbiNzdWJtYXJpbmUsXFxuI3BhdHJvbC1ib2F0IHtcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXG4gIGNvbG9yOiAjMDMwMjAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwOTlkNjtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydC1idG4ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgd2lkdGg6IDE2MHB4O1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE4YmM5YztcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0LWJ0bjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWJkM2FmO1xcbiAgaGVpZ2h0OiA4NXB4O1xcbiAgd2lkdGg6IDE2NXB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nYW1lbWVudS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dhbWVtZW51LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nbG9iYWwuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nbG9iYWwuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0YXJ0bWVudS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0YXJ0bWVudS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgcGFnZUxheW91dCB9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHsgc3RhcnRNZW51LCBzdGFydE1lbnVFdmVudEhhbmRsZXIgfSBmcm9tIFwiLi9zdGFydC1tZW51XCI7XG5pbXBvcnQgeyBnYW1lTWVudUV2ZW50SGFuZGxlciB9IGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcblxuY29uc3QgY29tcG9uZW50ID0gKCkgPT4ge1xuICBwYWdlTGF5b3V0KCk7XG5cbiAgc3RhcnRNZW51KCk7XG5cbiAgc3RhcnRNZW51RXZlbnRIYW5kbGVyKCk7XG5cbiAgZ2FtZU1lbnVFdmVudEhhbmRsZXIoKTtcbn07XG5jb21wb25lbnQoKTtcbiJdLCJuYW1lcyI6WyJzdGFydE1lbnUiLCJzdGFydE1lbnVFdmVudEhhbmRsZXIiLCJwbGF5Um91bmQiLCJ1c2VyQXR0YWNrcyIsImNvbXB1dGVyQXR0YWNrcyIsImdhbWVNZW51IiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJjb250YWluZXJPbmUiLCJjcmVhdGVFbGVtZW50IiwiY29udGFpbmVyVHdvIiwiYmF0dGxlZmllbGRPbmUiLCJiYXR0bGVmaWVsZFR3byIsImJhdHRsZWZpZWxkT25lUGFyYSIsImJhdHRsZWZpZWxkVHdvUGFyYSIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwicmVuZGVyQm9hcmRzIiwidXNlckJhdHRsZWZpZWxkIiwiY29tcHV0ZXJCYXR0bGVmaWVsZCIsInJlbmRlclVzZXJCb2FyZCIsImJvYXJkIiwiaSIsImxlbmd0aCIsInJvdyIsImoiLCJidG4iLCJkYXRhIiwidHlwZSIsImRhdGFzZXQiLCJwb3MiLCJyZW5kZXJDb21wdXRlckJvYXJkIiwiZ2FtZVdpbm5lciIsIndpbm5lciIsInBvcFVwIiwid2lubmVyQW5ub3VuY2VyIiwicmVzdGFydEJ1dHRvbiIsImJvZHkiLCJ0b2dnbGUiLCJnYW1lTWVudUV2ZW50SGFuZGxlciIsIm1haW5TZWN0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJlbGVtZW50IiwidGFyZ2V0IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcnJheSIsInNwbGl0IiwicGFyc2VJbnQiLCJjb21wdXRlclNoaXBDb29yZGluYXRlcyIsInZpc2l0ZWQiLCJpc0FycmF5SW5BcnJheSIsInNvdXJjZSIsInNlYXJjaCIsInNlYXJjaEVsZSIsInNvdXJjZUVsZSIsImdldEFkakNvb3JkaW5hdGVzIiwiY29vcmRpbmF0ZXMiLCJhZGpQb3NpdGlvbnMiLCJvcmllbnRhdGlvbiIsIm9uZSIsInR3byIsImFkakxlZnQiLCJhZGpSaWdodCIsInB1c2giLCJhZGpUb3AiLCJsZWZ0IiwicmlnaHQiLCJhZGpCb3R0b20iLCJ0b3AiLCJib3R0b20iLCJnZXRSYW5kb21Qb3NpdGlvbiIsInZhbGlkIiwieCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInkiLCJnZXRMZWdhbENvbWJvcyIsInNoaXBMZW5ndGgiLCJsZWdhbENvbWJvcyIsInNldCIsImxlbmd0aERpZmYiLCJhcnJheUxlbmd0aCIsInZhbHVlcyIsIm1vdmUiLCJnZXRDb21wdXRlclNoaXBzIiwicmVwZWF0IiwiaXRlbVZpc2l0ZWQiLCJjb29yZGluYXRlIiwiYWRqQ29vcmRpbmF0ZXMiLCJQbGF5ZXJTaGlwcyIsIlNoaXAiLCJHYW1lQm9hcmQiLCJjcmVhdGVCb2FyZCIsImdldEJvYXJkIiwicGxheWVyU2hpcHMiLCJzaGlwcyIsImdldFNoaXBzIiwicG9wdWxhdGVCb2FyZCIsImFkZFNoaXBDb29yZGluYXRlcyIsInBsYWNlU2hpcHMiLCJmaW5kQXR0YWNrZWRTaGlwIiwia2V5IiwicmVjZWl2ZUF0dGFjayIsImF0dGFja2VkU2hpcCIsImhpdCIsImFsbFNoaXBzRGVzdHJveWVkIiwiY291bnQiLCJzaGlwU3RhdGUiLCJkZXN0cm95ZWQiLCJQbGF5ZXIiLCJ1c2VyU2hpcHNDb29yZGluYXRlcyIsInVzZXJHYW1lQm9hcmQiLCJjb21wdXRlckdhbWVCb2FyZCIsInVzZXIiLCJjb21wdXRlciIsIkdhbWUiLCJ1c2VyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwiYXR0YWNrIiwiSW1nIiwicGFnZUxheW91dCIsImNvbnRlbnQiLCJoZWFkZXIiLCJtYWluIiwiZm9vdGVyIiwiY29weXJpZ2h0IiwidGl0bGUiLCJsb2dvIiwiSW1hZ2UiLCJzcmMiLCJhbHQiLCJuYW1lIiwiZ2V0TmFtZSIsImlzQXR0YWNrTGVnYWwiLCJlbmVteSIsInNsaWNlIiwic2hpZnQiLCJlbmVteU5hbWUiLCJnZXRSYW5kb20iLCJjaGVja0xlZ2FsIiwiY2FycmllciIsImhpdHMiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsImNvcHkiLCJzaGlwQXJyYXkiLCJhcnIiLCJpc1N1bmsiLCJzaGlwIiwiaGl0c0NvdW50IiwiY2hlY2tTaGlwIiwiZ2V0U3RhcnRTY3JlZW5Cb2FyZCIsImdhbWVCb2FyZCIsImxlZnRTZWN0aW9uIiwicmlnaHRTZWN0aW9uIiwidGFibGUiLCJ0YWJsZUJvZHkiLCJwYXJhIiwicGFyYVR3byIsInNoaXBzQ29udGFpbmVyIiwiY2FycmllckJlcnRoIiwiYmF0dGxlc2hpcEJlcnRoIiwiZGVzdHJveWVyQmVydGgiLCJzdWJtYXJpbmVCZXJ0aCIsInBhdHJvbEJvYXRCZXJ0aCIsImlkIiwiaGVpZ2h0Iiwid2lkdGgiLCJkcmFnZ2FibGUiLCJ0YWJsZVJvdyIsImNlbGwiLCJ1c2VyU2hpcHMiLCJzb3J0U2hpcHNDb29yZGluYXRlcyIsImFsbFNoaXBzUGxhY2VkIiwicG9ydCIsIm5vZGVMaXN0IiwiY2hpbGROb2RlcyIsImhhc0NoaWxkTm9kZXMiLCJpc0Ryb3BWYWxpZCIsImluZGV4WCIsImluZGV4WSIsInNoaXBIZWlnaHQiLCJzaGlwV2lkdGgiLCJjaGVja1RvcCIsImRyb3BTcXVhcmUiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwicGFyZW50U2libGluZyIsInByZXZpb3VzU2libGluZyIsInN0YXJ0SW5kZXgiLCJzcXVhcmVJbmRleCIsInNxdWFyZSIsInVuZGVmaW5lZCIsInNxdWFyZUNsYXNzIiwiaW5jbHVkZXMiLCJjaGVja1JpZ2h0IiwiZ3JhbmRQYXJlbnQiLCJwYXJlbnRMaXN0IiwiaW5kZXgiLCJjaGlsZHJlbiIsImxpc3QiLCJjaGVja0JvdHRvbSIsIm5leHRTaWJsaW5nIiwiY2hlY2tMZWZ0IiwidG9wVmFsaWQiLCJyaWdodFZhbGlkIiwiYm90dG9tVmFsaWQiLCJsZWZ0VmFsaWQiLCJyZXBsYWNlIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInN0ciIsImxldHRlciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwidGV4dCIsInByZXZlbnREZWZhdWx0IiwiZHJvcHpvbmUiLCJkcmFnZ2FibGVJZCIsImdldERhdGEiLCJkcmFnZ2FibGVFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzaGlwQ29vcmRpbmF0ZXMiLCJkcmFnZ2FibGVQYXJlbnQiLCJjbGVhckRhdGEiLCJjb21wb25lbnQiXSwic291cmNlUm9vdCI6IiJ9