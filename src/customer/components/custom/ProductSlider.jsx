
import React, { useEffect, useState } from 'react';
import './ImageSlider.css';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import img from '../../../../public/videoimg.png'
const ProductSlider = ({ imagesdata,showindex }) => {

  const [showimage,setShowimage] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(()=>{
      setShowimage(true)
console.log(showimage);
    },[showindex],imagesdata)
  
  // const images = imagesdata.map(src => src);
  if (!imagesdata || imagesdata.length === 0) {
    return <div>No images available</div>;
  }
  const handleThumbnailClick = (index) => {
     setCurrentImageIndex(index);
     setShowimage(false)
   
   };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagesdata?.length - 1 : prevIndex - 1));
    setShowimage(false)
  };
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imagesdata?.length - 1 ? 0 : prevIndex + 1));
    setShowimage(false)
  };

  return (
    <div className="image-slider-container">
      <div className="image-slider">
       {imagesdata[currentImageIndex]?.endsWith('.mp4')? 
         <video controls autoPlay style={{height:'30rem',width:'30rem'}} loop>
          <img src={img} alt="kk" />
         <source src={`${imagesdata[currentImageIndex]}#t=1`} type="video/mp4"   />
         Your browser does not support the video tag.
       </video>:<img src={showimage && showindex?showindex:imagesdata[currentImageIndex]} alt={"img"} width={1000} height={1000} /> }
        <div className="prev" onClick={handlePrev}><MdOutlineArrowBackIos /></div>
        <div className="next" onClick={handleNext}><MdOutlineArrowForwardIos /></div>
      </div>
      <div className="thumbnail-container">

        {imagesdata?.slice(0,7).map((item, index) => (
          <img
            width={1000} height={1000}
            key={index}
            src={item.endsWith('.mp4')?img: item}
            alt={"img"}
            style={{ height: '60px', width: '60px', borderRadius: '10px' }}
            className={index === currentImageIndex || item==showindex  ? 'active-thumbnail' :  'thumbnail'}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
 export const EProductSlider = ({ imagesdata,showindex }) => {

  
  const [showimage,setShowimage] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(()=>{
      setShowimage(true)
    },[showindex])
  
  // const images = imagesdata.map(src => src);
  if (!imagesdata || imagesdata.length === 0) {
    return <div>No images available</div>;
  }
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagesdata?.length - 1 : prevIndex - 1));
    setShowimage(false)
  };
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imagesdata?.length - 1 ? 0 : prevIndex + 1));
    setShowimage(false)
  };

  return (
    <div className="image-slider-container" style={{marginTop:'0',justifyContent:'center'}}>
      <div className="image-slider" style={{width:'100%',marginLeft:'0rem',height:'40%'}}>
       {imagesdata[currentImageIndex]?.endsWith('.mp4')? 
         <video autoPlay controls style={{height:'20rem',width:'20rem'}} loop >
          <img src={img} alt="kk" />
         <source src={`${imagesdata[currentImageIndex]}#t=1`} type="video/mp4"    />
         Your browser does not support the video tag.
       </video>: <img src={showimage && showindex?showindex:imagesdata[currentImageIndex]} alt={"img"} style={{width:'20rem',height:'20rem'}} />}
        <div className="prev" onClick={handlePrev} ><MdOutlineArrowBackIos /></div>
        <div className="next" onClick={handleNext} ><MdOutlineArrowForwardIos /></div>
      </div>
     
    </div>
  );
};

export default ProductSlider;


