import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
