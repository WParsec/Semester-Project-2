// import functions
import { createStandardHeader } from "../headers/headers.js";
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { standardFetch } from "../fetch/fetch.js";
import { formatDate } from "../utils/formatDate.js";
import { getCreditAmount } from "../ui/getCreditAmount.js";
import { hideShowLi } from "../ui/hideShowLi.js";
import { runSort } from "../ui/sort.js";

// import constants
import { baseUrl, allListingsUrl, sellerFlag, activeFlag, createdUrl, searchListings, pageOf, pageTot, listingGrid } from "../data/constants.js";

// constants
const listingTemplate = document.querySelector("#listingTemplate").content;

// initiate
toggleMenu();
getCreditAmount();
hideShowLi();
runSort();

// page
// let pageStart = 0;
// let page = 0;

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

  // pagination
  let eachPage = resultArray.length;
  // pageOf.innerText = page + 1 + " ";
  // pageTot.innerText = " " + Math.ceil(resultArray.length / eachPage) + " ";

  // loop
  for (let i = 0; i < resultArrayHasImages.length; i++) {
    // Destructuring each result from loop
    const {
      seller: { name },
      title,
      media,
      endsAt,
    } = resultArrayHasImages[i];

    // finding highest bid
    let amount;
    if (resultArrayHasImages[i]._count.bids > 0) {
      amount = resultArrayHasImages[i].bids[resultArrayHasImages[i].bids.length - 1].amount;
    }
    // Creates template for each result
    const listingClone = document.importNode(listingTemplate, true);
    if (media[0]) {
      listingClone.querySelector("#listingMedia").style.backgroundImage = `url(${media[0]})`;
    } else {
      continue;
    }
    if (!amount) {
      listingClone.querySelector("#listingAmount").innerText = `${"No bids"}`;
    } else {
      listingClone.querySelector("#listingAmount").innerText = `${amount}`;
    }
    listingClone.querySelector("#listingTitle").innerText = `${title}`;
    listingClone.querySelector("#listingSeller").innerText = `${name}`;
    listingClone.querySelector("#listingEnds").innerText = `${formatDate(endsAt)}`;

    // finally appending the child
    listingGrid.appendChild(listingClone);
  }

  /**
   * Function for searching listing
   */
  function searchListing(array) {
    searchListings.addEventListener("keyup", (event) => {
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
        if (media[0]) {
          listingClone.querySelector("#listingMedia").style.backgroundImage = `url(${media[0]})`;
        } else {
          eachPage = eachPage + 1;
          continue;
        }

        // finally appending the child
        listingGrid.appendChild(listingClone);
      }
    });
  }
  searchListing(resultArray);
}
createAllListings(standardUrl);

// function pagination() {
//   const next = document.querySelector("#arrowNext");
//   const back = document.querySelector("#arrowBack");

//   back.style.display = "none";

//   next.addEventListener("click", () => {
//     page++;
//     pageStart = pageStart + 32;
//     createAllListings();
//     if (page != 0) {
//       back.style.display = "flex";
//     }
//     if (page + 1 == pageTot.innerText) {
//       next.style.display = "none";
//     }
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     // pageOf.innerText = page + 1;
//   });

//   back.addEventListener("click", () => {
//     page--;
//     if (pageStart < 32) {
//       pageStart = 0;
//     }
//     pageStart = pageStart - 32;
//     createAllListings();
//     if (page != 0) {
//       back.style.display = "flex";
//     } else {
//       back.style.display = "none";
//     }
//     next.style.display = "flex";
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   });
// }
// pagination();
