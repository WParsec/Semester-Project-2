import { formatDate } from "../utils/formatDate.js";

const listingTemplate = document.querySelector("#listingTemplate").content;

export function searchWithButton(array) {
  const inputValue = document.querySelector("#searchInput").value.toLowerCase();
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
  console.log(filteredListings);
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
}
