import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="flex flex-col space-y-4 w-full h-[80vh] items-center justify-center">
        <h1 className="py-4 px-12 rounded-lg bg-gray-200">
          <span className="text-red-600 italic text-4xl">oops !!!</span> An
          error occured
        </h1>
        <Link to={"/"}>
          <button className="hover:text-blue-700 trans-eff bg-gray-200 px-4 py-2 rounded-lg">
            Go to Home Page
          </button>
        </Link>
      </div>
    </>
  );
};

export default Error;
