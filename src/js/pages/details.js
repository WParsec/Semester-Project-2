import { hideShowLi } from "../ui/hideShowLi.js";
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { getCreditAmount } from "../ui/getCreditAmount.js";
import { standardFetch } from "../fetch/fetch.js";
import { createStandardHeader, createHeaderWithInputs } from "../headers/headers.js";
import { baseUrl, allListingsUrl, sellerFlag, formError } from "../data/constants.js";
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

// Bidding
const bidUrl = baseUrl + allListingsUrl + "/" + id + "/bids";
const bidForm = document.querySelector("#bidForm");

bidForm.addEventListener("submit", placeBid);

async function placeBid(event) {
  event.preventDefault();
  const accessToken = localStorage.getItem("accessToken");
  const value = document.querySelector("#bidInput").value;
  console.log(value);
  const valueObject = {
    amount: +value,
  };
  try {
    await standardFetch(bidUrl, createHeaderWithInputs(valueObject, accessToken));
    formError.classList.remove("text-warning");
    formError.classList.add("text-dark-green");
    formError.innerText = "Bid has been placed! Refresh to see it.";
    document.querySelector("#bidInput").value = "";
  } catch (e) {
    if (e.toString() === "Error: No Authorization was found in request.headers") {
      formError.innerText = "You must be logged in to place a bid";
      return;
    }
    formError.innerText = `${e}`;
  }
}

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
  document.querySelector("#pageTotal").innerText = " " + media.length;
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

//
//
//
// Slide Images eventlistener
mediaNext.addEventListener("click", () => {
  slideRight(arrayLength);
});

mediaBack.addEventListener("click", () => {
  slideLeft(arrayLength);
});

// Slide functions
// tried every way possible to make these export/import functions, but was not able to.
function slideRight(arrayLength) {
  if (count === arrayLength) {
    count = 0;
    sliderContainer.style.transform = `translateX(-${count * 100}%)`;
    pageOfTotal();
    return;
  }
  count++;
  console.log(count);
  sliderContainer.style.transform = `translateX(-${count * 100}%)`;
  pageOfTotal();
}
function slideLeft(arrayLength) {
  count--;
  if (count < 0) {
    count = arrayLength;
    sliderContainer.style.transform = `translateX(-${count * 100}%)`;
    pageOfTotal();
  }
  console.log(count);
  sliderContainer.style.transform = `translateX(-${count * 100}%)`;
  pageOfTotal();
}
function pageOfTotal() {
  document.querySelector("#pageCurrent").innerText = count + 1;
}
