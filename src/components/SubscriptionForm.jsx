import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionForm = () => {
  return (
    <div className="bg-[#1E1E1E] rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Subscription</h2>
      
      {/* Current Plan Section */}
      <div className="mb-8 p-6 bg-[#2A2A2A] rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Current Plan</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-300">Premium Plan</p>
            <p className="text-sm text-gray-400">$14.99/month</p>
          </div>
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
            Active
          </span>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
        <div className="p-6 bg-[#2A2A2A] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-gray-600 rounded mr-4"></div>
              <div>
                <p className="text-gray-300">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-400">Expires 12/25</p>
              </div>
            </div>
            <button className="text-[#511F5C] hover:text-[#3d1645]">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Billing History Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Billing History</h3>
        <div className="space-y-4">
          <div className="p-4 bg-[#2A2A2A] rounded-lg flex justify-between items-center">
            <div>
              <p className="text-gray-300">Premium Plan - Monthly</p>
              <p className="text-sm text-gray-400">March 1, 2024</p>
            </div>
            <p className="text-gray-300">$14.99</p>
          </div>
          <div className="p-4 bg-[#2A2A2A] rounded-lg flex justify-between items-center">
            <div>
              <p className="text-gray-300">Premium Plan - Monthly</p>
              <p className="text-sm text-gray-400">February 1, 2024</p>
            </div>
            <p className="text-gray-300">$14.99</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500/10 transition-colors">
          Cancel Subscription
        </button>
        <Link
          to="/subscriptions"
          className="px-6 py-2 bg-[#511F5C] text-white rounded-md hover:bg-[#3d1645] transition-colors text-center"
        >
          Change Plan
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionForm; 