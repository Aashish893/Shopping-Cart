import React, { useEffect, useState, useContext } from 'react';
import Cart from './Cart';
import CartContext from '../Context/CartContext';
import axios from 'axios';
function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCart, setShowCart] = useState(false);
    const {addToCart, removeFromCart, url, cart} = useContext(CartContext);
    console.log(cart)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${url}/api/products/`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.log('ERROR LOADING DATA', error);
            }
        };
        fetchProducts();
    }, [url]);

    const openCart = async () => {
        setShowCart(true);
    };
    console.log("Loading state:", loading);

    if (loading) return <p data-testid='loading'>Loading...</p>;

    return (
        <>
            <div className="flex justify-between items-center mb-4 ">
                <button
                    className="absolute right-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={openCart}
                >Open Cart
                </button>
            </div>
            <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {products.map(product => (
                    <li key={product.id} className="border rounded p-4 flex flex-col h-full">
                        <div className="w-full h-64 mb-4">
                            <img src={product.image} alt={product.title} className="w-full h-full object-contain rounded" />
                        </div>
                        <h3 className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap" style={{ maxHeight: '3em' }}>{product.title}</h3>
                        <ShowDescription description={product.description} />
                        <p className="text-lg font-bold mb-2">{product.price}</p>
                        <div className="flex justify-between items-center">
                            <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={() => addToCart(product.id)}>
                                Add
                            </button>
                            {cart.some(item => item.product.id === product.id) && (
                                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={() => removeFromCart(product.id)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <Cart isOpen={showCart} toggleCart={() => setShowCart(!showCart)} />
        </>
    );
}

function ShowDescription({ description }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <p className="text-gray-700 mb-4">
                {isExpanded ? description : `${description.substring(0, 50)}...`}
                <button className="text-xs text-blue-500 hover:underline" onClick={toggleReadMore}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            </p>
        </>
    );
}
export default ProductsList;
