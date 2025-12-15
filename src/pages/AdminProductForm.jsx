import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', description: '', price: '', category: '', stock: '',
    brand: '', originalPrice: '' 
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!id;

  // ✅ FIXED: useCallback for fetchProduct
  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      const product = data.product;
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        brand: product.brand || '',
        originalPrice: product.originalPrice || ''
      });
    } catch (error) {
      alert('Failed to load product');
    }
  }, [id]);

  // ✅ FIXED: Proper useEffect dependencies
  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [isEdit, fetchProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      const url = isEdit ? `/products/${id}` : '/products';
      const method = isEdit ? 'put' : 'post';
      
      await api[method](url, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert(isEdit ? '✅ Product updated!' : '✅ Product created!');
      navigate('/admin/products');
    } catch (error) {
      alert('❌ Error: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="admin-product-form container">
      <div className="flex justify-between items-center mb-8">
        <h1>{isEdit ? 'Edit Product' : 'Create Product'}</h1>
        <Link to="/admin/products" className="btn btn-secondary">← Back to Products</Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="input-group">
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="input-group">
              <label className="block text-sm font-medium mb-2">Brand</label>
              <input 
                name="brand" 
                value={formData.brand} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="input-group">
              <label className="block text-sm font-medium mb-2">Category *</label>
              <input 
                type="text" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required 
                placeholder="e.g. aquarium, fish food, accessories, plants"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="input-group">
              <label className="block text-sm font-medium mb-2">Price (₹) *</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="input-group">
              <label className="block text-sm font-medium mb-2">Stock *</label>
              <input 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="input-group">
              <label className="block text-sm font-medium mb-2">Original Price</label>
              <input 
                type="number" 
                name="originalPrice" 
                value={formData.originalPrice} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
          
          <div className="input-group mb-8">
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="4" 
              required 
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 resize-vertical"
            />
          </div>
          
          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="btn bg-green-500 hover:bg-green-600 flex-1 py-3 text-lg font-medium rounded-xl transition-all"
            >
              {loading ? '💾 Saving...' : (isEdit ? '✅ Update Product' : '✅ Create Product')}
            </button>
            <Link 
              to="/admin/products" 
              className="btn btn-secondary hover:bg-gray-600 flex-1 py-3 text-lg font-medium rounded-xl transition-all"
            >
              ❌ Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
