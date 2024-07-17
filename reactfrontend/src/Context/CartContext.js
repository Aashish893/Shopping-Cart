import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { backEndURL } from "../constants";
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartUpdate, setCartUpdate] = useState(false);
    console.log(backEndURL)
    // const url = 'http://127.0.0.1:8000';
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${backEndURL}/api/cart/`);
                setCart(response.data);
            } catch (error) {
                console.log(error, "error");
            }
        }
        fetchCart();
    }, [cartUpdate])

    const addToCart = async (productId) => {
        try {
            await axios.post(`${backEndURL}/api/cart/add/`, { productId })
            setCartUpdate(prevState => !prevState)
        } catch (error) {
            console.log(error);
        }
    }
    const removeFromCart = async (productId) => {
        try {
            await axios.post(`${backEndURL}/api/cart/remove/`, { productId })
            setCartUpdate(!cartUpdate);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartUpdate, backEndURL }}>
            {children}
        </CartContext.Provider>
    )

}
export default CartContext;