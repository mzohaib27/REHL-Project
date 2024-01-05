const express = require("express");

const listingRouter = express.Router();
const ListingController = require("../Controllers/ListingController.js");
const bodyParser = require("body-parser");
const UrlEncodedParser = bodyParser.urlencoded({ extended: true });
const verifyUser = require("../utils/verifyUser.js");

listingRouter.post(
  "/createlisting",
  [UrlEncodedParser, verifyUser.verifyToken],
  ListingController.addnewProperty
);
listingRouter.get(
  "/getlisting/:id",
  verifyUser.verifyToken,
  ListingController.getlistings
);
listingRouter.delete(
  "/delete/:id",
  verifyUser.verifyToken,
  ListingController.deleteListing
);

module.exports = listingRouter;
