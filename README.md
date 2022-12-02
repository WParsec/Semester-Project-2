# Semester Project 2nd Year - Gavelbay

## Introduction

This is my semester project for 2nd year at Noroff Front-end development.
We were given the task to create an auction website from start to finish with design and theme of own choice - over the course of 5 weeks.
For market relevance, I decided to create an NFT auction website.

## Assignment Brief

An auction site is looking to launch a website where users can add items to be bid on and bid on items other users have put up for auction.

When a new user joins the website, they are given 1000 credits to use on the site. They can get credits by selling items and use credit by buying items. Non-registered users can search through the listings, but only registered users can make bids on listings.

## User stories

The client has specified the following requirements in the form of User Stories:

- A user with a stud.noroff.no email may register
- A registered user may login
- A registered user may logout
- A registered user may update their avatar
- A registered user may view their total credit
- A registered user may create a Listing with a title, deadline date, media gallery and description
- A registered user may add a Bid to another user’s Listing
- A registered user may view Bids made on a Listing
- A registered user may use credit to make a Bid on another user’s Listing
- An unregistered user may search through Listings

## Frameworks

### Tailwindcss

Project uses tailwindcss as CSS framework and compiles from /src/css/styles.css to
/dist/styles.css

## Dependencies & configurations

### Dependencies

- "eslint"
- "husky"
- "lint-staged"
- "prettier"
- "tailwindcss"

### Configurations

- Project is configured to run prettier on all files on-save except tailwind.config.js
- Project is configured to run eslint as pre-commit hook

## Gitignore

### Following files are .gitignored

- /node_modules
- .eslintrc.json
- .husky
- .vscode
