import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';
import wishlist from './../../assets/wishlist.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-hot-toast";

export default function WishList() {
  const [numOfWishlistItems, setNumOfWishlistItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [productDetails, setProductDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  let { getWishlist, removeFromWishlist, addToCart } = useContext(CartContext);
  let { prodId } = useParams();

  async function addProductToCart(productId) {
    let response = await addToCart(productId)
  }

  async function getProductDetails(productId) {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      return response.data.data;
    } catch (err) {
      setErrorMessage(err.message);
      return null;
    }
  }

  async function getAllWishlistItems() {
    try {
      let response = await getWishlist();
      setNumOfWishlistItems(response.data.data);
      const productDetailsPromises = response.data.data.map((product) =>
        getProductDetails(product.id)
      );
      const results = await axios.all(productDetailsPromises);
      const validProductDetails = results.filter((detail) => detail !== null);
      setProductDetails(validProductDetails);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeProduct(productId) {
    try {
      let response = await removeFromWishlist(productId);
      setNumOfWishlistItems(response.data.data);
      setProductDetails((prevDetails) => prevDetails.filter((item) => item._id !== productId));
      toast.success(response.data.message);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  useEffect(() => {
    getAllWishlistItems();
  }, []);

  return (
    <>
      {isLoading ? (<Loader />) : productDetails.length === 0 ? (<div className='container mx-auto flex flex-col justify-center items-center'>
                  <img src={wishlist} alt="Empty" className='w-1/3 max-w-screen-md mt-52' />
                  <p className='mt-4 text-xl text-center mb-10'>Your wishlist is empty!</p>
                </div>) : (
        <div className="container mx-auto p-4 w-full md:w-2/4">
        {productDetails.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 py-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-[12rem] mr-10">
                <img src={item.imageCover} className="w-full" alt={item.title} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-emerald-600 mb-1 font-semibold">{item.price} EGP</p>
                <p className="text-gray-500 mb-3">In Stock: {item.quantity}</p>
                <button onClick={() => removeProduct(item._id)} className="text-amber-600 hover:underline"><i className='fa fa-trash'></i> Remove</button>
              </div>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto md:min-w-[8rem]" onClick={() => addProductToCart(item._id)}>Add To Cart</button>
          </div>
        ))}
      </div>
      )}
    </>
  )
}