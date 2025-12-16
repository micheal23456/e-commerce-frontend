import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';

const Navbar = ({ filters, onFilterChange }) => {
  const { user } = useSelector(state => state.auth);
  const { totalItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === '/';

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
    setMobileOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterChange('page', 1);
    if (!isHome) navigate('/');
  };

  return (
    <header className="fk-navbar">
      <div className="fk-navbar-inner">
        {/* Logo */}
        <Link to="/" className="fk-logo">🐟 <span>AquaStore</span></Link>

        {/* Search Bar (always visible) */}
        <form className="fk-search-wrapper" onSubmit={handleSearchSubmit}>
          <select
            className="fk-search-select"
            value={filters?.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="">All</option>
            <option value="aquarium">Aquariums</option>
            <option value="fish">Fish Food</option>
            <option value="accessories">Accessories</option>
          </select>
          <input
            className="fk-search-input"
            type="text"
            placeholder="Search for aquariums, fish food, accessories..."
            value={filters?.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
          <button className="fk-search-btn" type="submit">🔍</button>
        </form>

        {/* Hamburger */}
        <button className="fk-hamburger" onClick={() => setMobileOpen(prev => !prev)}>
          {mobileOpen ? '✕' : '☰'}
        </button>

        {/* Nav Links */}
        <nav className={`fk-nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="fk-nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
          {user ? (
            <>
              {user.role !== 'admin' && <Link to="/cart" className="fk-nav-link" onClick={() => setMobileOpen(false)}>🛒 Cart {totalItems > 0 ? `(${totalItems})` : ''}</Link>}
              <Link to="/profile" className="fk-nav-link" onClick={() => setMobileOpen(false)}>Profile</Link>
              <Link to="/orders" className="fk-nav-link" onClick={() => setMobileOpen(false)}>Orders</Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin" className="fk-nav-link" onClick={() => setMobileOpen(false)}>Admin</Link>
                  <Link to="/admin/products" className="fk-nav-link" onClick={() => setMobileOpen(false)}>Products</Link>
                </>
              )}
              <button className="fk-logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="fk-nav-link" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" className="fk-nav-link" onClick={() => setMobileOpen(false)}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
