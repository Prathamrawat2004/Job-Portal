import React from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";

const NewsLetter = () => {
  return (
    <div>
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for Jobs
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          aut.
        </p>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@gmail.com"
            className="w-full block py-2 pl-3 border"
          />
          <button type="submit" className="w-full block mt-2 rounded-sm cursor-pointer py-2 pl-3 border bg-blue text-white">Subscribe</button>
        </div>
      </div>

      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed faster
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          aut.
        </p>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@gmail.com"
            className="w-full block py-2 pl-3 border"
          />
          <button type="submit" className="w-full block mt-2 rounded-sm cursor-pointer py-2 pl-3 border bg-blue text-white">Upload your resume</button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
