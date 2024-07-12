import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetcProducts = async() =>{
            try {
                const responsne = await axios.get('http://127.0.0.1:8000/api/products/');
                setProducts(responsne.data);
                setLoading(false);
            } catch (error) {
                console.log('ERROR LOADING DATA', error);
                setLoading(false);
            }
        }
        fetcProducts();
    },[])
    
    if(loading) return <p>Loading</p>

    return(
        <>
            <h2 className="text-2xl font-bold mb-4">ProductsList</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <li key = {product.id}>
                        <div className="w-full h-64 mb-4">
                            <img src={product.image} alt={product.title} className="w-full h-full object-contain rounded"/>
                        </div>
                        <h3 className="text-xl font-semibold"> {product.title} </h3> 
                        <p className="text-xs text-gray-700 mb-2"> {product.description} </p>
                        <p className="text-lg font-bold mb-2">{product.price}</p>
                        
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ProductsList