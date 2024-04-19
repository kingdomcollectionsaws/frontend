import React from 'react';
import 'tailwindcss/tailwind.css';

const Contact = () => {

  return (<>
    <div className="flex bg-black color-white text-white p-10 sm:flex-row flex-col my-10 justify-center ">
      {/* WhatsApp QR Code */}
    <div>
    <p>Chat on WhatsApp</p>
      <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG7TIzcr70nvAJ4W1i6QNT2tfOmNGnLwjrDTX8HpUQ0Q&s"
          alt="WhatsApp QR Code"
          className="mt-4"
          width={250}
          height={250}
        />
    </div>

      {/* Company Information */}
      <div className="w-1/2 p-5 text-lg w-[20rem] ">
        <h1>Kingdom Collection</h1>
        <p>Windermere Road, UB1 2NZ</p>
        <p>London, United Kingdom</p>
        <p>Phone: +44 7438 566049</p>
        <p>Email:</p>
        <ul className="list-disc pl-6">
          <li>contact@kingdomcollection.uk</li>
          <li>info@kingdomcollection.uk</li>
          <li>kingdomcollectionuk@gmail.com</li>
        </ul>

        
        
      </div>
    </div>
    <div style={{display:'flex',justifyContent:'center',padding:'1rem'}}>
 <div style={{ height: '30rem', width: '100%' ,display:'flex',justifyContent:'center'}}>
 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.365128907283!2d-0.3752539241435314!3d51.524862509428495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487613c2c151541d%3A0xa98d16b3e7a0b20a!2sKingdom%20Collection!5e0!3m2!1sen!2sin!4v1713508724147!5m2!1sen!2sin" style={{width:'90%',height:'30rem'}}  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div >
    </div>
  
    </>
  );
};

export default Contact;
