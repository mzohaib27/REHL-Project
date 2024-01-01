import React from "react";
import LogoImage from "../constants/constant";
import { FaSearch, FaRegUserCircle, FaBars } from "react-icons/fa";
import { Styles } from "../constants/Styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className={`${Styles.paddingX} ${Styles.paddingY} flex shadow-2xl shadow-gray-700 justify-between items-center bg-gray-300`}
    >
      <div className="flex space-x-4 items-center justify-center">
        <div className="flex">
          <Link to={"/"}>
            <h1
              className={`text-black hover:shadow-gray-700 hover:bg-white px-4 py-2 rounded-full italic ${Styles.HdTxt} hover:shadow-xl trans-eff`}
            >
              REHL
            </h1>
          </Link>
        </div>
      </div>
      {/* Middle */}
      <form className="hidden hover:shadow-xl trans-eff sm:flex pr-2 rounded-lg relative bg-gray-50 justify-center items-center">
        <input
          className=" rounded-lg bg-transparent p-3 w-24 sm:32 md:w-64 lg:w-72 border-none focus:outline-none"
          placeholder="Search..."
        />
        <FaSearch className="w-6 h-6  bg-transparent  cursor-pointer " />
      </form>
      {/* last */}
      <div className="hidden lg:flex space-x-4 items-center">
        <Link to={"/"}>
          {" "}
          <button className="nav-btn px-4 py-2">Home</button>
        </Link>
        <Link to={"/about"}>
          {" "}
          <button className="nav-btn px-4 py-2">About</button>
        </Link>
        <Link to={"/contact"}>
          {" "}
          <button className="nav-btn px-4 py-2">Contact</button>
        </Link>
        {!currentUser ? (
          <Link to={"/signin"}>
            {" "}
            <FaRegUserCircle className="w-10 h-9 nav-btn" />
          </Link>
        ) : (
          <Link to={"/profile"}>
            {" "}
            <div>
              <img src={currentUser.photo} className="w-10 h-10 nav-btn" />
            </div>
          </Link>
        )}
      </div>
      <div className="flex lg:hidden">
        <FaBars className="w-6 h-6 hover:shadow-xl hover:shadow-white" />
      </div>
    </div>
  );
};

export default Navbar;
