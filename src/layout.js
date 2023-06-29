import "./styles/global.css";
import Img from "./images/submarine.png";

const pageLayout = () => {
  const content = document.querySelector(".content");
  const header = document.createElement("div");
  const main = document.createElement("div");
  const footer = document.createElement("div");
  const title = document.createElement("h1");
  const winnerContainer = document.createElement("div");
  const titleContainer = document.createElement("div");
  const logo = new Image();

  header.classList.add("header");
  main.classList.add("main-section");
  footer.classList.add("footer");
  title.classList.add("title");
  title.textContent = "Battleship";
  winnerContainer.classList.add("winner-container");
  titleContainer.classList.add("title-container");
  logo.src = Img;
  logo.alt = "Submarine logo";

  titleContainer.appendChild(title);
  titleContainer.appendChild(logo);
  header.appendChild(titleContainer);
  header.appendChild(winnerContainer);
  content.appendChild(header);
  content.appendChild(main);
  content.appendChild(footer);
};

export { pageLayout };
