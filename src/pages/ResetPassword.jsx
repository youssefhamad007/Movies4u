import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-[#040404] text-white pt-20">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-md mx-auto bg-[#1E1E1E] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
          <p className="text-gray-300 mb-6 text-center">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#511F5C]"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#511F5C] text-white py-2 px-4 rounded-md hover:bg-[#3d1645] transition-colors"
            >
              Send Reset Link
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-300">
            Remember your password?{' '}
            <Link to="/signin" className="text-[#511F5C] hover:text-[#3d1645]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 