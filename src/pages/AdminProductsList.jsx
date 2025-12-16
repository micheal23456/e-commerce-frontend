// src/pages/AdminProductsList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

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
      alert('❌ Delete failed: ' + (error.response?.data?.message || 'Error'));
    }
  };

  const filteredProducts = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="admin-products-list">
        <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-products-list">
      {/* Header */}
      <div className="admin-products-header">
        <h1>Products ({products.length})</h1>
        <div className="admin-products-actions">
          {/* Search with icon */}
          <div className="admin-products-search-wrap">
            <span className="admin-products-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, brand, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-products-search"
            />
          </div>

          <Link to="/admin/products/create" className="btn btn-green">
            ➕ Create New
          </Link>
          <Link to="/admin" className="btn btn-light">
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Empty / filtered state */}
      {filteredProducts.length === 0 ? (
        search.trim() ? (
          <div className="products-empty-card">
            <p className="products-empty-title">
              No products match “{search}”
            </p>
          </div>
        ) : (
          <div className="products-empty-card">
            <p className="products-empty-title">No products yet 🐟</p>
            <Link to="/admin/products/create" className="btn btn-blue">
              Create Your First Product
            </Link>
          </div>
        )
      ) : (
        <div className="admin-products-list-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="admin-product-card">
              <div className="admin-product-layout">
                {/* Image */}
                <div className="admin-product-thumb-wrap">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="admin-product-thumb"
                    />
                  ) : (
                    <div className="admin-product-thumb-empty">
                      <span>📦</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="admin-product-main">
                  <h3 className="admin-product-title">{product.name}</h3>

                  <div className="admin-product-meta-grid">
                    <div>
                      <span className="admin-label">Price:</span>
                      <div className="admin-meta-strong">₹{product.price}</div>
                    </div>
                    <div>
                      <span className="admin-label">Stock:</span>
                      <div
                        className={
                          product.stock > 0
                            ? 'admin-stock-positive'
                            : 'admin-stock-negative'
                        }
                      >
                        {product.stock} units
                      </div>
                    </div>
                    <div>
                      <span className="admin-label">Category:</span>
                      <span className="admin-badge-blue">
                        {product.category}
                      </span>
                    </div>
                    <div>
                      <span className="admin-label">Brand:</span>
                      <span className="admin-meta-strong">
                        {product.brand || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <p className="admin-product-description">
                    {product.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="admin-product-actions">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="btn-row edit"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn-row delete"
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
