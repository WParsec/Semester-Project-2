import { createAllListings } from "../pages/explore.js";
import { listingGrid } from "../data/constants.js";

/**
 * Adds sorting endpoints as parameter of createAllListings function
 */
export function runSort() {
  const sortCreated = document.querySelector("#sortCreated");
  const sortTitle = document.querySelector("#sortTitle");
  sortCreated.addEventListener("change", () => {
    const createdAsc = "?_sort=created&sortOrder=asc";
    const createdDesc = "?_sort=created&sortOrder=desc";
    switch (sortCreated.value) {
      case "Newest":
        listingGrid.innerHTML = "";
        createAllListings(createdAsc);
        break;
      case "Oldest":
        listingGrid.innerHTML = "";
        createAllListings(createdDesc);
        break;
    }
  });
  sortTitle.addEventListener("change", () => {
    const titleAsc = "?_sort=title&sortOrder=asc";
    const titleDesc = "?_sort=title&sortOrder=desc";
    switch (sortTitle.value) {
      case "alphabetical":
        listingGrid.innerHTML = "";
        createAllListings(titleAsc);
        break;
      case "inverse-alphabetical":
        listingGrid.innerHTML = "";
        createAllListings(titleDesc);
        break;
    }
  });
}
runSort();
