import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Oauth from "../Components/Oauth";
import { fetchWithBaseURL } from "../utils/fetch-url";

const Signup = () => {
  // initializing useNavigate
  const navigate = useNavigate();

  // UseState for inputs
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const res = await fetchWithBaseURL("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        console.error(error);
        console.log(data.statusCode);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className=" h-[90vh]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 mx-auto px-6 rounded-lg bg-gray-400 my-16 py-12 justify-center w-64 md:w-96 hover:shadow-2xl hover:shadow-gray-900 trans-eff">
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>
          {error && <p className="py-4 text-red-600 font-semibold">{error}</p>}
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="px-4 py-2 rounded-lg"
            onChange={handleChange}
          />
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
            {loading ? "Loading..." : "Sign UP"}
          </button>
          <Oauth />

          <div className="flex space-x-2">
            <h1>Already have an account </h1>
            <Link to={"/signin"}>
              <span className="text-blue-700 hover:underline">Sign in</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
