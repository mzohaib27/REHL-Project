import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Listing = () => {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({});
  const params = useParams();
  //   console.log(itemData);
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

  //   Delete

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/server/listing/delete/${itemData._id}`,
        {
          method: "DELETE",
        }
      );
      console.log("function called");
      const data = await res.json();
      navigate("/");
      res.status(200).json(data);
    } catch (error) {}
  };
  return (
    <div className="md:flex w-full px-6 md:px-12 lg:px-24 py-4 md:py-6 lg:py-12 space-y-4">
      <div className="flex md:w-1/2 rounded-lg">
        <img
          src={itemData.imageUrls}
          alt=""
          className="w-full lg:h-[30rem] rounded-lg"
        />
      </div>
      <div className="flex md:w-1/2 flex-col p-4 lg:px-6  lg:py-4 space-y-4">
        <h1 className="text-xl lg:text-3xl font-bold ">
          Owner : {itemData.title}
        </h1>
        <p className="text-base md:text-xl font-sans">
          Description : {itemData.description}
        </p>
        <h1 className="text-lg">Address : {itemData.address}</h1>
        <p className="text-base md:text-xl font-bold">
          Bed rooms : {itemData.bedrooms}
        </p>
        <p className="text-base md:text-xl font-bold">
          Bath rooms : {itemData.bathrooms}
        </p>
        <p className="text-base md:text-xl font-bold">
          Price : $ {itemData.regularPrice}
        </p>

        <p className="text-xl font-bold">Type : {itemData.type}</p>
        <div className="md:flex space-y-2 gap-6">
          <Link className="w-full" to={`/update/listing/${itemData._id}`}>
            <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 trans-eff">
              Edit
            </button>
          </Link>

          <div className="w-full">
            <button
              onClick={handleDeleteUser}
              className="w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 trans-eff"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
