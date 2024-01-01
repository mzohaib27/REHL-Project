const express = require("express");
const authrouter = express.Router();
const authController = require("../Controllers/authController.js");
const bodyParser = require("body-parser");
const UrlEncodedParser = bodyParser.urlencoded({ extended: true });

authrouter.post("/signup", UrlEncodedParser, authController.signup);
authrouter.post("/signin", UrlEncodedParser, authController.signin);
authrouter.post("/google", UrlEncodedParser, authController.signInGoogle);
authrouter.get("/signout", authController.signout);

module.exports = authrouter;
