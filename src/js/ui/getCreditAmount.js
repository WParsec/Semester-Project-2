import { baseUrl, profileUrl } from "../data/constants.js";
import { standardFetch } from "../fetch/fetch.js";
import { createStandardHeader } from "../headers/headers.js";

export async function getCreditAmount() {
  if (localStorage.getItem("usernameGavelbay")) {
    document.querySelector("#creditsDiv").classList.remove("hidden");
    const username = localStorage.getItem("usernameGavelbay");
    const accessToken = localStorage.getItem("accessToken");
    const response = await standardFetch(baseUrl + profileUrl + username, createStandardHeader(accessToken));
    const { credits } = response;
    localStorage.setItem("credits", credits);
    document.querySelector("#creditSpan").innerText = `${credits}`;
  }
}
