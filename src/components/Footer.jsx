import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0F0F0F] text-white mt-20 pt-15 w-full pb-10">
      <div className="max-w-full mx-auto px-30">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-8">
          {/* Home Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Home</h3>
            <ul className="space-y-2 text-[#999999]">
              <li><a href="#" className=" hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className=" hover:text-white transition-colors">Devices</a></li>
              <li><a href="#" className=" hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className=" hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Movies Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Movies</h3>
            <ul className="space-y-2 text-[#999999]">
              <li><a href="#" className=" hover:text-white transition-colors">Genres</a></li>
              <li><a href="#" className=" hover:text-white transition-colors">Trending</a></li>
              <li><a href="#" className=" hover:text-white transition-colors">New Release</a></li>
              <li><a href="#" className=" hover:text-white transition-colors">Popular</a></li>
            </ul>
          </div>

          {/* Shows Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shows</h3>
            <ul className="space-y-2 text-[#999999]">
              <li><a href="#" className=" hover:text-white transition-colors">Genres</a></li>
              <li><a href="#" className=" hover:text-white transition-colors">Trending</a></li>
              <li><a href="#" className=" hover:text-white transition-colors">New Release</a></li>
              <li><a href="#" className=" hover:text-white transition-colors">Popular</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 ">Support</h3>
            <ul className="space-y-2 text-[#999999]">
              <li><a href="#" className=" hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Subscription Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 ">Subscription</h3>
            <ul className="space-y-2 text-[#999999]">
              <li><a href="#" className=" hover:text-white transition-colors">Plans</a></li>
              <li><a href="#" className=" hover:text-white transition-colors">Features</a></li>
            </ul>
          </div>

          {/* Connect With Us Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] rounded hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5 rounded-full bg-white  text-[#1A1A1A] " fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] rounded hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] rounded hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5 bg-white  text-[#1A1A1A]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-[#262626] pt-6 flex flex-col sm:flex-row justify-between items-center text-[#999999] text-sm">
          <p>© 2025 Movies4u, ALL RIGHTS RESERVED</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;