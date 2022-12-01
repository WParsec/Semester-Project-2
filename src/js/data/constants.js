// --------------- Url's ------------- //
export const baseUrl = "https://api.noroff.dev/api/v1";
export const allListingsUrl = "/auction/listings";
export const sellerFlag = "?_seller=true&_bids=true";
export const registerUrl = "/auction/auth/register";
export const loginUrl = "/auction/auth/login";
export const profileUrl = "/auction/profiles/";
export const listingsFlag = "?_listings=true";

// --------------- DOM --------------- //

// Explore
export const searchListings = document.querySelector("#searchListings");
export const pageOf = document.querySelector("#pageOf");
export const pageTot = document.querySelector("#pageTot");

// Profile
export const logOutButton = document.querySelector("#logOutButton");
export const editAvatarButton = document.querySelector("#editAvatarButton");
export const profileUsername = document.querySelector("#profileUsername");

// Register & login
export const form = document.querySelector("#registerForm");
export const name = document.querySelector("#name");
export const email = document.querySelector("#email");
export const password = document.querySelector("#password");
export const repeatPassword = document.querySelector("#repeatPassword");
export const formError = document.querySelector("#formError");
export const loginForm = document.querySelector("#loginForm");
