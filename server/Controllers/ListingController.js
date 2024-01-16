const ListingModel = require("../Models/ListingModel.js");
const { errorHandler } = require("../utils/errorHandler.js");

// Create Listing Function

exports.createListing = async (req, res, next) => {
  console.log("Add Property Function is called");

  try {
    const addListing = await ListingModel.create(req.body);
    res.status(201).json(addListing);
  } catch (error) {
    next(errorHandler(400, "error while listing error : " + error.message));
  }
};

// Get all listings Function
exports.getlistings = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.search) {
      query = { description: { $regex: new RegExp(req.query.search, "i") } };
    }
    const listings = await ListingModel.find(query);
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

// Get listing by id Function

exports.getListingsById = async (req, res, next) => {
  try {
    const listingData = await ListingModel.findOne({ _id: req.params.id });
    res.status(200).json(listingData);
  } catch (error) {
    console.log("Eror while getlisting by id: Error : " + error);
  }
};
// Delete User Listings Function
exports.deleteListing = async (req, res, next) => {
  // const listingData = await ListingModel.findById(req.params.id);
  // if (!listingData) {
  //   return next(errorHandler(404, "Listing Not Found"));
  // }
  // if (req.user.id !== listingData.userRef) {
  //   return next(errorHandler(401, "You can delete only your own listings"));
  // }
  try {
    const listingData = await ListingModel.findByIdAndDelete(req.params.id);
    res.status(200).json(listingData);
    console.log("Property Deleted Successfully...");
  } catch (error) {
    errorHandler(404, "deleteListing function failed...Error is : " + error);
  }
};

exports.updateListing = async (req, res, next) => {
  try {
    const updatedList = await ListingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json("updated list failed...Error is : " + error);
  }
};
