import "./styles/global.css";
import Img from "./images/submarine.png";

const pageLayout = () => {
  const content = document.querySelector(".content");
  const header = document.createElement("div");
  const main = document.createElement("div");
  const footer = document.createElement("div");
  const copyright = document.createElement("p");
  const title = document.createElement("h1");
  const logo = new Image();

  header.classList.add("header");
  main.classList.add("main-section");
  footer.classList.add("footer");
  title.classList.add("title");
  title.textContent = "Battleship";
  copyright.classList.add("copyright");
  copyright.textContent = "Copyright @ Battleship 2023";
  logo.src = Img;
  logo.alt = "Submarine logo";

  header.appendChild(title);
  header.appendChild(logo);
  footer.appendChild(copyright);
  content.appendChild(header);
  content.appendChild(main);
  content.appendChild(footer);
};

export { pageLayout };
