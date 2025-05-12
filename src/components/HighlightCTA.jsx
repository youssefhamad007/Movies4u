import React from 'react';
import { Link } from 'react-router-dom';

const HighlightCTA = () => {
  return (
    <section className="mt-16 bg-[#1E1E1E] rounded-lg p-8 md:p-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          Ready to start your streaming journey?
        </h2>
        <p className="text-[#b3b3b3] mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied viewers who are already enjoying unlimited access to our extensive library of movies and shows.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="inline-block bg-[#511F5C] text-white py-3 px-8 rounded-md hover:bg-[#3d1645] transition-colors"
          >
            Start Free Trial
          </Link>
          <Link
            to="/subscriptions"
            className="inline-block border border-[#511F5C] text-white py-3 px-8 rounded-md hover:bg-[#511F5C] transition-colors"
          >
            View All Plans
          </Link>
        </div>
        <p className="mt-6 text-sm text-[#b3b3b3]">
          No credit card required for free trial. Cancel anytime.
        </p>
      </div>
    </section>
  );
};

export default HighlightCTA; 