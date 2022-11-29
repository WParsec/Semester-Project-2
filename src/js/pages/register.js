// import functions
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { createLoginValues } from "../utils/loginValues.js";

// import constants
import { baseUrl, registerUrl, loginUrl } from "../data/constants.js";
import { standardFetch, loginFetch } from "../fetch/fetch.js";
import { createHeaderWithInputs } from "../headers/headers.js";

// initiate
toggleMenu();

// Validation
const form = document.querySelector("#registerForm");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const repeatPassword = document.querySelector("#repeatPassword");
const formError = document.querySelector("#formError");

function illustrateValidation(element) {
  element.addEventListener("keyup", () => {
    element.classList.add("input-error");
    if (element.validity.valid) {
      element.classList.remove("input-error");
    }
  });
}
illustrateValidation(name);
illustrateValidation(email);
illustrateValidation(password);
illustrateValidation(repeatPassword);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (password.value === repeatPassword.value) {
    registerSubmit(event);
  } else {
    formError.innerText = "Passwords do not match";
    repeatPassword.classList.add("input-error");
  }
});

async function registerSubmit(event) {
  // creates new object from FormData on submit
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  console.log(values);
  try {
    await standardFetch(baseUrl + registerUrl, createHeaderWithInputs(values));
  } catch (e) {
    formError.innerText = `${e}`;
    // return to stop code if error
    return;
  }
  try {
    const loginValues = createLoginValues(values);
    await loginFetch(baseUrl + loginUrl, createHeaderWithInputs(loginValues));
  } catch (e) {
    console.log(e);
  }
}