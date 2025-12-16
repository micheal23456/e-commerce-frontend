import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductCard = ({ product, onBuyNow }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('🔒 Please login to add to cart!');
      return;
    }

    dispatch(addToCart(product));
    alert('✅ Added to cart!');
  };

  const handleBuyNowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBuyNow) onBuyNow(product);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Link to={`/products/${product._id}`} className="fk-product-card">
      {/* Image */}
      <div className="fk-product-thumb">
        <img
          src={product.images?.[0] || '/api/placeholder/300/300'}
          alt={product.name}
        />
      </div>

      {/* Content */}
      <div className="fk-product-body">
        {/* Title */}
        <h2 className="fk-product-title">{product.name}</h2>

        {/* Brand / category row */}
        <h4 className="fk-product-meta">
          {product.brand && <span>{product.brand}</span>}
          {product.category && <span>• {product.category}</span>}
        </h4>

        {/* Short description */}
        <h4 className="fk-product-desc">
          {product.description}
        </h4>

        {/* Price block like Flipkart */}
        <div className="fk-product-price-row">
          <span className="fk-product-price">
            ₹{product.price.toLocaleString()}
          </span>

          {product.originalPrice && (
            <>
              <span className="fk-product-mrp">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              {discount > 0 && (
                <span className="fk-product-off">{discount}% off</span>
              )}
            </>
          )}
        </div>

        {/* Stock label */}
        {product.stock === 0 && (
          <div className="fk-product-stock fk-product-stock-out">
            Out of stock
          </div>
        )}
        {product.stock > 0 && product.stock < 10 && (
          <div className="fk-product-stock fk-product-stock-low">
            Only {product.stock} left
          </div>
        )}

        {/* Buttons row */}
        <div className="fk-product-actions">
          <button
            onClick={handleBuyNowClick}
            className="fk-btn-primary"
          >
            {user ? 'BUY NOW' : 'LOGIN TO BUY'}
          </button>

          {product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="fk-btn-secondary"
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
