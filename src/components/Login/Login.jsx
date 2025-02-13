import React, { useState } from 'react';
import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TokenContext } from '../../Context/TokenContext';

export default function Login() {
  let {token, setToken} = useContext(TokenContext)
  const [userMessage, setUserMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let mySchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email address'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      loginForm(values)
    },
  });

  async function loginForm(values){
    setIsLoading(true);
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((data)=>{
      localStorage.setItem("userToken", data.data.token)
      setToken(data.data.token)
      setUserMessage(data.data.message);
      setIsLoading(false);
      navigate("/")
    }).catch((err)=>{
      setErrorMessage(err.response.data.message);
      setIsLoading(false);
    })
  }
  return (
    <>
      <div className='w-full md:w-1/2 lg:w-1/3 mx-auto px-4 sm:px-0 mt-96'>
        <h1 className='text-main text-2xl md:text-3xl'>Login Now</h1>
        {userMessage && (<div className='p-3 sm:p-4 mb-3 sm:mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400'><p>{userMessage}</p></div>)}
        {errorMessage && (<div className='p-3 sm:p-4 mb-3 sm:mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{errorMessage}</p></div>)}
        <form onSubmit={formik.handleSubmit}>
          <div className='my-2'>
            <label htmlFor="email" className='block mb-1 sm:mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
            <input name='email' type="email" id="email" className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
            {formik.touched.email && formik.errors.email && (<div className='p-3 sm:p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.email}</p></div>)}
          </div>
          <div className='my-2'>
            <label htmlFor="password" className='block mb-1 sm:mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
            <input name='password' type="password" id="password" className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
            {formik.touched.password && formik.errors.password && (<div className='p-3 sm:p-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'><p>{formik.errors.password}</p></div>)}
          </div>
          <div className='my-4 flex flex-col sm:flex-row justify-between items-stretch gap-4 sm:gap-0'>
            <Link to="/forgetaccount" className='text-main text-sm hover:underline self-center'>Forget your password?</Link>
            {isLoading ? (<button type='submit' className='bg-main text-white px-4 py-2 rounded-lg w-full sm:w-auto'><i className='fa fa-spinner fa-spin'></i></button>) : (<button type='submit' className='bg-main text-white px-4 py-2 rounded-lg w-full sm:w-auto disabled:opacity-50' disabled={!(formik.isValid && formik.dirty)}>Login</button>)}
          </div>
        </form>
      </div>
    </>
  )
}
