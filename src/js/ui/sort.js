import { createAllListings } from "../pages/explore.js";

/**
 * Adds sorting endpoints as parameter of createAllListings function
 */
export function runSort(grid) {
  const sortCreated = document.querySelector("#sortCreated");
  sortCreated.addEventListener("change", () => {
    const createdAsc = "?sort=created&sortOrder=asc";
    const createdDesc = "?sort=created&sortOrder=desc";
    switch (sortCreated.value) {
      case "Newest":
        grid.innerHTML = "";
        createAllListings(createdAsc);
        break;
      case "Oldest":
        grid.innerHTML = "";
        createAllListings(createdDesc);
        break;
    }
  });
}
runSort();
