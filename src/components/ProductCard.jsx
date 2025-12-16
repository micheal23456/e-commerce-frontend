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
      <div className="fk-product-image">
        <img
          src={product.images?.[0] || '/api/placeholder/300/300'}
          alt={product.name}
        />
      </div>

      {/* Product Info */}
      <div className="fk-product-info">
        <h3 className="fk-product-title">{product.name}</h3>
        <p className="fk-product-brand-category">
          {product.brand && <span>{product.brand}</span>}
          {product.category && <span> • {product.category}</span>}
        </p>
        <p className="fk-product-desc">{product.description}</p>

        {/* Price Section */}
        <div className="fk-product-price-section">
          <span className="fk-product-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <>
              <span className="fk-product-mrp">₹{product.originalPrice.toLocaleString()}</span>
              {discount > 0 && <span className="fk-product-off">{discount}% OFF</span>}
            </>
          )}
        </div>

        {/* Stock Status */}
        {product.stock === 0 && <p className="fk-product-stock fk-out-of-stock">Out of Stock</p>}
        {product.stock > 0 && product.stock < 10 && (
          <p className="fk-product-stock fk-low-stock">Only {product.stock} left!</p>
        )}

        {/* Action Buttons */}
        <div className="fk-product-actions">
          <button onClick={handleBuyNowClick} className="fk-btn fk-btn-buy">
            {user ? 'BUY NOW' : 'LOGIN TO BUY'}
          </button>
          {product.stock > 0 && (
            <button onClick={handleAddToCart} className="fk-btn fk-btn-cart">
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
