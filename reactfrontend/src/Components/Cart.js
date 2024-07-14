import React, {useState, useEffect} from 'react';
import axios from "axios";

function Cart({isOpen, toggleCart}) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {const response = await axios.get('http://127.0.0.1:8000/api/cart/');
                console.log('getting data from backend for cart');
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Error Fetching Cart', error);
                setLoading(false);
            }
        }
        fetchCartItems();
    }, [isOpen]);

    if(!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40" onClick={toggleCart}>
                <div className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <h2 className="text-2xl font-bold p-4">Cart</h2>
                    <ul className='p-4'>
                        {cartItems.map(items =>(
                            <li key={items.id} className="mb-4 flex items-center">
                                <div>
                                    <div className="w-16 h-16 mb-4">
                                        <img src={items.product.image} alt={items.product.title} className="w-full h-full object-contain rounded"/>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{items.product.title}</h3>
                                        <p>{items.product.quantity}x{items.product.price}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}



export default Cart