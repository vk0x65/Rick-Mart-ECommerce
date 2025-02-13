import React from 'react'
import slider1 from './../../assets/1.png'
import slider2 from './../../assets/2.jpeg'
import slider3 from './../../assets/3.jpeg'
import slider4 from './../../assets/4.jpeg'
import slider5 from './../../assets/5.jpeg'
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  };
  return (
    <>
      <div className="container mx-auto my-5 md:my-10">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4">
          <Slider {...settings}>
            <img src={slider3} className='h-[300px] md:h-[500px]' alt=""/>
            <img src={slider4} className='h-[300px] md:h-[500px]' alt=""/>
            <img src={slider5} className='h-[300px] md:h-[500px]' alt=""/>
          </Slider>
          </div>
          <div className="w-full md:w-1/4 mt-4 md:mt-0 md:ml-4 space-y-4">
          <img src={slider1} className='h-[150px] md:h-[250px] w-full object-cover' alt=""/>
          <img src={slider2} className='h-[150px] md:h-[250px] w-full object-cover' alt=""/>
          </div>
        </div>
      </div>
    </>
  )
}
