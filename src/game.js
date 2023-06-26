import { GameBoard } from "./game-board";
import { Player } from "./player";
import { PlayerShips } from "./ships";
import { renderBoards, gameWinner, gameMenuEventHandler } from "./battleship";
import { userShipsCoordinates, computerShipCoordinates } from "./start-menu";

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

  // Populate player boards with ships
  userGameBoard.populateBoard(userShipsCoordinates);
  computerGameBoard.populateBoard(computerShipCoordinates);

  //   Get player boards from GameBoard objects
  const userBoard = userGameBoard.getBoard();
  const computerBoard = computerGameBoard.getBoard();

  // Initial player boards are rendered
  renderBoards().renderUserBoard(userBoard);
  renderBoards().renderComputerBoard(computerBoard);

  // Initialize event handler
  gameMenuEventHandler();
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

    // // Computer attacks the user 200 seconds after being attacked
    // const myPromise = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(computer.attack(user, userGameBoard, pos));
    //   }, 200);
    // }).then(() => {
    computer.attack(user, userGameBoard, pos);
    // Update user board on the screen
    const userBoard = userGameBoard.getBoard();
    renderBoards().renderUserBoard(userBoard);

    // Check if all user ships are destroyed
    if (userGameBoard.allShipsDestroyed() === true) {
      gameWinner("Computer Wins!");
      return;
    }
    // });
  }
};

export { Game, playRound };

// // Create Player objects and GameBoard objects for each player
// user = Player("user");
// computer = Player("computer AI");

// userGameBoard = GameBoard();
// computerGameBoard = GameBoard();

// // Create new boards for each player
// userGameBoard.createBoard();
// computerGameBoard.createBoard();

// // Add ship coordinates and populate user board with ships
// const userPlayerShips = PlayerShips();
// const computerPlayerShips = PlayerShips();

// userPlayerShips.addShipCoordinates(userShipsCoordinates);
// computerPlayerShips.addShipCoordinates(computerShipCoordinates);

// const userShips = userPlayerShips.getShips();
// const computerShips = computerPlayerShips.getShips();

// userGameBoard.populateBoard(userShips);
// computerGameBoard.populateBoard(computerShips);
// // userGameBoard.populateBoard();

// // // Update ship coordinates and populate computer board with ships
// // Ship.updateShipCoordinates(computerShipCoordinates);
// // computerGameBoard.populateBoard();

// //   Get player boards from GameBoard objects
// const userBoard = userGameBoard.getBoard();
// const computerBoard = computerGameBoard.getBoard();

// // Initial player boards are rendered
// renderBoards().renderUserBoard(userBoard);
// renderBoards().renderComputerBoard(computerBoard);

// gameMenuEventHandler();
