const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
app.use(express.json());
// Database Connection
require(path.join(__dirname, "./DB/Mongodb.js"));

app.use(cookieParser());
app.use(cors());
// console.log(path.join(__dirname));
const Port = process.env.PORT;
app.use("/server", require(path.join(__dirname, "/Routers/UserRoutes.js")));
app.use(
  "/server/auth",
  require(path.join(__dirname, "/Routers/authRoutes.js"))
);
app.use(
  "/server/listing",
  require(path.join(__dirname, "/Routers/ListingRoute.js"))
);
app.listen(Port, () => {
  console.log("Server is running on port " + Port + " Successfully");
});

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

app.use((err, req, res, next) => {
  console.error(err); // Log the error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
