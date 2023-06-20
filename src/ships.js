const PlayerShips = () => {
  let carrier = {
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
  };

  let battleship = {
    length: 4,
    hits: 0,
    destroyed: false,
    coordinates: [
      [0, 8],
      [1, 8],
      [2, 8],
      [3, 8],
    ],
  };

  let destroyer = {
    length: 3,
    hits: 0,
    destroyed: false,
    coordinates: [
      [5, 5],
      [5, 6],
      [5, 7],
    ],
  };

  let submarine = {
    length: 3,
    hits: 0,
    destroyed: false,
    coordinates: [
      [1, 2],
      [1, 3],
      [1, 4],
    ],
  };

  let patrolBoat = {
    length: 2,
    hits: 0,
    destroyed: false,
    coordinates: [
      [7, 8],
      [8, 8],
    ],
  };

  return { carrier, battleship, destroyer, submarine, patrolBoat };
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
