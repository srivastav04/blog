import React from "react";

const Footer = () => {
  return (
    <footer className="footer p-6 bg-base-200 text-base-content dark:bg-white flex flex-col">
      <div className="w-full">
        <p className="text-lg font-medium text-gray-800 dark:text-grey">
          Srivastav Kancharala
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Developer</p>
      </div>
      <div className="flex items-center space-x-2">
        <i className="fa-solid fa-envelope text-xl text-gray-600 dark:text-gray-300"></i>
        <p className="text-sm text-gray-800 dark:text-grey">
          srivastavkancharala@gmail.com
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-2">
        <div className="flex items-center space-x-2">
          <i className="fa-brands fa-linkedin text-xl text-blue-600 dark:text-blue-400"></i>
          <p className="text-sm text-gray-800 dark:text-grey">Sri Vastav</p>
        </div>
        <div className="flex items-center space-x-2">
          <i className="fa-brands fa-github text-xl text-gray-800 dark:text-grey"></i>
          <p className="text-sm text-gray-800 dark:text-grey">Srivastav_04</p>
        </div>
        <div className="flex items-center space-x-2">
          <i className="fa-brands fa-instagram text-xl text-pink-600"></i>
          <p className="text-sm text-gray-800 dark:text-grey">Srivastav5119</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
