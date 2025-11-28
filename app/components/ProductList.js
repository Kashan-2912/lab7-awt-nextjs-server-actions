'use client';

import ProductCard from './ProductCard';

export default function ProductList({ products, onCartUpdate }) {
  return (
    <div className="product-list-container">
      <h2 className="section-title">Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onCartUpdate={onCartUpdate}
          />
        ))}
      </div>
    </div>
  );
}
