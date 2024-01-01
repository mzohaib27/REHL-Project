const mongoose = require("mongoose");

const dbConnect = mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Succesfully...");
  })
  .catch((err) => {
    console.log("An error occured while connecting Database..." + err);
  });

module.exports = dbConnect;
