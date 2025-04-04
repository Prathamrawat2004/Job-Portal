import React, { useContext } from "react";
import { ResultContext } from "../Context/ResultContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
 const { setResultAck } = useContext(ResultContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      setResultAck({
        user: null,
      });
      alert("Loggedout successfully!");
      navigate("/");
      setTimeout(() => {
        localStorage.removeItem("Users");
        window.location.reload();
      }, 2000);
    } catch (error) {
      alert("Couldn't log out!");
    }
  };
  return (
    <div
      className="lg:py-2 lg:px-5 lg:border lg:rounded cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
};

export default Logout;
