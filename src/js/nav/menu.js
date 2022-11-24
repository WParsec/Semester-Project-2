export function toggleMenu() {
  const menuButton = document.querySelector("#toggleMenu");
  const menu = document.querySelector("#menu");
  menuButton.addEventListener("click", () => {
    menu.ariaExpanded === true;
    menu.classList.add("top-[80px]");
    menu.classList.add("opacity-100");
    if (menu.ariaExpanded) {
      menu.classList.remove("top-[80px]");
      menu.classList.remove("opacity-100");
    }
  });
}

// ? ((e.name = "close"),
// list.classList.add("top-[80px]"),
// list.classList.add("opacity-100"))
// : ((e.name = "menu"),
// list.classList.remove("top-[80px]"),
// list.classList.remove("opacity-100"));
