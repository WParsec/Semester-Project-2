import { createAllListings } from "../pages/explore.js";
import { listingGrid, baseUrl, allListingsUrl, sellerFlag, activeFlag } from "../data/constants.js";

/**
 * Adds parameter to createAllListings function and runs it
 */
export function runSort() {
  const sortCreated = document.querySelector("#sortCreated");
  const sortActive = document.querySelector("#sortActive");
  const createdAsc = "&sort=created&sortOrder=asc";
  const createdDesc = "&sort=created&sortOrder=desc";
  const titleAsc = "&sort=title&sortOrder=asc";
  const titleDesc = "&sort=title&sortOrder=desc";
  sortCreated.addEventListener("change", () => {
    switch (sortCreated.value) {
      case "Newest":
        listingGrid.innerHTML = "";
        createAllListings(baseUrl + allListingsUrl + sellerFlag + activeFlag + createdDesc);
        break;
      case "Oldest":
        listingGrid.innerHTML = "";
        createAllListings(baseUrl + allListingsUrl + sellerFlag + activeFlag + createdAsc);
        break;
      case "Alphabetical":
        listingGrid.innerHTML = "";
        createAllListings(baseUrl + allListingsUrl + sellerFlag + activeFlag + titleAsc);
        break;
      case "Inverse-alphabetical":
        listingGrid.innerHTML = "";
        createAllListings(baseUrl + allListingsUrl + sellerFlag + activeFlag + titleDesc);
        break;
    }
  });
  sortActive.addEventListener("change", () => {
    switch (sortActive.value) {
      case "active":
        listingGrid.innerHTML = "";
        createAllListings(baseUrl + allListingsUrl + sellerFlag + activeFlag + createdDesc);
        break;
      case "all":
        listingGrid.innerHTML = "";
        createAllListings(baseUrl + allListingsUrl + sellerFlag + createdDesc);
        break;
    }
  });
}

export function sort(array) {
  array.sort((a, b) => {
    if (a.created > b.created) {
      return -1;
    } else if (a.created < b.created) {
      return 1;
    } else {
      return 0;
    }
  });
}
