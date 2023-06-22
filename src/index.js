import { Game } from "./game";
import { pageLayout } from "./battleship";
import { userEventHandler } from "./battleship";

const component = () => {
  pageLayout();
  Game();
  userEventHandler();
};
component();
