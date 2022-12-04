import { hideShowLi } from "../ui/hideShowLi.js";
import { logOutButton, editAvatarButton } from "../data/constants.js";
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { baseUrl, profileUrl, listingsFlag, profileUsername } from "../data/constants.js";
import { createStandardHeader, editProfile } from "../headers/headers.js";
import { standardFetch } from "../fetch/fetch.js";

// Initiate
hideShowLi();
toggleMenu();

function logOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("usernameGavelbay");
  window.location.href = "/dist/index.html";
}

// Modals
const modal = document.querySelector("#modal");
function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

// Eventlistener's
logOutButton.addEventListener("click", logOut);
editAvatarButton.addEventListener("click", openModal);
modal.addEventListener("click", (event) => {
  const modalClose = document.querySelector("#modalClose");
  if (event.target === modal || event.target === modalClose) {
    closeModal();
  }
});

async function createProfile() {
  const username = localStorage.getItem("usernameGavelbay");
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(baseUrl + profileUrl + username + listingsFlag, createStandardHeader(accessToken));
  const data = await response.json();
  console.log(data);
  // Build page with data
  const { name, avatar, credits } = data;
  profileUsername.innerText = name;
  document.querySelector("#creditSpan").innerText = `${credits}`;
  if (avatar) {
    document.querySelector("#avatarDiv").style.backgroundImage = `url("${avatar}")`;
    document.querySelector("#avatarDiv").firstElementChild.remove();
  }
}
createProfile();

/**
 * Fetch to change avatar image on submit of form
 */
document.querySelector("#editAvatarForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  const name = localStorage.getItem("usernameGavelbay");
  const accessToken = localStorage.getItem("accessToken");
  const errorDiv = document.querySelector("#mediaError");
  try {
    await standardFetch(baseUrl + profileUrl + name + "/media", editProfile(values, accessToken));
    location.reload();
  } catch (e) {
    errorDiv.innerText = e;
    document.querySelector("#avatar").setAttribute("aria-invalid", true);
  }
});
