import React from 'react';
import { Link } from 'react-router-dom';

const PlanCard = ({ title, description, price, chooseText }) => {
  return (
    <div className="bg-[#1E1E1E] rounded-lg p-8 flex-1 min-w-[280px] mx-[1%] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#511F5C]/20 border border-transparent hover:border-[#511F5C]/20">
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <div className="text-[#b3b3b3] min-h-[55px] my-4 text-[15px] leading-relaxed">{description}</div>
      <div className="text-3xl font-semibold text-white">
        ${price}
        <span className="text-base text-[#b3b3b3]"> /month</span>
      </div>
      <div className="mt-6 space-y-3">
        <Link
          to="/manage-subscription"
          className="block w-full text-center px-6 py-3 bg-[#141414] text-white rounded-md border border-[#262626] transition-all duration-200 hover:bg-[#1A1A1A] hover:scale-105 hover:shadow-lg hover:shadow-[#262626]/20 active:scale-95"
        >
          Start Free Trial
        </Link>
        <Link
          to="/manage-subscription"
          className="block w-full text-center px-6 py-3 bg-[#511F5C] text-white rounded-md transition-all duration-200 hover:bg-[#6A2A7A] hover:scale-105 hover:shadow-lg hover:shadow-[#511F5C]/20 active:scale-95"
        >
          {chooseText}
        </Link>
      </div>
    </div>
  );
};

export default PlanCard; 