const PlayerShips = () => {
  let ships = {
    carrier: {
      length: 5,
      hits: 0,
      destroyed: false,
      coordinates: [],
    },

    battleship: {
      length: 4,
      hits: 0,
      destroyed: false,
      coordinates: [],
    },

    destroyer: {
      length: 3,
      hits: 0,
      destroyed: false,
      coordinates: [],
    },

    submarine: {
      length: 3,
      hits: 0,
      destroyed: false,
      coordinates: [],
    },

    patrolBoat: {
      length: 2,
      hits: 0,
      destroyed: false,
      coordinates: [],
    },
  };
  const getShips = () => ships;

  const addShipCoordinates = (array) => {
    let copy = array.slice();

    for (let key in ships) {
      let shipArray = ships[key].coordinates;
      let arr = copy.shift();

      for (let i = 0; i < arr.length; i++) {
        shipArray.push(arr[i]);
      }
    }
  };

  return { getShips, addShipCoordinates };
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

export { PlayerShips, Ship };
