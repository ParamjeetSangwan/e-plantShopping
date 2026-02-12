import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './CartSlice';

const plantCategories = [
  {
    name: 'Succulents',
    plants: [
      { id: 1, name: 'Aloe Vera', price: 12, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
      { id: 2, name: 'Jade Plant', price: 15, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
      { id: 3, name: 'Zebra Plant', price: 10, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80' },
      { id: 4, name: 'Echeveria', price: 14, image: 'https://images.unsplash.com/photo-1464983953574-0892a7167e67?auto=format&fit=crop&w=400&q=80' },
      { id: 5, name: 'Panda Plant', price: 13, image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80' },
      { id: 6, name: 'String of Pearls', price: 18, image: 'https://images.unsplash.com/photo-1465101178521-c1f9c7e7b2b9?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    name: 'Foliage',
    plants: [
      { id: 7, name: 'Monstera', price: 25, image: 'https://images.unsplash.com/photo-1506744038136-462fa3a9b7f7?auto=format&fit=crop&w=400&q=80' },
      { id: 8, name: 'Snake Plant', price: 20, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
      { id: 9, name: 'Pothos', price: 16, image: 'https://images.unsplash.com/photo-1464983953574-0892a7167e67?auto=format&fit=crop&w=400&q=80' },
      { id: 10, name: 'Peace Lily', price: 22, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80' },
      { id: 11, name: 'Spider Plant', price: 17, image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80' },
      { id: 12, name: 'Philodendron', price: 19, image: 'https://images.unsplash.com/photo-1465101178521-c1f9c7e7b2b9?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    name: 'Flowering',
    plants: [
      { id: 13, name: 'African Violet', price: 15, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
      { id: 14, name: 'Peace Lily', price: 22, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80' },
      { id: 15, name: 'Anthurium', price: 24, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
      { id: 16, name: 'Bromeliad', price: 21, image: 'https://images.unsplash.com/photo-1464983953574-0892a7167e67?auto=format&fit=crop&w=400&q=80' },
      { id: 17, name: 'Kalanchoe', price: 13, image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80' },
      { id: 18, name: 'Orchid', price: 30, image: 'https://images.unsplash.com/photo-1465101178521-c1f9c7e7b2b9?auto=format&fit=crop&w=400&q=80' },
    ],
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [added, setAdded] = useState({});

  const handleAdd = (plant) => {
    dispatch(addToCart(plant));
    setAdded({ ...added, [plant.id]: true });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <nav className="navbar">
        <h1>Paradise Nursery</h1>
        <div>
          <a href="/">Home</a> | <a href="/plants">Plants</a> | <a href="/cart" className="cart-icon">Cart <span className="cart-count">{cartCount}</span></a>
        </div>
      </nav>
      {plantCategories.map(category => (
        <div key={category.name} style={{ margin: '2rem 0' }}>
          <h2>{category.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {category.plants.map(plant => (
              <div key={plant.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', width: '200px', background: '#fff' }}>
                <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                <h3>{plant.name}</h3>
                <p>${plant.price}</p>
                <button
                  disabled={!!added[plant.id]}
                  onClick={() => handleAdd(plant)}
                  style={{ background: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: !!added[plant.id] ? 'not-allowed' : 'pointer' }}
                >
                  {added[plant.id] ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
