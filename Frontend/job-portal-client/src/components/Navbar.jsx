import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../Firebase/firebase.config";
import Logout from "./Logout";
import { useContext } from "react";
import { ResultContext } from "../Context/ResultContext";

const Navbar = ({ resultAck }) => {
  const { setResultAck } = useContext(ResultContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
  ];

  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  const handleLogin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        alert("Login Successfull!");
        setResultAck(result.user);
        localStorage.setItem(
          "Users",
          JSON.stringify({
            name: user.displayName,
            email: user.email,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-24">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center text-2xl text-black">
          <img src="/images/joblogo.jpg" className="h-12 w-12" alt="" />
          <span>HireNest</span>
        </a>

        {/* nav-items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* signup and login btn */}
        {resultAck ? (
          <div className="sm:hidden hidden md:block">
            {" "}
            <Logout />
          </div>
        ) : (
          <div className="text-base text-primary font-medium space-x-5 hidden lg:flex">
            <p
              className="py-2 px-5 border rounded cursor-pointer"
              onClick={handleLogin}
            >
              Log in
            </p>
            <Link
              to="/sign-up"
              className="py-2 px-5 border rounded bg-blue text-white"
            >
              Sign up
            </Link>
          </div>
        )}

        {/* mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBars className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* navitems for mobile */}
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          {resultAck ? (
            <li className="text-white">
              <Logout />
            </li>
          ) : (
            <li className="text-white py-1 cursor-pointer">
              <p onClick={handleLogin}>Log in</p>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
