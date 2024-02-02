import React, { useEffect, useState } from "react";
import { bgImage } from "../constants/constant";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Home = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let url = "http://localhost:8000/server/listing/getlisting";
      if (searchTerm) {
        url += `?search=${searchTerm}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setAllData(data);
    };
    fetchData();
  }, [searchTerm]);
  // console.log(allData);
  return (
    <div className="flex flex-col">
      <div className="lg:flex   w-full px-6 md:px-20 lg:px-24 py-6 md:py-12 lg:py-16 ">
        <div className="lg:flex sm:flex-col w-full lg:w-2/4">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-blue-600">
            Real Estate Holding <span className="text-red-600">Comapany </span>
            LLC
          </h1>
          <p className="text-xl font-semibold italic text-gray-700 py-12 pr-4">
            We As A Leading Real Estate Holding Company, Connects Buyers And
            Sellers Over An Interactive Properties and Residencies For Improved
            Decision Making And Transparency In The Entire Process.
          </p>
        </div>
        <div className="lg:w-2/4">
          <img
            src={bgImage}
            alt="image"
            className="bg-cover w-full h-auto hover:scale-110 trans-eff cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col px-6  md:px-20 lg:px-24 py-6 md:py-12 lg:py-16 ">
        <div className="md:flex md:justify-between py-6 ">
          <h1 className="text-2xl lg:text-3xl font-bold italic">
            All you want is <span className="text-red-600">HERE</span>
          </h1>
          <div className="flex my-4 relative">
            <input
              className=" rounded-lg  bg-gray-200 p-3   w-64 lg:w-72 border-none focus:outline-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {allData.map((items, i) => (
            <div key={i} className="bg-gray-200 flex flex-col">
              <div>
                <Link to={`/listing/${items._id}`}>
                  <img
                    src={items.imageUrls[0]}
                    alt="phot"
                    className="w-full h-72 rounded-lg bg-cover hover:scale-105 trans-eff"
                  />
                </Link>
              </div>
              <h1 className="text-xl font-semibold py-2 px-2">
                {items.description}
              </h1>
              <p className="text-xl font-semibold  py-2 px-2">
                Type : {items.type}
              </p>
              <p className="text-xl font-semibold  py-2 px-2">
                Price : $<span className="font-bold">{items.regularPrice}</span>
              </p>
              <Link to={`/listing/${items._id}`}>
                <button className="px-4 py-2 mb-4 mx-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 trans-eff">
                  Explore More
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
