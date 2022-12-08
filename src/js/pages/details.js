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

// Remember to change name of title of page

// Slider
const sliderContainer = document.querySelector("#sliderContainer");
const mediaNext = document.querySelector("#mediaNext");
const mediaBack = document.querySelector("#mediaBack");

let count = 0;
let arrayLength = 2;

mediaNext.addEventListener("click", slideRight);
mediaBack.addEventListener("click", slideLeft);

function slideRight() {
  if (count === arrayLength) {
    count = 0;
    sliderContainer.style.transform = `translateX(-${count * 100}%)`;
    return;
  }
  count++;
  console.log(count);
  sliderContainer.style.transform = `translateX(-${count * 100}%)`;
}

function slideLeft() {
  count--;
  if (count < 0) {
    count = arrayLength;
    sliderContainer.style.transform = `translateX(-${count * 100}%)`;
  }
  console.log(count);
  sliderContainer.style.transform = `translateX(-${count * 100}%)`;
}
