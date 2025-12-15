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
    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card-wrapper">
      <Link to={`/products/${product._id}`} className="product-card card hover:shadow-2xl transition-all group">
        {/* Product Image */}
        <div className="product-image relative overflow-hidden rounded-xl">
          <img 
            src={product.images?.[0] || '/api/placeholder/300/300'} 
            alt={product.name} 
            className="product-img w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="discount-badge absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {discount}% OFF
            </div>
          )}
          
          {/* Stock Badge */}
          {product.stock === 0 ? (
            <div className="stock-badge absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Out of Stock
            </div>
          ) : product.stock < 10 ? (
            <div className="stock-badge absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Only {product.stock} left!
            </div>
          ) : null}
        </div>

        {/* Product Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="category-badge mb-3">
            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {product.category}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="product-name text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-gray-500 mb-4 font-medium">{product.brand}</p>
          )}

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-12">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="price-section mb-6">
            <div className="price-current text-2xl font-black text-gray-900 mb-1">
              ₹{product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="price-original flex items-center gap-2 mb-2">
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                {discount > 0 && (
                  <span className="discount-tag bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    Save ₹{Math.round(product.originalPrice - product.price)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons flex flex-col gap-3">
            {/* Buy Now Button */}
            <button 
              onClick={handleBuyNowClick}
              className="buy-now-btn bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg"
            >
              {user ? '🛒 Buy Now - Pay Later' : '🔒  Buy'}
            </button>

            {/* Add to Cart Button */}
                 
            {product.stock > 0 && (
              <button 
                onClick={handleAddToCart}
                className="add-cart-btn border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                ➕ Add to Cart
              </button>
            )}
          
            {/* Out of Stock */}
            {product.stock === 0 && (
              <div className="out-of-stock text-center py-3 px-6 bg-red-50 border-2 border-red-200 text-red-600 font-semibold rounded-xl">
                ❌ Out of Stock
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
