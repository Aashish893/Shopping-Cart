import React,{ createContext,useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                console.log('adding cart context');
            } catch (error) {
                console.log(error,"error");
            }
        } 
    },[] )
}

export default CartContext