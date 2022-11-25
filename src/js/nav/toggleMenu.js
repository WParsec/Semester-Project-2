export function toggleMenu() {
    const menuButton = document.querySelector("#toggleMenu");
    const menu = document.querySelector("#menu");
    menuButton.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }