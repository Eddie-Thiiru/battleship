import { Game } from "./game-controller";
import { pageLayout, renderBoards } from "./battleship";
import { userEventHandler } from "./battleship";

const component = () => {
  pageLayout();
  Game();
  // renderBoards().renderUserBoard();
  // renderBoards().renderComputerBoard();

  // // Event handler that returns user attack choice
  userEventHandler();
};
component();
