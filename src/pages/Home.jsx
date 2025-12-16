// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../slices/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { products, loading, pagination } = useSelector(state => state.products);
  const [filters, setFilters] = React.useState({ search: '', category: '', page: 1 });

  useEffect(() => {
    dispatch(fetchProducts({ category: 'featured', ...filters }));
  }, [dispatch, filters]);

  const handleBuyNow = (product) => {
    if (!user) {
      alert('Please login to continue shopping');
      navigate('/login');
      return;
    }
    navigate(`/products/${product._id}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="home-hero-banner">
        <div className="home-hero-slide">
          <div className="hero-text">
            <h1>Welcome to AquaStore 🐟</h1>
            <p>Discover the best aquariums, fish food & accessories</p>
<button onClick={() => navigate('/products')}>
  Shop Now
</button>
          </div>
          <div className="hero-image">
            <img src="/images/fish-banner.png" alt="AquaStore Hero" />
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="home-category-strip">
        <button onClick={() => handleFilterChange('category', 'aquarium')}>
          🪸
          <span>Aquariums</span>
        </button>
        <button onClick={() => handleFilterChange('category', 'fish')}>
          🐟
          <span>Fish Food</span>
        </button>
        <button onClick={() => handleFilterChange('category', 'accessories')}>
          ⚙️
          <span>Accessories</span>
        </button>
        <button onClick={() => handleFilterChange('category', '')}>
          ⭐
          <span>View All</span>
        </button>
      </section>

      {/* Products Section */}
      <section className="home-products-section">
        <div className="home-section-header">
          <h2>{filters.search || filters.category ? 'Search Results' : 'Top Deals'}</h2>
        </div>

        {loading ? (
          <div className="products-loading">Loading products...</div>
        ) : (
          <>
            <div className="home-products-row">
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>

            {pagination?.pages > 1 && (
              <div className="pagination">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                  page => (
                    <button
                      key={page}
                      className={`pagination-button ${filters.page === page ? 'is-active' : ''}`}
                      onClick={() => handleFilterChange('page', page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
