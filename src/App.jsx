import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import BrandDetails from './components/BrandDetails/BrandDetails'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import ProtectedAuthentication from './components/ProtectedAuthentication/ProtectedAuthentication'
import AllOrders from './components/AllOrders/AllOrders'
import WishList from './components/WishList/WishList'
import Checkout from './components/Checkout/Checkout'
import Account from './components/Account/Account'
import Profile from './components/Profile/Profile'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'
import Orders from './components/Orders/Orders'
import ChangePassword from './components/ChangePassword/ChangePassword'
import ForgetAccount from './components/ForgetAccount/ForgetAccount'
import VerifyOtp from './components/VerifyOTP/VerifyOTP'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import OrderDetails from './components/OrderDetails/OrderDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

function App() {
  const queryClient = new QueryClient()

  let routes = createBrowserRouter([
    {
      path: "", 
      element: <Layout />, 
      children: [
      {index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes>},
      {path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
      {path: "allorders", element:<ProtectedRoutes> <AllOrders /></ProtectedRoutes> },
      {path: "productDetails/:prodId/:category", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes>},
      {path: "brandDetails/:prodId", element: <ProtectedRoutes><BrandDetails /></ProtectedRoutes>},
      {path: "OrderDetails/:orderId", element: <ProtectedRoutes><OrderDetails  /></ProtectedRoutes>},
      {path: "categoryDetails/:prodId", element: <ProtectedRoutes><CategoryDetails /></ProtectedRoutes>},
      {path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
      {path: "wishlist", element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
      {path: "categories", element:<ProtectedRoutes> <Categories /></ProtectedRoutes> },
      {path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
      {path: "checkout", element: <ProtectedRoutes><Checkout /></ProtectedRoutes> },
      {path: "account", element: <ProtectedRoutes><Account /></ProtectedRoutes>,
        children: [
          {path:"profile", element: <Profile />},
          {path:"orders", element: <Orders />},
          {path:"edit", element: <UpdateProfile />},
          {path:"password", element: <ChangePassword />},
          {path:"*", element: <NotFound />}
        ]
      },
      {path: "register", element: <ProtectedAuthentication><Register /></ProtectedAuthentication>},
      {path: "login", element: <ProtectedAuthentication><Login /></ProtectedAuthentication>},
      {path: "forgetaccount", element: <ProtectedAuthentication><ForgetAccount /></ProtectedAuthentication>},
      {path: "verifyotp", element: <ProtectedAuthentication><VerifyOtp /></ProtectedAuthentication>},
      {path: "forgetpassword", element: <ProtectedAuthentication><ForgetPassword /></ProtectedAuthentication>},
      {path:"*", element: <NotFound />}
      ]
    }
  ])

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster position="top-right" reverseOrder={false}/>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
    </>
  )
}

export default App