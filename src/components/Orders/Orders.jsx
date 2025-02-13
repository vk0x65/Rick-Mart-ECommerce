import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';
import emptyCart from './../../assets/emptyCart.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Orders() {
  let {getUserData} = useContext(CartContext);
  const [userId, setUserId] = useState(null);
  const [userOrders, setUserOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  async function getUserId() {
      let response = await getUserData();
      setUserId(response)
    }
  async function getOrders() {
    if (!userId) return;
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      setUserOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getOrders();
    }
  }, [userId]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewDetails = (orderId) => {
    navigate(`/OrderDetails/${orderId}`);
  };
  return (
    <>
      {isLoading ? (<Loader />) : userOrders.length === 0 ? (
    <div className='container mx-auto flex flex-col justify-center items-center'>
      <img src={emptyCart} alt="Empty" className='w-1/3 max-w-screen-md mt-52' />
      <p className='mt-4 text-xl text-center mb-10'>You do not have any orders!</p>
    </div>) : 
    (<div className="container mx-auto p-4 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          {userOrders.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-200 py-4 gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">Order ID: <span className="break-all">{item?.id}</span></h3>
                <div className="text-sm md:text-base">
                  <p className="text-gray-600 font-semibold mb-1">Status: {item?.isDelivered ? "Delivered" : "Not Delivered"}</p>
                  <p className="text-gray-600 mb-1">Payment: {item?.isPaid ? "Paid" : "Not Paid"}</p>
                  <p className="text-gray-500">Method: {item?.paymentMethodType}</p>
                  <p className="text-gray-500 font-semibold">Total: {item?.totalOrderPrice} EGP</p>
                  <p className="text-gray-500 text-xs md:text-sm">Created: {formatDateTime(item.createdAt)}</p>
                </div>
              </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 text-sm md:text-base w-full md:w-auto" onClick={() => handleViewDetails(item._id)}>View Details</button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}


