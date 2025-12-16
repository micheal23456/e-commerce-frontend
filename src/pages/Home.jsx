// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../slices/productSlice';
import ProductCard from '../components/ProductCard';

const Home = ({ filters, onFilterChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { products, loading, pagination } = useSelector(state => state.products);

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
    onFilterChange(key, value);
  };

  return (
    <div className="home-page">

      {/* Banner like Flipkart hero */}
      <section className="home-hero-banner">
        <div className="home-hero-slide">
          <div className="home-hero-slide-text">
            <h2>Mattress</h2>
            <p>From ₹2,999</p>
            <span>Comfort, Sleepwell & more</span>
          </div>
        </div>
      </section>

      {/* Category strip like icons row */}
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

      {/* Top deals / products */}
      <section className="home-products-section">
        <div className="home-section-header">
          <h3>{filters.search || filters.category ? 'Search Results' : 'Top Deals'}</h3>
        </div>

        {loading ? (
          <div className="products-loading">Loading products...</div>
        ) : (
          <>
            <div className="home-products-row">
              {products.map((product) => (
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
                  (page) => (
                    <button
                      key={page}
                      className={
                        'pagination-button ' +
                        (filters.page === page ? 'is-active' : '')
                      }
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
