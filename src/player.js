let playerAttackedPos = [];
let computerAttackedPos = [];

const Player = (name) => {
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

  const attack = (enemy) => {
    if (enemy === "user") {
      let x = Math.floor(Math.random() * 7);
      let y = Math.floor(Math.random() * 7);
      let pos = [x, y];
      let checkLegal = isAttackLegal(pos);

      if (checkLegal === true) {
        playerAttackedPos.push(enemy, pos);
        return pos;
      } else {
        attack("user");
      }
    } else {
      let pos = [0, 0];
      let checkLegal = isAttackLegal(enemy, pos);

      if (checkLegal === true) {
        computerAttackedPos.push(pos);
        return pos;
      }
      return null;
    }
  };

  return { getName, isAttackLegal, attack };
};

export { Player };
