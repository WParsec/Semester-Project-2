import { baseUrl, loginUrl, loginForm, email, password, formError } from "../data/constants.js";
import { createHeaderWithInputs } from "../headers/headers.js";
import { loginFetch } from "../fetch/fetch.js";

// Validation
function illustrateValidation(element) {
  element.addEventListener("keyup", () => {
    element.classList.add("input-error");
    if (element.validity.valid) {
      element.classList.remove("input-error");
    }
  });
}
illustrateValidation(email);
illustrateValidation(password);

/**
 * Collects input values from form and puts them in object "values"
 * @param {event} event submit
 */
function loginSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  try {
    loginFetch(baseUrl + loginUrl, createHeaderWithInputs(values));
  } catch (e) {
    formError.innerText = `${e}`;
  }
}

// addEventListener on submit of loginForm
loginForm.addEventListener("submit", loginSubmit);
