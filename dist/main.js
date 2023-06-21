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
/* harmony export */   pageLayout: () => (/* binding */ pageLayout),
/* harmony export */   renderBoards: () => (/* binding */ renderBoards),
/* harmony export */   userEventHandler: () => (/* binding */ userEventHandler)
/* harmony export */ });
/* harmony import */ var _game_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-controller */ "./src/game-controller.js");
/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/styles.css */ "./src/styles/styles.css");

// import { Player } from "./player";

const pageLayout = () => {
  const content = document.querySelector(".content");
  const header = document.createElement("div");
  const main = document.createElement("div");
  const footer = document.createElement("div");
  const title = document.createElement("h1");
  const containerOne = document.createElement("div");
  const containerTwo = document.createElement("div");
  const battlefieldOne = document.createElement("div");
  const battlefieldTwo = document.createElement("div");
  const battlefieldOneTitle = document.createElement("h4");
  const battlefieldTwoTitle = document.createElement("h4");
  const logoContainer = document.createElement("div");
  const logo = new Image();
  header.classList.add("header");
  main.classList.add("main-section");
  footer.classList.add("footer");
  title.classList.add("title");
  title.textContent = "Battleship";
  containerOne.classList.add("user-container");
  containerTwo.classList.add("computer-container");
  battlefieldOne.classList.add("user-battlefield");
  battlefieldTwo.classList.add("computer-battlefield");
  battlefieldOneTitle.textContent = "Player Board";
  battlefieldTwoTitle.textContent = "AI Board";
  logo.alt = "Submarine logo";
  logoContainer.appendChild(logo);
  header.appendChild(title);
  header.appendChild(logoContainer);
  containerOne.appendChild(battlefieldOne);
  containerTwo.appendChild(battlefieldTwo);
  containerOne.appendChild(battlefieldOneTitle);
  containerTwo.appendChild(battlefieldTwoTitle);
  main.appendChild(containerOne);
  main.appendChild(containerTwo);
  content.appendChild(header);
  content.appendChild(main);
  content.appendChild(footer);
};
const renderBoards = () => {
  const userBattlefield = document.querySelector(".user-battlefield");
  const computerBattlefield = document.querySelector(".computer-battlefield");
  // const players = GameController().players;

  // Render user game board
  const renderUserBoard = board => {
    // const user = players[0];
    // const userBoard = user.board;
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
    // const computer = players[1];
    // const computerBoard = computer.board;
    computerBattlefield.textContent = "";
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        const btn = document.createElement("button");
        const data = board[i][j];
        btn.classList.add("square");
        btn.type = "button";
        btn.dataset.pos = `${i},${j}`;

        /*     if (data === 1) {
        btn.classList.add("ship-square"); */

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
const userEventHandler = () => {
  const parent = document.querySelector(".computer-battlefield");
  parent.addEventListener("click", e => {
    let t = e.target.tagName;
    if (e.target.tagName === "BUTTON") {
      const square = e.target;
      const data = square.dataset.pos;
      const array = data.split(",");
      const pos = [parseInt(array[0]), parseInt(array[1])];
      (0,_game_controller__WEBPACK_IMPORTED_MODULE_0__.playRound)("computer AI", pos);
      // Player().attack("computer", pos);
      // renderBoards().renderComputerBoard();
    }
  });
  // const nodeList = parent.childNodes;

  // nodeList.forEach((square) => {
  //   square.addEventListener("click", () => {
  //     const data = square.dataset.pos;
  //     const array = data.split(",");
  //     const pos = [parseInt(array[0]), parseInt(array[1])];

  //     playRound("computer AI", pos);
  //     // Player().attack("computer", pos);
  //     // renderBoards().renderComputerBoard();
  //   });
  // });
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
  let ships = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.PlayerShips)();
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



const userGameBoard = (0,_game_board__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
const computerGameBoard = (0,_game_board__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
const Game = () => {
  // Create Player objects and GameBoard objects for each player
  const user = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)("user");
  const computer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)("computer AI");

  // Create new boards for each player
  userGameBoard.createBoard();
  computerGameBoard.createBoard();

  // Populate boards with ships for each player
  userGameBoard.populateBoard();
  computerGameBoard.populateBoard();

  //  Get player names fromm Player objects
  const userName = user.getName();
  const computerName = computer.getName();

  //   Get player boards from GameBoard objects
  const userBoard = userGameBoard.getBoard();
  const computerBoard = computerGameBoard.getBoard();

  // Add player names and player boards to an array
  const players = [{
    name: userName,
    board: userBoard
  }, {
    name: computerName,
    board: computerBoard
  }];

  // Initial player boards render
  (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderUserBoard(userBoard);
  (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderComputerBoard(computerBoard);
  return {
    players
  };
};
const playRound = (enemy, pos) => {
  (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)().attack(enemy, pos, computerGameBoard);
  const computerBoard = computerGameBoard.getBoard();

  // Update computer board on the screen
  (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderComputerBoard(computerBoard);
  if (computerGameBoard.allShipsDestroyed() === true) {
    console.log("computer destroyed");
  }

  // Computer attacks the user 1 second after being attacked
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve((0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)().attack("user", pos, userGameBoard));
    }, 500);
  }).then(() => {
    const userBoard = userGameBoard.getBoard();

    // Update user board on the screen
    (0,_battleship__WEBPACK_IMPORTED_MODULE_2__.renderBoards)().renderUserBoard(userBoard);
    if (userGameBoard.allShipsDestroyed() === true) {
      console.log("user destroyed");
    }
  });
};


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");

let playerAttackedPos = [];
let computerAttackedPos = [];
const Player = name => {
  const getName = () => name;
  const isAttackLegal = (enemy, pos) => {
    let array;
    if (enemy === "user") {
      array = playerAttackedPos;
    } else {
      array = computerAttackedPos;
    }
    while (array.length) {
      const element = array.shift();
      if (element[0] === pos[0] && element[1] === pos[1]) {
        return false;
      }
    }
    return true;
  };
  const attack = (enemy, pos, GameBoard) => {
    if (enemy === "user") {
      let x = Math.floor(Math.random() * 7);
      let y = Math.floor(Math.random() * 7);
      let pos = [x, y];
      let checkLegal = isAttackLegal(enemy, pos);
      if (checkLegal === true) {
        let board = GameBoard.getBoard();
        playerAttackedPos.push(enemy, pos);
        GameBoard.receiveAttack(pos, board);
      } else {
        attack("user");
      }
    } else {
      let checkLegal = isAttackLegal(enemy, pos);
      if (checkLegal === true) {
        let board = GameBoard.getBoard();
        computerAttackedPos.push(pos);
        GameBoard.receiveAttack(pos, board);
      } else {
        return;
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
  grid-template-rows: 150px 1fr 150px;
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
`, "",{"version":3,"sources":["webpack://./src/styles/styles.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,wBAAwB;AAC1B;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;;EAEE,aAAa;EACb,YAAY;EACZ,aAAa;EACb,sCAAsC;EACtC,mCAAmC;AACrC;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB","sourcesContent":["* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100vh;\n  font-size: 1rem;\n  background-color: bisque;\n}\n\n.content {\n  height: 100%;\n  width: 100%;\n  display: grid;\n  grid-template-rows: 150px 1fr 150px;\n}\n\n.main-section {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n\n.user-container,\n.computer-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.user-battlefield,\n.computer-battlefield {\n  height: 350px;\n  width: 350px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.square {\n  border: solid 1px grey;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.ship-square {\n  background-color: aquamarine;\n}\n\n.ship-missed {\n  background-color: grey;\n}\n\n.ship-hit {\n  background-color: red;\n}\n\n.square:hover {\n  background-color: green;\n}\n"],"sourceRoot":""}]);
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
/* harmony import */ var _game_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-controller */ "./src/game-controller.js");
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");



const component = () => {
  (0,_battleship__WEBPACK_IMPORTED_MODULE_1__.pageLayout)();
  (0,_game_controller__WEBPACK_IMPORTED_MODULE_0__.Game)();
  // renderBoards().renderUserBoard();
  // renderBoards().renderComputerBoard();

  // // Event handler that returns user attack choice
  (0,_battleship__WEBPACK_IMPORTED_MODULE_1__.userEventHandler)();
};
component();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c0RBQUksQ0FBQyxDQUFDO0VBQ047RUFDQTs7RUFFQTtFQUNBbkMsNkRBQWdCLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBQ0QyRSxTQUFTLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9iYXR0bGVzaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS1ib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlcy5jc3M/ZTQ1YiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGxheVJvdW5kIH0gZnJvbSBcIi4vZ2FtZS1jb250cm9sbGVyXCI7XG4vLyBpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0eWxlcy5jc3NcIjtcblxuY29uc3QgcGFnZUxheW91dCA9ICgpID0+IHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBjb25zdCBjb250YWluZXJPbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBjb250YWluZXJUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBiYXR0bGVmaWVsZE9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJhdHRsZWZpZWxkVHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRPbmVUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcbiAgY29uc3QgYmF0dGxlZmllbGRUd29UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcbiAgY29uc3QgbG9nb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGxvZ28gPSBuZXcgSW1hZ2UoKTtcblxuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcbiAgbWFpbi5jbGFzc0xpc3QuYWRkKFwibWFpbi1zZWN0aW9uXCIpO1xuICBmb290ZXIuY2xhc3NMaXN0LmFkZChcImZvb3RlclwiKTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICBjb250YWluZXJPbmUuY2xhc3NMaXN0LmFkZChcInVzZXItY29udGFpbmVyXCIpO1xuICBjb250YWluZXJUd28uY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyLWNvbnRhaW5lclwiKTtcbiAgYmF0dGxlZmllbGRPbmUuY2xhc3NMaXN0LmFkZChcInVzZXItYmF0dGxlZmllbGRcIik7XG4gIGJhdHRsZWZpZWxkVHdvLmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlci1iYXR0bGVmaWVsZFwiKTtcbiAgYmF0dGxlZmllbGRPbmVUaXRsZS50ZXh0Q29udGVudCA9IFwiUGxheWVyIEJvYXJkXCI7XG4gIGJhdHRsZWZpZWxkVHdvVGl0bGUudGV4dENvbnRlbnQgPSBcIkFJIEJvYXJkXCI7XG4gIGxvZ28uYWx0ID0gXCJTdWJtYXJpbmUgbG9nb1wiO1xuXG4gIGxvZ29Db250YWluZXIuYXBwZW5kQ2hpbGQobG9nbyk7XG4gIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChsb2dvQ29udGFpbmVyKTtcbiAgY29udGFpbmVyT25lLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkT25lKTtcbiAgY29udGFpbmVyVHdvLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkVHdvKTtcbiAgY29udGFpbmVyT25lLmFwcGVuZENoaWxkKGJhdHRsZWZpZWxkT25lVGl0bGUpO1xuICBjb250YWluZXJUd28uYXBwZW5kQ2hpbGQoYmF0dGxlZmllbGRUd29UaXRsZSk7XG4gIG1haW4uYXBwZW5kQ2hpbGQoY29udGFpbmVyT25lKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChjb250YWluZXJUd28pO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQobWFpbik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbn07XG5cbmNvbnN0IHJlbmRlckJvYXJkcyA9ICgpID0+IHtcbiAgY29uc3QgdXNlckJhdHRsZWZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWJhdHRsZWZpZWxkXCIpO1xuICBjb25zdCBjb21wdXRlckJhdHRsZWZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci1iYXR0bGVmaWVsZFwiKTtcbiAgLy8gY29uc3QgcGxheWVycyA9IEdhbWVDb250cm9sbGVyKCkucGxheWVycztcblxuICAvLyBSZW5kZXIgdXNlciBnYW1lIGJvYXJkXG4gIGNvbnN0IHJlbmRlclVzZXJCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgIC8vIGNvbnN0IHVzZXIgPSBwbGF5ZXJzWzBdO1xuICAgIC8vIGNvbnN0IHVzZXJCb2FyZCA9IHVzZXIuYm9hcmQ7XG4gICAgdXNlckJhdHRsZWZpZWxkLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGJvYXJkW2ldO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25zdCBkYXRhID0gYm9hcmRbaV1bal07XG5cbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICAgIGJ0bi50eXBlID0gXCJidXR0b25cIjtcbiAgICAgICAgYnRuLmRhdGFzZXQucG9zID0gYCR7aX0sJHtqfWA7XG5cbiAgICAgICAgaWYgKGRhdGEgPT09IDEpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtc3F1YXJlXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IDIpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtbWlzc2VkXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09IDMpIHtcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNoaXAtaGl0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXNlckJhdHRsZWZpZWxkLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlbmRlciBjb21wdXRlciBnYW1lIGJvYXJkXG4gIGNvbnN0IHJlbmRlckNvbXB1dGVyQm9hcmQgPSAoYm9hcmQpID0+IHtcbiAgICAvLyBjb25zdCBjb21wdXRlciA9IHBsYXllcnNbMV07XG4gICAgLy8gY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyLmJvYXJkO1xuICAgIGNvbXB1dGVyQmF0dGxlZmllbGQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gYm9hcmRbaV07XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBib2FyZFtpXVtqXTtcblxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgICAgYnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgICBidG4uZGF0YXNldC5wb3MgPSBgJHtpfSwke2p9YDtcblxuICAgICAgICAvKiAgICAgaWYgKGRhdGEgPT09IDEpIHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJzaGlwLXNxdWFyZVwiKTsgKi9cblxuICAgICAgICBpZiAoZGF0YSA9PT0gMikge1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic2hpcC1taXNzZWRcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gMykge1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwic2hpcC1oaXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb21wdXRlckJhdHRsZWZpZWxkLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZXR1cm4geyByZW5kZXJVc2VyQm9hcmQsIHJlbmRlckNvbXB1dGVyQm9hcmQgfTtcbn07XG5cbmNvbnN0IHVzZXJFdmVudEhhbmRsZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXItYmF0dGxlZmllbGRcIik7XG4gIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgdCA9IGUudGFyZ2V0LnRhZ05hbWU7XG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09IFwiQlVUVE9OXCIpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgZGF0YSA9IHNxdWFyZS5kYXRhc2V0LnBvcztcbiAgICAgIGNvbnN0IGFycmF5ID0gZGF0YS5zcGxpdChcIixcIik7XG4gICAgICBjb25zdCBwb3MgPSBbcGFyc2VJbnQoYXJyYXlbMF0pLCBwYXJzZUludChhcnJheVsxXSldO1xuXG4gICAgICBwbGF5Um91bmQoXCJjb21wdXRlciBBSVwiLCBwb3MpO1xuICAgICAgLy8gUGxheWVyKCkuYXR0YWNrKFwiY29tcHV0ZXJcIiwgcG9zKTtcbiAgICAgIC8vIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoKTtcbiAgICB9XG4gIH0pO1xuICAvLyBjb25zdCBub2RlTGlzdCA9IHBhcmVudC5jaGlsZE5vZGVzO1xuXG4gIC8vIG5vZGVMaXN0LmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAvLyAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAvLyAgICAgY29uc3QgZGF0YSA9IHNxdWFyZS5kYXRhc2V0LnBvcztcbiAgLy8gICAgIGNvbnN0IGFycmF5ID0gZGF0YS5zcGxpdChcIixcIik7XG4gIC8vICAgICBjb25zdCBwb3MgPSBbcGFyc2VJbnQoYXJyYXlbMF0pLCBwYXJzZUludChhcnJheVsxXSldO1xuXG4gIC8vICAgICBwbGF5Um91bmQoXCJjb21wdXRlciBBSVwiLCBwb3MpO1xuICAvLyAgICAgLy8gUGxheWVyKCkuYXR0YWNrKFwiY29tcHV0ZXJcIiwgcG9zKTtcbiAgLy8gICAgIC8vIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoKTtcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG59O1xuXG5leHBvcnQgeyBwYWdlTGF5b3V0LCByZW5kZXJCb2FyZHMsIHVzZXJFdmVudEhhbmRsZXIgfTtcbiIsImltcG9ydCB7IFBsYXllclNoaXBzLCBTaGlwIH0gZnJvbSBcIi4vc2hpcHNcIjtcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBsZXQgc2hpcHMgPSBQbGF5ZXJTaGlwcygpO1xuICBsZXQgYm9hcmQgPSBbXTtcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGJvYXJkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgYm9hcmRbaV1bal0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gIGNvbnN0IHBvcHVsYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgLy8gUGxhY2UgYWxsIHNoaXBzIG9udG8gdGhlIGJvYXJkXG4gICAgU2hpcCgpLnBsYWNlU2hpcHMoYm9hcmQsIHNoaXBzKTtcbiAgfTtcblxuICBjb25zdCBmaW5kQXR0YWNrZWRTaGlwID0gKHBvcykgPT4ge1xuICAgIGZvciAobGV0IGtleSBpbiBzaGlwcykge1xuICAgICAgY29uc3QgYXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpXTtcblxuICAgICAgICBpZiAoZWxlbWVudFswXSA9PT0gcG9zWzBdICYmIGVsZW1lbnRbMV0gPT09IHBvc1sxXSkge1xuICAgICAgICAgIHJldHVybiBzaGlwc1trZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocG9zKSA9PiB7XG4gICAgbGV0IHggPSBwb3NbMF07XG4gICAgbGV0IHkgPSBwb3NbMV07XG5cbiAgICBpZiAoYm9hcmRbeF1beV0gPT09IDEpIHtcbiAgICAgIGNvbnN0IGF0dGFja2VkU2hpcCA9IGZpbmRBdHRhY2tlZFNoaXAocG9zKTtcblxuICAgICAgLy8gTWFyayBib2FyZCBwb3NpdGlvbiBhcyBhdHRhY2tlZFxuICAgICAgYm9hcmRbeF1beV0gPSAzO1xuXG4gICAgICAvLyBBZGQgaGl0IGNvdW50IHRvIGF0dGFja2VkIHNoaXBcbiAgICAgIFNoaXAoKS5oaXQoYXR0YWNrZWRTaGlwKTtcbiAgICB9IGVsc2UgaWYgKGJvYXJkW3hdW3ldID09PSAwKSB7XG4gICAgICAvLyBNYXJrIGJvYXJkIHBvc2l0aW9uIGFzIGF0dGFja2VkXG4gICAgICBib2FyZFt4XVt5XSA9IDI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFsbFNoaXBzRGVzdHJveWVkID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGNvbnN0IHNoaXBTdGF0ZSA9IHNoaXBzW2tleV0uZGVzdHJveWVkO1xuXG4gICAgICBpZiAoc2hpcFN0YXRlID09PSB0cnVlKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvdW50ID09PSA1ID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlQm9hcmQsXG4gICAgZ2V0Qm9hcmQsXG4gICAgcG9wdWxhdGVCb2FyZCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFsbFNoaXBzRGVzdHJveWVkLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lLWJvYXJkXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHJlbmRlckJvYXJkcyB9IGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcblxuY29uc3QgdXNlckdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuY29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgLy8gQ3JlYXRlIFBsYXllciBvYmplY3RzIGFuZCBHYW1lQm9hcmQgb2JqZWN0cyBmb3IgZWFjaCBwbGF5ZXJcbiAgY29uc3QgdXNlciA9IFBsYXllcihcInVzZXJcIik7XG4gIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKFwiY29tcHV0ZXIgQUlcIik7XG5cbiAgLy8gQ3JlYXRlIG5ldyBib2FyZHMgZm9yIGVhY2ggcGxheWVyXG4gIHVzZXJHYW1lQm9hcmQuY3JlYXRlQm9hcmQoKTtcbiAgY29tcHV0ZXJHYW1lQm9hcmQuY3JlYXRlQm9hcmQoKTtcblxuICAvLyBQb3B1bGF0ZSBib2FyZHMgd2l0aCBzaGlwcyBmb3IgZWFjaCBwbGF5ZXJcbiAgdXNlckdhbWVCb2FyZC5wb3B1bGF0ZUJvYXJkKCk7XG4gIGNvbXB1dGVyR2FtZUJvYXJkLnBvcHVsYXRlQm9hcmQoKTtcblxuICAvLyAgR2V0IHBsYXllciBuYW1lcyBmcm9tbSBQbGF5ZXIgb2JqZWN0c1xuICBjb25zdCB1c2VyTmFtZSA9IHVzZXIuZ2V0TmFtZSgpO1xuICBjb25zdCBjb21wdXRlck5hbWUgPSBjb21wdXRlci5nZXROYW1lKCk7XG5cbiAgLy8gICBHZXQgcGxheWVyIGJvYXJkcyBmcm9tIEdhbWVCb2FyZCBvYmplY3RzXG4gIGNvbnN0IHVzZXJCb2FyZCA9IHVzZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyR2FtZUJvYXJkLmdldEJvYXJkKCk7XG5cbiAgLy8gQWRkIHBsYXllciBuYW1lcyBhbmQgcGxheWVyIGJvYXJkcyB0byBhbiBhcnJheVxuICBjb25zdCBwbGF5ZXJzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IHVzZXJOYW1lLFxuICAgICAgYm9hcmQ6IHVzZXJCb2FyZCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbXB1dGVyTmFtZSxcbiAgICAgIGJvYXJkOiBjb21wdXRlckJvYXJkLFxuICAgIH0sXG4gIF07XG5cbiAgLy8gSW5pdGlhbCBwbGF5ZXIgYm9hcmRzIHJlbmRlclxuICByZW5kZXJCb2FyZHMoKS5yZW5kZXJVc2VyQm9hcmQodXNlckJvYXJkKTtcbiAgcmVuZGVyQm9hcmRzKCkucmVuZGVyQ29tcHV0ZXJCb2FyZChjb21wdXRlckJvYXJkKTtcblxuICByZXR1cm4geyBwbGF5ZXJzIH07XG59O1xuXG5jb25zdCBwbGF5Um91bmQgPSAoZW5lbXksIHBvcykgPT4ge1xuICBQbGF5ZXIoKS5hdHRhY2soZW5lbXksIHBvcywgY29tcHV0ZXJHYW1lQm9hcmQpO1xuXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlckdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuXG4gIC8vIFVwZGF0ZSBjb21wdXRlciBib2FyZCBvbiB0aGUgc2NyZWVuXG4gIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoY29tcHV0ZXJCb2FyZCk7XG5cbiAgaWYgKGNvbXB1dGVyR2FtZUJvYXJkLmFsbFNoaXBzRGVzdHJveWVkKCkgPT09IHRydWUpIHtcbiAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVyIGRlc3Ryb3llZFwiKTtcbiAgfVxuXG4gIC8vIENvbXB1dGVyIGF0dGFja3MgdGhlIHVzZXIgMSBzZWNvbmQgYWZ0ZXIgYmVpbmcgYXR0YWNrZWRcbiAgY29uc3QgbXlQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVzb2x2ZShQbGF5ZXIoKS5hdHRhY2soXCJ1c2VyXCIsIHBvcywgdXNlckdhbWVCb2FyZCkpO1xuICAgIH0sIDUwMCk7XG4gIH0pLnRoZW4oKCkgPT4ge1xuICAgIGNvbnN0IHVzZXJCb2FyZCA9IHVzZXJHYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcblxuICAgIC8vIFVwZGF0ZSB1c2VyIGJvYXJkIG9uIHRoZSBzY3JlZW5cbiAgICByZW5kZXJCb2FyZHMoKS5yZW5kZXJVc2VyQm9hcmQodXNlckJvYXJkKTtcblxuICAgIGlmICh1c2VyR2FtZUJvYXJkLmFsbFNoaXBzRGVzdHJveWVkKCkgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwidXNlciBkZXN0cm95ZWRcIik7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCB7IEdhbWUsIHBsYXlSb3VuZCB9O1xuIiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZS1ib2FyZFwiO1xuXG5sZXQgcGxheWVyQXR0YWNrZWRQb3MgPSBbXTtcbmxldCBjb21wdXRlckF0dGFja2VkUG9zID0gW107XG5cbmNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuXG4gIGNvbnN0IGlzQXR0YWNrTGVnYWwgPSAoZW5lbXksIHBvcykgPT4ge1xuICAgIGxldCBhcnJheTtcblxuICAgIGlmIChlbmVteSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIGFycmF5ID0gcGxheWVyQXR0YWNrZWRQb3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFycmF5ID0gY29tcHV0ZXJBdHRhY2tlZFBvcztcbiAgICB9XG5cbiAgICB3aGlsZSAoYXJyYXkubGVuZ3RoKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXkuc2hpZnQoKTtcbiAgICAgIGlmIChlbGVtZW50WzBdID09PSBwb3NbMF0gJiYgZWxlbWVudFsxXSA9PT0gcG9zWzFdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGVuZW15LCBwb3MsIEdhbWVCb2FyZCkgPT4ge1xuICAgIGlmIChlbmVteSA9PT0gXCJ1c2VyXCIpIHtcbiAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNyk7XG4gICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpO1xuICAgICAgbGV0IHBvcyA9IFt4LCB5XTtcbiAgICAgIGxldCBjaGVja0xlZ2FsID0gaXNBdHRhY2tMZWdhbChlbmVteSwgcG9zKTtcblxuICAgICAgaWYgKGNoZWNrTGVnYWwgPT09IHRydWUpIHtcbiAgICAgICAgbGV0IGJvYXJkID0gR2FtZUJvYXJkLmdldEJvYXJkKCk7XG5cbiAgICAgICAgcGxheWVyQXR0YWNrZWRQb3MucHVzaChlbmVteSwgcG9zKTtcbiAgICAgICAgR2FtZUJvYXJkLnJlY2VpdmVBdHRhY2socG9zLCBib2FyZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdHRhY2soXCJ1c2VyXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hlY2tMZWdhbCA9IGlzQXR0YWNrTGVnYWwoZW5lbXksIHBvcyk7XG5cbiAgICAgIGlmIChjaGVja0xlZ2FsID09PSB0cnVlKSB7XG4gICAgICAgIGxldCBib2FyZCA9IEdhbWVCb2FyZC5nZXRCb2FyZCgpO1xuXG4gICAgICAgIGNvbXB1dGVyQXR0YWNrZWRQb3MucHVzaChwb3MpO1xuICAgICAgICBHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhwb3MsIGJvYXJkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0TmFtZSwgaXNBdHRhY2tMZWdhbCwgYXR0YWNrIH07XG59O1xuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImNvbnN0IFBsYXllclNoaXBzID0gKCkgPT4ge1xuICBsZXQgY2FycmllciA9IHtcbiAgICBsZW5ndGg6IDUsXG4gICAgaGl0czogMCxcbiAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgIGNvb3JkaW5hdGVzOiBbXG4gICAgICBbNSwgMV0sXG4gICAgICBbNiwgMV0sXG4gICAgICBbNywgMV0sXG4gICAgICBbOCwgMV0sXG4gICAgICBbOSwgMV0sXG4gICAgXSxcbiAgfTtcblxuICBsZXQgYmF0dGxlc2hpcCA9IHtcbiAgICBsZW5ndGg6IDQsXG4gICAgaGl0czogMCxcbiAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgIGNvb3JkaW5hdGVzOiBbXG4gICAgICBbMCwgOF0sXG4gICAgICBbMSwgOF0sXG4gICAgICBbMiwgOF0sXG4gICAgICBbMywgOF0sXG4gICAgXSxcbiAgfTtcblxuICBsZXQgZGVzdHJveWVyID0ge1xuICAgIGxlbmd0aDogMyxcbiAgICBoaXRzOiAwLFxuICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgY29vcmRpbmF0ZXM6IFtcbiAgICAgIFs1LCA1XSxcbiAgICAgIFs1LCA2XSxcbiAgICAgIFs1LCA3XSxcbiAgICBdLFxuICB9O1xuXG4gIGxldCBzdWJtYXJpbmUgPSB7XG4gICAgbGVuZ3RoOiAzLFxuICAgIGhpdHM6IDAsXG4gICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICBjb29yZGluYXRlczogW1xuICAgICAgWzEsIDJdLFxuICAgICAgWzEsIDNdLFxuICAgICAgWzEsIDRdLFxuICAgIF0sXG4gIH07XG5cbiAgbGV0IHBhdHJvbEJvYXQgPSB7XG4gICAgbGVuZ3RoOiAyLFxuICAgIGhpdHM6IDAsXG4gICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICBjb29yZGluYXRlczogW1xuICAgICAgWzcsIDhdLFxuICAgICAgWzgsIDhdLFxuICAgIF0sXG4gIH07XG5cbiAgcmV0dXJuIHsgY2FycmllciwgYmF0dGxlc2hpcCwgZGVzdHJveWVyLCBzdWJtYXJpbmUsIHBhdHJvbEJvYXQgfTtcbn07XG5cbmNvbnN0IFNoaXAgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYWNlU2hpcHMgPSAoYm9hcmQsIHNoaXBzKSA9PiB7XG4gICAgZm9yIChsZXQga2V5IGluIHNoaXBzKSB7XG4gICAgICBsZXQgYXJyYXkgPSBzaGlwc1trZXldLmNvb3JkaW5hdGVzO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpXTtcbiAgICAgICAgY29uc3QgeCA9IGVsZW1lbnRbMF07XG4gICAgICAgIGNvbnN0IHkgPSBlbGVtZW50WzFdO1xuXG4gICAgICAgIGJvYXJkW3hdW3ldID0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKHNoaXApID0+IHtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgY29uc3QgaGl0c0NvdW50ID0gc2hpcC5oaXRzO1xuXG4gICAgLy8gY2hlY2sgc2hpcCBsZW5ndGggYW5kIG5vIG9mIHRpbWVzIGl0cyBiZWVuIGhpdFxuICAgIHJldHVybiBzaGlwTGVuZ3RoID09PSBoaXRzQ291bnQgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgaGl0ID0gKHNoaXApID0+IHtcbiAgICBzaGlwLmhpdHMgKz0gMTtcblxuICAgIC8vIEFmdGVyIGV2ZXJ5IGhpdCwgY2hlY2sgaWYgdGhlIHNoaXAgaXMgZGVzdHJveWVkXG4gICAgY29uc3QgY2hlY2tTaGlwID0gaXNTdW5rKHNoaXApO1xuXG4gICAgaWYgKGNoZWNrU2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgc2hpcC5kZXN0cm95ZWQgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBwbGFjZVNoaXBzLCBoaXQgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllclNoaXBzLCBTaGlwIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuYm9keSB7XG4gIGhlaWdodDogMTAwdmg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xufVxuXG4uY29udGVudCB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTUwcHggMWZyIDE1MHB4O1xufVxuXG4ubWFpbi1zZWN0aW9uIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xufVxuXG4udXNlci1jb250YWluZXIsXG4uY29tcHV0ZXItY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMjBweDtcbn1cblxuLnVzZXItYmF0dGxlZmllbGQsXG4uY29tcHV0ZXItYmF0dGxlZmllbGQge1xuICBoZWlnaHQ6IDM1MHB4O1xuICB3aWR0aDogMzUwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLnNxdWFyZSB7XG4gIGJvcmRlcjogc29saWQgMXB4IGdyZXk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc2hpcC1zcXVhcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhbWFyaW5lO1xufVxuXG4uc2hpcC1taXNzZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufVxuXG4uc2hpcC1oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5zcXVhcmU6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7QUFDaEM7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcXG59XFxuXFxuLmNvbnRlbnQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxNTBweCAxZnIgMTUwcHg7XFxufVxcblxcbi5tYWluLXNlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG59XFxuXFxuLnVzZXItY29udGFpbmVyLFxcbi5jb21wdXRlci1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi51c2VyLWJhdHRsZWZpZWxkLFxcbi5jb21wdXRlci1iYXR0bGVmaWVsZCB7XFxuICBoZWlnaHQ6IDM1MHB4O1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5zcXVhcmUge1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggZ3JleTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zaGlwLXNxdWFyZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhbWFyaW5lO1xcbn1cXG5cXG4uc2hpcC1taXNzZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLnNoaXAtaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLnNxdWFyZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWUtY29udHJvbGxlclwiO1xuaW1wb3J0IHsgcGFnZUxheW91dCwgcmVuZGVyQm9hcmRzIH0gZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuaW1wb3J0IHsgdXNlckV2ZW50SGFuZGxlciB9IGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcblxuY29uc3QgY29tcG9uZW50ID0gKCkgPT4ge1xuICBwYWdlTGF5b3V0KCk7XG4gIEdhbWUoKTtcbiAgLy8gcmVuZGVyQm9hcmRzKCkucmVuZGVyVXNlckJvYXJkKCk7XG4gIC8vIHJlbmRlckJvYXJkcygpLnJlbmRlckNvbXB1dGVyQm9hcmQoKTtcblxuICAvLyAvLyBFdmVudCBoYW5kbGVyIHRoYXQgcmV0dXJucyB1c2VyIGF0dGFjayBjaG9pY2VcbiAgdXNlckV2ZW50SGFuZGxlcigpO1xufTtcbmNvbXBvbmVudCgpO1xuIl0sIm5hbWVzIjpbInBsYXlSb3VuZCIsInBhZ2VMYXlvdXQiLCJjb250ZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaGVhZGVyIiwiY3JlYXRlRWxlbWVudCIsIm1haW4iLCJmb290ZXIiLCJ0aXRsZSIsImNvbnRhaW5lck9uZSIsImNvbnRhaW5lclR3byIsImJhdHRsZWZpZWxkT25lIiwiYmF0dGxlZmllbGRUd28iLCJiYXR0bGVmaWVsZE9uZVRpdGxlIiwiYmF0dGxlZmllbGRUd29UaXRsZSIsImxvZ29Db250YWluZXIiLCJsb2dvIiwiSW1hZ2UiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0ZXh0Q29udGVudCIsImFsdCIsImFwcGVuZENoaWxkIiwicmVuZGVyQm9hcmRzIiwidXNlckJhdHRsZWZpZWxkIiwiY29tcHV0ZXJCYXR0bGVmaWVsZCIsInJlbmRlclVzZXJCb2FyZCIsImJvYXJkIiwiaSIsImxlbmd0aCIsInJvdyIsImoiLCJidG4iLCJkYXRhIiwidHlwZSIsImRhdGFzZXQiLCJwb3MiLCJyZW5kZXJDb21wdXRlckJvYXJkIiwidXNlckV2ZW50SGFuZGxlciIsInBhcmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidCIsInRhcmdldCIsInRhZ05hbWUiLCJzcXVhcmUiLCJhcnJheSIsInNwbGl0IiwicGFyc2VJbnQiLCJQbGF5ZXJTaGlwcyIsIlNoaXAiLCJHYW1lQm9hcmQiLCJzaGlwcyIsImNyZWF0ZUJvYXJkIiwiZ2V0Qm9hcmQiLCJwb3B1bGF0ZUJvYXJkIiwicGxhY2VTaGlwcyIsImZpbmRBdHRhY2tlZFNoaXAiLCJrZXkiLCJjb29yZGluYXRlcyIsImVsZW1lbnQiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJhdHRhY2tlZFNoaXAiLCJoaXQiLCJhbGxTaGlwc0Rlc3Ryb3llZCIsImNvdW50Iiwic2hpcFN0YXRlIiwiZGVzdHJveWVkIiwiUGxheWVyIiwidXNlckdhbWVCb2FyZCIsImNvbXB1dGVyR2FtZUJvYXJkIiwiR2FtZSIsInVzZXIiLCJjb21wdXRlciIsInVzZXJOYW1lIiwiZ2V0TmFtZSIsImNvbXB1dGVyTmFtZSIsInVzZXJCb2FyZCIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJzIiwibmFtZSIsImVuZW15IiwiYXR0YWNrIiwiY29uc29sZSIsImxvZyIsIm15UHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInRoZW4iLCJwbGF5ZXJBdHRhY2tlZFBvcyIsImNvbXB1dGVyQXR0YWNrZWRQb3MiLCJpc0F0dGFja0xlZ2FsIiwic2hpZnQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjaGVja0xlZ2FsIiwicHVzaCIsImNhcnJpZXIiLCJoaXRzIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJpc1N1bmsiLCJzaGlwIiwic2hpcExlbmd0aCIsImhpdHNDb3VudCIsImNoZWNrU2hpcCIsImNvbXBvbmVudCJdLCJzb3VyY2VSb290IjoiIn0=