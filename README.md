# Semester Project 2nd Year - Gavelbay

## Introduction

This is my semester project for 2nd year at Noroff Front-end development.
We were given the task to create an auction website from start to finish with design and theme of own choice - over the course of 5 weeks.
For market relevance, I decided to create an NFT auction website.

## Initializing and running the project

- Clone the project and initialize git in your code editor

```
 git clone https://github.com/WParsec/Semester-Project-2.git
```

- Install Dependencies

```
 npm install
```

- Start the project with live-server

```
 npm run start
```

### Deployment

- Project is configured to run deployment to Github pages on push to branch "Main"
  [![Deploy static content to Pages](https://github.com/WParsec/Semester-Project-2/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/WParsec/Semester-Project-2/actions/workflows/pages.yml)

- Project link: https://wparsec.github.io/Semester-Project-2/

## Assignment Brief

An auction site is looking to launch a website where users can add items to be bid on and bid on items other users have put up for auction.

When a new user joins the website, they are given 1000 credits to use on the site. They can get credits by selling items and use credit by buying items. Non-registered users can search through the listings, but only registered users can make bids on listings.

## User stories

The client has specified the following requirements in the form of User Stories:

- A user with a stud.noroff.no email may register :white_check_mark:
- A registered user may login :white_check_mark:
- A registered user may logout :white_check_mark:
- A registered user may update their avatar :white_check_mark:
- A registered user may view their total credit :white_check_mark:
- A registered user may create a Listing with a title, deadline date, media gallery and description :white_check_mark:
- A registered user may add a Bid to another user’s Listing :white_check_mark:
- A registered user may view Bids made on a Listing :white_check_mark:
- A registered user may use credit to make a Bid on another user’s Listing :white_check_mark:
- An unregistered user may search through Listings :white_check_mark:

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
- "live-server"

### Configurations

- Project is configured to run prettier on all files on-save except tailwind.config.js
- Project is configured to run eslint --fix as pre-commit hook

#### Following files are .gitignored

- /node_modules
- .eslintrc.json
- .husky
- .vscode
- .eslintcache

#### Eslint configurations

- rules: No undefined: "Off"
  This is due to eslint giving undefined errors of node imports that are used to build site using template element.
