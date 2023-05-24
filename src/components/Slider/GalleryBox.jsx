import React, { useState, useEffect } from "react";

import "./Slider.scss";

import FsLightbox from "fslightbox-react";
import { Navigation, Pagination, A11y, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import GallerySlider from "./GallerySlider";

const GalleryBox = ({ sources, isSmall, handleUploadImage }) => {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const openLightboxOnSlide = (number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  };

  const [imgSources, setImgSources] = useState([]);
  // console.log(isDashboard, "isDash");
  useEffect(() => {
    setImgSources(sources);
  }, [sources]);

  return (
    <>
      {sources && (
        <FsLightbox
          toggler={lightboxController.toggler}
          sources={imgSources}
          slide={lightboxController.slide}
        />
      )}

      <div className={`${isSmall ? "isTour" : ""} gen_img-box`}>
        {!isSmall && (
          <>
            {sources && (
              <img
                src={imgSources[0]}
                alt=""
                onClick={() => openLightboxOnSlide(1)}
                className="primary_img"
              />
            )}
          </>
        )}
        <GallerySlider
          handleUploadImage={handleUploadImage}
          isSmall
          sources={imgSources}
        />
      </div>
    </>
  );
};

export default GalleryBox;
