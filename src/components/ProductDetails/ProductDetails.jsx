import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';

export default function ProductDetails() {
  let {addToCart} = useContext(CartContext);
  async function addProductToCart(productId){
    let response = await addToCart(productId);
  }
  let {prodId, category} = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([])
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  };
  async function getProductDetails(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${prodId}`).then((data)=>{
      setProductDetails(data?.data?.data)
      setIsLoading(false)
    }).catch((err)=>{
      setErrorMessage(err.message)
      setIsLoading(false)
  })
  }
  async function getRelatedProducts(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/`).then((data)=>{
      let relatedProducts = data?.data?.data;
      relatedProducts = relatedProducts.filter((product)=> product.category.name == category)
      setRelatedProducts(relatedProducts)
      setIsLoading(false)
    }).catch((err)=>{
      setErrorMessage(err.message)
      setIsLoading(false)
  })
  }
  useEffect(()=>{
    getProductDetails();
    getRelatedProducts();
  }, [])
  useEffect(() => {
    getProductDetails();
    getRelatedProducts();
  }, [prodId]);
  return (
    <>
    <div className='container mx-auto my-5 mt-10 md:mt-20 px-4'>
      {isLoading ? <Loader  /> : null}
      <div className="flex flex-wrap flex-col md:flex-row">
        <div className="w-full md:w-1/4 px-0 md:px-3">
          <Slider {...settings}>{productDetails?.images?.map((src, index)=> <img key={index} src={src} alt="" className='w-full'/> )}</Slider>
        </div>
        <div className="w-full md:w-3/4 px-0 md:px-3 mt-5 md:mt-10 flex flex-col justify-center">
          <h1 className='py-2 text-black font-bold text-xl md:text-2xl'>{productDetails.title}</h1>
          <h3 className='py-2 text-gray-700 text-sm md:text-base'>{productDetails.description}</h3>
          <p className='py-2 text-gray-600 text-sm md:text-base'>{productDetails.category?.name}</p>
            <div className='text-base md:text-lg'>{productDetails.price} EGP</div>
            <div className='text-base md:text-lg'><i className='fa fa-star rating-color'></i> {productDetails.ratingsAverage}</div>
            <div className="flex justify-between items-center py-2"></div>
          <button className='bg-main btn w-full md:w-2/4 rounded-lg text-white px-3 py-2 text-sm md:text-base' onClick={()=>addProductToCart(productDetails._id)}>Add To Cart</button>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4">
      <h1 className='mt-10 md:mt-20 text-xl md:text-2xl'>Related Products:</h1>
        {isLoading ? <Loader  /> : <div className="flex flex-wrap mx-2">
          {relatedProducts.map((product)=>
          <div key={product._id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2'>
            <div className="product py-3">
              <Link to={`/productDetails/${product._id}/${product.category.name}`}>
                <img src={product.imageCover} alt="product" className='w-full h-auto md:h-[250px] object-cover'/>
                <h3 className='text-main text-xs md:text-sm mt-2 ml-3'>{product.category.name}</h3>
                <p className='text-sm md:text-base ml-3'>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className='text-sm md:text-base ml-4'>{product.price} EGP</div>
                  <div className='text-sm md:text-base mr-7'><i className='fa fa-star rating-color'></i> {product.ratingsAverage}</div>
                </div>
              </Link>
              <div className='mt-2'>
                <button className='bg-main btn w-full rounded-lg text-white px-3 py-2 text-sm md:text-base' onClick={()=>addProductToCart(product._id)}>Add To Cart</button>
              </div>
            </div>
          </div>)}
        </div>}
        </div>
    </>
  )
}
