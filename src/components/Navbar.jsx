import React, { useState, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const isAdmin = useRef(false);
  const navigate = useNavigate();
  
  const userData = JSON.parse(window.localStorage.getItem("LOGIN_DATA"));
  const role = userData.role;
  if (role === "USER") {
    isAdmin.current = false;
  } else {
    isAdmin.current = true;
  }

  const handleLogin = () => {
    setLogin(!isLogin);
    if (!isLogin) {
      window.onbeforeunload = function () {
        localStorage.clear();
      };
    }
    navigate("/login");
  };

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">
        <Link to="/">Al-Kareem</Link>
      </h1>
      <ul className="hidden md:flex ">
        <li className="p-4">
          <Link to="/">Home</Link>
        </li>
        {isAdmin.current ? (
          <li className="p-4">
            <Link to="/admin">Admin</Link>
          </li>
        ) : (
          <li className="p-4">
            <Link to="/explore">Explore</Link>
          </li>
        )}
        <li className="p-4">
          <Link to="/profile">Profile</Link>
        </li>
        <li
          className="p-4 font-bold text-red-500 hover:text-red-700"
          onClick={handleLogin}
        >
          <Link>Logout</Link>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed left-[-100%]"
            : "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          <Link to="/">Al-Kareem</Link>
        </h1>
        <ul className="upercase p-4">
          <li className="p-4 border-b border-gray-600">
            <Link to="/">Home</Link>
          </li>
          {isAdmin.current ? (
            <li className="p-4 border-b border-gray-600">
              <Link to="/admin">Admin</Link>
            </li>
          ) : (
            <li className="p-4 border-b border-gray-600">
              <Link to="/admin">Explore</Link>
            </li>
          )}
          <li className="p-4">Search</li>
        </ul>
        <ul className="w-full upercase p-4 absolute bottom-0">
          <li className="p-4 border-t border-gray-600">
            <Link to="/profile">Profile</Link>
          </li>
          <li
            className="p-4 border-t border-t-gray-600 font-bold text-red-500 hover:text-red-700"
            onClick={handleLogin}
          >
            <Link>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
