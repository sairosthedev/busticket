import React from 'react';
import Hero from './hero/Hero';
import Category from './category/Category';

const HomeContainer = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white px-4 md:px-12 lg:px-20 py-8 space-y-16">
      {/* Hero Section */}
      <section className="w-full py-12">
        <Hero />
      </section>

      {/* Category Section */}
      <section className="w-full py-12">
        <Category />
      </section>
    </div>
  );
};

export default HomeContainer;
