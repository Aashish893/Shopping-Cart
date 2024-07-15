import React, {useContext } from 'react';
import CartContext from '../Context/CartContext';

function Cart({ isOpen, toggleCart }) {
    const { cart: cartItems, removeFromCart, addToCart } = useContext(CartContext);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40" onClick={toggleCart}>
            <div 
                className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-2xl font-bold">Cart</h2>
                    <button onClick={toggleCart} className="text-gray-600 hover:text-gray-800">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="overflow-y-auto h-[calc(100%_-_56px)] p-4">
                    <ul>
                        {cartItems.length === 0 ? (
                            <p>Your Cart is Empty</p>
                        ) : (
                            cartItems.map(item => (
                                <li key={item.id} className="mb-4 flex items-center">
                                    <div>
                                        <div className="w-16 h-16 mb-4">
                                            <img src={item.product.image} alt={item.product.title} className="w-full h-full object-contain rounded" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{item.product.title}</h3>
                                            <p>{item.quantity} x ${item.product.price}</p>
                                        </div>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mt-2"
                                                onClick={() => removeFromCart(item.product.id)}>-</button>
                                        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                                                onClick={() => addToCart(item.product.id)}>+</button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cart;
