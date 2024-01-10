const express = require("express");

const listingRouter = express.Router();
const ListingController = require("../Controllers/ListingController.js");
const bodyParser = require("body-parser");
const UrlEncodedParser = bodyParser.urlencoded({ extended: true });
const verifyUser = require("../utils/verifyUser.js");

listingRouter.post(
  "/createlisting",
  // [UrlEncodedParser, verifyUser.verifyToken],
  UrlEncodedParser,
  ListingController.createListing
);
listingRouter.get(
  "/getlisting",
  // verifyUser.verifyToken,
  ListingController.getlistings
);
listingRouter.get(
  "/getlisting/:id",
  // verifyUser.verifyToken,
  ListingController.getListingsById
);
listingRouter.delete(
  "/delete/:id",
  // verifyUser.verifyToken,
  ListingController.deleteListing
);
listingRouter.post(
  "/updatelisting/:id",
  // UrlEncodedParser,
  ListingController.updateListing
);

module.exports = listingRouter;
