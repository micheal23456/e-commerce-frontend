// src/pages/AdminProductForm.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    stock: '',
    brand: '',
    originalPrice: '',
    discount: '',
    isFeatured: false,
    isActive: true,
    tags: '',
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      const p = data.product;

      setFormData({
        name: p.name || '',
        description: p.description || '',
        price: p.price ?? '',
        category: p.category || '',
        subCategory: p.subCategory || '',
        stock: p.stock ?? '',
        brand: p.brand || '',
        originalPrice: p.originalPrice ?? '',
        discount: p.discount ?? '',
        isFeatured: p.isFeatured ?? false,
        isActive: p.isActive ?? true,
        tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
      });
      // existing images/video can be shown separately if you want;
      // for now, new uploads will replace on backend side as you define.
    } catch (err) {
      alert('Failed to load product');
    }
  }, [id]);

  useEffect(() => {
    if (isEdit) fetchProduct();
  }, [isEdit, fetchProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImagesChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const send = new FormData();

      // normal fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          if (key === 'isFeatured' || key === 'isActive') {
            send.append(key, value ? 'true' : 'false');
          } else if (key === 'tags') {
            const tagsArr = value
              .split(',')
              .map(t => t.trim())
              .filter(Boolean);
            tagsArr.forEach(t => send.append('tags[]', t));
          } else {
            send.append(key, value);
          }
        }
      });

      // images
      imageFiles.forEach(file => {
        send.append('images', file);
      });

      // video file
      if (videoFile) {
        send.append('video', videoFile);
      }

      const url = isEdit ? `/products/${id}` : '/products';
      const method = isEdit ? 'put' : 'post';

      await api[method](url, send, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(isEdit ? '✅ Product updated!' : '✅ Product created!');
      navigate('/admin/products');
    } catch (error) {
      alert('❌ Error: ' + (error.response?.data?.message || 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">
          {isEdit ? 'Edit Product' : 'Create Product'}
        </h1>
        <Link to="/admin/products" className="admin-create-btn">
          ← Back to Products
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        {/* top fields */}
        <div
          className="admin-form-field-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
            gap: '14px',
            marginBottom: 16,
          }}
        >
          <div className="admin-form-field">
            <label className="admin-form-label">Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Brand</label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Category *</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="aquarium, fish food, accessories..."
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Sub Category</label>
            <input
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="planted tank, filters, etc."
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Original Price</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              min="0"
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-field">
            <label className="admin-form-label">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="admin-form-input"
            />
          </div>
        </div>

        {/* description */}
        <div className="admin-form-field">
          <label className="admin-form-label">Description *</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            className="admin-form-textarea"
          />
        </div>

        {/* media + flags */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)',
            gap: 16,
            marginTop: 12,
          }}
        >
          <div>
            <div className="admin-form-field">
              <label className="admin-form-label">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
                className="admin-form-input"
              />
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: 4 }}>
                Select one or more product images.
              </p>
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Video (upload)</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0] || null)}
                className="admin-form-input"
              />
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: 4 }}>
                Optional short video showcasing the product.
              </p>
            </div>
          </div>

          <div>
            <div className="admin-form-field">
              <label className="admin-form-label">Tags (comma separated)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="planted, nano tank, beginner"
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-field" style={{ marginTop: 8 }}>
              <label className="admin-form-label">Flags</label>
              <div
                style={{
                  display: 'flex',
                  gap: 16,
                  fontSize: '0.9rem',
                  marginTop: 4,
                }}
              >
                <label>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    style={{ marginRight: 4 }}
                  />
                  Featured
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    style={{ marginRight: 4 }}
                  />
                  Active
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button
            type="submit"
            disabled={loading}
            className="admin-save-btn"
            style={{ flex: 1 }}
          >
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>

          <Link
            to="/admin/products"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '8px 0',
              borderRadius: 4,
              border: '1px solid #9ca3af',
              background: '#f3f4f6',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#374151',
              textDecoration: 'none',
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
