import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Profile</h1>

        <div className="profile-card">
          <div className="profile-info">
            <div className="info-group">
              <label>First Name:</label>
              <p>{user?.firstName}</p>
            </div>

            <div className="info-group">
              <label>Last Name:</label>
              <p>{user?.lastName}</p>
            </div>

            <div className="info-group">
              <label>Email:</label>
              <p>{user?.email}</p>
            </div>

            <div className="info-group">
              <label>Phone Number:</label>
              <p>{user?.phoneNumber || 'Not provided'}</p>
            </div>

            <div className="info-group">
              <label>Role:</label>
              <p>{user?.role}</p>
            </div>

            <div className="info-group">
              <label>Member Since:</label>
              <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
