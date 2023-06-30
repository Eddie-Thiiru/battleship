import { GameBoard } from "./game-board";
import { Player } from "./player";
import { renderBoards, gameWinner } from "./battleship";
import { userShipsCoordinates } from "./start-menu";
import { computerShipCoordinates } from "./computerAI";

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

  // Get player boards from GameBoard objects
  const userBoard = userGameBoard.getBoard();
  const computerBoard = computerGameBoard.getBoard();

  // Initial player boards are rendered
  renderBoards().renderUserBoard(userBoard);
  renderBoards().renderComputerBoard(computerBoard);
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
      gameWinner("You Win");
      return;
    }

    computer.attack(user, userGameBoard, pos);

    // Update user board on the screen
    const userBoard = userGameBoard.getBoard();
    renderBoards().renderUserBoard(userBoard);

    // Check if all user ships are destroyed
    if (userGameBoard.allShipsDestroyed() === true) {
      gameWinner("AI Wins!");
      return;
    }
  }
};

export { Game, playRound };
