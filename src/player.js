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

  return { getName, isAttackLegal, attack };
};

export { Player };
