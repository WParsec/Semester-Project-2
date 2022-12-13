// import functions
import { createStandardHeader } from "../headers/headers.js";
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { standardFetch } from "../fetch/fetch.js";
import { formatDate } from "../utils/formatDate.js";
import { getCreditAmount } from "../ui/getCreditAmount.js";
import { hideShowLi } from "../ui/hideShowLi.js";
import { runSort } from "../ui/sort.js";
import { searchWithButton } from "../ui/searchButton.js";

// import constants
import { baseUrl, allListingsUrl, sellerFlag, activeFlag, createdUrl, searchInput, listingGrid } from "../data/constants.js";

// constants
const listingTemplate = document.querySelector("#listingTemplate").content;

// initiate
toggleMenu();
getCreditAmount();
hideShowLi();
runSort();

// Url
const standardUrl = baseUrl + allListingsUrl + sellerFlag + activeFlag + createdUrl;

// Function fetches listings and builds page by looping results
export async function createAllListings(url) {
  const resultArray = await standardFetch(url, createStandardHeader());
  listingGrid.innerHTML = "";

  // Creating an array excluding the items that does not have image
  const resultArrayHasImages = resultArray.filter((resultArray) => {
    if (resultArray.media[0]) {
      return resultArray;
    }
  });

  // loop
  for (let i = 0; i < resultArrayHasImages.length; i++) {
    // Destructuring each result from loop
    const {
      seller: { name },
      title,
      media,
      endsAt,
      id,
    } = resultArrayHasImages[i];

    // finding highest bid
    let amount;
    if (resultArrayHasImages[i]._count.bids > 0) {
      amount = resultArrayHasImages[i].bids[resultArrayHasImages[i].bids.length - 1].amount;
    }
    // Creates template for each result
    const listingClone = document.importNode(listingTemplate, true);
    listingClone.querySelector("#listingMedia").style.backgroundImage = `url(${media[0]})`;
    if (!amount) {
      listingClone.querySelector("#listingAmount").innerText = `${"No bids"}`;
    } else {
      listingClone.querySelector("#listingAmount").innerText = `${amount}`;
    }
    listingClone.querySelector("#listingTitle").innerText = `${title}`;
    listingClone.querySelector("#listingSeller").innerText = `${name}`;
    listingClone.querySelector("#listingEnds").innerText = `${formatDate(endsAt)}`;
    listingClone.querySelector("#listingMedia").href = `../dist/details/index.html?id=${id}`;

    // finally appending the child
    listingGrid.appendChild(listingClone);
  }

  /**
   * Function for searching listing
   */
  function searchListing(array) {
    searchInput.addEventListener("keyup", (event) => {
      const inputValue = event.target.value.toLowerCase();
      const filteredListings = array.filter((array) => {
        if (
          array.title.toLowerCase().includes(inputValue) ||
          array.endsAt.toLowerCase().includes(inputValue) ||
          array.seller.name.toLowerCase().includes(inputValue)
        ) {
          listingGrid.innerHTML = "";
          return array;
        }
        return;
      });
      for (let i = 0; i < filteredListings.length; i++) {
        // Destructuring each result from loop from ned array
        const {
          seller: { name },
          title,
          media,
          id,
          endsAt,
        } = filteredListings[i];
        // Building the template
        let amount;
        if (filteredListings[i]._count.bids > 0) {
          amount = filteredListings[i].bids[filteredListings[i].bids.length - 1].amount;
        }
        // Creates template for each result
        const listingClone = document.importNode(listingTemplate, true);
        if (!amount) {
          listingClone.querySelector("#listingAmount").innerText = `${"No bids"}`;
        } else {
          listingClone.querySelector("#listingAmount").innerText = `${amount}`;
        }
        listingClone.querySelector("#listingTitle").innerText = `${title}`;
        listingClone.querySelector("#listingSeller").innerText = `${name}`;
        listingClone.querySelector("#listingEnds").innerText = `${formatDate(endsAt)}`;
        listingClone.querySelector("#listingMedia").style.backgroundImage = `url(${media[0]})`;
        listingClone.querySelector("#listingMedia").href = `../dist/details/index.html?id=${id}`;

        // finally appending the child
        listingGrid.appendChild(listingClone);
      }
    });
  }
  searchListing(resultArrayHasImages);

  // Button search in case needed for accessability reasons
  document.querySelector("#searchButton").addEventListener("click", (event) => {
    event.preventDefault();
    searchWithButton(resultArrayHasImages);
  });
}
createAllListings(standardUrl);
