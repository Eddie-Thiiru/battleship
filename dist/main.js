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
  containerOne.appendChild(battlefieldOnePara);
  containerTwo.appendChild(battlefieldTwoPara);
  containerOne.appendChild(battlefieldOne);
  containerTwo.appendChild(battlefieldTwo);
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
      let row = board[i];
      for (let j = 0; j < row.length; j++) {
        const btn = document.createElement("button");
        let data = board[i][j];
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
      let row = board[i];
      for (let j = 0; j < row.length; j++) {
        const btn = document.createElement("button");
        let data = board[i][j];
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
    let element = e.target;
    if (element.className === "square computer") {
      element.style.backgroundColor = "#23ffcf";
    }
  });
  mainSection.addEventListener("mouseout", e => {
    let element = e.target;
    if (element.className === "square computer") {
      element.style.backgroundColor = "";
    }
  });
  mainSection.addEventListener("click", e => {
    let element = e.target;
    if (element.className === "square computer") {
      let data = element.dataset.pos;
      let array = data.split(",");
      let pos = [parseInt(array[0]), parseInt(array[1])];
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
      let element = coordinates[i];
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
      let element = coordinates[i];
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
    let values = set[i];
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
      let array = ships[key].coordinates;
      for (let i = 0; i < array.length; i++) {
        let element = array[i];
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
      let shipState = ships[key].destroyed;
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

  // Get player boards from GameBoard objects
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
  copyright.textContent = "@ Eddie Thiiru 2023";
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
      let element = array.shift();
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

      // While random attack is illegal, get new attack coordinate
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
        let element = array[i];
        let x = element[0];
        let y = element[1];
        board[x][y] = 1;
      }
    }
  };
  const isSunk = ship => {
    let shipLength = ship.length;
    let hitsCount = ship.hits;

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

.user-container p,
.computer-container p {
  padding: 5px;
}

.computer-container {
  margin-top: 10px;
}

.restart-btn:hover {
  background-color: #1bd3af;
  height: 60px;
  width: 115px;
}
`, "",{"version":3,"sources":["webpack://./src/styles/gamemenu.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;AACtB;;AAEA;;EAEE,YAAY;AACd;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,UAAU;EACV,iBAAiB;EACjB,iBAAiB;EACjB,gBAAgB;EAChB,gBAAgB;EAChB,cAAc;EACd,uCAAuC;EACvC,aAAa;EACb,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,kCAAkC;EAClC,qBAAqB;EACrB,mBAAmB;EACnB,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;EAEE,aAAa;EACb,YAAY;EACZ,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,yBAAyB;EACzB,YAAY;EACZ,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,iBAAiB;AACnB;;AAEA;;EAEE,YAAY;AACd;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,YAAY;AACd","sourcesContent":["body.modal-open {\n  pointer-events: none;\n}\n\nbody.modal-open .user-container,\nbody.modal-open .computer-container {\n  opacity: 0.3;\n}\n\nbody.modal-open .pop-up {\n  pointer-events: auto;\n}\n\n.pop-up {\n  position: absolute;\n  height: 40%;\n  width: 40%;\n  max-height: 250px;\n  min-height: 200px;\n  max-width: 450px;\n  min-width: 350px;\n  color: #d1d4dc;\n  background-color: rgba(45, 67, 90, 0.8);\n  padding: 10px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: grid;\n  grid-template-rows: repeat(2, 1fr);\n  justify-items: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.user-container,\n.computer-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.user-battlefield,\n.computer-battlefield {\n  height: 350px;\n  width: 350px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.user-battlefield {\n  justify-self: end;\n}\n\n.computer-battlefield {\n  justify-self: start;\n}\n\n.square {\n  border: 1px solid #131c26;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.ship-square {\n  background-color: #0099d6;\n}\n\n.ship-missed {\n  background-color: #9ea0a1;\n}\n\n.ship-hit {\n  background-color: #ff1a1a;\n}\n\n.restart-btn {\n  height: 55px;\n  width: 110px;\n  font-size: 1.25rem;\n  background-color: #18bc9c;\n  border: none;\n  border-radius: 5px;\n  padding: 10px;\n}\n\n.pop-up h3 {\n  font-size: 2.5rem;\n}\n\n.user-container p,\n.computer-container p {\n  padding: 5px;\n}\n\n.computer-container {\n  margin-top: 10px;\n}\n\n.restart-btn:hover {\n  background-color: #1bd3af;\n  height: 60px;\n  width: 115px;\n}\n"],"sourceRoot":""}]);
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
  min-height: 100vh;
  font-family: "Black Ops One", cursive;
  font-size: 1rem;
  color: #d1d4dc;
  background-color: #131c26;
  display: grid;
}

.content {
  height: 100%;
  width: 100%;
  padding: 20px 50px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 1fr 70px;
}

.main-section {
  padding: 10px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 500px));
  justify-content: center;
}

.header {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

.footer {
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
`, "",{"version":3,"sources":["webpack://./src/styles/global.css"],"names":[],"mappings":"AAEA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;EACjB,qCAAqC;EACrC,eAAe;EACf,cAAc;EACd,yBAAyB;EACzB,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,aAAa;EACb,0BAA0B;EAC1B,iCAAiC;AACnC;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,aAAa;EACb,6DAA6D;EAC7D,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,qCAAqC;EACrC,eAAe;AACjB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,WAAW;EACX,iBAAiB;AACnB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Open+Sans&display=swap\");\n\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  min-height: 100vh;\n  font-family: \"Black Ops One\", cursive;\n  font-size: 1rem;\n  color: #d1d4dc;\n  background-color: #131c26;\n  display: grid;\n}\n\n.content {\n  height: 100%;\n  width: 100%;\n  padding: 20px 50px;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 70px 1fr 70px;\n}\n\n.main-section {\n  padding: 10px;\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 500px));\n  justify-content: center;\n}\n\n.header {\n  padding: 10px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  align-items: center;\n}\n\n.footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nh1 {\n  font-family: \"Black Ops One\", cursive;\n  font-size: 3rem;\n}\n\n.footer p {\n  font-family: \"Open Sans\", sans-serif;\n}\n\nimg {\n  width: 60px;\n  justify-self: end;\n}\n"],"sourceRoot":""}]);
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

#carrier.horizontal,
#battleship.horizontal,
#destroyer.horizontal,
#submarine.horizontal,
#patrol-boat.horizontal {
  height: 35px;
}

#carrier.horizontal {
  width: 200px;
}

#battleship.horizontal {
  width: 160px;
}

#destroyer.horizontal,
#submarine.horizontal {
  width: 120px;
}

#patrol-boat.horizontal {
  width: 80px;
}

#carrier.vertical,
#battleship.vertical,
#destroyer.vertical,
#submarine.vertical,
#patrol-boat.vertical {
  width: 35px;
}

#carrier.vertical {
  height: 200px;
}

#battleship.vertical {
  height: 160px;
}

#destroyer.vertical,
#submarine.vertical {
  height: 120px;
}

#patrol-boat.vertical {
  height: 80px;
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

