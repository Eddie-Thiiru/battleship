import { pageLayout } from "./battleship";
// import { userEventHandler } from "./battleship";
import { startMenu, startMenuEventHandler } from "./start-menu";

const component = () => {
  pageLayout();
  // Game();
  startMenu();
  // userEventHandler();
  startMenuEventHandler();
};
component();
