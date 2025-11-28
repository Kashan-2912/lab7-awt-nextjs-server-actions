'use client';

import { useState } from 'react';
import { updateCartItemQuantity, removeFromCart, clearCart, checkout } from '../actions';

export default function ShoppingCart({ cart, totals, onCartUpdate }) {
  const [isUpdating, setIsUpdating] = useState(null);
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  async function handleQuantityChange(productId, newQuantity) {
    setIsUpdating(productId);
    try {
      const result = await updateCartItemQuantity(productId, newQuantity);
      if (result.success) {
        onCartUpdate(result.cart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(null);
    }
  }

  async function handleRemoveItem(productId) {
    setIsUpdating(productId);
    try {
      const result = await removeFromCart(productId);
      if (result.success) {
        onCartUpdate(result.cart);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setIsUpdating(null);
    }
  }

  async function handleClearCart() {
    setIsUpdating('clear');
    try {
      const result = await clearCart();
      if (result.success) {
        onCartUpdate(result.cart);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsUpdating(null);
    }
  }

  async function handleCheckout() {
    setIsUpdating('checkout');
    setCheckoutStatus(null);
    try {
      const result = await checkout();
      if (result.success) {
        setCheckoutStatus({ type: 'success', message: result.message, orderId: result.orderId });
        onCartUpdate([]);
      } else {
        setCheckoutStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setCheckoutStatus({ type: 'error', message: 'Checkout failed. Please try again.' });
    } finally {
      setIsUpdating(null);
    }
  }

  if (checkoutStatus?.type === 'success') {
    return (
      <div className="cart-container">
        <div className="checkout-success">
          <span className="success-icon">✅</span>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase.</p>
          <p className="order-id">Order ID: {checkoutStatus.orderId}</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => setCheckoutStatus(null)}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="section-title">Shopping Cart</h2>
        <div className="empty-cart">
          <span className="empty-cart-icon">🛒</span>
          <p>Your cart is empty</p>
          <p className="empty-cart-subtext">Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="section-title">Shopping Cart</h2>
        <button
          onClick={handleClearCart}
          disabled={isUpdating === 'clear'}
          className="clear-cart-btn"
        >
          {isUpdating === 'clear' ? 'Clearing...' : 'Clear Cart'}
        </button>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.productId} className="cart-item">
            <span className="cart-item-image">{item.image}</span>
            <div className="cart-item-details">
              <h4 className="cart-item-name">{item.name}</h4>
              <p className="cart-item-price">${item.price.toFixed(2)} each</p>
            </div>
            <div className="cart-item-quantity">
              <button
                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                disabled={isUpdating === item.productId}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                disabled={isUpdating === item.productId}
                className="quantity-btn"
              >
                +
              </button>
            </div>
            <span className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => handleRemoveItem(item.productId)}
              disabled={isUpdating === item.productId}
              className="remove-item-btn"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal ({totals.itemCount} items)</span>
          <span>${totals.subtotal}</span>
        </div>
        <div className="summary-row">
          <span>Tax (10%)</span>
          <span>${totals.tax}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${totals.total}</span>
        </div>
        {checkoutStatus?.type === 'error' && (
          <p className="checkout-error">{checkoutStatus.message}</p>
        )}
        <button 
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={isUpdating === 'checkout'}
        >
          {isUpdating === 'checkout' ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
}
