import React from 'react';
import 'tailwindcss/tailwind.css';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 mb-6">
          Kingdom Collection is a leading manufacturer of armor products and other handmade items. With a team of over 45 skilled artists and craftsmen, we've been on this journey since 2010.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Our Achievements</h2>
          <p className="text-gray-700">
            • Successfully delivered over 27,400 direct orders worldwide.
            <br />
            • Received 6800+ positive reviews from satisfied customers.
            <br />
            • Processed 42,300 orders through platforms like Etsy, Ebay, and Amazon over the past 14 years.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Our Key Points to Success</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Understanding Buyers' Needs: We're here to listen and understand your requirements. Feel free to contact us before placing an order.</li>
            <li>Product Quality: We never compromise on quality. Each order undergoes rigorous quality checks.</li>
            <li>On-Time Delivery: We use reputable international couriers with complete tracking and insurance.</li>
            <li>Customization Options: Personalize your orders according to your preferences.</li>
            <li>Responsiveness: We respond promptly to every message within a couple of hours.</li>
            <li>Easy Return & Refund Policy: If you're not satisfied, our 30-day return or refund policy has you covered.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
