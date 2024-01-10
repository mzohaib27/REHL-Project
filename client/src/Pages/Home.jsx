import React, { useEffect, useState } from "react";
import { bgImage } from "../constants/constant";
import { Link } from "react-router-dom";
const Home = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:8000/server/listing/getlisting"
      );
      const data = await res.json();
      setAllData(data);
    };
    fetchData();
  }, []);
  // console.log(allData);
  return (
    <>
      <div className="flex  w-full px-32 py-16 h-[80vh]">
        <div className="flex flex-col w-2/4">
          <h1 className="text-5xl font-bold text-blue-600">
            Real Estate Holding <span className="text-red-600">Comapany</span>
            LLC
          </h1>
          <p className="text-xl font-semibold italic text-gray-700 py-12 pr-4">
            We As A Leading Real Estate Holding Company, Connects Buyers And
            Sellers Over An Interactive Properties and Residencies For Improved
            Decision Making And Transparency In The Entire Process.
          </p>
        </div>
        <div className="flex w-2/4">
          <img
            src={bgImage}
            alt="image"
            className="bg-cover w-full h-full hover:scale-110 trans-eff cursor-pointer"
          />
        </div>
      </div>
      <div className="px-24 py-12 flex flex-col">
        <div className="py-6 ">
          <h1 className="text-3xl font-bold italic">
            All you want is <span className="text-red-600">HERE</span>
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-12">
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
    </>
  );
};

export default Home;
