"use client"

import { useState } from 'react';

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id="toggle"
            className="sr-only"
            checked={isChecked}
            onChange={handleToggle}
          />
          <div
            className={`w-10 h-4 bg-gray-300 rounded-full shadow-inner ${
              isChecked ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
              isChecked ? 'translate-x-full' : 'translate-x-0'
            }`}
          ></div>
        </div>
        <span className="ml-3 text-gray-700 font-medium">Toggle</span>
      </label>
    </div>
  );
};

export default SignUp;