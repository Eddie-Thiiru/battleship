import { GameBoard } from "./game-board";
import { Player } from "./player";
import { renderBoards } from "./battleship";

const userGameBoard = GameBoard();
const computerGameBoard = GameBoard();

const Game = () => {
  // Create Player objects and GameBoard objects for each player
  const user = Player("user");
  const computer = Player("computer AI");

  // Create new boards for each player
  userGameBoard.createBoard();
  computerGameBoard.createBoard();

  // Populate boards with ships for each player
  userGameBoard.populateBoard();
  computerGameBoard.populateBoard();

  //  Get player names fromm Player objects
  const userName = user.getName();
  const computerName = computer.getName();

  //   Get player boards from GameBoard objects
  const userBoard = userGameBoard.getBoard();
  const computerBoard = computerGameBoard.getBoard();

  // Add player names and player boards to an array
  const players = [
    {
      name: userName,
      board: userBoard,
    },
    {
      name: computerName,
      board: computerBoard,
    },
  ];

  // Initial player boards render
  renderBoards().renderUserBoard(userBoard);
  renderBoards().renderComputerBoard(computerBoard);

  return { players };
};

const playRound = (enemy, pos) => {
  Player().attack(enemy, pos, computerGameBoard);

  const computerBoard = computerGameBoard.getBoard();

  // Update computer board on the screen
  renderBoards().renderComputerBoard(computerBoard);

  if (computerGameBoard.allShipsDestroyed() === true) {
    console.log("computer destroyed");
  }

  // Computer attacks the user 1 second after being attacked
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Player().attack("user", pos, userGameBoard));
    }, 500);
  }).then(() => {
    const userBoard = userGameBoard.getBoard();

    // Update user board on the screen
    renderBoards().renderUserBoard(userBoard);

    if (userGameBoard.allShipsDestroyed() === true) {
      console.log("user destroyed");
    }
  });
};

export { Game, playRound };
