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

module.exports = listingRouter;
