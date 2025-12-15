import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch} from 'react-redux';
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
    <div className="product-detail container">
      <div className="grid grid-cols-2 gap-12">
        <div className="product-images">
          <img 
            src={product.images?.[0]} 
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl mb-4"
          />
          <div className="image-thumbs flex gap-2">
            {product.images?.slice(1, 4).map((img, idx) => (
              <img key={idx} src={img} alt="" className="w-20 h-20 object-cover rounded cursor-pointer" />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="price text-3xl font-bold text-green-600">₹{product.price}</div>
            {product.originalPrice && (
              <div className="text-xl text-gray-500 line-through">₹{product.originalPrice}</div>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
            <div className="product-meta flex gap-6 text-sm">
              <span>⭐ {product.ratings?.average || 0} ({product.ratings?.count || 0} reviews)</span>
              <span>📦 {product.stock} in stock</span>
              <span>🏷️ {product.category}</span>
            </div>
          </div>

          <div className="quantity-selector mb-6 flex items-center gap-4">
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border rounded-full flex items-center justify-center"
              >
                -
              </button>
              <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 border rounded-full flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons flex gap-4">
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn flex-1 py-4 text-lg"
            >
              {product.stock > 0 ? `Add to Cart - ₹${(product.price * quantity).toLocaleString()}` : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
