import { GameBoard } from "./game-board";
import { Player } from "./player";

const GameController = () => {
  // Create Player objects and GameBoard objects for each player
  const user = Player("user");
  const computer = Player("computer AI");
  const userGameBoard = GameBoard();
  const computerGameBoard = GameBoard();

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

  return { players };
};

export { GameController };
