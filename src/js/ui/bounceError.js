// Function that makes the error container bounce to indicate it is updated
export function bounceError(div) {
  div.classList.add("animation-error");
  setTimeout(() => {
    div.classList.remove("animation-error");
  }, 1000);
}
