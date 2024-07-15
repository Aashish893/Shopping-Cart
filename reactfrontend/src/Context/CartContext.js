import React,{ createContext,useEffect, useState } from "react";
import axios from "axios";

export const CartContext =  createContext();

export const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [cartUpdate, setCartUpdate] = useState(false);


    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cart/');
                setCart(response.data);
            } catch (error) {
                console.log(error,"error");
            }
        } 
        fetchCart();
    },[cartUpdate] )

    const addToCart = async (productId) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/cart/add/', { productId })
            setCartUpdate(prevState => !prevState)
        } catch (error) {
            console.log(error);
        }
    }
    const removeFromCart = async (productId) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/cart/remove/', { productId })
            setCartUpdate(!cartUpdate);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, cartUpdate}}>
            {children}
        </CartContext.Provider>
    )

}
export default CartContext;