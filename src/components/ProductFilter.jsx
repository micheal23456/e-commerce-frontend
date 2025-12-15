import React from 'react';

const ProductFilter = ({ 
  filters, 
  onFilterChange, 
  categories = ['aquarium', 'fish', 'accessories', 'plants'] 
}) => {
  return (
    <div className="filter-sidebar card p-6 sticky top-8">
      <h3 className="mb-4 font-semibold">Filters</h3>
      
      {/* Category Filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Category</label>
        <select 
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="input-group w-full"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Price Range</label>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="input-group flex-1"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="input-group flex-1"
          />
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="input-group w-full"
        />
      </div>

      <button 
        onClick={() => onFilterChange('reset', true)}
        className="btn w-full text-sm"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilter;
