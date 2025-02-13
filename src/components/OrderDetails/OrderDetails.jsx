import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader'
import { CartContext } from '../../Context/CartContext';

export default function OrderDetails() {
  let {orderId} = useParams();
  let {getOrderDetails} = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState(null);

  async function getUserOrderDetails(orderId) {
    setIsLoading(true);
    let response = await getOrderDetails(orderId);
    setOrderDetails(response.data.data);
    setIsLoading(false);
  }
  useEffect(() => {
    getUserOrderDetails(orderId);
    setIsLoading(true);
  }, [orderId]);
  return (
    <>
      {isLoading ? <Loader /> : <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Order Details</h1>
      {orderDetails && (
        <>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center w-1/2 mx-auto">
            <p className="text-gray-700"><strong>Order ID:</strong> {orderDetails.id}</p>
            <p className="text-gray-700"><strong>Total Price:</strong> {orderDetails.totalOrderPrice} EGP</p>
            <p className="text-gray-700"><strong>Payment Method:</strong> {orderDetails.paymentMethodType}</p>
            <p className="text-gray-700"><strong>Status:</strong> {orderDetails.isDelivered ? "Delivered" : "Not Delivered"}</p>
          </div>
          <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            {orderDetails.cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-200 py-4">
                <div className="flex items-center">
                  <div className="w-[12rem] mr-10">
                    <img src={item.product.imageCover} className="w-full" alt={item.title} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.product.title}</h3>
                    <h3 className='text-main text-sm'>Brand: {item.product.brand.name}</h3>
                    <h3 className='text-main text-sm'>Category: {item.product.category.name}</h3>
                    <p className="text-gray-600 mb-1">Price: {item.price} EGP</p>
                    <p className="text-emerald-600 mb-1 font-bold">Total: {item.price * item.count} EGP</p>
                    <p className="text-gray-500 mb-3">Count: {item.count}</p>
                    <div className='w-1/2'><i className='fa fa-star rating-color'></i> {item.product.ratingsAverage}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
      )}
    </div>}
    </>
  )
}
