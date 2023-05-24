import React, { useState } from "react";

import "./Slider.scss";

import FsLightbox from "fslightbox-react";
import { Navigation, Pagination, A11y, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const GallerySlider = ({ sources, isSmall, handleUploadImage }) => {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });
  const isDashboard = location.pathname.includes("/dashboard");

  const openLightboxOnSlide = (number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  };
  return (
    <>
      {sources && (
        <FsLightbox
          toggler={lightboxController.toggler}
          sources={sources}
          slide={lightboxController.slide}
        />
      )}
      {sources.length > 0 ? (
        <div className="gal_slider" style={{ width: "100%" }}>
          <Swiper
            modules={[Navigation, Pagination, A11y, Scrollbar]}
            spaceBetween={12}
            slidesPerView={4}
            scrollbar={{ draggable: true }}
            breakpoints={{
              600: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: isDashboard ? 5 : isSmall ? 3 : 4,
              },
            }}
          >
            {sources
              ? sources.map((slide, index) => {
                  return (
                    <SwiperSlide key={index} style={{ height: "auto" }}>
                      <div
                        className="gal_slide"
                        onClick={() => openLightboxOnSlide(index + 1)}
                      >
                        <img
                          src={slide}
                          alt=""
                          style={{
                            objectFit: "cover",
                            height: "100%",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })
              : null}
          </Swiper>
          {isDashboard && (
            <button
              style={{ width: "100%", marginTop: "10px" }}
              onClick={handleUploadImage}
              className="primary-btn"
            >
              Изменить фото
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default GallerySlider;
