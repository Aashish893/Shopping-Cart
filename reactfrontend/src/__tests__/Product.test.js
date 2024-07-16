import React from "react";
import { render, screen, act } from '@testing-library/react';
import axios from "axios";
import CartContext from "../Context/CartContext";
import ProductsList from "../Components/ProductsList";
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const removeFromCart = jest.fn();
const addToCart = jest.fn();

test("Testing Product List", async () => {
    const products = [
        { id: 1, title: 'FakeItem 1', image: "", price: 100, description: 'Description 1' },
        { id: 2, title: 'FakeItem 2', image: "", price: 200, description: 'Description 2' },
    ];
    
    mock.onGet('http://127.0.0.1:8000/api/products/').reply(200, products);

    await act(async () => {
        render(
            <CartContext.Provider value={{ removeFromCart, addToCart }}>
                <ProductsList />
            </CartContext.Provider>
        );
    });


// Ensure loading message is no longer in the document
expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    

// Wait for the product items to be rendered
const productItem1 = await screen.findByText('FakeItem 1');
expect(productItem1).toBeInTheDocument();

const productItem2 = await screen.findByText('FakeItem 2');
expect(productItem2).toBeInTheDocument();

});
