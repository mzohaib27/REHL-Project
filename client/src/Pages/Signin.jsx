import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailed,
} from "../Redux/user/userSlice";
import Oauth from "../Components/Oauth";

const Signin = () => {
  // initializing useNavigate
  const navigate = useNavigate();
  // initializing useDispatch
  const dispatch = useDispatch();

  // UseState for inputs
  const [formData, setFormData] = useState({});
  const { error, loading, currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailed(data.message));
        console.error(error);
        console.log(data.statusCode);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailed(error.message));
      console.error(error);
    }
  };

  return (
    <div className="  h-[90vh]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 mx-auto px-6 rounded-lg bg-gray-400 my-16 py-12 justify-center w-64 md:w-96 hover:shadow-2xl hover:shadow-gray-900 trans-eff">
          <h1 className="text-3xl font-bold text-center">Sign IN</h1>
          {error && <p className="py-4 text-red-600 font-semibold">{error}</p>}

          <input
            type="email"
            id="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-gray-700 hover:bg-gray-800 trans-eff text-white rounded-lg py-2 px-4"
          >
            {loading ? "Loading..." : "Sign IN"}
          </button>
          <Oauth />

          <div className="flex space-x-2">
            <h1>Don't have an account </h1>
            <Link to={"/signup"}>
              <span className="text-blue-700 hover:underline">Sign UP</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
