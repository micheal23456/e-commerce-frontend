import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../slices/authSlice';
import Orders from './Orders';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (loading) {
    return <div className="products-loading">Loading profile...</div>;
  }

  return (
    <div className="page">
      <div className="profile-page">
        <div className="profile-layout">
          {/* Left: nicer profile card */}
          <section className="profile-card">
            <h2 className="profile-title">{user?.name || 'Your profile'}</h2>
            <p className="profile-subtitle">
              Manage your account details and see your recent activity.
            </p>

            <p className="profile-row">
              <span className="profile-row-label">Email</span>
              <span>{user?.email}</span>
            </p>

            <p className="profile-row">
              <span className="profile-row-label">Role</span>
              <span
                className={
                  'profile-role-pill ' +
                  (user?.role === 'admin' ? 'admin' : 'user')
                }
              >
                {user?.role}
              </span>
            </p>
          </section>

          {/* Right: orders list in light card */}
          <section className="profile-orders-card">
            <h2 className="orders-section-title">Your Orders</h2>
            <Orders />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
