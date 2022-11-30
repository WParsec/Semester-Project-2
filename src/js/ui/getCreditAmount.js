export function getCreditAmount() {
  if (localStorage.getItem("usernameGavelbay")) {
    document.querySelector("#creditsDiv").classList.remove("hidden");
    const creditAmount = localStorage.getItem("credits");
    document.querySelector("#creditSpan").innerText = `${creditAmount}`;
  }
}
