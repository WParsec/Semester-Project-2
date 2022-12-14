// import functions
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { createLoginValues } from "../utils/loginValues.js";
import { illustrateValidation, displayRequestedFormat } from "../ui/illustrateValidation.js";
import { bounceError } from "../ui/bounceError.js";

// import constants
import { baseUrl, registerUrl, loginUrl, form, name, email, password, repeatPassword, formError } from "../data/constants.js";
import { standardFetch, loginFetch } from "../fetch/fetch.js";
import { createHeaderWithInputs } from "../headers/headers.js";

const usernameError = document.querySelector("#usernameError");
const emailError = document.querySelector("#emailError");

// initiate
toggleMenu();

// Validation
illustrateValidation(name);
illustrateValidation(email);
illustrateValidation(password);
illustrateValidation(repeatPassword);

// Display input field title when value does not match requested format - mobile users
document.querySelector("#submitButton").addEventListener("click", () => {
  displayRequestedFormat(name, usernameError);
  displayRequestedFormat(email, emailError);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (password.value === repeatPassword.value) {
    registerSubmit(event);
  } else {
    formError.innerText = "Passwords do not match";
    repeatPassword.classList.add("input-error");
    repeatPassword.ariaInvalid = true;
    bounceError(formError);
  }
});

/**
 * Function that tries to register account and displays errors if any.
 * If successful, function will transfer values to login function and log user in.
 * @param {event} event Submit event
 */
async function registerSubmit(event) {
  // creates new object from FormData on submit
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  try {
    await standardFetch(baseUrl + registerUrl, createHeaderWithInputs(values));
  } catch (e) {
    formError.innerText = `${e}`;
    bounceError(formError);
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
