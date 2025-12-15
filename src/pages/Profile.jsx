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

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile container">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 card">
          <h2 className="mb-4">Profile</h2>
          <div className="space-y-3">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> <span className={`badge ${user?.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
              {user?.role}
            </span></p>
          </div>
        </div>
        
        <div className="col-span-2">
          <Orders />
        </div>
      </div>
    </div>
  );
};

export default Profile;
