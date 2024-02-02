import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-gray-200 py-6 text-center">
      <div className="text-center">
        <h1 className="text-base md:text-xl ">
          All Rights Reserved &copy; Real Estate Holding Company LLC
        </h1>
      </div>
      <div>
        <Link to={"/about"}>
          <button className="px-2  border-r-2 border-gray-900 hover:text-gray-500 trans-eff">
            About
          </button>
        </Link>
        <Link to={"/contact"}>
          <button className="px-2  border-r-2 border-gray-900 hover:text-gray-500 trans-eff">
            Contact
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
