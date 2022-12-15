import { hideShowLi } from "../ui/hideShowLi.js";
import { logOutButton, editAvatarButton, allListingsUrl, sellerFlag } from "../data/constants.js";
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { baseUrl, profileUrl, listingsFlag, profileUsername, listingGrid } from "../data/constants.js";
import { createStandardHeader, editProfile } from "../headers/headers.js";
import { standardFetch } from "../fetch/fetch.js";
import { formatDate } from "../utils/formatDate.js";

// Initiate
hideShowLi();
toggleMenu();

// DOM
const listingTemplate = document.querySelector("#listingTemplate").content;

function logOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("usernameGavelbay");
  window.location.href = "../../index.html";
}

// Modals
const modal = document.querySelector("#modal");
function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.ariaExpanded = true;
}

function closeModal() {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
  modal.ariaExpanded = false;
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
  // Build page with data
  const { name, avatar, credits, wins } = data;
  profileUsername.innerText = name;
  document.querySelector("#creditSpan").innerText = `${credits}`;
  if (avatar) {
    document.querySelector("#avatarDiv").style.backgroundImage = `url("${avatar}")`;
    document.querySelector("#avatarDiv").firstElementChild.remove();
  }
  for (let i = 0; i < wins.length; i++) {
    const response = await fetch(baseUrl + allListingsUrl + "/" + wins[i] + sellerFlag, createStandardHeader);
    const data = await response.json();
    const {
      media,
      title,
      seller: { name },
      endsAt,
    } = data;
    let amount = data.bids[data.bids.length - 1].amount;
    const listingClone = document.importNode(listingTemplate, true);
    listingClone.querySelector("#listingMedia").style.backgroundImage = `url(${media[0]})`;
    listingClone.querySelector("#listingTitle").innerText = `${title}`;
    listingClone.querySelector("#listingSeller").innerText = `${name}`;
    listingClone.querySelector("#listingEnds").innerText = `${formatDate(endsAt)}`;
    listingClone.querySelector("#listingAmount").innerText = `${amount}`;
    listingGrid.appendChild(listingClone);
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
