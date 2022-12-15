import { baseUrl, loginUrl, loginForm, email, password, formError } from "../data/constants.js";
import { createHeaderWithInputs } from "../headers/headers.js";
import { loginFetch } from "../fetch/fetch.js";
import { illustrateValidation, displayRequestedFormat } from "../ui/illustrateValidation.js";
import { bounceError } from "../ui/bounceError.js";
import { toggleMenu } from "../ui/nav/toggleMenu.js";

// Initiate
toggleMenu();

// Validation
illustrateValidation(email);
illustrateValidation(password);

document.querySelector("#submitButton").addEventListener("click", () => {
  displayRequestedFormat(email, formError);
});

/**
 * Collects input values from form and puts them in object "values"
 * @param {event} event submit
 */
async function loginSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  try {
    await loginFetch(baseUrl + loginUrl, createHeaderWithInputs(values));
  } catch (e) {
    formError.innerText = `${e}`;
    bounceError(formError);
  }
}

// addEventListener on submit of loginForm
loginForm.addEventListener("submit", loginSubmit);
