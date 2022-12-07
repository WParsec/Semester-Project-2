import { hideShowLi } from "../ui/hideShowLi.js";
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { getCreditAmount } from "../ui/getCreditAmount.js";

// Initiate
hideShowLi();
toggleMenu();
getCreditAmount();

// Collecting ID from querystring
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);
