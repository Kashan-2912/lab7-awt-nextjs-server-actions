'use client';

import { useState } from 'react';
import { addToCart } from '../actions';

export default function ProductCard({ product, onCartUpdate }) {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  async function handleAddToCart() {
    setIsAdding(true);
    setMessage('');
    
    try {
      const result = await addToCart(product.id);
      if (result.success) {
        setMessage('Added!');
        onCartUpdate(result.cart);
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Error adding to cart');
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="product-card">
      <div className="product-image">{product.image}</div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="add-to-cart-btn"
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
        {message && <span className="cart-message">{message}</span>}
      </div>
    </div>
  );
}
