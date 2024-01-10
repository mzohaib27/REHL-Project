const { errorHandler } = require("./errorHandler");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const Token = req.cookies.access_token;
  console.log("The token is " + Token);

  if (!Token) return errorHandler(401, "User not verified....", next);

  jwt.verify(Token, process.env.JWT_SEC, (err, userinfo) => {
    if (err) {
      errorHandler(403, "Forbidden");
      console.log("Token verification failed:", err);
    }
    // if there is no any error
    req.user = userinfo;
    console.log("Token verified. User:", user);
    next();
  });
};
