import React from 'react';
import PlanCard from '../components/PlanCard';
import PlansTable from '../components/PlansTable';
import HighlightCTA from '../components/HighlightCTA';
import FreeTrail from '../components/FreeTrail';

const Subscriptions = () => {
  return (
    <div className="min-h-screen bg-[black] py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-white">
          Choose the plan that's right for you
        </h1>
        <p className="text-[#b3b3b3] mb-12 max-w-3xl mx-auto text-center">
          Join Movies4u and select from our flexible subscription options tailored to your viewing preferences.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <PlanCard 
            title="Basic Plan"
            description="Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles."
            price="9.99"
            chooseText="Choose Plan"
          />
          <PlanCard 
            title="Standard Plan"
            description="Access to a wider selection of movies and shows, including most new releases and exclusive content."
            price="12.99"
            chooseText="Choose Plan"
          />
          <PlanCard 
            title="Premium Plan"
            description="Access to widest selection of movies and shows, including all new releases and Offline Viewing."
            price="14.99"
            chooseText="Choose Plan"
          />
        </div>

        <section className="bg-[#1E1E1E] py-8 md:py-12 rounded-lg mb-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
              Compare our plans and find the right one for you
            </h2>
            <div className="overflow-x-auto">
              <PlansTable />
            </div>
          </div>
        </section>

        <HighlightCTA />
        <FreeTrail />
      </div>
    </div>
  );
};

export default Subscriptions; 