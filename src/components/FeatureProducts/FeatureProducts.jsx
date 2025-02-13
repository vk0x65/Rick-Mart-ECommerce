import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export default function FeatureProducts() {
  let params = { limit: 35, page: 1 }
  let { addToCart, addToWishlist, getWishlist, removeFromWishlist } = useContext(CartContext)
  const [numOfWishlistItems, setNumOfWishlistItems] = useState([])

  async function getAllWishlistItems() {
    let response = await getWishlist()
    setNumOfWishlistItems(response.data.data)
  }

  async function addProductToWishlist(productId) {
    let response = await addToWishlist(productId)
    setNumOfWishlistItems((prevItems) => [...prevItems, { id: productId }])
  }

  async function removeProductFromWishlist(productId) {
    let response = await removeFromWishlist(productId)
    setNumOfWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  async function addProductToCart(productId) {
    let response = await addToCart(productId)
  }

  function getFeatureProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products", { params })
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["FeatureProducts"],
    queryFn: getFeatureProducts,
    staleTime: 3000,
    retry: 4,
    retryDelay: 2000,
    refetchInterval: 3000
  })

  useEffect(() => {
    getAllWishlistItems()
  }, [])

  return (
    <>
      <div className="container mx-auto px-2 sm:px-4">
        {isError && <div className="text-center text-red-500">Error: {error.message}</div>}
        {isLoading ? <Loader /> : (
          <div className="flex flex-wrap mx-2">
            {data?.data?.data.map((product) =>
              <div key={product._id} className='w-full xs:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2'>
                <div className="product h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <Link to={`/productDetails/${product._id}/${product.category.name}`} className="block p-3">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img src={product.imageCover} alt="product" className='w-full h-full object-cover'/>
                    </div>
                    <h3 className='text-main text-xs md:text-sm mt-2 truncate'>{product.category.name}</h3>
                    <p className='text-xs sm:text-sm font-medium text-gray-800 mt-1 truncate'>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className='text-xs sm:text-sm font-semibold text-gray-900'>{product.price} EGP</div>
                      <div className='text-xs sm:text-sm text-gray-600'><i className='fa fa-star rating-color'></i> {product.ratingsAverage}</div>
                    </div>
                  </Link>
                  <div className="flex justify-end px-3 pb-2 mr-5">
                    {numOfWishlistItems.some((item) => item.id === product._id) ? (
                      <button onClick={() => removeProductFromWishlist(product._id)}>
                        <i className="fa-solid fa-heart h3 text-amber-300 text-xl"></i>
                      </button>) : (
                      <button onClick={() => addProductToWishlist(product._id)}>
                        <i className="fa-regular fa-heart h3 text-amber-300 text-xl"></i>
                      </button>)}
                  </div>
                  <div className="px-3 pb-3">
                    <button className='bg-main w-full rounded-md text-white text-xs sm:text-sm px-2 py-2 hover:bg-opacity-90 transition-colors' onClick={() => addProductToCart(product._id)}>Add To Cart</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}