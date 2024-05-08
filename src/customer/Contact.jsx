import React from 'react';
import { RiWhatsappFill } from 'react-icons/ri';
import 'tailwindcss/tailwind.css';
import ws from '../../public/whatsapp.png'
const Contact = () => {
  return (<>
    <div className="flex bg-black color-white text-white p-10 sm:flex-row flex-col my-10 justify-center ">
      {/* WhatsApp QR Code */}
    <div>
    <p style={{display:'flex',alignItems:'center',gap:'10px'}}>Chat on WhatsApp <span><RiWhatsappFill style={{color:' #128C7E',fontSize:'1.5rem'}} /></span></p>
      <img
          src={ws}
          alt="WhatsApp QR Code"
          className="mt-4"
          style={{width:'15rem',height:'15rem'}}
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
