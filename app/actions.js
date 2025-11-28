'use server';

// Simulated product database
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: '🎧',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    description: 'Feature-rich smartwatch with health monitoring',
    image: '⌚',
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 79.99,
    description: 'Comfortable running shoes for all terrains',
    image: '👟',
    category: 'Sports',
  },
  {
    id: 4,
    name: 'Backpack',
    price: 49.99,
    description: 'Durable backpack with multiple compartments',
    image: '🎒',
    category: 'Accessories',
  },
  {
    id: 5,
    name: 'Coffee Maker',
    price: 129.99,
    description: 'Automatic coffee maker with programmable settings',
    image: '☕',
    category: 'Home',
  },
  {
    id: 6,
    name: 'Desk Lamp',
    price: 34.99,
    description: 'LED desk lamp with adjustable brightness',
    image: '💡',
    category: 'Home',
  },
];

// In-memory cart storage (in a real app, this would be a database)
let cart = [];

// Get all products
export async function getProducts() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products;
}

// Get a single product by ID
export async function getProductById(productId) {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return products.find((p) => p.id === productId) || null;
}

// Get cart contents
export async function getCart() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return cart;
}

// Add item to cart
export async function addToCart(productId) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return { success: false, message: 'Product not found' };
  }

  const existingItem = cart.find((item) => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  return { success: true, cart, message: `${product.name} added to cart` };
}

// Update item quantity in cart
export async function updateCartItemQuantity(productId, quantity) {
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (quantity < 1) {
    return removeFromCart(productId);
  }

  const itemIndex = cart.findIndex((item) => item.productId === productId);
  
  if (itemIndex === -1) {
    return { success: false, message: 'Item not found in cart' };
  }

  cart[itemIndex].quantity = quantity;
  return { success: true, cart, message: 'Quantity updated' };
}

// Remove item from cart
export async function removeFromCart(productId) {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const itemIndex = cart.findIndex((item) => item.productId === productId);
  
  if (itemIndex === -1) {
    return { success: false, message: 'Item not found in cart' };
  }

  const removedItem = cart[itemIndex];
  cart = cart.filter((item) => item.productId !== productId);
  
  return { success: true, cart, message: `${removedItem.name} removed from cart` };
}

// Clear the entire cart
export async function clearCart() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  cart = [];
  return { success: true, cart: [], message: 'Cart cleared' };
}

// Calculate cart totals
export async function getCartTotals() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return {
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
    itemCount,
  };
}
