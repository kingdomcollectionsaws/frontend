
import React, { useState } from 'react';
import './ImageSlider.css';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
const ProductSlider = ({ imagesdata }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const images = imagesdata.map(src => src);
  if (!imagesdata || imagesdata.length === 0) {
    return <div>No images available</div>;
  }
  const handleThumbnailClick = (index) => {
     setCurrentImageIndex(index);
   };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagesdata?.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imagesdata?.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="image-slider-container">
      <div className="image-slider">
       {imagesdata[currentImageIndex]=="https://res.cloudinary.com/dujcstewk/image/upload/v1711281811/tawfeeq/wtnxz2cu6s96ief2buf0.png"? 
         <video controls autoPlay style={{height:'30rem',width:'30rem'}}>
         <source src="https://kingdomcollection.uk/wp-content/uploads/2021/12/IMG-9640.mp4?_=1" type="video/mp4"  />
         Your browser does not support the video tag.
       </video>: <img src={imagesdata[currentImageIndex]} alt={"img"} width={1000} height={1000} />}
        <div className="prev" onClick={handlePrev}><MdOutlineArrowBackIos /></div>
        <div className="next" onClick={handleNext}><MdOutlineArrowForwardIos /></div>
      </div>
      <div className="thumbnail-container">

        {imagesdata?.slice(0,7).map((item, index) => (
          <img
            width={1000} height={1000}
            key={index}
            src={item}
            alt={`Thumbnail ${index}`}
            style={{ height: '60px', width: '60px', borderRadius: '10px' }}
            className={index === currentImageIndex ? 'active-thumbnail' : 'thumbnail'}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;


