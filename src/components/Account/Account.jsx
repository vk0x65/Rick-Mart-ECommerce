import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

export default function Account() {
  let {getCustomerInfo} = useContext(CartContext);
  const [userInfo, setUserInfo] = useState([])
  async function getUserProfileData() {
      let response = await getCustomerInfo();
      setUserInfo(response.data[0].user)
    }
    useEffect(()=>{
      getUserProfileData();
    }, [])
  return (
    <>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 xl:w-1/5 bg-gray-100 p-4 mt-4 lg:mt-8 lg:ml-6 xl:ml-10 min-w-[200px]">
            <h2 className="text-lg lg:text-xl font-bold mb-4 lg:ml-3 mt-2 lg:mt-4 text-sky-500"><i className='fa-solid fa-user mr-2'></i> Profile</h2>
            <div className="flex items-center mb-4">
              <div className="ml-4 lg:ml-8 mt-2 lg:mt-4">
                <p className="font-bold text-sky-500 text-sm lg:text-base">{userInfo.name}</p>
                <p className="text-gray-600 text-xs lg:text-sm">User</p>
              </div>
            </div>
            <ul className="space-y-2 lg:space-y-3 ml-4 lg:ml-8 mt-4 lg:mt-6 mb-4 lg:mb-8">
              <li>
                <NavLink to="profile" className="text-sm lg:text-base hover:text-sky-600">
                  <i className="fa-sharp fa-solid fa-user mr-2"></i>My Profile</NavLink>
              </li>
              <li>
                <NavLink to="orders" className="text-sm lg:text-base hover:text-sky-600">
                  <i className="fa-solid fa-cart-shopping mr-2"></i>My Orders</NavLink>
              </li>
              <li>
                <NavLink to="edit" className="text-sm lg:text-base hover:text-sky-600">
                  <i className="fa-solid fa-gear mr-2"></i>Edit Profile</NavLink>
              </li>
              <li>
                <NavLink to="password" className="text-sm lg:text-base hover:text-sky-600">
                  <i className="fa-solid fa-lock mr-2"></i>Change Password</NavLink>
              </li>
            </ul>
          </div>
          <div className="flex-1 p-4 lg:p-6 xl:p-8 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
