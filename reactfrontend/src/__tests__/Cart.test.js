import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../Components/Cart';
import CartContext from '../Context/CartContext';

test("Render the Cart", () => {
    const cart = [
        { id: 1, product: { id: 1, title: 'FakeItem', image: "", price: 100 }, quantity: 2 }
    ];
    const removeFromCart = jest.fn();
    const addToCart = jest.fn();

    render(
        <CartContext.Provider value={{ cart, removeFromCart, addToCart }}>
            <Cart isOpen={true} toggleCart={() => {}} />
        </CartContext.Provider>
    );

    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('FakeItem')).toBeInTheDocument();
    expect(screen.getByText('2 x $100')).toBeInTheDocument();
});

test("Remove from cart", () => {
    const cart = [
        { id: 1, product: { id: 1, title: 'FakeItem', image: "", price: 100 }, quantity: 2 }
    ];
    const removeFromCart = jest.fn();
    const addToCart = jest.fn();

    render(
        <CartContext.Provider value={{ cart, removeFromCart, addToCart }}>
            <Cart isOpen={true} toggleCart={() => {}} />
        </CartContext.Provider>
    );
    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);
    expect(removeFromCart).toHaveBeenCalledWith(1);
});
