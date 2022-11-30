export function hideShowLi() {
  const liLogin = document.querySelector("#liLogin");
  const liNewListing = document.querySelector("#liNewListing");
  const liAccount = document.querySelector("#liAccount");
  const liRegister = document.querySelector("#liRegister");

  if (localStorage.getItem("usernameGavelbay")) {
    liLogin.classList.add("hidden");
    liRegister.classList.add("hidden");
    liAccount.classList.remove("hidden");
    liNewListing.classList.remove("hidden");
  }
}
