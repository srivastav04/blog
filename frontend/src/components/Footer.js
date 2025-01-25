import React from "react";

const Footer = () => {
  return (
    <footer className="footer p-5 bg-base-200 text-base-content">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-14 ">
        {/* Name and Role */}
        <div>
          <p className="font-sans text-gray-800 dark:text-white">
            Srivastav Kancharala
          </p>
          <p className="font-sans text-gray-800 dark:text-white">Developer</p>
        </div>

        {/* Email */}
        <div className="flex justify-center items-center sm:justify-start mt-4 sm:mt-0">
          <i className="fa-solid fa-envelope fa-2xl mr-2"></i>
          <p className="font-sans text-gray-800 dark:text-white">
            Srivastav@Gmail.com
          </p>
        </div>

        {/* LinkedIn */}
        <div className="flex justify-center items-center sm:justify-start mt-4 sm:mt-0">
          <i className="fa-brands fa-2xl fa-linkedin mr-2"></i>
          <p className="font-sans text-gray-800 dark:text-white">Sri Vastav</p>
        </div>

        {/* GitHub */}
        <div className="flex justify-center items-center sm:justify-start mt-4 sm:mt-0">
          <i className="fa-brands fa-2xl fa-github mr-2"></i>
          <p className="font-sans text-gray-800 dark:text-white">
            Srivastav_04
          </p>
        </div>

        {/* Instagram */}
        <div className="flex justify-center items-center sm:justify-start mt-4 sm:mt-0">
          <i className="fa-brands fa-2xl fa-instagram mr-2"></i>
          <p className=" font-sans text-gray-800 dark:text-white">
            Srivastav5119
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
