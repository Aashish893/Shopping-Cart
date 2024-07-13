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
                        <h3 className="text-l font-semibold"> {product.title} </h3> 
                        <ShowDescription description={product.description}/>
                        {/* <p className="text-xs text-gray-700 mb-2"> {product.description} </p> */}
                        <p className="text-lg font-bold mb-2">{product.price}</p>
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
                            onClick={() => console.log("CLICKED")}
                        >+</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

function ShowDescription ({description}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    }

    return(
        <>
            <p className="text-gray-700 mb-4"> {isExpanded ? description : `${description.substring(0, 50)}...`}
            <button className="text-xs text-blue-500 hover:underline" onClick={toggleReadMore}>
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
            </p>
        </>
    )
}

export default ProductsList