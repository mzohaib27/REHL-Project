const User = require("../Models/UserModel.js");
const { errorHandler } = require("../utils/errorHandler.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup Function

exports.signup = async (req, res, next) => {
  const CheckUser = await User.findOne({ email: req.body.email });
  if (CheckUser) {
    console.log(errorHandler(404, "user Already exist..."));
  }
  const newUser = await User(req.body);
  newUser
    .save()
    .then(() => {
      console.log("user registered...");
      res.status(200).send(req.body);
    })
    .catch((error) => {
      console.log("An error while registering new user .. " + err);
      next(error);
    });
};

// Signin Function

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email: email });
    if (!validUser) return errorHandler(404, "User Not Found...", next);
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return errorHandler(401, "Wrong Credentials", next);
    // if Email and Password Match Then create Token...
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SEC);
    const { password: pass, ...restInfo } = validUser._doc;
    // Save Token in Cookies...
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(restInfo);
  } catch (error) {
    errorHandler(500, "internal Server Error");
  }
};

// Google Signin Function

exports.signInGoogle = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SEC);
      const { password, ...restInfo } = user._doc;
      const saveCookie = res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restInfo);
      console.log(saveCookie);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 12);
      const newUser = new User({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        photo: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SEC);
      const { password, ...restInfo } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restInfo);
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

// SignOut Function

exports.signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out");
  } catch (error) {
    errorHandler(401, "Logout Failed due to error : " + error);
  }
};
