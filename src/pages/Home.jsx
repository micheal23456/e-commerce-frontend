import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../slices/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { products, loading, pagination } = useSelector(state => state.products);
  const [filters, setFilters] = useState({ category: '', search: '', page: 1 });

  useEffect(() => {
    dispatch(fetchProducts({ category: 'featured', ...filters }));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleBuyNow = (product) => {
    if (!user) {
      alert('🔒 Please login to continue shopping!');
      navigate('/login');
      return;
    }
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="flipkart-clone">
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          scrollbar-width: none;  /* Firefox */
          -ms-overflow-style: none;  /* IE/Edge */
        }

        body::-webkit-scrollbar {
          display: none;  /* Chrome/Safari/Webkit */
        }

        .flipkart-clone {
          font-family: Whitney, Helvetica Neue, Helvetica, Arial, sans-serif;
          background: linear-gradient(180deg, #f1f3f6 0%, #e9ecef 100%);
          color: #212121;
          line-height: 1.4;
          overflow-x: hidden;
          height: 100vh;
          position: relative;
        }

        /* TOP NOTIFICATION BAR */
        .top-notification {
          background: linear-gradient(90deg, #4267b2, #365899);
          color: #fff;
          padding: 0.6rem 0;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }

        .top-content {
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* MAIN HEADER - EXACT FLIPKART */
        .main-header {
          background: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .header-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 20px;
          height: 90px;
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .flipkart-logo {
          font-size: 32px;
          font-weight: 700;
          color: #2874f0 !important;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: -0.5px;
          flex-shrink: 0;
        }

        /* FLIPKART SEARCH - PIXEL PERFECT */
        .search-wrapper {
          flex: 1;
          max-width: 680px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input-wrapper {
          width: 100%;
          display: flex;
          border: 1px solid #d1d5db;
          border-radius: 2px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .search-category-select {
          height: 42px;
          border: none;
          background: #f7f7f7;
          padding: 0 16px;
          font-size: 13px;
          color: #535766;
          min-width: 130px;
          cursor: pointer;
        }

        .search-category-select option {
          background: #fff;
          color: #333;
        }

        .search-input {
          flex: 1;
          height: 42px;
          border: none;
          padding: 0 16px;
          font-size: 15px;
          outline: none;
          background: transparent;
        }

        .search-btn {
          height: 42px;
          background: #ffe11b;
          border: none;
          padding: 0 24px;
          font-size: 15px;
          font-weight: 700;
          color: #333;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .search-btn:hover {
          background: #ffd33b;
          transform: scale(1.02);
        }

        /* HEADER ACTIONS */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-shrink: 0;
        }

        .action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #535766;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .action-item:hover {
          background: #f7f7f7;
          color: #2874f0;
        }

        .action-icon {
          font-size: 22px;
          margin-bottom: 2px;
        }

        /* HERO SLIDER */
        .hero-slider {
          height: 280px;
          background: linear-gradient(135deg, #ff9f00 0%, #ff7b00 50%, #ff6b00 100%);
          position: relative;
          overflow: hidden;
          margin: 0;
        }

        .hero-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #fff;
          z-index: 2;
          max-width: 800px;
          padding: 0 20px;
        }

        .hero-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 12px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 22px;
          font-weight: 400;
          opacity: 0.95;
          text-shadow: 0 1px 5px rgba(0,0,0,0.2);
        }

        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%);
          opacity: 0.6;
        }

        /* CATEGORIES GRID - FLIPKART STYLE */
        .categories-wrapper {
          background: #fff;
          margin: 24px 0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        .categories-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 32px 20px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 24px;
          align-items: center;
        }

        .category-item {
          text-align: center;
          padding: 24px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .category-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(40,116,240,0.15);
          border-color: #2874f0;
        }

        .category-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s;
        }

        .category-item:hover::before {
          left: 100%;
        }

        .category-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
        }

        .category-label {
          font-size: 16px;
          font-weight: 600;
          color: #212121;
        }

        /* PRODUCTS SECTION */
        .products-wrapper {
          max-width: 1350px;
          margin: 0 auto 40px;
          padding: 0 20px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .section-title {
          font-size: 26px;
          font-weight: 700;
          color: #212121;
          letter-spacing: -0.5px;
        }

        .filter-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .category-filter {
          height: 42px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 0 16px;
          background: #fff;
          font-size: 14px;
          color: #535766;
          min-width: 200px;
          cursor: pointer;
        }

        /* PRODUCTS GRID */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }

        .loading-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 40px;
          color: #666;
          font-size: 18px;
          font-weight: 500;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 12px;
          border: 1px solid #dee2e6;
        }

        /* PAGINATION - FLIPKART STYLE */
        .pagination-container {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          padding: 24px 0;
        }

        .pagination-btn {
          min-width: 48px;
          height: 42px;
          padding: 0 16px;
          border: 1px solid #d1d5db;
          background: #fff;
          border-radius: 4px;
          font-weight: 600;
          font-size: 14px;
          color: #535766;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pagination-btn:hover:not(.active) {
          background: #f7f7f7;
          border-color: #2874f0;
          color: #2874f0;
          transform: translateY(-1px);
        }

        .pagination-btn.active {
          background: #2874f0;
          border-color: #2874f0;
          color: #fff;
          box-shadow: 0 4px 12px rgba(40,116,240,0.3);
        }

        /* RESPONSIVE PERFECTION */
        @media (max-width: 1200px) {
          .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 16px;
            gap: 16px;
            height: 70px;
          }

          .search-input-wrapper {
            border-radius: 4px;
          }

          .search-category-select {
            min-width: 110px;
          }

          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 18px;
          }

          .section-header {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }

          .filter-controls {
            width: 100%;
            justify-content: center;
          }

          .category-filter {
            width: 100%;
            max-width: 300px;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .search-input-wrapper {
            flex-direction: column;
            border-radius: 4px;
          }

          .search-category-select {
            width: 100%;
            border-radius: 4px 4px 0 0;
            border-bottom: 1px solid #d1d5db;
            min-width: auto;
          }

          .search-input {
            border-radius: 0;
          }

          .search-btn {
            border-radius: 0 0 4px 4px;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      {/* TOP NOTIFICATION BAR */}
      <div className="top-notification">
        <div className="top-content">
          🔥 Premium Aquarium Sale | Free Shipping ₹999+ | 30-Day Returns | COD Available
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="main-header">
        <div className="header-container">
          <a href="/" className="flipkart-logo">
            🐟 AquaStore
          </a>

          <div className="search-wrapper">
            <div className="search-input-wrapper">
              <select 
                className="search-category-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="aquarium">Aquariums</option>
                <option value="fish">Fish Food</option>
                <option value="accessories">Accessories</option>
                <option value="decor">Decorations</option>
                <option value="filter">Filters</option>
                <option value="plants">Live Plants</option>
              </select>
              <input 
                className="search-input"
                placeholder="Search for aquariums, fish food, accessories and more..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <button className="search-btn" onClick={() => handleFilterChange('page', 1)}>
                Search
              </button>
            </div>
          </div>

          <div className="header-actions">
            <a href="/cart" className="action-item">
              <span className="action-icon">🛒</span>
              Cart
            </a>
            <a href="/profile" className="action-item">
              <span className="action-icon">👤</span>
              Account
            </a>
          </div>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="hero-slider">
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <h1 className="hero-title">Premium Aquarium Collection</h1>
          <p className="hero-subtitle">
            Everything your aquarium needs 🐟 Up to 40% OFF • Free Delivery • Best Prices
          </p>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="categories-wrapper">
        <div className="categories-container">
          <div className="categories-grid">
            <div className="category-item" onClick={() => handleFilterChange('category', 'aquarium')}>
              <span className="category-icon">🪸</span>
              <div className="category-label">Aquariums</div>
            </div>
            <div className="category-item" onClick={() => handleFilterChange('category', 'fish')}>
              <span className="category-icon">🐠</span>
              <div className="category-label">Fish Food</div>
            </div>
            <div className="category-item" onClick={() => handleFilterChange('category', 'accessories')}>
              <span className="category-icon">⚙️</span>
              <div className="category-label">Accessories</div>
            </div>
            <div className="category-item" onClick={() => handleFilterChange('category', 'decor')}>
              <span className="category-icon">🌿</span>
              <div className="category-label">Decorations</div>
            </div>
            <div className="category-item" onClick={() => handleFilterChange('category', 'filter')}>
              <span className="category-icon">🔧</span>
              <div className="category-label">Filters</div>
            </div>
            <div className="category-item" onClick={() => handleFilterChange('category', 'plants')}>
              <span className="category-icon">🌱</span>
              <div className="category-label">Live Plants</div>
            </div>
            <div className="category-item" onClick={() => handleFilterChange('category', '')}>
              <span className="category-icon">⭐</span>
              <div className="category-label">View All</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products-wrapper">
        <div className="section-header">
          <h2 className="section-title">
            {filters.search || filters.category ? `Search Results for "${filters.search || filters.category}"` : 'Featured Products'}
          </h2>
          <div className="filter-controls">
            <select 
              className="category-filter"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="aquarium">Aquariums</option>
              <option value="fish">Fish Food</option>
              <option value="accessories">Accessories</option>
              <option value="decor">Decorations</option>
              <option value="filter">Filters</option>
              <option value="plants">Live Plants</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            🔄 Loading premium aquarium products...
          </div>
        ) : (
          <>
            <div className="products-grid">
              {products.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>

            {pagination?.pages > 1 && (
              <div className="pagination-container">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    className={`pagination-btn ${filters.page === page ? 'active' : ''}`}
                    onClick={() => handleFilterChange('page', page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
