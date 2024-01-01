import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import process from "process";

const AdminRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.email);
  return currentUser.email === import.meta.env.admin ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};

export default AdminRoute;
