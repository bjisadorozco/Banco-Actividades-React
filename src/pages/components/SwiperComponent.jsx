/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles/SwiperComponent.css";

function SwiperComponent({ slides = [], delay = 2500, text = true }) {
  return (
    <div className="border h-full m-0 ">
      <Swiper
        pagination={true}
        modules={[Pagination, Navigation, Autoplay]}
        navigation={true}
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: delay,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide-container"
              style={{ backgroundImage: `url(${slide.imageURL})` }}
            >
              {text === true && (
                <div className="text-overlay">
                  <h1 className="text-main-color text-title-size">
                    {slide.title}
                  </h1>
                  <p className="text-white mt-2">{slide.description}</p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperComponent;
