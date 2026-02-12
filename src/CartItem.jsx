
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from './CartSlice';

// Dedicated function to calculate total cart amount
const getTotalAmount = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
// Dedicated function to calculate total item count
const getTotalCount = (items) => items.reduce((sum, item) => sum + item.quantity, 0);

// Extracted component for rendering a single cart item row
const CartItemRow = ({ item, onIncrement, onDecrement, onDelete }) => (
  <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 8px #eee' }}>
    <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginRight: '1rem' }} />
    <div style={{ flex: 1 }}>
      <h3>{item.name}</h3>
      <p>Unit Price: ${item.price}</p>
      <p>Total: ${item.price * item.quantity}</p>
    </div>
    <div>
      <button onClick={onDecrement} style={{ marginRight: '0.5rem', padding: '0.3rem 0.7rem', borderRadius: '4px', border: 'none', background: '#eee' }}>-</button>
      <span>{item.quantity}</span>
      <button onClick={onIncrement} style={{ marginLeft: '0.5rem', padding: '0.3rem 0.7rem', borderRadius: '4px', border: 'none', background: '#eee' }}>+</button>
    </div>
    <button onClick={onDelete} style={{ marginLeft: '1rem', background: '#ff5722', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem' }}>Delete</button>
  </div>
);

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleIncrement = (id) => dispatch(incrementQuantity(id));
  const handleDecrement = (id) => dispatch(decrementQuantity(id));
  const handleDelete = (id) => dispatch(removeFromCart(id));

  const totalAmount = getTotalAmount(cartItems);
  const totalCount = getTotalCount(cartItems);

  return (
    <div>
      <nav className="navbar">
        <h1>Paradise Nursery</h1>
        <div>
          <a href="/">Home</a> | <a href="/plants">Plants</a> | <a href="/cart" className="cart-icon">Cart <span className="cart-count">{totalCount}</span></a>
        </div>
      </nav>
      <h2 style={{ marginTop: '2rem' }}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <CartItemRow
              key={item.id}
              item={item}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
          <h3>Total Cart Amount: ${totalAmount}</h3>
          <button onClick={() => alert('Checkout Coming Soon!')} style={{ background: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', padding: '1rem 2rem', marginRight: '1rem' }}>Checkout</button>
          <a href="/plants">
            <button style={{ background: '#eee', color: '#333', border: 'none', borderRadius: '8px', padding: '1rem 2rem' }}>Continue Shopping</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default CartItem;
