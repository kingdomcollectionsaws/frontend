import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Cardsection from "../cardsection/Cardsection";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export default function Homeseccarousel({ data, sectionname }) {
  const [activeindex, setActiveindex] = useState(0);
  const responsive = {
    0: { items: 1 },
    720: { items: 2.5 },
    1024: { items: 4.5 },
  };

  const slideprev = () => setActiveindex(activeindex - 1);
  const slidenext = () => setActiveindex(activeindex + 1);
  const syncactiveindex = ({ item })=>{ 
   // console.log("items are ", item)
    setActiveindex(item)};
  const items = data.map((i) => <Cardsection product={i} />);
  return (
    <>
      <div className="relative px-3 lg:px-8 z-0 border ">
        <h1 className="text-2xl font-extrabold text-gray-800">{sectionname}</h1>
        <div className="relative p-5 ">
          <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            disableDotsControls
            disableButtonsControls
            onSlideChange={syncactiveindex}
            activeIndex={activeindex}
          />
          {activeindex < items.length ? (
            <ArrowForwardIosIcon
              variant="contained"
              onClick={slidenext}
              className="z-50 cursor-pointer "
              sx={{ position: "absolute", top: "11rem", right: "0rem" }}
              aria-label="next"
            />
          ) : (
            ""
          )}

          {activeindex !== 0 ? (
            <ArrowBackIosIcon
              variant="contained"
              onClick={slideprev}
              className="z-50 cursor-pointer "
              sx={{ position: "absolute", top: "11rem", left: "0rem" }}
              aria-label="next"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      
    </>
  );
}
