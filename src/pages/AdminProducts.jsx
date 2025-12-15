import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', description: '', price: '', category: 'aquarium', stock: '',
    brand: '', originalPrice: '' 
  });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data.products || []);
    } catch (error) { 
      console.error('Failed to fetch products'); 
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    
    try {
      await api.delete(`/products/${id}`);
      alert('✅ Product deleted!');
      fetchProducts();
    } catch (error) {
      alert('❌ Delete failed: ' + error.response?.data?.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      brand: product.brand || '',
      originalPrice: product.originalPrice || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', category: 'aquarium', stock: '', brand: '', originalPrice: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = editingProduct ? `/products/${editingProduct._id}` : '/products';
      const method = editingProduct ? 'put' : 'post';
      
      await api[method](url, formData);
      alert(editingProduct ? '✅ Product updated!' : '✅ Product created!');
      
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', category: 'aquarium', stock: '', brand: '', originalPrice: '' });
      fetchProducts();
    } catch (error) {
      alert('❌ Error: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-products container">
      <div className="flex justify-between items-center mb-8">
        <h1>Products Management</h1>
        <Link to="/admin" className="btn">← Dashboard</Link>
      </div>

      {/* ✅ CREATE/EDIT FORM */}
      <div className="create-product mb-12 p-8 bg-white rounded-xl shadow-lg">
        <h2>{editingProduct ? 'Edit Product' : 'Create New Product'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="input-group">
            <label>Name *</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Brand</label>
            <input name="brand" value={formData.brand} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Price (₹) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Original Price</label>
            <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Stock *</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="aquarium">Aquarium</option>
              <option value="fish">Fish Food</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <div className="input-group md:col-span-2">
            <label>Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required />
          </div>
          
          <div className="md:col-span-2 flex gap-4">
            <button type="submit" className="btn flex-1" disabled={loading}>
              {loading ? 'Saving...' : (editingProduct ? '✅ Update Product' : '✅ Create Product')}
            </button>
            {editingProduct && (
              <button type="button" onClick={handleCancelEdit} className="btn-secondary flex-1">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ✅ PRODUCTS TABLE - VIEW/EDIT/DELETE */}
      <div className="products-table">
        <div className="flex justify-between items-center mb-6">
          <h2>All Products ({products.length})</h2>
          <button onClick={fetchProducts} className="btn-sm bg-blue-500">🔄 Refresh</button>
        </div>
        
        <div className="grid gap-4">
          {products.map(product => (
            <div key={product._id} className="product-row flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white rounded-xl shadow border hover:shadow-lg transition-all">
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2">{product.name}</h4>
                <div className="product-meta grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <span>💰 ₹{product.price}</span>
                  <span>📦 Stock: {product.stock}</span>
                  <span>🏷️ {product.category}</span>
                  <span>🏢 {product.brand || 'N/A'}</span>
                </div>
                <p className="text-gray-700 mb-4">{product.description.substring(0, 100)}...</p>
                {product.images?.[0] && (
                  <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                )}
              </div>
              
              <div className="action-buttons flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                <button 
                  onClick={() => handleEdit(product)}
                  className="btn-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handleDelete(product._id)}
                  className="btn-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No products found. Create your first product above! 🐟</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
