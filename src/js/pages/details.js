import { hideShowLi } from "../ui/hideShowLi.js";
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { getCreditAmount } from "../ui/getCreditAmount.js";
import { standardFetch } from "../fetch/fetch.js";
import { createStandardHeader } from "../headers/headers.js";
import { baseUrl, allListingsUrl, sellerFlag } from "../data/constants.js";
import { formatDate } from "../utils/formatDate.js";

// Initiate
hideShowLi();
toggleMenu();
getCreditAmount();

// Initiate variables
let count = 0;
let arrayLength;

// Collecting ID from querystring
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// Remember to change name of title of page

// Slider
const sliderContainer = document.querySelector("#sliderContainer");
const mediaNext = document.querySelector("#mediaNext");
const mediaBack = document.querySelector("#mediaBack");

async function buildDetailsPage(id) {
  const response = await standardFetch(baseUrl + allListingsUrl + "/" + id + sellerFlag, createStandardHeader());
  const {
    description,
    endsAt,
    bids,
    media,
    tags,
    title,
    seller: { name },
    // _count: { bids },
  } = response;
  document.title = `Gavelbay | ${title}`;

  // Media
  for (let i = 0; i < media.length; i++) {
    const mediaClone = document.importNode(sliderTemplate, true).content;
    mediaClone.querySelector("#sliderImage").src = media[i];
    sliderContainer.appendChild(mediaClone);
  }
  // Bidders - reverse loop
  for (let i = bids.length - 1; i >= 0; i--) {
    const biddersClone = document.importNode(bidderHistoryTemplate, true).content;
    biddersClone.querySelector("#bidderName").innerText = bids[i].bidderName;
    biddersClone.querySelector("#bidderAmount").innerText = bids[i].amount;
    document.querySelector("#bidderHistoryWrap").appendChild(biddersClone);
  }
  // Title
  document.querySelector("#titleWrap").innerText = title.toUpperCase();
  // Highest bid
  if (!bids.length) {
    document.querySelector("#amountWrap").innerText = "No bids";
    document.querySelector("#bidderHistoryWrap").innerText = "No bidders";
  } else {
    document.querySelector("#amountWrap").innerText = bids[bids.length - 1].amount;
  }
  // Seller
  document.querySelector("#sellerWrap").innerText = name;
  // Ends At
  document.querySelector("#endsAtWrap").innerText = formatDate(endsAt);
  // Description
  document.querySelector("#descriptionWrap").innerText = description;

  arrayLength = media.length - 1;
}
buildDetailsPage(id);

// Slide Images eventlistener
mediaNext.addEventListener("click", () => {
  slideRight(arrayLength);
});

mediaBack.addEventListener("click", () => {
  slideLeft(arrayLength);
});

// Slide functions
function slideRight(arrayLength) {
  if (count === arrayLength) {
    count = 0;
    sliderContainer.style.transform = `translateX(-${count * 100}%)`;
    return;
  }
  count++;
  console.log(count);
  sliderContainer.style.transform = `translateX(-${count * 100}%)`;
}

function slideLeft(arrayLength) {
  count--;
  if (count < 0) {
    count = arrayLength;
    sliderContainer.style.transform = `translateX(-${count * 100}%)`;
  }
  console.log(count);
  sliderContainer.style.transform = `translateX(-${count * 100}%)`;
}
