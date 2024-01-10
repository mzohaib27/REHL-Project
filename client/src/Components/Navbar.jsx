import React, { useState } from "react";

import { FaSearch, FaRegUserCircle, FaBars } from "react-icons/fa";
import { Styles } from "../constants/Styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutFailed,
  signOutStart,
  signOutSuccess,
} from "../Redux/user/userSlice";

const Navbar = () => {
  const [showBtn, setShwoBtn] = useState(false);
  const show = () => {
    setShwoBtn(!showBtn);
    console.log("function Called");
  };

  // LogOut Functionality
  const navigate = useNavigate();
  // Accessing Redux State By useSelector
  const { currentUser } = useSelector((state) => state.user);
  // initializing UseDispatch
  const dispatch = useDispatch();

  // SignOut Function
  const SignOutBtnHandler = async (e) => {
    e.preventDefault();
    dispatch(signOutStart());
    try {
      setShwoBtn(false);

      const res = await fetch("http://localhost:8000/server/auth/signout");
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signOutFailed(data.message));
        return;
      }
      dispatch(signOutSuccess(data));

      console.log("before navigate");
      navigate("/signin");
      console.log("after navigate");
    } catch (error) {
      dispatch(signOutFailed(error.message));
      console.log("Error happened while logout Err : " + error);
    }
  };

  // end
  return (
    <div
      className={`${Styles.paddingX} ${Styles.paddingY} flex shadow-2xl shadow-gray-700 justify-between items-center bg-gray-200`}
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
      <div className="hidden relative lg:flex space-x-4 items-center">
        <Link to={"/"}>
          {" "}
          <button className="nav-btn px-4 py-2">Home</button>
        </Link>
        <Link to={"/about"}>
          {" "}
          <button className="nav-btn px-4 py-2">About</button>
        </Link>
        {currentUser ? (
          <Link to={"/createlisting"}>
            <button className="nav-btn px-4 py-2">Create Listing</button>
          </Link>
        ) : (
          ""
        )}
        {!currentUser ? (
          <Link to={"/signin"}>
            <FaRegUserCircle className="w-10 h-9 nav-btn" />
          </Link>
        ) : (
          <button onClick={show}>
            {" "}
            <div>
              <img src={currentUser.photo} className="w-10 h-10 nav-btn" />
            </div>
          </button>
        )}
      </div>
      <div className="flex lg:hidden">
        <FaBars className="w-6 h-6 hover:shadow-xl hover:shadow-white" />
      </div>
      {showBtn ? (
        <div className="flex absolute right-10 top-24 px-6 py-4 rounded-lg bg-gray-600 text-white">
          <button onClick={SignOutBtnHandler}>Log Out</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
