import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-gray-200 flex flex-col items-center gap-8 px-4 md:px-16 pt-20 pb-6 mt-24 rounded-t-2xl shadow-lg"
      id="footer"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
        <div className="flex flex-col items-start gap-4">
          <img src={assets.logo} alt="Logo" className="w-36 mb-2" />
          <p className="text-gray-400 text-base leading-relaxed">
            Choose from a diverse menu featuring a delectable array of dishes.
            Our mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <div className="flex gap-3 mt-2">
            <img
              src={assets.facebook_icon}
              alt="Facebook"
              className="w-8 hover:scale-110 transition-transform cursor-pointer"
            />
            <img
              src={assets.twitter_icon}
              alt="Twitter"
              className="w-8 hover:scale-110 transition-transform cursor-pointer"
            />
            <img
              src={assets.linkedin_icon}
              alt="LinkedIn"
              className="w-8 hover:scale-110 transition-transform cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-lg font-bold text-white mb-2">COMPANY</h2>
          <ul className="flex flex-col gap-2">
            <li className="text-gray-400 hover:text-primary cursor-pointer transition">
              Home
            </li>
            <li className="text-gray-400 hover:text-primary cursor-pointer transition">
              About us
            </li>
            <li className="text-gray-400 hover:text-primary cursor-pointer transition">
              Delivery
            </li>
            <li className="text-gray-400 hover:text-primary cursor-pointer transition">
              Privacy policy
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-lg font-bold text-white mb-2">GET IN TOUCH</h2>
          <ul className="flex flex-col gap-2">
            <li className="text-gray-400">+1-212-456-789</li>
            <li className="text-gray-400">contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full max-w-7xl border-gray-700 my-6" />
      <p className="text-gray-400 text-sm text-center font-normal">
        Copyright 2024 © Tomato.com - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
