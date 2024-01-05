const ListingModel = require("../Models/ListingModel.js");
const { errorHandler } = require("../utils/errorHandler.js");

exports.addnewProperty = async (req, res, next) => {
  console.log("Add Property Function is called");

  try {
    const addListing = await ListingModel.create(req.body);
    res.status(201).json(addListing);
  } catch (error) {
    next(errorHandler(400, "error while listing error : " + error.message));
  }
};

exports.getlistings = async (req, res, next) => {
  console.log("getListing route is called");
  console.log(req.user.id);
  if (req.user.id === req.params.id) {
    try {
      const listings = await ListingModel.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(401, "You can only see your own listings..."));
  }
};
// Delete User Listings Function
exports.deleteListing = async (req, res, next) => {
  const listingData = await ListingModel.findById(req.params.id);
  if (!listingData) {
    return next(errorHandler(404, "Listing Not Found"));
  }
  if (req.user.id !== listingData.userRef) {
    return next(errorHandler(401, "You can delete only your own listings"));
  }
  try {
    await ListingModel.findByIdAndDelete(req.params.id);
    res.status(200).json(listingData);
    console.log("Property Deleted Successfully...");
  } catch (error) {
    next(errorHandler(404, "deleteListing function failed..."));
  }
};
