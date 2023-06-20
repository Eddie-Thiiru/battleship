const Player = () => {
  let attackedPos = [];

  const isLegal = (pos) => {
    for (let i = 0; i < attackedPos.length; i++) {
      const element = array[i];

      if (element[0] === pos[0] && element[1] === pos[1]) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  const attack = (enemy) => {
    if (enemy === "player") {
      let x = Math.floor(Math.random() * 7);
      let y = Math.floor(Math.random() * 7);
      let pos = [x, y];
      let checkLegal = isLegal(pos);

      if (checkLegal === true) {
        attackedPos.push(pos);
        return pos;
      } else {
        attack("player");
      }
    } else {
      return [0, 0];
    }
  };

  return { attack };
};

export { Player };
