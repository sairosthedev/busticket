import React from 'react';
import Hero from './hero/Hero';
import Search from '../search/Search';
import Category from './category/Category';
import Offer from './offer/Offer';

const HomeContainer = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white px-4 md:px-12 lg:px-20 py-8 space-y-16">
      {/* Hero Section */}
      <section className="w-full py-12">
        <Hero />
      </section>

      {/* Search Section */}
      <section className="w-full py-8 bg-zinc-900 rounded-sm border border-zinc-800">
        <Search />
      </section>

      {/* Category Section */}
      <section className="w-full py-12">
        <Category />
      </section>

      {/* Offer Section */}
      <section className="w-full py-12 bg-zinc-900 rounded-sm border border-zinc-800">
        <Offer />
      </section>
    </div>
  );
};

export default HomeContainer;
