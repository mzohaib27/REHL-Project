const path = require("path");
const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../Models/UserModel.js");
const { ReturnDocument } = require("mongodb");
const { errorHandler } = require("../utils/errorHandler.js");

exports.test = (req, res) => {
  res.send("This is test Page");
};

exports.updateUser = async (req, res, next) => {
  console.log("user update functionality starts...");
  // console.log(req.user);
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account..."));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 12);
    }
    console.log("req.user.id is .. " + req.user.id);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser;

    res.send(rest._doc);
    console.log(rest._doc);
  } catch (error) {
    console.log("something went wrong while updating..." + error);
    next(errorHandler(401, "update gone wrong...", next));
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "Unauthorized, you can delete only your own account.")
    );
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted done" });
  } catch (error) {
    next(404, error.message);
  }
};
