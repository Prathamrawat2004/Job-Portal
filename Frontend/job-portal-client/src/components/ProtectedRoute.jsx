import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ResultContext } from "../Context/ResultContext";

const ProtectedRoute = ({ children }) => {
  const { resultAck } = useContext(ResultContext);
  return resultAck ? children : <Navigate to="/sign-up" />;
};

export default ProtectedRoute;
