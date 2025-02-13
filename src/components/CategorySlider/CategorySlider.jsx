import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      }
    ],
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  };
  function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  let { data } = useQuery({
    queryKey: ["categorySlider"],
    queryFn: getCatSlider,
  });
  return (
    <>
      <div className="container mx-auto my-5 md:my-10 px-4">
        <h1 className="text-lg md:text-xl mb-4">Show Popular Categories:</h1>
        <Slider {...settings} className="mb-4">
          {data?.data?.data?.map((cat, index) => (
            <div key={index} className="text-center px-2 w-1/2 md:w-1/4">
              <img src={cat.image} alt="Category Image" className='h-[100px] xs:h-[120px] md:h-[200px] w-full object-cover rounded-lg'/>
              <p className="text-xs xs:text-sm md:text-base mt-2">{cat.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
