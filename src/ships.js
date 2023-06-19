const ships = {
  carrier: {
    length: 5,
    hits: 0,
    destroyed: false,
    coordinates: [
      [5, 1],
      [6, 1],
      [7, 1],
      [8, 1],
      [9, 1],
    ],
  },

  battleship: {
    length: 4,
    hits: 0,
    destroyed: false,
    coordinates: [
      [0, 8],
      [1, 8],
      [2, 8],
      [3, 8],
    ],
  },

  destroyer: {
    length: 3,
    hits: 0,
    destroyed: false,
    coordinates: [
      [5, 5],
      [5, 6],
      [5, 7],
    ],
  },

  submarine: {
    length: 3,
    hits: 0,
    destroyed: false,
    coordinates: [
      [1, 2],
      [1, 3],
      [1, 4],
    ],
  },

  patrolBoat: {
    length: 2,
    hits: 0,
    destroyed: false,
    coordinates: [
      [7, 8],
      [8, 8],
    ],
  },
};

const Ship = () => {
  const placeShips = (board) => {
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

  const isSunk = (ship) => {
    const shipLength = ship.length;
    const hitsCount = ship.hits;

    // check ship length and no of times its been hit
    return shipLength === hitsCount ? true : false;
  };

  const hit = (ship) => {
    ship.hits += 1;

    // After every hit, check if the ship is destroyed
    const checkShip = isSunk(ship);

    if (checkShip === true) {
      ship.destroyed = true;
    }
  };

  return { placeShips, hit };
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
    allShipsDestroyed,
  };
};

export { GameBoard };
