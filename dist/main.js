/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameBoard: () => (/* binding */ GameBoard)
/* harmony export */ });
const ships = {
  carrier: {
    length: 5,
    hits: 0,
    destroyed: false,
    coordinates: [[5, 1], [6, 1], [7, 1], [8, 1], [9, 1]]
  },
  battleship: {
    length: 4,
    hits: 0,
    destroyed: false,
    coordinates: [[0, 8], [1, 8], [2, 8], [3, 8]]
  },
  destroyer: {
    length: 3,
    hits: 0,
    destroyed: false,
    coordinates: [[5, 5], [5, 6], [5, 7]]
  },
  submarine: {
    length: 3,
    hits: 0,
    destroyed: false,
    coordinates: [[1, 2], [1, 3], [1, 4]]
  },
  patrolBoat: {
    length: 2,
    hits: 0,
    destroyed: false,
    coordinates: [[7, 8], [8, 8]]
  }
};
const Ship = () => {
  const placeShips = board => {
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
  const placeShips = () => {
    // Place all ships onto the board
    Ship().placeShips(board);
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
      Ship().hit(attackedShip);
      return "ship hit";
    } else if (board[x][y] === 0) {
      // Mark board position as attacked
      board[x][y] = 2;
      return "missed";
    } else {
      return "This square already hit";
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
    placeShips,
    receiveAttack,
    allShipsDestroyed
  };
};


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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/ships.js");

const component = () => {
  (0,_ships__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
};
component();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU1BLEtBQUssR0FBRztFQUNaQyxPQUFPLEVBQUU7SUFDUEMsTUFBTSxFQUFFLENBQUM7SUFDVEMsSUFBSSxFQUFFLENBQUM7SUFDUEMsU0FBUyxFQUFFLEtBQUs7SUFDaEJDLFdBQVcsRUFBRSxDQUNYLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUVWLENBQUM7RUFFREMsVUFBVSxFQUFFO0lBQ1ZKLE1BQU0sRUFBRSxDQUFDO0lBQ1RDLElBQUksRUFBRSxDQUFDO0lBQ1BDLFNBQVMsRUFBRSxLQUFLO0lBQ2hCQyxXQUFXLEVBQUUsQ0FDWCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFFVixDQUFDO0VBRURFLFNBQVMsRUFBRTtJQUNUTCxNQUFNLEVBQUUsQ0FBQztJQUNUQyxJQUFJLEVBQUUsQ0FBQztJQUNQQyxTQUFTLEVBQUUsS0FBSztJQUNoQkMsV0FBVyxFQUFFLENBQ1gsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBRVYsQ0FBQztFQUVERyxTQUFTLEVBQUU7SUFDVE4sTUFBTSxFQUFFLENBQUM7SUFDVEMsSUFBSSxFQUFFLENBQUM7SUFDUEMsU0FBUyxFQUFFLEtBQUs7SUFDaEJDLFdBQVcsRUFBRSxDQUNYLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUVWLENBQUM7RUFFREksVUFBVSxFQUFFO0lBQ1ZQLE1BQU0sRUFBRSxDQUFDO0lBQ1RDLElBQUksRUFBRSxDQUFDO0lBQ1BDLFNBQVMsRUFBRSxLQUFLO0lBQ2hCQyxXQUFXLEVBQUUsQ0FDWCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFFVjtBQUNGLENBQUM7QUFFRCxNQUFNSyxJQUFJLEdBQUdBLENBQUEsS0FBTTtFQUNqQixNQUFNQyxVQUFVLEdBQUlDLEtBQUssSUFBSztJQUM1QixLQUFLLElBQUlDLEdBQUcsSUFBSWIsS0FBSyxFQUFFO01BQ3JCLElBQUljLEtBQUssR0FBR2QsS0FBSyxDQUFDYSxHQUFHLENBQUMsQ0FBQ1IsV0FBVztNQUVsQyxLQUFLLElBQUlVLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0QsS0FBSyxDQUFDWixNQUFNLEVBQUVhLENBQUMsRUFBRSxFQUFFO1FBQ3JDLE1BQU1DLE9BQU8sR0FBR0YsS0FBSyxDQUFDQyxDQUFDLENBQUM7UUFDeEIsTUFBTUUsQ0FBQyxHQUFHRCxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU1FLENBQUMsR0FBR0YsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVwQkosS0FBSyxDQUFDSyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQztNQUNqQjtJQUNGO0VBQ0YsQ0FBQztFQUVELE1BQU1DLE1BQU0sR0FBSUMsSUFBSSxJQUFLO0lBQ3ZCLE1BQU1DLFVBQVUsR0FBR0QsSUFBSSxDQUFDbEIsTUFBTTtJQUM5QixNQUFNb0IsU0FBUyxHQUFHRixJQUFJLENBQUNqQixJQUFJOztJQUUzQjtJQUNBLE9BQU9rQixVQUFVLEtBQUtDLFNBQVMsR0FBRyxJQUFJLEdBQUcsS0FBSztFQUNoRCxDQUFDO0VBRUQsTUFBTUMsR0FBRyxHQUFJSCxJQUFJLElBQUs7SUFDcEJBLElBQUksQ0FBQ2pCLElBQUksSUFBSSxDQUFDOztJQUVkO0lBQ0EsTUFBTXFCLFNBQVMsR0FBR0wsTUFBTSxDQUFDQyxJQUFJLENBQUM7SUFFOUIsSUFBSUksU0FBUyxLQUFLLElBQUksRUFBRTtNQUN0QkosSUFBSSxDQUFDaEIsU0FBUyxHQUFHLElBQUk7SUFDdkI7RUFDRixDQUFDO0VBRUQsT0FBTztJQUFFTyxVQUFVO0lBQUVZO0VBQUksQ0FBQztBQUM1QixDQUFDO0FBRUQsTUFBTUUsU0FBUyxHQUFHQSxDQUFBLEtBQU07RUFDdEIsSUFBSWIsS0FBSyxHQUFHLEVBQUU7RUFFZCxNQUFNYyxXQUFXLEdBQUdBLENBQUEsS0FBTTtJQUN4QixLQUFLLElBQUlYLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO01BQzNCSCxLQUFLLENBQUNHLENBQUMsQ0FBQyxHQUFHLEVBQUU7TUFDYixLQUFLLElBQUlZLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO1FBQzNCZixLQUFLLENBQUNHLENBQUMsQ0FBQyxDQUFDWSxDQUFDLENBQUMsR0FBRyxDQUFDO01BQ2pCO0lBQ0Y7RUFDRixDQUFDO0VBRUQsTUFBTUMsUUFBUSxHQUFHQSxDQUFBLEtBQU1oQixLQUFLO0VBRTVCLE1BQU1ELFVBQVUsR0FBR0EsQ0FBQSxLQUFNO0lBQ3ZCO0lBQ0FELElBQUksQ0FBQyxDQUFDLENBQUNDLFVBQVUsQ0FBQ0MsS0FBSyxDQUFDO0VBQzFCLENBQUM7RUFFRCxNQUFNaUIsZ0JBQWdCLEdBQUlDLEdBQUcsSUFBSztJQUNoQyxLQUFLLElBQUlqQixHQUFHLElBQUliLEtBQUssRUFBRTtNQUNyQixNQUFNYyxLQUFLLEdBQUdkLEtBQUssQ0FBQ2EsR0FBRyxDQUFDLENBQUNSLFdBQVc7TUFFcEMsS0FBSyxJQUFJVSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdELEtBQUssQ0FBQ1osTUFBTSxFQUFFYSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxNQUFNQyxPQUFPLEdBQUdGLEtBQUssQ0FBQ0MsQ0FBQyxDQUFDO1FBRXhCLElBQUlDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBS2MsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJZCxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUtjLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtVQUNsRCxPQUFPOUIsS0FBSyxDQUFDYSxHQUFHLENBQUM7UUFDbkI7TUFDRjtJQUNGO0VBQ0YsQ0FBQztFQUVELE1BQU1rQixhQUFhLEdBQUlELEdBQUcsSUFBSztJQUM3QixJQUFJYixDQUFDLEdBQUdhLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDZCxJQUFJWixDQUFDLEdBQUdZLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFZCxJQUFJbEIsS0FBSyxDQUFDSyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO01BQ3JCLE1BQU1jLFlBQVksR0FBR0gsZ0JBQWdCLENBQUNDLEdBQUcsQ0FBQzs7TUFFMUM7TUFDQWxCLEtBQUssQ0FBQ0ssQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxHQUFHLENBQUM7O01BRWY7TUFDQVIsSUFBSSxDQUFDLENBQUMsQ0FBQ2EsR0FBRyxDQUFDUyxZQUFZLENBQUM7TUFFeEIsT0FBTyxVQUFVO0lBQ25CLENBQUMsTUFBTSxJQUFJcEIsS0FBSyxDQUFDSyxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO01BQzVCO01BQ0FOLEtBQUssQ0FBQ0ssQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxHQUFHLENBQUM7TUFFZixPQUFPLFFBQVE7SUFDakIsQ0FBQyxNQUFNO01BQ0wsT0FBTyx5QkFBeUI7SUFDbEM7RUFDRixDQUFDO0VBRUQsTUFBTWUsaUJBQWlCLEdBQUdBLENBQUEsS0FBTTtJQUM5QixJQUFJQyxLQUFLLEdBQUcsQ0FBQztJQUViLEtBQUssSUFBSXJCLEdBQUcsSUFBSWIsS0FBSyxFQUFFO01BQ3JCLE1BQU1tQyxTQUFTLEdBQUduQyxLQUFLLENBQUNhLEdBQUcsQ0FBQyxDQUFDVCxTQUFTO01BRXRDLElBQUkrQixTQUFTLEtBQUssSUFBSSxFQUFFO1FBQ3RCRCxLQUFLLElBQUksQ0FBQztNQUNaO0lBQ0Y7SUFFQSxPQUFPQSxLQUFLLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLO0VBQ25DLENBQUM7RUFFRCxPQUFPO0lBQ0xSLFdBQVc7SUFDWEUsUUFBUTtJQUNSakIsVUFBVTtJQUNWb0IsYUFBYTtJQUNiRTtFQUNGLENBQUM7QUFDSCxDQUFDOzs7Ozs7O1VDOUtEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOb0M7QUFFcEMsTUFBTUcsU0FBUyxHQUFHQSxDQUFBLEtBQU07RUFDdEJYLGlEQUFTLENBQUMsQ0FBQztBQUNiLENBQUM7QUFDRFcsU0FBUyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2hpcHMgPSB7XG4gIGNhcnJpZXI6IHtcbiAgICBsZW5ndGg6IDUsXG4gICAgaGl0czogMCxcbiAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuICAgIGNvb3JkaW5hdGVzOiBbXG4gICAgICBbNSwgMV0sXG4gICAgICBbNiwgMV0sXG4gICAgICBbNywgMV0sXG4gICAgICBbOCwgMV0sXG4gICAgICBbOSwgMV0sXG4gICAgXSxcbiAgfSxcblxuICBiYXR0bGVzaGlwOiB7XG4gICAgbGVuZ3RoOiA0LFxuICAgIGhpdHM6IDAsXG4gICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICBjb29yZGluYXRlczogW1xuICAgICAgWzAsIDhdLFxuICAgICAgWzEsIDhdLFxuICAgICAgWzIsIDhdLFxuICAgICAgWzMsIDhdLFxuICAgIF0sXG4gIH0sXG5cbiAgZGVzdHJveWVyOiB7XG4gICAgbGVuZ3RoOiAzLFxuICAgIGhpdHM6IDAsXG4gICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICBjb29yZGluYXRlczogW1xuICAgICAgWzUsIDVdLFxuICAgICAgWzUsIDZdLFxuICAgICAgWzUsIDddLFxuICAgIF0sXG4gIH0sXG5cbiAgc3VibWFyaW5lOiB7XG4gICAgbGVuZ3RoOiAzLFxuICAgIGhpdHM6IDAsXG4gICAgZGVzdHJveWVkOiBmYWxzZSxcbiAgICBjb29yZGluYXRlczogW1xuICAgICAgWzEsIDJdLFxuICAgICAgWzEsIDNdLFxuICAgICAgWzEsIDRdLFxuICAgIF0sXG4gIH0sXG5cbiAgcGF0cm9sQm9hdDoge1xuICAgIGxlbmd0aDogMixcbiAgICBoaXRzOiAwLFxuICAgIGRlc3Ryb3llZDogZmFsc2UsXG4gICAgY29vcmRpbmF0ZXM6IFtcbiAgICAgIFs3LCA4XSxcbiAgICAgIFs4LCA4XSxcbiAgICBdLFxuICB9LFxufTtcblxuY29uc3QgU2hpcCA9ICgpID0+IHtcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChib2FyZCkgPT4ge1xuICAgIGZvciAobGV0IGtleSBpbiBzaGlwcykge1xuICAgICAgbGV0IGFycmF5ID0gc2hpcHNba2V5XS5jb29yZGluYXRlcztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaV07XG4gICAgICAgIGNvbnN0IHggPSBlbGVtZW50WzBdO1xuICAgICAgICBjb25zdCB5ID0gZWxlbWVudFsxXTtcblxuICAgICAgICBib2FyZFt4XVt5XSA9IDE7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IChzaGlwKSA9PiB7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgIGNvbnN0IGhpdHNDb3VudCA9IHNoaXAuaGl0cztcblxuICAgIC8vIGNoZWNrIHNoaXAgbGVuZ3RoIGFuZCBubyBvZiB0aW1lcyBpdHMgYmVlbiBoaXRcbiAgICByZXR1cm4gc2hpcExlbmd0aCA9PT0gaGl0c0NvdW50ID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGhpdCA9IChzaGlwKSA9PiB7XG4gICAgc2hpcC5oaXRzICs9IDE7XG5cbiAgICAvLyBBZnRlciBldmVyeSBoaXQsIGNoZWNrIGlmIHRoZSBzaGlwIGlzIGRlc3Ryb3llZFxuICAgIGNvbnN0IGNoZWNrU2hpcCA9IGlzU3VuayhzaGlwKTtcblxuICAgIGlmIChjaGVja1NoaXAgPT09IHRydWUpIHtcbiAgICAgIHNoaXAuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgcGxhY2VTaGlwcywgaGl0IH07XG59O1xuXG5jb25zdCBHYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGxldCBib2FyZCA9IFtdO1xuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBib2FyZFtpXVtqXSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgcGxhY2VTaGlwcyA9ICgpID0+IHtcbiAgICAvLyBQbGFjZSBhbGwgc2hpcHMgb250byB0aGUgYm9hcmRcbiAgICBTaGlwKCkucGxhY2VTaGlwcyhib2FyZCk7XG4gIH07XG5cbiAgY29uc3QgZmluZEF0dGFja2VkU2hpcCA9IChwb3MpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gc2hpcHMpIHtcbiAgICAgIGNvbnN0IGFycmF5ID0gc2hpcHNba2V5XS5jb29yZGluYXRlcztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaV07XG5cbiAgICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHBvc1swXSAmJiBlbGVtZW50WzFdID09PSBwb3NbMV0pIHtcbiAgICAgICAgICByZXR1cm4gc2hpcHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHBvcykgPT4ge1xuICAgIGxldCB4ID0gcG9zWzBdO1xuICAgIGxldCB5ID0gcG9zWzFdO1xuXG4gICAgaWYgKGJvYXJkW3hdW3ldID09PSAxKSB7XG4gICAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSBmaW5kQXR0YWNrZWRTaGlwKHBvcyk7XG5cbiAgICAgIC8vIE1hcmsgYm9hcmQgcG9zaXRpb24gYXMgYXR0YWNrZWRcbiAgICAgIGJvYXJkW3hdW3ldID0gMztcblxuICAgICAgLy8gQWRkIGhpdCBjb3VudCB0byBhdHRhY2tlZCBzaGlwXG4gICAgICBTaGlwKCkuaGl0KGF0dGFja2VkU2hpcCk7XG5cbiAgICAgIHJldHVybiBcInNoaXAgaGl0XCI7XG4gICAgfSBlbHNlIGlmIChib2FyZFt4XVt5XSA9PT0gMCkge1xuICAgICAgLy8gTWFyayBib2FyZCBwb3NpdGlvbiBhcyBhdHRhY2tlZFxuICAgICAgYm9hcmRbeF1beV0gPSAyO1xuXG4gICAgICByZXR1cm4gXCJtaXNzZWRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiVGhpcyBzcXVhcmUgYWxyZWFkeSBoaXRcIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWxsU2hpcHNEZXN0cm95ZWQgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcblxuICAgIGZvciAobGV0IGtleSBpbiBzaGlwcykge1xuICAgICAgY29uc3Qgc2hpcFN0YXRlID0gc2hpcHNba2V5XS5kZXN0cm95ZWQ7XG5cbiAgICAgIGlmIChzaGlwU3RhdGUgPT09IHRydWUpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY291bnQgPT09IDUgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVCb2FyZCxcbiAgICBnZXRCb2FyZCxcbiAgICBwbGFjZVNoaXBzLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU2hpcHNEZXN0cm95ZWQsXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lQm9hcmQgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSBcIi4vc2hpcHNcIjtcblxuY29uc3QgY29tcG9uZW50ID0gKCkgPT4ge1xuICBHYW1lQm9hcmQoKTtcbn07XG5jb21wb25lbnQoKTtcbiJdLCJuYW1lcyI6WyJzaGlwcyIsImNhcnJpZXIiLCJsZW5ndGgiLCJoaXRzIiwiZGVzdHJveWVkIiwiY29vcmRpbmF0ZXMiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsIlNoaXAiLCJwbGFjZVNoaXBzIiwiYm9hcmQiLCJrZXkiLCJhcnJheSIsImkiLCJlbGVtZW50IiwieCIsInkiLCJpc1N1bmsiLCJzaGlwIiwic2hpcExlbmd0aCIsImhpdHNDb3VudCIsImhpdCIsImNoZWNrU2hpcCIsIkdhbWVCb2FyZCIsImNyZWF0ZUJvYXJkIiwiaiIsImdldEJvYXJkIiwiZmluZEF0dGFja2VkU2hpcCIsInBvcyIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tlZFNoaXAiLCJhbGxTaGlwc0Rlc3Ryb3llZCIsImNvdW50Iiwic2hpcFN0YXRlIiwiY29tcG9uZW50Il0sInNvdXJjZVJvb3QiOiIifQ==