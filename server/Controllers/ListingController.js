const ListingModel = require("../Models/ListingModel.js");
const { errorHandler } = require("../utils/errorHandler.js");

exports.addnewProperty = async (req, res, next) => {
  console.log("Add Property Function is called");

  try {
    const addListing = await ListingModel.create(req.body);
    res.status(201).json(addListing);
  } catch (error) {
    next(
      errorHandler(400, "error while listing error : " + error.message, next)
    );
  }
};
