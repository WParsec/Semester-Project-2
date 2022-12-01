import { hideShowLi } from "../ui/hideShowLi.js";

// Initiate
hideShowLi();

function logOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("usernameGavelbay");
  window.location.href = "/dist/index.html";
}

const logOutButton = document.querySelector("#logOutButton");

logOutButton.addEventListener("click", logOut);
