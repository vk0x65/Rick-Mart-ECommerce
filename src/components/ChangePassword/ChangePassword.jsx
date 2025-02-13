import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import { toast } from "react-hot-toast";
export default function ChangePassword() {
  let { updateUserPassword } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    password: '',
    rePassword: ''
  });

  async function updateUserPass(currentPassword, password, rePassword) {
    if (password.length > 5) { 
      toast.error("Password must be at least 5 characters long!");
      return;
    } else if (password !== rePassword) {
      toast.error("Passwords don't match!");
      return;
    } else {
      setIsLoading(true);
      try {
        let response = await updateUserPassword(currentPassword, password, rePassword);
        toast.success("Password has been changed successfully!");
        setPasswords({ currentPassword: '', password: '', rePassword: '' });
      } catch (error) {
        toast.error("Failed to update password!");
      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <>
    {isLoading ? <Loader /> :
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 xl:w-1/2 p-4 lg:p-6 mt-8 lg:mt-12 mx-auto lg:ml-10">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-600"><i className='fa-sharp fa-solid fa-bars mr-3'></i>Change Password</h1>
            <div className='mt-5 border-t-2 border-blue-500'>
              <form className="max-w-md mx-auto md:mx-14 my-6 md:my-10 lg:my-14">
                <div className="mb-4 md:mb-5">
                  <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                  <input type="password" id="currentPassword" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={passwords.currentPassword} onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}/>
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                  <input type="password" id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={passwords.password} onChange={(e) => setPasswords({...passwords, password: e.target.value})}/>
                </div>
                <div className="mb-5">
                  <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                  <input type="password" id="rePassword" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={passwords.rePassword}onChange={(e) => setPasswords({...passwords, rePassword: e.target.value})}/>
                </div>
                <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => updateUserPass(passwords.currentPassword, passwords.password, passwords.rePassword)} disabled={isLoading}> {isLoading ? "Changing..." : "Change Password"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
