export function illustrateValidation(element) {
  element.addEventListener("keyup", () => {
    element.classList.add("input-error");
    if (element.validity.valid) {
      element.classList.remove("input-error");
      // element.classList.add("border-green");
    }
  });
}

export function displayRequestedFormat(element, errorDiv) {
  if (!element.validity.valid && element.value.length > 0) {
    errorDiv.innerText = element.title;
  } else {
    errorDiv.innerText = "";
  }
}
