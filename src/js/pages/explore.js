// import functions
import { createStandardHeader } from "../headers/headers.js";
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { standardFetch } from "../fetch/fetch.js";

// import constants
import { baseUrl, allListingsUrl, sellerFlag } from "../data/constants.js";

// initiate
toggleMenu();

// constants
const listingGrid = document.querySelector("#listingGrid");
const listingTemplate = document.querySelector("#listingTemplate").content;

// page
async function createAllListings(sortUrl = "") {
  const resultArray = await standardFetch(baseUrl + allListingsUrl + sellerFlag + sortUrl, createStandardHeader());
  console.log(resultArray);
  listingGrid.innerHTML = "";
  // pagination
  let eachPage = 16;
  let i = 0;
  for (i; i < eachPage; i++) {
    // Destructuring each result from loop
    const {
      bids: { amount },
      seller: { name },
      description,
      title,
      media,
      id,
      _count: { bids },
      endsAt,
    } = resultArray[i];
    // Creates template for each result
    const listingClone = document.importNode(listingTemplate, true);
    if (media[0]) {
      listingClone.querySelector("#listingMedia").style.backgroundImage = `url(${media[0]})`;
    } else {
      eachPage = eachPage + 1;
      continue;
    }
    listingClone.querySelector("#listingTitle").innerText = `${title}`;
    listingClone.querySelector("#listingSeller").innerText = `${name}`;
    listingClone.querySelector("#listingAmount").innerText = `${amount}`;
    listingClone.querySelector("#listingEnds").innerText = `${endsAt}`;
    listingGrid.appendChild(listingClone);
    console.log(media);
  }
}
createAllListings();
