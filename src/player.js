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

  return { getName, isAttackLegal, attack };
};

export { Player, userAttacks, computerAttacks };
