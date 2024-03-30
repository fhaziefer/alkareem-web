import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLogin(!isLogin)
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
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">Al-Kareem</h1>
      <ul className="hidden md:flex ">
        <li className="p-4">Home</li>
        <li className="p-4">Explore</li>
        <li className="p-4">Profile</li>
        <li className="p-4">About</li>
        <li
          className="p-4 font-bold text-red-500"
          onClick={() => handleLogin()}
        >
          Logout
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
          Al-Kareem
        </h1>
        <ul className="upercase p-4">
          <li className="p-4 border-b border-gray-600">Home</li>
          <li className="p-4 border-b border-gray-600">Explore</li>
          <li className="p-4">Search</li>
        </ul>
        <ul className="w-full upercase p-4 absolute bottom-0">
          <li className="p-4 border-t border-gray-600">Profile</li>
          <li
            className="p-4 border-t border-t-gray-600 font-bold text-red-500"
            onClick={() => handleLogin()}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
