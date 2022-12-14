export function illustrateValidation(element) {
  element.addEventListener("keyup", () => {
    element.classList.add("input-error");
    if (element.validity.valid) {
      element.classList.remove("input-error");
      // element.classList.add("border-green");
    }
  });
}
