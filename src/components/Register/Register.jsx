import React, { useState } from 'react';
import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [userMessage, setUserMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Name should be at least 3 characters long').max(18, 'Name maximum 18 characters long'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid password"),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref("password")]),
    phone: Yup.string().required('Phone is required').matches(/^(002)?01[0125][0-9]{8}$/, "Invalid phone number"),
  })
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerForm(values)
    },
  });
  async function registerForm(values){
    setIsLoading(true);
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data)=>{
      setUserMessage(data.data.message);
      setIsLoading(false);
      navigate("/login")
    }).catch((err)=>{
      setErrorMessage(err.response.data.message);
      setIsLoading(false);
    })
  }
  return (
    <>
    <div className='w-full md:w-1/2 lg:w-1/3 mx-auto px-4 sm:px-0 mt-72'>
      <h1 className='text-main text-2xl md:text-3xl'>Register Now</h1>
      {userMessage?<div className='p-3 sm:p-4 mb-3 sm:mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400'><p>{userMessage}</p></div> : null}
      {errorMessage?<div className='p-3 sm:p-4 mb-3 sm:mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{errorMessage}</p></div> : null}
      <form onSubmit={formik.handleSubmit}>
        <div className='my-2'>
          <label htmlFor="name" className='block mb-1 sm:mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
          <input name='name' type="text" id="name" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
          {formik.touched.name && formik.errors.name? <div className='p-3 sm:p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.name}</p></div> : null}
        </div>
        <div className='my-2'>
          <label htmlFor="email" className='block mb-1 sm:mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
          <input name='email' type="email" id="email" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
          {formik.touched.email && formik.errors.email? <div className='p-3 sm:p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.email}</p></div> : null}
        </div>
        <div className='my-2'>
          <label htmlFor="password" className='block mb-1 sm:mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
          <input name='password' type="password" id="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
          {formik.touched.password && formik.errors.password? <div className='p-3 sm:p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.password}</p></div> : null}
        </div>
        <div className='my-2'>
          <label htmlFor="rePassword" className='block mb-1 sm:mb-2 text-sm font-medium text-gray-900 dark:text-white'>RePassword</label>
          <input name='rePassword' type="password" id="rePassword" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur}/>
          {formik.touched.rePassword && formik.errors.rePassword? <div className='p-3 sm:p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.rePassword}</p></div> : null}
        </div>
        <div className='my-2'>
          <label htmlFor="phone" className='block mb-1 sm:mb-2 text-sm font-medium text-gray-900 dark:text-white'>Phone</label>
          <input name='phone' type="text" id="phone" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur}/>
          {formik.touched.phone && formik.errors.phone? <div className='p-3 sm:p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.phone}</p></div> : null}
        </div>
        <div className='my-4 text-end'>
          {isLoading ? <button type='submit' className='bg-main text-white px-4 py-2 rounded-lg w-full sm:w-auto'><i className='fa fa-spinner fa-spin'></i></button> : <button type='submit' className='bg-main text-white px-4 py-2 rounded-lg w-full sm:w-auto disabled:opacity-50' disabled={!(formik.isValid && formik.dirty)}>Register</button>}
        </div>
      </form>
    </div>
  </>
  )
}
