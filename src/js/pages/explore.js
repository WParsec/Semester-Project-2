// import functions
import { createStandardHeader } from "../headers/headers.js";
import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { standardFetch } from "../fetch/fetch.js";

// import constants
import { baseUrl, allListingsUrl, sellerFlag, searchListings, pageOf, pageTot } from "../data/constants.js";

// initiate
toggleMenu();

// constants
const listingGrid = document.querySelector("#listingGrid");
const listingTemplate = document.querySelector("#listingTemplate").content;

// page
let pageStart = 0;
let page = 0;

async function createAllListings(sortUrl = "") {
  const resultArray = await standardFetch(baseUrl + allListingsUrl + sellerFlag + sortUrl, createStandardHeader());
  console.log(resultArray);
  listingGrid.innerHTML = "";

  // pagination
  let eachPage = 32;
  pageOf.innerText = page + 1 + " ";
  pageTot.innerText = " " + Math.ceil(resultArray.length / 32) + " ";

  // loop
  for (let i = pageStart; i < pageStart + eachPage; i++) {
    // Destructuring each result from loop
    const {
      //   bids: { amount },
      seller: { name },
      title,
      media,
      endsAt,
    } = resultArray[i];
    // finding highest bid
    let amount;
    if (resultArray[i].bids.length > 0) {
      amount = resultArray[i].bids[resultArray[i].bids.length - 1].amount;
    }
    // Creates template for each result
    const listingClone = document.importNode(listingTemplate, true);
    if (media[0]) {
      listingClone.querySelector("#listingMedia").style.backgroundImage = `url(${media[0]})`;
    } else {
      eachPage = eachPage + 1;
      continue;
    }
    if (!amount) {
      listingClone.querySelector("#listingAmount").innerText = `${"No bids"}`;
    } else {
      listingClone.querySelector("#listingAmount").innerText = `${amount}`;
    }
    listingClone.querySelector("#listingTitle").innerText = `${title}`;
    listingClone.querySelector("#listingSeller").innerText = `${name}`;
    listingClone.querySelector("#listingEnds").innerText = `${endsAt}`;

    // finally appending the child
    listingGrid.appendChild(listingClone);
  }

  //   Hover
  document.querySelectorAll(".listing-card").forEach((item) => {
    item.addEventListener("mouseover", (event) => {
      item.firstElementChild.style.transform = "translateY(65px)";
    });
    item.addEventListener("mouseout", (event) => {
      item.firstElementChild.style.transform = "translateY(0px)";
    });
  });

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
      });
      for (let i = 0; i < 32; i++) {
        // Destructuring each result from loop from ned array
        const {
          seller: { name },
          description,
          title,
          media,
          id,
          endsAt,
        } = filteredListings[i];
        // Building the template
        let amount;
        if (resultArray[i].bids.length > 0) {
          amount = resultArray[i].bids[resultArray[i].bids.length - 1].amount;
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
        listingClone.querySelector("#listingEnds").innerText = `${endsAt}`;
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
createAllListings();

function pagination() {
  const next = document.querySelector("#arrowNext");
  const back = document.querySelector("#arrowBack");

  back.style.display = "none";

  next.addEventListener("click", () => {
    page++;
    pageStart = pageStart + 32;
    createAllListings();
    if (page != 0) {
      back.style.display = "flex";
    }
    if (page + 1 == pageTot.innerText) {
      next.style.display = "none";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    // pageOf.innerText = page + 1;
  });

  back.addEventListener("click", () => {
    page--;
    if (pageStart < 32) {
      pageStart = 0;
    }
    pageStart = pageStart - 32;
    createAllListings();
    if (page != 0) {
      back.style.display = "flex";
    } else {
      back.style.display = "none";
    }
    next.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
pagination();
