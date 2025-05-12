import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent sticky top-5 bot-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="text-xl font-bold text-white">
            Movies4u
          </Link>
          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:flex-1 containermom">
            {/* Centered Navigation Links */}
            <ul className="flex space-x-4 flex-1 justify-center container">
                <div className="container flex space-x-4 flex-1 justify-center">
              <li>
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/movies-shows"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white"
                >
                  Movies & Shows
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/subscriptions"
                  className="rounded-md px-3 py-2 text-sm font-medium text-white"
                >
                  Subscriptions
                </Link>
              </li>
              </div>
            </ul>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/signin"
                className="rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-md px-4 py-2 text-sm font-medium bg-[#511F5C] text-white hover:bg-[#3d1645]"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Toggler for Mobile */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 focus:outline-none lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={isOpen ? "block lg:hidden" : "hidden lg:hidden"}
          id="mobile-menu"
        >
          <ul className="space-y-1 px-2 pb-3 pt-2 flex flex-col items-center bg-black/90">
            <li>
              <Link
                to="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies-shows"
                className="block rounded-md px-3 py-2 text-base font-medium text-white"
              >
                Movies & Shows
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="block rounded-md px-3 py-2 text-base font-medium text-white"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                to="/subscriptions"
                className="block rounded-md px-3 py-2 text-base font-medium text-white"
              >
                Subscriptions
              </Link>
            </li>
            {/* Mobile Auth Buttons */}
            <li className="w-full mt-4 space-y-2">
              <Link
                to="/signin"
                className="block w-full text-center rounded-md px-3 py-2 text-base font-medium text-white bg-[#511F5C] hover:bg-[#3d1645]"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center rounded-md px-3 py-2 text-base font-medium text-white border border-[#511F5C] hover:bg-[#511F5C]"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;