import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const { totalItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
    setOpen(false);
  };

  return (
    <nav className={`navbar ${open ? 'open' : ''}`}>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: #2874f0;
          color: #fff;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }

        .nav-inner {
          max-width: 1350px;
          height: 100%;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .logo {
          font-size: 1.7rem;
          font-weight: 800;
          text-decoration: none;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .nav-links a {
          color: #fff;
          text-decoration: none;
          position: relative;
          padding: 4px 0;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: #ffe11b;
          transition: width 0.2s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .cart-link {
          font-weight: 600;
        }

        .logout-btn {
          border: 1px solid #fff;
          background: transparent;
          color: #fff;
          padding: 6px 14px;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.15);
        }

        /* Hamburger button (mobile) */
        .hamburger {
          display: none;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.5);
          background: transparent;
          color: #fff;
          font-size: 1.2rem;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* Mobile menu container */
        .mobile-menu {
          display: none;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 768px) {
          .nav-inner {
            padding: 0 12px;
          }

          .nav-links {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .navbar.open .mobile-menu {
            display: block;
          }

          .mobile-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: #2874f0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            padding: 12px 16px 16px;
          }

          .mobile-links {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .mobile-links a {
            color: #fff;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
          }

          .mobile-links .logout-btn {
            width: 100%;
            text-align: center;
            margin-top: 8px;
          }
        }
      `}</style>

      <div className="nav-inner">
        <Link to="/" className="logo">
          🐟 AquaStore
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          <Link to="/">Home</Link>

          {user ? (
            <>
              {user.role !== 'admin' && (
                <Link to="/cart" className="cart-link">
                  Cart ({totalItems})
                </Link>
              )}
              <Link to="/profile">Profile</Link>
              {user.role === 'admin' && <Link to="/admin">Admin</Link>}
              {user.role === 'admin' && (
                <Link to="/admin/products/create">➕ Create</Link>
              )}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger for mobile */}
        <button
          className="hamburger"
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className="mobile-menu">
        <div className="mobile-links">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>

          {user ? (
            <>
              {user.role !== 'admin' && (
                <Link to="/cart" onClick={() => setOpen(false)}>
                  Cart ({totalItems})
                </Link>
              )}
              <Link to="/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  to="/admin/products/create"
                  onClick={() => setOpen(false)}
                >
                  ➕ Create
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
