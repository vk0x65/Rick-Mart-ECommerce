import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import { toast } from "react-hot-toast";

export default function UpdateProfile() {
  let {getCustomerInfo, updateUserInfo} = useContext(CartContext);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  async function getUserProfileData() {
    try {
      let response = await getCustomerInfo();
      if (response.data && response.data[0] && response.data[0].user) {
        setUserInfo(response.data[0].user);
      } else {
        setUserInfo(null);
      }
    } catch (err) {
      console.error(err);
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  }
  async function updateUserData(name, email, phone) {
    setIsLoading(true);
    let response = await updateUserInfo(name, email, phone);
    setIsLoading(false);
    toast.success("Information has been updated successfully!");
  }
  useEffect(() => {
    getUserProfileData();
    setIsLoading(true);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
  return (
    <>
      {isLoading ? (<Loader />) : (<div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 xl:w-1/2 p-4 lg:p-6 mt-8 lg:mt-12 mx-auto lg:ml-10">
              <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-600"><i className="fa-sharp fa-solid fa-bars mr-3"></i>Edit Profile</h1>
              <div className="mt-5 border-t-2 border-blue-500">
                <form className="max-w-md mx-auto md:mx-14 my-6 md:my-10 lg:my-14">
                  <div className="mb-4 md:mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="name" className="w-full p-2 md:p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={userInfo?.name ? userInfo.name : "Something Went Wrong!"} onChange={handleInputChange}/>
                  </div>
                  <div className="mb-4 md:mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" id="email" className="w-full p-2 md:p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={userInfo?.email ? userInfo.email : "Something Went Wrong!"} onChange={handleInputChange}/>
                  </div>
                  <div className="mb-4 md:mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                    <input type="text" id="phone" className="w-full p-2 md:p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={userInfo?.phone ? userInfo.phone : "Something Went Wrong!"} onChange={handleInputChange}/>
                  </div>
                  <button className="w-full md:w-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => updateUserData(userInfo.name, userInfo.email, userInfo.phone)}>Edit Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
