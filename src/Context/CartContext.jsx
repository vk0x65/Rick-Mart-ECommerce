import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export let CartContext = createContext();
let headers = { 
    token: localStorage.getItem("userToken")
};
export default function CartContextProvider(props){
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cartId, setCartId] = useState(null)
    const [userInformation, setUserInformation] = useState([])
    const updateNumOfCartItems = (count) => {
        setNumOfCartItems(count);
    };

    async function addToCart(productId) {
        return await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
        )
        .then(response => {
            setCartId(response.data.data._id)
            toast.success(response.data.message);
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalCartPrice(response.data.data.totalCartPrice)
            return response;
        })
        .catch(error => {
            toast.error(error.data.message);
            return error;
        });
    }
    async function getCart() {
        return await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
        )
        .then(response => {
            setCartId(response.data.data._id)
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalCartPrice(response.data.data.totalCartPrice)
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function removeCartItem(productId) {
        return await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
        )
        .then(response => {
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalCartPrice(response.data.data.totalCartPrice)
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function updateProduct(productId, count) {
        return await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count},
        { headers }
        )
        .then(response => {
            setCartId(response.data.data._id)
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalCartPrice(response.data.data.totalCartPrice)
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function EmptyCart() {
        return await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
        )
        .then(response => {
            setTotalCartPrice(0)
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function getWishlist() {
        return await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
        )
        .then(response => {
            setNumOfWishlistItems(response.data.data);
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function addToWishlist(productId) {
        return await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
        )
        .then(response => {
            toast.success(response.data.message);
            setNumOfWishlistItems(response.data.data);
            return response;
        })
        .catch(error => {
            toast.error(error.data.message);
            return error;
        });
    }
    async function removeFromWishlist(productId) {
        return await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
        )
        .then(response => {
            setNumOfWishlistItems(response.data.data);
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function onlinePayment(shippingAddress) {
        return await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {shippingAddress},
        { headers }
        )
        .then(response => {
            setNumOfCartItems(0)
            setTotalCartPrice(0)
            window.location.href = response.data.session.url;
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function cashPayment(shippingAddress) {
        return await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {shippingAddress},
        { headers }
        )
        .then(response => {
            setNumOfCartItems(response.data.numOfCartItems)
            setTotalCartPrice(response.data.data.totalCartPrice)
            toast.success(response.statusText);
            window.location.href = "http://localhost:5173/allorders";
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function getUserData() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`,
        { headers }
        )
        .then(response => {
            let userId = response?.data?.decoded.id
            return userId;
        })
        .catch(error => {
            return error;
        });
    }
    async function getCustomerInfo() {
        let userId = await getUserData();
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        { headers }
        )
        .then(response => {
            setUserInformation(response.data)
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function updateUserInfo(name, email, phone) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe`,
        {name, email, phone},
        { headers }
        )
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function updateUserPassword(currentPassword, password, rePassword) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        {currentPassword, password, rePassword},
        { headers }
        )
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    async function getOrderDetails(orderId) {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/${orderId}`,{ headers })
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
    }
    return <CartContext.Provider value={{addToCart, getCart, removeCartItem, updateProduct, EmptyCart, addToWishlist, getWishlist, removeFromWishlist, updateNumOfCartItems, onlinePayment, cashPayment, getCustomerInfo, updateUserInfo, updateUserPassword, getUserData, getOrderDetails, userInformation, numOfCartItems, numOfWishlistItems, totalCartPrice}}>
        {props.children}
    </CartContext.Provider>
}