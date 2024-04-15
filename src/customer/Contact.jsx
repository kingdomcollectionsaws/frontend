// src/components/ContactUs.js

import React from 'react';
import qr from '../../public/qr.png'
const ContactUs = () => {
  return (
    <div className='my-10'> 
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-center items-center mb-8">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Address:</h2>
          <p className="text-lg mb-2">
            Kingdom Collection <br />
            Windermere Road, <br />
            UB1 2NZ, London, <br />
            United Kingdom
          </p>
          <p className="text-lg">
            Phone: +44 7438 566049
          </p>
        </div>
        <div className="md:w-1/2">
        <h1 className="text-2xl font-bold mb-8 text-center">Scan for whatsapp</h1>
          <img src={qr} alt="Whatsapp QR Code" className="w-full md:w-2/2 mx-auto" />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Email:</h2>
        <ul className="list-disc pl-4">
          <li><a href="mailto:contact@kingdomcollection.uk" className="text-lg">contact@kingdomcollection.uk</a></li>
          <li><a href="mailto:info@kingdomcollection.uk" className="text-lg">info@kingdomcollection.uk</a></li>
          <li><a href="mailto:kingdomcollectionuk@gmail.com" className="text-lg">kingdomcollectionuk@gmail.com</a></li>
        </ul>
      </div>

      {/* Add Google Map location here */}
    </div>
    </div>
  );
};

export default ContactUs;
