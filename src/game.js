import { GameBoard } from "./game-board";
import { Player } from "./player";
import { renderBoards, gameWinner } from "./battleship";

let userGameBoard;
let computerGameBoard;
let user;
let computer;

const Game = () => {
  // Create Player objects and GameBoard objects for each player
  user = Player("user");
  computer = Player("computer AI");

  userGameBoard = GameBoard();
  computerGameBoard = GameBoard();

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

  // Initial player boards are rendered
  renderBoards().renderUserBoard(userBoard);
  renderBoards().renderComputerBoard(computerBoard);

  return { players };
};

const playRound = (pos) => {
  let userAttacks = user.attack(computer, computerGameBoard, pos);

  if (userAttacks === false) {
    return;
  } else {
    // Update computer board on the screen
    const computerBoard = computerGameBoard.getBoard();
    renderBoards().renderComputerBoard(computerBoard);

    // Check if all computer ships are destroyed
    if (computerGameBoard.allShipsDestroyed() === true) {
      gameWinner("You Win!");
      return;
    }

    // Computer attacks the user 200 seconds after being attacked
    const myPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(computer.attack(user, userGameBoard, pos));
      }, 200);
    }).then(() => {
      // Update user board on the screen
      const userBoard = userGameBoard.getBoard();
      renderBoards().renderUserBoard(userBoard);

      // Check if all user ships are destroyed
      if (userGameBoard.allShipsDestroyed() === true) {
        gameWinner("Computer Wins!");
        return;
      }
    });
  }
};

export { Game, playRound };
