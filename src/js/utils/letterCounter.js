export function letterCounter(description) {
  const charSpan = document.querySelector("#characters");
  let remaining = 200;
  charSpan.innerHTML = `${remaining - description.value.length}`;
  if (remaining - description.value.length <= 10) {
    charSpan.classList.add("text-warning");
  } else {
    charSpan.classList.remove("text-warning");
  }
}
