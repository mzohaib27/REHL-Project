const express = require("express");
const path = require("path");
const Router = express.Router();
const bodyParser = require("body-parser");
const UrlEncodedParser = bodyParser.urlencoded({ extended: true });
const UserController = require(path.join(
  __dirname,
  "../Controllers/UserController.js"
));

const verifyUser = require(path.join(__dirname, "../utils/verifyUser.js"));

Router.get("/", UserController.test);
Router.post(
  "/update/:id",
  [UrlEncodedParser, verifyUser.verifyToken],
  UserController.updateUser
);
Router.post(
  "/delete/:id",
  [UrlEncodedParser, verifyUser.verifyToken],
  UserController.deleteUser
);

module.exports = Router;
