import React from 'react';
import ProductsList from './Components/ProductsList';

function App() {
  return (
    <div className="App container mx-auto p-4">
      <h1 className='text-4xl font-bold mb-6'>Products List</h1>
      <ProductsList />
    </div>
  );
}

export default App;
