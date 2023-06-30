import { pageLayout } from "./layout";
import { startMenu, startMenuEventHandler } from "./start-menu";
import { gameMenuEventHandler } from "./battleship";

const component = () => {
  pageLayout();

  startMenu();

  startMenuEventHandler();

  gameMenuEventHandler();
};
component();
