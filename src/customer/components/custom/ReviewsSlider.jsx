
import React, { useState } from 'react';
import './ReviewSlider.css';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import img from "../../../../public/b1.jpg"
import ReactStars from "react-rating-stars-component";
const ReviewsSlider = ({ data }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const images = imagesdata.map(src => src);
  // if (!imagesdata || imagesdata.length === 0) {
  //   return <div>No images available</div>;
  // }
console.log(data);
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? data?.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === data?.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    
   
     <div className="image-slider-container" style={{backgroundColor:'red',padding:'1rem'}}>
      <div className="image-slider" >
      <img src={data.image[currentImageIndex]} alt={"img"} width={1000} height={1000} />
        <div className="prev" onClick={handlePrev}><MdOutlineArrowBackIos /></div>
        <div className="next" onClick={handleNext}><MdOutlineArrowForwardIos /></div>
     
  </div>
    </div> 
    
  );
};

export default ReviewsSlider;


