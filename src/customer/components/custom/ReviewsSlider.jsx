
import React, { useState } from 'react';
import './ReviewSlider.css';
import img from "../../../../public/b1.jpg";
import img2 from "../../../../public/b2.jpg";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { useEffect, Fragment, useRef, } from "react";
import { Dialog, Transition } from '@headlessui/react'
const ReviewsSlider = ({ data }) => {
const idata= [img,img2]
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(0);
  // const images = imagesdata.map(src => src);
  // if (!imagesdata || imagesdata.length === 0) {
  //   return <div>No images available</div>;
  // }
console.log(data);
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? idata?.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === idata?.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    
   
     <div className="image-slider-container" style={{backgroundColor:'red',padding:'1rem'}}>
      <div className="image-slider" >
     
        <div className="prev" onClick={handlePrev}><MdOutlineArrowBackIos /></div>
        <div className="next" onClick={handleNext}><MdOutlineArrowForwardIos /></div>
     
  </div>
    </div> 
    
  );
};

export default ReviewsSlider;