@media (max-width: 600px) {
  .start-menu-table {
    height: 300px;
    width: 300px;
  }

  #carrier.horizontal,
  #battleship.horizontal,
  #destroyer.horizontal,
  #submarine.horizontal,
  #patrol-boat.horizontal {
    height: 25px;
  }

  #carrier.horizontal {
    width: 150px;
  }

  #battleship.horizontal {
    width: 120px;
  }

  #destroyer.horizontal,
  #submarine.horizontal {
    width: 90px;
  }

  #patrol-boat.horizontal {
    width: 60px;
  }

  #carrier.vertical,
  #battleship.vertical,
  #destroyer.vertical,
  #submarine.vertical,
  #patrol-boat.vertical {
    width: 25px;
  }

  #carrier.vertical {
    height: 150px;
  }

  #battleship.vertical {
    height: 120px;
  }

  #destroyer.vertical,
  #submarine.vertical {
    height: 90px;
  }

  #patrol-boat.vertical {
    height: 60px;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/startmenu.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,mCAAmC;EACnC,qBAAqB;EACrB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,yBAAyB;EACzB,yBAAyB;AAC3B;;AAEA;EACE,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,uCAAuC;EACvC,gDAAgD;EAChD,uBAAuB;AACzB;;AAEA;;;;;EAKE,aAAa;AACf;;AAEA;;;;;EAKE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;;EAEE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;;;;;EAKE,WAAW;AACb;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,YAAY;AACd;;AAEA;;;;;EAKE,kBAAkB;EAClB,cAAc;EACd,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,yBAAyB;EACzB,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE;IACE,aAAa;IACb,YAAY;EACd;;EAEA;;;;;IAKE,YAAY;EACd;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,YAAY;EACd;;EAEA;;IAEE,WAAW;EACb;;EAEA;IACE,WAAW;EACb;;EAEA;;;;;IAKE,WAAW;EACb;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,aAAa;EACf;;EAEA;;IAEE,YAAY;EACd;;EAEA;IACE,YAAY;EACd;AACF","sourcesContent":[".left-section {\n  display: grid;\n  justify-items: center;\n  align-items: center;\n}\n\n.right-section {\n  position: relative;\n  display: grid;\n  grid-template-rows: 100px 100px 1fr;\n  justify-items: center;\n  align-items: center;\n}\n\n.start-menu-table {\n  height: 400px;\n  width: 400px;\n  display: grid;\n}\n\ntbody {\n  width: 100%;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.table-row {\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.table-cell {\n  border: 1px solid #131c26;\n  background-color: #d1d4dc;\n}\n\n.instructions-one {\n  font-size: 1.5rem;\n  align-self: self-end;\n}\n\n.port {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-columns: min-content auto;\n  grid-auto-rows: minmax(min-content, max-content);\n  justify-content: center;\n}\n\n.carrier-berth,\n.battleship-berth,\n.destroyer-berth,\n.submarine-berth,\n.patrol-boat-berth {\n  padding: 10px;\n}\n\n#carrier.horizontal,\n#battleship.horizontal,\n#destroyer.horizontal,\n#submarine.horizontal,\n#patrol-boat.horizontal {\n  height: 35px;\n}\n\n#carrier.horizontal {\n  width: 200px;\n}\n\n#battleship.horizontal {\n  width: 160px;\n}\n\n#destroyer.horizontal,\n#submarine.horizontal {\n  width: 120px;\n}\n\n#patrol-boat.horizontal {\n  width: 80px;\n}\n\n#carrier.vertical,\n#battleship.vertical,\n#destroyer.vertical,\n#submarine.vertical,\n#patrol-boat.vertical {\n  width: 35px;\n}\n\n#carrier.vertical {\n  height: 200px;\n}\n\n#battleship.vertical {\n  height: 160px;\n}\n\n#destroyer.vertical,\n#submarine.vertical {\n  height: 120px;\n}\n\n#patrol-boat.vertical {\n  height: 80px;\n}\n\n#carrier,\n#battleship,\n#destroyer,\n#submarine,\n#patrol-boat {\n  font-size: 0.75rem;\n  color: #030201;\n  background-color: #0099d6;\n  border-radius: 2px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.start-btn {\n  position: absolute;\n  height: 80px;\n  width: 160px;\n  font-size: 1.25rem;\n  background-color: #18bc9c;\n  border: none;\n  border-radius: 5px;\n  padding: 10px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.start-btn:hover {\n  background-color: #1bd3af;\n  height: 85px;\n  width: 165px;\n}\n\n@media (max-width: 600px) {\n  .start-menu-table {\n    height: 300px;\n    width: 300px;\n  }\n\n  #carrier.horizontal,\n  #battleship.horizontal,\n  #destroyer.horizontal,\n  #submarine.horizontal,\n  #patrol-boat.horizontal {\n    height: 25px;\n  }\n\n  #carrier.horizontal {\n    width: 150px;\n  }\n\n  #battleship.horizontal {\n    width: 120px;\n  }\n\n  #destroyer.horizontal,\n  #submarine.horizontal {\n    width: 90px;\n  }\n\n  #patrol-boat.horizontal {\n    width: 60px;\n  }\n\n  #carrier.vertical,\n  #battleship.vertical,\n  #destroyer.vertical,\n  #submarine.vertical,\n  #patrol-boat.vertical {\n    width: 25px;\n  }\n\n  #carrier.vertical {\n    height: 150px;\n  }\n\n  #battleship.vertical {\n    height: 120px;\n  }\n\n  #destroyer.vertical,\n  #submarine.vertical {\n    height: 90px;\n  }\n\n  #patrol-boat.vertical {\n    height: 60px;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sMkZBQTJGLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLFNBQVMsVUFBVSxNQUFNLFNBQVMsVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLFNBQVMsVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLFNBQVMsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFB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QUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOzs7Ozs7Ozs7Ozs7OztBQ0FzQztBQUMwQjtBQUNaO0FBRXBELE1BQU1rTixTQUFTLEdBQUdBLENBQUEsS0FBTTtFQUN0QjdHLG1EQUFVLENBQUMsQ0FBQztFQUVaOUgsc0RBQVMsQ0FBQyxDQUFDO0VBRVh5TixrRUFBcUIsQ0FBQyxDQUFDO0VBRXZCaEwsaUVBQW9CLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBQ0RrTSxTQUFTLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9iYXR0bGVzaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXJBSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUtYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9sYXlvdXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0YXJ0LW1lbnUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2FtZW1lbnUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2dsb2JhbC5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3RhcnRtZW51LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2FtZW1lbnUuY3NzPzI1OTMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzcz9mMGQ4Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0YXJ0bWVudS5jc3M/MTJiMCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RhcnRNZW51IH0gZnJvbSBcIi4vc3RhcnQtbWVudVwiO1xuaW1wb3J0IHsgcGxheVJvdW5kIH0gZnJvbSBcIi4vZ2FtZS1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyB1c2VyQXR0YWNrcywgY29tcHV0ZXJBdHRhY2tzIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9nYW1lbWVudS5jc3NcIjtcblxuY29uc3QgZ2FtZU1lbnUgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xuXG4gIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgY29uc3QgY29udGFpbmVyT25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY29udGFpbmVyVHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRPbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZFR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZWZpZWxkT25lUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZFR3b1BhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICBjb250YWluZXJPbmUuY2xhc3NMaXN0LmFkZChcInVzZXItY29udGFpbmVyXCIpO1xuICBjb250YWluZXJUd28uY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyLWNvbnRhaW5lclwiKTtcbiAgYmF0dGxlZmllbGRPbmUuY2xhc3NMaXN0LmFkZChcInVzZXItYmF0dGxlZmllbGRcIik7XG4gIGJhdHRsZWZpZWxkVHdvLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1iYXR0bGVmaWVsZFwiKTtcbiAgYmF0dGxlZmllbGRPbmVQYXJhLnRleHRDb250ZW50ID0gXCJQbGF5ZXIgQm9hcmRcIjtcbiAgYmF0dGxlZmllbGRUd29QYXJhLnRleHRDb250ZW50ID0gXCJBSSBCb2FyZFwiO1xuXG4gIGNvbnRhaW5lck9uZS5hcHBlbmRDaGlsZChiYXR0bGVmaWVsZE9uZVBhcmEpO1xuICBjb250YWluZXJUd28uYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRUd29QYXJhKTtcbiAgY29udGFpbmVyT25lLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkT25lKTtcbiAgY29udGFpbmVyVHdvLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkVHdvKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lck9uZSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUd28pO1xufTtcblxuY29uc3QgcmVuZGVyQm9hcmRzID0gKCkgPT4ge1xuICBjb25zdCB1c2VyQmF0dGxlZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItYmF0dGxlZmllbGRcIik7XG4gIGNvbnN0IGNvbXB1dGVyQmF0dGxlZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyLWJhdHRsZWZpZWxkXCIpO1xuXG4gIC8vIFJlbmRlciB1c2VyIGdhbWUgYm9hcmRcbiAgY29uc3QgcmVuZGVyVXNlckJvYXJkID0gKGJvYXJkKSA9PiB7XG4gICAgdXNlckJhdHRsZWZpZWxkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCByb3cgPSBib2FyZFtpXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgbGV0IGRhdGEgPSBib2FyZFtpXVtqXTtcblxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgICAgYnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgICBidG4uZGF0YXNldC5wb3MgPSBgJHtpfSwke2p9YDtcblxuICAgICAgICBpZiAoZGF0YSA9PT0gMSkge1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic2hpcC1zcXVhcmVcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gMikge1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic2hpcC1taXNzZWRcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gMykge1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic2hpcC1oaXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB1c2VyQmF0dGxlZmllbGQuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gUmVuZGVyIGNvbXB1dGVyIGdhbWUgYm9hcmRcbiAgY29uc3QgcmVuZGVyQ29tcHV0ZXJCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgIGNvbXB1dGVyQmF0dGxlZmllbGQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHJvdyA9IGJvYXJkW2ldO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBsZXQgZGF0YSA9IGJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyXCIpO1xuICAgICAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bi5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICAgIGlmIChkYXRhID09PSAyKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW1pc3NlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAzKSB7XG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXB1dGVyQmF0dGxlZmllbGQuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiB7IHJlbmRlclVzZXJCb2FyZCwgcmVuZGVyQ29tcHV0ZXJCb2FyZCB9O1xufTtcblxuY29uc3QgZ2FtZVdpbm5lciA9ICh3aW5uZXIpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXNlY3Rpb25cIik7XG4gIGNvbnN0IHBvcFVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3Qgd2lubmVyQW5ub3VuY2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICBwb3BVcC5jbGFzc0xpc3QuYWRkKFwicG9wLXVwXCIpO1xuICB3aW5uZXJBbm5vdW5jZXIuY2xhc3NMaXN0LmFkZChcIndpbm5lclwiKTtcbiAgd2lubmVyQW5ub3VuY2VyLnRleHRDb250ZW50ID0gd2lubmVyO1xuICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXN0YXJ0LWJ0blwiKTtcbiAgcmVzdGFydEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVtYXRjaFwiO1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJtb2RhbC1vcGVuXCIpO1xuXG4gIHBvcFVwLmFwcGVuZENoaWxkKHdpbm5lckFubm91bmNlcik7XG4gIHBvcFVwLmFwcGVuZENoaWxkKHJlc3RhcnRCdXR0b24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wVXApO1xufTtcblxuY29uc3QgZ2FtZU1lbnVFdmVudEhhbmRsZXIgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW5TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXNlY3Rpb25cIik7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xuICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XG5cbiAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09IFwic3F1YXJlIGNvbXB1dGVyXCIpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMjNmZmNmXCI7XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKGUpID0+IHtcbiAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInNxdWFyZSBjb21wdXRlclwiKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gICAgfVxuICB9KTtcblxuICBtYWluU2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInNxdWFyZSBjb21wdXRlclwiKSB7XG4gICAgICBsZXQgZGF0YSA9IGVsZW1lbnQuZGF0YXNldC5wb3M7XG4gICAgICBsZXQgYXJyYXkgPSBkYXRhLnNwbGl0KFwiLFwiKTtcbiAgICAgIGxldCBwb3MgPSBbcGFyc2VJbnQoYXJyYXlbMF0pLCBwYXJzZUludChhcnJheVsxXSldO1xuXG4gICAgICBwbGF5Um91bmQocG9zKTtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwicmVzdGFydC1idG5cIikge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwibW9kYWwtb3BlblwiKTtcbiAgICAgIG1haW5TZWN0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgICAgLy8gRW1wdHkgYXR0YWNrZWQgc3F1YXJlcyBoaXN0b3J5XG4gICAgICB1c2VyQXR0YWNrcy5sZW5ndGggPSAwO1xuICAgICAgY29tcHV0ZXJBdHRhY2tzLmxlbmd0aCA9IDA7XG5cbiAgICAgIC8vIFN0YXJ0IG5ldyBnYW1lXG4gICAgICBzdGFydE1lbnUoKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgZ2FtZU1lbnUsIHJlbmRlckJvYXJkcywgZ2FtZVdpbm5lciwgZ2FtZU1lbnVFdmVudEhhbmRsZXIgfTtcbiIsImxldCBjb21wdXRlclNoaXBDb29yZGluYXRlcyA9IFtdO1xubGV0IHZpc2l0ZWQgPSBbXTtcblxuY29uc3QgaXNBcnJheUluQXJyYXkgPSAoc291cmNlLCBzZWFyY2gpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWFyY2gubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgc2VhcmNoRWxlID0gc2VhcmNoW2ldO1xuXG4gICAgaWYgKHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblxuICAgIC8vIFNlYXJjaCBmb3IgZWFjaCBcInNlYXJjaCBhcnJheVwiIGVsZW1lbnQgaW4gdGhlIHNvdXJjZSBhcnJheVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgc291cmNlLmxlbmd0aDsgaisrKSB7XG4gICAgICBsZXQgc291cmNlRWxlID0gc291cmNlW2pdO1xuXG4gICAgICBpZiAoc2VhcmNoRWxlWzBdID09PSBzb3VyY2VFbGVbMF0gJiYgc2VhcmNoRWxlWzFdID09PSBzb3VyY2VFbGVbMV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBnZXRBZGpDb29yZGluYXRlcyA9IChjb29yZGluYXRlcykgPT4ge1xuICBsZXQgYWRqUG9zaXRpb25zID0gW107XG4gIGxldCBvcmllbnRhdGlvbiA9IFwiXCI7XG4gIGxldCBvbmUgPSBjb29yZGluYXRlc1swXTtcbiAgbGV0IHR3byA9IGNvb3JkaW5hdGVzWzFdO1xuXG4gIC8vIENoZWNrIGNvb3JkaW5hdGVzIG9yaWVudGF0aW9uXG4gIGlmIChvbmVbMF0gPT09IHR3b1swXSAmJiBvbmVbMV0gIT09IHR3b1sxXSkge1xuICAgIG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gIH0gZWxzZSBpZiAob25lWzBdICE9PSB0d29bMF0gJiYgb25lWzFdID09PSB0d29bMV0pIHtcbiAgICBvcmllbnRhdGlvbiA9IFwidmVydGljYWxcIjtcbiAgfVxuXG4gIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3Igc2hpcCBjb29yZGluYXRlcyBhbG9uZyB0aGUgWS1heGlzXG4gIGlmIChvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGVsZW1lbnQgPSBjb29yZGluYXRlc1tpXTtcbiAgICAgIGxldCBhZGpMZWZ0ID0gW2VsZW1lbnRbMF0sIGVsZW1lbnRbMV0gLSAxXTtcbiAgICAgIGxldCBhZGpSaWdodCA9IFtlbGVtZW50WzBdLCBlbGVtZW50WzFdICsgMV07XG5cbiAgICAgIGlmIChhZGpMZWZ0WzFdID49IDAgJiYgYWRqTGVmdFsxXSA8PSA5KSB7XG4gICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkakxlZnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWRqUmlnaHRbMV0gPj0gMCAmJiBhZGpSaWdodFsxXSA8PSA5KSB7XG4gICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkalJpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFkamFjZW50IGNvb3JkaW5hdGVzIGZvciB0aGUgZmlyc3Qgc3F1YXJlIG9mIHRoZSBzaGlwIGNvb3JkaW5hdGVzXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBsZXQgYWRqVG9wID0gW2VsZW1lbnRbMF0gLSAxLCBlbGVtZW50WzFdXTtcblxuICAgICAgICBpZiAoYWRqVG9wWzBdID49IDAgJiYgYWRqVG9wWzBdIDw9IDkpIHtcbiAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpUb3ApO1xuXG4gICAgICAgICAgbGV0IGxlZnQgPSBbYWRqVG9wWzBdLCBhZGpUb3BbMV0gLSAxXTtcbiAgICAgICAgICBsZXQgcmlnaHQgPSBbYWRqVG9wWzBdLCBhZGpUb3BbMV0gKyAxXTtcblxuICAgICAgICAgIGlmIChsZWZ0WzFdID49IDAgJiYgbGVmdFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChsZWZ0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmlnaHRbMV0gPj0gMCAmJiByaWdodFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChyaWdodCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3IgdGhlIGxhc3Qgc3F1YXJlIG9mIHRoZSBzaGlwIGNvb3JkaW5hdGVzXG4gICAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoIC0gaSA9PT0gMSkge1xuICAgICAgICBsZXQgYWRqQm90dG9tID0gW2VsZW1lbnRbMF0gKyAxLCBlbGVtZW50WzFdXTtcblxuICAgICAgICBpZiAoYWRqQm90dG9tWzBdID49IDAgJiYgYWRqQm90dG9tWzBdIDw9IDkpIHtcbiAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpCb3R0b20pO1xuXG4gICAgICAgICAgbGV0IGxlZnQgPSBbYWRqQm90dG9tWzBdLCBhZGpCb3R0b21bMV0gLSAxXTtcbiAgICAgICAgICBsZXQgcmlnaHQgPSBbYWRqQm90dG9tWzBdLCBhZGpCb3R0b21bMV0gKyAxXTtcblxuICAgICAgICAgIGlmIChsZWZ0WzFdID49IDAgJiYgbGVmdFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChsZWZ0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmlnaHRbMV0gPj0gMCAmJiByaWdodFsxXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChyaWdodCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkalBvc2l0aW9ucztcbiAgfVxuXG4gIC8vIEFkZCBhZGphY2VudCBjb29yZGluYXRlcyBmb3Igc2hpcCBjb29yZGluYXRlcyBhbG9uZyB0aGUgWC1heGlzXG4gIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IGNvb3JkaW5hdGVzW2ldO1xuICAgICAgbGV0IGFkalRvcCA9IFtlbGVtZW50WzBdIC0gMSwgZWxlbWVudFsxXV07XG4gICAgICBsZXQgYWRqQm90dG9tID0gW2VsZW1lbnRbMF0gKyAxLCBlbGVtZW50WzFdXTtcblxuICAgICAgaWYgKGFkalRvcFswXSA+PSAwICYmIGFkalRvcFswXSA8PSA5KSB7XG4gICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkalRvcCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGpCb3R0b21bMF0gPj0gMCAmJiBhZGpCb3R0b21bMF0gPD0gOSkge1xuICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChhZGpCb3R0b20pO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYWRqYWNlbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBmaXJzdCBzcXVhcmUgb2YgdGhlIHNoaXAgY29vcmRpbmF0ZXNcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGxldCBhZGpMZWZ0ID0gW2VsZW1lbnRbMF0sIGVsZW1lbnRbMV0gLSAxXTtcblxuICAgICAgICBpZiAoYWRqTGVmdFsxXSA+PSAwICYmIGFkakxlZnRbMV0gPD0gOSkge1xuICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKGFkakxlZnQpO1xuXG4gICAgICAgICAgbGV0IHRvcCA9IFthZGpMZWZ0WzBdIC0gMSwgYWRqTGVmdFsxXV07XG4gICAgICAgICAgbGV0IGJvdHRvbSA9IFthZGpMZWZ0WzBdICsgMSwgYWRqTGVmdFsxXV07XG5cbiAgICAgICAgICBpZiAodG9wWzBdID49IDAgJiYgdG9wWzBdIDw9IDkpIHtcbiAgICAgICAgICAgIGFkalBvc2l0aW9ucy5wdXNoKHRvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGJvdHRvbVswXSA+PSAwICYmIGJvdHRvbVswXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaChib3R0b20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYWRqYWNlbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBsYXN0IHNxdWFyZSBvZiB0aGUgc2hpcCBjb29yZGluYXRlc1xuICAgICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIGkgPT09IDEpIHtcbiAgICAgICAgbGV0IGFkalJpZ2h0ID0gW2VsZW1lbnRbMF0sIGVsZW1lbnRbMV0gKyAxXTtcblxuICAgICAgICBpZiAoYWRqUmlnaHRbMV0gPj0gMCAmJiBhZGpSaWdodFsxXSA8PSA5KSB7XG4gICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYWRqUmlnaHQpO1xuXG4gICAgICAgICAgbGV0IHRvcCA9IFthZGpSaWdodFswXSAtIDEsIGFkalJpZ2h0WzFdXTtcbiAgICAgICAgICBsZXQgYm90dG9tID0gW2FkalJpZ2h0WzBdICsgMSwgYWRqUmlnaHRbMV1dO1xuXG4gICAgICAgICAgaWYgKHRvcFswXSA+PSAwICYmIHRvcFswXSA8PSA5KSB7XG4gICAgICAgICAgICBhZGpQb3NpdGlvbnMucHVzaCh0b3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChib3R0b21bMF0gPj0gMCAmJiBib3R0b21bMF0gPD0gOSkge1xuICAgICAgICAgICAgYWRqUG9zaXRpb25zLnB1c2goYm90dG9tKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWRqUG9zaXRpb25zO1xuICB9XG59O1xuXG5jb25zdCBnZXRSYW5kb21Qb3NpdGlvbiA9IChsZW5ndGgpID0+IHtcbiAgbGV0IHZhbGlkID0gZmFsc2U7XG4gIGxldCBwb3M7XG5cbiAgd2hpbGUgKHZhbGlkID09PSBmYWxzZSkge1xuICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIHBvcyA9IFt4LCB5XTtcblxuICAgIGlmICh4ICsgbGVuZ3RoIDw9IDEwICYmIHkgKyBsZW5ndGggPD0gMTApIHtcbiAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcG9zO1xufTtcblxuY29uc3QgZ2V0TGVnYWxDb21ib3MgPSAoc2hpcExlbmd0aCkgPT4ge1xuICBjb25zdCBsZWdhbENvbWJvcyA9IFtcbiAgICBbXG4gICAgICBbMCwgMV0sXG4gICAgICBbMCwgMl0sXG4gICAgICBbMCwgM10sXG4gICAgICBbMCwgNF0sXG4gICAgICBbMCwgNV0sXG4gICAgXSxcbiAgICBbXG4gICAgICBbMSwgMF0sXG4gICAgICBbMiwgMF0sXG4gICAgICBbMywgMF0sXG4gICAgICBbNCwgMF0sXG4gICAgICBbNSwgMF0sXG4gICAgXSxcbiAgXTtcbiAgY29uc3QgcG9zID0gZ2V0UmFuZG9tUG9zaXRpb24oc2hpcExlbmd0aCk7XG5cbiAgbGV0IGNvb3JkaW5hdGVzID0gW107XG4gIGxldCBzZXQ7XG5cbiAgLy8gUmFuZG9taXplIHNldCBvZiBjb21ib3MgdG8gYmUgdXNlZFxuICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7XG5cbiAgaWYgKHJhbmRvbSAlIDIgPT09IDApIHtcbiAgICBzZXQgPSBsZWdhbENvbWJvc1swXTtcbiAgfSBlbHNlIHtcbiAgICBzZXQgPSBsZWdhbENvbWJvc1sxXTtcbiAgfVxuXG4gIGxldCBsZW5ndGhEaWZmID0gc2V0Lmxlbmd0aCAtIHNoaXBMZW5ndGg7XG4gIGxldCBhcnJheUxlbmd0aCA9IHNldC5sZW5ndGggLSAxIC0gbGVuZ3RoRGlmZjtcblxuICBjb29yZGluYXRlcy5wdXNoKHBvcyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHZhbHVlcyA9IHNldFtpXTtcbiAgICBsZXQgeCA9IHBvc1swXTtcbiAgICBsZXQgeSA9IHBvc1sxXTtcbiAgICBsZXQgbW92ZSA9IFt4ICsgdmFsdWVzWzBdLCB5ICsgdmFsdWVzWzFdXTtcblxuICAgIGNvb3JkaW5hdGVzLnB1c2gobW92ZSk7XG4gIH1cblxuICByZXR1cm4gY29vcmRpbmF0ZXM7XG59O1xuXG5jb25zdCBnZXRDb21wdXRlclNoaXBzID0gKCkgPT4ge1xuICBsZXQgbGVuZ3RoID0gNTtcbiAgbGV0IHJlcGVhdCA9IDE7XG5cbiAgLy8gR2V0IGNvb3JkaW5hdGVzIGZvciBlYWNoIHNoaXBcbiAgd2hpbGUgKGxlbmd0aCA+IDEpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBnZXRMZWdhbENvbWJvcyhsZW5ndGgpO1xuICAgIGxldCBpdGVtVmlzaXRlZCA9IGlzQXJyYXlJbkFycmF5KHZpc2l0ZWQsIGNvb3JkaW5hdGVzKTtcblxuICAgIHdoaWxlIChpdGVtVmlzaXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgY29vcmRpbmF0ZXMgPSBnZXRMZWdhbENvbWJvcyhsZW5ndGgpO1xuICAgICAgaXRlbVZpc2l0ZWQgPSBpc0FycmF5SW5BcnJheSh2aXNpdGVkLCBjb29yZGluYXRlcyk7XG4gICAgfVxuXG4gICAgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlcyk7XG5cbiAgICAvLyBQdXNoIGNvb3JkaW5hdGVzIHRvIHRoZSB2aXNpdGVkIGFycmF5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNvb3JkaW5hdGUgPSBjb29yZGluYXRlc1tpXTtcblxuICAgICAgdmlzaXRlZC5wdXNoKGNvb3JkaW5hdGUpO1xuICAgIH1cblxuICAgIGNvbnN0IGFkakNvb3JkaW5hdGVzID0gZ2V0QWRqQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuXG4gICAgLy8gUHVzaCBhZGphY2VudCBjb29yZGluYXRlcyB0byB0aGUgdmlzaXRlZCBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRqQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjb29yZGluYXRlID0gYWRqQ29vcmRpbmF0ZXNbaV07XG5cbiAgICAgIHZpc2l0ZWQucHVzaChjb29yZGluYXRlKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmVzIGJvdGggdGhlIGRlc3Ryb3llciBhbmQgdGhlIHN1Ym1hcmluZSBoYXZlIHRoZSBzYW1lIGxlbmd0aFxuICAgIGlmIChsZW5ndGggPT09IDMgJiYgcmVwZWF0ID09PSAxKSB7XG4gICAgICByZXBlYXQgLT0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoIC09IDE7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgeyBnZXRDb21wdXRlclNoaXBzLCBjb21wdXRlclNoaXBDb29yZGluYXRlcywgdmlzaXRlZCB9O1xuIiwiaW1wb3J0IHsgUGxheWVyU2hpcHMsIFNoaXAgfSBmcm9tIFwiLi9zaGlwc1wiO1xuXG5jb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGxldCBib2FyZCA9IFtdO1xuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBib2FyZFtpXVtqXSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgcGxheWVyU2hpcHMgPSBQbGF5ZXJTaGlwcygpO1xuICBjb25zdCBzaGlwcyA9IHBsYXllclNoaXBzLmdldFNoaXBzKCk7XG5cbiAgY29uc3QgcG9wdWxhdGVCb2FyZCA9IChhcnJheSkgPT4ge1xuICAgIHBsYXllclNoaXBzLmFkZFNoaXBDb29yZGluYXRlcyhhcnJheSk7XG5cbiAgICAvLyBQbGFjZSBhbGwgc2hpcHMgb250byB0aGUgYm9hcmRcbiAgICBTaGlwKCkucGxhY2VTaGlwcyhib2FyZCwgc2hpcHMpO1xuICB9O1xuXG4gIGNvbnN0IGZpbmRBdHRhY2tlZFNoaXAgPSAocG9zKSA9PiB7XG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBsZXQgYXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gYXJyYXlbaV07XG5cbiAgICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHBvc1swXSAmJiBlbGVtZW50WzFdID09PSBwb3NbMV0pIHtcbiAgICAgICAgICByZXR1cm4gc2hpcHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHBvcykgPT4ge1xuICAgIGxldCB4ID0gcG9zWzBdO1xuICAgIGxldCB5ID0gcG9zWzFdO1xuXG4gICAgaWYgKGJvYXJkW3hdW3ldID09PSAxKSB7XG4gICAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSBmaW5kQXR0YWNrZWRTaGlwKHBvcyk7XG5cbiAgICAgIC8vIE1hcmsgYm9hcmQgcG9zaXRpb24gYXMgYXR0YWNrZWRcbiAgICAgIGJvYXJkW3hdW3ldID0gMztcblxuICAgICAgLy8gQWRkIGhpdCBjb3VudCB0byBhdHRhY2tlZCBzaGlwXG4gICAgICBTaGlwKCkuaGl0KGF0dGFja2VkU2hpcCk7XG4gICAgfSBlbHNlIGlmIChib2FyZFt4XVt5XSA9PT0gMCkge1xuICAgICAgLy8gTWFyayBib2FyZCBwb3NpdGlvbiBhcyBhdHRhY2tlZFxuICAgICAgYm9hcmRbeF1beV0gPSAyO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhbGxTaGlwc0Rlc3Ryb3llZCA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBsZXQgc2hpcFN0YXRlID0gc2hpcHNba2V5XS5kZXN0cm95ZWQ7XG5cbiAgICAgIGlmIChzaGlwU3RhdGUgPT09IHRydWUpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY291bnQgPT09IDUgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVCb2FyZCxcbiAgICBnZXRCb2FyZCxcbiAgICBwb3B1bGF0ZUJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU2hpcHNEZXN0cm95ZWQsXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lQm9hcmQgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgcmVuZGVyQm9hcmRzLCBnYW1lV2lubmVyIH0gZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuaW1wb3J0IHsgdXNlclNoaXBzQ29vcmRpbmF0ZXMgfSBmcm9tIFwiLi9zdGFydC1tZW51XCI7XG5pbXBvcnQgeyBjb21wdXRlclNoaXBDb29yZGluYXRlcyB9IGZyb20gXCIuL2NvbXB1dGVyQUlcIjtcblxubGV0IHVzZXJHYW1lQm9hcmQ7XG5sZXQgY29tcHV0ZXJHYW1lQm9hcmQ7XG5sZXQgdXNlcjtcbmxldCBjb21wdXRlcjtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgLy8gQ3JlYXRlIFBsYXllciBvYmplY3RzIGFuZCBHYW1lQm9hcmQgb2JqZWN0cyBmb3IgZWFjaCBwbGF5ZXJcbiAgdXNlciA9IFBsYXllcihcInVzZXJcIik7XG4gIGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXIgQUlcIik7XG5cbiAgdXNlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuICBjb21wdXRlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuXG4gIC8vIENyZWF0ZSBuZXcgYm9hcmRzIGZvciBlYWNoIHBsYXllclxuICB1c2VyR2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkLmNyZWF0ZUJvYXJkKCk7XG5cbiAgLy8gUG9wdWxhdGUgcGxheWVyIGJvYXJkcyB3aXRoIHNoaXBzXG4gIHVzZXJHYW1lQm9hcmQucG9wdWxhdGVCb2FyZCh1c2VyU2hpcHNDb29yZGluYXRlcyk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQoY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMpO1xuXG4gIC8vIEdldCBwbGF5ZXIgYm9hcmRzIGZyb20gR2FtZUJvYXJkIG9iamVjdHNcbiAgY29uc3QgdXNlckJvYXJkID0gdXNlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcblxuICAvLyBJbml0aWFsIHBsYXllciBib2FyZHMgYXJlIHJlbmRlcmVkXG4gIHJlbmRlckJvYXJkcygpLnJlbmRlclVzZXJCb2FyZCh1c2VyQm9hcmQpO1xuICByZW5kZXJCb2FyZHMoKS5yZW5kZXJDb21wdXRlckJvYXJkKGNvbXB1dGVyQm9hcmQpO1xufTtcblxuY29uc3QgcGxheVJvdW5kID0gKHBvcykgPT4ge1xuICBsZXQgdXNlckF0dGFja3MgPSB1c2VyLmF0dGFjayhjb21wdXRlciwgY29tcHV0ZXJHYW1lQm9hcmQsIHBvcyk7XG5cbiAgaWYgKHVzZXJBdHRhY2tzID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICAvLyBVcGRhdGUgY29tcHV0ZXIgYm9hcmQgb24gdGhlIHNjcmVlblxuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuICAgIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoY29tcHV0ZXJCb2FyZCk7XG5cbiAgICAvLyBDaGVjayBpZiBhbGwgY29tcHV0ZXIgc2hpcHMgYXJlIGRlc3Ryb3llZFxuICAgIGlmIChjb21wdXRlckdhbWVCb2FyZC5hbGxTaGlwc0Rlc3Ryb3llZCgpID09PSB0cnVlKSB7XG4gICAgICBnYW1lV2lubmVyKFwiWW91IFdpblwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb21wdXRlci5hdHRhY2sodXNlciwgdXNlckdhbWVCb2FyZCwgcG9zKTtcblxuICAgIC8vIFVwZGF0ZSB1c2VyIGJvYXJkIG9uIHRoZSBzY3JlZW5cbiAgICBjb25zdCB1c2VyQm9hcmQgPSB1c2VyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG4gICAgcmVuZGVyQm9hcmRzKCkucmVuZGVyVXNlckJvYXJkKHVzZXJCb2FyZCk7XG5cbiAgICAvLyBDaGVjayBpZiBhbGwgdXNlciBzaGlwcyBhcmUgZGVzdHJveWVkXG4gICAgaWYgKHVzZXJHYW1lQm9hcmQuYWxsU2hpcHNEZXN0cm95ZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgZ2FtZVdpbm5lcihcIkFJIFdpbnMhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHsgR2FtZSwgcGxheVJvdW5kIH07XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy9nbG9iYWwuY3NzXCI7XG5pbXBvcnQgSW1nIGZyb20gXCIuL2ltYWdlcy9zdWJtYXJpbmUucG5nXCI7XG5cbmNvbnN0IHBhZ2VMYXlvdXQgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIGNvbnN0IGxvZ28gPSBuZXcgSW1hZ2UoKTtcblxuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcbiAgbWFpbi5jbGFzc0xpc3QuYWRkKFwibWFpbi1zZWN0aW9uXCIpO1xuICBmb290ZXIuY2xhc3NMaXN0LmFkZChcImZvb3RlclwiKTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICBjb3B5cmlnaHQuY2xhc3NMaXN0LmFkZChcImNvcHlyaWdodFwiKTtcbiAgY29weXJpZ2h0LnRleHRDb250ZW50ID0gXCJAIEVkZGllIFRoaWlydSAyMDIzXCI7XG4gIGxvZ28uc3JjID0gSW1nO1xuICBsb2dvLmFsdCA9IFwiU3VibWFyaW5lIGxvZ29cIjtcblxuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbyk7XG4gIGZvb3Rlci5hcHBlbmRDaGlsZChjb3B5cmlnaHQpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQobWFpbik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn07XG5cbmV4cG9ydCB7IHBhZ2VMYXlvdXQgfTtcbiIsImxldCB1c2VyQXR0YWNrcyA9IFtdO1xubGV0IGNvbXB1dGVyQXR0YWNrcyA9IFtdO1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcblxuICBjb25zdCBpc0F0dGFja0xlZ2FsID0gKGVuZW15LCBwb3MpID0+IHtcbiAgICBsZXQgYXJyYXk7XG5cbiAgICBpZiAoZW5lbXkgPT09IFwidXNlclwiKSB7XG4gICAgICBhcnJheSA9IGNvbXB1dGVyQXR0YWNrcy5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnJheSA9IHVzZXJBdHRhY2tzLnNsaWNlKCk7XG4gICAgfVxuXG4gICAgd2hpbGUgKGFycmF5Lmxlbmd0aCkge1xuICAgICAgbGV0IGVsZW1lbnQgPSBhcnJheS5zaGlmdCgpO1xuXG4gICAgICBpZiAoZWxlbWVudFswXSA9PT0gcG9zWzBdICYmIGVsZW1lbnRbMV0gPT09IHBvc1sxXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgR2FtZUJvYXJkLCBwb3MpID0+IHtcbiAgICBjb25zdCBlbmVteU5hbWUgPSBlbmVteS5nZXROYW1lKCk7XG5cbiAgICBjb25zdCBnZXRSYW5kb20gPSAoKSA9PiB7XG4gICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICByZXR1cm4gW3gsIHldO1xuICAgIH07XG5cbiAgICBpZiAoZW5lbXlOYW1lID09PSBcInVzZXJcIikge1xuICAgICAgbGV0IHBvcyA9IGdldFJhbmRvbSgpO1xuICAgICAgbGV0IGNoZWNrTGVnYWwgPSBpc0F0dGFja0xlZ2FsKGVuZW15TmFtZSwgcG9zKTtcblxuICAgICAgLy8gV2hpbGUgcmFuZG9tIGF0dGFjayBpcyBpbGxlZ2FsLCBnZXQgbmV3IGF0dGFjayBjb29yZGluYXRlXG4gICAgICB3aGlsZSAoY2hlY2tMZWdhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcG9zID0gZ2V0UmFuZG9tKCk7XG4gICAgICAgIGNoZWNrTGVnYWwgPSBpc0F0dGFja0xlZ2FsKGVuZW15TmFtZSwgcG9zKTtcbiAgICAgIH1cblxuICAgICAgY29tcHV0ZXJBdHRhY2tzLnB1c2gocG9zKTtcbiAgICAgIEdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjaGVja0xlZ2FsID0gaXNBdHRhY2tMZWdhbChlbmVteU5hbWUsIHBvcyk7XG5cbiAgICAgIGlmIChjaGVja0xlZ2FsID09PSB0cnVlKSB7XG4gICAgICAgIHVzZXJBdHRhY2tzLnB1c2gocG9zKTtcbiAgICAgICAgR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2socG9zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0TmFtZSwgaXNBdHRhY2tMZWdhbCwgYXR0YWNrIH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXIsIHVzZXJBdHRhY2tzLCBjb21wdXRlckF0dGFja3MgfTtcbiIsImNvbnN0IFBsYXllclNoaXBzID0gKCkgPT4ge1xuICBsZXQgc2hpcHMgPSB7XG4gICAgY2Fycmllcjoge1xuICAgICAgbGVuZ3RoOiA1LFxuICAgICAgaGl0czogMCxcbiAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgICBjb29yZGluYXRlczogW10sXG4gICAgfSxcblxuICAgIGJhdHRsZXNoaXA6IHtcbiAgICAgIGxlbmd0aDogNCxcbiAgICAgIGhpdHM6IDAsXG4gICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgY29vcmRpbmF0ZXM6IFtdLFxuICAgIH0sXG5cbiAgICBkZXN0cm95ZXI6IHtcbiAgICAgIGxlbmd0aDogMyxcbiAgICAgIGhpdHM6IDAsXG4gICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgY29vcmRpbmF0ZXM6IFtdLFxuICAgIH0sXG5cbiAgICBzdWJtYXJpbmU6IHtcbiAgICAgIGxlbmd0aDogMyxcbiAgICAgIGhpdHM6IDAsXG4gICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgY29vcmRpbmF0ZXM6IFtdLFxuICAgIH0sXG5cbiAgICBwYXRyb2xCb2F0OiB7XG4gICAgICBsZW5ndGg6IDIsXG4gICAgICBoaXRzOiAwLFxuICAgICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBzID0gKCkgPT4gc2hpcHM7XG5cbiAgY29uc3QgYWRkU2hpcENvb3JkaW5hdGVzID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IGNvcHkgPSBhcnJheS5zbGljZSgpO1xuXG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBsZXQgc2hpcEFycmF5ID0gc2hpcHNba2V5XS5jb29yZGluYXRlcztcbiAgICAgIGxldCBhcnIgPSBjb3B5LnNoaWZ0KCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNoaXBBcnJheS5wdXNoKGFycltpXSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGdldFNoaXBzLCBhZGRTaGlwQ29vcmRpbmF0ZXMgfTtcbn07XG5cbmNvbnN0IFNoaXAgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYWNlU2hpcHMgPSAoYm9hcmQsIHNoaXBzKSA9PiB7XG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBsZXQgYXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gYXJyYXlbaV07XG4gICAgICAgIGxldCB4ID0gZWxlbWVudFswXTtcbiAgICAgICAgbGV0IHkgPSBlbGVtZW50WzFdO1xuXG4gICAgICAgIGJvYXJkW3hdW3ldID0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKHNoaXApID0+IHtcbiAgICBsZXQgc2hpcExlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgIGxldCBoaXRzQ291bnQgPSBzaGlwLmhpdHM7XG5cbiAgICAvLyBjaGVjayBzaGlwIGxlbmd0aCBhbmQgbm8gb2YgdGltZXMgaXRzIGJlZW4gaGl0XG4gICAgcmV0dXJuIHNoaXBMZW5ndGggPT09IGhpdHNDb3VudCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBoaXQgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXAuaGl0cyArPSAxO1xuXG4gICAgLy8gQWZ0ZXIgZXZlcnkgaGl0LCBjaGVjayBpZiB0aGUgc2hpcCBpcyBkZXN0cm95ZWRcbiAgICBjb25zdCBjaGVja1NoaXAgPSBpc1N1bmsoc2hpcCk7XG5cbiAgICBpZiAoY2hlY2tTaGlwID09PSB0cnVlKSB7XG4gICAgICBzaGlwLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IHBsYWNlU2hpcHMsIGhpdCB9O1xufTtcblxuZXhwb3J0IHsgUGxheWVyU2hpcHMsIFNoaXAgfTtcbiIsImltcG9ydCB7IEdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWUtYm9hcmRcIjtcbmltcG9ydCB7IGdhbWVNZW51IH0gZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWUtY29udHJvbGxlclwiO1xuaW1wb3J0IHtcbiAgZ2V0Q29tcHV0ZXJTaGlwcyxcbiAgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMsXG4gIHZpc2l0ZWQsXG59IGZyb20gXCIuL2NvbXB1dGVyQUlcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0YXJ0bWVudS5jc3NcIjtcblxuY29uc3QgZ2V0U3RhcnRTY3JlZW5Cb2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJvYXJkXG4gIGdhbWVCb2FyZC5jcmVhdGVCb2FyZCgpO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2FtZUJvYXJkLmdldEJvYXJkKCk7XG5cbiAgcmV0dXJuIGJvYXJkO1xufTtcblxuY29uc3Qgc3RhcnRNZW51ID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcbiAgY29uc3QgbGVmdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCByaWdodFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBjb25zdCBwYXJhVHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgY2FycmllckJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlc2hpcEJlcnRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZGVzdHJveWVyQmVydGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzdWJtYXJpbmVCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHBhdHJvbEJvYXRCZXJ0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgbGVmdFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcImxlZnQtc2VjdGlvblwiKTtcbiAgcmlnaHRTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJyaWdodC1zZWN0aW9uXCIpO1xuICB0YWJsZS5jbGFzc0xpc3QuYWRkKFwic3RhcnQtbWVudS10YWJsZVwiKTtcbiAgcGFyYS5jbGFzc0xpc3QuYWRkKFwiaW5zdHJ1Y3Rpb25zLW9uZVwiKTtcbiAgcGFyYS50ZXh0Q29udGVudCA9IFwiRHJhZyBhbmQgZHJvcCBzaGlwc1wiO1xuICBwYXJhVHdvLmNsYXNzTGlzdC5hZGQoXCJpbnN0cnVjdGlvbnMtdHdvXCIpO1xuICBwYXJhVHdvLnRleHRDb250ZW50ID0gXCJEb3VibGUgY2xpY2sgdG8gcm90YXRlXCI7XG4gIHNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3J0XCIpO1xuICBjYXJyaWVyQmVydGguY2xhc3NMaXN0LmFkZChcImNhcnJpZXItYmVydGhcIik7XG4gIGJhdHRsZXNoaXBCZXJ0aC5jbGFzc0xpc3QuYWRkKFwiYmF0dGxlc2hpcC1iZXJ0aFwiKTtcbiAgZGVzdHJveWVyQmVydGguY2xhc3NMaXN0LmFkZChcImRlc3Ryb3llci1iZXJ0aFwiKTtcbiAgc3VibWFyaW5lQmVydGguY2xhc3NMaXN0LmFkZChcInN1Ym1hcmluZS1iZXJ0aFwiKTtcbiAgcGF0cm9sQm9hdEJlcnRoLmNsYXNzTGlzdC5hZGQoXCJwYXRyb2wtYm9hdC1iZXJ0aFwiKTtcbiAgY2Fycmllci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgY2Fycmllci5pZCA9IFwiY2FycmllclwiO1xuICBjYXJyaWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgY2Fycmllci5kYXRhc2V0LndpZHRoID0gNTtcbiAgY2Fycmllci5kcmFnZ2FibGUgPSB0cnVlO1xuICBiYXR0bGVzaGlwLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBiYXR0bGVzaGlwLmlkID0gXCJiYXR0bGVzaGlwXCI7XG4gIGJhdHRsZXNoaXAuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBiYXR0bGVzaGlwLmRhdGFzZXQud2lkdGggPSA0O1xuICBiYXR0bGVzaGlwLmRyYWdnYWJsZSA9IHRydWU7XG4gIGRlc3Ryb3llci5jbGFzc0xpc3QuYWRkKFwiaG9yaXpvbnRhbFwiKTtcbiAgZGVzdHJveWVyLmlkID0gXCJkZXN0cm95ZXJcIjtcbiAgZGVzdHJveWVyLmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgZGVzdHJveWVyLmRhdGFzZXQud2lkdGggPSAzO1xuICBkZXN0cm95ZXIuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgc3VibWFyaW5lLmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBzdWJtYXJpbmUuaWQgPSBcInN1Ym1hcmluZVwiO1xuICBzdWJtYXJpbmUuZGF0YXNldC5oZWlnaHQgPSAxO1xuICBzdWJtYXJpbmUuZGF0YXNldC53aWR0aCA9IDM7XG4gIHN1Ym1hcmluZS5kcmFnZ2FibGUgPSB0cnVlO1xuICBwYXRyb2xCb2F0LmNsYXNzTGlzdC5hZGQoXCJob3Jpem9udGFsXCIpO1xuICBwYXRyb2xCb2F0LmlkID0gXCJwYXRyb2wtYm9hdFwiO1xuICBwYXRyb2xCb2F0LmRhdGFzZXQuaGVpZ2h0ID0gMTtcbiAgcGF0cm9sQm9hdC5kYXRhc2V0LndpZHRoID0gMjtcbiAgcGF0cm9sQm9hdC5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gIGNvbnN0IGJvYXJkID0gZ2V0U3RhcnRTY3JlZW5Cb2FyZCgpO1xuXG4gIC8vIENyZWF0ZSBhIGdyaWQgb2YgdGFibGUgcm93cyBhbmQgdGFibGUgY2VsbHNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgIC8vIENyZWF0ZSByb3dcbiAgICBjb25zdCB0YWJsZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAgIHRhYmxlUm93LmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1yb3dcIik7XG4gICAgdGFibGVSb3cuaWQgPSBgZHJvcHpvbmUtJHtpfWA7XG5cbiAgICBsZXQgcm93ID0gYm9hcmRbaV07XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgLy8gY3JlYXRlIHJvdyBjZWxsXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJ0YWJsZS1jZWxsXCIpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBvcyA9IGAke2l9LCR7an1gO1xuXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRhYmxlUm93KTtcbiAgfVxuXG4gIGNhcnJpZXJCZXJ0aC5hcHBlbmRDaGlsZChjYXJyaWVyKTtcbiAgYmF0dGxlc2hpcEJlcnRoLmFwcGVuZENoaWxkKGJhdHRsZXNoaXApO1xuICBkZXN0cm95ZXJCZXJ0aC5hcHBlbmRDaGlsZChkZXN0cm95ZXIpO1xuICBzdWJtYXJpbmVCZXJ0aC5hcHBlbmRDaGlsZChzdWJtYXJpbmUpO1xuICBwYXRyb2xCb2F0QmVydGguYXBwZW5kQ2hpbGQocGF0cm9sQm9hdCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcnJpZXJCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGJhdHRsZXNoaXBCZXJ0aCk7XG4gIHNoaXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlc3Ryb3llckJlcnRoKTtcbiAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VibWFyaW5lQmVydGgpO1xuICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwYXRyb2xCb2F0QmVydGgpO1xuICB0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xuICBsZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIHJpZ2h0U2VjdGlvbi5hcHBlbmRDaGlsZChwYXJhKTtcbiAgcmlnaHRTZWN0aW9uLmFwcGVuZENoaWxkKHBhcmFUd28pO1xuICByaWdodFNlY3Rpb24uYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGVmdFNlY3Rpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRTZWN0aW9uKTtcbn07XG5cbmxldCB1c2VyU2hpcHMgPSB7XG4gIGNhcnJpZXI6IG51bGwsXG4gIGJhdHRsZXNoaXA6IG51bGwsXG4gIGRlc3Ryb3llcjogbnVsbCxcbiAgc3VibWFyaW5lOiBudWxsLFxuICBcInBhdHJvbC1ib2F0XCI6IG51bGwsXG59O1xuXG5sZXQgdXNlclNoaXBzQ29vcmRpbmF0ZXMgPSBbXTtcblxuY29uc3Qgc29ydFNoaXBzQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gIGZvciAobGV0IGtleSBpbiB1c2VyU2hpcHMpIHtcbiAgICBsZXQgYXJyID0gdXNlclNoaXBzW2tleV07XG5cbiAgICB1c2VyU2hpcHNDb29yZGluYXRlcy5wdXNoKGFycik7XG4gIH1cbn07XG5cbmNvbnN0IGFsbFNoaXBzUGxhY2VkID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJpZ2h0LXNlY3Rpb25cIik7XG4gIGNvbnN0IHBvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcnRcIik7XG4gIGxldCBub2RlTGlzdCA9IHBvcnQuY2hpbGROb2RlcztcbiAgbGV0IHNoaXBzID0gMDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBub2RlTGlzdFtpXTtcblxuICAgIGlmIChlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgc2hpcHMgKz0gMTtcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgXCJzdGFydC1nYW1lXCIgYnV0dG9uIHdoZW4gYWxsIHNoaXBzIGFyZSBwbGFjZWQgb24gdGhlIGJvYXJkXG4gIGlmIChzaGlwcyA9PT0gMCkge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBidG4uY2xhc3NMaXN0LmFkZChcInN0YXJ0LWJ0blwiKTtcbiAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCJTdGFydCBHYW1lXCI7XG4gICAgY29udGFpbmVyLnN0eWxlLmNvbG9yID0gXCJncmV5XCI7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcblxuICAgIC8vIEFkZCBzaGlwIGNvb3JkaW5hdGVzIHRvIGFycmF5XG4gICAgc29ydFNoaXBzQ29vcmRpbmF0ZXMoKTtcbiAgfVxufTtcblxuY29uc3QgaXNEcm9wVmFsaWQgPSAoaW5kZXhYLCBpbmRleFksIHNoaXBIZWlnaHQsIHNoaXBXaWR0aCwgbm9kZUxpc3QpID0+IHtcbiAgLy8gSWYgc2hpcCBkcm9wIGV4Y2VlZHMgdGhlIGJvdW5kIG9mIHRoZSBib2FyZCwgcmV0dXJuIGZhbHNlXG4gIGlmIChpbmRleFkgKyBzaGlwV2lkdGggPiAxMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIGEgc2hpcCB0byB0aGUgaW1tZWRpYXRlIHRvcCBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tUb3AgPSAoKSA9PiB7XG4gICAgbGV0IGRyb3BTcXVhcmUgPSBub2RlTGlzdFtpbmRleFldO1xuICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgbGV0IHBhcmVudFNpYmxpbmcgPSBwYXJlbnQucHJldmlvdXNTaWJsaW5nO1xuICAgIGxldCBzdGFydEluZGV4ID0gaW5kZXhZIC0gMTtcblxuICAgIGlmIChwYXJlbnRTaWJsaW5nID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBXaWR0aCArIDI7IGkrKykge1xuICAgICAgLy8gQ2hlY2tzIGNoaWxkIG5vZGVzIG9mIHRoZSBwYXJlbnQgc2libGluZ1xuICAgICAgbGV0IHNxdWFyZUluZGV4ID0gc3RhcnRJbmRleCArIGk7XG4gICAgICBsZXQgbm9kZUxpc3QgPSBwYXJlbnRTaWJsaW5nLmNoaWxkTm9kZXM7XG4gICAgICBsZXQgc3F1YXJlID0gbm9kZUxpc3Rbc3F1YXJlSW5kZXhdO1xuXG4gICAgICBpZiAoc3F1YXJlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBzcXVhcmVDbGFzcyA9IHNxdWFyZS5jbGFzc05hbWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJjYXJyaWVyXCIpIHx8XG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiYmF0dGxlc2hpcFwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImRlc3Ryb3llclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcInN1Ym1hcmluZVwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcInBhdHJvbC1ib2F0XCIpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKiBUaGlzIGNoZWNrcyBpZiB0aGVyZSBpcyBhIHNoaXAgdG8gdGhlIGltbWVkaWF0ZSByaWdodCBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tSaWdodCA9ICgpID0+IHtcbiAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W2luZGV4WV07XG4gICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICBsZXQgZ3JhbmRQYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICBsZXQgcGFyZW50TGlzdCA9IGdyYW5kUGFyZW50LmNoaWxkTm9kZXM7XG4gICAgbGV0IHNxdWFyZUluZGV4ID0gaW5kZXhZICsgc2hpcFdpZHRoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwSGVpZ2h0OyBpKyspIHtcbiAgICAgIGxldCBpbmRleCA9IGluZGV4WCArIGk7XG4gICAgICBsZXQgY2hpbGRyZW4gPSBwYXJlbnRMaXN0W2luZGV4XTtcbiAgICAgIGxldCBsaXN0ID0gY2hpbGRyZW4uY2hpbGROb2RlcztcbiAgICAgIGxldCBzcXVhcmUgPSBsaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyogVGhpcyBjaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIHRvIHRoZSBpbW1lZGlhdGUgYm90dG9tIG9mIHRoZSBcbiAgXCJkcm9wIHNoaXBcIiwgYW5kIHN0b3BzIGV4ZWN1dGlvbiBpZiBhIHBsYWNlZCBzaGlwIGlzIGRldGVjdGVkLiAqL1xuICBjb25zdCBjaGVja0JvdHRvbSA9ICgpID0+IHtcbiAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W2luZGV4WV07XG4gICAgbGV0IHBhcmVudCA9IGRyb3BTcXVhcmUucGFyZW50Tm9kZTtcbiAgICBsZXQgcGFyZW50U2libGluZyA9IHBhcmVudC5uZXh0U2libGluZztcbiAgICBsZXQgc3RhcnRJbmRleCA9IGluZGV4WSAtIDE7XG5cbiAgICBpZiAocGFyZW50U2libGluZyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwV2lkdGggKyAyOyBpKyspIHtcbiAgICAgIC8vIENoZWNrcyBjaGlsZCBub2RlcyBvZiB0aGUgcGFyZW50IHNpYmxpbmdcbiAgICAgIGxldCBzcXVhcmVJbmRleCA9IHN0YXJ0SW5kZXggKyBpO1xuICAgICAgbGV0IG5vZGVMaXN0ID0gcGFyZW50U2libGluZy5jaGlsZE5vZGVzO1xuICAgICAgbGV0IHNxdWFyZSA9IG5vZGVMaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyogVGhpcyBjaGVja3MgaWYgdGhlcmUgaXMgYSBzaGlwIHRvIHRoZSBpbW1lZGlhdGUgbGVmdCBvZiB0aGUgXG4gIFwiZHJvcCBzaGlwXCIsIGFuZCBzdG9wcyBleGVjdXRpb24gaWYgYSBwbGFjZWQgc2hpcCBpcyBkZXRlY3RlZC4gKi9cbiAgY29uc3QgY2hlY2tMZWZ0ID0gKCkgPT4ge1xuICAgIGxldCBkcm9wU3F1YXJlID0gbm9kZUxpc3RbaW5kZXhZXTtcbiAgICBsZXQgcGFyZW50ID0gZHJvcFNxdWFyZS5wYXJlbnROb2RlO1xuICAgIGxldCBncmFuZFBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgIGxldCBwYXJlbnRMaXN0ID0gZ3JhbmRQYXJlbnQuY2hpbGROb2RlcztcbiAgICBsZXQgc3F1YXJlSW5kZXggPSBpbmRleFkgLSAxO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwSGVpZ2h0OyBpKyspIHtcbiAgICAgIGxldCBpbmRleCA9IGluZGV4WCArIGk7XG4gICAgICBsZXQgY2hpbGRyZW4gPSBwYXJlbnRMaXN0W2luZGV4XTtcbiAgICAgIGxldCBsaXN0ID0gY2hpbGRyZW4uY2hpbGROb2RlcztcbiAgICAgIGxldCBzcXVhcmUgPSBsaXN0W3NxdWFyZUluZGV4XTtcblxuICAgICAgaWYgKHNxdWFyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3F1YXJlQ2xhc3MgPSBzcXVhcmUuY2xhc3NOYW1lO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUNsYXNzLmluY2x1ZGVzKFwiY2FycmllclwiKSB8fFxuICAgICAgICBzcXVhcmVDbGFzcy5pbmNsdWRlcyhcImJhdHRsZXNoaXBcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJkZXN0cm95ZXJcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJzdWJtYXJpbmVcIikgfHxcbiAgICAgICAgc3F1YXJlQ2xhc3MuaW5jbHVkZXMoXCJwYXRyb2wtYm9hdFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgbGV0IHRvcFZhbGlkID0gY2hlY2tUb3AoKTtcbiAgbGV0IHJpZ2h0VmFsaWQgPSBjaGVja1JpZ2h0KCk7XG4gIGxldCBib3R0b21WYWxpZCA9IGNoZWNrQm90dG9tKCk7XG4gIGxldCBsZWZ0VmFsaWQgPSBjaGVja0xlZnQoKTtcblxuICBpZiAoXG4gICAgdG9wVmFsaWQgPT09IHRydWUgJiZcbiAgICByaWdodFZhbGlkID09PSB0cnVlICYmXG4gICAgYm90dG9tVmFsaWQgPT09IHRydWUgJiZcbiAgICBsZWZ0VmFsaWQgPT09IHRydWVcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoXG4gICAgdG9wVmFsaWQgPT09IGZhbHNlIHx8XG4gICAgcmlnaHRWYWxpZCA9PT0gZmFsc2UgfHxcbiAgICBib3R0b21WYWxpZCA9PT0gZmFsc2UgfHxcbiAgICBsZWZ0VmFsaWQgPT09IGZhbHNlXG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3Qgc3RhcnRNZW51RXZlbnRIYW5kbGVyID0gKCkgPT4ge1xuICBjb25zdCBtYWluU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoZSkgPT4ge1xuICAgIGxldCBlbGVtZW50ID0gZS50YXJnZXQ7XG5cbiAgICBpZiAoXG4gICAgICBlbGVtZW50LmlkID09PSBcImNhcnJpZXJcIiB8fFxuICAgICAgZWxlbWVudC5pZCA9PT0gXCJiYXR0bGVzaGlwXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwiZGVzdHJveWVyXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwic3VibWFyaW5lXCIgfHxcbiAgICAgIGVsZW1lbnQuaWQgPT09IFwicGF0cm9sLWJvYXRcIlxuICAgICkge1xuICAgICAgbGV0IGhlaWdodCA9IGVsZW1lbnQuZGF0YXNldC5oZWlnaHQ7XG4gICAgICBsZXQgd2lkdGggPSBlbGVtZW50LmRhdGFzZXQud2lkdGg7XG5cbiAgICAgIGVsZW1lbnQuZGF0YXNldC5oZWlnaHQgPSB3aWR0aDtcbiAgICAgIGVsZW1lbnQuZGF0YXNldC53aWR0aCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZXBsYWNlKFwiaG9yaXpvbnRhbFwiLCBcInZlcnRpY2FsXCIpO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09IFwidmVydGljYWxcIikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVwbGFjZShcInZlcnRpY2FsXCIsIFwiaG9yaXpvbnRhbFwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcbiAgICBsZXQgZWxlbWVudCA9IGUudGFyZ2V0LmlkO1xuXG4gICAgaWYgKFxuICAgICAgZWxlbWVudCA9PT0gXCJjYXJyaWVyXCIgfHxcbiAgICAgIGVsZW1lbnQgPT09IFwiYmF0dGxlc2hpcFwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcImRlc3Ryb3llclwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcInN1Ym1hcmluZVwiIHx8XG4gICAgICBlbGVtZW50ID09PSBcInBhdHJvbC1ib2F0XCJcbiAgICApIHtcbiAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIGVsZW1lbnQpO1xuXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBsZXQgc3RyID0gZWxlbWVudDtcbiAgICAgICAgbGV0IGxldHRlciA9IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgbGV0IHRleHQgPSBzdHIucmVwbGFjZShzdHIuY2hhckF0KDApLCBsZXR0ZXIpO1xuXG4gICAgICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgKGUpID0+IHtcbiAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwidGFibGUtY2VsbFwiKSB7XG4gICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMyM2ZmY2ZcIjtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcInRhYmxlLWNlbGxcIikge1xuICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICB9XG4gIH0pO1xuXG4gIG1haW5TZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJ0YWJsZS1jZWxsXCIpIHtcbiAgICAgIGNvbnN0IGRyb3B6b25lID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQgPSBkcm9wem9uZS5wYXJlbnROb2RlO1xuICAgICAgY29uc3Qgbm9kZUxpc3QgPSBwYXJlbnQuY2hpbGROb2RlcztcbiAgICAgIGNvbnN0IGRhdGEgPSBkcm9wem9uZS5kYXRhc2V0LnBvcztcbiAgICAgIGNvbnN0IGFycmF5ID0gZGF0YS5zcGxpdChcIixcIik7XG4gICAgICBjb25zdCB4ID0gcGFyc2VJbnQoYXJyYXlbMF0pO1xuICAgICAgY29uc3QgeSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUlkID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIik7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJhZ2dhYmxlSWQpO1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBkcmFnZ2FibGVFbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgIGNvbnN0IHNoaXBIZWlnaHQgPSBwYXJzZUludChkcmFnZ2FibGVFbGVtZW50LmRhdGFzZXQuaGVpZ2h0KTtcbiAgICAgIGNvbnN0IHNoaXBXaWR0aCA9IHBhcnNlSW50KGRyYWdnYWJsZUVsZW1lbnQuZGF0YXNldC53aWR0aCk7XG5cbiAgICAgIC8vIFRoaXMgY2hlY2tzIGlmIHRoZSBkcm9wIGlzIHZhbGlkXG4gICAgICBsZXQgdmFsaWQgPSBpc0Ryb3BWYWxpZCh4LCB5LCBzaGlwSGVpZ2h0LCBzaGlwV2lkdGgsIG5vZGVMaXN0KTtcbiAgICAgIGxldCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAgICAgLy8gSWYgZHJvcCBpcyBub3QgdmFsaWQsIHN0b3AgZXhlY3V0aW9uXG4gICAgICBpZiAodmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICAgIG5vZGVMaXN0W3ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgIC8vIFRoaXMgYWRkcyBhIHZpc3VhbCBpbmRpY2F0aW9uIHdoZXJlIHRoZSBzaGlwIGlzIGRyb3BwZWRcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBXaWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB5ICsgaTtcblxuICAgICAgICAgICAgbm9kZUxpc3RbaW5kZXhdLmNsYXNzTGlzdC5hZGQoZHJhZ2dhYmxlSWQpO1xuICAgICAgICAgICAgbm9kZUxpc3RbaW5kZXhdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzAwOTlkNlwiO1xuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW3gsIGluZGV4XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRoaXMgYWRkcyBhIHZpc3VhbCBpbmRpY2F0aW9uIHdoZXJlIHRoZSBzaGlwIGlzIGRyb3BwZWRcbiAgICAgICAgICBsZXQgZHJvcFNxdWFyZSA9IG5vZGVMaXN0W3ldO1xuICAgICAgICAgIGxldCBwYXJlbnQgPSBkcm9wU3F1YXJlLnBhcmVudE5vZGU7XG4gICAgICAgICAgbGV0IGdyYW5kUGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgbGV0IHBhcmVudExpc3QgPSBncmFuZFBhcmVudC5jaGlsZE5vZGVzO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwSGVpZ2h0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHggKyBpO1xuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gcGFyZW50TGlzdFtpbmRleF07XG4gICAgICAgICAgICBsZXQgbGlzdCA9IGNoaWxkcmVuLmNoaWxkTm9kZXM7XG5cbiAgICAgICAgICAgIGxpc3RbeV0uY2xhc3NMaXN0LmFkZChkcmFnZ2FibGVJZCk7XG4gICAgICAgICAgICBsaXN0W3ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzAwOTlkNlwiO1xuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goW2luZGV4LCB5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlUGFyZW50ID0gZHJhZ2dhYmxlRWxlbWVudC5wYXJlbnROb2RlO1xuXG4gICAgICAgIGRyYWdnYWJsZVBhcmVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgIHVzZXJTaGlwc1tkcmFnZ2FibGVJZF0gPSBzaGlwQ29vcmRpbmF0ZXM7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLmNsZWFyRGF0YSgpO1xuICAgICAgICBhbGxTaGlwc1BsYWNlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgbWFpblNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJzdGFydC1idG5cIikge1xuICAgICAgbWFpblNlY3Rpb24udGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICBnZXRDb21wdXRlclNoaXBzKCk7XG4gICAgICBnYW1lTWVudSgpO1xuICAgICAgR2FtZSgpO1xuXG4gICAgICB1c2VyU2hpcHNDb29yZGluYXRlcy5sZW5ndGggPSAwO1xuICAgICAgY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMubGVuZ3RoID0gMDtcbiAgICAgIHZpc2l0ZWQubGVuZ3RoID0gMDtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgc3RhcnRNZW51LCB1c2VyU2hpcHNDb29yZGluYXRlcywgc3RhcnRNZW51RXZlbnRIYW5kbGVyIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgYm9keS5tb2RhbC1vcGVuIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbmJvZHkubW9kYWwtb3BlbiAudXNlci1jb250YWluZXIsXG5ib2R5Lm1vZGFsLW9wZW4gLmNvbXB1dGVyLWNvbnRhaW5lciB7XG4gIG9wYWNpdHk6IDAuMztcbn1cblxuYm9keS5tb2RhbC1vcGVuIC5wb3AtdXAge1xuICBwb2ludGVyLWV2ZW50czogYXV0bztcbn1cblxuLnBvcC11cCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaGVpZ2h0OiA0MCU7XG4gIHdpZHRoOiA0MCU7XG4gIG1heC1oZWlnaHQ6IDI1MHB4O1xuICBtaW4taGVpZ2h0OiAyMDBweDtcbiAgbWF4LXdpZHRoOiA0NTBweDtcbiAgbWluLXdpZHRoOiAzNTBweDtcbiAgY29sb3I6ICNkMWQ0ZGM7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDUsIDY3LCA5MCwgMC44KTtcbiAgcGFkZGluZzogMTBweDtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDIsIDFmcik7XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyMHB4O1xufVxuXG4udXNlci1jb250YWluZXIsXG4uY29tcHV0ZXItY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi51c2VyLWJhdHRsZWZpZWxkLFxuLmNvbXB1dGVyLWJhdHRsZWZpZWxkIHtcbiAgaGVpZ2h0OiAzNTBweDtcbiAgd2lkdGg6IDM1MHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG59XG5cbi51c2VyLWJhdHRsZWZpZWxkIHtcbiAganVzdGlmeS1zZWxmOiBlbmQ7XG59XG5cbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XG4gIGp1c3RpZnktc2VsZjogc3RhcnQ7XG59XG5cbi5zcXVhcmUge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMTMxYzI2O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnNoaXAtc3F1YXJlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwOTlkNjtcbn1cblxuLnNoaXAtbWlzc2VkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzllYTBhMTtcbn1cblxuLnNoaXAtaGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMWExYTtcbn1cblxuLnJlc3RhcnQtYnRuIHtcbiAgaGVpZ2h0OiA1NXB4O1xuICB3aWR0aDogMTEwcHg7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE4YmM5YztcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5wb3AtdXAgaDMge1xuICBmb250LXNpemU6IDIuNXJlbTtcbn1cblxuLnVzZXItY29udGFpbmVyIHAsXG4uY29tcHV0ZXItY29udGFpbmVyIHAge1xuICBwYWRkaW5nOiA1cHg7XG59XG5cbi5jb21wdXRlci1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4ucmVzdGFydC1idG46aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWJkM2FmO1xuICBoZWlnaHQ6IDYwcHg7XG4gIHdpZHRoOiAxMTVweDtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9nYW1lbWVudS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7O0VBRUUsWUFBWTtBQUNkOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCx1Q0FBdUM7RUFDdkMsYUFBYTtFQUNiLFFBQVE7RUFDUixTQUFTO0VBQ1QsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYixrQ0FBa0M7RUFDbEMscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixTQUFTO0FBQ1g7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBOztFQUVFLGFBQWE7RUFDYixZQUFZO0VBQ1osYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7O0VBRUUsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixZQUFZO0FBQ2RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keS5tb2RhbC1vcGVuIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG5ib2R5Lm1vZGFsLW9wZW4gLnVzZXItY29udGFpbmVyLFxcbmJvZHkubW9kYWwtb3BlbiAuY29tcHV0ZXItY29udGFpbmVyIHtcXG4gIG9wYWNpdHk6IDAuMztcXG59XFxuXFxuYm9keS5tb2RhbC1vcGVuIC5wb3AtdXAge1xcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XFxufVxcblxcbi5wb3AtdXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiA0MCU7XFxuICB3aWR0aDogNDAlO1xcbiAgbWF4LWhlaWdodDogMjUwcHg7XFxuICBtaW4taGVpZ2h0OiAyMDBweDtcXG4gIG1heC13aWR0aDogNDUwcHg7XFxuICBtaW4td2lkdGg6IDM1MHB4O1xcbiAgY29sb3I6ICNkMWQ0ZGM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQ1LCA2NywgOTAsIDAuOCk7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLnVzZXItY29udGFpbmVyLFxcbi5jb21wdXRlci1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi51c2VyLWJhdHRsZWZpZWxkLFxcbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XFxuICBoZWlnaHQ6IDM1MHB4O1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi51c2VyLWJhdHRsZWZpZWxkIHtcXG4gIGp1c3RpZnktc2VsZjogZW5kO1xcbn1cXG5cXG4uY29tcHV0ZXItYmF0dGxlZmllbGQge1xcbiAganVzdGlmeS1zZWxmOiBzdGFydDtcXG59XFxuXFxuLnNxdWFyZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMTMxYzI2O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnNoaXAtc3F1YXJlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDk5ZDY7XFxufVxcblxcbi5zaGlwLW1pc3NlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWVhMGExO1xcbn1cXG5cXG4uc2hpcC1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMWExYTtcXG59XFxuXFxuLnJlc3RhcnQtYnRuIHtcXG4gIGhlaWdodDogNTVweDtcXG4gIHdpZHRoOiAxMTBweDtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxOGJjOWM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbn1cXG5cXG4ucG9wLXVwIGgzIHtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbn1cXG5cXG4udXNlci1jb250YWluZXIgcCxcXG4uY29tcHV0ZXItY29udGFpbmVyIHAge1xcbiAgcGFkZGluZzogNXB4O1xcbn1cXG5cXG4uY29tcHV0ZXItY29udGFpbmVyIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi5yZXN0YXJ0LWJ0bjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWJkM2FmO1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgd2lkdGg6IDExNXB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1CbGFjaytPcHMrT25lJmZhbWlseT1PcGVuK1NhbnMmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG5ib2R5IHtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIGZvbnQtZmFtaWx5OiBcIkJsYWNrIE9wcyBPbmVcIiwgY3Vyc2l2ZTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBjb2xvcjogI2QxZDRkYztcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEzMWMyNjtcbiAgZGlzcGxheTogZ3JpZDtcbn1cblxuLmNvbnRlbnQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAyMHB4IDUwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDcwcHggMWZyIDcwcHg7XG59XG5cbi5tYWluLXNlY3Rpb24ge1xuICBwYWRkaW5nOiAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMzAwcHgsIDUwMHB4KSk7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uaGVhZGVyIHtcbiAgcGFkZGluZzogMTBweDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZm9vdGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmgxIHtcbiAgZm9udC1mYW1pbHk6IFwiQmxhY2sgT3BzIE9uZVwiLCBjdXJzaXZlO1xuICBmb250LXNpemU6IDNyZW07XG59XG5cbi5mb290ZXIgcCB7XG4gIGZvbnQtZmFtaWx5OiBcIk9wZW4gU2Fuc1wiLCBzYW5zLXNlcmlmO1xufVxuXG5pbWcge1xuICB3aWR0aDogNjBweDtcbiAganVzdGlmeS1zZWxmOiBlbmQ7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLHFDQUFxQztFQUNyQyxlQUFlO0VBQ2YsY0FBYztFQUNkLHlCQUF5QjtFQUN6QixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsMEJBQTBCO0VBQzFCLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDZEQUE2RDtFQUM3RCx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHFDQUFxQztFQUNyQyxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsV0FBVztFQUNYLGlCQUFpQjtBQUNuQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1CbGFjaytPcHMrT25lJmZhbWlseT1PcGVuK1NhbnMmZGlzcGxheT1zd2FwXFxcIik7XFxuXFxuKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQmxhY2sgT3BzIE9uZVxcXCIsIGN1cnNpdmU7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBjb2xvcjogI2QxZDRkYztcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMzFjMjY7XFxuICBkaXNwbGF5OiBncmlkO1xcbn1cXG5cXG4uY29udGVudCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDIwcHggNTBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogNzBweCAxZnIgNzBweDtcXG59XFxuXFxuLm1haW4tc2VjdGlvbiB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMzAwcHgsIDUwMHB4KSk7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmhlYWRlciB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuaDEge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJCbGFjayBPcHMgT25lXFxcIiwgY3Vyc2l2ZTtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG59XFxuXFxuLmZvb3RlciBwIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiT3BlbiBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG59XFxuXFxuaW1nIHtcXG4gIHdpZHRoOiA2MHB4O1xcbiAganVzdGlmeS1zZWxmOiBlbmQ7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLmxlZnQtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnJpZ2h0LXNlY3Rpb24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTAwcHggMTAwcHggMWZyO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5zdGFydC1tZW51LXRhYmxlIHtcbiAgaGVpZ2h0OiA0MDBweDtcbiAgd2lkdGg6IDQwMHB4O1xuICBkaXNwbGF5OiBncmlkO1xufVxuXG50Ym9keSB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLnRhYmxlLXJvdyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG59XG5cbi50YWJsZS1jZWxsIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzEzMWMyNjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2QxZDRkYztcbn1cblxuLmluc3RydWN0aW9ucy1vbmUge1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgYWxpZ24tc2VsZjogc2VsZi1lbmQ7XG59XG5cbi5wb3J0IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCBhdXRvO1xuICBncmlkLWF1dG8tcm93czogbWlubWF4KG1pbi1jb250ZW50LCBtYXgtY29udGVudCk7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uY2Fycmllci1iZXJ0aCxcbi5iYXR0bGVzaGlwLWJlcnRoLFxuLmRlc3Ryb3llci1iZXJ0aCxcbi5zdWJtYXJpbmUtYmVydGgsXG4ucGF0cm9sLWJvYXQtYmVydGgge1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG4jY2Fycmllci5ob3Jpem9udGFsLFxuI2JhdHRsZXNoaXAuaG9yaXpvbnRhbCxcbiNkZXN0cm95ZXIuaG9yaXpvbnRhbCxcbiNzdWJtYXJpbmUuaG9yaXpvbnRhbCxcbiNwYXRyb2wtYm9hdC5ob3Jpem9udGFsIHtcbiAgaGVpZ2h0OiAzNXB4O1xufVxuXG4jY2Fycmllci5ob3Jpem9udGFsIHtcbiAgd2lkdGg6IDIwMHB4O1xufVxuXG4jYmF0dGxlc2hpcC5ob3Jpem9udGFsIHtcbiAgd2lkdGg6IDE2MHB4O1xufVxuXG4jZGVzdHJveWVyLmhvcml6b250YWwsXG4jc3VibWFyaW5lLmhvcml6b250YWwge1xuICB3aWR0aDogMTIwcHg7XG59XG5cbiNwYXRyb2wtYm9hdC5ob3Jpem9udGFsIHtcbiAgd2lkdGg6IDgwcHg7XG59XG5cbiNjYXJyaWVyLnZlcnRpY2FsLFxuI2JhdHRsZXNoaXAudmVydGljYWwsXG4jZGVzdHJveWVyLnZlcnRpY2FsLFxuI3N1Ym1hcmluZS52ZXJ0aWNhbCxcbiNwYXRyb2wtYm9hdC52ZXJ0aWNhbCB7XG4gIHdpZHRoOiAzNXB4O1xufVxuXG4jY2Fycmllci52ZXJ0aWNhbCB7XG4gIGhlaWdodDogMjAwcHg7XG59XG5cbiNiYXR0bGVzaGlwLnZlcnRpY2FsIHtcbiAgaGVpZ2h0OiAxNjBweDtcbn1cblxuI2Rlc3Ryb3llci52ZXJ0aWNhbCxcbiNzdWJtYXJpbmUudmVydGljYWwge1xuICBoZWlnaHQ6IDEyMHB4O1xufVxuXG4jcGF0cm9sLWJvYXQudmVydGljYWwge1xuICBoZWlnaHQ6IDgwcHg7XG59XG5cbiNjYXJyaWVyLFxuI2JhdHRsZXNoaXAsXG4jZGVzdHJveWVyLFxuI3N1Ym1hcmluZSxcbiNwYXRyb2wtYm9hdCB7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgY29sb3I6ICMwMzAyMDE7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDk5ZDY7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5zdGFydC1idG4ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGhlaWdodDogODBweDtcbiAgd2lkdGg6IDE2MHB4O1xuICBmb250LXNpemU6IDEuMjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICMxOGJjOWM7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5zdGFydC1idG46aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWJkM2FmO1xuICBoZWlnaHQ6IDg1cHg7XG4gIHdpZHRoOiAxNjVweDtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gIC5zdGFydC1tZW51LXRhYmxlIHtcbiAgICBoZWlnaHQ6IDMwMHB4O1xuICAgIHdpZHRoOiAzMDBweDtcbiAgfVxuXG4gICNjYXJyaWVyLmhvcml6b250YWwsXG4gICNiYXR0bGVzaGlwLmhvcml6b250YWwsXG4gICNkZXN0cm95ZXIuaG9yaXpvbnRhbCxcbiAgI3N1Ym1hcmluZS5ob3Jpem9udGFsLFxuICAjcGF0cm9sLWJvYXQuaG9yaXpvbnRhbCB7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICB9XG5cbiAgI2NhcnJpZXIuaG9yaXpvbnRhbCB7XG4gICAgd2lkdGg6IDE1MHB4O1xuICB9XG5cbiAgI2JhdHRsZXNoaXAuaG9yaXpvbnRhbCB7XG4gICAgd2lkdGg6IDEyMHB4O1xuICB9XG5cbiAgI2Rlc3Ryb3llci5ob3Jpem9udGFsLFxuICAjc3VibWFyaW5lLmhvcml6b250YWwge1xuICAgIHdpZHRoOiA5MHB4O1xuICB9XG5cbiAgI3BhdHJvbC1ib2F0Lmhvcml6b250YWwge1xuICAgIHdpZHRoOiA2MHB4O1xuICB9XG5cbiAgI2NhcnJpZXIudmVydGljYWwsXG4gICNiYXR0bGVzaGlwLnZlcnRpY2FsLFxuICAjZGVzdHJveWVyLnZlcnRpY2FsLFxuICAjc3VibWFyaW5lLnZlcnRpY2FsLFxuICAjcGF0cm9sLWJvYXQudmVydGljYWwge1xuICAgIHdpZHRoOiAyNXB4O1xuICB9XG5cbiAgI2NhcnJpZXIudmVydGljYWwge1xuICAgIGhlaWdodDogMTUwcHg7XG4gIH1cblxuICAjYmF0dGxlc2hpcC52ZXJ0aWNhbCB7XG4gICAgaGVpZ2h0OiAxMjBweDtcbiAgfVxuXG4gICNkZXN0cm95ZXIudmVydGljYWwsXG4gICNzdWJtYXJpbmUudmVydGljYWwge1xuICAgIGhlaWdodDogOTBweDtcbiAgfVxuXG4gICNwYXRyb2wtYm9hdC52ZXJ0aWNhbCB7XG4gICAgaGVpZ2h0OiA2MHB4O1xuICB9XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3RhcnRtZW51LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixtQ0FBbUM7RUFDbkMscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxhQUFhO0VBQ2IsdUNBQXVDO0VBQ3ZDLGdEQUFnRDtFQUNoRCx1QkFBdUI7QUFDekI7O0FBRUE7Ozs7O0VBS0UsYUFBYTtBQUNmOztBQUVBOzs7OztFQUtFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTs7RUFFRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7Ozs7O0VBS0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBOztFQUVFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTs7Ozs7RUFLRSxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFFBQVE7RUFDUixTQUFTO0VBQ1QsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRTtJQUNFLGFBQWE7SUFDYixZQUFZO0VBQ2Q7O0VBRUE7Ozs7O0lBS0UsWUFBWTtFQUNkOztFQUVBO0lBQ0UsWUFBWTtFQUNkOztFQUVBO0lBQ0UsWUFBWTtFQUNkOztFQUVBOztJQUVFLFdBQVc7RUFDYjs7RUFFQTtJQUNFLFdBQVc7RUFDYjs7RUFFQTs7Ozs7SUFLRSxXQUFXO0VBQ2I7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7O0lBRUUsWUFBWTtFQUNkOztFQUVBO0lBQ0UsWUFBWTtFQUNkO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmxlZnQtc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnJpZ2h0LXNlY3Rpb24ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTAwcHggMTAwcHggMWZyO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0LW1lbnUtdGFibGUge1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbnRib2R5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4udGFibGUtcm93IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnRhYmxlLWNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzEzMWMyNjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkMWQ0ZGM7XFxufVxcblxcbi5pbnN0cnVjdGlvbnMtb25lIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgYWxpZ24tc2VsZjogc2VsZi1lbmQ7XFxufVxcblxcbi5wb3J0IHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgYXV0bztcXG4gIGdyaWQtYXV0by1yb3dzOiBtaW5tYXgobWluLWNvbnRlbnQsIG1heC1jb250ZW50KTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uY2Fycmllci1iZXJ0aCxcXG4uYmF0dGxlc2hpcC1iZXJ0aCxcXG4uZGVzdHJveWVyLWJlcnRoLFxcbi5zdWJtYXJpbmUtYmVydGgsXFxuLnBhdHJvbC1ib2F0LWJlcnRoIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblxcbiNjYXJyaWVyLmhvcml6b250YWwsXFxuI2JhdHRsZXNoaXAuaG9yaXpvbnRhbCxcXG4jZGVzdHJveWVyLmhvcml6b250YWwsXFxuI3N1Ym1hcmluZS5ob3Jpem9udGFsLFxcbiNwYXRyb2wtYm9hdC5ob3Jpem9udGFsIHtcXG4gIGhlaWdodDogMzVweDtcXG59XFxuXFxuI2NhcnJpZXIuaG9yaXpvbnRhbCB7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcblxcbiNiYXR0bGVzaGlwLmhvcml6b250YWwge1xcbiAgd2lkdGg6IDE2MHB4O1xcbn1cXG5cXG4jZGVzdHJveWVyLmhvcml6b250YWwsXFxuI3N1Ym1hcmluZS5ob3Jpem9udGFsIHtcXG4gIHdpZHRoOiAxMjBweDtcXG59XFxuXFxuI3BhdHJvbC1ib2F0Lmhvcml6b250YWwge1xcbiAgd2lkdGg6IDgwcHg7XFxufVxcblxcbiNjYXJyaWVyLnZlcnRpY2FsLFxcbiNiYXR0bGVzaGlwLnZlcnRpY2FsLFxcbiNkZXN0cm95ZXIudmVydGljYWwsXFxuI3N1Ym1hcmluZS52ZXJ0aWNhbCxcXG4jcGF0cm9sLWJvYXQudmVydGljYWwge1xcbiAgd2lkdGg6IDM1cHg7XFxufVxcblxcbiNjYXJyaWVyLnZlcnRpY2FsIHtcXG4gIGhlaWdodDogMjAwcHg7XFxufVxcblxcbiNiYXR0bGVzaGlwLnZlcnRpY2FsIHtcXG4gIGhlaWdodDogMTYwcHg7XFxufVxcblxcbiNkZXN0cm95ZXIudmVydGljYWwsXFxuI3N1Ym1hcmluZS52ZXJ0aWNhbCB7XFxuICBoZWlnaHQ6IDEyMHB4O1xcbn1cXG5cXG4jcGF0cm9sLWJvYXQudmVydGljYWwge1xcbiAgaGVpZ2h0OiA4MHB4O1xcbn1cXG5cXG4jY2FycmllcixcXG4jYmF0dGxlc2hpcCxcXG4jZGVzdHJveWVyLFxcbiNzdWJtYXJpbmUsXFxuI3BhdHJvbC1ib2F0IHtcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXG4gIGNvbG9yOiAjMDMwMjAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwOTlkNjtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydC1idG4ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgd2lkdGg6IDE2MHB4O1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE4YmM5YztcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0LWJ0bjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWJkM2FmO1xcbiAgaGVpZ2h0OiA4NXB4O1xcbiAgd2lkdGg6IDE2NXB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5zdGFydC1tZW51LXRhYmxlIHtcXG4gICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgd2lkdGg6IDMwMHB4O1xcbiAgfVxcblxcbiAgI2NhcnJpZXIuaG9yaXpvbnRhbCxcXG4gICNiYXR0bGVzaGlwLmhvcml6b250YWwsXFxuICAjZGVzdHJveWVyLmhvcml6b250YWwsXFxuICAjc3VibWFyaW5lLmhvcml6b250YWwsXFxuICAjcGF0cm9sLWJvYXQuaG9yaXpvbnRhbCB7XFxuICAgIGhlaWdodDogMjVweDtcXG4gIH1cXG5cXG4gICNjYXJyaWVyLmhvcml6b250YWwge1xcbiAgICB3aWR0aDogMTUwcHg7XFxuICB9XFxuXFxuICAjYmF0dGxlc2hpcC5ob3Jpem9udGFsIHtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgfVxcblxcbiAgI2Rlc3Ryb3llci5ob3Jpem9udGFsLFxcbiAgI3N1Ym1hcmluZS5ob3Jpem9udGFsIHtcXG4gICAgd2lkdGg6IDkwcHg7XFxuICB9XFxuXFxuICAjcGF0cm9sLWJvYXQuaG9yaXpvbnRhbCB7XFxuICAgIHdpZHRoOiA2MHB4O1xcbiAgfVxcblxcbiAgI2NhcnJpZXIudmVydGljYWwsXFxuICAjYmF0dGxlc2hpcC52ZXJ0aWNhbCxcXG4gICNkZXN0cm95ZXIudmVydGljYWwsXFxuICAjc3VibWFyaW5lLnZlcnRpY2FsLFxcbiAgI3BhdHJvbC1ib2F0LnZlcnRpY2FsIHtcXG4gICAgd2lkdGg6IDI1cHg7XFxuICB9XFxuXFxuICAjY2Fycmllci52ZXJ0aWNhbCB7XFxuICAgIGhlaWdodDogMTUwcHg7XFxuICB9XFxuXFxuICAjYmF0dGxlc2hpcC52ZXJ0aWNhbCB7XFxuICAgIGhlaWdodDogMTIwcHg7XFxuICB9XFxuXFxuICAjZGVzdHJveWVyLnZlcnRpY2FsLFxcbiAgI3N1Ym1hcmluZS52ZXJ0aWNhbCB7XFxuICAgIGhlaWdodDogOTBweDtcXG4gIH1cXG5cXG4gICNwYXRyb2wtYm9hdC52ZXJ0aWNhbCB7XFxuICAgIGhlaWdodDogNjBweDtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2FtZW1lbnUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nYW1lbWVudS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2xvYmFsLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2xvYmFsLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGFydG1lbnUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGFydG1lbnUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IHBhZ2VMYXlvdXQgfSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7IHN0YXJ0TWVudSwgc3RhcnRNZW51RXZlbnRIYW5kbGVyIH0gZnJvbSBcIi4vc3RhcnQtbWVudVwiO1xuaW1wb3J0IHsgZ2FtZU1lbnVFdmVudEhhbmRsZXIgfSBmcm9tIFwiLi9iYXR0bGVzaGlwXCI7XG5cbmNvbnN0IGNvbXBvbmVudCA9ICgpID0+IHtcbiAgcGFnZUxheW91dCgpO1xuXG4gIHN0YXJ0TWVudSgpO1xuXG4gIHN0YXJ0TWVudUV2ZW50SGFuZGxlcigpO1xuXG4gIGdhbWVNZW51RXZlbnRIYW5kbGVyKCk7XG59O1xuY29tcG9uZW50KCk7XG4iXSwibmFtZXMiOlsic3RhcnRNZW51IiwicGxheVJvdW5kIiwidXNlckF0dGFja3MiLCJjb21wdXRlckF0dGFja3MiLCJnYW1lTWVudSIsImNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50IiwiY29udGFpbmVyT25lIiwiY3JlYXRlRWxlbWVudCIsImNvbnRhaW5lclR3byIsImJhdHRsZWZpZWxkT25lIiwiYmF0dGxlZmllbGRUd28iLCJiYXR0bGVmaWVsZE9uZVBhcmEiLCJiYXR0bGVmaWVsZFR3b1BhcmEiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInJlbmRlckJvYXJkcyIsInVzZXJCYXR0bGVmaWVsZCIsImNvbXB1dGVyQmF0dGxlZmllbGQiLCJyZW5kZXJVc2VyQm9hcmQiLCJib2FyZCIsImkiLCJsZW5ndGgiLCJyb3ciLCJqIiwiYnRuIiwiZGF0YSIsInR5cGUiLCJkYXRhc2V0IiwicG9zIiwicmVuZGVyQ29tcHV0ZXJCb2FyZCIsImdhbWVXaW5uZXIiLCJ3aW5uZXIiLCJwb3BVcCIsIndpbm5lckFubm91bmNlciIsInJlc3RhcnRCdXR0b24iLCJib2R5IiwidG9nZ2xlIiwiZ2FtZU1lbnVFdmVudEhhbmRsZXIiLCJtYWluU2VjdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiZWxlbWVudCIsInRhcmdldCIsImNsYXNzTmFtZSIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYXJyYXkiLCJzcGxpdCIsInBhcnNlSW50IiwiY29tcHV0ZXJTaGlwQ29vcmRpbmF0ZXMiLCJ2aXNpdGVkIiwiaXNBcnJheUluQXJyYXkiLCJzb3VyY2UiLCJzZWFyY2giLCJzZWFyY2hFbGUiLCJzb3VyY2VFbGUiLCJnZXRBZGpDb29yZGluYXRlcyIsImNvb3JkaW5hdGVzIiwiYWRqUG9zaXRpb25zIiwib3JpZW50YXRpb24iLCJvbmUiLCJ0d28iLCJhZGpMZWZ0IiwiYWRqUmlnaHQiLCJwdXNoIiwiYWRqVG9wIiwibGVmdCIsInJpZ2h0IiwiYWRqQm90dG9tIiwidG9wIiwiYm90dG9tIiwiZ2V0UmFuZG9tUG9zaXRpb24iLCJ2YWxpZCIsIngiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ5IiwiZ2V0TGVnYWxDb21ib3MiLCJzaGlwTGVuZ3RoIiwibGVnYWxDb21ib3MiLCJzZXQiLCJsZW5ndGhEaWZmIiwiYXJyYXlMZW5ndGgiLCJ2YWx1ZXMiLCJtb3ZlIiwiZ2V0Q29tcHV0ZXJTaGlwcyIsInJlcGVhdCIsIml0ZW1WaXNpdGVkIiwiY29vcmRpbmF0ZSIsImFkakNvb3JkaW5hdGVzIiwiUGxheWVyU2hpcHMiLCJTaGlwIiwiR2FtZUJvYXJkIiwiY3JlYXRlQm9hcmQiLCJnZXRCb2FyZCIsInBsYXllclNoaXBzIiwic2hpcHMiLCJnZXRTaGlwcyIsInBvcHVsYXRlQm9hcmQiLCJhZGRTaGlwQ29vcmRpbmF0ZXMiLCJwbGFjZVNoaXBzIiwiZmluZEF0dGFja2VkU2hpcCIsImtleSIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tlZFNoaXAiLCJoaXQiLCJhbGxTaGlwc0Rlc3Ryb3llZCIsImNvdW50Iiwic2hpcFN0YXRlIiwiZGVzdHJveWVkIiwiUGxheWVyIiwidXNlclNoaXBzQ29vcmRpbmF0ZXMiLCJ1c2VyR2FtZUJvYXJkIiwiY29tcHV0ZXJHYW1lQm9hcmQiLCJ1c2VyIiwiY29tcHV0ZXIiLCJHYW1lIiwidXNlckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsImF0dGFjayIsIkltZyIsInBhZ2VMYXlvdXQiLCJjb250ZW50IiwiaGVhZGVyIiwibWFpbiIsImZvb3RlciIsImNvcHlyaWdodCIsInRpdGxlIiwibG9nbyIsIkltYWdlIiwic3JjIiwiYWx0IiwibmFtZSIsImdldE5hbWUiLCJpc0F0dGFja0xlZ2FsIiwiZW5lbXkiLCJzbGljZSIsInNoaWZ0IiwiZW5lbXlOYW1lIiwiZ2V0UmFuZG9tIiwiY2hlY2tMZWdhbCIsImNhcnJpZXIiLCJoaXRzIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJjb3B5Iiwic2hpcEFycmF5IiwiYXJyIiwiaXNTdW5rIiwic2hpcCIsImhpdHNDb3VudCIsImNoZWNrU2hpcCIsImdldFN0YXJ0U2NyZWVuQm9hcmQiLCJnYW1lQm9hcmQiLCJsZWZ0U2VjdGlvbiIsInJpZ2h0U2VjdGlvbiIsInRhYmxlIiwidGFibGVCb2R5IiwicGFyYSIsInBhcmFUd28iLCJzaGlwc0NvbnRhaW5lciIsImNhcnJpZXJCZXJ0aCIsImJhdHRsZXNoaXBCZXJ0aCIsImRlc3Ryb3llckJlcnRoIiwic3VibWFyaW5lQmVydGgiLCJwYXRyb2xCb2F0QmVydGgiLCJpZCIsImhlaWdodCIsIndpZHRoIiwiZHJhZ2dhYmxlIiwidGFibGVSb3ciLCJjZWxsIiwidXNlclNoaXBzIiwic29ydFNoaXBzQ29vcmRpbmF0ZXMiLCJhbGxTaGlwc1BsYWNlZCIsInBvcnQiLCJub2RlTGlzdCIsImNoaWxkTm9kZXMiLCJoYXNDaGlsZE5vZGVzIiwiY29sb3IiLCJpc0Ryb3BWYWxpZCIsImluZGV4WCIsImluZGV4WSIsInNoaXBIZWlnaHQiLCJzaGlwV2lkdGgiLCJjaGVja1RvcCIsImRyb3BTcXVhcmUiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwicGFyZW50U2libGluZyIsInByZXZpb3VzU2libGluZyIsInN0YXJ0SW5kZXgiLCJzcXVhcmVJbmRleCIsInNxdWFyZSIsInVuZGVmaW5lZCIsInNxdWFyZUNsYXNzIiwiaW5jbHVkZXMiLCJjaGVja1JpZ2h0IiwiZ3JhbmRQYXJlbnQiLCJwYXJlbnRMaXN0IiwiaW5kZXgiLCJjaGlsZHJlbiIsImxpc3QiLCJjaGVja0JvdHRvbSIsIm5leHRTaWJsaW5nIiwiY2hlY2tMZWZ0IiwidG9wVmFsaWQiLCJyaWdodFZhbGlkIiwiYm90dG9tVmFsaWQiLCJsZWZ0VmFsaWQiLCJzdGFydE1lbnVFdmVudEhhbmRsZXIiLCJyZXBsYWNlIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInN0ciIsImxldHRlciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwidGV4dCIsInByZXZlbnREZWZhdWx0IiwiZHJvcHpvbmUiLCJkcmFnZ2FibGVJZCIsImdldERhdGEiLCJkcmFnZ2FibGVFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzaGlwQ29vcmRpbmF0ZXMiLCJkcmFnZ2FibGVQYXJlbnQiLCJjbGVhckRhdGEiLCJjb21wb25lbnQiXSwic291cmNlUm9vdCI6IiJ9