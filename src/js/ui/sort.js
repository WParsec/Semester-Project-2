import { createAllListings } from "../pages/explore.js";

/**
 * Adds sorting endpoints as parameter of createAllListings function
 */
export function runSort() {
  const sortCreated = document.querySelector("#sortCreated");
  sortCreated.addEventListener("change", () => {
    switch (sortCreated.value) {
      case "Newest":
        const createdAsc = "?sort=created&sortOrder=asc";
        listingGrid.innerHTML = "";
        createAllListings(createdAsc);
        break;
      case "Oldest":
        const createdDesc = "?sort=created&sortOrder=desc";
        listingGrid.innerHTML = "";
        createAllListings(createdDesc);
        break;
    }
  });
}
runSort();
