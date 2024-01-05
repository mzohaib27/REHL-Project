import React from "react";
import { useSelector } from "react-redux";

const Listing = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser._id);

  return (
    <div>
      <h1>This is listing Page</h1>
    </div>
  );
};

export default Listing;
