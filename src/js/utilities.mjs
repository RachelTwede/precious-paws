function toggleMenu() {
  let menuButton = document.querySelector("#menu-button");
  let navMenu = document.querySelector(".nav");
  menuButton.classList.toggle("change");
  navMenu.classList.toggle("visible");
}
  
export function setMenuListener() {
  let menuButton = document.querySelector("#menu-button");
  menuButton.addEventListener("click", toggleMenu);
}