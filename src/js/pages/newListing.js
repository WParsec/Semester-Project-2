import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { hideShowLi } from "../ui/hideShowLi.js";

// Initiate
toggleMenu();
hideShowLi();

// Constants
const addMediaButton = document.querySelector("#addMedia");
const mediaInput = document.querySelector("#media");
const previewMediaContainer = document.querySelector("#previewMediaContainer");
const previewMediaTemplate = document.querySelector("#previewMediaTemplate").content;
const previewFlexContainer = document.querySelector("#previewFlexContainer");
const mediaError = document.querySelector("#mediaError");
const mediaInputForm = document.querySelector("#mediaInputForm");

// declare mediaArray
let mediaArray = [];

function previewMedia() {
  if (!mediaInput.value) {
    return;
  }
  if (mediaArray.length === 4) {
    mediaError.innerText = "Maximum 4 images";
    return;
  }
  if (previewMediaContainer.className === "hidden") {
    previewMediaContainer.className.replace("flex");
  }
  let mediaUrl = mediaInput.value;
  mediaArray.push(mediaUrl);
  console.log(mediaArray);
  previewFlexContainer.innerHTML = "";
  for (let i = 0; i < mediaArray.length; i++) {
    const previewClone = document.importNode(previewMediaTemplate, true);
    const previewMediaDiv = previewClone.querySelector("#previewMediaDiv");
    previewMediaDiv.innerHTML = `<img src="${mediaArray[i]}" alt="preview image">`;
    previewFlexContainer.appendChild(previewClone);
    const removeButtons = document.querySelectorAll("#removeMediaButton");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        console.log(i);
        removeMedia(i);
      });
    });
  }
}

addMediaButton.addEventListener("click", previewMedia);

function removeMedia(iteration) {
  mediaArray.splice(iteration);
  console.log(mediaArray);
  previewMedia();
  if (mediaArray.length === 0) {
    previewMediaContainer.classList.remove("flex");
    previewMediaContainer.classList.add("hidden");
  }
}
