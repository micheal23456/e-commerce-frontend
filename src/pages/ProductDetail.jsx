import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import api from '../utils/api';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.error('Product fetch failed');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className="product-detail">
      <div className="product-detail-inner">
        {/* Left: images */}
        <div className="product-images-card">
          <div className="product-main-image">
            <img
              src={product.images?.[0]}
              alt={product.name}
            />
          </div>

          <div className="product-image-thumbs">
            {product.images?.slice(1, 4).map((img, idx) => (
              <div key={idx} className="product-thumb">
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: info */}
        <div className="product-info-card">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-price-row">
            <div className="product-price">₹{product.price}</div>
            {product.originalPrice && (
              <div className="product-original-price">
                ₹{product.originalPrice}
              </div>
            )}
          </div>

          <div>
            <p className="product-description">{product.description}</p>
            <div className="product-meta">
              <span>
                ⭐ {product.ratings?.average || 0} (
                {product.ratings?.count || 0} reviews)
              </span>
              <span>📦 {product.stock} in stock</span>
              <span>🏷️ {product.category}</span>
            </div>
          </div>

          <div className="quantity-selector">
            <span className="quantity-label">Quantity:</span>
            <div className="quantity-box">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="quantity-btn"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn btn-primary"
            >
              {product.stock > 0
                ? `Add to Cart - ₹${(product.price * quantity).toLocaleString()}`
                : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
