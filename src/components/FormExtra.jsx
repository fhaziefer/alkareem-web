import React, { useState } from "react";

export default function FormExtra(){

  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
    if (!isChecked) {
      window.onbeforeunload = function () {
        localStorage.clear();
      };
    }
  };

    return(
        <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            checked= {!isChecked}
            onChange={handleOnChange}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
            Ingat saya
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-[#00df9a] hover:text-[#00a370]">
            Lupa password?
          </a>
        </div>
      </div>

    )
}