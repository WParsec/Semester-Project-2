import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { hideShowLi } from "../ui/hideShowLi.js";

// Initiate
toggleMenu();
hideShowLi();

// Constants
const addMediaButton = document.querySelector("#addMedia");
const mediaInput = document.querySelector("#media");
const previewMediaTemplate = document.querySelector("#previewMediaTemplate").content;
const previewFlexContainer = document.querySelector("#previewFlexContainer");
const mediaError = document.querySelector("#mediaError");

const addTagsButton = document.querySelector("#addTags");
const tagInput = document.querySelector("#tagInput");
const previewTagsTemplate = document.querySelector("#previewTagsTemplate").content;
const previewTagsContainer = document.querySelector("#previewTagsContainer");

// declare mediaArray
let mediaArray = [];
let tagArray = [];

function previewMedia() {
  if (mediaArray.length === 3) {
    mediaError.innerText = "Maximum 3 images";
    mediaInput.value = "";
    return;
  }

  let mediaUrl = mediaInput.value;
  if (mediaUrl !== "") {
    mediaArray.push(mediaUrl);
  }
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
        removeMedia(i, mediaArray, previewFlexContainer);
      });
    });
    mediaInput.value = "";
  }
}

function removeMedia(iteration, array, container) {
  array.splice(iteration, 1);
  container.innerHTML = "";
  previewMedia();
  previewTags();
}

function previewTags() {
  if (tagInput.value !== "") {
    tagArray.push(tagInput.value);
  }
  previewTagsContainer.innerHTML = "";
  for (let i = 0; i < tagArray.length; i++) {
    const tagClone = document.importNode(previewTagsTemplate, true);
    const tagsPar = tagClone.querySelector("#previewTagsPar");
    tagsPar.innerHTML = `${tagArray[i]}`;
    previewTagsContainer.appendChild(tagClone);
    // Remove buttons
    const removeTags = document.querySelectorAll("#removeTagsButton");
    removeTags.forEach((button) => {
      button.addEventListener("click", () => {
        removeMedia(i, tagArray, previewTagsContainer);
      });
    });
  }
  tagInput.value = "";
}

// Eventlistener
addMediaButton.addEventListener("click", previewMedia);
addTagsButton.addEventListener("click", previewTags);
