import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const dispatch = useDispatch();
  const { products,pagination } = useSelector(state => state.products);
  const [filters, setFilters] = useState({ category: '', search: '', page: 1 });

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  return (
    <div className="products-page container">
      <div className="flex gap-8">
        <div className="sidebar w-64">
          <h3>Filters</h3>
          <select 
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="input-group"
          >
            <option value="">All Categories</option>
            <option value="aquarium">Aquariums</option>
            <option value="fish">Fish Food</option>
            <option value="accessories">Accessories</option>
          </select>
          <input 
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="input-group"
          />
        </div>
        
        <div className="main-content flex-1">
          <div className="grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          {pagination.pages > 1 && (
            <div className="pagination mt-8 flex justify-center gap-2">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  className={`px-4 py-2 rounded ${filters.page === page ? 'btn' : 'btn-outline'}`}
                  onClick={() => handleFilterChange('page', page)}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
