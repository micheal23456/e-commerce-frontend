import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products');
      setProducts(data.products || []);
    } catch (error) { 
      console.error('Failed to fetch products'); 
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product permanently?')) return;
    
    try {
      await api.delete(`/products/${id}`);
      alert('✅ Product deleted!');
      fetchProducts();
    } catch (error) {
      alert('❌ Delete failed: ' + error.response?.data?.message);
    }
  };

  if (loading) return <div className="container py-12 text-center">Loading products...</div>;

  return (
    <div className="admin-products-list container">
      <div className="flex justify-between items-center mb-8">
        <h1>Products ({products.length})</h1>
        <div className="flex gap-4">
          <Link to="/admin/products/create" className="btn bg-green-500">➕ Create New</Link>
          <Link to="/admin" className="btn btn-secondary">← Dashboard</Link>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-2xl text-gray-500 mb-4">No products yet 🐟</p>
          <Link to="/admin/products/create" className="btn bg-blue-500">Create Your First Product</Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {products.map(product => (
            <div key={product._id} className="product-card p-8 bg-white rounded-2xl shadow-lg border hover:shadow-2xl transition-all group">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover rounded-xl" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                      <span className="text-gray-500">📦</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <div className="font-semibold text-lg">₹{product.price}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Stock:</span>
                      <div className={product.stock > 0 ? 'text-green-600' : 'text-red-600 font-semibold'}>
                        {product.stock} units
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {product.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Brand:</span>
                      <span className="font-medium">{product.brand || 'N/A'}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 self-start lg:self-center">
                  <Link 
                    to={`/admin/products/edit/${product._id}`}
                    className="btn bg-blue-500 hover:bg-blue-600 px-6 py-2"
                  >
                    ✏️ Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="btn bg-red-500 hover:bg-red-600 px-6 py-2"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductsList;
