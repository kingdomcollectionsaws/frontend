// src/components/AboutUs.js

import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 my-10">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4">
            Kingdom Collection is a leading manufacturer of armor products & other handmade products with more than 45 artists/craftsmen.
          </p>
          <p className="text-lg mb-4">
            We started our journey in the year 2010 with 2 people. Now we have built a team of 35 experienced artisans/craftsmen. So far, we have received & delivered over 27,400 direct orders successfully with 6800+ positive reviews around the world.
          </p>
          <p className="text-lg mb-4">
            Also, we have received 42,300 orders through other e-commerce sites like Etsy, Ebay & Amazon over the 14 years period.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Key Points to Success:</h2>
          <ul className="list-disc pl-4 text-lg mb-8">
            <li>Understand Buyers Need: We are available to understand buyer's need. Buyers can contact us before placing an order.</li>
            <li>Product Quality: We don't compromise with product quality. Every order goes through a quality check.</li>
            <li>On Time Delivery: We use only reputed international courier with complete tracking & insurance.</li>
            <li>Customization Option: We have the option to customize/personalize orders as per buyer's need.</li>
            <li>Responsiveness: We respond to every message within a couple of hours.</li>
            <li>Easy Return & Refund Policy: We have a clear 30 days return or refund policy in case the buyer doesn't like the product.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
