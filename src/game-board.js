import { PlayerShips, Ship } from "./ships";

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

  const ships = PlayerShips();

  const populateBoard = () => {
    // Place all ships onto the board
    Ship().placeShips(board, ships);
  };

  const findAttackedShip = (pos) => {
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

  const receiveAttack = (pos) => {
    let x = pos[0];
    let y = pos[1];

    if (board[x][y] === 1) {
      const attackedShip = findAttackedShip(pos);

      // Mark board position as attacked
      board[x][y] = 3;

      // Add hit count to attacked ship
      Ship().hit(attackedShip);
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
    allShipsDestroyed,
  };
};

export { GameBoard };
