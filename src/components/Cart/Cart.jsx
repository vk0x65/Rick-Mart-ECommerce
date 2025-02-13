import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';
import emptyCart from './../../assets/emptyCart.png'
import { Link } from 'react-router-dom';
import { Dropdown } from "flowbite-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let {getCart, removeCartItem, updateProduct, EmptyCart, totalCartPrice, updateNumOfCartItems} = useContext(CartContext);
  async function getAllCart() {
    let response = await getCart();
    setCartItems(response.data.data.products);
    setIsLoading(false);
  }
  async function removeProduct(productId) {
    let response = await removeCartItem(productId);
    setCartItems(response.data.data.products);
  }
  async function updateCartProduct(productId, count) {
    let response = await updateProduct(productId, count);
    setCartItems(response.data.data.products);
  }
  async function clearCart() {
    await EmptyCart();
    setCartItems([]);
    updateNumOfCartItems(0);
  }
  useEffect(()=>{
    getAllCart();
  }, [])
  return (
    <>
      {isLoading ? (<Loader />) : cartItems.length === 0 ? (<div className='container mx-auto flex flex-col justify-center items-center'>
            <img src={emptyCart} alt="Empty" className='w-1/3 max-w-screen-md mt-52' />
            <p className='mt-4 text-xl text-center mb-10'>Your cart is empty!</p>
          </div>) : (<div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">Product Image</th>
            <th scope="col" className="px-6 py-3">Product Name</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Unit Price</th>
            <th scope="col" className="px-6 py-3">Total Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
        {cartItems.map((item) => (
          <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {item.product.title}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={() => updateCartProduct(item.product.id, item.count - 1)} >
                  <span className="sr-only">Decrease quantity</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                  </svg>
                </button>
                <div>
                  <span>{item.count}</span>
                </div>
                <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={() => updateCartProduct(item.product.id, item.count + 1)}>
                  <span className="sr-only">Increase quantity</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              ${item.price} EGP
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              ${item.price * item.count} EGP
            </td>
            <td className="px-6 py-4">
              <button onClick={() => removeProduct(item.product.id)} className="font-medium text-amber-600 dark:text-red-500 hover:underline">Remove</button>
            </td>
          </tr>
        ))}
        <tr className="bg-slate-700 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-slate-600 dark:hover:bg-gray-600 text-center font-extrabold text-white text-xl">
          <td>Total Price</td>
          <td colSpan="2" className='p-4'>{totalCartPrice} EGP</td>
          <td colSpan="2" className='p-2 sm:p-4'><Link className='px-4 py-2 text-x bg-amber-700 text-white rounded-xl' onClick={() => clearCart()}>Clear Cart</Link></td>
          <td className='p-4'>
            <Dropdown label="CheckOut" dismissOnClick={false}>
              <Link to="/checkout" state={{type:"Online Payment"}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <Dropdown.Item>Online Payment</Dropdown.Item>
              </Link>
              <Link to="/checkout" state={{type:"Cash On Delivery"}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <Dropdown.Item>Cash On Delivery</Dropdown.Item>
              </Link>
            </Dropdown>
          </td>
        </tr>
      </tbody>
      </table>
    </div>) }
    </>
  )
}
