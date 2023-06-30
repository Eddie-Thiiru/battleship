let userAttacks = [];
let computerAttacks = [];

const Player = (name) => {
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

  return { getName, isAttackLegal, attack };
};

export { Player, userAttacks, computerAttacks };
