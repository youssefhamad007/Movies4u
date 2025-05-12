import React from 'react';
import { Link } from 'react-router-dom';

const AccountForm = () => {
  return (
    <div className="bg-[#1E1E1E] rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#511F5C]"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#511F5C]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#511F5C]"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#511F5C]"
          />
        </div>

        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#511F5C]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#511F5C]"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#511F5C]"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            to="/subscriptions"
            className="px-6 py-2 border border-[#511F5C] text-white rounded-md hover:bg-[#511F5C] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-[#511F5C] text-white rounded-md hover:bg-[#3d1645] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm; 