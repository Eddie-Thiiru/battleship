import { pageLayout } from "./layout";
import { startMenu, startMenuEventHandler } from "./start-menu";

const component = () => {
  pageLayout();

  startMenu();

  startMenuEventHandler();
};
component();
