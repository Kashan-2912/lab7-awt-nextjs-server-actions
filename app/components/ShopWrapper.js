'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import { getCart, getCartTotals } from '../actions';

export default function ShopWrapper({ initialProducts }) {
  const [cart, setCart] = useState([]);
  const [totals, setTotals] = useState({
    subtotal: '0.00',
    tax: '0.00',
    total: '0.00',
    itemCount: 0,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCartData = useCallback(async () => {
    const [cartData, totalsData] = await Promise.all([
      getCart(),
      getCartTotals(),
    ]);
    setCart(cartData);
    setTotals(totalsData);
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  async function handleCartUpdate(newCart) {
    setCart(newCart);
    const newTotals = await getCartTotals();
    setTotals(newTotals);
  }

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1 className="shop-title">🛍️ NextShop</h1>
        <button
          className="cart-toggle-btn"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          🛒 Cart
          {totals.itemCount > 0 && (
            <span className="cart-badge">{totals.itemCount}</span>
          )}
        </button>
      </header>

      <div className="shop-content">
        <div className={`products-section ${isCartOpen ? 'with-cart' : ''}`}>
          <ProductList products={initialProducts} onCartUpdate={handleCartUpdate} />
        </div>

        <div className={`cart-section ${isCartOpen ? 'open' : ''}`}>
          <ShoppingCart cart={cart} totals={totals} onCartUpdate={handleCartUpdate} />
        </div>
      </div>
    </div>
  );
}
