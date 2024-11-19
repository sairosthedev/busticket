import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Save from "../../../assets/save.png";
import { FaCopy } from 'react-icons/fa';

const Offer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("MSC08")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.log('Failed to copy ', err));
  };

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 my-[8ch]">
      <div className="w-full flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Special Offer
        </h1>
        <Link
          to="/offer"
          className="text-zinc-400 hover:text-white transition duration-300"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="w-full h-auto rounded-sm bg-zinc-900 p-8 flex items-center gap-x-6 shadow-lg border border-zinc-800">
          <img src={Save} alt="Special Offer" className="w-52 aspect-[2/1] object-contain object-center rounded-sm shadow-md" />
          <div className="flex flex-1 flex-col space-y-5">
            <h1 className="text-2xl font-bold text-white">
              Get 30% off on your first booking
            </h1>
            <div className="flex items-center gap-x-4">
              <div className="w-fit border border-dashed px-4 py-1 border-zinc-700 bg-black rounded-sm flex items-center space-x-3">
                {copied ? (
                  <span className="text-green-500 font-medium">Code Copied!</span>
                ) : (
                  <span className="text-white font-semibold">MSC08</span>
                )}
              </div>
              <button
                onClick={handleCopy}
                className="text-2xl text-zinc-400 hover:text-white transition duration-300"
              >
                <FaCopy />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              Valid till: <span className="font-medium">13th November</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
