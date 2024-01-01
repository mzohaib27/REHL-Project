import React from "react";

const Btn = ({ type }) => {
  return (
    <button className="rounded-lg w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 tran-eff">
      {type}
    </button>
  );
};

export default Btn;
