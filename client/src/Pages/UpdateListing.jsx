import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/firebaseConfig";

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [itemData, setItemData] = useState({});
  console.log(currentUser._id);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchedData = async () => {
      const listingId = params.listingId;
      // console.log(listingId);
      const res = await fetch(
        `http://localhost:8000/server/listing/getlisting/${listingId}`
      );
      const data = await res.json();
      setItemData(data);
    };
    fetchedData();
  }, []);

  console.log(itemData);

  // update functionality
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    description: "",
    address: "",
    type: "sale",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 500,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    userRef: currentUser._id,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [showListingErr, setShowListingErr] = useState(false);
  const [showListings, setShowListings] = useState([]);
  // handleImages
  const handleImages = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      setImageLoading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
          setImageLoading(false);
        })
        .catch((err) => {
          console.log("error is " + err);
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      console.log("You can only upload 6 images per listing");
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };
  // store images
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  // HandleRemoveImage Function
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  // HandleChange Function
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

    if (
      e.target.id === "bedrooms" ||
      e.target.id === "bathrooms" ||
      e.target.id === "regularPrice" ||
      e.target.id === "discountPrice"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: parseInt(e.target.value),
      });
    }
  };

  // HandleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (formData.regularPrice < formData.discountPrice)
        return setError("Discount Price must be lower than the regular Price");
      setLoading(true);
      setError(false);
      const listingId = params.listingId;
      console.log(listingId);

      const res = await fetch(
        `http://localhost:8000/server/listing/updatelisting/${listingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setError("Error on Data.success is : " + data.message);
      }
      setLoading(false);
      setError(false);
      setFormData({
        imageUrls: [],
        title: "",
        description: "",
        address: "",
        type: "sale",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 500,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
      });
      navigate(`/`);
      console.log(data._id);
    } catch (error) {
      setError("Error on HandleSubmit is " + error.message);
      setLoading(false);
    }
  };
  // delete user listing

  return (
    <>
      <div className=" flex flex-col items-center  space-y-4 h-auto py-12 bg-gray-100">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold italic py-6 text-center">
            Update Listing
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-2 ">
              <input
                onChange={handleChange}
                defaultValue={itemData.title}
                type="text"
                maxLength={50}
                minLength={5}
                required
                id="title"
                className="px-4 py-2 rounded-lg focus:outline-none"
                placeholder="Title"
              />
              <input
                onChange={handleChange}
                defaultValue={itemData.address}
                type="text"
                maxLength={200}
                minLength={20}
                required
                id="address"
                className="px-4 py-2 rounded-lg focus:outline-none "
                placeholder="Address"
              />
              <textarea
                onChange={handleChange}
                defaultValue={itemData.description}
                type="textarea"
                maxLength={1000}
                minLength={20}
                required
                id="description"
                className="px-4 py-2 rounded-lg focus:outline-none "
                placeholder="Description"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                  type="checkbox"
                  id="sale"
                  className="flex w-5"
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                  type="checkbox"
                  id="rent"
                  className="flex w-5"
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  checked={formData.parking}
                  type="checkbox"
                  id="parking"
                  className="flex w-5"
                />
                <span>Parkingspot</span>
              </div>
              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  checked={formData.furnished}
                  type="checkbox"
                  id="furnished"
                  className="flex w-5"
                />
                <span>Furnised</span>
              </div>
              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  checked={formData.offer}
                  type="checkbox"
                  id="offer"
                  className="flex w-5"
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <input
                    onChange={handleChange}
                    defaultValue={itemData.bedrooms}
                    min={1}
                    max={10}
                    type="number"
                    id="bedrooms"
                    className="px-4 py-2 w-24 rounded-lg focus:ouline-none "
                  />
                  <span>Beds</span>
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    onChange={handleChange}
                    defaultValue={itemData.bathrooms}
                    min={1}
                    max={6}
                    type="number"
                    id="bathrooms"
                    className="px-4 py-2 w-24 rounded-lg focus:ouline-none "
                  />
                  <span>Baths</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <input
                    onChange={handleChange}
                    defaultValue={itemData.regularPrice}
                    min={500}
                    max={1000000}
                    type="number"
                    id="regularPrice"
                    className="px-4 py-2 w-24 rounded-lg focus:ouline-none "
                  />
                  <h1>
                    Regular Price
                    {formData.type === "rent" ? (
                      <span>( $/month ) </span>
                    ) : (
                      <span> ( $/Fixed ) </span>
                    )}
                  </h1>
                </div>
                {formData.offer && (
                  <div className="flex gap-4 items-center">
                    <input
                      onChange={handleChange}
                      defaultValue={formData.discountPrice}
                      min={0}
                      max={100000}
                      type="Number"
                      id="regularprice"
                      className="px-4 py-2 w-24 rounded-lg focus:ouline-none "
                    />
                    <h1>
                      Discounted Price
                      {formData.type === "rent" ? (
                        <span>( $/month ) </span>
                      ) : (
                        ""
                      )}
                    </h1>
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold">
                Images:{" "}
                <span className="text-base ">
                  The first image will be the cover ( max : 6 )
                </span>
              </p>
              <div className="flex  gap-4">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  type="file"
                  accept="images/*"
                  className="p-2 rounded-lg bg-gray-100 "
                  multiple
                  id="images"
                />
                <button
                  onClick={handleImages}
                  className="bg-transparent font-bold hover:bg-blue-700 text-blue-700 rounded-lg hover:text-white border border-blue-700  trans-eff px-6 py-1"
                  type="button"
                >
                  {uploading ? "Loading..." : "Upload"}
                </button>
              </div>
              <p className="text-red-600 text-base">{imageUploadError}</p>
              <div className="flex flex-col gap-4 my-6">
                {formData.imageUrls.map((imgUrl, i) => (
                  <div key={i} className="flex justify-between ">
                    <img
                      src={imgUrl}
                      className="w-20 h-20 rounded-lg object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className=" px-1 py-1 rounded-lg text-xl font-bold text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              disabled={loading || uploading}
              type="Submit"
              className="px-4 py-2 rounded-lg hover:bg-black bg-gray-900 trans-eff text-white w-full"
            >
              {loading ? "Updating..." : "Update"}
            </button>
            {error && <p className="text-red-500 text-xl ">{error}</p>}
          </form>
        </div>
      </div>
      {/* End Update */}
    </>
  );
};

export default UpdateListing;
