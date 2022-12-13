import { toggleMenu } from "../ui/nav/toggleMenu.js";
import { hideShowLi } from "../ui/hideShowLi.js";
import { letterCounter } from "../utils/letterCounter.js";
import { allListingsUrl, baseUrl, formError } from "../data/constants.js";
import { createHeaderWithInputs } from "../headers/headers.js";
import { standardFetch } from "../fetch/fetch.js";

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

const form = document.querySelector("#createListingForm");
const description = document.querySelector("#description");

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
    previewMediaDiv.innerHTML = `<img class="w-full object-cover" src="${mediaArray[i]}" alt="preview image">`;
    previewFlexContainer.appendChild(previewClone);
    const removeButtons = document.querySelectorAll("#removeMediaButton");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        console.log(i);
        removeMedia(i, mediaArray, previewFlexContainer, previewMedia);
      });
    });
    mediaInput.value = "";
  }
}

function removeMedia(iteration, array, container, preview) {
  array.splice(iteration, 1);
  container.innerHTML = "";
  preview();
}

function previewTags() {
  if (!tagInput.validity.valid) {
    document.querySelector("#tagError").innerText = tagInput.title;
    tagInput.value = "";
    return;
  }
  if (tagInput.value !== "") {
    tagArray.push(tagInput.value);
    document.querySelector("#tagError").innerText = "";
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
        removeMedia(i, tagArray, previewTagsContainer, previewTags);
      });
    });
  }
  tagInput.value = "";
}

// Eventlistener
addMediaButton.addEventListener("click", previewMedia);
addTagsButton.addEventListener("click", previewTags);
description.addEventListener("keyup", () => {
  letterCounter(description);
});

// On submit

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createListing(event);
});

async function createListing(event) {
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  const accessToken = localStorage.getItem("accessToken");
  if (mediaArray.length === 0) {
    formError.innerText = "Image is required";
    return;
  }
  values.tags = tagArray;
  values.media = mediaArray;
  if (tagArray.length === 0) {
    delete values.tags;
  }
  try {
    standardFetch(baseUrl + allListingsUrl, createHeaderWithInputs(values, accessToken));
    form.reset();
    tagArray = [];
    mediaArray = [];
    previewMedia();
    previewTags();
    formError.className = "text-dark-green";
    formError.innerText = "Published";
  } catch (e) {
    formError.className = "text-warning";
    formError.innerText = e;
  }
}
